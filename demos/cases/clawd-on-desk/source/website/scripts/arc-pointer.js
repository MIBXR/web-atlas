// ─────────────────────────────────────────────────────────────────────────
//  Arc Pointer · frame=4 进入 3s 后画抛物线指示
//  两端绑定 DOM 锚点；弧度随落点派生，dev overlay 可临时覆盖。
//  dev mode 下 3 个 handle 拖动调，arc 实时跟随
//  · 终点实心箭头跟随切线方向
//  · 引导手沿 path 25%→75% 循环（1.5s 滑 + 终点往上渐隐 + 起点渐显）
// ─────────────────────────────────────────────────────────────────────────

(() => {
  const svg      = document.getElementById('arc-pointer');
  const path     = document.getElementById('arc-path');
  const arrow    = document.getElementById('arc-arrow');
  const hand     = document.getElementById('drag-hand');
  const clawd    = document.getElementById('clawd');
  const dropZone = document.getElementById('drop-zone');
  if (!svg || !path) return;

  const root = document.documentElement;
  const geometry = window.__stageGeometry;
  const length = geometry.length;
  const movingProperties = new Set();
  clawd.addEventListener('transitionrun', e => {
    if (e.target === clawd && ['left', 'top', 'width', 'height'].includes(e.propertyName)) movingProperties.add(e.propertyName);
  });
  for (const event of ['transitionend', 'transitioncancel']) {
    clawd.addEventListener(event, e => {
      if (e.target !== clawd) return;
      movingProperties.delete(e.propertyName);
      if (svg.classList.contains('show')) applyPath();
    });
  }

  // 一劳永逸版：arc 起终点派生绑定到 Clawd 身体中心 / drop-zone 中心
  //   · 起点 = Clawd 身体中心（容器几何中心 + body-cx/cy）+ --arc-start-lift-x/y
  //   · 终点 = drop-zone 中心（DOM 位置）          + --arc-end-lift-x/y
  //   · 控制点 = 两端派生（--arc-cx/cy 仅用于 dev 手动覆盖）
  // 窗口缩放 / Clawd 移位 / drop-zone 重绑都自动跟，弧线两端不漂
  function computeArc() {
    // 起点：Clawd 身体中心 + lift
    const body = geometry.bodyCenter();
    const x1 = body.x + length('--arc-start-lift-x');
    const y1 = body.y + length('--arc-start-lift-y');

    // 终点：drop-zone 中心 + lift
    const dRect = dropZone ? dropZone.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    const x2 = dRect.left + dRect.width  / 2 + length('--arc-end-lift-x');
    const y2 = dRect.top  + dRect.height / 2 + length('--arc-end-lift-y');

    const viewport = svg.getBoundingClientRect();
    const curve = geometry.guideCurve({ x: x1, y: y1 }, { x: x2, y: y2 }, viewport);
    // Keep manual dev adjustments, but never ship a viewport-specific control.
    const cx = root.style.getPropertyValue('--arc-cx') ? length('--arc-cx') : curve.control.x;
    const cy = root.style.getPropertyValue('--arc-cy') ? length('--arc-cy') : curve.control.y;
    root.style.setProperty('--arc-auto-cx', curve.control.x + 'px');
    root.style.setProperty('--arc-auto-cy', curve.control.y + 'px');
    for (const [id, x, y] of [['start', x1, y1], ['end', x2, y2], ['control', cx, cy]]) {
      const handle = document.getElementById('arc-handle-' + id);
      if (handle) { handle.style.left = x + 'px'; handle.style.top = y + 'px'; }
    }
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  function applyPath() {
    const d = computeArc();
    const viewport = svg.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${viewport.width} ${viewport.height}`);
    path.setAttribute('d', d);

    // 终点箭头：取 path 末端切线方向 → 三角朝向
    if (arrow && path.getTotalLength) {
      const L = path.getTotalLength();
      if (L > 0) {
        const pEnd  = path.getPointAtLength(L);
        const pNear = path.getPointAtLength(Math.max(0, L - 4));
        const angle = Math.atan2(pEnd.y - pNear.y, pEnd.x - pNear.x) * 180 / Math.PI;
        arrow.setAttribute('transform', `translate(${pEnd.x} ${pEnd.y}) rotate(${angle})`);
      }
    }
  }

  function show() {
    if (document.body.dataset.frame !== '4') return;
    applyPath();
    svg.classList.remove('show');
    void svg.offsetWidth;
    svg.classList.add('show');
  }

  function hide() {
    svg.classList.remove('show');
  }

  // ── 引导分层时序：切帧 4 后 2s 才出现 (drop-zone 1s 出，arc 再晚 1s)
  //    给用户先看 hint → 看 drop-zone → 还卡壳才出 arc 强引导
  //    M2.4b 实现拖拽后，mousedown 在 Clawd 上要 clearTimeout(timer) 取消 arc
  //    dev mode 下立即 show (跳过 3s 延迟，鹿鹿切帧 4 能直接调 handle)
  let timer = null;
  window.addEventListener('frame-change', (e) => {
    if (timer) { clearTimeout(timer); timer = null; }
    if (e.detail.frame === '4') {
      if (document.body.classList.contains('dev-mode')) {
        show();
      } else {
        timer = setTimeout(show, 3000);
      }
    } else {
      hide();
    }
  });

  // ── 窗口缩放重算 ────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    if (svg.classList.contains('show')) applyPath();
  });
  // Covers sprite size transitions, font load and dynamic browser bars too.
  const observer = new ResizeObserver(() => {
    if (svg.classList.contains('show')) applyPath();
  });
  observer.observe(clawd);
  observer.observe(dropZone);
  observer.observe(svg);

  // ── 引导手循环动画 (rAF · 沿 path 25%→75% · 总周期 2.0s) ──────────
  //   时间轴 (循环):
  //     0.00 – 0.10s   起点(25%)         opacity 0 → 1   (渐显)
  //     0.10 – 1.60s   25% 滑到 75%       opacity 1       (1.5s 滑动)
  //     1.60 – 1.80s   75% + 上漂 12px    opacity 1 → 0   (往上渐隐)
  //     1.80 – 2.00s   起点(25%)         opacity 0       (留白等下一轮)
  const HAND_PERIOD  = 2000;   // ms
  const T_FADE_IN    = 100;
  const T_SLIDE_END  = 1600;
  const T_FADE_OUT   = 1800;
  const HAND_LIFT    = 12;     // 终点往上漂的像素

  function placeHand(x, y, opacity) {
    if (!hand) return;
    hand.setAttribute('transform', `translate(${x} ${y})`);
    hand.style.opacity = opacity;
  }

  let handStart = 0;
  function tickHand(now) {
    requestAnimationFrame(tickHand);
    if (!hand || !path.getTotalLength) return;
    if (!svg.classList.contains('show') || document.hidden ||
        (!document.body.classList.contains('dev-mode') &&
         document.body.classList.contains('interacted'))) {
      hand.style.opacity = 0;
      handStart = 0;
      return;
    }
    if (!handStart) handStart = now;
    // ResizeObserver does not see position-only transitions (e.g. two phones
    // sharing the 180px minimum size). Follow the moving anchor until it settles.
    if (movingProperties.size) applyPath();
    const t = (now - handStart) % HAND_PERIOD;
    const L = path.getTotalLength();
    if (L === 0) return;

    // 25% / 75% 处的固定坐标
    const pStart = path.getPointAtLength(L * 0.25);
    const pEnd   = path.getPointAtLength(L * 0.75);

    if (t < T_FADE_IN) {
      // 起点渐显
      const a = t / T_FADE_IN;
      placeHand(pStart.x, pStart.y, a);
    } else if (t < T_SLIDE_END) {
      // 25% → 75% 滑动
      const k = (t - T_FADE_IN) / (T_SLIDE_END - T_FADE_IN);   // 0→1
      const len = L * (0.25 + 0.5 * k);
      const p = path.getPointAtLength(len);
      placeHand(p.x, p.y, 1);
    } else if (t < T_FADE_OUT) {
      // 75% 位置往上渐隐
      const k = (t - T_SLIDE_END) / (T_FADE_OUT - T_SLIDE_END); // 0→1
      placeHand(pEnd.x, pEnd.y - HAND_LIFT * k, 1 - k);
    } else {
      // 留白：handle 留在起点不可见
      placeHand(pStart.x, pStart.y, 0);
    }
  }
  requestAnimationFrame(tickHand);

  // ── dev mode 下 rAF 实时重算 path (handle 拖动时 path/箭头跟随) ─────
  function devTick() {
    requestAnimationFrame(devTick);
    if (document.body.classList.contains('dev-mode') && svg.classList.contains('show')) {
      applyPath();
    }
  }
  devTick();

  window.__arcPointer = { refresh: applyPath };
})();
