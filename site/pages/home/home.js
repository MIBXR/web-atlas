(() => {
  'use strict';
  const entries = window.ATLAS_CASES;
  if (Array.isArray(entries)) {
    const showcases = entries.filter(entry => entry.category === '示范作品').length;
    const studies = entries.filter(entry => entry.implementation === 'reference-study' && entry.category !== '示范作品').length;
    const counts = {all: entries.length, studies, showcases, classics: entries.length - studies - showcases, patterns: Array.isArray(window.ATLAS_PATTERNS) ? window.ATLAS_PATTERNS.length : 129};
    document.querySelectorAll('[data-home-count]').forEach(element => {
      element.textContent = String(counts[element.dataset.homeCount]);
    });
  }

  const patternButtons = [...document.querySelectorAll('[data-home-pattern]')];
  patternButtons.forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    patternButtons.forEach(choice => {
      const selected = choice === button;
      choice.setAttribute('aria-pressed', String(selected));
      const panel = document.getElementById(`home-pattern-${choice.dataset.homePattern}`);
      const playground = panel.querySelector('[data-pattern-playground]');
      window.AtlasPlayground.dispose(playground);
      panel.hidden = !selected;
      panel.inert = !selected;
      if (selected) window.AtlasPlayground.mount(playground);
    });
  }));

  let refreshStory = () => {};
  const labFrame = document.querySelector('.landing-lab-frame');
  let labHeightReceived = false;
  let labMeasuredWidth = 0;
  if (labFrame) {
    window.addEventListener('message', event => {
      if (event.origin !== location.origin || event.source !== labFrame.contentWindow || event.data?.type !== 'design-atlas:lab-height') return;
      const height = event.data.height;
      if (typeof height !== 'number' || !Number.isFinite(height) || height <= 0) return;
      if (event.data.width !== undefined && (typeof event.data.width !== 'number' || !Number.isFinite(event.data.width) || event.data.width <= 0)) return;
      labHeightReceived = true;
      labMeasuredWidth = typeof event.data.width === 'number' ? event.data.width : labFrame.clientWidth || 0;
      labFrame.style.height = `${Math.max(300, Math.min(2000, Math.ceil(height)))}px`;
      refreshStory();
    });
  }

  const stage = document.querySelector('.home-story');
  const rail = stage?.querySelector?.('.home-story-rail');
  if (rail) {
    const buttons = [...rail.querySelectorAll('[data-home-mode]')];
    const panels = buttons.map(button => document.getElementById(`home-panel-${button.dataset.homeMode}`));
    const descriptions = buttons.map(button => document.getElementById(`home-description-${button.dataset.homeMode}`));
    const sticky = stage.querySelector('.home-story-sticky');
    const controls = stage.querySelector('.home-story-controls');
    const nextButton = document.getElementById('home-story-next');
    const status = document.getElementById('home-story-status');
    const windowTitle = document.getElementById('home-story-window-title');
    const position = document.getElementById('home-story-position');
    const progress = [...stage.querySelectorAll('.home-story-progress>span')];
    const introActions = stage.querySelector('.home-story-intro-actions');
    const introButtons = [...stage.querySelectorAll('[data-home-intro]')];
    if (buttons.length === 3 && panels.every(Boolean) && descriptions.every(Boolean) && sticky && controls && nextButton && status && windowTitle && position) {
      const desktop = window.matchMedia('(min-width:1100px)');
      const tallEnough = window.matchMedia('(min-height:740px)');
      const reduced = window.matchMedia('(prefers-reduced-motion:reduce)');
      const labels = ['案例库', '设计实验室', 'Agent 工作流'];
      const clamp = value => Math.max(0, Math.min(1, value));
      let active = 0;
      let introMode = 0;
      let enhanced = false;
      let manualHold = false;
      let heldPhase = 'story';
      let pointerInLab = false;
      let navigationTarget = null;
      let raf = 0;
      let boundLabDocument = null;
      let contentOverflow = false;
      let overflowFrames = 0;
      let layoutSettlesAt = Date.now() + 900;
      function setStatus(text) { if (status.textContent !== text) status.textContent = text; }
      function focusedContent() {
        const focus = document.activeElement;
        return panels[active].contains(focus) || descriptions[active].contains(focus) || (active === 1 && focus === labFrame);
      }
      function paused() { return manualHold || focusedContent() || (active === 1 && pointerInLab); }
      function updateControls(isPaused) {
        stage.dataset.paused = String(isPaused);
        setStatus(isPaused ? '画面已暂停切换。完成操作后，可继续下一步。' : '滚动探索，也可选择左侧入口。');
        nextButton.textContent = active === 0 ? '继续调配元素' : active === 1 ? '继续参考构建' : '继续往下了解';
      }
      function renderSelection() {
        stage.dataset.mode = buttons[active].dataset.homeMode;
        buttons.forEach((button, index) => {
          const selected = index === active;
          button.setAttribute('aria-expanded', String(!enhanced || selected));
          button.closest('.home-story-step').classList.toggle('is-active', selected);
          descriptions[index].hidden = enhanced && !selected;
          panels[index].hidden = enhanced && !selected;
          panels[index].inert = enhanced && !selected;
        });
        windowTitle.textContent = labels[active];
        position.textContent = `${String(active + 1).padStart(2, '0')} / 03`;
        introButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === introMode)));
        updateControls(manualHold);
      }
      function select(index, animate = true) {
        if (index === active && stage.dataset.mode) return;
        const direction = index > active ? 1 : -1;
        panels.forEach(panel => panel.getAnimations?.().forEach(animation => animation.cancel()));
        active = index;
        layoutSettlesAt = Date.now() + 900;
        renderSelection();
        if (enhanced && animate) {
          panels[index].animate?.([{opacity:0, transform:`translateY(${direction * 20}px)`}, {opacity:1, transform:'none'}], {duration:360, easing:'cubic-bezier(.22,1,.36,1)'});
          descriptions[index].animate?.([{opacity:0, transform:'translateY(8px)'}, {opacity:1, transform:'none'}], {duration:360, easing:'cubic-bezier(.22,1,.36,1)'});
        }
      }
      function inset() {
        const header = document.querySelector('.atlas-site-header');
        return (header?.getBoundingClientRect().height || 88) + 16;
      }
      function update() {
        raf = 0;
        if (!enhanced) return;
        const delta = inset() - stage.getBoundingClientRect().top;
        const requested = delta < 340 ? introMode : Math.min(2, Math.max(0, Math.floor((delta - 500) / 500)));
        if (navigationTarget && (Math.abs(window.scrollY - navigationTarget.top) < 3 || Date.now() > navigationTarget.expires)) navigationTarget = null;
        const held = paused();
        const target = navigationTarget ? navigationTarget.index : requested;
        stage.dataset.phase = held ? (manualHold ? heldPhase : stage.dataset.phase) : navigationTarget || delta >= 340 ? 'story' : delta > 0 ? 'handoff' : 'intro';
        rail.inert = stage.dataset.phase !== 'story';
        if (introActions) introActions.inert = stage.dataset.phase === 'story';
        if (target !== active && !held) select(target);
        // Growing Lab notes or larger browser text must remain fully readable.
        // Wait for the child frame's resize message before choosing outer-page flow.
        const pane = panels[active];
        const labIsMeasured = active !== 1 || labHeightReceived && (!labMeasuredWidth || Math.abs(labMeasuredWidth - labFrame.clientWidth) < 2);
        if (labIsMeasured && pane.clientHeight > 0 && pane.scrollHeight > pane.clientHeight + 2) {
          if (Date.now() < layoutSettlesAt) { requestUpdate(); return; }
          if (++overflowFrames >= 6) {
            contentOverflow = true;
            adapt();
            return;
          }
          requestUpdate();
        } else overflowFrames = 0;
        if (!held) progress.forEach((line, index) => { line.style.transform = `scaleX(${clamp((delta - 500 - index * 500) / 500)})`; });
        updateControls(held);
      }
      function requestUpdate() { if (!raf) raf = window.requestAnimationFrame(update); }
      refreshStory = requestUpdate;
      function navigate(index) {
        manualHold = false;
        pointerInLab = false;
        navigationTarget = null;
        if (index < 3) {
          stage.dataset.phase = 'story';
          rail.inert = false;
          if (introActions) introActions.inert = true;
          buttons[index].focus({preventScroll:true});
          select(index);
          const top = stage.getBoundingClientRect().top + window.scrollY - inset() + 750 + index * 500;
          navigationTarget = {index, top, expires:Date.now() + 1400};
          window.scrollTo({top, behavior:'smooth'});
        } else {
          const title = document.getElementById('home-patterns-title') || document.getElementById('paths-title');
          if (title) { title.tabIndex = -1; title.focus({preventScroll:true}); }
          window.scrollTo({top:stage.getBoundingClientRect().bottom + window.scrollY - inset(), behavior:'smooth'});
        }
        updateControls(false);
        requestUpdate();
      }
      buttons.forEach((button, index) => button.addEventListener('click', () => { if (enhanced) navigate(index); }));
      introButtons.forEach((button, index) => button.addEventListener('click', () => {
        if (!enhanced) return;
        manualHold = false;
        pointerInLab = false;
        navigationTarget = null;
        introMode = index;
        select(index);
        renderSelection();
        requestUpdate();
      }));
      rail.addEventListener('keydown', event => {
        if (!enhanced || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        const index = buttons.indexOf(document.activeElement);
        if (index < 0) return;
        event.preventDefault();
        const target = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowDown' ? 1 : -1) + 3) % 3;
        navigate(target);
      });
      nextButton.addEventListener('click', () => navigate(active + 1));
      function holdLab() {
        if (!enhanced || active !== 1) return;
        manualHold = true;
        heldPhase = stage.dataset.phase;
        navigationTarget = null;
        panels[1].getAnimations?.().forEach(animation => animation.cancel());
        updateControls(true);
        requestUpdate();
      }
      function bindLab() {
        // The actual same-origin editor owns its inputs; no wheel or key events are intercepted.
        try {
          const child = labFrame?.contentDocument;
          if (!child || child === boundLabDocument) return;
          boundLabDocument = child;
          child.addEventListener('pointerdown', holdLab);
          child.addEventListener('input', holdLab);
          child.addEventListener('change', holdLab);
          child.addEventListener('focusin', event => { if (event.target.closest?.('input,select,textarea,button,a')) holdLab(); });
        } catch {}
      }
      labFrame?.addEventListener('load', bindLab);
      labFrame?.addEventListener('focus', holdLab);
      labFrame?.addEventListener('pointerenter', () => { pointerInLab = true; requestUpdate(); });
      labFrame?.addEventListener('pointerleave', () => { pointerInLab = false; requestUpdate(); });
      stage.addEventListener('focusin', requestUpdate);
      stage.addEventListener('focusout', requestUpdate);
      function adapt() {
        const focused = panels.findIndex(panel => panel.contains(document.activeElement));
        if (focused >= 0) active = focused;
        enhanced = desktop.matches && tallEnough.matches && !reduced.matches && !contentOverflow;
        layoutSettlesAt = Date.now() + 900;
        manualHold = enhanced && focused === 1;
        navigationTarget = null;
        stage.classList.toggle('home-story--enhanced', enhanced);
        stage.dataset.phase = enhanced ? 'intro' : 'sequential';
        rail.inert = !enhanced;
        controls.hidden = !enhanced;
        if (introActions) { introActions.hidden = !enhanced; introActions.inert = !enhanced; }
        panels.forEach(panel => panel.getAnimations?.().forEach(animation => animation.cancel()));
        renderSelection();
        requestUpdate();
      }
      desktop.addEventListener('change', adapt);
      tallEnough.addEventListener('change', adapt);
      reduced.addEventListener('change', adapt);
      window.addEventListener('scroll', requestUpdate, {passive:true});
      window.addEventListener('resize', () => { contentOverflow = false; overflowFrames = 0; adapt(); });
      window.addEventListener('pageshow', requestUpdate);
      window.addEventListener('pagehide', () => { if (raf) window.cancelAnimationFrame(raf); raf = 0; });
      document.fonts?.ready.then(requestUpdate);
      bindLab();
      adapt();
    }
  }

  const prompt = document.getElementById('home-agent-prompt');
  const copyStatus = document.getElementById('home-copy-status');
  document.getElementById('home-copy-prompt')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prompt.value);
      copyStatus.textContent = '调用示例已复制。安装 web-atlas skill 后，在 Agent 对话中使用。';
    } catch {
      prompt.focus();
      prompt.select();
      copyStatus.textContent = '示例已选中，手动复制后可在 Agent 对话中使用。';
    }
  });
})();
