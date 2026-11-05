(() => {
  'use strict';
  const materials = window.ATLAS_MATERIALS;
  const favorites = window.AtlasFavorites;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const typeLabels = {'component-library':'组件库','agent-skill':'Agent Skill','prompt-kit':'提示词套件',image:'图像',sound:'声音',font:'字体',poster:'海报'};
  const types = [...new Set(materials.map(item => item.type))];
  const categories = [...new Set(materials.map(item => item.category))];
  const items = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;
  const star = AtlasIcons.svg('star');
  let state = {query:'',type:'all',category:'all',favorites:false,sort:'curated',dir:'asc'};
  let toastTimer;
  let preview;
  let comparisonDialog;
  let comparisonMaterial;
  let comparisonIndex = 0;
  let comparisonOpener;
  let comparisonModules;
  let stopComparison = () => {};

  function galleryMarkup(material, title) {
    if (!material.gallery?.length) return '';
    const kinds = {style:'风格样张', work:'作品节选', theme:'主题预览'};
    const styles = [];
    if (material.galleryRatio) styles.push(`--gallery-ratio:${material.galleryRatio}`);
    if (material.galleryFit) styles.push(`--gallery-fit:${material.galleryFit}`);
    return `<section><h2>${title}</h2><div class="cards material-gallery"${styles.length ? ` style="${esc(styles.join(';'))}"` : ''}${material.galleryFit ? ` data-gallery-fit="${esc(material.galleryFit)}"` : ''}>${material.gallery.map((picture, index) => `<figure class="material-preview"><a class="card-preview" href="${esc(picture.path)}" target="_blank" rel="noopener"${picture.compare ? ` data-material-compare="${index}"` : ''} aria-label="${picture.compare ? '对比作品' : '查看原图'}：${esc(picture.caption)}"><img src="${esc(picture.path)}" alt="${esc(picture.caption)}" loading="lazy"></a><figcaption class="card-body"><span class="tag">${kinds[picture.kind]}</span><p class="card-summary">${esc(picture.caption)}</p>${picture.replicaPage ? `<a href="${esc(picture.replicaPage)}">打开本库页面</a>` : ''}</figcaption></figure>`).join('')}</div></section>`;
  }

  function bindGallery(material) {
    document.querySelectorAll('.material-gallery img').forEach(img => {
      const loaded = () => img.classList.add('is-loaded');
      img.addEventListener('load', loaded, {once:true});
      if (img.complete && img.naturalWidth) loaded();
    });
    document.querySelectorAll('[data-material-compare]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      comparisonMaterial = material;
      comparisonOpener = link;
      ensureComparison();
      comparisonDialog.showModal();
      loadComparison(Number(link.dataset.materialCompare));
    }));
  }

  function imagePanel(material) {
    return `<div class="demo-surface"><div class="demo-toolbar"></div><div class="notes material-skill-content material-image-content">${galleryMarkup(material, '作品画廊')}</div></div>`;
  }

  function closeComparison() {
    if (!comparisonDialog?.open) return;
    stopComparison();
    stopComparison = () => {};
    comparisonDialog.close();
    comparisonDialog.querySelector('.material-compare-body').replaceChildren();
    if (comparisonOpener?.isConnected) comparisonOpener.focus();
  }

  function ensureComparison() {
    if (comparisonDialog) return;
    comparisonDialog = document.createElement('dialog');
    comparisonDialog.className = 'material-compare';
    comparisonDialog.setAttribute('aria-labelledby', 'material-compare-title');
    comparisonDialog.innerHTML = `<header class="material-compare-header"><h2 id="material-compare-title"></h2><div class="material-compare-actions"><button class="copy-button material-compare-sound" type="button" aria-pressed="false">${AtlasIcons.svg('soundOff')}<span>声音</span></button><a class="copy-button material-compare-post" target="_blank" rel="noopener noreferrer">${AtlasIcons.svg('external')}<span>帖子</span></a><button class="copy-button material-compare-close" type="button">${AtlasIcons.svg('close')}<span>关闭</span></button></div></header><div class="material-compare-body"></div><nav class="material-compare-navigation" aria-label="切换作品"><button class="copy-button material-compare-previous" type="button">${AtlasIcons.svg('back')}<span>上一件</span></button><button class="copy-button material-compare-next" type="button"><span>下一件</span>${AtlasIcons.svg('arrow')}</button></nav>`;
    document.body.append(comparisonDialog);
    comparisonDialog.querySelector('.material-compare-close').addEventListener('click', closeComparison);
    comparisonDialog.querySelector('.material-compare-previous').addEventListener('click', () => loadComparison(comparisonIndex - 1));
    comparisonDialog.querySelector('.material-compare-next').addEventListener('click', () => loadComparison(comparisonIndex + 1));
    comparisonDialog.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      loadComparison(comparisonIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    });
    comparisonDialog.addEventListener('cancel', event => {event.preventDefault();closeComparison();});
    comparisonDialog.addEventListener('click', event => {
      const rect = comparisonDialog.getBoundingClientRect();
      if (event.target === comparisonDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeComparison();
    });
  }

  async function loadComparison(index) {
    stopComparison();
    const pictures = comparisonMaterial.gallery;
    comparisonIndex = (index % pictures.length + pictures.length) % pictures.length;
    const picture = pictures[comparisonIndex], info = picture.compare;
    comparisonDialog.dataset.piece = info.piece;
    comparisonDialog.querySelector('h2').textContent = picture.caption;
    comparisonDialog.querySelector('.material-compare-post').href = picture.sourceUrl;
    const sound = comparisonDialog.querySelector('.material-compare-sound');
    sound.hidden = !info.sound;
    sound.setAttribute('aria-pressed', 'false');
    sound.innerHTML = AtlasIcons.svg('soundOff') + '<span>声音</span>';
    const body = comparisonDialog.querySelector('.material-compare-body');
    body.innerHTML = '<figure class="material-compare-panel"><figcaption>复刻</figcaption><div class="material-compare-art material-compare-replica"><span class="material-compare-spinner" aria-label="加载中"></span></div></figure><figure class="material-compare-panel"><figcaption>原作</figcaption><div class="material-compare-art material-compare-original"><span class="material-compare-spinner" aria-label="加载中"></span></div></figure>';
    const replicaArt = body.querySelector('.material-compare-replica');
    const originalArt = body.querySelector('.material-compare-original');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', picture.caption + '复刻');
    replicaArt.append(canvas);
    const video = info.original.endsWith('.mp4') ? document.createElement('video') : null;
    const original = video || document.createElement('img');
    if (video) {video.muted = true;video.defaultMuted = true;video.loop = true;video.playsInline = true;video.preload = 'auto';}
    else original.alt = picture.caption + '原作';
    originalArt.append(original);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let active = true, frame = 0, paintFrame = 0, renderer, piece, observer;
    stopComparison = () => {
      active = false;
      cancelAnimationFrame(frame); cancelAnimationFrame(paintFrame);
      observer?.disconnect();
      reduced.removeEventListener('change', start);
      if (video) {video.pause();video.removeAttribute('src');video.load();}
      if (renderer) renderer.releaseRenderer(canvas);
      sound.onclick = null;
    };
    const originalReady = new Promise(resolve => {
      original.addEventListener(video ? 'canplay' : 'load', () => {
        if (active) originalArt.classList.add('is-ready');
        resolve(true);
      }, {once:true});
      original.addEventListener('error', () => {
        if (active) originalArt.classList.add('is-failed');
        resolve(false);
      }, {once:true});
    });
    original.src = info.original;
    const time = () => reduced.matches || piece.static ? 0 : video.currentTime;
    const draw = () => {
      if (!active) return;
      renderer.renderPiece(canvas, piece, time());
      if (!reduced.matches && !piece.static) frame = requestAnimationFrame(draw);
    };
    function resize() {
      if (!active) return;
      const box = replicaArt.getBoundingClientRect();
      const width = Math.min(box.width, box.height * piece.width / piece.height);
      const height = width * piece.height / piece.width;
      canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
      renderer.renderPiece(canvas, piece, time());
    }
    async function start() {
      if (!active) return;
      cancelAnimationFrame(frame);
      if (video) {
        video.pause();video.controls = reduced.matches;video.autoplay = !reduced.matches;video.currentTime = 0;
        if (!reduced.matches) await video.play();
      }
      if (active) draw();
    }
    sound.onclick = () => {video.muted = !video.muted;};
    if (video) video.addEventListener('volumechange', () => {
      if (!active) return;
      sound.setAttribute('aria-pressed', String(!video.muted));
      sound.innerHTML = AtlasIcons.svg(video.muted ? 'soundOff' : 'soundOn') + '<span>声音</span>';
    });
    try {
      await new Promise(resolve => {paintFrame = requestAnimationFrame(resolve);});
      comparisonModules ||= Promise.all([import('../../../demos/materials/0010-vigil/demo/renderer.js'), import('../../../demos/materials/0010-vigil/demo/pieces.js')]);
      const [module, parameters] = await comparisonModules;
      if (!active) return;
      renderer = module;piece = parameters.pieces.find(item => item.id === info.piece);
      canvas.width = piece.originalWidth;canvas.height = piece.originalHeight;
      resize();
      replicaArt.classList.add('is-ready');
      observer = new ResizeObserver(resize);observer.observe(replicaArt);
      if (!await originalReady || !active) return;
      reduced.addEventListener('change', start);
      await start();
    } catch (error) {
      if (!active) return;
      if (active) replicaArt.classList.add('is-failed');
      throw error;
    }
  }
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3000); }
  const favorite = material => `<button class="favorite ${favorites.has('materials',material.id) ? 'selected' : ''}" data-material-fav="${esc(material.id)}" aria-label="收藏${esc(material.title)}" aria-pressed="${favorites.has('materials',material.id)}">${star}</button>`;
  function query() {
    const params = new URLSearchParams();
    if (state.query) params.set('q',state.query);
    if (state.type !== 'all') params.set('type',state.type);
    if (state.category !== 'all') params.set('category',state.category);
    if (state.favorites) params.set('favorites','1');
    if(state.sort==='title')params.set('sort','title');
    if(state.dir==='desc')params.set('dir','desc');
    return params.size ? '?' + params : '';
  }
  const href = id => `#material/${encodeURIComponent(id)}${query()}`;
  function navigation() {
    $('#material-navigation').innerHTML = `<a class="nav-item ${!state.favorites && state.type === 'all' ? 'active' : ''}" href="#materials"><span>全部内容素材</span><b>${materials.length}</b></a>` + types.map(type => `<a class="nav-item ${!state.favorites && state.type === type ? 'active' : ''}" href="#materials?type=${encodeURIComponent(type)}"><span>${esc(typeLabels[type] || type)}</span><b>${materials.filter(item => item.type === type).length}</b></a>`).join('');
    const link=$('#material-favorites');link.classList.toggle('active',state.favorites);link.setAttribute('aria-current',state.favorites?'page':'false');$('#material-fav-count').textContent=favorites.ids('materials').length;
  }
  function cards() {
    const typeSelect = $('#material-type');
    typeSelect.hidden = !state.favorites;
    if (state.favorites) {
      const saved = materials.filter(item => favorites.has('materials',item.id));
      typeSelect.innerHTML = '<option value="all">全部类型</option>' + types.filter(type => saved.some(item => item.type === type)).map(type => `<option value="${esc(type)}">${esc(typeLabels[type] || type)}</option>`).join('');
    }
    typeSelect.value = state.type;
    const terms = state.query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = materials.filter(item => (state.type === 'all' || item.type === state.type) && (state.category === 'all' || item.category === state.category) && (!state.favorites || favorites.has('materials',item.id)) && terms.every(term => [item.title,item.summary,item.category,...item.tags,...item.useCases,...(item.workflow || []),...(item.demos || []).map(demo => demo.title + ' ' + demo.summary)].join(' ').toLocaleLowerCase().includes(term)));
    if(state.sort==='title')results.sort((a,b)=>a.title.localeCompare(b.title,'zh-CN'));
    if(state.dir==='desc')results.reverse();
    $('#material-sort').value=state.sort;
    const direction=$('#material-sort-dir');direction.setAttribute('aria-label',state.dir==='desc'?'反序':'正序');direction.setAttribute('aria-pressed',String(state.dir==='desc'));direction.innerHTML=AtlasIcons.svg(state.dir==='desc'?'sortDesc':'sortAsc');
    $('#material-cards').innerHTML = results.map(item => `<article class="card"><a class="card-preview" href="${href(item.id)}" aria-label="查看${esc(item.title)}使用方法"><img src="${esc(item.preview)}" alt="${esc(item.title)}代表性预览" loading="lazy"></a><div class="card-body"><div class="card-title"><h2><a href="${href(item.id)}">${esc(item.title)}</a></h2>${favorite(item)}</div><p class="subtitle">${esc(item.upstream.repository || new URL(item.upstream.url).hostname)} · ${['agent-skill','prompt-kit'].includes(item.type) ? '工作流与原文快照' : item.type === 'image' && item.gallery ? item.gallery.length + ' 件作品' : item.demos.length + ' 个互动样例'}</p><p class="card-summary">${esc(item.summary)}</p><div class="tags"><span class="tag">${esc(typeLabels[item.type] || item.type)}</span>${item.tags.slice(0,3).map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div><div class="card-bottom"><a href="${esc(item.upstream.url)}" target="_blank" rel="noopener noreferrer">来源仓库</a><a href="${href(item.id)}">${['agent-skill','prompt-kit'].includes(item.type) ? '工作流与使用方法' : item.type === 'image' && item.gallery ? '画廊与使用方法' : '样例与使用方法'}</a></div></div></article>`).join('');
    const title = state.favorites ? '我的收藏' + (state.type !== 'all' ? ' · ' + (typeLabels[state.type] || state.type) : '') : state.type === 'all' ? '全部内容素材' : typeLabels[state.type] || state.type;
    $('#material-results-label').textContent = `${title} / ${results.length} 个资源${state.query ? ' · '+state.query : ''}`;
    $('#materials-empty').hidden = !!results.length;
    navigation();
    window.AtlasCollectionFilters?.sync();
  }
  function skillPanel(material) {
    const snapshots = material.snapshotPath;
    const collections = {case:window.ATLAS_CASES, material:materials, pattern:window.ATLAS_PATTERNS};
    const prefixes = {case:'cases.html#style/', material:'materials.html#material/', pattern:'patterns.html#pattern/'};
    const gallery = galleryMarkup(material, '效果图画廊');
    return `<div class="demo-surface"><div class="demo-toolbar"><span>${material.type === 'agent-skill' ? 'AGENT SKILL' : 'PROMPT KIT'} / 工作流与原文</span></div><div class="notes material-skill-content"><section><h2>工作流</h2><ol>${(material.workflow || []).map(step => `<li>${esc(step)}</li>`).join('')}</ol></section>${material.relatedEntries?.length ? `<section><h2>关联条目</h2><div class="material-examples">${material.relatedEntries.map(related => `<a href="${prefixes[related.kind]}${encodeURIComponent(related.id)}"><strong>${esc(collections[related.kind].find(entry => entry.id === related.id).title)}</strong><span>${esc(related.note)}</span></a>`).join('')}</div></section>` : ''}${gallery}<section><h2>Skill 原文快照</h2><div class="material-examples"><a href="docs.html?file=${encodeURIComponent(snapshots + material.snapshotEntry)}"><strong>${esc(material.snapshotEntry)}</strong><span>阅读原始工作指引</span></a><a href="docs.html?file=${encodeURIComponent(snapshots + 'README.md')}"><strong>README</strong><span>阅读原始使用说明</span></a></div>${material.install ? `<h3>安装与取材</h3><code class="material-install">${esc(material.install)}</code>` : ''}</section></div></div>`;
  }
  function detail(material) {
    const anime = material.id === 'animejs';
    const skill = ['agent-skill','prompt-kit'].includes(material.type);
    const image = material.type === 'image' && !!material.gallery;
    $('#material-detail').innerHTML = `<div class="detail-top"><a class="back" href="#materials${query()}">返回素材库</a><div>${favorite(material)}<a class="copy-button" href="agent/materials/${encodeURIComponent(material.id)}.json" download="${esc(material.id)}-material.json">下载 Agent 素材包</a><button class="primary-button" id="copy-material-prompt">复制复用 Prompt</button></div></div><div class="detail-title"><div><p class="eyebrow">CONTENT MATERIAL / ${esc(material.category)}</p><h1>${esc(material.title)}</h1><p>${esc(material.summary)}</p></div><div class="tags"><span class="tag">${esc(typeLabels[material.type] || material.type)}</span><span class="tag">${esc(material.license.name)}</span></div></div><div class="detail-layout"><div class="demo-panel">${image ? imagePanel(material) : skill ? skillPanel(material) : `<div class="demo-surface"><div class="demo-toolbar"><span>LIVE EXAMPLES / 可操作样例</span><div><button data-viewport="desktop" aria-pressed="true" class="active">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 390px</button><button id="material-demo-replay">重播</button><a id="material-demo-open" class="copy-button" href="${esc(material.demo)}" target="_blank" rel="noopener">独立打开 Demo</a></div></div>${anime ? '<link rel="stylesheet" href="demos/materials/animejs/demo/demo.css"><div class="aj-browser"><div class="aj-layout"><nav class="aj-directory" aria-label="官方样例目录"></nav>' : ''}<div id="material-live-frame" class="frame-wrap pattern-live-frame material-live-frame"></div>${anime ? '</div></div>' : ''}</div><section class="notes material-context">${anime ? '' : `<h2>样例</h2><div class="material-examples">${material.demos.map(demo => `<a href="${esc(demo.entrypoint)}" data-material-example="${esc(demo.id)}"><strong>${esc(demo.title)}</strong><span>${esc(demo.summary)}</span></a>`).join('')}</div>`}<h3>${material.install ? "安装与取材" : "完整取材"}</h3>${material.install ? '<code class="material-install">' + esc(material.install) + '</code>' : ""}${anime ? '' : `<p>素材导出包含本地 Demo 的完整运行依赖。更多组件、框架入口与作者工具见<a href="${esc(material.upstream.url)}" target="_blank" rel="noopener noreferrer">原始仓库</a>。</p>`}</section>`}</div><aside class="notes"><section><h2>适用场景与限制</h2><h3>适合</h3>${items(material.useCases)}<h3>谨慎使用</h3>${items(material.avoid)}<h3>实现约束</h3>${items(material.constraints)}</section>${image && material.install ? `<section><h2>安装与取材</h2><code class="material-install">${esc(material.install)}</code></section>` : ""}${skill || image || anime ? '' : `<section><h2>样例与参数</h2>${material.demos.map(demo => `<h3>${esc(demo.title)}</h3><p>${esc(demo.summary)}</p><div class="pattern-parameter-scroll"><table class="pattern-parameters"><caption>${esc(demo.component)} · 样例基线</caption><thead><tr><th scope="col">参数</th><th scope="col">值</th><th scope="col">说明</th></tr></thead><tbody>${(demo.parameters || []).map(param => `<tr><th scope="row">${esc(param.name)}</th><td>${esc(param.value)}</td><td>${esc(param.note)}</td></tr>`).join('')}</tbody></table></div>`).join('')}</section>`}<section><h2>许可证与来源</h2><p><a href="${esc(material.license.url)}" target="_blank" rel="noopener noreferrer">${esc(material.license.name)} · 查看原始许可证</a></p><p>${esc(material.license.scope)}</p><p>${esc(material.license.notes)}</p><article class="material-source"><p>${material.upstream.version ? "核验版本 " + esc(material.upstream.version) + " · " : "来源核验 · "}${esc(material.upstream.verifiedAt)}</p>${material.upstream.commit ? "<code>" + esc(material.upstream.commit) + "</code>" : ""}</article>${material.sources.map(source => `<article class="material-source"><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a><p>${esc(source.note)}</p></article>`).join('')}<a href="docs.html?file=${encodeURIComponent(material.research)}">查看素材使用与维护说明</a></section><section><h2>复用 Prompt</h2><p>根据自己的内容、技术栈与目标区域调整任务描述，保留授权、兼容性与动态约束。</p><textarea id="material-prompt" class="prompt-box" aria-label="内容素材复用 Prompt" readonly>${esc(material.prompt)}</textarea></section></aside></div>`;
    window.AtlasDetail.mount($('#material-detail'),'素材库');
    bindGallery(material);
    if (!skill && !image) {
      const frame = $('#material-live-frame');
      preview = window.AtlasPreview.mount(frame, document.querySelectorAll('[data-viewport]'), 'desktop');
      let entrypoint = material.demo;
      let sampleUrl;
      function load() {
        frame.innerHTML = `<iframe class="demo-frame" title="${esc(material.title)}交互样例" src="${esc(sampleUrl || entrypoint)}"></iframe>`;
        $('#material-demo-open').href = entrypoint;
        preview.refresh();
      }
      if (anime) {
        const directory = frame.previousElementSibling;
        import('../../../demos/materials/animejs/demo/demo.js').then(({mountDirectory}) => {
          if (!directory.isConnected) return;
          mountDirectory(directory, material, null, (example, path) => {
            entrypoint = example.entrypoint;
            sampleUrl = 'demos/materials/animejs/demo/examples/' + path + '/index.html';
            load();
          });
        });
      } else {
        load();
      }
      $('#material-demo-replay').addEventListener('click',load);
      document.querySelectorAll('[data-material-example]').forEach(link => link.addEventListener('click', event => {
        event.preventDefault();entrypoint = link.getAttribute('href');load();
        document.querySelectorAll('[data-material-example]').forEach(item => item.setAttribute('aria-current',String(item === link)));
        frame.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
      }));
    }
    $('#copy-material-prompt').addEventListener('click',async () => {
      try {await navigator.clipboard.writeText(material.prompt);toast('素材复用 Prompt 已复制。');}
      catch {$('#material-prompt').focus();$('#material-prompt').select();toast('已选中 Prompt，请按 Ctrl+C 复制。');}
    });
  }
  function route() {
    closeComparison();
    window.AtlasDetail.clear();
    const [route = 'materials',params = ''] = (location.hash.slice(1) || 'materials').split('?');
    const values = new URLSearchParams(params);
    state = {query:values.get('q') || '',type:types.includes(values.get('type')) ? values.get('type') : 'all',category:categories.includes(values.get('category')) ? values.get('category') : 'all',favorites:values.get('favorites') === '1',sort:values.get('sort')==='title'?'title':'curated',dir:values.get('dir')==='desc'?'desc':'asc'};
    const isDetail = route.startsWith('material/');
    preview?.disconnect();preview = null;
    $('#materials-library').hidden = isDetail;$('#material-detail').hidden = !isDetail;$('#material-detail').innerHTML = '';
    $('#material-search').value = state.query;$('#material-type').value = state.type;$('#material-category').value = state.category;
    navigation();
    if (isDetail) {
      const material = materials.find(item => item.id === route.slice(9));
      if (material) detail(material);
      else $('#material-detail').innerHTML = '<div class="detail-top"><a class="back" href="#materials">返回素材库</a></div><h1>没有找到这个素材</h1><p>请回到素材库重新选择。</p>';
    } else cards();
  }
  function filter({replace = false} = {}) {
    state.query = $('#material-search').value.trim();state.type = $('#material-type').value;state.category = $('#material-category').value;
    history[replace ? 'replaceState' : 'pushState'](null,'', '#materials' + query());cards();
  }

  $('#material-type').insertAdjacentHTML('beforeend',types.map(type => `<option value="${esc(type)}">${esc(typeLabels[type] || type)}</option>`).join(''));
  $('#material-category').insertAdjacentHTML('beforeend',categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join(''));
  $('#material-favorites').addEventListener('click',event => {
    event.preventDefault();
    if (state.favorites) return;
    state.favorites = true;
    state.type = 'all';
    location.hash = 'materials' + query();
  });
  $('#material-search').addEventListener('input',() => filter({replace:true}));
  $('#material-type').addEventListener('change',filter);$('#material-category').addEventListener('change',filter);
  $('#material-sort').addEventListener('change',event=>{state.sort=event.target.value;history.replaceState(null,'','#materials'+query());cards();});
  $('#material-sort-dir').addEventListener('click',()=>{state.dir=state.dir==='asc'?'desc':'asc';history.replaceState(null,'','#materials'+query());cards();});
  $('#material-reset').addEventListener('click', () => {location.hash = 'materials';route();});
  document.addEventListener('click',event => {const button = event.target.closest('[data-material-fav]');if (button) favorites.toggle('materials',button.dataset.materialFav);});
  document.addEventListener('keydown',event => {if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(event.target.tagName) && !$('#materials-library').hidden ) {event.preventDefault();$('#material-search').focus();}});
  favorites.subscribe(({error}) => {if (!$('#materials-library').hidden) cards();else navigation();document.querySelectorAll('[data-material-fav]').forEach(button => {const selected = favorites.has('materials',button.dataset.materialFav);button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));window.AtlasDetail.paintFavorite(button,selected);});if (error) toast(error);});
  window.addEventListener('hashchange', () => window.AtlasViewTransition(() => {route();window.scrollTo({top:0,behavior:'instant'});}));
  route();
})();
