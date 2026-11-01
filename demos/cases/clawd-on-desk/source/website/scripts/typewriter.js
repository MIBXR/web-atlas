// ─────────────────────────────────────────────────────────────────────────
//  Typewriter · 终端打字机
//  对外暴露 window.__typewriter = { forward, reverse, flash, interrupt }
//  所有方法返回 Promise，scene.js 用 await 串联
//  interrupt() 让正在跑的方法立即 return（用于 skip）
// ─────────────────────────────────────────────────────────────────────────

(() => {
  const textEl = document.getElementById('brand-text');
  const brandEl = document.getElementById('brand');
  if (!textEl || !brandEl) {
    console.warn('[typewriter] 找不到 #brand-text');
    return;
  }

  let interrupted = false;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function interrupt() { interrupted = true; }
  function reset()     { interrupted = false; }
  function setText(s)  { textEl.textContent = s; }

  async function forward(text, msPerChar) {
    for (let i = 1; i <= text.length; i++) {
      if (interrupted) return;
      setText(text.slice(0, i));
      await wait(msPerChar);
    }
  }

  async function reverse(msPerChar) {
    const text = textEl.textContent;
    for (let i = text.length - 1; i >= 0; i--) {
      if (interrupted) return;
      setText(text.slice(0, i));
      await wait(msPerChar);
    }
  }

  // 整个 brand 闪烁（含光标），times 次，每次 durationMs（默认 250 = 125 灭 + 125 亮）
  async function flash(times, durationMs = 250) {
    const half = durationMs / 2;
    for (let i = 0; i < times; i++) {
      if (interrupted) return;
      brandEl.style.opacity = '0';
      await wait(half);
      if (interrupted) { brandEl.style.opacity = '1'; return; }
      brandEl.style.opacity = '1';
      await wait(half);
    }
  }

  function jumpToEnd(text) {
    setText(text);
    brandEl.style.opacity = '1';
  }
  function clear() {
    setText('');
    brandEl.style.opacity = '1';
  }

  // M2.4d · 通用打字：把 text 逐字 append 到任意 element.textContent
  // 不依赖 brand-text · terminal.js 用它打终端里的用户输入
  async function typeInto(el, text, msPerChar) {
    for (let i = 1; i <= text.length; i++) {
      if (interrupted) return;
      el.textContent = text.slice(0, i);
      await wait(msPerChar);
    }
  }

  window.__typewriter = { forward, reverse, flash, interrupt, reset, jumpToEnd, clear, typeInto };
})();
