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

  const items = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;
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
  function combinationItems(values) {
    return `<ul>${values.map(value => {
      const pattern = patterns.find(item => item.id === value);
      return `<li><a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a></li>`;
    }).join('')}</ul>`;
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
    $('#pattern-cards').innerHTML = results.map(pattern => `<article class="card"><a class="card-preview" href="${patternHref(pattern.id)}" aria-label="查看${esc(pattern.title)}与实操"><img src="${esc(pattern.preview)}" alt="${esc(pattern.title)}的真实观察区域" loading="lazy"></a><div class="card-body"><div class="card-title"><h2><a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a></h2>${favoriteButton(pattern)}</div><p class="subtitle">来源 · ${esc(caseTitle(pattern.sources[0].caseId))}</p><p class="card-summary">${esc(pattern.summary)}</p><div class="tags">${badges(pattern)}<span class="tag">${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</span></div><div class="card-bottom"><a href="${caseHref(pattern.sources[0].caseId)}">查看来源案例</a><a href="${patternHref(pattern.id)}">机制 & 实操</a></div></div></article>`).join('');
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
  let previewObserver, focusPreview;
  function clearDetail() {
    focusPreview?.dispose();
    previewObserver?.disconnect();
    $('#pattern-detail').innerHTML = '';
  }
  function previewPanel(pattern) {
    const sources = [...new Set(pattern.sources.map(source => source.caseId))];
    const selected = sources.includes(state.source) ? state.source : sources[0];
    return '<div class="demo-panel"><label class="pattern-live-source">选择来源 Demo<select id="pattern-demo-source" aria-label="选择巧思来源 Demo">' + sources.map(id => '<option value="' + esc(id) + '"' + (id === selected ? ' selected' : '') + '>' + esc(caseTitle(id)) + '</option>').join('') + '</select></label><div class="demo-surface"><div class="demo-toolbar"><span>SOURCE DEMO / 巧思来源实操</span><div><button data-viewport="desktop" aria-pressed="false">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 390px</button><button id="pattern-demo-replay">重播</button><a id="pattern-demo-open" class="copy-button" href="' + esc(entries.find(entry => entry.id === selected).demo) + '" target="_blank" rel="noopener">独立打开 Demo</a></div></div><div id="pattern-live-frame" class="frame-wrap pattern-live-frame"></div></div></div>';
  }
  function initPreviewPanel(pattern) {
    previewObserver?.disconnect();
    const frame = $('#pattern-live-frame');
    const replay = $('#pattern-demo-replay');
    const source = () => entries.find(entry => entry.id === $('#pattern-demo-source').value);
    const focus = () => pattern.sources.find(item => item.caseId === source().id).focus;
    const controls = document.querySelectorAll('#pattern-detail [data-viewport]');
    previewObserver = window.AtlasPreview.mount(frame, controls, focus().viewport || (source().id === 'chatgpt-platform' ? 'wide' : 'desktop'));
    const locate = document.createElement('button');
    locate.id = 'pattern-demo-locate';
    locate.setAttribute('aria-label', '定位当前巧思');
    locate.title = '定位当前巧思';
    locate.innerHTML = '<svg class="atlas-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg><span>定位此处</span>';
    replay.before(locate);
    let generation = 0;
    const load = () => {
      focusPreview?.dispose();
      const turn = ++generation;
      const entry = source();
      $('#pattern-focus-instruction').textContent = focus().instruction;
      $('#pattern-demo-open').href = focus().entrypoint || entry.demo;
      locate.disabled = true;
      focusPreview = window.AtlasPatternFocus.mount(frame, entry, focus(), () => previewObserver.refresh());
      focusPreview.ready.then(() => { if (turn === generation) locate.disabled = false; });
    };
    locate.addEventListener('click', () => {
      if (focus().viewport) document.querySelector(`#pattern-detail [data-viewport="${focus().viewport}"]`).click();
      const doc = frame.querySelector('iframe').contentDocument;
      const original = new URL(focus().entrypoint || source().demo, location.href);
      if (focus().phase === 'loading' || !doc || new URL(doc.URL).pathname !== original.pathname) load();
      else focusPreview.locate();
    });
    replay.addEventListener('click', load);
    $('#pattern-demo-source').addEventListener('change', () => {
      if (focus().viewport) document.querySelector(`#pattern-detail [data-viewport="${focus().viewport}"]`).click();
      load();
    });
    load();
  }
  function renderDetail(pattern) {
    const evidence = pattern.sources.map(source => {
      const reference = safeReference(source.referenceUrl);
      const observation = source.observation.startsWith('{') ? JSON.parse(source.observation) : null;
      return `<article class="pattern-evidence"><div><span class="source-badge">${esc(evidenceLabels[source.evidence] || source.evidence)}</span><a href="${caseHref(source.caseId)}">${esc(caseTitle(source.caseId))}</a></div><p>${esc(observation ? observation.note : source.observation)}</p><p class="pattern-muted">取材位置：${esc(source.locator)}${source.capturedAt ? ' · 采集 / 核验：' + esc(source.capturedAt) : ''}</p>${reference ? `<a href="${esc(reference)}" target="_blank" rel="noopener noreferrer">${esc(observation ? observation.title : '对照原始参考')} <span aria-hidden="true">${AtlasIcons.svg('external')}</span></a>` : ''}</article>`;
    }).join('');
    const parameters = pattern.parameters.length ? `<section><h2>可调参数</h2><div class="pattern-parameter-scroll"><table class="pattern-parameters"><caption>取材基线与适配提示</caption><thead><tr><th scope="col">参数</th><th scope="col">参考值</th><th scope="col">适配提示</th></tr></thead><tbody>${pattern.parameters.map(parameter => `<tr><th scope="row">${esc(parameter.name)}</th><td>${esc(parameter.value)}</td><td>${esc(parameter.note)}</td></tr>`).join('')}</tbody></table></div></section>` : '';
    const composition = pattern.composition;
    const combinations = composition.notes || composition.pairsWellWith.length || composition.conflicts.length ? `<section><h2>组合建议</h2>${composition.notes ? `<p>${esc(composition.notes)}</p>` : ''}${composition.pairsWellWith.length ? `<h3>可搭配</h3>${combinationItems(composition.pairsWellWith)}` : ''}${composition.conflicts.length ? `<h3>冲突与取舍</h3>${combinationItems(composition.conflicts)}` : ''}</section>` : '';
    $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="${patternPrefix()}#patterns${stateQuery()}">返回巧思库</a><div>${favoriteButton(pattern)}<a class="copy-button" href="agent/patterns/${encodeURIComponent(pattern.id)}.json" download="${esc(pattern.id)}-pattern.json">下载 Agent 巧思包</a><button class="primary-button" id="copy-pattern-prompt">复制复用 Prompt</button></div></div>
      <div class="detail-title"><div><p class="eyebrow">DESIGN PATTERN / ${esc(pattern.category)} / ${esc(roleLabels[composition.role])}</p><h1>${esc(pattern.title)}</h1><p>${esc(pattern.summary)}</p></div><div class="tags">${badges(pattern)}</div></div>
      <div class="detail-layout">${previewPanel(pattern)}</div>
      <aside class="notes">
        <section><h2>观察位置</h2><p id="pattern-focus-instruction"></p></section>
        <section><h2>机制</h2><p>${esc(pattern.mechanism)}</p><dl class="pattern-mechanism">${pattern.trigger ? `<div><dt>触发条件</dt><dd>${esc(pattern.trigger)}</dd></div>` : ''}<div><dt>设计效果</dt><dd>${esc(pattern.effect)}</dd></div></dl></section>
        ${parameters}
        <section><h2>约束与适用场景</h2><h3>适合</h3>${items(pattern.useCases)}${pattern.avoid.length ? `<h3>谨慎使用</h3>${items(pattern.avoid)}` : ''}<h3>实现约束</h3>${items(pattern.constraints)}</section>
        ${combinations}
        <section><div class="prompt-head"><h2>复用 Prompt</h2></div><textarea id="pattern-prompt" class="prompt-box" aria-label="设计巧思复用 Prompt" readonly>${esc(pattern.prompt)}</textarea></section>
        <section><h2>来源与证据</h2>${evidence}</section>
      </aside>`;
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
      if (pattern) {renderDetail(pattern);window.AtlasDetail.mount($('#pattern-detail'),'巧思库');initPreviewPanel(pattern);}
      else $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="#patterns${stateQuery()}">返回巧思库</a></div><h1>没有找到这个设计巧思</h1><p>这个链接可能来自另一个归档版本。请回到巧思库重新选择。</p>`;
    }
    onStateChange({ type: state.type });
    return true;
  }
  function caseLinks(id) {
    const related = patterns.filter(pattern => pattern.sources.some(source => source.caseId === id));
    if (!related.length) return '';
    return `<section class="case-patterns" aria-labelledby="case-patterns-heading"><div class="prompt-head"><h2 id="case-patterns-heading">关联巧思</h2><a href="patterns.html#patterns?source=${encodeURIComponent(id)}">按来源浏览全部 ${related.length} 项</a></div><p>这些机制可以独立借用；查看每项的触发、约束与组合建议。</p><ul>${related.map(pattern => `<li><a href="patterns.html#pattern/${encodeURIComponent(pattern.id)}?source=${encodeURIComponent(id)}">${esc(pattern.title)}</a><span>${(pattern.experienceTypes || []).map(type => esc(typeLabels[type])).join(' · ') || esc(pattern.category)}</span></li>`).join('')}</ul></section>`;
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
      state = { ...state, query: '', category: 'all', source: 'all', type: 'all', favorites: false };
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
