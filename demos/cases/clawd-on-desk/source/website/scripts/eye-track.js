// ─────────────────────────────────────────────────────────────────────────
//  Clawd · 眼神追踪
//  算法照搬主项目 D:/animation/src/tick.js + renderer.js
//  改造点：去掉 IPC、去掉 200ms 重发、用 rAF 替代 setInterval(50)
// ─────────────────────────────────────────────────────────────────────────

(() => {
  // ── 配置（与 themes/clawd/theme.json 对齐）────────────────────────────
  const CFG = {
    EYE_RATIO_X: 0.489,       // 眼球在角色 49% 横位（SVG viewBox 测量）
    EYE_RATIO_Y: 0.756,       // 眼球在角色 76% 纵位
    MAX_OFFSET: 3,            // SVG 单位（viewBox 宽 45）— overlay 调
    BODY_SCALE: 0.33,         // 身体偏移 = 眼偏 × 0.33
    SHADOW_STRETCH: 0.15,     // 影子横向拉伸系数
    SHADOW_SHIFT: 0.3,        // 影子横向偏移系数
    SATURATION_DIST: 300,     // px — 鼠标距眼球这么远时眼睛达到满偏移
  };

  const clawdEl  = document.getElementById('clawd');
  const eyesEl   = document.getElementById('eyes-js');
  const bodyEl   = document.getElementById('body-js');
  const shadowEl = document.getElementById('shadow-js');

  if (!clawdEl || !eyesEl) {
    console.warn('[eye-track] 找不到 #clawd 或 #eyes-js');
    return;
  }

  // 暴露给 dev overlay 调参 / 暂停 / 眼神锁定目标用
  // lookAt: null = target 是鼠标（默认 idle-follow）
  //         'center' = 眼+身都归 0,0（前视回正，呼吸眨眼仍跑）
  //         HTMLElement = target 是该元素中心，眼+身按 idle-follow 算法（身体 = 眼 × BODY_SCALE）
  window.__eyeTrack = { CFG, paused: false, lookAt: null };

  let mouseX = 0, mouseY = 0, hasMouse = false;
  let lastDx = NaN, lastDy = NaN;

  function computeOffset(targetX, targetY, eyeScreenX, eyeScreenY) {
    const relX = targetX - eyeScreenX;
    const relY = targetY - eyeScreenY;
    const dist = Math.sqrt(relX * relX + relY * relY);
    if (dist <= 1) return [0, 0];
    const scale = Math.min(1, dist / CFG.SATURATION_DIST);
    return [(relX / dist) * CFG.MAX_OFFSET * scale, (relY / dist) * CFG.MAX_OFFSET * scale];
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMouse = true;
  }, { passive: true });

  function applyEye(dx, dy) {
    eyesEl.setAttribute('transform', `translate(${dx}, ${dy})`);

    const bdx = Math.round(dx * CFG.BODY_SCALE * 2) / 2;
    const bdy = Math.round(dy * CFG.BODY_SCALE * 2) / 2;
    if (bodyEl) bodyEl.setAttribute('transform', `translate(${bdx}, ${bdy})`);

    if (shadowEl) {
      const absDx  = Math.abs(bdx);
      const scaleX = 1 + absDx * CFG.SHADOW_STRETCH;
      const shiftX = Math.round(bdx * CFG.SHADOW_SHIFT * 2) / 2;
      shadowEl.setAttribute('transform', `translate(${shiftX}, 0) scale(${scaleX}, 1)`);
    }
  }

  function tick() {
    requestAnimationFrame(tick);

    // 调试模式暂停 + 眼球归位
    if (window.__eyeTrack.paused || clawdEl.classList.contains('is-dizzy') || clawdEl.classList.contains('dizzy-recovering')) {
      if (lastDx !== 0 || lastDy !== 0) {
        lastDx = 0; lastDy = 0;
        applyEye(0, 0);
      }
      return;
    }

    // ── target 选择：lookAt 优先 ───────────────────────────
    let targetX, targetY, hasTarget = false;
    const lookAt = window.__eyeTrack.lookAt;
    if (lookAt === 'center') {
      // 前视回正：眼+身都归 0（呼吸/眨眼是 SVG 内置 animation，不受影响）
      if (lastDx !== 0 || lastDy !== 0) {
        lastDx = 0; lastDy = 0;
        applyEye(0, 0);
      }
      return;
    } else if (lookAt && typeof lookAt.getBoundingClientRect === 'function') {
      const r = lookAt.getBoundingClientRect();
      targetX = r.left + r.width / 2;
      targetY = r.top + r.height / 2;
      hasTarget = true;
    } else if (hasMouse) {
      targetX = mouseX;
      targetY = mouseY;
      hasTarget = true;
    }

    if (!hasTarget) return;

    const rect = clawdEl.getBoundingClientRect();
    const eyeScreenX = rect.left + rect.width  * CFG.EYE_RATIO_X;
    const eyeScreenY = rect.top  + rect.height * CFG.EYE_RATIO_Y;

    let [dx, dy] = computeOffset(targetX, targetY, eyeScreenX, eyeScreenY);

    // 像素级 round + Y clamp（眼睛上下幅度比左右小）
    dx = Math.round(dx * 2) / 2;
    dy = Math.round(dy * 2) / 2;
    const yClamp = CFG.MAX_OFFSET * 0.5;
    dy = Math.max(-yClamp, Math.min(yClamp, dy));

    if (dx !== lastDx || dy !== lastDy) {
      lastDx = dx;
      lastDy = dy;
      applyEye(dx, dy);
    }
  }

  tick();
})();
