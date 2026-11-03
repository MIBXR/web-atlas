/* Local-first immutable asset mirrors. No prototype patches, synthetic media events or autoplay. */
(() => {
  'use strict';
  const boot = document.currentScript;
  const root = new URL('../../', boot?.src || location.href);
  if (location.pathname.startsWith(new URL('demos/', root).pathname) && !document.querySelector('link[href$="/demo-scrollbars.css"]')) {
    const scrollbars = document.createElement('link');
    scrollbars.rel = 'stylesheet';
    scrollbars.href = new URL('site/runtime/demo-scrollbars.css', root).href;
    document.head.prepend(scrollbars);
  }
  const registry = globalThis.AtlasAssetSources || { assets: {} };
  const modes = new Set(['local', 'github', 'auto']);
  const requested = new URL(location.href).searchParams.get('assets');
  let mode = modes.has(requested) ? requested : modes.has(globalThis.AtlasAssetMode) ? globalThis.AtlasAssetMode : 'auto';
  const sources = new Map(), reverse = new Map(), records = new WeakMap(), handled = new WeakSet();
  const localFailures = new Set(), mirrorFailures = new Set();
  const baseMirror = typeof registry.baseUrl === 'string' ? registry.baseUrl : '';
  const pinned = /^[0-9a-f]{40}$/i.test(registry.commit || '') && /^https:\/\/(?:raw|media)\.githubusercontent\.com\//.test(baseMirror) && baseMirror.includes('/' + registry.commit + '/');
  if (pinned) for (const [key, value] of Object.entries(registry.assets || {})) {
    const url = typeof value === 'string' ? value : value?.url;
    if (!key.startsWith('/') && !key.split('/').includes('..') && typeof url === 'string' && url.startsWith(baseMirror)) {
      sources.set(key, url); reverse.set(new URL(url).href, key);
    }
  }
  if (boot?.dataset.caseRuntime === 'true') document.documentElement.dataset.caseLoading = 'pending';
  function path(url, base = location.href) {
    try {
      const absolute = new URL(url, base);
      if (reverse.has(absolute.href)) return reverse.get(absolute.href);
      if (baseMirror && absolute.href.startsWith(baseMirror)) return decodeURIComponent(absolute.pathname.slice(new URL(baseMirror).pathname.length));
      if (absolute.origin === root.origin && absolute.pathname.startsWith(root.pathname)) return decodeURIComponent(absolute.pathname.slice(root.pathname.length));
    } catch {}
    return null;
  }
  function local(url, base = location.href) {
    const key = path(url, base);
    const absolute = new URL(url, base).href;
    return key && (sources.has(key) || baseMirror && absolute.startsWith(baseMirror)) ? new URL(key.split('/').map(encodeURIComponent).join('/'), root).href : absolute;
  }
  function mapped(url, base = location.href) { return sources.has(path(url, base)); }
  function resolve(url, base = location.href) {
    if (!url || /^(?:data:|blob:|#)/i.test(url)) return url;
    const key = path(url, base), mirror = sources.get(key);
    if (!mirror) return baseMirror && String(url).startsWith(baseMirror) ? local(url, base) : base === location.href ? url : new URL(url, base).href;
    if (mode === 'github' && !mirrorFailures.has(key) || mode === 'auto' && localFailures.has(key) && !mirrorFailures.has(key)) return mirror;
    return baseMirror && String(url).startsWith(baseMirror) || base !== location.href ? local(url, base) : url;
  }
  function alternate(url, base = location.href) {
    const key = path(url, base), mirror = sources.get(key);
    if (!mirror || mode === 'local') return null;
    const absolute = new URL(url, base).href;
    if (absolute === mirror) {
      mirrorFailures.add(key);
      return localFailures.has(key) ? null : local(url, base);
    }
    localFailures.add(key);
    return mirrorFailures.has(key) ? null : mirror;
  }
  const isMedia = el => el?.tagName === 'VIDEO' || el?.tagName === 'AUDIO';
  const isImage = el => el?.tagName === 'IMG';
  function record(el) {
    if (records.has(el)) return records.get(el);
    const state = { original: null, attrs: new Map(), originalAttrs: new Map(), attempted: new Set(), wantPlay: isMedia(el) && !el.paused, time: isMedia(el) ? el.currentTime || 0 : 0, generation: 0, switching: false, pending: null };
    records.set(el, state);
    el.addEventListener('error', onError, true);
    if (isMedia(el)) {
      el.addEventListener('play', () => { state.wantPlay = true; });
      el.addEventListener('pause', () => { if (!state.switching && !el.error) state.wantPlay = false; });
      for (const type of ['timeupdate', 'seeking']) el.addEventListener(type, () => { if (Number.isFinite(el.currentTime)) state.time = el.currentTime; });
    }
    return state;
  }
  function snapshot(el, state) {
    return { time: Number.isFinite(el.currentTime) && el.currentTime > 0 ? el.currentTime : state.time, play: state.wantPlay || !el.paused && !el.ended };
  }
  function changeMedia(el, state, url, saved) {
    const generation = ++state.generation;
    state.switching = true;
    if (!state.pending) {
      let done, fail;
      const promise = new Promise((resolve, reject) => { done = resolve; fail = reject; });
      promise.catch(() => {});
      state.pending = { promise, done, fail };
    }
    const restore = () => {
      el.removeEventListener('loadedmetadata', restore);
      if (state.generation !== generation) return;
      if (saved.time > 0) try { el.currentTime = Number.isFinite(el.duration) ? Math.min(saved.time, Math.max(0, el.duration - .01)) : saved.time; } catch {}
      state.switching = false;
      const pending = state.pending; state.pending = null;
      pending?.done();
      if (saved.play && state.wantPlay) el.play().catch(() => {});
    };
    el.addEventListener('loadedmetadata', restore);
    state.attrs.set('src', url);
    el.src = url;
    el.load();
  }
  function onError(event) {
    if (handled.has(event)) return;
    handled.add(event);
    const el = event.target;
    if (!isImage(el) && !isMedia(el) && el?.tagName !== 'SOURCE') return;
    const owner = el.tagName === 'SOURCE' ? el.closest('video,audio') : el;
    if (!owner) return;
    const state = record(owner), current = owner.currentSrc || el.getAttribute('src') || owner.getAttribute('src');
    if (!current) return;
    if (!state.original) state.original = local(current);
    state.attempted.add(new URL(current, location.href).href);
    const next = alternate(current);
    if (!next || state.attempted.has(next)) {
      state.switching = false;
      state.pending?.fail(owner.error || new Error('Asset unavailable')); state.pending = null;
      return;
    }
    state.attempted.add(next);
    event.stopImmediatePropagation(); // Existing loaders see only final failure, never both attempts.
    if (isMedia(owner)) changeMedia(owner, state, next, snapshot(owner, state));
    else {
      // A failed picture candidate can differ from the img fallback; retain that selected asset.
      if (mapped(current)) state.original = local(current);
      const picture = owner.closest('picture');
      if (picture) for (const source of picture.querySelectorAll('source[srcset]')) { record(source).originalAttrs.set('srcset', source.getAttribute('srcset')); source.removeAttribute('srcset'); }
      if (owner.hasAttribute('srcset')) state.originalAttrs.set('srcset', owner.getAttribute('srcset'));
      owner.removeAttribute('srcset');
      state.attrs.set('src', next); owner.src = next;
    }
  }
  window.addEventListener('error', onError, true);
  function attach(el, url, base = location.href) {
    const state = record(el);
    if (url !== undefined) {
      const originalURL = local(url, base);
      if (state.original !== originalURL) {
        state.generation++; state.pending?.done(); state.pending = null;
        state.original = originalURL; state.attempted.clear(); state.time = 0; state.switching = false;
      }
      const target = resolve(url, base);
      state.attrs.set('src', target);
      if (el.getAttribute('src') !== target) el.src = target;
    }
    return el;
  }
  async function play(el) {
    const state = record(el), generation = state.generation; state.wantPlay = true;
    try { await el.play(); }
    catch (error) {
      if (!state.pending && el.error) onError({ target: el, stopImmediatePropagation() {} });
      if (!state.pending && generation === state.generation) throw error;
      if (state.pending) await state.pending.promise;
      if (state.wantPlay) await el.play();
    }
  }
  function pause(el) { record(el).wantPlay = false; el.pause(); }
  async function load(url, loader, base = location.href) {
    let candidate = resolve(url, base); const tried = new Set();
    while (candidate && !tried.has(new URL(candidate, base).href)) {
      tried.add(new URL(candidate, base).href);
      try { return await loader(candidate); }
      catch (error) { const next = alternate(candidate, base); if (!next || tried.has(next)) throw error; candidate = next; }
    }
    throw new Error('Asset unavailable');
  }
  async function fetchAsset(url, options, base = location.href) {
    return load(url, async candidate => { const response = await fetch(candidate, options); if (!response.ok) throw new Error('Asset HTTP ' + response.status); return response; }, base);
  }
  function sourceSet(value) {
    if (!value || value.includes('data:')) return value;
    return value.split(',').map(part => { const [url, ...descriptor] = part.trim().split(/\s+/); return [resolve(url), ...descriptor].join(' '); }).join(', ');
  }
  function css(el) {
    const value = el.getAttribute('style'); if (!value || !value.includes('url(')) return;
    const state = record(el);
    if (state.attrs.get('style') === value) return;
    state.originalAttrs.set('style', value);
    const mappedValue = value.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/g, (all, quote, url) => {
      if (!mapped(url)) return all;
      const intended = resolve(url), img = new Image();
      img.onload = () => {
        const current = el.getAttribute('style') || '';
        if (current.includes(url) || current.includes(intended)) {
          const fixed = current.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/g, (token, q, candidate) => candidate === url || candidate === intended ? 'url("' + img.src + '")' : token);
          state.attrs.set('style', fixed); el.setAttribute('style', fixed);
        }
      };
      attach(img, url);
      return 'url("' + intended + '")';
    });
    state.attrs.set('style', mappedValue);
    if (mappedValue !== value) el.setAttribute('style', mappedValue);
  }
  function prepare(scope = document) {
    const elements = scope.matches?.('img,video,audio,source,[style]') ? [scope] : [];
    if (scope.querySelectorAll) elements.push(...scope.querySelectorAll('img,video,audio,source,[style]'));
    for (const el of elements) {
      css(el);
      if (!['IMG', 'VIDEO', 'AUDIO', 'SOURCE'].includes(el.tagName)) continue;
      const state = record(el);
      for (const attribute of ['src', 'srcset', 'poster']) {
        const value = el.getAttribute(attribute); if (!value || state.attrs.get(attribute) === value) continue;
        if (attribute !== 'src') state.originalAttrs.set(attribute, value);
        const target = attribute === 'srcset' ? sourceSet(value) : resolve(value);
        if (attribute === 'src') {
          if (state.original !== local(value)) { state.original = local(value); state.attempted.clear(); state.generation++; }
          if (el.tagName === 'SOURCE' && el.closest('video,audio')) {
            const owner = el.closest('video,audio'), parent = record(owner);
            if (!parent.original) parent.original = local(value);
            if (target !== value && new URL(owner.getAttribute('src') || value, location.href).href !== new URL(target, location.href).href && (!owner.currentSrc || path(owner.currentSrc) === path(value))) changeMedia(owner, parent, target, snapshot(owner, parent));
          }
          if (isMedia(el) && new URL(target, location.href).href !== new URL(value, location.href).href) { changeMedia(el, state, target, snapshot(el, state)); continue; }
        }
        state.attrs.set(attribute, target);
        if (target !== value) el.setAttribute(attribute, target);
      }
    }
    return scope;
  }
  function setMode(next) {
    if (!modes.has(next)) throw new TypeError('Unknown asset mode');
    if (next === mode) return mode;
    mode = next; localFailures.clear(); mirrorFailures.clear();
    for (const el of document.querySelectorAll('img,video,audio,source,[style]')) {
      const state = records.get(el);
      for (const attribute of ['srcset', 'poster', 'style']) {
        state?.attrs.delete(attribute);
        if (state?.originalAttrs.has(attribute)) el.setAttribute(attribute, state.originalAttrs.get(attribute));
      }
      if (!state?.original) continue;
      const target = resolve(state.original);
      state.attempted.clear();
      if (new URL(el.getAttribute('src') || target, location.href).href !== new URL(target, location.href).href) {
        if (isMedia(el)) changeMedia(el, state, target, snapshot(el, state));
        else { state.attrs.set('src', target); el.setAttribute('src', target); }
      }
    }
    prepare(document);
    document.dispatchEvent(new CustomEvent('atlas-assets-mode', { detail: { mode } }));
    return mode;
  }
  function retry(scope = document) {
    localFailures.clear(); mirrorFailures.clear();
    const elements = scope.matches?.('img,video,audio,source,[style]') ? [scope] : [];
    if (scope.querySelectorAll) elements.push(...scope.querySelectorAll('img,video,audio,source,[style]'));
    for (const el of elements) {
      const state = records.get(el); if (!state) continue;
      state.attempted.clear();
      if (el.hasAttribute('style')) { state.attrs.delete('style'); css(el); }
      const failed = isMedia(el) ? !!el.error || el.networkState === 3 : isImage(el) && el.complete && !el.naturalWidth;
      if (!failed || !state.original) continue;
      const target = resolve(state.original);
      if (isMedia(el)) changeMedia(el, state, target, snapshot(el, state));
      else { state.attrs.set('src', target); el.src = target; }
    }
    return scope;
  }
  const api = { resolve, attach, play, pause, load, fetch: fetchAsset, prepare, mapped, path, setMode, retry, resetFailures: retry,
    original: el => records.get(el)?.original || el.getAttribute?.('src') || null,
    state: el => { const s = records.get(el); return s ? { original: s.original, current: el.currentSrc || el.getAttribute('src'), switching: s.switching, wantPlay: s.wantPlay, time: s.time } : null; },
    get mode() { return mode; }, get size() { return sources.size; }, ready: Promise.resolve() };
  globalThis.AtlasAssets = Object.freeze(api);
  const observer = new MutationObserver(rows => {
    for (const row of rows) {
      if (row.type === 'attributes') prepare(row.target);
      else for (const node of row.addedNodes) if (node.nodeType === 1) prepare(node);
    }
  });
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset', 'poster', 'style'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => prepare(document), { once: true });
  else prepare(document);
})();
