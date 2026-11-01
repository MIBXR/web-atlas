// ─────────────────────────────────────────────────────────────────────────
//  Scene · 帧序列状态机
//  推进 1a → 1b → 1c → 1d → 3，每帧通过 body[data-frame="..."] 暴露给 CSS
//  跳过：任意点击 / Esc 键 / localStorage 记住"看过完整版"
// ─────────────────────────────────────────────────────────────────────────

(() => {
  // ⚠️ 开发模式：每次刷新都完整播放、不响应 click skip、不写 localStorage
  // M6 联调完毕 release 前改成 false
  const DEV = false;
  window.__DEV = DEV;
  // 临时禁用 skip 路径：落地页第二屏未完工，跳过看不到东西
  // M7 第二屏落地后改回 false 重启 skip
  const SKIP_DISABLED = true;

  const TITLE = 'Clawd on Desk';
  const SEEN_KEY = 'clawd-intro-seen';

  // 时序参数（可调）
  const T = {
    cursorOnly: 500,    // 1a 光标闪
    typeForward: 100,   // 1b 打字 ms/字符
    flashDur: 250,      // 1c 闪烁单次时长（亮+灭）
    flashCount: 2,      // 1c 闪 2 下
    typeReverse: 50,    // 1d 删除 ms/字符
    afterDelete: 200,   // 1d 删完后留白
    centerMove: 600,    // 1e Clawd 平滑居中（须与 CSS .clawd transition 0.6s 一致）
    reactDur: 3500,     // 帧 3 react-double 持续时长
                        // body-panic 自身 2s 跑完，再留 1.5s 让 blink-r infinite 多眨几次
                        // 否则惊慌结束瞬间切 idle，眨眼断档"突然瞎了"
  };

  let skipped = false;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function setFrame(name) {
    document.body.dataset.frame = name;
    window.dispatchEvent(new CustomEvent('frame-change', { detail: { frame: name } }));
  }

  function setLookAt(target) {
    if (window.__eyeTrack) window.__eyeTrack.lookAt = target;
  }

  function markSeen() {
    if (DEV || SKIP_DISABLED) return;
    try { localStorage.setItem(SEEN_KEY, '1'); } catch {}
  }
  function hasSeen() {
    if (DEV || SKIP_DISABLED) return false;
    try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
  }

  function skip() {
    if (skipped) return;
    skipped = true;
    if (window.__typewriter) {
      window.__typewriter.interrupt();
      window.__typewriter.clear();   // 清空标题，到帧 4 不留残字
    }
    // 跳过直接到帧 4 拖拽舞台（react-double 已无意义，眼神恢复 idle）
    if (window.__eyeTrack) {
      window.__eyeTrack.paused = false;
      window.__eyeTrack.lookAt = null;
    }
    markSeen();
    setFrame('4');
  }

  async function playFull() {
    // 入场亮相：眼+身正位前视（不跟鼠标也不盯光标）
    setLookAt('center');

    // 1a · Clawd fade-in + 光标闪 + 亮相停半秒（眼睛维持正位）
    setFrame('1a');
    await wait(T.cursorOnly);
    if (skipped) return;

    // 亮相结束 → 眼+身转向光标 ▌（按 idle-follow 算法）
    // 打字时光标随 brand-text 推进右移，删字左移 → 眼+身一路跟随
    const cursorEl = document.getElementById('cursor');
    setLookAt(cursorEl);

    // 1b · 打字 forward
    setFrame('1b');
    await window.__typewriter.forward(TITLE, T.typeForward);
    if (skipped) return;

    // 1c · 全字闪 2 下
    setFrame('1c');
    await window.__typewriter.flash(T.flashCount, T.flashDur);
    if (skipped) return;

    // 1d · 反向删除 + 眼神回正 + 留白
    setFrame('1d');
    await window.__typewriter.reverse(T.typeReverse);
    if (skipped) return;
    setLookAt('center');   // 删完字 → 眼睛归 0,0（盯前方）
    await wait(T.afterDelete);
    if (skipped) return;

    // 1e · Clawd 平滑居中（CSS transition 0.6s overshoot）
    setFrame('1e');
    await wait(T.centerMove);
    if (skipped) return;

    // 帧 3 · iris 扩散 + Clawd 缩小 + 切 react-double 惊慌（同步触发）
    setFrame('3');
    if (window.__eyeTrack) window.__eyeTrack.paused = true;

    // 等 react-double 惊慌动画跑完
    await wait(T.reactDur);
    if (skipped) return;

    // 帧 4 · 拖拽舞台：恢复 idle-follow，弹 Drag me 提示 + 目标方块
    setFrame('4');
    setLookAt(null);
    if (window.__eyeTrack) window.__eyeTrack.paused = false;
    markSeen();
  }

  function init() {
    // DEV 模式 / SKIP_DISABLED：完全关掉 click skip 和 localStorage 跳过，每次硬刷都完整播放
    if (!DEV && !SKIP_DISABLED) {
      window.addEventListener('click', (e) => {
        if (e.target && e.target.closest && e.target.closest('#dev-panel')) return;
        skip();
      }, { capture: true });

      if (hasSeen()) {
        if (window.__typewriter) window.__typewriter.clear();
        if (window.__eyeTrack) {
          window.__eyeTrack.paused = false;
          window.__eyeTrack.lookAt = null;
        }
        setFrame('4');
        return;
      }
    }

    // Esc 跳过保留（开发期想跳到帧 3 看末态时用）
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') skip();
    });

    playFull();
  }

  // 等 typewriter 模块就位
  if (window.__typewriter) init();
  else window.addEventListener('load', init);

  // 暴露调试用
  window.__scene = { skip, replay: () => { try { localStorage.removeItem(SEEN_KEY); } catch {}; location.reload(); } };
})();
