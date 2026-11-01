/* Spin-to-dizzy: mirror clawd-on-desk/src/tick.js and the Clawd theme.
   Signed rotation, two circles, 500ms pause reset, 24px dead zone,
   six-second reaction and twelve-second cooldown. No story timers change. */
(function () {
  const DURATION = 6000;
  const COOLDOWN = 12000;
  const FADE = 140;

  function createSpinDetector() {
    let lastAngle = null, lastAt = null, spin = 0, cooldownUntil = 0;
    function reset() { lastAngle = null; lastAt = null; spin = 0; }
    function sample(x, y, now) {
      if (now < cooldownUntil || Math.hypot(x, y) < 24) {
        reset();
        return false;
      }
      const angle = Math.atan2(y, x);
      if (lastAngle === null || now - lastAt > 500) spin = 0;
      else {
        let delta = angle - lastAngle;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        spin += delta;
        if (Math.abs(spin) >= Math.PI * 4 - 1e-9) {
          reset();
          cooldownUntil = now + COOLDOWN;
          return true;
        }
      }
      lastAngle = angle;
      lastAt = now;
      return false;
    }
    return { sample, reset };
  }

  function isIdleScene(frame, classes) {
    const has = name => classes.contains(name);
    if (frame !== '4' || ['dev-mode', 'dragging', 'scene-resizing',
      'clawd-allowing', 'clawd-allowed', 'clawd-exit-center', 'clawd-exit-shades',
      'clawd-idle-handoff'].some(has)) return false;
    if (has('terminal-up')) return has('clawd-perm-idle') && has('clawd-perm-show');
    return !has('absorbed');
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSpinDetector, isIdleScene, DURATION, COOLDOWN };
    return;
  }

  const clawd = document.getElementById('clawd');
  const sprite = clawd && clawd.querySelector('.clawd-dizzy');
  if (!sprite) return;
  const detector = createSpinDetector();
  let timer = null, active = false;

  function eligible() {
    const eye = window.__eyeTrack;
    return !document.hidden && eye && !eye.paused && !eye.lookAt &&
      isIdleScene(document.body.dataset.frame, document.body.classList);
  }
  function cancel() {
    clearTimeout(timer);
    timer = null;
    active = false;
    detector.reset();
    clawd.classList.remove('is-dizzy', 'dizzy-recovering');
  }
  function recover() {
    if (!eligible()) { cancel(); return; }
    clawd.classList.add('dizzy-recovering');
    clawd.classList.remove('is-dizzy');
    timer = setTimeout(cancel, FADE);
  }
  function start() {
    active = true;
    // The original loops continuously. Reusing the loaded image avoids an
    // asynchronous reload / missing-sprite frame when the gesture completes.
    clawd.classList.add('is-dizzy');
    timer = setTimeout(recover, DURATION);
  }

  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !event.isPrimary || event.buttons !== 0 || !eligible()) {
      cancel();
      return;
    }
    if (active) return;
    if (!sprite.complete || !sprite.naturalWidth) { detector.reset(); return; }
    const rect = clawd.getBoundingClientRect();
    const cfg = window.__eyeTrack.CFG;
    const x = event.clientX - (rect.left + rect.width * cfg.EYE_RATIO_X);
    const y = event.clientY - (rect.top + rect.height * cfg.EYE_RATIO_Y);
    if (detector.sample(x, y, performance.now())) start();
  }, { passive: true });

  // Capturing pointerdown gives dragging and both permission choices immediate
  // priority. Observe only the scene, not flowers or our own sprite classes.
  window.addEventListener('pointerdown', cancel, { capture: true, passive: true });
  window.addEventListener('blur', cancel);
  window.addEventListener('resize', cancel);
  window.addEventListener('frame-change', cancel);
  document.addEventListener('visibilitychange', cancel);
  document.documentElement.addEventListener('pointerleave', () => detector.reset());
  new MutationObserver(() => { if (!eligible()) cancel(); }).observe(document.body, {
    attributes: true, attributeFilter: ['class', 'data-frame'],
  });
})();
