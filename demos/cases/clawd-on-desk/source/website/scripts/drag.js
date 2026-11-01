// ─────────────────────────────────────────────────────────────────────────
//  Drag · M2.4b 拖拽手势 + 吸入判定 + 本体中心紫点标定
//  · pointerdown + capture → body.dragging（鼠标 / 触摸 / 笔共用）
//  · pointermove → 容器中心 = 指针位置 - 握点偏移 (按哪拖哪)
//  · 实时检测：本体中心 (容器中心 + body offset) 进入 drop-zone 矩形 → 吸入
//  · 吸入：平滑滑到 drop-zone 中心 + body.absorbed (锁定 · 等 4c 接管)
//  · 没吸入松手：留原地 + 切回 idle (符合桌宠语义)
//  · 紫点 (#body-anchor)：dev mode + frame=4 显示，拖动改 --clawd-body-cx/cy
// ─────────────────────────────────────────────────────────────────────────

(() => {
  const clawd     = document.getElementById('clawd');
  const dropZone  = document.getElementById('drop-zone');
  const anchor    = document.getElementById('body-anchor');
  if (!clawd || !dropZone || !anchor) return;

  const root = document.documentElement;
  const geometry = window.__stageGeometry;
  let pointerId = null;
  let absorbTimer = null;

  let isDragging     = false;
  let offsetX = 0, offsetY = 0;     // 鼠标握点相对容器中心的偏移
  let absorbed       = false;       // 已吸入锁定
  let anchorDragging = false;       // 紫点正在被拖
  let anchorOffX = 0, anchorOffY = 0;

  // ── 工具函数 ────────────────────────────────────────────────────────
  function bodyOffset() {
    const cx = geometry.length('--clawd-body-cx');
    const cy = geometry.length('--clawd-body-cy');
    return { cx, cy };
  }
  function clawdCenter() {
    const r = clawd.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function bodyCenter() {
    return geometry.bodyCenter();
  }
  function setClawdCenter(x, y) {
    clawd.style.left = x + 'px';
    clawd.style.top  = y + 'px';
  }
  function inDropZone() {
    const r = dropZone.getBoundingClientRect();
    const b = bodyCenter();
    return b.x >= r.left && b.x <= r.right && b.y >= r.top && b.y <= r.bottom;
  }

  // ── 吸入：平滑滑到 drop-zone 中心 (本体中心对齐 zone 中心) ──────────
  function absorb() {
    if (absorbed) return;
    absorbed   = true;
    isDragging = false;
    releasePointer();
    document.body.classList.remove('dragging');
    document.body.classList.add('absorbed');
    if (window.__eyeTrack) window.__eyeTrack.paused = true;

    const r   = dropZone.getBoundingClientRect();
    const dzX = r.left + r.width  / 2;
    const dzY = r.top  + r.height / 2;
    const o   = bodyOffset();
    // 容器中心需补偿 body offset，让本体视觉中心落在 zone 中心
    clawd.style.transition = 'left 0.4s cubic-bezier(.06,.06,.51,1.1), top 0.4s cubic-bezier(.06,.06,.51,1.1)';
    setClawdCenter(dzX - o.cx, dzY - o.cy);

    absorbTimer = setTimeout(() => {
      absorbTimer = null;
      if (!absorbed || document.body.dataset.frame !== '4') return;
      // 清 inline style · 让 CSS `body.absorbed[data-frame="4"] .clawd` 接管定位
      // 2026-04-20 · drop-zone 和 Clawd typing 位置都绑定到 calc(50% + work-dx, ...)
      // 吸入点 == typing 点 · terminal-up 切 SVG 时位置完全一致，不瞬移
      // inline 和 CSS 目标值一致 → 不会抖动
      clawd.style.left       = '';
      clawd.style.top        = '';
      clawd.style.transition = '';
      window.dispatchEvent(new CustomEvent('clawd-absorbed'));
    }, 400);
  }

  // ── Clawd 拖拽 ──────────────────────────────────────────────────────
  clawd.addEventListener('pointerdown', (e) => {
    if (document.body.dataset.frame !== '4') return;            // 只在帧 4 拖
    if (document.body.classList.contains('dev-mode')) return;   // dev mode 让 dev overlay 接管
    if (absorbed || document.body.classList.contains('terminal-up')) return;
    if (!e.isPrimary || e.button !== 0 || pointerId !== null) return;

    isDragging = true;
    pointerId = e.pointerId;
    clawd.setPointerCapture(pointerId);
    document.body.classList.add('dragging');
    document.body.classList.add('interacted');   // 永久标记 · arc 不再出现
    if (window.__eyeTrack) window.__eyeTrack.paused = true;

    // 关掉 inline transition (吸入失败重拖时会留下旧 transition)
    clawd.style.transition = 'none';

    const c = clawdCenter();
    offsetX = e.clientX - c.x;
    offsetY = e.clientY - c.y;

    e.preventDefault();
  });

  function setVisibleCenter(x, y) {
    const offset = bodyOffset();
    const stage = document.querySelector('.stage').getBoundingClientRect();
    const point = geometry.clampBody({ x: x + offset.cx, y: y + offset.cy }, clawd.getBoundingClientRect().width, stage);
    setClawdCenter(point.x - offset.cx, point.y - offset.cy);
  }
  window.addEventListener('pointermove', (e) => {
    if (!isDragging || e.pointerId !== pointerId) return;
    setVisibleCenter(e.clientX - offsetX, e.clientY - offsetY);
    if (inDropZone()) absorb();
  });

  function releasePointer() {
    const id = pointerId;
    pointerId = null;
    if (id !== null && clawd.hasPointerCapture(id)) clawd.releasePointerCapture(id);
  }
  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    releasePointer();
    document.body.classList.remove('dragging');
    if (window.__eyeTrack) window.__eyeTrack.paused = false;
    // 留原地 (inline left/top 已写入)，切回 idle SVG 自然站着
    // 主项目桌宠语义：松手就停，不弹回
  }
  window.addEventListener('pointerup', e => { if (e.pointerId === pointerId) stopDrag(); });
  window.addEventListener('pointercancel', e => { if (e.pointerId === pointerId) stopDrag(); });
  clawd.addEventListener('lostpointercapture', stopDrag);
  window.addEventListener('blur', stopDrag);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopDrag(); });
  window.addEventListener('resize', () => {
    stopDrag();
    if (absorbed) {
      // Snap animation may be in flight: let the new CSS target take over.
      clawd.style.left = '';
      clawd.style.top = '';
    } else if (clawd.style.left && document.body.dataset.frame === '4') {
      const center = clawdCenter();
      setVisibleCenter(center.x, center.y);
    }
  });

  // ── 紫点本体中心标定 (dev mode + frame=4) ───────────────────────────
  function placeAnchor() {
    if (!document.body.classList.contains('dev-mode')) return;
    if (document.body.dataset.frame !== '4') return;
    const b = bodyCenter();
    anchor.style.left = b.x + 'px';
    anchor.style.top  = b.y + 'px';
  }
  function tickAnchor() {
    requestAnimationFrame(tickAnchor);
    if (!anchorDragging) placeAnchor();
  }
  requestAnimationFrame(tickAnchor);

  anchor.addEventListener('mousedown', (e) => {
    anchorDragging = true;
    const r = anchor.getBoundingClientRect();
    anchorOffX = e.clientX - (r.left + r.width  / 2);
    anchorOffY = e.clientY - (r.top  + r.height / 2);
    e.preventDefault();
    e.stopPropagation();
  });

  window.addEventListener('mousemove', (e) => {
    if (!anchorDragging) return;
    const newX = e.clientX - anchorOffX;
    const newY = e.clientY - anchorOffY;
    const c = clawdCenter();
    root.style.setProperty('--clawd-body-cx', (newX - c.x).toFixed(1) + 'px');
    root.style.setProperty('--clawd-body-cy', (newY - c.y).toFixed(1) + 'px');
    anchor.style.left = newX + 'px';
    anchor.style.top  = newY + 'px';

    // 已吸入状态下实时重算宠物位置 · 让鹿鹿边拖紫点边看吸入对齐效果
    if (absorbed) {
      const r   = dropZone.getBoundingClientRect();
      const dzX = r.left + r.width  / 2;
      const dzY = r.top  + r.height / 2;
      const o   = bodyOffset();
      clawd.style.transition = 'none';
      setClawdCenter(dzX - o.cx, dzY - o.cy);
    }
  });

  window.addEventListener('mouseup', () => {
    if (anchorDragging) {
      const cx = root.style.getPropertyValue('--clawd-body-cx').trim();
      const cy = root.style.getPropertyValue('--clawd-body-cy').trim();
      console.log(`%c[body-anchor]%c --clawd-body-cx: ${cx};  --clawd-body-cy: ${cy};`,
                  'color:#B450C8;font-weight:bold', 'color:inherit');
    }
    anchorDragging = false;
  });

  // ── 帧切换重置 (离开帧 4 清拖拽态 / 清 inline style) ─────────────────
  function reset() {
    stopDrag();
    clearTimeout(absorbTimer);
    absorbTimer = null;
    isDragging = false;
    absorbed   = false;
    document.body.classList.remove('dragging', 'absorbed');
    clawd.style.left       = '';
    clawd.style.top        = '';
    clawd.style.transition = '';
  }
  window.addEventListener('frame-change', (e) => {
    if (e.detail.frame !== '4') reset();
  });

  // 调试用入口
  window.__drag = {
    absorb,
    reset,
    bodyCenter,
  };
})();
