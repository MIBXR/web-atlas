(() => {
  'use strict';
  if (document.documentElement?.dataset.labEmbed === 'home') return;
  window.AtlasViewTransition = update => {
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return document.startViewTransition(update);
    }
    return update();
  };
  const themeControl = document.querySelector('[data-theme-toggle]');
  if (themeControl) {
    const cacheButton = document.createElement('button');
    cacheButton.className = 'atlas-cache-toggle';
    cacheButton.type = 'button';
    cacheButton.setAttribute('aria-label', '管理已下载的素材');
    cacheButton.setAttribute('title', '已下载的素材');
    cacheButton.setAttribute('aria-haspopup', 'dialog');
    cacheButton.setAttribute('aria-controls', 'asset-cache-dialog');
    cacheButton.innerHTML = AtlasIcons.svg('cache');
    themeControl.insertAdjacentElement('beforebegin', cacheButton);
    const cacheDialog = document.createElement('dialog');
    cacheDialog.id = 'asset-cache-dialog';
    cacheDialog.className = 'atlas-cache-dialog';
    cacheDialog.setAttribute('aria-labelledby', 'asset-cache-title');
    cacheDialog.innerHTML = '<form method="dialog"><button class="dialog-close" aria-label="关闭素材缓存管理">' + AtlasIcons.svg('close') + '</button></form><h2 id="asset-cache-title">已下载的素材</h2><p>嵌入预览与独立页面共享当前站点的素材缓存。浏览器空间不足时会重新下载。</p><p id="cache-status" role="status"></p><button id="cache-clear" class="atlas-ui-button" disabled>清除素材缓存</button>';
    document.body.append(cacheDialog);
    let cacheReady;
    async function showCacheStatus(clear = false) {
      const status = cacheDialog.querySelector('#cache-status');
      const button = cacheDialog.querySelector('#cache-clear');
      status.textContent = clear ? '正在清除素材缓存…' : '正在检查素材缓存…';
      button.disabled = true;
      if (!window.AtlasAssetCache) {
        cacheReady ||= new Promise(resolve => {
          const script = document.createElement('script');
          script.src = 'site/runtime/asset-cache.js';
          script.onload = script.onerror = resolve;
          document.head.append(script);
        });
        await cacheReady;
      }
      const api = window.AtlasAssetCache;
      const result = api ? await api[clear ? 'clear' : 'status']() : { available: false };
      status.textContent = result.available ? `${result.files} 项 · ${(result.bytes / 1024 / 1024).toFixed(1)} MiB${clear ? ' · 下次打开时按需重新下载' : ''}` : '此浏览器暂不支持持久素材缓存，页面仍可正常加载。';
      button.disabled = !result.available;
    }
    cacheButton.addEventListener('click', async () => {
      cacheDialog.showModal();
      await showCacheStatus();
    });
    cacheDialog.querySelector('#cache-clear').addEventListener('click', () => showCacheStatus(true));
  }
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'atlas-ui-button atlas-back-to-top';
  backToTop.innerHTML = AtlasIcons.svg('up') + '<span>回到顶部</span>';
  backToTop.hidden = true;
  document.body.append(backToTop);
  const syncBackToTop = () => { backToTop.hidden = window.scrollY <= window.innerHeight; };
  window.addEventListener('scroll', syncBackToTop, {passive:true});
  window.addEventListener('resize', syncBackToTop);
  backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.querySelector('main')?.focus({preventScroll:true});
  });
  syncBackToTop();
  const directory = document.querySelector('[data-page-directory]');
  const header = document.querySelector('.atlas-site-header');
  const nav = header?.querySelector('.atlas-site-nav');
  const navToggle = header?.querySelector('[data-nav-toggle]');
  const toggle = navToggle;
  if (header && nav && navToggle) {
    const mobile = window.matchMedia('(max-width: 800px)');
    let navOpen = false;
    let lastScrollY = window.scrollY;
    function setNavOpen(open) {
      const wasOpen = navOpen;
      navOpen = open && mobile.matches;
      header.toggleAttribute('data-nav-open', navOpen);
      header.classList.remove('is-hidden');
      navToggle.setAttribute('aria-expanded', String(navOpen));
      navToggle.setAttribute('aria-label', navOpen ? '收起菜单' : '打开菜单');
      if (navOpen) (nav.querySelector('a[aria-current=page]') || nav.querySelector('a'))?.focus({ preventScroll: true });
      else if (mobile.matches && wasOpen) navToggle.focus({ preventScroll: true });
    }
    function syncHeader() {
      const y = Math.max(0, window.scrollY);
      if (!mobile.matches || y < 80 || navOpen || directory?.hasAttribute('data-directory-open')) {
        header.classList.remove('is-hidden');
        lastScrollY = y;
      } else if (y > lastScrollY + 8) {
        header.classList.add('is-hidden');
        lastScrollY = y;
      } else if (y < lastScrollY - 8) {
        header.classList.remove('is-hidden');
        lastScrollY = y;
      }
    }
    if (!directory) {
      navToggle.addEventListener('click', () => setNavOpen(!navOpen));
      document.addEventListener('click', event => {
        if (navOpen && !nav.contains(event.target) && !navToggle.contains(event.target)) setNavOpen(false);
      });
      document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !navOpen) return;
        event.preventDefault();
        setNavOpen(false);
      });
    }
    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
    window.addEventListener('scroll', syncHeader, { passive: true });
    mobile.addEventListener('change', () => { if (!directory) setNavOpen(false); syncHeader(); });
    syncHeader();
  }
  if (!directory || !toggle || !nav) return;
  const navHome = nav.parentNode;
  const navNext = nav.nextSibling;
  const menus = [...directory.querySelectorAll('.atlas-page-menu')];
  const compact = window.matchMedia('(max-width: 800px)');
  const views = document.createElement('div');
  const pageView = document.createElement('button');
  const siteView = document.createElement('button');
  views.className = 'atlas-menu-views';
  views.setAttribute('role', 'group');
  views.setAttribute('aria-label', '菜单内容');
  for (const [button, label] of [[pageView, '本页目录'], [siteView, '全站导航']]) {
    button.type = 'button';
    button.textContent = label;
    views.append(button);
  }
  directory.prepend(views);
  let open = false;
  function setView(view) {
    directory.setAttribute('data-menu-view', view);
    pageView.setAttribute('aria-pressed', String(view === 'page'));
    siteView.setAttribute('aria-pressed', String(view === 'site'));
    directory.scrollTop = 0;
  }
  function syncVisibility() {
    if (compact.matches) views.after(nav);
    else navHome.insertBefore(nav, navNext);
    directory.hidden = compact.matches && !open;
    directory.toggleAttribute('data-directory-open', compact.matches && open);
    document.body.classList.toggle('atlas-menu-open', compact.matches && open);
    toggle.hidden = !compact.matches;
    toggle.setAttribute('aria-controls', directory.id);
    toggle.setAttribute('aria-expanded', String(compact.matches && open));
    toggle.setAttribute('aria-label', open ? '收起菜单' : '打开菜单');
  }
  function close() {
    if (!open) return;
    open = false;
    syncVisibility();
    toggle.focus({ preventScroll: true });
  }
  function show() {
    if (!compact.matches) return;
    open = true;
    for (const menu of menus) menu.open = true;
    setView('page');
    syncVisibility();
    header.classList.remove('is-hidden');
    directory.focus({ preventScroll: true });
  }
  function syncLayout() {
    const active = document.activeElement;
    const inside = directory.contains(active) || nav.contains(active);
    const controlFocused = active === toggle;
    open = false;
    for (const menu of menus) menu.open = true;
    syncVisibility();
    if (compact.matches && inside) toggle.focus({ preventScroll: true });
    else if (!compact.matches && controlFocused) (nav.querySelector('a[aria-current=page]') || nav.querySelector('a'))?.focus({ preventScroll: true });
  }
  toggle.addEventListener('click', () => open ? close() : show());
  pageView.addEventListener('click', () => setView('page'));
  siteView.addEventListener('click', () => setView('site'));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !open) return;
    event.preventDefault();
    close();
  });
  document.addEventListener('click', event => {
    if (!compact.matches || !open || toggle.contains(event.target)) return;
    if (!directory.contains(event.target)) {
      close();
      return;
    }
    const action = event.target.closest('a[href], button[data-filter], #favorite-export, #favorite-import');
    if (!action) return;
    close();
  });
  syncLayout();
  compact.addEventListener('change', syncLayout);
})();

