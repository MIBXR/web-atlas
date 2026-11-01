// ─────────────────────────────────────────────────────────────────────────
//  Terminal · M2.4c 升起 + M2.4d 内部 Claude Code 剧本
//
//  M2.4c · 吸入后：body.terminal-up → drop-zone 淡出 + Clawd 切 working-typing
//          + 终端从底部 scale 弹出 (CSS 0.5s)
//
//  M2.4d · 终端内剧本（"舞台真实"复刻 Claude Code · 视频参考 2026-04-20）：
//    ├─ terminal 弹出稳定 → 800ms
//    ├─ 用户逐字打字 "Clone https://..." (60ms/char)
//    ├─ 600ms (像用户回看再回车)
//    ├─ 回车：输入行整段变历史 · input-line.sent 隐藏
//    ├─ 400ms
//    ├─ thinking "* Moonwalking... (thinking with xhigh effort)"
//    ├─ 1500ms
//    ├─ Bash(git clone ...) tool call 块
//    ├─ 500ms
//    └─ 权限框展开 · 定格（M2.4e 接棒让 Clawd 弹自己的白底卡片）
//
//  rebind 兼容：frame-change 离开 4 清态，避免再次吸入时剧本叠加
// ─────────────────────────────────────────────────────────────────────────

(() => {
  const USER_INPUT = 'Clone https://github.com/rullerzhou-afk/clawd-on-desk and help me install it';
  const BASH_CMD   = 'git clone https://github.com/rullerzhou-afk/clawd-on-desk.git';
  const RETRY_NOTE = 'I can start with just the repo... promise.';
  // M2.4g 彩蛋文案 · 对齐主仓库 src/settings-renderer.js (aboutEasterEggToast)
  const EXIT_EGG_TOAST = "\u{1F980} Coding shouldn't feel lonely. — Ruller_Lulu / 鹿鹿";
  const EXIT_EGG_THRESHOLD = 7;
  const EXIT_EGG_TOAST_TTL = 5000;

  const T = {
    startDelay:    800,
    userTypeChar:   60,
    afterType:     600,
    thinkingOnset: 400,
    thinkingDur:  4100,   // 0.4 onset + 4.1 thinking + 0.5 pause = 5s = Clawd 落地的时刻
    toolCallPause: 500,
    permCardDelay: 500,   // 权限框定格后 · 再延迟弹 Clawd 白底卡片（留呼吸）
    permIdleAfter: 5000,  // 新版举灯泡通知留足展示时间，再切 idle-follow 等点击
    retryIdleAfter: 6080, // aegyo 内部 anim 从 add clawd-deny-aegyo 起算 · 到 add clawd-perm-idle 时刚好 320+6080=6400=2 整轮 · 停在 neutral 静止帧 (0%/100%) 与 idle pose 连续
    idleHandoffHold: 320, // idle sprite-fade-in 0.25s + 70ms buffer · 保证 aegyo display:none 时 idle 已确实 opacity:1 盖稳，否则有一瞬"空窗"闪背景
    idleEyeResumeDelay: 140, // neutral pose 站稳后再恢复 eye-track，别和切 sprite 同帧
    denyCardFade:   180,  // 第一次 Deny 后 · 卡片先沉下去
    denyErrorHold: 1000,  // error 趴地停顿略拉长，给被拒读感
    denyWakeDur:   1500,  // 主项目 wake.svg 一次性完整时长
    denyScratchFlash: 700, // scratch SVG 内部 animation 在 deny-wake 阶段就隐形预热（display:block opacity:0），到 deny-scratch 可见时已跑到 ~37.5%（挠头第 2 下）；再播 700ms 到 55%（手挠完回位）就交叉淡出到 aegyo · 避掉前 1.28s 与后 1.8s 两段无动作静止
    // M2.4f · Clawd 6 段时间线（总 5s · 和终端 Bash+PermBox 节拍对齐）
    clawdDetach:   140,   // T=0 → 0.14s · typing → crabwalk 交叉淡切，补掉硬断点
    clawdWalk:    1660,   // T=0.14 → 1.80s · crabwalk 到身子完全进终端左边缘
    clawdBehind:  1200,   // T=1.80 → 3.00s · 真正藏在终端后（此段不显示 sprite）
    clawdPeek:    1650,   // T=3.00 → 4.65s · mini-enter 从终端右侧冒头（显著提前，手先伸出来）
    clawdJump:     350,   // T=4.65 → 5.0s · 抛物线跳到对称右侧落地位 (对齐主项目 JUMP_DURATION)
    // M2.4e Allow 序列
    allowCardFade:    400,  // 卡片淡出
    allowStageFade:   500,  // 终端缩回、Clawd 淡出后展示六格动画
    // M2.4g · 二次 Deny 善意彩蛋序列
    exitCenterDur:     800, // Phase 1 · Clawd 滑到中央 (.clawd CSS left/top transition 0.6s + 0.2s 视觉停稳)
    exitShadesDur:    4400, // Phase 2 · 墨镜 SVG 单次动画时长 (4.4s · 播到 sparkle-far 散完定格)
    exitCreditCharMs:  100, // "Thanks for visiting." 打字机 · 100ms/char (和开场 typeForward 同节奏)
  };

  let played = false;
  let permAttempt = 0;     // 0=未进入权限选择 / 1=第一次卡片 / 2=第二次撒娇卡
  let permBusy = false;    // 卡片收起/角色表演中 · 防双击
  let permResolved = false;
  let clawdStateTimers = [];
  let retryOutcomeTimer = null;
  let sessionId = 0;
  let exitEggClickCount = 0;   // M2.4g 7-click 彩蛋 · 对齐主仓库 aboutClickCount
  let exitEggToastTimer = null;

  // 正常剧情、dev overlay 和 URL 静态预览共用可访问性状态。
  function setShowcaseVisible(visible, { focus = false } = {}) {
    const showcase = document.getElementById('showcase');
    if (!showcase) return;
    showcase.setAttribute('aria-hidden', String(!visible));
    showcase.inert = !visible;
    for (const selector of ['.stage', '#terminal', '#clawd-perm-card']) {
      const element = document.querySelector(selector);
      if (element) element.inert = visible;
    }
    const ghCard = document.getElementById('github-card');
    if (ghCard) {
      ghCard.setAttribute('aria-hidden', String(!visible));
      if (visible) ghCard.removeAttribute('tabindex');
      else ghCard.setAttribute('tabindex', '-1');
    }
    if (visible && focus) {
      requestAnimationFrame(() => {
        if (document.body.classList.contains('clawd-allowed')) {
          document.getElementById('showcase-title')?.focus({ preventScroll: true });
        }
      });
    }
  }
  window.__setShowcaseVisible = setShowcaseVisible;
  document.getElementById('showcase-replay')?.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('debugFrame');
    url.searchParams.delete('debugClasses');
    if (url.href !== window.location.href) window.location.assign(url.href);
    else window.__scene.replay();
  });

  window.addEventListener('clawd-absorbed', () => {
    document.body.classList.add('terminal-up');
    if (!played) {
      played = true;
      playScript();
    }
  });

  window.addEventListener('frame-change', (e) => {
    if (e.detail.frame !== '4') {
      document.body.classList.remove('terminal-up');
      resetScript();
    }
  });

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const waitForNextPaint = () => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
  const scheduleClawdState = (fn, ms) => {
    const id = setTimeout(fn, ms);
    clawdStateTimers.push(id);
    return id;
  };
  const clearClawdStateTimers = () => {
    clawdStateTimers.forEach(clearTimeout);
    clawdStateTimers = [];
  };
  const clearRetryOutcomeTimer = () => {
    if (retryOutcomeTimer) clearTimeout(retryOutcomeTimer);
    retryOutcomeTimer = null;
  };
  const restartOneShotSvg = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return Promise.resolve();
    const raw = el.dataset.baseSrc || el.getAttribute('src') || '';
    const base = raw.split(/[?#]/)[0];
    if (!base) return Promise.resolve();
    el.dataset.baseSrc = base;
    // Chromium will happily reuse the same in-memory SVG document for <img src="same.svg">,
    // so one-shot internal CSS animations can appear stuck on their last frame.
    // Cache-busting here mirrors D:\\animation\\src\\renderer.js and forces a fresh replay.
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(fallbackId);
        resolve();
      };
      const onLoad = () => {
        el.removeEventListener('load', onLoad);
        el.removeEventListener('error', onLoad);
        requestAnimationFrame(finish);
      };
      const fallbackId = setTimeout(() => {
        el.removeEventListener('load', onLoad);
        el.removeEventListener('error', onLoad);
        finish();
      }, 240);
      el.addEventListener('load', onLoad, { once: true });
      el.addEventListener('error', onLoad, { once: true });
      el.setAttribute('src', `${base}?_t=${Date.now()}`);
    });
  };
  window.__restartOneShotSvg = restartOneShotSvg;

  const isStale = (id) => id !== sessionId;
  const pauseEyeTrack = () => {
    if (window.__eyeTrack && !document.body.classList.contains('dev-mode')) {
      window.__eyeTrack.paused = true;
      window.__eyeTrack.lookAt = 'center';
    }
  };
  const resumeEyeTrack = () => {
    if (window.__eyeTrack && !document.body.classList.contains('dev-mode')) {
      window.__eyeTrack.paused = false;
      window.__eyeTrack.lookAt = null;
    }
  };
  const resetIdlePoseTransforms = () => {
    const eyesEl = document.getElementById('eyes-js');
    const bodyEl = document.getElementById('body-js');
    const shadowEl = document.getElementById('shadow-js');
    if (eyesEl) eyesEl.setAttribute('transform', 'translate(0, 0)');
    if (bodyEl) bodyEl.setAttribute('transform', 'translate(0, 0)');
    if (shadowEl) shadowEl.setAttribute('transform', 'translate(0, 0) scale(1, 1)');
  };
  async function transitionToPermIdle(runId, { removeClasses = [], dispatchReason = null } = {}) {
    permBusy = true;
    pauseEyeTrack();
    resetIdlePoseTransforms();
    // 先加 perm-idle + handoff · 不立即移除 deny-aegyo 等"前任" class，让它们和 perm-idle 并存 260ms
    // 期间 aegyo opacity 1→0 transition (250ms) + idle @keyframes sprite-fade-in 0→1 (250ms) 交叉进行
    // handoffHold 260ms 恰好覆盖 cross-fade 250ms · handoff 结束时 aegyo 早已淡出到 opacity:0
    document.body.classList.add('clawd-perm-idle', 'clawd-idle-handoff');

    await wait(T.idleHandoffHold);
    if (isStale(runId) || permResolved) return false;

    if (removeClasses.length) document.body.classList.remove(...removeClasses);
    resetIdlePoseTransforms();
    document.body.classList.remove('clawd-idle-handoff');

    await wait(T.idleEyeResumeDelay);
    if (isStale(runId) || permResolved) return false;

    permBusy = false;
    resumeEyeTrack();
    if (dispatchReason) {
      window.dispatchEvent(new CustomEvent('clawd-retry-exhausted', { detail: { reason: dispatchReason } }));
    }
    return true;
  }
  const getLatestPermBox = () => {
    const boxes = document.querySelectorAll('.term-perm-box');
    return boxes[boxes.length - 1] || null;
  };
  const setTerminalPermSelection = (selectedIndex) => {
    const box = getLatestPermBox();
    if (!box) return;
    box.querySelectorAll('.term-perm-option').forEach((el, idx) => {
      el.classList.toggle('selected', idx === selectedIndex);
    });
  };
  const showPermissionCard = ({ retry = false, note = '' } = {}) => {
    const permCmd = document.getElementById('perm-card-cmd');
    const permNote = document.getElementById('perm-card-note');
    const permCard = document.getElementById('clawd-perm-card');
    if (permCmd) permCmd.textContent = BASH_CMD;
    if (permNote) permNote.textContent = note;
    document.body.classList.toggle('clawd-perm-retry', retry);
    if (permCard) permCard.setAttribute('aria-hidden', 'false');
    document.body.classList.add('clawd-perm-show');
  };
  const hidePermissionCard = () => {
    const permCard = document.getElementById('clawd-perm-card');
    document.body.classList.remove('clawd-perm-show');
    if (permCard) permCard.setAttribute('aria-hidden', 'true');
  };

  async function playScript() {
    const runId = ++sessionId;
    const history  = document.getElementById('term-history');
    const inputLn  = document.getElementById('term-input-line');
    const inputTxt = document.getElementById('term-input-text');
    const footerL  = document.getElementById('term-footer-left');
    if (!history || !inputLn || !inputTxt) return;

    // 每次 append 后滚到底（真实 CC 终端行为 · 新内容可见，老内容滚出视窗）
    const scrollDown = () => requestAnimationFrame(() => {
      history.scrollTop = history.scrollHeight;
    });

    await wait(T.startDelay);
    if (isStale(runId)) return;

    // 1. 用户逐字打字
    if (window.__typewriter && window.__typewriter.typeInto) {
      await window.__typewriter.typeInto(inputTxt, USER_INPUT, T.userTypeChar);
    } else {
      inputTxt.textContent = USER_INPUT;
    }
    await wait(T.afterType);
    if (isStale(runId)) return;

    // 2. 回车 → 输入行变历史
    appendUserMsg(history, USER_INPUT);
    inputLn.classList.add('sent');
    inputTxt.textContent = '';
    scrollDown();

    // Clawd 6 段独立时间线（总 5s · T=0 是回车那一刻）
    //   T=0      → untyping · 140ms 交叉淡切，typing 离席
    //   T=0.14s  → walking  · 1.66s crabwalk 到身子完全进终端左边缘
    //   T=1.80s  → behind   · 真正藏终端后，瞬移到右侧冒头位但不显示 crabwalk
    //   T=3.00s  → peeking  · mini-enter 1.65s 冒头（显著提前，给手臂更多读感）
    //   T=4.65s  → jumping  · 350ms 抛物线跳到落地位
    //   T=5.0s  → alerting 由终端剧本触发（和 appendPermBox 同步 · 见下方 wait）
    clearClawdStateTimers();
    document.body.classList.add('clawd-untyping');
    const guard = () => permResolved || permBusy;
    scheduleClawdState(() => {
      if (guard()) return;
      document.body.classList.remove('clawd-untyping');
      document.body.classList.add('clawd-walking');
    }, T.clawdDetach);
    scheduleClawdState(() => {
      if (guard()) return;
      document.body.classList.remove('clawd-untyping', 'clawd-walking');
      document.body.classList.add('clawd-behind');
    }, T.clawdDetach + T.clawdWalk);
    scheduleClawdState(() => {
      if (guard()) return;
      document.body.classList.remove('clawd-behind');
      restartOneShotSvg('.clawd-peek');
      document.body.classList.add('clawd-peeking');
    }, T.clawdDetach + T.clawdWalk + T.clawdBehind);
    scheduleClawdState(() => {
      if (guard()) return;
      document.body.classList.remove('clawd-peeking');
      document.body.classList.add('clawd-jumping');
    }, T.clawdDetach + T.clawdWalk + T.clawdBehind + T.clawdPeek);

    // 3. thinking
    await wait(T.thinkingOnset);
    if (isStale(runId)) return;
    appendThinking(history);
    if (footerL) footerL.textContent = 'esc to interrupt';
    scrollDown();

    // 4. Bash tool call (T=4.5s · Clawd 还在冒头/起跳过渡)
    await wait(T.thinkingDur);
    if (isStale(runId)) return;
    appendToolCall(history, BASH_CMD);
    scrollDown();

    // 5. Clawd 刚落地 → 权限框 + 从头播放新版举灯泡通知
    await wait(T.toolCallPause);
    if (isStale(runId)) return;
    appendPermBox(history, BASH_CMD);
    scrollDown();
    clearClawdStateTimers();
    await restartOneShotSvg('.clawd-alert');
    if (isStale(runId)) return;
    document.body.classList.remove('clawd-untyping', 'clawd-walking', 'clawd-behind', 'clawd-peeking', 'clawd-jumping');
    document.body.classList.add('clawd-alerting');

    // 6. Clawd 白底权限卡片 · 从右 overshoot 滑入（M2.4d 主角戏）
    await wait(T.permCardDelay);
    if (isStale(runId)) return;
    permAttempt = 1;
    permBusy = false;
    showPermissionCard();

    // 7. 展示举灯泡通知后切 idle-follow，卡片继续等待用户。
    await wait(T.permIdleAfter);
    if (isStale(runId) || permResolved || permBusy || permAttempt !== 1) return;
    await transitionToPermIdle(runId, { removeClasses: ['clawd-alerting'] });
  }

  // ── M2.4f · 第一次 Deny：error → wake → scratch → aegyo retry ─────
  async function playFirstDenySequence() {
    const runId = sessionId;
    clearClawdStateTimers();
    clearRetryOutcomeTimer();
    permBusy = true;
    permAttempt = 0;
    pauseEyeTrack();
    hidePermissionCard();
    setTerminalPermSelection(2);
    document.body.classList.remove('clawd-alerting', 'clawd-perm-idle', 'clawd-perm-retry');
    document.body.classList.add('clawd-deny-error');

    await wait(T.denyCardFade);
    if (isStale(runId) || permResolved) return;
    await wait(T.denyErrorHold);
    if (isStale(runId) || permResolved) return;

    document.body.classList.remove('clawd-deny-error');
    document.body.classList.add('clawd-deny-wake');
    // scratch 是 <img> · 内部 SVG animation 从 img load 起算，不是 display 切换时重启
    // 所以必须显式 restart（改 src cache-bust 触发 reload）· 否则用户看到的 scratch pose 完全取决于从页面载入到点 Deny 过了多少秒——完全随机（曾撞到"手抬到一半就消失"）
    // 和 wake 并行 restart，复用 restartOneShotSvg 的 onload 等待机制
    await Promise.all([
      restartOneShotSvg('.clawd-wake'),
      restartOneShotSvg('.clawd-scratch'),
    ]);
    if (isStale(runId) || permResolved) return;
    await wait(T.denyWakeDur);
    if (isStale(runId) || permResolved) return;

    document.body.classList.remove('clawd-deny-wake');
    document.body.classList.add('clawd-deny-scratch');
    await wait(T.denyScratchFlash);
    if (isStale(runId) || permResolved) return;

    // scratch → aegyo 交叉 0.25s · aegyo display:none→block 触发 SVG 内部 animation 从 0 重置
    // 让撒娇从"起手帧"进入，不是半路上车（否则用户看到的 aegyo 会错位到周期 30-40% 起点）
    // 先加 aegyo class (scratch 开始 fade out / aegyo sprite-fade-in 从 0 播)，等 250ms 再移除 scratch
    document.body.classList.add('clawd-deny-aegyo');
    await wait(320);  // sprite-fade-in 0.25s + 70ms buffer · scratch remove 时保证 aegyo 已 opacity:1 完全盖稳
    if (isStale(runId) || permResolved) return;
    document.body.classList.remove('clawd-deny-scratch');
    if (isStale(runId) || permResolved) return;
    permAttempt = 2;
    permBusy = false;
    showPermissionCard({ retry: true, note: RETRY_NOTE });
    retryOutcomeTimer = setTimeout(() => {
      if (permResolved || permBusy || permAttempt !== 2) return;
      settleRetryToIdle('timeout');
    }, T.retryIdleAfter);
  }

  async function settleRetryToIdle(reason) {
    clearRetryOutcomeTimer();
    const runId = sessionId;
    await transitionToPermIdle(runId, {
      removeClasses: ['clawd-deny-aegyo', 'clawd-deny-settling'],
      dispatchReason: reason,
    });
  }

  // ── M2.4g · 二次 Deny 善意彩蛋（Deal with it 定格 + Thanks 告别） ──────
  //  触发：aegyo 权限卡上第二次点 Deny
  //  两阶段：
  //    Phase 1 (exitCenterDur): 权限卡淡 + 终端缩回 + 清屏 + Clawd 滑到中央
  //    Phase 2 (exitShadesDur): iris-out 收束 + Clawd 放大上移到顶 1/3 + 切墨镜 SVG
  //                             + Thanks 打字机并发 · 4.4s 后定格
  async function typeExitCredit(runId) {
    const line1 = document.getElementById('exit-credit-line1');
    const cardEl = document.getElementById('exit-credit');
    if (!line1 || !cardEl) return;
    line1.textContent = '';
    cardEl.classList.remove('typing-done');
    cardEl.setAttribute('aria-hidden', 'false');
    const text = 'Thanks for visiting.';
    for (let i = 0; i < text.length; i++) {
      if (isStale(runId)) return;
      line1.textContent += text[i];
      await wait(T.exitCreditCharMs);
    }
    // 打完 · 光标淡入闪烁（呼应开场终端光标）
    cardEl.classList.add('typing-done');
  }

  async function handleSecondDeny() {
    const runId = sessionId;
    permResolved = true;
    permBusy = true;
    permAttempt = 0;
    clearClawdStateTimers();
    clearRetryOutcomeTimer();

    // 眼神归中（结尾告别不跟鼠标）
    if (window.__eyeTrack) {
      window.__eyeTrack.paused = true;
      window.__eyeTrack.lookAt = 'center';
    }

    // 1. 权限卡淡出
    hidePermissionCard();

    // 2. 清掉 Clawd 所有中间态 + 终端缩回 + 清屏 · 加 exit-center 让 Clawd 滑向画面中央
    document.body.classList.remove(
      'terminal-up',
      'clawd-alerting', 'clawd-perm-show', 'clawd-perm-idle', 'clawd-perm-retry', 'clawd-idle-handoff',
      'clawd-untyping', 'clawd-walking', 'clawd-behind', 'clawd-peeking', 'clawd-jumping',
      'clawd-deny-error', 'clawd-deny-wake', 'clawd-deny-scratch', 'clawd-deny-aegyo', 'clawd-deny-settling',
      'clawd-allowing', 'clawd-allow-arrived', 'clawd-allowed'
    );
    document.body.classList.add('clawd-exit-center');

    // 终端清屏（history 清空 · chrome 在 terminal-up 移除后会 scale(0) 缩回）
    const history  = document.getElementById('term-history');
    const inputLn  = document.getElementById('term-input-line');
    const inputTxt = document.getElementById('term-input-text');
    if (history)  history.innerHTML = '';
    if (inputLn)  inputLn.classList.remove('sent');
    if (inputTxt) inputTxt.textContent = '';

    // 3. 等 Clawd 滑到中央（CSS .clawd left/top transition 0.6s + 短停 0.2s）
    await wait(T.exitCenterDur);
    if (isStale(runId)) return;

    // 4. Phase 2 · 切 exit-shades · 并发触发所有收尾动画
    //    CSS 会自动 transition Clawd 几何 (left/top 0.6s + width/height 0.8s) + iris-out (1.5s)
    //    JS 这边并发：墨镜 SVG 强制从头播 + Thanks 打字机
    const phase2Start = Date.now();
    document.body.classList.remove('clawd-exit-center');
    document.body.classList.add('clawd-exit-shades');

    // 墨镜动画从头播（外部 SVG 的 CSS animation display 切换不 reset · 必须重设 src）
    const shadesReplay = restartOneShotSvg('.clawd-shades');
    // Thanks 打字机并行：上行 2.0s + 停 0.4s + 下行 0.7s ≈ 3.1s · 先于墨镜 4.4s 结束
    const thanksType = typeExitCredit(runId);

    await Promise.all([shadesReplay, thanksType]);
    if (isStale(runId)) return;
    // shadesReplay 只等 SVG load，不等 4.4s 内部动画本体；补齐剩余时长后再进入 locked。
    const elapsed = Date.now() - phase2Start;
    const remain = Math.max(0, T.exitShadesDur - elapsed);
    if (remain > 0) await wait(remain);
    if (isStale(runId)) return;
    // 定格锁定态 · 启用 7-click 彩蛋（点 Clawd 触发 shake + 计数 · 7 次弹 toast · 无超时重置）
    exitEggClickCount = 0;
    document.body.classList.add('clawd-exit-locked');
  }
  window.__playExitShades = handleSecondDeny;   // dev helper · console 手动触发查看定格

  // ── M2.4g · 7-click 彩蛋 · 点 Clawd 7 次弹 toast（对齐主仓库 handleAboutCrabClick） ──
  function showExitEggToast() {
    const toast = document.getElementById('exit-toast');
    if (!toast) return;
    if (exitEggToastTimer) clearTimeout(exitEggToastTimer);
    toast.textContent = EXIT_EGG_TOAST;
    toast.setAttribute('aria-hidden', 'false');
    // 下一帧加 show 让 opacity/transform transition 生效
    requestAnimationFrame(() => toast.classList.add('show'));
    exitEggToastTimer = setTimeout(() => {
      toast.classList.remove('show');
      const onEnd = () => {
        toast.setAttribute('aria-hidden', 'true');
        toast.removeEventListener('transitionend', onEnd);
      };
      toast.addEventListener('transitionend', onEnd);
      exitEggToastTimer = null;
    }, EXIT_EGG_TOAST_TTL);
  }
  function handleExitClawdClick() {
    if (!document.body.classList.contains('clawd-exit-locked')) return;
    const clawdEl = document.querySelector('.clawd');
    if (clawdEl) {
      // 每点 shake 一下（animationend 自动清类 · 可重复触发）
      clawdEl.classList.remove('exit-shake');
      void clawdEl.getBoundingClientRect();   // 强制 reflow 重启 animation
      clawdEl.classList.add('exit-shake');
      const onEnd = () => {
        clawdEl.classList.remove('exit-shake');
        clawdEl.removeEventListener('animationend', onEnd);
      };
      clawdEl.addEventListener('animationend', onEnd);
    }
    exitEggClickCount++;
    if (exitEggClickCount >= EXIT_EGG_THRESHOLD) {
      exitEggClickCount = 0;
      showExitEggToast();
    }
  }
  function bindExitEggClick() {
    const clawdEl = document.querySelector('.clawd');
    if (clawdEl) clawdEl.addEventListener('click', handleExitClawdClick);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindExitEggClick);
  } else {
    bindExitEggClick();
  }

  // ── M2.4e · Allow 分支序列 ─────────────────────────────────────────
  // 时序：卡片淡出 0.4s → 终端与主角退场 0.5s → 六格动画展示。
  async function playAllowSequence() {
    const runId = sessionId;
    permResolved = true;
    permBusy = true;
    permAttempt = 0;
    clearClawdStateTimers();
    clearRetryOutcomeTimer();

    // 眼神归正，保持 idle 姿态退场。
    if (window.__eyeTrack) window.__eyeTrack.lookAt = 'center';

    // 1. 权限卡淡出
    hidePermissionCard();
    await wait(T.allowCardFade);
    if (isStale(runId)) return;

    // 记录退场前的实际锚点，移除 terminal-up 后仍在原地淡出。
    const clawdEl = document.querySelector('.clawd');
    if (clawdEl) {
      const pose = getComputedStyle(clawdEl);
      document.documentElement.style.setProperty('--clawd-fade-x', pose.left);
      document.documentElement.style.setProperty('--clawd-fade-y', pose.top);
    }

    // 2. 终端缩回（移除 terminal-up · base scale(0) 接管 0.5s）
    //    同时 Clawd 保持 idle 淡出
    //    清 M2.4f 中间态以防 Allow 点得早（正常不会，permCard 出来前按钮不可点）
    document.body.classList.remove(
      'terminal-up', 'clawd-alerting', 'clawd-perm-idle', 'clawd-perm-retry', 'clawd-idle-handoff',
      'clawd-untyping', 'clawd-walking', 'clawd-behind', 'clawd-peeking', 'clawd-jumping',
      'clawd-deny-error', 'clawd-deny-wake', 'clawd-deny-scratch', 'clawd-deny-aegyo', 'clawd-deny-settling'
    );
    document.body.classList.add('clawd-allowing');

    // 3. 舞台清空后展示动画格子，不播放 happy。
    await wait(T.allowStageFade);
    if (isStale(runId)) return;
    document.body.classList.add('clawd-allowed');
    setShowcaseVisible(true, { focus: true });
  }

  // ── 绑定 Allow / Deny 按钮 · 一次性事件 ───────────────────────────
  // DOM 已经在 HTML 里，初始化时直接绑定（不依赖 playScript 跑过）
  function bindPermButtons() {
    const allowBtn = document.querySelector('.perm-card-allow');
    if (allowBtn) {
      allowBtn.addEventListener('click', () => {
        if (permBusy || permResolved || permAttempt === 0) return;
        playAllowSequence();
      });
    }
    const denyBtn = document.querySelector('.perm-card-deny');
    if (denyBtn) {
      denyBtn.addEventListener('click', () => {
        if (permBusy || permResolved || permAttempt === 0) return;
        if (permAttempt === 1) {
          playFirstDenySequence();
          return;
        }
        if (permAttempt === 2) {
          handleSecondDeny();
        }
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPermButtons);
  } else {
    bindPermButtons();
  }

  function resetScript() {
    setShowcaseVisible(false);
    document.documentElement.style.removeProperty('--clawd-fade-x');
    document.documentElement.style.removeProperty('--clawd-fade-y');
    played = false;
    sessionId += 1;
    permAttempt = 0;
    permBusy = false;
    permResolved = false;
    clearClawdStateTimers();
    clearRetryOutcomeTimer();
    const history  = document.getElementById('term-history');
    const inputLn  = document.getElementById('term-input-line');
    const inputTxt = document.getElementById('term-input-text');
    const footerL  = document.getElementById('term-footer-left');
    if (history)  history.innerHTML = '';
    if (inputLn)  inputLn.classList.remove('sent');
    if (inputTxt) inputTxt.textContent = '';
    if (footerL)  footerL.textContent = '? for shortcuts';
    // Clawd 反应 + 权限卡片清态 + M2.4e Allow 分支清态 + M2.4f 冒头剧本清态 + M2.4g 出口彩蛋清态
    document.body.classList.remove(
      'clawd-untyping', 'clawd-walking', 'clawd-behind', 'clawd-peeking', 'clawd-jumping',
      'clawd-alerting', 'clawd-perm-show', 'clawd-perm-idle', 'clawd-perm-retry', 'clawd-idle-handoff',
      'clawd-deny-error', 'clawd-deny-wake', 'clawd-deny-scratch', 'clawd-deny-aegyo', 'clawd-deny-settling',
      'clawd-allowing', 'clawd-allow-arrived', 'clawd-allowed',
      'clawd-exit-center', 'clawd-exit-shades', 'clawd-exit-locked'
    );
    // M2.4g 彩蛋状态清理
    exitEggClickCount = 0;
    if (exitEggToastTimer) { clearTimeout(exitEggToastTimer); exitEggToastTimer = null; }
    const exitToastEl = document.getElementById('exit-toast');
    if (exitToastEl) {
      exitToastEl.classList.remove('show');
      exitToastEl.setAttribute('aria-hidden', 'true');
      exitToastEl.textContent = '';
    }
    const clawdEl = document.querySelector('.clawd');
    if (clawdEl) clawdEl.classList.remove('exit-shake');
    const permCmd = document.getElementById('perm-card-cmd');
    if (permCmd) permCmd.textContent = '';
    const permNote = document.getElementById('perm-card-note');
    if (permNote) permNote.textContent = '';
    const permCard = document.getElementById('clawd-perm-card');
    if (permCard) permCard.setAttribute('aria-hidden', 'true');
    const ghCard = document.getElementById('github-card');
    if (ghCard) {
      ghCard.setAttribute('aria-hidden', 'true');
      ghCard.setAttribute('tabindex', '-1');
    }
    // M2.4g · 清空 Thanks 字（下次播放重新打）
    const exitCreditLine1 = document.getElementById('exit-credit-line1');
    const exitCreditEl = document.getElementById('exit-credit');
    if (exitCreditLine1) exitCreditLine1.textContent = '';
    if (exitCreditEl) {
      exitCreditEl.classList.remove('typing-done');
      exitCreditEl.setAttribute('aria-hidden', 'true');
    }
  }

  // ── append 函数组：每项都是 .term-history-item + fade-in ──
  function appendUserMsg(parent, text) {
    const el = document.createElement('div');
    el.className = 'term-history-item term-user-msg';
    el.innerHTML = `<span class="term-prompt">&gt;</span><span class="term-user-text"></span>`;
    el.querySelector('.term-user-text').textContent = text;
    parent.appendChild(el);
  }

  function appendThinking(parent) {
    const el = document.createElement('div');
    el.className = 'term-history-item term-thinking';
    el.innerHTML = `
      <span class="term-thinking-icon">*</span>
      <span class="term-thinking-text">Moonwalking...</span>
      <span class="term-thinking-meta">(thinking with xhigh effort)</span>
    `;
    parent.appendChild(el);
  }

  function appendToolCall(parent, cmd) {
    const el = document.createElement('div');
    el.className = 'term-history-item term-tool-call';
    el.innerHTML = `
      <div class="term-tool-call-line">
        <span class="term-tool-dot">●</span>
        <span class="term-tool-name">Bash</span><span class="term-tool-args"></span>
      </div>
    `;
    el.querySelector('.term-tool-args').textContent = `(${cmd})`;
    parent.appendChild(el);
  }

  // Dev helper · 鹿鹿调螃蟹爬行时长 · console 敲 __clawdWalk(5) / __clawdWalk(7) 实时试
  window.__clawdWalk = (seconds) => {
    document.documentElement.style.setProperty('--clawd-walk-duration', seconds + 's');
    console.log(`%cclawd walk → ${seconds}s`, 'color:#D98A66;font-weight:600');
  };

  // M2.4f Dev helper · 鹿鹿调冒头位 x/y · 从终端右侧哪儿冒出来
  // 用法：__clawdPeek({ dx: '39.49vmin', dy: '-5vmin' })
  //   dy 负数 = 往上（朝终端顶部）· 正数 = 往下（朝底部）· 0 = 终端垂直中心
  window.__clawdPeek = (opts = {}) => {
    const root = document.documentElement;
    if (opts.dx !== undefined) root.style.setProperty('--clawd-peek-dx', opts.dx);
    if (opts.dy !== undefined) root.style.setProperty('--clawd-peek-dy', opts.dy);
    const cur = {
      dx: getComputedStyle(root).getPropertyValue('--clawd-peek-dx').trim(),
      dy: getComputedStyle(root).getPropertyValue('--clawd-peek-dy').trim(),
    };
    console.log('%cpeek 位 →', 'color:#D98A66;font-weight:600', cur);
  };

  // M2.4e Dev helper · 鹿鹿调 Allow 末态 Clawd 中央位置 + GitHub 卡片间距
  // 用法：__ghCard({ x: '50vw', y: '45vh', gap: '0vmin' })  · 留空保留默认
  window.__ghCard = (opts = {}) => {
    const root = document.documentElement;
    if (opts.x   !== undefined) root.style.setProperty('--clawd-x-allow', opts.x);
    if (opts.y   !== undefined) root.style.setProperty('--clawd-y-allow', opts.y);
    if (opts.gap !== undefined) root.style.setProperty('--gh-card-gap', opts.gap);
    const cur = {
      x:   getComputedStyle(root).getPropertyValue('--clawd-x-allow').trim() || '50vw',
      y:   getComputedStyle(root).getPropertyValue('--clawd-y-allow').trim() || '50vh',
      gap: getComputedStyle(root).getPropertyValue('--gh-card-gap').trim() || '2vmin',
    };
    console.log('%cAllow 末态 →', 'color:#D98A66;font-weight:600', cur);
  };

  function appendPermBox(parent, cmd) {
    const el = document.createElement('div');
    el.className = 'term-history-item term-perm-box';
    el.innerHTML = `
      <div class="term-perm-title">Bash command</div>
      <div class="term-perm-cmd"></div>
      <div class="term-perm-desc">Clone the clawd-on-desk repository</div>
      <div class="term-perm-prompt">Do you want to proceed?</div>
      <ul class="term-perm-options">
        <li class="term-perm-option selected">1. Yes</li>
        <li class="term-perm-option">2. Yes, and don't ask again for: git clone</li>
        <li class="term-perm-option">3. No</li>
      </ul>
      <div class="term-perm-shortcuts">Esc to cancel · Tab to amend · ctrl+e to explain</div>
    `;
    el.querySelector('.term-perm-cmd').textContent = cmd;
    parent.appendChild(el);
  }
})();
