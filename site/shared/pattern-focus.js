(() => {
  'use strict';
  const nextFrame = win => new Promise(resolve => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve)));
  const targetIn = (doc, selector) => [...doc.querySelectorAll(selector)].find(element => element.getClientRects().length);
  function waitFor(doc, selector) {
    return new Promise(resolve => {
      if (targetIn(doc, selector)) return resolve();
      const observer = new MutationObserver(() => {
        if (targetIn(doc, selector)) { observer.disconnect(); resolve(); }
      });
      observer.observe(doc.documentElement, { childList:true, subtree:true, attributes:true });
    });
  }
  async function prepare(win, focus) {
    const doc = win.document;
    if (focus.phase === 'loading') { await waitFor(doc, focus.target); return; }
    await doc.fonts.ready;
    if (win.CaseLoading) await win.CaseLoading.ready;
    for (const step of focus.prepare || []) {
      if (step.maxWidth && win.innerWidth > step.maxWidth) continue;
      if (step.minWidth && win.innerWidth < step.minWidth) continue;
      if (step.key) win.dispatchEvent(new win.KeyboardEvent('keydown', { key:step.key, bubbles:true }));
      if (step.scroll) scrollTarget(win, targetIn(doc, step.scroll));
      if (step.images) await Promise.all([...doc.querySelector(step.images).querySelectorAll('img')].filter(image => image.clientWidth > 0).map(async image => {
        if (!image.complete || !image.currentSrc) await new Promise((resolve, reject) => {
          image.addEventListener('load', resolve, { once:true });
          image.addEventListener('error', reject, { once:true });
        });
        await image.decode();
      }));
      if (step.video && !win.matchMedia('(prefers-reduced-motion:reduce)').matches) {
        const video = doc.querySelector(step.video);
        if (video.readyState < 2 || video.seeking) await new Promise((resolve, reject) => {
          const clean = () => {
            video.removeEventListener('loadeddata', ready);
            video.removeEventListener('seeked', ready);
            video.removeEventListener('error', error);
          };
          const ready = () => { if (video.readyState >= 2 && !video.seeking) { clean(); resolve(); } };
          const error = () => { clean(); reject(video.error); };
          video.addEventListener('loadeddata', ready);
          video.addEventListener('seeked', ready);
          video.addEventListener('error', error);
        });
      }
      if (step.click) doc.querySelector(step.click)?.click();
      if (step.input) {
        const input = doc.querySelector(step.input);
        input.value = step.value;
        input.dispatchEvent(new win.Event('input', { bubbles:true }));
        input.dispatchEvent(new win.Event('change', { bubbles:true }));
      }
      if (step.waitFor) await waitFor(doc, step.waitFor);
      await nextFrame(win);
    }
    await waitFor(doc, focus.target);
    await nextFrame(win);
  }
  function scrollTarget(win, target) {
    const doc = win.document;
    let fixed = win.getComputedStyle(target).position === 'fixed';
    for (let parent = target.parentElement; parent && parent !== doc.body; parent = parent.parentElement) {
      const style = win.getComputedStyle(parent), r = target.getBoundingClientRect(), box = parent.getBoundingClientRect();
      if (style.position === 'fixed') fixed = true;
      if (/(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight) parent.scrollTop += r.top - box.top - (parent.clientHeight - r.height) / 2;
      if (/(auto|scroll)/.test(style.overflowX) && parent.scrollWidth > parent.clientWidth) parent.scrollLeft += r.left - box.left - (parent.clientWidth - r.width) / 2;
    }
    const r = target.getBoundingClientRect();
    if (!fixed) win.scrollBy({ top:r.top - (win.innerHeight - r.height) / 2, behavior:'instant' });
  }
  function mount(wrap, entry, focus, refresh) {
    let disposed = false, clearMarker = () => {}, detachViewport = () => {};
    const iframe = document.createElement('iframe');
    iframe.className = 'demo-frame';
    iframe.title = entry.title + ' · ' + focus.label;
    iframe.src = focus.entrypoint || entry.demo;
    function isSourcePage() {
      const doc = iframe.contentDocument;
      if (!doc) return false;
      const current = new URL(doc.URL), original = new URL(iframe.src);
      const pathname = url => url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      return current.origin === original.origin && pathname(current) === pathname(original);
    }
    async function locate(initial = false) {
      clearMarker();
      const win = iframe.contentWindow, doc = iframe.contentDocument;
      const current = targetIn(doc, focus.target);
      const preferredWidth = focus.viewport === 'wide' ? 1440 : focus.viewport === 'mobile' ? 390 : 0;
      if (!initial && !current && preferredWidth && win.innerWidth !== preferredWidth) return;
      if (initial || !current?.getClientRects().length) await prepare(win, focus);
      if (disposed || iframe.contentDocument !== doc) return;
      const target = targetIn(doc, focus.target);
      scrollTarget(win, target);
      const header = doc.querySelector('header');
      const headerRect = header?.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      if (headerRect?.top <= 0 && ['fixed','sticky'].includes(win.getComputedStyle(header).position) && rect.top < headerRect.bottom + 36) {
        win.scrollBy({ top:rect.top - headerRect.bottom - 36, behavior:'instant' });
      }
      if (initial && focus.replay && !win.matchMedia('(prefers-reduced-motion:reduce)').matches) {
        const parts = [...doc.querySelectorAll(focus.replay)];
        parts.forEach(part => part.style.animationName = 'none');
        await nextFrame(win);
        parts.forEach(part => part.style.removeProperty('animation-name'));
      }
      const marker = document.createElement('div');
      marker.className = 'pattern-focus-marker';
      const label = document.createElement('span');
      label.textContent = focus.label;
      marker.append(label);
      wrap.append(marker);
      function position() {
        const r = target.getBoundingClientRect(), box = wrap.getBoundingClientRect(), view = iframe.getBoundingClientRect();
        const scale = view.width / iframe.clientWidth;
        const x = view.left - box.left - wrap.clientLeft, y = view.top - box.top - wrap.clientTop;
        const top = Math.max(6, y + r.top * scale - 6), left = Math.max(6, x + r.left * scale - 6);
        const right = Math.min(wrap.clientWidth - 6, x + r.right * scale + 6), bottom = Math.min(wrap.clientHeight - 6, y + r.bottom * scale + 6);
        marker.hidden = right <= left || bottom <= top;
        Object.assign(marker.style, { left:left+'px', top:top+'px', width:Math.max(0,right-left)+'px', height:Math.max(0,bottom-top)+'px' });
        label.hidden = false;
        label.style.maxWidth = wrap.clientWidth - 16 + 'px';
        label.style.left = Math.max(8-left, Math.min(4, wrap.clientWidth-8-left-label.offsetWidth)) + 'px';
        label.style.top = -label.offsetHeight-4 + 'px';
        label.hidden = top < label.offsetHeight+8;
      }
      let animation;
      const track = () => { position(); animation = requestAnimationFrame(track); };
      track();
      const timer = setTimeout(() => clearMarker(), 4000);
      clearMarker = () => {
        clearTimeout(timer);
        cancelAnimationFrame(animation);
        marker.remove();
        clearMarker = () => {};
      };
    }
    const ready = new Promise(resolve => {
      const start = async () => {
      const sourceDoc = iframe.contentDocument;
      detachViewport();
      await locate(true);
      if (disposed || iframe.contentDocument !== sourceDoc) return;
      const doc = iframe.contentDocument;
      let width = iframe.clientWidth;
      const viewportObserver = new ResizeObserver(() => {
        if (iframe.clientWidth === width) return;
        width = iframe.clientWidth;
        requestAnimationFrame(() => { if (!disposed && iframe.contentDocument === doc) locate(); });
      });
      viewportObserver.observe(iframe);
      detachViewport = () => viewportObserver.disconnect();
      resolve();
      };
      if (focus.phase === 'loading') {
        const find = () => {
          if (disposed) return;
          const doc = iframe.contentDocument;
          const target = doc && targetIn(doc, focus.target);
          if (target?.getBoundingClientRect().width) start();
          else if (doc?.readyState === 'complete' && doc.URL !== 'about:blank') resolve();
          else requestAnimationFrame(find);
        };
        requestAnimationFrame(find);
      } else iframe.addEventListener('load', () => {
        if (isSourcePage()) start();
      });
    });
    wrap.replaceChildren(iframe);
    refresh();
    return { ready, locate, isSourcePage, dispose() { disposed = true; clearMarker(); detachViewport(); } };
  }
  window.AtlasPatternFocus = { mount };
})();
