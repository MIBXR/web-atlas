const content = document.querySelector('#content');
const documentRail = document.querySelector('.document-rail');
const searchContainer = document.querySelector('.document-search-container');
let file = new URLSearchParams(location.search).get('file') || 'docs/guide.md';
const documents = window.ATLAS_DOCUMENTS || [];
const documentSources = window.ATLAS_DOCUMENT_SOURCES;
const libraryURL = new URL('.', document.baseURI);
let activeRequest;
let cleanupOutline = () => {};
let currentGroup = documents.find(item => item.path === file)?.group;
let directoryOpenState;
function isAllowedDocument(value) {
  return localPath(new URL(value, libraryURL))?.endsWith('.md');
}
function renderDirectory() {
  const navigation = document.querySelector('#document-navigation');
  for (const group of new Set(documents.map(item => item.group))) {
    const section = document.createElement('details');
    section.className = 'document-group';
    section.setAttribute('data-document-group', group);
    section.open = documents.some(item => item.group === group && item.path === file);
    const title = document.createElement('summary');
    const label=document.createElement('span');label.className='document-group-title';label.textContent=group;
    title.append(label);title.title=group;
    title.insertAdjacentHTML('beforeend',AtlasIcons.disclosure());
    section.append(title);
    const links = document.createElement('ul');
    for (const item of documents.filter(item => item.group === group)) {
      const row = document.createElement('li');
      const link = document.createElement('a');
      link.href = 'docs.html?file=' + encodeURIComponent(item.path);
      link.textContent = item.title;
      link.title = item.title;
      link.setAttribute('data-document-file', item.path);
      if (item.path === file) link.setAttribute('aria-current', 'page');
      row.append(link);
      links.append(row);
    }
    section.append(links);
    navigation.append(section);
  }
  const active = navigation.querySelector('[aria-current="page"]');
  if (active) documentRail.scrollTop = Math.max(0, active.getBoundingClientRect().top - documentRail.getBoundingClientRect().top - searchContainer.getBoundingClientRect().height - active.closest('.document-group').querySelector('summary').getBoundingClientRect().height);
}
function filterDirectory() {
  const query = document.querySelector('#document-search').value.trim().toLowerCase();
  const groups = [...document.querySelectorAll('.document-group')];
  if (query && !directoryOpenState) directoryOpenState = new Map(groups.map(group => [group.dataset.documentGroup, group.open]));
  let matches = 0;
  for (const group of groups) {
    let count = 0;
    for (const link of group.querySelectorAll('[data-document-file]')) {
      const match = !query || (link.textContent + ' ' + link.dataset.documentFile).toLowerCase().includes(query);
      link.parentElement.hidden = !match;
      if (match) count++;
    }
    group.hidden = !count;
    if (query) group.open = !!count;
    else if (directoryOpenState) group.open = directoryOpenState.get(group.dataset.documentGroup);
    matches += count;
  }
  document.querySelector('#document-empty').hidden = !!matches;
  if (!query) directoryOpenState = undefined;
}
function syncDirectory() {
  for (const link of document.querySelector('#document-navigation').querySelectorAll('[data-document-file]')) {
    if (link.getAttribute('data-document-file') === file) {
      link.setAttribute('aria-current', 'page');
      const group = link.closest('.document-group');
      if (group.dataset.documentGroup !== currentGroup) {
        group.open = true;
        directoryOpenState?.set(group.dataset.documentGroup, true);
      }
    } else link.removeAttribute('aria-current');
  }
  currentGroup = documents.find(item => item.path === file)?.group;
}
function localPath(url) {
  if (url.origin !== libraryURL.origin || !url.pathname.startsWith(libraryURL.pathname)) return null;
  return decodeURIComponent(url.pathname.slice(libraryURL.pathname.length));
}
function upstreamLink(sourceURL, reference, raw = false) {
  const sourcePath = localPath(sourceURL);
  const source = documentSources.find(item => sourcePath.startsWith(item.path));
  if (!source) return null;
  const pinned = [source.upstream?.url, source.referenceUrl, ...source.sources].filter(Boolean)
    .map(url => url.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/(blob|tree)\/([a-f\d]{40})(?:\/([^?#]*))?/i)).find(Boolean);
  if (!pinned) return null;
  const repository = source.upstream?.repository || pinned[1];
  const commit = source.upstream?.commit || pinned[3];
  const directory = pinned[2] === 'tree' ? (pinned[4] || '').replace(/\/$/, '') : (pinned[4] || '').split('/').slice(0,-1).join('/');
  const upstreamSource = new URL((directory ? directory + '/' : '') + sourcePath.slice(source.path.length), 'https://github.com/');
  const target = new URL(reference, upstreamSource);
  if (raw) return `https://raw.githubusercontent.com/${repository}/${commit}${target.pathname}${target.search}${target.hash}`;
  const type = target.pathname.endsWith('/') || !target.pathname.split('/').pop().includes('.') ? 'tree' : 'blob';
  return `https://github.com/${repository}/${type}/${commit}${target.pathname}${target.search}${target.hash}`;
}
async function prepareLinks(fragment, sourceURL, signal) {
  await Promise.all([...fragment.querySelectorAll('a[href]')].map(async link => {
    const reference = link.getAttribute('href');
    if (reference.startsWith('#')) return;
    const url = new URL(reference, sourceURL);
    const path = localPath(url);
    if (path !== null && path.endsWith('.md')) {
      const reader = new URL('docs.html', libraryURL);
      reader.searchParams.set('file', path);
      reader.hash = url.hash;
      link.href = reader.href;
      return;
    }
    if (path !== null && /^demos\/(?:cases|materials)\/[A-Za-z0-9_-]+\/?$/.test(path)) {
      url.pathname = url.pathname.replace(/\/?$/, '/index.html');
    }
    const asset = AtlasAssets.resolve(url.href);
    if (asset !== url.href) {
      link.href = asset;
      return;
    }
    if (path !== null && !(await fetch(url, {method:'HEAD', signal})).ok) {
      const upstream = upstreamLink(sourceURL, reference);
      if (upstream) {
        link.href = upstream;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.insertAdjacentHTML('beforeend', ' <span class="atlas-external-icon" aria-hidden="true">' + AtlasIcons.svg('external') + '</span>');
      } else link.replaceWith(document.createTextNode(link.textContent));
      return;
    }
    link.href = path !== null ? (localPath(url) || './') + url.search + url.hash : url.href;
  }));
  await Promise.all([...fragment.querySelectorAll('img[src]')].map(async image => {
    const reference = image.getAttribute('src');
    const url = new URL(reference, sourceURL);
    const asset = AtlasAssets.resolve(url.href);
    const upstream = asset === url.href && localPath(url) !== null && !(await fetch(url, {method:'HEAD', signal})).ok
      ? upstreamLink(sourceURL, reference, true) : null;
    image.src = upstream || asset;
    image.loading = 'lazy';
    image.decoding = 'async';
  }));
}
function renderOutline(headings) {
  const outline = document.querySelector('#document-outline');
  const menu = document.querySelector('#document-outline-menu');
  const navigation = document.querySelector('#document-outline-navigation');
  const toggle = document.querySelector('#document-outline-toggle');
  const closeButton = document.querySelector('#document-outline-close');
  navigation.replaceChildren();
  const listeners = [];
  function listen(target, type, callback, options) {
    target.addEventListener(type, callback, options);
    listeners.push(() => target.removeEventListener(type, callback, options));
  }
  const links = headings.map(heading => {
    const id = heading.dataset.documentAnchor || heading.id;
    heading.tabIndex = -1;
    const link = document.createElement('a');
    link.href = '#' + encodeURIComponent(id);
    link.textContent = heading.textContent;
    link.className = 'outline-level-' + heading.tagName.slice(1);
    link.addEventListener('click', () => {
      if (compact.matches) setOpen(false);
      heading.focus({preventScroll:true});
    });
    navigation.append(link);
    return link;
  });
  const compact = window.matchMedia('(max-width:800px)');
  const summary = menu.querySelector('summary');
  function setOpen(open, {restoreFocus = false} = {}) {
    menu.open = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '收起本文目录' : '打开本文目录');
    if (restoreFocus) toggle.focus({preventScroll:true});
  }
  const syncLayout = () => {
    const active = document.activeElement;
    const inside = menu.contains(active);
    const controlFocused = active === toggle || active === closeButton;
    setOpen(!compact.matches);
    toggle.hidden = !compact.matches;
    closeButton.hidden = !compact.matches;
    if (compact.matches && inside) toggle.focus({preventScroll:true});
    else if (!compact.matches && (controlFocused || active === summary)) (navigation.querySelector('[aria-current="location"]') || links[0])?.focus({preventScroll:true});
  };
  syncLayout();
  listen(compact, 'change', syncLayout);
  listen(toggle, 'click', () => {
    setOpen(!menu.open);
    if (menu.open) {
      const current = navigation.querySelector('[aria-current="location"]');
      current?.focus({preventScroll:true});
      current?.scrollIntoView({block:'nearest'});
    }
  });
  listen(document.querySelector('[data-nav-toggle]'), 'click', () => {
    if (compact.matches && menu.open) setOpen(false);
  });
  listen(closeButton, 'click', () => setOpen(false, {restoreFocus:true}));
  listen(document, 'keydown', event => {
    if (!compact.matches || !menu.open || event.key !== 'Escape') return;
    event.preventDefault();
    setOpen(false, {restoreFocus:true});
  });
  listen(document, 'click', event => {
    if (!compact.matches || !menu.open || outline.contains(event.target)) return;
    setOpen(false, {restoreFocus:menu.contains(document.activeElement)});
  });
  outline.hidden = !headings.length;
  function updateCurrent() {
    const top = document.querySelector('.atlas-site-header').getBoundingClientRect().bottom + 24;
    let current = 0;
    headings.forEach((heading, index) => { if (heading.getBoundingClientRect().top <= top + 1) current = index; });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = headings.length - 1;
    links.forEach((link, index) => index === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  }
  let pending = false;
  listen(window, 'scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; updateCurrent(); });
  }, {passive:true});
  listen(window, 'resize', updateCurrent);
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  target?.scrollIntoView({block:'start'});
  updateCurrent();
  return () => listeners.forEach(remove => remove());
}
async function renderMarkdown(text, sourceURL, signal) {
  if (!window.marked || !window.DOMPurify) throw new Error('文档渲染器加载失败，请刷新后重试。');
  const {documentContent} = await import('./document-title.mjs');
  const {title, body} = documentContent(text, file);
  const html = marked.parse(body, {gfm:true, async:false});
  const fragment = DOMPurify.sanitize(html, {
    USE_PROFILES:{html:true}, RETURN_DOM_FRAGMENT:true,
    FORBID_TAGS:['style', 'iframe', 'form'], FORBID_ATTR:['style']
  });
  const titleElement = document.querySelector('#title');
  const reserved = new Set([...document.querySelectorAll('[id]')].filter(node => !content.contains(node) && (node === titleElement || !titleElement.contains(node))).map(node => node.id));
  for (const heading of fragment.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const base = heading.id || heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').replace(/[\s-]+/g, '-') || 'section';
    let id = base;
    let number = 2;
    while (reserved.has(id)) id = `${base}-${number++}`;
    reserved.add(id);
    heading.id = id;
    heading.tabIndex = -1;
  }
  const heading = fragment.querySelector('h1');
  const headings = [...fragment.querySelectorAll('h1,h2')];
  // The page header already displays the document's leading title.
  heading?.remove();
  await prepareLinks(fragment, sourceURL, signal);
  for (const pre of fragment.querySelectorAll('pre')) {
    const button=document.createElement('button');
    button.type='button';button.className='atlas-ui-button markdown-copy';
    button.innerHTML=AtlasIcons.svg('copy')+'<span>复制</span>';
    button.addEventListener('click',async()=>{
      await navigator.clipboard.writeText(pre.querySelector('code').textContent);
      button.querySelector('span').textContent='已复制';
    });
    pre.append(button);
  }
  for (const table of fragment.querySelectorAll('table')) {
    const frame=document.createElement('div');
    frame.className='table-frame';
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格');
    table.replaceWith(frame);
    frame.append(wrapper);
    wrapper.append(table);
  }
  signal.throwIfAborted();
  content.replaceChildren(fragment);
  return {title, anchor:heading?.id, headings:headings.map(node => node === heading ? titleElement : node)};
}
function focusDocument() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))?.closest('h1,h2,h3,h4,h5,h6');
  (target || document.querySelector('#main')).scrollIntoView({block:'start'});
  (target || document.querySelector('#title')).focus({preventScroll:true});
}
async function readDocument({focus = false} = {}) {
  activeRequest?.abort();
  const request = activeRequest = new AbortController();
  file = new URLSearchParams(location.search).get('file') || 'docs/guide.md';
  cleanupOutline();
  syncDirectory();
  content.textContent = '正在读取文档…';
  content.removeAttribute('role');
  content.setAttribute('aria-busy', 'true');
  document.querySelector('#document-outline').hidden = true;
  document.querySelector('#download').hidden = true;
  try {
    if (!documents.length) throw new Error('文档目录加载失败，请刷新后重试。');
    if (!isAllowedDocument(file)) throw new Error('请选择本站已公开的 Markdown 文档。');
    const sourceURL = new URL(file, libraryURL);
    const response = await fetch(sourceURL, {signal:request.signal});
    if (!response.ok) throw new Error(`文档读取失败（${response.status}）。`);
    // Decode the actual bytes explicitly; never let a browser guess a legacy charset.
    const text = new TextDecoder('utf-8', {fatal:true}).decode(await response.arrayBuffer());
    if (activeRequest !== request) return;
    const {title, anchor, headings} = await renderMarkdown(text, sourceURL, request.signal);
    const titleElement = document.querySelector('#title');
    titleElement.textContent = title;
    delete titleElement.dataset.documentAnchor;
    if (anchor) {
      const label = document.createElement('span');
      label.id = anchor;
      label.textContent = title;
      titleElement.replaceChildren(label);
      titleElement.dataset.documentAnchor = anchor;
    }
    const path=document.querySelector('#path');
    path.textContent=(documents.find(item=>item.path===file)?.group || '条目资料')+' / '+file;
    path.title=path.textContent;
    document.title = `${title} · Web Atlas`;
    cleanupOutline = renderOutline(headings);
    const download = document.querySelector('#download');
    download.href = file;
    download.download = file.split('/').pop();
    download.innerHTML = AtlasIcons.svg('download')+'<span>下载原文</span>';
    download.title = `下载 ${download.download}`;
    download.hidden = false;
    if (focus) focusDocument();
  } catch (error) {
    if (activeRequest !== request) return;
    content.textContent = error.message;
    content.setAttribute('role', 'alert');
  } finally {
    if (activeRequest === request) content.setAttribute('aria-busy', 'false');
  }
}
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const url = new URL(link.href, document.baseURI);
  if (url.origin !== libraryURL.origin || url.pathname !== new URL('docs.html', libraryURL).pathname) return;
  const nextFile = url.searchParams.get('file') || 'docs/guide.md';
  if (!isAllowedDocument(nextFile)) return;
  if (nextFile === file && url.hash) return;
  event.preventDefault();
  history.pushState(null, '', url);
  window.AtlasViewTransition(() => readDocument({focus:true}));
});
window.addEventListener('popstate', () => {
  if ((new URLSearchParams(location.search).get('file') || 'docs/guide.md') !== file) window.AtlasViewTransition(() => readDocument({focus:true}));
  else focusDocument();
});
function syncSearchHeight() {
  documentRail.style.setProperty('--document-search-height', searchContainer.getBoundingClientRect().height + 'px');
}
new ResizeObserver(syncSearchHeight).observe(searchContainer);
syncSearchHeight();
renderDirectory();
document.querySelector('#document-search').addEventListener('input', filterDirectory);
readDocument();

document.addEventListener('keydown',event=>{if(event.key==='/'&&!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)){event.preventDefault();if(matchMedia('(max-width:800px)').matches&&!documentRail.hasAttribute('data-directory-open'))document.querySelector('[data-nav-toggle]').click();document.querySelector('#document-search').focus();}});
