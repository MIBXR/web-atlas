(() => {
  'use strict';
  const patterns = window.ATLAS_PATTERNS || [];
  const favoriteStore = window.AtlasFavorites;
  const entries = window.ATLAS_CASES || [];
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const categories = [...new Set(patterns.map(pattern => pattern.category))];
  const sourceEntries = entries.filter(entry => patterns.some(pattern => pattern.sources.some(source => source.caseId === entry.id)));
  const evidenceLabels = { observed: '实访观察', adapted: '练习适配', inferred: '设计推断' };
  const typeLabels = { visual: '视觉巧思', 'micro-motion': '微动效', 'page-motion': '页面动效', sound: '声音巧思', structure: '内容与组织' };
  const dedicated = () => document.body.classList.contains('patterns-page');
  const patternPrefix = () => dedicated() ? '' : 'patterns.html';
  const badges = pattern => (pattern.experienceTypes || []).map(type => `<span class="tag">${esc(typeLabels[type])}</span>`).join('');
  const roleLabels = { foundation: '主要结构', support: '辅助机制', accent: '局部强调' };
  const favoriteStar = AtlasIcons.svg('star');
  let state = { query: '', category: 'all', source: 'all', type: 'all', favorites: false, sort:'curated', dir:'asc' };
  let notify = () => {};
  let onStateChange = () => {};

  const items = values => values?.length ? `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>` : '<p class="pattern-muted">暂无单独记录；请结合来源案例确认。</p>';
  const patternHref = id => `${patternPrefix()}#pattern/${encodeURIComponent(id)}${stateQuery()}`;
  const caseTitle = id => entries.find(entry => entry.id === id)?.title || id;
  const caseHref = id => `cases.html#style/${encodeURIComponent(id)}`;
  function stateQuery() {
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category !== 'all') params.set('category', state.category);
    if (state.source !== 'all') params.set('source', state.source);
    if (state.type !== 'all') params.set('type', state.type);
    if (state.favorites) params.set('favorites', '1');
    if(state.sort==='title')params.set('sort','title');
    if(state.dir==='desc')params.set('dir','desc');
    return params.size ? `?${params}` : '';
  }
  function readState(params) {
    state = {
      query: (params.get('q') || '').trim(),
      favorites: params.get('favorites') === '1',
      sort:params.get('sort')==='title'?'title':'curated',dir:params.get('dir')==='desc'?'desc':'asc',
      type: Object.hasOwn(typeLabels, params.get('type')) ? params.get('type') : 'all',
      category: categories.includes(params.get('category')) ? params.get('category') : 'all',
      source: sourceEntries.some(entry => entry.id === params.get('source')) ? params.get('source') : 'all',
    };
  }
  function sourceLinks(pattern) {
    return [...new Set(pattern.sources.map(source => source.caseId))].map(id => `<a class="pattern-source-link" href="${caseHref(id)}">查看来源案例 · ${esc(caseTitle(id))}</a>`).join('');
  }
  function combinationItems(values) {
    return values?.length ? `<ul>${values.map(value => {
      const pattern = patterns.find(item => item.id === value);
      return `<li>${pattern ? `<a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a>` : esc(value)}</li>`;
    }).join('')}</ul>` : '<p class="pattern-muted">根据当前页面的层级与动态预算判断。</p>';
  }
  function safeReference(href) {
    if (!href) return '';
    try { const url = new URL(href, location.href); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; }
  }
  function favoriteButton(pattern) {
    const selected = favoriteStore.has('patterns', pattern.id);
    return `<button class="favorite ${selected ? 'selected' : ''}" data-pattern-fav="${esc(pattern.id)}" aria-label="收藏${esc(pattern.title)}" aria-pressed="${selected}">${favoriteStar}</button>`;
  }
  function renderCards() {
    const typeSelect = $('#pattern-type');
    typeSelect.hidden = !state.favorites;
    if (state.favorites) {
      const saved = patterns.filter(pattern => favoriteStore.has('patterns', pattern.id));
      typeSelect.innerHTML = '<option value="all">全部类型</option>' + Object.entries(typeLabels).filter(([type]) => saved.some(pattern => pattern.experienceTypes?.includes(type))).map(([type, label]) => `<option value="${type}">${label}</option>`).join('');
    }
    typeSelect.value = state.type;
    const terms = state.query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = patterns.filter(pattern => (state.category === 'all' || pattern.category === state.category)
      && (!state.favorites || favoriteStore.has('patterns', pattern.id))
      && (state.type === 'all' || pattern.experienceTypes?.includes(state.type))
      && (state.source === 'all' || pattern.sources.some(source => source.caseId === state.source))
      && terms.every(term => [pattern.title, pattern.category, ...(pattern.experienceTypes || []).map(type => typeLabels[type]), pattern.summary, pattern.mechanism, pattern.trigger, pattern.effect,
        ...pattern.useCases, ...pattern.constraints, ...pattern.sources.map(source => caseTitle(source.caseId))].join(' ').toLocaleLowerCase().includes(term)));
    if(state.sort==='title')results.sort((a,b)=>a.title.localeCompare(b.title,'zh-CN'));
    if(state.dir==='desc')results.reverse();
    $('#pattern-sort').value=state.sort;
    const direction=$('#pattern-sort-dir');direction.setAttribute('aria-label',state.dir==='desc'?'反序':'正序');direction.setAttribute('aria-pressed',String(state.dir==='desc'));direction.innerHTML=AtlasIcons.svg(state.dir==='desc'?'sortDesc':'sortAsc');
    $('#pattern-cards').innerHTML = results.map(pattern => `<article class="card"><a class="card-preview" href="${patternHref(pattern.id)}" aria-label="查看${esc(pattern.title)}与实操"><img src="${esc(entries.find(entry => entry.id === pattern.sources[0].caseId)?.preview || '')}" alt="${esc(caseTitle(pattern.sources[0].caseId))}来源案例首屏" loading="lazy"></a><div class="card-body"><div class="card-title"><h2><a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a></h2>${favoriteButton(pattern)}</div><p class="subtitle">来源 · ${esc(caseTitle(pattern.sources[0].caseId))}</p><p class="card-summary">${esc(pattern.summary)}</p><p class="pattern-card-trigger"><span>触发</span>${esc(pattern.trigger)}</p><div class="tags">${badges(pattern)}<span class="tag">${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</span></div><div class="card-bottom"><a href="${caseHref(pattern.sources[0].caseId)}">查看来源案例</a><a href="${patternHref(pattern.id)}">机制 & 实操</a></div></div></article>`).join('');
    const title = state.favorites ? '我的收藏' + (state.type !== 'all' ? ' · ' + typeLabels[state.type] : '') : state.type !== 'all' ? typeLabels[state.type] : state.category === 'all' ? '全部设计巧思' : state.category;
    $('#pattern-results-label').textContent = `${title} / ${results.length} 个机制${state.source !== 'all' ? ' · ' + caseTitle(state.source) : ''}${state.query ? ' · ' + state.query : ''}`;
    $('#patterns-empty').hidden = !!results.length;
    updateNavigation(true);
    window.AtlasCollectionFilters?.sync();
  }
  function updateNavigation(active) {
    document.querySelectorAll('#pattern-navigation a,[data-pattern-favorites]').forEach(link => {
      const isCurrent = active && (link.dataset.patternFavorites ? state.favorites : !state.favorites && (link.dataset.patternType || 'all') === state.type);
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
    if (active) document.querySelectorAll('[data-filter]').forEach(button => {
      button.classList.remove('active'); button.setAttribute('aria-pressed', 'false');
    });
  }
  function writeState({ replace = false } = {}) {
    const url = new URL(location.href);
    url.hash = `patterns${stateQuery()}`;
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
    renderCards();
    onStateChange({ type: state.type });
  }
  let previewObserver;
  function clearDetail() {
    previewObserver?.disconnect();
    if (window.AtlasPlayground) $('#pattern-detail').querySelectorAll('[data-pattern-playground]').forEach(root => window.AtlasPlayground.dispose(root));
    $('#pattern-detail').innerHTML = '';
  }
  function previewPanel(pattern) {
    const exampleTypes = { 'restrained-signal-color': 'visual', 'state-shape-feedback': 'micro-motion', 'directional-section-wipe': 'page-motion', 'sound-opt-in': 'sound', 'single-open-accordion': 'structure' };
    const type = exampleTypes[pattern.id];
    const sources = [...new Set(pattern.sources.map(source => source.caseId))];
    return '<div class="demo-panel"><label class="pattern-live-source">选择来源 Demo<select id="pattern-demo-source" aria-label="选择巧思来源 Demo">' + sources.map(id => '<option value="' + esc(id) + '">' + esc(caseTitle(id)) + '</option>').join('') + '</select></label><div class="demo-surface"><div class="demo-toolbar"><span>SOURCE DEMO / 巧思来源实操</span><div><button data-viewport="desktop" aria-pressed="false">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 390px</button><button id="pattern-demo-replay" hidden>重播</button><a id="pattern-demo-open" class="copy-button" href="' + esc(entries.find(entry => entry.id === sources[0])?.demo || '') + '" target="_blank" rel="noopener">独立打开 Demo</a></div></div><div id="pattern-live-frame" class="frame-wrap pattern-live-frame"><div class="pattern-live-placeholder"><button id="pattern-demo-start" class="primary-button">载入 Demo</button><p>按需载入完整来源 Demo。在其中操作「' + esc(pattern.trigger) + '」，观察「' + esc(pattern.effect) + '」。</p></div></div></div><p class="demo-caption">完整来源保留多个机制与采集边界。适应面板按可用宽度响应；桌面与手机按目标宽度排版后等比缩小，长内容可纵向滚动；独立打开按实际窗口宽度显示。</p>' + (type ? '<section class="pattern-local-example" aria-label="巧思抽象示意"><div data-pattern-playground data-type="' + type + '"></div><p class="demo-caption">本地抽象示意，使用通用内容和拟合参数。原始样式、声音与组合关系请在来源 Demo 中核对。</p></section>' : '') + '</div>';
  }
  function initPreviewPanel(pattern) {
    previewObserver?.disconnect();
    const local = $('#pattern-detail [data-pattern-playground]');
    if (local && window.AtlasPlayground) {
      window.AtlasPlayground.mount(local);
      if (pattern.id === 'state-shape-feedback') local.querySelector('[data-feedback]').value = local.querySelector('.pg-micro').dataset.feedback = 'shape';
    }
    const frame = $('#pattern-live-frame');
    const start = $('#pattern-demo-start');
    const replay = $('#pattern-demo-replay');
    let loaded = false;
    const source = () => entries.find(entry => entry.id === $('#pattern-demo-source').value) || entries.find(entry => entry.id === pattern.sources[0].caseId);
    const controls = document.querySelectorAll('#pattern-detail [data-viewport]');
    previewObserver = window.AtlasPreview.mount(frame, controls, source().id === 'chatgpt-platform' ? 'wide' : 'desktop');
    const load = () => {
      const entry = source();
      const restoreFocus = document.activeElement === start;
      frame.innerHTML = '<iframe class="demo-frame" title="' + esc(entry.title) + '巧思来源交互 Demo" src="' + esc(entry.demo) + '"></iframe>';
      loaded = true; replay.hidden = false; replay.disabled = false; previewObserver.refresh();
      if (restoreFocus) replay.focus({preventScroll:true});
    };
    start.addEventListener('click', load);
    replay.addEventListener('click', load);
    $('#pattern-demo-source').addEventListener('change', () => {
      $('#pattern-demo-open').href = source().demo;
      if (loaded) load();
    });
  }
  function renderDetail(pattern) {
    const evidence = pattern.sources.map(source => {
      const reference = safeReference(source.referenceUrl);
      return `<article class="pattern-evidence"><div><span class="source-badge">${esc(evidenceLabels[source.evidence] || source.evidence)}</span><a href="${caseHref(source.caseId)}">${esc(caseTitle(source.caseId))}</a></div><p>${esc(source.observation)}</p><p class="pattern-muted">取材位置：${esc(source.locator)}${source.capturedAt ? ' · 采集 / 核验：' + esc(source.capturedAt) : ''}</p>${reference ? `<a href="${esc(reference)}" target="_blank" rel="noopener noreferrer">对照原始参考 <span aria-hidden="true">${AtlasIcons.svg('external')}</span></a>` : ''}</article>`;
    }).join('');
    $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="${patternPrefix()}#patterns${stateQuery()}">返回巧思库</a><div>${favoriteButton(pattern)}<a class="copy-button" href="agent/patterns/${encodeURIComponent(pattern.id)}.json" download="${esc(pattern.id)}-pattern.json">下载 Agent 巧思包</a><button class="primary-button" id="copy-pattern-prompt">复制复用 Prompt</button></div></div><div class="detail-title"><div><p class="eyebrow">DESIGN PATTERN / ${esc(pattern.category)} / ${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</p><h1>${esc(pattern.title)}</h1><p>${esc(pattern.summary)}</p></div><div class="tags">${badges(pattern)}</div></div><div class="detail-layout">${previewPanel(pattern)}<div class="notes pattern-context"><section><h2>在完整案例中查看</h2><div class="pattern-source-links">${sourceLinks(pattern)}</div><p>进入案例后，可操作完整 demo，并对照来源资料与实现范围。</p></section><section><h2>组合建议</h2><p><span class="tag">${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</span></p><p>${esc(pattern.composition?.notes)}</p><h3>可搭配</h3>${combinationItems(pattern.composition?.pairsWellWith)}<h3>冲突与取舍</h3>${combinationItems(pattern.composition?.conflicts)}</section><section><h2>复用顺序</h2><ol><li>确定这个机制解决的具体问题。</li><li>在来源案例中验证触发和视觉效果。</li><li>先实现主要结构，再加入辅助反馈。</li><li>检查内容密度、键盘与减少动态。</li></ol></section></div></div><aside class="notes"><section><h2>01 / 机制、触发与效果</h2><p>${esc(pattern.mechanism)}</p><dl class="pattern-mechanism"><div><dt>触发条件</dt><dd>${esc(pattern.trigger)}</dd></div><div><dt>设计效果</dt><dd>${esc(pattern.effect)}</dd></div></dl></section><section><h2>02 / 迁移到你的页面</h2><h3>适合</h3>${items(pattern.useCases)}<h3>谨慎使用</h3>${items(pattern.avoid)}<h3>实现约束</h3>${items(pattern.constraints)}</section><section><h2>03 / 可调参数</h2>${pattern.parameters?.length ? `<div class="pattern-parameter-scroll"><table class="pattern-parameters"><caption>取材基线与适配提示</caption><thead><tr><th scope="col">参数</th><th scope="col">参考值</th><th scope="col">适配提示</th></tr></thead><tbody>${pattern.parameters.map(parameter => `<tr><th scope="row">${esc(parameter.name)}</th><td>${esc(parameter.value)}</td><td>${esc(parameter.note)}</td></tr>`).join('')}</tbody></table></div>` : '<p>按内容和目标设备调节；当前条目未记录独立参数。</p>'}</section><section><h2>04 / 键盘与减少动态</h2><h3>键盘操作</h3><p>${esc(pattern.accessibility?.keyboard)}</p><h3>减少动态</h3><p>${esc(pattern.accessibility?.reducedMotion)}</p></section><section><h2>05 / 复用 Prompt</h2><p>把你的内容、技术栈和页面目标代入这段 Prompt，再按来源案例验证效果。</p><textarea id="pattern-prompt" class="prompt-box" aria-label="设计巧思复用 Prompt" readonly>${esc(pattern.prompt)}</textarea></section><section><h2>06 / 来源与证据</h2><p>观察、练习适配与设计推断分别标记。来源案例保留该机制与其他元素共同出现的完整上下文。</p>${evidence}</section></aside>`;
    initPreviewPanel(pattern);
    $('#copy-pattern-prompt').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pattern.prompt); notify('设计巧思 Prompt 已复制。'); }
      catch { const area = $('#pattern-prompt'); area.focus(); area.select(); notify('已选中 Prompt，请按 Ctrl+C 复制。'); }
    });
  }
  function renderRoute() {
    if (!$('#patterns-library')) return false;
    const [rawPath, rawQuery = ''] = (location.hash.slice(1) || (dedicated() ? 'patterns' : '')).split('?');
    let path;
    try { path = decodeURIComponent(rawPath); } catch { return false; }
    if (path !== 'patterns' && !path.startsWith('pattern/')) { updateNavigation(false); return false; }
    window.AtlasDetail?.clear();
    readState(new URLSearchParams(rawQuery));
    clearDetail();
    $('#patterns-library').hidden = true; $('#pattern-detail').hidden = true;
    window.AtlasPlayground?.disposeDetached();
    updateNavigation(true);
    if (path === 'patterns') {
      $('#patterns-library').hidden = false;
      $('#pattern-search').value = state.query;
      if ($('#pattern-type')) $('#pattern-type').value = state.type;
      $('#pattern-category').value = state.category;
      $('#pattern-source').value = state.source;
      renderCards();
    } else {
      const pattern = patterns.find(item => item.id === path.slice(8));
      $('#pattern-detail').hidden = false;
      if (pattern) {renderDetail(pattern);window.AtlasDetail.mount($('#pattern-detail'),'巧思库');}
      else $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="#patterns${stateQuery()}">返回巧思库</a></div><h1>没有找到这个设计巧思</h1><p>这个链接可能来自另一个归档版本。请回到巧思库重新选择。</p>`;
    }
    onStateChange({ type: state.type });
    return true;
  }
  function caseLinks(id) {
    const related = patterns.filter(pattern => pattern.sources.some(source => source.caseId === id));
    if (!related.length) return '';
    return `<section class="case-patterns" aria-labelledby="case-patterns-heading"><div class="prompt-head"><h2 id="case-patterns-heading">这个案例的设计巧思</h2><a href="patterns.html#patterns?source=${encodeURIComponent(id)}">按来源浏览全部 ${related.length} 项</a></div><p>这些机制可以独立借用；查看每项的触发、约束与组合建议。</p><ul>${related.map(pattern => `<li><a href="patterns.html#pattern/${encodeURIComponent(pattern.id)}?source=${encodeURIComponent(id)}">${esc(pattern.title)}</a><span>${(pattern.experienceTypes || []).map(type => esc(typeLabels[type])).join(' · ') || esc(pattern.category)}</span></li>`).join('')}</ul></section>`;
  }
  function init(options = {}) {
    notify = options.toast || notify;
    if (!$('#patterns-library')) return;
    onStateChange = options.onStateChange || onStateChange;
    if ($('#pattern-count')) $('#pattern-count').textContent = patterns.length;

    $('#pattern-category').innerHTML = '<option value="all">全部用途</option>' + categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join('');
    $('#pattern-source').innerHTML = '<option value="all">全部案例</option>' + sourceEntries.map(entry => `<option value="${esc(entry.id)}">${esc(entry.title)}</option>`).join('');
    $('#pattern-navigation').innerHTML = '<a class="nav-item" href="#patterns"><span>全部设计巧思</span><b>' + patterns.length + '</b></a>' + Object.entries(typeLabels).map(([type, label]) => '<a class="nav-item" data-pattern-type="' + type + '" href="#patterns?type=' + type + '"><span>' + label + '</span><b>' + patterns.filter(pattern => pattern.experienceTypes?.includes(type)).length + '</b></a>').join('');
    document.querySelectorAll('[data-pattern-favorites]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      if (state.favorites) return;
      state.favorites = true;
      state.type = 'all';
      location.hash = `patterns${stateQuery()}`;
    }));
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-pattern-fav]');
      if (button) favoriteStore.toggle('patterns', button.dataset.patternFav);
    });
    favoriteStore.subscribe(({ error }) => {
      $('#pattern-fav-count').textContent = String(favoriteStore.ids('patterns').length).padStart(2, '0');
      document.querySelectorAll('[data-pattern-fav]').forEach(button => {
        const selected = favoriteStore.has('patterns', button.dataset.patternFav);
        button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));window.AtlasDetail.paintFavorite(button,selected);
      });
      if (error) notify(error);
      if (state.favorites && !$('#patterns-library').hidden) renderCards();
    });
    $('#pattern-type')?.addEventListener('change', event => { state.type = event.target.value; writeState(); });
    $('#pattern-search').addEventListener('input', event => { state.query = event.target.value.trim(); writeState({ replace: true }); });
    $('#pattern-category').addEventListener('change', event => { state.category = event.target.value; writeState(); });
    $('#pattern-source').addEventListener('change', event => { state.source = event.target.value; writeState(); });
    $('#pattern-sort').addEventListener('change',event=>{state.sort=event.target.value;writeState();});
    $('#pattern-sort-dir').addEventListener('click',()=>{state.dir=state.dir==='asc'?'desc':'asc';writeState();});
    $('#pattern-reset').addEventListener('click', () => {
      state = { query: '', category: 'all', source: 'all', type: 'all', favorites: false };
      if ($('#pattern-type')) $('#pattern-type').value = 'all';
      $('#pattern-search').value = ''; $('#pattern-category').value = 'all'; $('#pattern-source').value = 'all';
      writeState(); $('#pattern-search').focus();
    });
  }
  function focusSearch() {
    if (!$('#patterns-library')) return false;
    if ($('#patterns-library').hidden && $('#pattern-detail').hidden) return false;
    if (!$('#pattern-detail').hidden) {
      clearDetail();
      $('#pattern-detail').hidden = true; $('#patterns-library').hidden = false;
      $('#pattern-search').value = state.query; $('#pattern-category').value = state.category; $('#pattern-source').value = state.source;
      if ($('#pattern-type')) $('#pattern-type').value = state.type;
      writeState();
    }
    window.AtlasDetail?.clear();
    $('#pattern-search').focus();
    return true;
  }
  window.AtlasPatterns = { init, renderRoute, caseLinks, focusSearch };
})();
