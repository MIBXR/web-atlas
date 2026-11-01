// Homepage background: approved demo C, spacing 110% (34 × 1.10 → 37px).
// The parent .new-world owns reveal/exit clipping; this layer never takes input.
(() => {
  const host = document.getElementById('new-world');
  const pixel = window.ClawdPixelFlower;
  if (!host || !pixel) return;
  const NS = 'http://www.w3.org/2000/svg';
  const SPACING_PERCENT = 110;
  const gap = pixel.gapAt(SPACING_PERCENT);
  const MAX_MARKS = 96; // Active neighbourhood plus fading cells; independent of screen size.
  const marks = new Map();
  let pointer = null;
  let frame = null;
  let entranceFrame = null;
  let suspended = false;

  function svg(tag, attrs = {}) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }
  const field = svg('svg', { class: 'flower-field', 'aria-hidden': 'true', 'data-style': 'c', 'data-spacing-percent': SPACING_PERCENT, 'data-gap': gap });
  const defs = svg('defs');
  const pattern = svg('pattern', { id: 'pixel-flower-dots', patternUnits: 'userSpaceOnUse', x: -gap / 2, y: -gap / 2, width: gap, height: gap });
  pattern.append(svg('rect', { x: (gap - pixel.DOT_SIZE) / 2, y: (gap - pixel.DOT_SIZE) / 2, width: pixel.DOT_SIZE, height: pixel.DOT_SIZE, fill: pixel.DOT_COLOR, opacity: pixel.DOT_ALPHA }));
  defs.append(pattern);
  const blooms = svg('g');
  field.append(defs, svg('rect', { width: '100%', height: '100%', fill: 'url(#pixel-flower-dots)' }), blooms);
  host.append(field);

  function applyMark(n) {
    n.mark.style.opacity = String(n.opacity);
    n.mark.style.transform = `scale(${pixel.scaleAt(n.opacity)})`;
  }
  function paint() {
    frame = null;
    if (suspended || document.hidden || !pointer) return;
    const active = new Set();
    const { x, y } = pointer;
    const radius = pixel.RADIUS;
    for (let gy = Math.floor((y - radius) / gap); gy <= Math.ceil((y + radius) / gap); gy++) {
      for (let gx = Math.floor((x - radius) / gap); gx <= Math.ceil((x + radius) / gap); gx++) {
        const px = gx * gap, py = gy * gap;
        const opacity = pixel.opacityAt(Math.hypot(px - x, py - y));
        if (!opacity || px < -14 || py < -14 || px > innerWidth + 14 || py > innerHeight + 14) continue;
        const key = `${gx},${gy}`;
        active.add(key);
        let n = marks.get(key);
        if (!n) {
          const anchor = svg('g', { transform: `translate(${px} ${py})`, 'data-cell': key });
          const mark = svg('g', { class: 'pixel-flower' });
          mark.innerHTML = pixel.motif(pixel.hash(gx, gy));
          mark.style.opacity = '0';
          mark.style.transform = `scale(${pixel.scaleAt(0)})`;
          anchor.append(mark); blooms.append(anchor);
          n = { anchor, mark, opacity: 0, ready: false };
          marks.set(key, n);
        }
        n.opacity = opacity;
        if (n.ready) applyMark(n);
      }
    }
    for (const [key, n] of marks) {
      if (!active.has(key)) { n.opacity = 0; applyMark(n); }
    }
    // Retain cells across nearby moves, but never accumulate the whole viewport.
    for (const [key, n] of marks) {
      if (marks.size <= MAX_MARKS) break;
      if (!active.has(key)) { n.anchor.remove(); marks.delete(key); }
    }
    if (entranceFrame === null && [...marks.values()].some(n => !n.ready)) {
      entranceFrame = requestAnimationFrame(() => {
        entranceFrame = null;
        for (const n of marks.values()) {
          if (!n.ready) { n.ready = true; applyMark(n); }
        }
      });
    }
    field.dataset.activeFlowers = String(active.size);
  }
  function wake() {
    if (frame === null && !suspended && !document.hidden && pointer) frame = requestAnimationFrame(paint);
  }
  function clear() {
    pointer = null;
    if (frame !== null) cancelAnimationFrame(frame);
    if (entranceFrame !== null) cancelAnimationFrame(entranceFrame);
    frame = entranceFrame = null;
    for (const n of marks.values()) { n.opacity = 0; n.ready = true; applyMark(n); }
    field.dataset.activeFlowers = '0';
  }
  function move(e) { pointer = { x: e.clientX, y: e.clientY }; wake(); }
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', move, { passive: true });
  window.addEventListener('pointerout', e => { if (!e.relatedTarget) clear(); });
  window.addEventListener('pointercancel', clear);
  window.addEventListener('pointerup', e => { if (e.pointerType === 'touch') clear(); }, { passive: true });
  window.addEventListener('blur', clear);
  window.addEventListener('resize', wake);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });

  window.__flowerLayer = {
    CFG: Object.freeze({ STYLE: 'C', SPACING_PERCENT, GRID: gap, RADIUS: pixel.RADIUS, MAX_MARKS }),
    COLORS: pixel.COLORS,
    suspend: () => { suspended = true; clear(); },
    resume: () => { suspended = false; wake(); },
    clear,
  };
})();