(() => {
  'use strict';
  let current;
  const singleSelect = select => select instanceof HTMLSelectElement && !select.disabled && !select.multiple;

  function close(focus = false) {
    if (!current) return;
    const { menu, select } = current;
    current = null;
    menu.hidePopover();
    menu.remove();
    if (focus && select.isConnected) select.focus({ preventScroll: true });
  }

  function position() {
    if (!current) return;
    const { select, menu, list, hasSearch } = current;
    const rect = select.getBoundingClientRect();
    if (!rect.width || !rect.height) { close(); return; }
    const viewport = window.visualViewport;
    const height = viewport?.height || innerHeight;
    const offset = viewport?.offsetTop || 0;
    const width = Math.min(Math.max(rect.width, hasSearch ? 260 : 160), innerWidth - 24);
    const below = offset + height - Math.max(offset, rect.bottom) - 16;
    const above = Math.min(rect.top, offset + height) - offset - 16;
    const up = below < 180 && above > below;
    list.style.maxHeight = Math.max(64, Math.min(300, (up ? above : below) - (hasSearch ? 58 : 14))) + 'px';
    menu.style.width = width + 'px';
    menu.style.left = Math.max(12, Math.min(rect.left, innerWidth - width - 12)) + 'px';
    menu.style.top = Math.max(offset + 12, Math.min(up ? rect.top - menu.offsetHeight - 4 : rect.bottom + 4, offset + height - menu.offsetHeight - 12)) + 'px';
  }

  function open(select, query = '') {
    if (current?.select === select) return;
    close();
    const label = select.getAttribute('aria-label') || select.labels[0]?.textContent.trim() || '选项';
    const menu = document.createElement('div');
    const hasSearch = select.options.length >= 12;
    menu.className = 'atlas-select-menu';
    menu.setAttribute('popover', 'manual');
    menu.innerHTML = (hasSearch ? '<div class="atlas-select-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input class="atlas-select-input" type="search" autocomplete="off" placeholder="搜索选项" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="atlas-select-options"></div>' : '') + '<div class="atlas-select-list" id="atlas-select-options" role="listbox" tabindex="-1"></div>';
    const input = menu.querySelector('input');
    const list = menu.querySelector('.atlas-select-list');
    if (input) input.setAttribute('aria-label', '搜索' + label);
    list.setAttribute('aria-label', label);
    const focusTarget = input || list;
    (select.closest('dialog') || document.body).append(menu);
    current = { select, menu, list, hasSearch };
    let active = 0;
    let buttons = [];
    let typed = query.toLowerCase();
    let typedAt = Date.now();

    function highlight(index) {
      active = index;
      buttons.forEach((button, i) => button.classList.toggle('active', i === active));
      if (buttons[active]) {
        focusTarget.setAttribute('aria-activedescendant', buttons[active].id);
        buttons[active].scrollIntoView({ block: 'nearest' });
      } else focusTarget.removeAttribute('aria-activedescendant');
    }

    function choose(button) {
      const changed = select.value !== button.dataset.value;
      select.value = button.dataset.value;
      close(true);
      if (changed) select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function render() {
      const query = input?.value.trim().toLowerCase() || '';
      list.replaceChildren();
      buttons = [];
      for (const option of select.options) {
        if (option.disabled || !(option.label + ' ' + option.value).toLowerCase().includes(query)) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'atlas-select-option';
        button.id = 'atlas-select-option-' + buttons.length;
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', String(option.selected));
        button.tabIndex = -1;
        button.textContent = option.label;
        button.dataset.value = option.value;
        button.addEventListener('click', () => choose(button));
        list.append(button);
        buttons.push(button);
      }
      if (!buttons.length) {
        const empty = document.createElement('p');
        empty.className = 'atlas-select-empty';
        empty.textContent = '没有匹配选项';
        list.append(empty);
      }
      highlight(Math.max(0, buttons.findIndex(button => button.dataset.value === select.value)));
      position();
    }

    if (input) input.value = query;
    menu.showPopover();
    render();
    if (!input && query) {
      const index = buttons.findIndex(button => button.textContent.toLowerCase().startsWith(typed));
      if (index >= 0) highlight(index);
    }
    focusTarget.focus({ preventScroll: true });
    input?.addEventListener('input', render);
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close(true);
      } else if (event.key === 'Tab') close(true);
      else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (buttons.length) highlight((active + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length);
      } else if (event.key === 'Enter' || (!input && event.key === ' ')) {
        event.preventDefault();
        if (buttons[active]) choose(buttons[active]);
      } else if (!input && ['Home', 'End'].includes(event.key)) {
        event.preventDefault();
        highlight(event.key === 'Home' ? 0 : buttons.length - 1);
      } else if (!input && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        typed = (Date.now() - typedAt > 700 ? '' : typed) + event.key.toLowerCase();
        typedAt = Date.now();
        const index = buttons.findIndex(button => button.textContent.toLowerCase().startsWith(typed));
        if (index >= 0) highlight(index);
      }
      if (event.defaultPrevented) event.stopPropagation();
    });
  }

  document.addEventListener('pointerdown', event => {
    const select = event.target.closest('select');
    if (singleSelect(select) && event.button === 0) {
      event.preventDefault();
      open(select);
    } else if (current && !current.menu.contains(event.target)) close();
  }, true);
  document.addEventListener('click', event => {
    const select = event.target.closest('select');
    if (!singleSelect(select)) return;
    event.preventDefault();
    open(select);
  }, true);
  document.addEventListener('keydown', event => {
    const select = event.target;
    if (!singleSelect(select) || event.ctrlKey || event.metaKey) return;
    if (['ArrowDown', 'ArrowUp', 'Enter', ' ', 'F4'].includes(event.key) || event.key.length === 1) {
      event.preventDefault();
      open(select, event.key.length === 1 && event.key !== ' ' ? event.key : '');
    }
  }, true);
  document.addEventListener('focusin', event => {
    if (current && event.target !== current.select && !current.menu.contains(event.target)) close();
  });
  document.addEventListener('change', event => { if (current?.select === event.target) close(); });
  document.addEventListener('close', () => close(), true);
  document.addEventListener('scroll', event => {
    if (current && !current.menu.contains(event.target)) close();
  }, true);
  addEventListener('resize', position);
  addEventListener('popstate', () => close());
  addEventListener('hashchange', () => close());
  window.visualViewport?.addEventListener('resize', position);
})();
