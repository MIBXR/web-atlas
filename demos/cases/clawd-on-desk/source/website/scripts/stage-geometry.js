/* Shared geometry, deliberately independent of screen-size breakpoints.
   The browser resolves CSS lengths (including calc/clamp); tests exercise
   the same curve and visible-body bounds without a browser dependency. */
(function (host) {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function guideCurve(start, end, viewport) {
    // A leftward bow reaches the target from above and stays to the left of
    // the hint below Clawd. All three points stay inside the SVG viewport.
    const distanceY = Math.abs(end.y - start.y);
    const control = {
      x: clamp(Math.min(start.x, end.x) - distanceY * 0.6, 20, viewport.width - 20),
      y: clamp(Math.min(start.y, end.y) - Math.min(70, distanceY * 0.25), 20, viewport.height - 20),
    };
    return { start, end, control, d: `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}` };
  }
  function clampBody(point, size, viewport) {
    // Transparent SVG padding may leave the viewport; the visible crab must
    // remain reachable. Body/limbs occupy roughly the middle 44% horizontally.
    const halfWidth = size * 0.22;
    const halfHeight = size * 0.2;
    return {
      x: clamp(point.x, halfWidth + 8, viewport.width - halfWidth - 8),
      y: clamp(point.y, halfHeight + 8, viewport.height - halfHeight - 8),
    };
  }
  const api = { guideCurve, clampBody };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else {
    // A length-only probe avoids parseFloat('calc(...)') and keeps the dev
    // overlay compatible with responsive variables. Never participates in flow.
    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;width:0;height:0;visibility:hidden;pointer-events:none;';
    document.body.appendChild(probe);
    api.length = name => {
      probe.style.left = `var(${name}, 0px)`;
      return parseFloat(getComputedStyle(probe).left) || 0;
    };
    api.bodyCenter = () => {
      const rect = document.getElementById('clawd-body-point').getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    };
    // A device rotation is a layout change, not a story beat. Snap to the new
    // layout before painting so a tall-screen anchor cannot travel offscreen
    // for 600ms while the viewport has already become short landscape.
    let resizeFrame = 0;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      document.body.classList.add('scene-resizing');
      resizeFrame = requestAnimationFrame(() => {
        document.getElementById('clawd').getBoundingClientRect();
        resizeFrame = requestAnimationFrame(() => document.body.classList.remove('scene-resizing'));
      });
    });
    host.__stageGeometry = api;
  }
})(typeof window === 'undefined' ? null : window);
