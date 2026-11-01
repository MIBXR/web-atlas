// ─────────────────────────────────────────────────────────────────────────
//  Visibility Guard · 失焦回焦防时间线错位
//  策略：A- 版 —— 失焦 >1000ms 回来，若处于脆弱演出段则 reload。
//  稳定等待态 / 末态 / DEV 模式 / 运行时 dev overlay 模式不 reload。
// ─────────────────────────────────────────────────────────────────────────

(() => {
  const HIDDEN_THRESHOLD_MS = 1000;
  const RELOAD_GUARD_MS = 500;
  const RELOAD_TS_KEY = 'clawd-last-reload-ts';

  let hiddenAt = null;

  function isDevMode() {
    if (window.__DEV === true) return true;
    if (document.body.classList.contains('dev-mode')) return true;
    return false;
  }

  function isStableState() {
    const body = document.body;
    if (body.classList.contains('clawd-allowed')) return true;
    if (body.classList.contains('clawd-exit-locked')) return true;
    if (body.classList.contains('clawd-perm-idle') &&
        !body.classList.contains('clawd-idle-handoff')) return true;
    return false;
  }

  function shouldReload(deltaMs) {
    if (isDevMode()) return false;
    if (deltaMs < HIDDEN_THRESHOLD_MS) return false;
    if (isStableState()) return false;
    try {
      const last = Number(sessionStorage.getItem(RELOAD_TS_KEY) || 0);
      if (Date.now() - last < RELOAD_GUARD_MS) return false;
    } catch {}
    return true;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      return;
    }
    if (hiddenAt == null) return;
    const delta = Date.now() - hiddenAt;
    hiddenAt = null;
    if (!shouldReload(delta)) return;
    try { sessionStorage.setItem(RELOAD_TS_KEY, String(Date.now())); } catch {}
    location.reload();
  });
})();
