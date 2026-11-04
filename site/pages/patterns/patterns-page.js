(() => {
  'use strict';
  let toastTimer;
  function toast(message) {
    const element = document.querySelector('#toast');
    element.textContent = message; element.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('visible'), 3000);
  }
  const panel = document.querySelector('#pattern-showcase-panel');
  const openShowcase = document.querySelector('#pattern-showcase-open');
  const showcase = document.querySelector('#pattern-showcase');
  let currentType = 'all', mountedType, renderedLocation;
  function syncShowcase({ type = currentType } = {}) {
    renderedLocation = location.href;
    currentType = type;
    const exampleType = type === 'all' ? 'visual' : type;
    const label = window.AtlasPlayground.labels[exampleType];
    openShowcase.innerHTML=AtlasIcons.svg('play')+'<span>体验'+label+'</span>';
    openShowcase.setAttribute('aria-label','体验'+label);
    openShowcase.title='体验'+label;
    document.querySelector('#pattern-showcase-label').textContent = `体验示意 · ${label}${type === 'all' ? '（全部类型预览）' : ''}`;
    document.querySelector('#pattern-showcase-description').textContent = `${type === 'all' ? '浏览全部类型时展示视觉构成示意；选择体验类型后，示意随之切换。' : `当前为${label}示意。`}示意使用通用内容；请在来源案例中核对原始样式与组合。`;
    openShowcase.hidden = document.querySelector('#patterns-library').hidden;
    if (openShowcase.hidden && panel.open) panel.close();
    if (!panel.open) {
      window.AtlasPlayground.dispose(showcase);
      mountedType = undefined;
    } else if (mountedType !== exampleType) {
      window.AtlasPlayground.mount(showcase, { type: exampleType });
      mountedType = exampleType;
    }
  }
  function route() {
    window.AtlasPlayground.disposeDetached();
    window.AtlasPatterns.renderRoute();
    window.AtlasPlayground.disposeDetached();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.AtlasPatterns.init({ toast, onStateChange: syncShowcase });
  openShowcase.addEventListener('click', () => { panel.showModal(); syncShowcase(); });
  panel.addEventListener('close', () => syncShowcase());
  document.addEventListener('keydown', event => {
    if (panel.open || document.querySelector('#asset-cache-dialog')?.open || event.key !== '/' || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    event.preventDefault(); window.AtlasPatterns.focusSearch();
  });
  function restoreRoute() {
    if (renderedLocation === location.href) return;
    renderedLocation = location.href;
    window.AtlasViewTransition(route);
  }
  window.addEventListener('hashchange', restoreRoute);
  window.addEventListener('popstate', restoreRoute);
  window.addEventListener('pageshow', event => {
    if (event.persisted) { mountedType = undefined; syncShowcase(); }
  });
  route();
})();
