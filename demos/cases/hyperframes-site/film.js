let cutAngle = (79 * Math.PI) / 180,
  cutDirection = {
    x: -Math.cos(cutAngle),
    y: Math.sin(cutAngle),
  },
  crossDirection = {
    x: cutDirection.y,
    y: -cutDirection.x,
  },
  loopShape = {
    cx: 0.5,
    cy: 0.5,
    rx: 0.31,
    ry: 0.3,
    n: 3.4,
    tilt: (-3 * Math.PI) / 180,
    start: -0.25 * Math.PI,
    turns: 1.6,
  },
  mascotScaleRatio = 5.6 / 4.25 / 188,
  hopPoints = [
    {
      x: 2020,
      y: 556,
    },
    {
      x: 1800,
      y: 556,
    },
    {
      x: 1610,
      y: 548,
    },
    {
      x: 1404,
      y: 552,
    },
  ],
  buttonPoints = [
    {
      x: 469,
      y: 604,
    },
    {
      x: 1450,
      y: 795,
    },
  ];
function measureFilm({ page: page, headline: headline, cta: cta, logo: logo, rest: rest }) {
  let range,
    width = innerWidth,
    height = innerHeight,
    videoScale = Math.max(width / 1920, height / 1080),
    videoLeft = (width - 1920 * videoScale) / 2,
    videoTop = (height - 1080 * videoScale) / 2,
    videoPoint = (e) => ({
      x: videoLeft + e.x * videoScale,
      y: videoTop + e.y * videoScale,
    }),
    savedTransform = [page.style.transform, page.style.clipPath];
  page.style.transform = page.style.clipPath = '';
  let headlineRect = headline.getBoundingClientRect(),
    ctaRect = cta.getBoundingClientRect(),
    logoRect = logo.getBoundingClientRect(),
    restRect =
      'block' === getComputedStyle(rest).display
        ? ((range = document.createRange()).selectNodeContents(rest), range.getBoundingClientRect())
        : rest.getBoundingClientRect();
  [page.style.transform, page.style.clipPath] = savedTransform;
  let mascotScale = headlineRect.height * mascotScaleRatio,
    center = {
      x: width / 2,
      y: height / 2,
    },
    cutAtY = (e) => ({
      x: center.x + (cutDirection.x / cutDirection.y) * (e - center.y),
      y: e,
    }),
    top = cutAtY(-0.3 * height),
    bottom = cutAtY(1.3 * height),
    tipHome = {
      x: restRect.right + 34 * mascotScale,
      y: restRect.top + restRect.height / 2 - 12 * mascotScale,
    },
    home = {
      x: tipHome.x - -29.6 * mascotScale,
      y: tipHome.y - -25.8 * mascotScale,
    },
    loopBounds = {
      x: width * loopShape.cx,
      y: height * loopShape.cy,
      rx: width * loopShape.rx,
      ry: height * loopShape.ry,
    },
    loop = [];
  for (let e = 0; e <= 260; e++) {
    let t = e / 260,
      r = loopShape.start - 2 * Math.PI * loopShape.turns * t,
      a = Math.cos(r),
      o = Math.sin(r),
      n = loopShape.n + 0.7 * Math.sin(3 * r + 1.3) + 0.3 * Math.sin(7 * r + 0.2),
      s =
        (1 + 0.032 * Math.sin(2 * r + 0.9) + 0.024 * Math.sin(5 * r + 2.1) + 0.012 * Math.sin(9 * r + 0.4)) *
        (1 + 0.07 * t),
      l = loopBounds.rx * s * Math.sign(a) * Math.pow(Math.abs(a), 2 / n),
      c = loopBounds.ry * s * Math.sign(o) * Math.pow(Math.abs(o), 2 / n) * (o < 0 ? 0.97 : 1.03);
    loop.push({
      x: loopBounds.x + l * Math.cos(loopShape.tilt) - c * Math.sin(loopShape.tilt),
      y: loopBounds.y + l * Math.sin(loopShape.tilt) + c * Math.cos(loopShape.tilt),
    });
  }
  let loopAngles = [];
  loop.forEach((e, t) => {
    let r = loop[Math.min(260, t + 1)],
      a = loop[Math.max(0, t - 1)],
      o = r.x - a.x,
      n = r.y - a.y,
      i = Math.hypot(o, n) || 1,
      s = loopBounds.x - e.x,
      l = loopBounds.y - e.y,
      c = Math.hypot(s, l) || 1,
      d =
        (180 * Math.atan2((l / c) * 0.8 + (n / i) * 0.55, (s / c) * 0.8 + (o / i) * 0.55)) / Math.PI + 138.9;
    if (0 === t) d = ((((d + 180) % 360) + 360) % 360) - 180;
    else {
      for (; d - loopAngles[t - 1] > 180; ) d -= 360;
      for (; d - loopAngles[t - 1] < -180; ) d += 360;
    }
    loopAngles.push(d);
  });
  let slashDirection = {
      x: -cutDirection.x,
      y: -cutDirection.y,
    },
    slashStart = cutAtY(height - 28 * videoScale),
    aimAngle = (180 * Math.atan2(slashDirection.y, slashDirection.x)) / Math.PI;
  return {
    scrollY,
    vw: width,
    vh: height,
    cs: videoScale,
    sc: mascotScale,
    mid: center,
    top: top,
    bottom: bottom,
    home: home,
    loop: loop,
    loopAngle: loopAngles,
    taut: loop.map((e) => {
      let t = (e.x - center.x) * cutDirection.x + (e.y - center.y) * cutDirection.y;
      return {
        x: center.x + cutDirection.x * t,
        y: center.y + cutDirection.y * t,
      };
    }),
    slashStart: slashStart,
    slashDir: slashDirection,
    slashLength: Math.hypot(slashStart.x - top.x, slashStart.y - top.y),
    aim: aimAngle,
    aimAngle: aimAngle + 138.9,
    hops: hopPoints.map(videoPoint),
    cardButton: buttonPoints.map(videoPoint),
    markStart: videoPoint({
      x: 960,
      y: 500,
    }),
    markBig: 3.4 * videoScale,
    markDock: {
      x: logoRect.left + 0.871 * logoRect.width,
      y: logoRect.top + 0.3 * logoRect.height,
    },
    markDockScale: 0.34 * (logoRect.height / 34),
    bubble: {
      x: home.x + 46 * mascotScale,
      y: home.y - 66 * mascotScale,
      w: 46 * mascotScale,
      h: 40 * mascotScale,
    },
    cta: ctaRect,
  };
}
let arriveHop = [0.82, 1.08],
  toLoop = [1.46, 1.62],
  drawLoop = [1.62, 2.95],
  pullLine = [2.97, 3.16],
  toSlash = [2.98, 3.14],
  chargeSlash = [3.14, 3.22],
  slashCut = [3.22, 3.36],
  splitOpen = [3.39, 3.52],
  zoomOut = [3.52, 4.22],
  downloadEnter = [14.05, 15],
  downloadFlip = [14.1, 14.85],
  returnHops = [15.08, 15.86],
  wordsExit = [16.6, 16.8],
  zoomReturn = [16.67, 17.35],
  returnHome = [16.7, 17.32],
  splitClose = [17.27, 17.5],
  ctaGlow = [17.33, 17.85],
  markUnfold = [0, 0.42],
  markDock = [0.55, 1.15],
  chapters = [
    {
      name: 'Arrive',
      from: 0,
      to: 1.86,
    },
    {
      name: 'Draw',
      from: 1.86,
      to: 3.62,
    },
    {
      name: 'Cut',
      from: 3.62,
      to: 4.62,
    },
    {
      name: 'Worlds',
      from: 4.62,
      to: 14,
    },
    {
      name: 'Download',
      from: 14,
      to: 19,
    },
  ],
  clamp01 = (e) => Math.min(1, Math.max(0, e)),
  interval = (e, [t, r]) => clamp01((e - t) / (r - t)),
  mix = (e, t, r) => e + (t - e) * r,
  easeOutCubic = (e) => 1 - Math.pow(1 - e, 3),
  easeOutQuart = (e) => 1 - Math.pow(1 - e, 4),
  easeInOutQuad = (e) => (e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2),
  easeInOutCubic = (e) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2),
  easeOutExpo = (e) => (e >= 1 ? 1 : 1 - Math.pow(2, -10 * e)),
  pulse = (e, t) => Math.sin(Math.PI * interval(e, t));
function pointOnLoop(layout, progress) {
  let index = Math.min(260 - 1e-6, Math.max(0, 260 * progress)),
    first = Math.floor(index),
    from = layout.loop[first],
    to = layout.loop[Math.min(260, first + 1)];
  return {
    x: mix(from.x, to.x, index - first),
    y: mix(from.y, to.y, index - first),
    dx: to.x - from.x,
    dy: to.y - from.y,
  };
}
function angleOnLoop(layout, progress) {
  let index = Math.min(260, Math.max(0, 260 * progress)),
    first = Math.min(259, Math.floor(index));
  return mix(layout.loopAngle[first], layout.loopAngle[first + 1], index - first);
}
function mascotOffset(rotation, scaleX, scaleY, axis, size) {
  let radians = (rotation * Math.PI) / 180,
    axisRadians = (axis * Math.PI) / 180,
    x = -29.6 * Math.cos(radians) - -25.8 * Math.sin(radians),
    y = -29.6 * Math.sin(radians) + -25.8 * Math.cos(radians),
    scaledX = (x * Math.cos(axisRadians) + y * Math.sin(axisRadians)) * scaleX * size,
    scaledY = (-x * Math.sin(axisRadians) + y * Math.cos(axisRadians)) * scaleY * size;
  return {
    x: scaledX * Math.cos(axisRadians) - scaledY * Math.sin(axisRadians),
    y: scaledX * Math.sin(axisRadians) + scaledY * Math.cos(axisRadians),
  };
}
function mascotAtPath(layout, point, rotation, scaleX = 1, scaleY = 1, axis = 0) {
  let offset = mascotOffset(rotation, scaleX, scaleY, axis, layout.sc);
  return {
    x: point.x - offset.x,
    y: point.y - offset.y,
  };
}
let eyeShapes = {
    dashes: '<path d="M-2.6 -2 V2 M2.6 -2 V2" stroke="#16121a" stroke-width="2" stroke-linecap="round"/>',
    dots: '<circle cx="-2.8" r="2.1" fill="#16121a"/><circle cx="2.8" r="2.1" fill="#16121a"/>',
    sleepy:
      '<path d="M-5 0 q2.4 3 4.8 0 M0.4 0 q2.4 3 4.8 0" stroke="#16121a" stroke-width="1.7" fill="none" stroke-linecap="round"/>',
    happy:
      '<path d="M-5 1.2 q2.4 -3.4 4.8 0 M0.4 1.2 q2.4 -3.4 4.8 0" stroke="#16121a" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
  },
  filmGreen = '#3ce6ac',
  glowGradient = (e, t) =>
    `<linearGradient id="${e}" gradientUnits="userSpaceOnUse">${'<stop/>'.repeat(15)}</linearGradient>`.replace(
      /<stop\/>/g,
      `<stop stop-color="${t}"/>`,
    ),
  filmMarkup = `
  <div class="hf-film-worlds" aria-hidden="true"></div>
  <div class="hf-film-over" aria-hidden="true">
    <svg class="hf-film-full"><defs>
      ${glowGradient('hf-g-haze', filmGreen)}${glowGradient('hf-g-glow', filmGreen)}${glowGradient('hf-g-core', '#7fffd2')}${glowGradient('hf-g-wide', filmGreen)}${glowGradient('hf-g-mid', '#bfffe8')}
    </defs>
      <g data-gap opacity="0">
        <line stroke="url(#hf-g-wide)" stroke-linecap="round" data-glow="hf-g-wide"/>
        <line stroke="url(#hf-g-mid)" stroke-linecap="round" data-glow="hf-g-mid"/>
        <line stroke="#ffffff" stroke-linecap="round"/>
      </g>
      <g data-edge><line stroke="${filmGreen}" stroke-width="3" opacity="0"/></g>
      <g data-edge><line stroke="${filmGreen}" stroke-width="3" opacity="0"/></g>
      <path data-ink fill="none" stroke="#1fd197" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
      <line data-slash stroke="url(#hf-g-haze)" stroke-linecap="round" data-glow="hf-g-haze" opacity="0"/>
      <line data-slash stroke="url(#hf-g-glow)" stroke-linecap="round" data-glow="hf-g-glow" opacity="0"/>
      <line data-slash stroke="url(#hf-g-core)" stroke-linecap="round" data-glow="hf-g-core" opacity="0"/>
      <line data-slash stroke="#ffffff" stroke-linecap="round" opacity="0"/>
    </svg>
    <svg class="hf-film-mark" viewBox="0 0 100 100"><defs>
      <linearGradient id="hf-mk-a" x1="48.57" y1="25" x2="44.78" y2="71.94" gradientUnits="userSpaceOnUse"><stop stop-color="#06E3FA"/><stop offset="1" stop-color="#4FDB5E"/></linearGradient>
      <linearGradient id="hf-mk-b" x1="54.83" y1="73.84" x2="72.1" y2="32.89" gradientUnits="userSpaceOnUse"><stop stop-color="#06E3FA"/><stop offset="1" stop-color="#4FDB5E"/></linearGradient></defs>
      <path data-leaf d="M10.1851 57.8021L33.1145 73.8313C36.2202 75.9978 41.5173 73.5433 42.4816 69.4984L51.7611 30.4271C52.7253 26.3822 48.5802 23.9277 44.4602 26.0942L13.917 42.1235C6.96677 45.7676 4.97564 54.1579 10.1851 57.8021Z" fill="url(#hf-mk-a)"/>
      <path data-leaf d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z" fill="url(#hf-mk-b)"/>
    </svg>
    ${[0, 1].map(() => `<div class="hf-film-words">${['Your', 'agent', 'edits', 'video', 'now.'].map((e, t) => `<span${4 === t ? ' class="hf-film-accent"' : ''}>${e}</span>`).join('')}</div>`).join('')}
    <div class="hf-film-flash"></div>
  </div>
  <div class="hf-film-framey" role="button" tabindex="0" aria-label="Watch the film"><svg viewBox="40 8 120 120" aria-hidden="true"><g data-body>
    <path d="M77.55 48.44 L122.77 65.85 L99.3 89.41 Z" fill="#fff" stroke="#fff" stroke-width="24" stroke-linejoin="round"/>
    <path d="M77.55 48.44 L122.77 65.85 L99.3 89.41 Z" fill="${filmGreen}" stroke="${filmGreen}" stroke-width="19" stroke-linejoin="round"/>
    <circle cx="111.6" cy="68.2" r="11.5" fill="#fff"/><g data-eyes></g></g></svg></div>
  <button type="button" class="hf-film-bubble" aria-label="Watch the film"><svg viewBox="0 0 46 40" aria-hidden="true"><path d="M24.5 2.2c10.6 0 19.3 6.6 19.3 14.9S35.1 32 24.5 32c-2 0-3.9-.2-5.7-.6-2.9 2.6-7.4 5-13.3 5.9 2.6-2.3 4.3-4.8 5-7.6C6.1 27 3.2 22.4 3.2 17.1 3.2 8.8 13.9 2.2 24.5 2.2Z" fill="#fff" stroke="#131109" stroke-width="2.2" stroke-linejoin="round"/><path d="M20.6 10.6v13l10.6-6.5z" fill="#131109" stroke="#131109" stroke-width="2" stroke-linejoin="round"/></svg></button>`,
  px = (e) => `${e.toFixed(1)}px`,
  polygon = (e) => `polygon(${e.map((e) => `${px(e.x)} ${px(e.y)}`).join(',')})`,
  attributes = (element, values) => {
    for (let [r, a] of Object.entries(values))
      element.setAttribute(r, 'number' == typeof a ? a.toFixed(2) : a);
  },
  setLine = (line, from, to) =>
    attributes(line, {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    }),
  erf = (e) => {
    let t = 1 / (1 + 0.3275911 * Math.abs(e)),
      r =
        1 -
        ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
          t *
          Math.exp(-e * e);
    return e < 0 ? -r : r;
  };
function drawGlow(line, from, to, width, sigma) {
  let radius = width / 2 + 3 * sigma,
    length = Math.hypot(to.x - from.x, to.y - from.y) || 1,
    normal = {
      x: -(to.y - from.y) / length,
      y: (to.x - from.x) / length,
    },
    center = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2,
    };
  setLine(line, from, to);
  line.setAttribute('stroke-width', String(2 * radius));
  let gradient = document.getElementById(line.getAttribute('data-glow'));
  attributes(gradient, {
    x1: center.x - normal.x * radius,
    y1: center.y - normal.y * radius,
    x2: center.x + normal.x * radius,
    y2: center.y + normal.y * radius,
  });
  let deviation = sigma * Math.SQRT2;
  [...gradient.children].forEach((e, t) => {
    let r = -radius + (2 * radius * t) / 14;
    attributes(e, {
      offset: t / 14,
      'stop-opacity': (0.5 * (erf((r + width / 2) / deviation) - erf((r - width / 2) / deviation))).toFixed(
        4,
      ),
    });
  });
}
function createFilm({
  parts: parts,
  ribbon: ribbon,
  root: root,
  src: src,
  hopSound: hopSound,
  film: filmEnabled,
  still: reducedMotion,
  onChange: onChange,
}) {
  let { page: page, cta: cta, logo: logo } = parts,
    abort = new AbortController(),
    listen = (e, t, r, a = {}) =>
      e.addEventListener(t, r, {
        ...a,
        signal: abort.signal,
      });
  root.innerHTML = filmMarkup;
  let all = (e) => [...root.querySelectorAll(e)],
    worlds = root.querySelector('.hf-film-worlds'),
    overlay = root.querySelector('.hf-film-over'),
    mark = root.querySelector('.hf-film-mark'),
    leaves = all('[data-leaf]'),
    gap = root.querySelector('[data-gap]'),
    gapLines = [...gap.children],
    edges = all('[data-edge]'),
    ink = root.querySelector('[data-ink]'),
    slashLines = all('[data-slash]'),
    wordLayers = all('.hf-film-words'),
    flash = root.querySelector('.hf-film-flash'),
    mascot = root.querySelector('.hf-film-framey'),
    mascotBody = root.querySelector('[data-body]'),
    eyes = root.querySelector('[data-eyes]'),
    bubble = root.querySelector('.hf-film-bubble'),
    video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  worlds.appendChild(video);
  page.style.position = 'relative';
  page.style.zIndex = '1';
  page.style.transformOrigin = '0 0';
  let layout = measureFilm(parts),
    running = false,
    duration = 19,
    pageClone = null,
    cloneCta = null;
  function createClone() {
    for (let e of ((pageClone = page.cloneNode(true)).setAttribute('aria-hidden', 'true'),
    (pageClone.inert = true),
    pageClone.querySelectorAll('[id]')))
      e.removeAttribute('id');
    for (let e of pageClone.querySelectorAll('main > :not(.hf-hero)')) e.remove();
    let e = pageClone.querySelector('.hf-ribbon');
    if (e && ribbon?.captureStream) {
      let r = document.createElement('video');
      r.className = e.className;
      r.muted = true;
      r.playsInline = true;
      r.style.objectFit = 'fill';
      r.srcObject = ribbon.captureStream(60);
      e.replaceWith(r);
      r.play().catch(() => {});
    }
    Object.assign(pageClone.style, {
      position: 'absolute',
      left: '0',
      top: '0',
      width: px(page.offsetWidth),
      visibility: 'hidden',
    });
    page.after(pageClone);
    cloneCta = pageClone.querySelector('.hf-hero .sr-pill');
  }
  let pinnedCta = document.createElement('a');
  function resize() {
    let t;
    layout = measureFilm(parts);
    Object.assign(bubble.style, {
      left: px(layout.bubble.x),
      top: px(layout.bubble.y),
      width: px(layout.bubble.w),
      height: px(layout.bubble.h),
    });
    Object.assign(pinnedCta.style, {
      left: px(layout.cta.left),
      top: px(layout.cta.top),
      width: px(layout.cta.width),
      height: px(layout.cta.height),
    });
    if (pageClone) {
      pageClone.style.width = px(page.offsetWidth);
    }
    t = root.parentElement.getBoundingClientRect();
    overlay.style.transform =
      mascot.style.translate =
      bubble.style.translate =
        `${px(-t.left)} ${px(-t.top)}`;
  }
  listen(pinnedCta, 'click', (e) => {
    e.preventDefault();
    cta.click();
  });
  root.appendChild(pinnedCta);
  let zoom = (e) => {
      let t;
      return e < zoomReturn[0]
        ? 0.86 * ((t = interval(e, zoomOut)) < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2)
        : 0.86 * (1 - easeOutQuart(interval(e, zoomReturn)));
    },
    projectPagePoint = (e, t) => {
      let r = 1 / (1 - zoom(t));
      return {
        x: layout.mid.x + (e.x - layout.mid.x) * r,
        y: layout.mid.y + (e.y - layout.mid.y) * r,
        s: r,
      };
    },
    idleState = {
      look: {
        x: 3.2,
        y: -0.6,
      },
      blink: false,
      hop: -1,
    },
    tip = {
      x: 0,
      y: 0,
    };
  function renderMascot(time) {
    let pose = (function mascotPose(time, layout, running, idle) {
        let scale = layout.sc,
          home = layout.home,
          base = {
            x: home.x,
            y: home.y,
            rot: 0,
            eyes: 'dashes',
            look: {
              x: 0,
              y: 0,
            },
            sa: 1,
            sx: 1,
            axis: 90,
            blur: 0,
            alpha: interval(time, [arriveHop[0], arriveHop[0] + 0.08]),
            size: scale,
            space: 'page',
          },
          aiming = {
            ...base,
            rot: layout.aimAngle,
            eyes: 'dots',
            look: {
              x: 3.4,
              y: 0,
            },
            axis: layout.aim,
          };
        if (time < arriveHop[1]) {
          let t = Math.sin(Math.PI * interval(time, arriveHop));
          return {
            ...base,
            y: home.y - 34 * scale * t,
            sa: 1 + 0.12 * t,
            eyes: 'dots',
          };
        }
        if (time < toLoop[0]) {
          let t = interval(time, [arriveHop[1], toLoop[0]]);
          return {
            ...base,
            look:
              t < 0.33
                ? {
                    x: -3.2,
                    y: 0.6,
                  }
                : t < 0.66
                  ? {
                      x: 0.4,
                      y: -2.6,
                    }
                  : {
                      x: 3.2,
                      y: -1,
                    },
            eyes: time >= 1.3 && time < 1.37 ? 'sleepy' : 'dots',
          };
        }
        if (time < drawLoop[0]) {
          let r = interval(time, toLoop),
            a = mascotAtPath(layout, pointOnLoop(layout, 0), angleOnLoop(layout, 0));
          return {
            ...base,
            x: mix(home.x, a.x, easeInOutQuad(r)),
            y: mix(home.y, a.y, easeInOutQuad(r)) - 70 * scale * Math.sin(Math.PI * r),
            rot: mix(0, angleOnLoop(layout, 0), easeOutCubic(r)),
            eyes: 'dots',
            look: {
              x: -1.2,
              y: -3,
            },
          };
        }
        if (time < toSlash[0]) {
          let r = easeInOutQuad(interval(time, drawLoop)),
            a = pointOnLoop(layout, r),
            n = Math.hypot(a.dx, a.dy) || 1,
            s = Math.min(1, n / (22 * scale)),
            l = angleOnLoop(layout, r),
            c = (180 * Math.atan2(a.dy, a.dx)) / Math.PI,
            d = 1 + 0.12 * s,
            h = 1 - 0.05 * s,
            u = mascotAtPath(layout, a, l, d, h, c);
          return {
            ...base,
            ...u,
            rot: l,
            axis: c,
            sa: d,
            sx: h,
            eyes: 'dots',
            look: {
              x: (3 * a.dx) / n,
              y: (2.4 * a.dy) / n,
            },
          };
        }
        if (time < toSlash[1]) {
          let r = interval(time, toSlash),
            a = angleOnLoop(layout, 1),
            n = mascotAtPath(layout, pointOnLoop(layout, 1), a);
          return {
            ...aiming,
            x: mix(n.x, layout.slashStart.x, easeInOutQuad(r)),
            y: mix(n.y, layout.slashStart.y, easeInOutQuad(r)) - 60 * scale * Math.sin(Math.PI * r),
            rot: mix(
              a,
              (function (e, t) {
                for (; e - t > 180; ) e -= 360;
                for (; e - t < -180; ) e += 360;
                return e;
              })(layout.aimAngle, a),
              easeOutCubic(r),
            ),
          };
        }
        if (time < slashCut[0]) {
          let r = Math.sin((Math.PI / 2) * interval(time, chargeSlash));
          return {
            ...aiming,
            x: layout.slashStart.x - 8 * layout.slashDir.x * scale * r,
            y: layout.slashStart.y - 8 * layout.slashDir.y * scale * r,
            sa: 1 - 0.28 * r,
            sx: 1 + 0.16 * r,
          };
        }
        if (time < slashCut[1]) {
          let r = interval(time, slashCut),
            a = layout.slashLength * Math.pow(r, 1.8);
          return {
            ...aiming,
            x: layout.slashStart.x + layout.slashDir.x * a,
            y: layout.slashStart.y + layout.slashDir.y * a,
            sa: 1 + 0.9 * clamp01(3 * r),
            sx: 1 - 0.3 * clamp01(3 * r),
            blur: 7 * clamp01(2.5 * r),
          };
        }
        if (time < returnHops[0])
          return {
            ...base,
            alpha: 0,
          };
        if (time < returnHome[0]) {
          let r = layout.hops,
            a = r.length - 1,
            o = interval(time, returnHops) * a,
            n = Math.min(a - 1, Math.floor(o)),
            s = o - n,
            l = time >= returnHops[1],
            c = l
              ? Math.sin(Math.PI * interval(time, [returnHops[1], returnHops[1] + 0.12]))
              : s > 0.86
                ? Math.sin(((s - 0.86) / 0.28) * Math.PI)
                : 0;
          return {
            ...base,
            space: 'screen',
            size: layout.cs,
            x: l ? r[a].x : mix(r[n].x, r[n + 1].x, easeInOutQuad(s)),
            y: l
              ? r[a].y
              : mix(r[n].y, r[n + 1].y, easeInOutQuad(s)) - 40 * layout.cs * Math.sin(Math.PI * s),
            sa: (1 - 0.16 * c + (l ? 0 : 0.1 * Math.sin(Math.PI * s))) * 1.3,
            sx: (1 + 0.12 * c) * 1.3,
            rot: -12,
            eyes: time >= 16.05 && time < 16.12 ? 'sleepy' : 'dots',
            look:
              time < returnHops[1]
                ? {
                    x: -3.2,
                    y: 0.4,
                  }
                : time < 16.3
                  ? {
                      x: -3,
                      y: -1.4,
                    }
                  : {
                      x: 2.6,
                      y: 1.6,
                    },
            alpha: 1,
          };
        }
        if (time < returnHome[1]) {
          let r = interval(time, returnHome),
            a = layout.hops[3],
            s = 1 + 0.12 * Math.sin(Math.PI * r);
          return {
            ...base,
            space: 'screen',
            x: mix(a.x, home.x, easeInOutQuad(r)),
            y: mix(a.y, home.y, easeInOutQuad(r)) - 220 * layout.cs * Math.sin(Math.PI * r),
            rot: mix(-12, -360, easeOutCubic(r)),
            eyes: 'dots',
            look: {
              x: -2,
              y: 2,
            },
            size: mix(1.3 * layout.cs, scale, easeInOutQuad(r)),
            sa: s,
            sx: s,
            alpha: 1,
          };
        }
        let landing = Math.sin(Math.PI * interval(time, [returnHome[1], returnHome[1] + 0.12])),
          rest = {
            ...base,
            sa: 1 - 0.14 * landing,
            sx: 1 + 0.1 * landing,
            eyes: (time > 18.3 && time < 18.37) || idle.blink ? 'sleepy' : 'dots',
            look: running
              ? {
                  x: 3.2,
                  y: -0.6,
                }
              : idle.look,
            alpha: 1,
          };
        if (running || idle.hop < 0) return rest;
        let hopTime = idle.hop,
          squash = Math.sin(Math.PI * interval(hopTime, [0, 0.09])),
          flight = interval(hopTime, [0.07, 0.4]),
          touchdown = Math.sin(Math.PI * interval(hopTime, [0.4, 0.52]));
        return {
          ...rest,
          y: rest.y - 30 * scale * Math.sin(Math.PI * flight),
          sa: 1 - 0.16 * squash - 0.14 * touchdown + 0.1 * Math.sin(Math.PI * flight),
          sx: 1 + 0.1 * squash + 0.1 * touchdown - 0.05 * Math.sin(Math.PI * flight),
          rot: -8 * Math.sin(Math.PI * flight),
          eyes: flight > 0 && flight < 1 ? 'happy' : rest.eyes,
        };
      })(time, layout, running, idleState),
      offset = mascotOffset(pose.rot, pose.sa, pose.sx, pose.axis, pose.size);
    tip = {
      x: pose.x + offset.x,
      y: pose.y + offset.y,
    };
    let position =
        'page' === pose.space
          ? projectPagePoint(pose, time)
          : {
              x: pose.x,
              y: pose.y,
              s: 1,
            },
      scaleX = pose.sa * position.s * pose.size,
      scaleY = pose.sx * position.s * pose.size;
    mascot.style.transform = `translate(${px(position.x - 60)},${px(position.y - 60)}) rotate(${pose.axis}deg) scale(${scaleX.toFixed(4)},${scaleY.toFixed(4)}) rotate(${-pose.axis}deg)`;
    mascot.style.filter =
      (pose.blur > 0.05 ? `blur(${pose.blur.toFixed(2)}px) ` : '') +
      'drop-shadow(0 8px 12px rgb(0 0 0 / .5)) drop-shadow(0 0 18px rgb(60 230 172 / .25))';
    mascot.style.opacity = String(pose.alpha);
    mascotBody.setAttribute('transform', `rotate(${pose.rot.toFixed(2)} 100 68)`);
    eyes.setAttribute(
      'transform',
      `translate(${111.6 + pose.look.x} ${68.2 + pose.look.y}) rotate(${(-pose.rot).toFixed(2)})`,
    );
    if (eyes.dataset.eyes !== pose.eyes) {
      eyes.innerHTML = eyeShapes[pose.eyes];
      eyes.dataset.eyes = pose.eyes;
    }
  }
  let split = false,
    worldsVisible = false;
  function setSplit(e, t) {
    if (e && !pageClone) {
      createClone();
    }
    if (e !== split) {
      split = e;
      page.style.clipPath = e
        ? polygon([
            {
              x: -4e3,
              y: layout.top.y,
            },
            layout.top,
            layout.bottom,
            {
              x: -4e3,
              y: layout.bottom.y,
            },
          ])
        : '';
      pageClone.style.clipPath = polygon([
        layout.top,
        {
          x: 6e3,
          y: layout.top.y,
        },
        {
          x: 6e3,
          y: layout.bottom.y,
        },
        layout.bottom,
      ]);
      pageClone.style.visibility = e ? 'visible' : 'hidden';
    }
    let r = e && t;
    if (r !== worldsVisible) {
      worldsVisible = r;
      worlds.style.visibility = r ? 'visible' : 'hidden';
    }
  }
  function renderFilm(time) {
    let leafOffset,
      dockProgress,
      markScale,
      slashDistance,
      slashTip,
      slashFrom,
      slashTo,
      fade,
      slashAlpha,
      flashGain,
      wordsVisible,
      wordsAlpha,
      wordsScale,
      sceneTime = time - 0.4,
      arriving = time < 1.22;
    if (
      ((leafOffset = (520 * layout.cs * (1 - easeOutQuart(interval(time, markUnfold)))) / layout.markBig),
      leaves[0].setAttribute(
        'transform',
        `translate(${(-crossDirection.x * leafOffset).toFixed(2)} ${(-crossDirection.y * leafOffset).toFixed(2)})`,
      ),
      leaves[1].setAttribute(
        'transform',
        `translate(${(crossDirection.x * leafOffset).toFixed(2)} ${(crossDirection.y * leafOffset).toFixed(2)})`,
      ),
      (dockProgress = easeInOutCubic(interval(time, markDock))),
      (markScale = mix(layout.markBig, layout.markDockScale, dockProgress)),
      (mark.style.transform = `translate(${px(mix(layout.markStart.x, layout.markDock.x, dockProgress) - 50)},${px(mix(layout.markStart.y, layout.markDock.y, dockProgress) - 50)}) scale(${markScale.toFixed(4)})`),
      (mark.style.opacity = String(time > markDock[1] + 0.06 ? 0 : interval(time, [0, 0.06]))),
      (mark.style.filter = `drop-shadow(0 0 ${(40 * (1 - dockProgress) + 4).toFixed(1)}px rgb(60 230 172 / ${(0.6 * (1 - dockProgress)).toFixed(2)}))`),
      (logo.style.opacity = time < markDock[1] ? '0' : ''),
      renderMascot(sceneTime),
      (function renderInk(time) {
        let count = Math.floor(easeInOutQuad(interval(time, drawLoop)) * (layout.loop.length - 1)),
          straightening = easeInOutCubic(interval(time, pullLine)),
          points = [],
          appendPoint = (t) => {
            let r = projectPagePoint(t, time);
            points.push(`${r.x.toFixed(1)},${r.y.toFixed(1)}`);
          };
        for (let e = 0; e <= count; e++)
          appendPoint({
            x: mix(layout.loop[e].x, layout.taut[e].x, straightening),
            y: mix(layout.loop[e].y, layout.taut[e].y, straightening),
          });
        if (time < slashCut[0] + 0.02) {
          appendPoint(tip);
        }
        let opacity = time < drawLoop[0] + 0.005 ? 0 : 1 - interval(time, [slashCut[0] + 0.02, 3.4]);
        attributes(ink, {
          d: `M${points.join(' L')}`,
          'stroke-width': 6.5 * layout.sc,
          opacity: opacity,
        });
      })(sceneTime),
      (slashDistance =
        sceneTime < slashCut[0]
          ? 0
          : sceneTime < slashCut[1]
            ? layout.slashLength * Math.pow(interval(sceneTime, slashCut), 1.8)
            : layout.slashLength + 400),
      (slashTip = {
        x: layout.slashStart.x + layout.slashDir.x * slashDistance,
        y: layout.slashStart.y + layout.slashDir.y * slashDistance,
      }),
      (slashFrom = projectPagePoint(sceneTime >= 3.36 ? layout.bottom : layout.slashStart, sceneTime)),
      (slashTo = projectPagePoint(sceneTime >= 3.36 ? layout.top : slashTip, sceneTime)),
      (slashAlpha =
        sceneTime < slashCut[0] || sceneTime > zoomReturn[0]
          ? 0
          : sceneTime < splitOpen[0]
            ? 1
            : 1 - (1 - (1 - (fade = interval(sceneTime, [splitOpen[0], splitOpen[0] + 0.24]))) * (1 - fade))),
      (flashGain = sceneTime >= 3.36 && sceneTime < 3.46 ? 1.6 : 1),
      [28, 14, 7, 2.6].forEach((e, t) => {
        t < 3
          ? drawGlow(slashLines[t], slashFrom, slashTo, e * layout.cs, [46, 16, 5][t])
          : attributes(slashLines[t], {
              x1: slashFrom.x,
              y1: slashFrom.y,
              x2: slashTo.x,
              y2: slashTo.y,
              'stroke-width': e * layout.cs,
            });
        slashLines[t].setAttribute(
          'opacity',
          String((0 === t ? 0.45 : 1) * slashAlpha * (t < 2 ? flashGain : 1)),
        );
      }),
      arriving)
    ) {
      let t;
      setSplit(false, false);
      t = easeOutCubic(interval(time, [markDock[0] - 0.05, markDock[1]]));
      page.style.transform = '';
      page.style.filter = t < 0.996 ? `blur(${(14 * (1 - t)).toFixed(2)}px)` : '';
      page.style.opacity = (0.55 + 0.45 * t).toFixed(3);
      gap.setAttribute('opacity', '0');
      flash.style.opacity = '0';
    } else
      !(function renderSplit(time) {
        setSplit(time >= 3.36 && time < splitClose[1] + 0.02, time < 13.6);
        let opening =
            time < zoomReturn[0]
              ? time < splitOpen[0]
                ? 0
                : easeOutExpo(interval(time, splitOpen))
              : 1 - easeInOutCubic(interval(time, splitClose)),
          gapDistance = 44 * layout.cs * opening,
          sideDistance = 26 * layout.cs * opening,
          zoomStart = zoomOut[0],
          travel = 0;
        time >= zoomStart && time < zoomReturn[0]
          ? (travel = 1500 * layout.cs * Math.pow(interval(time, [zoomStart + 0.08, zoomOut[1] - 0.18]), 2.2))
          : time >= zoomReturn[0] &&
            (travel =
              1500 * layout.cs * Math.pow(1 - interval(time, [zoomReturn[0], zoomReturn[1] - 0.25]), 2.2));
        let scale = 1 / (1 - zoom(time)),
          { mid: center } = layout,
          opacity =
            time < zoomReturn[0]
              ? 1 - interval(time, [zoomStart + 0.35, zoomStart + 0.5])
              : interval(time, [wordsExit[0] + 0.15, wordsExit[0] + 0.3]),
          blur =
            12 * Math.pow(pulse(time, [zoomOut[0] + 0.08, zoomOut[0] + 0.64]), 1.5) +
            12 * Math.pow(pulse(time, [zoomReturn[0] - 0.05, zoomReturn[0] + 0.4]), 1.5),
          edgeOpacity =
            time >= 3.36 && time < zoomReturn[0]
              ? 0.9 * (1 - interval(time, [zoomStart + 0.26, zoomStart + 0.48]))
              : time >= zoomReturn[0]
                ? 0.9 * (1 - interval(time, [splitClose[1] - 0.05, splitClose[1] + 0.12]))
                : 0;
        [
          [page, -1],
          [pageClone, 1],
        ].forEach(([e, t], i) => {
          let m = -t * cutDirection.x * gapDistance + t * crossDirection.x * (sideDistance + travel),
            f = -t * cutDirection.y * gapDistance + t * crossDirection.y * (sideDistance + travel),
            p = center.x - center.x * scale + m,
            y = center.y - center.y * scale + f;
          edges[i].setAttribute('transform', `matrix(${scale},0,0,${scale},${p},${y})`);
          let x = edges[i].firstElementChild;
          if (
            (setLine(x, layout.top, layout.bottom),
            attributes(x, {
              opacity: split ? edgeOpacity : 0,
              'stroke-width': 3 / scale,
            }),
            !e)
          )
            return;
          let g = split && (Math.abs(scale - 1) > 1e-4 || Math.abs(m) + Math.abs(f) > 0.01);
          e.style.transform = g ? `translate(${px(p)},${px(y)}) scale(${scale.toFixed(4)})` : '';
          e.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : '';
          e.style.opacity = split ? String(opacity) : '';
        });
        let glow = pulse(time, ctaGlow);
        cta.style.boxShadow =
          glow > 0.001
            ? `0 0 0 ${(6 * glow).toFixed(1)}px rgb(60 230 172 / ${(0.35 * glow).toFixed(3)}), 0 0 ${(60 * glow).toFixed(0)}px rgb(60 230 172 / ${(0.55 * glow).toFixed(3)})`
            : '';
        let gapScale = 1 / (1 - zoom(time) / 1.08);
        gap.setAttribute(
          'transform',
          `matrix(${gapScale},0,0,${gapScale},${center.x - center.x * gapScale},${center.y - center.y * gapScale})`,
        );
        let gapPulse =
            pulse(time, [zoomStart + 0.08, zoomStart + 0.46]) +
            pulse(time, [zoomReturn[0], zoomReturn[0] + 0.4]),
          gapOpacity =
            time < zoomReturn[0]
              ? interval(time, [3.36, 3.44]) * (1 - interval(time, [zoomStart + 0.42, zoomStart + 0.6]))
              : interval(time, [zoomReturn[0], zoomReturn[0] + 0.1]) * (1 - interval(time, splitClose));
        gap.setAttribute('opacity', gapOpacity.toFixed(3));
        gapLines.forEach((e, r) => {
          let a =
            ([40 + 120 * gapPulse, 8 + 30 * opening + 40 * gapPulse, 2 + 8 * opening + 12 * gapPulse][r] *
              layout.cs) /
            gapScale;
          r < 2
            ? drawGlow(e, layout.top, layout.bottom, a, [38, 12][r])
            : (setLine(e, layout.top, layout.bottom), e.setAttribute('stroke-width', String(a)));
        });
        flash.style.opacity =
          time >= 3.36 && time < 3.36 + 2 / 30 ? (time < 3.36 + 1 / 30 ? '0.38' : '0.14') : '0';
      })(sceneTime);
    !(function renderPinnedCta(time, arriving) {
      let entering = time >= downloadEnter[0] && time < zoomReturn[0],
        shown =
          split && running && !arriving && time >= zoomOut[0] + 0.42 && (time >= zoomReturn[0] || entering);
      pinnedCta.style.display = shown ? 'inline-flex' : 'none';
      let [left, right] = layout.cardButton,
        videoCenterX = (left.x + right.x) / 2,
        videoCenterY = (left.y + right.y) / 2,
        ctaCenterX = layout.cta.left + layout.cta.width / 2,
        ctaCenterY = layout.cta.top + layout.cta.height / 2,
        scale = (right.x - left.x) / layout.cta.width;
      if (shown && time >= zoomReturn[0] && time < zoomReturn[1]) {
        let t = easeOutCubic(interval(time, [zoomReturn[0], zoomReturn[1] - 0.12])),
          r = easeInOutCubic(interval(time, [zoomReturn[0] + 0.1, zoomReturn[1]])),
          [a, o] = ctaCenterY > videoCenterY ? [r, t] : [t, r];
        pinnedCta.style.transform = `translate(${px(mix(videoCenterX, ctaCenterX, a) - ctaCenterX)},${px(mix(videoCenterY, ctaCenterY, o) - ctaCenterY)}) scale(${mix(scale, 1, o).toFixed(4)})`;
      } else if (shown && entering) {
        let t = easeOutCubic(interval(time, downloadEnter)),
          r = easeOutQuart(interval(time, downloadFlip)),
          a = mix(-0.25 * layout.vw, videoCenterX, t),
          o = mix(1.15 * layout.vh, videoCenterY, t);
        pinnedCta.style.transform = `translate(${px(a - ctaCenterX)},${px(o - ctaCenterY)}) scale(${(scale * mix(1.6, 1, t)).toFixed(4)}) perspective(700px) rotateY(${(-360 * (1 - r)).toFixed(1)}deg) rotateX(${(24 * (1 - r)).toFixed(1)}deg) rotateZ(${(-20 * (1 - t)).toFixed(1)}deg)`;
      } else pinnedCta.style.transform = '';
      let hideOriginal = split && running && !arriving && time >= zoomOut[0] + 0.42;
      cta.style.visibility = hideOriginal ? 'hidden' : '';
      if (cloneCta) {
        cloneCta.style.visibility = hideOriginal ? 'hidden' : '';
      }
    })(sceneTime, arriving);
    wordsVisible = running && sceneTime >= 13.6 && sceneTime < wordsExit[1] + 0.2;
    wordsAlpha = 1 - interval(sceneTime, [wordsExit[0] + 0.02, wordsExit[0] + 0.15]);
    wordsScale = Math.pow(interval(sceneTime, wordsExit), 4);
    wordLayers.forEach((e, t) => {
      if (((e.style.opacity = wordsVisible ? String(wordsAlpha) : '0'), !wordsVisible)) return;
      let r = 0 === t ? -1 : 1;
      e.style.fontSize = px(124 * layout.cs);
      e.style.paddingBottom = px(230 * layout.cs);
      e.style.clipPath =
        r < 0
          ? polygon([
              {
                x: -4e3,
                y: layout.top.y,
              },
              layout.top,
              layout.bottom,
              {
                x: -4e3,
                y: layout.bottom.y,
              },
            ])
          : polygon([
              layout.top,
              {
                x: 6e3,
                y: layout.top.y,
              },
              {
                x: 6e3,
                y: layout.bottom.y,
              },
              layout.bottom,
            ]);
      let a = 230 * layout.cs * wordsScale;
      e.style.transform = `translate(${px(r * crossDirection.x * a)},${px(r * crossDirection.y * a)}) scale(${(1 - 0.25 * wordsScale).toFixed(4)})`;
      [...e.children].forEach((e, t) => {
        let r = 13.6 + 0.07 * t,
          a = easeOutExpo(interval(sceneTime, [r, r + 0.45])),
          o = e.style;
        o.opacity = String(sceneTime < r ? 0 : mix(0.15, 1, a));
        o.transform = `scale(${mix(0.75, 1, a).toFixed(4)})`;
        o.filter = a < 0.999 ? `blur(${mix(10, 0, a).toFixed(2)}px)` : 'none';
      });
    });
  }
  let idleStart = performance.now(),
    bubbleHoldUntil = 0,
    idleFrame = 0,
    hopStart = 0,
    pointer = null,
    lookTarget = idleState.look;
  function idleTick(time) {
    if (((idleFrame = 0), running)) return;
    if (filmEnabled && reducedMotion) {
      bubble.style.opacity = '1';
      bubble.style.transform = '';
      bubble.style.pointerEvents = 'auto';
    } else if (filmEnabled) {
      let t,
        r = ((time - idleStart) / 1e3 - 0.4) % 8.5,
        a =
          time < bubbleHoldUntil
            ? 1
            : r >= 0 && r < 3.6
              ? r < 0.36
                ? 1 + 2.2 * Math.pow((t = r / 0.36) - 1, 3) + 1.2 * Math.pow(t - 1, 2)
                : 1 - interval(r, [3.36, 3.6])
              : 0;
      bubble.style.opacity = Math.max(0, Math.min(1, a)).toFixed(3);
      bubble.style.transform = `translateY(${(2.4 * Math.sin(time / 420) * layout.sc).toFixed(2)}px) rotate(${(3.2 * Math.sin(time / 610)).toFixed(2)}deg) scale(${(0.4 + 0.6 * a).toFixed(3)})`;
      bubble.style.pointerEvents = a > 0.4 ? 'auto' : 'none';
    }
    if (pointer) {
      let e = mascot.querySelector('circle').getBoundingClientRect(),
        t = pointer.x - (e.left + e.width / 2),
        r = pointer.y - (e.top + e.height / 2),
        a = Math.hypot(t, r) || 1,
        o = Math.min(1, a / (160 * layout.sc));
      lookTarget = {
        x: (4.2 * o * t) / a,
        y: (3.6 * o * r) / a,
      };
    }
    let lookMoving =
      Math.abs(idleState.look.x - lookTarget.x) + Math.abs(idleState.look.y - lookTarget.y) > 0.02;
    idleState.look = {
      x: mix(idleState.look.x, lookTarget.x, 0.22),
      y: mix(idleState.look.y, lookTarget.y, 0.22),
    };
    idleState.hop = hopStart ? (time - hopStart) / 1e3 : -1;
    if (idleState.hop > 0.52) {
      hopStart = 0;
    }
    renderMascot(duration - 0.4);
    if ((filmEnabled && !reducedMotion) || lookMoving || hopStart || idleState.blink) {
      idleFrame = requestAnimationFrame(idleTick);
    }
  }
  let wakeIdle = () => {
      if (!(running || idleFrame)) {
        idleFrame = requestAnimationFrame(idleTick);
      }
    },
    blinkTimeout = 0,
    blinkInterval = setInterval(() => {
      if (!(running || hopStart || reducedMotion)) {
        idleState.blink = true;
        wakeIdle();
        blinkTimeout = window.setTimeout(() => (idleState.blink = false), 90);
      }
    }, 4200),
    hopAudio = new Audio(window.AtlasAssets.resolve(hopSound));
  function hop() {
    if (!(running || hopStart)) {
      hopStart = performance.now();
      if (navigator.userActivation?.hasBeenActive) {
        hopAudio.currentTime = 0;
        hopAudio.play().catch(() => {});
      }
      wakeIdle();
    }
  }
  hopAudio.volume = 0.35;
  listen(
    window,
    'pointermove',
    (e) => {
      pointer = {
        x: e.clientX,
        y: e.clientY,
      };
      wakeIdle();
    },
    {
      passive: true,
    },
  );
  listen(mascot, 'pointerenter', () => {
    bubbleHoldUntil = performance.now() + 2600;
    hop();
  });
  listen(bubble, 'pointerenter', () => (bubbleHoldUntil = performance.now() + 2600));
  let soundFrame = 0,
    muted = false,
    filmFrame = 0;
  function setRunning(e) {
    if (running !== e) {
      running = e;
      onChange();
    }
  }
  function lockPage(e) {
    let t = document.documentElement;
    t.style.overflow = e ? 'hidden' : '';
    t.style.scrollbarGutter = e ? 'stable' : '';
    page.inert = mascot.inert = bubble.inert = e;
  }
  function finish() {
    let e = running;
    setRunning(false);
    lockPage(false);
    if (e) {
      mascot.focus({
        preventScroll: true,
      });
    }
    idleStart = performance.now();
    renderFilm(duration);
    wakeIdle();
  }
  function tick() {
    if (((filmFrame = 0), running)) {
      if (video.ended) return finish();
      renderFilm(video.currentTime);
      filmFrame = requestAnimationFrame(tick);
    }
  }
  let readyPromise = null,
    load = () =>
      (readyPromise ??= new Promise((e, t) => {
        listen(
          video,
          'canplaythrough',
          () => {
            duration = video.duration || duration;
            e();
          },
          {
            once: true,
          },
        );
        listen(
          video,
          'error',
          () => {
            readyPromise = null;
            t(video.error);
          },
          {
            once: true,
          },
        );
        video.src = window.AtlasAssets.resolve(src);
      })),
    generation = 0,
    loading = false;
  function skip() {
    generation++;
    loading = false;
    video.pause();
    finish();
  }
  async function start() {
    let e = ++generation,
      t = () => abort.signal.aborted || e !== generation;
    loading = true;
    try {
      await load();
    } catch {
      if (!t()) {
        skip();
      }
      return;
    }
    if (t()) return;
    if (!pageClone) {
      createClone();
    }
    cancelAnimationFrame(soundFrame);
    video.currentTime = 0;
    video.muted = muted;
    video.volume = 0.85;
    let r = await video.play().then(
      () => true,
      () => false,
    );
    if (
      (r ||
        t() ||
        ((video.muted = true),
        (r = await video.play().then(
          () => true,
          () => false,
        ))),
      !t())
    ) {
      if (((loading = false), !r)) return finish();
      scrollTo({
        top: 0,
        behavior: 'instant',
      });
      pinnedCta.className = `${cta.className} hf-film-pin`;
      pinnedCta.innerHTML = cta.innerHTML;
      pinnedCta.setAttribute('href', cta.getAttribute('href') ?? '');
      pinnedCta.setAttribute('aria-hidden', 'true');
      pinnedCta.tabIndex = -1;
      resize();
      cancelAnimationFrame(idleFrame);
      idleFrame = 0;
      bubble.style.opacity = '0';
      bubble.style.pointerEvents = 'none';
      setRunning(true);
      lockPage(true);
      if (!filmFrame) {
        filmFrame = requestAnimationFrame(tick);
      }
    }
  }
  listen(window, 'resize', () => {
    resize();
    if (split) {
      split = false;
      setSplit(true, worldsVisible);
    }
    if (!running) {
      renderFilm(duration);
    }
  });
  let activate = () => {
    filmEnabled ? running || start() : hop();
  };
  listen(mascot, 'click', activate);
  listen(mascot, 'keydown', (e) => {
    if ('Enter' === e.key || ' ' === e.key) {
      e.preventDefault();
      activate();
    }
  });
  listen(bubble, 'click', activate);
  if (!filmEnabled) {
    bubble.hidden = true;
    mascot.setAttribute('aria-label', 'Framey');
  }
  resize();
  renderFilm(0);
  return {
    video: video,
    get running() {
      return running;
    },
    start: start,
    load: load,
    skip: function () {
      if (running || loading) {
        skip();
      }
    },
    rest: skip,
    seek(e) {
      if (running) {
        video.currentTime = Math.max(0, Math.min(duration - 0.05, e));
        renderFilm(video.currentTime);
      }
    },
    toggleSound() {
      video.muted
        ? ((muted = false),
          (function (e = 700) {
            cancelAnimationFrame(soundFrame);
            video.muted = false;
            let t = video.volume,
              r = performance.now(),
              a = (o) => {
                video.volume = mix(t, 0.85, interval(o, [r, r + e]));
                if (o - r < e) {
                  soundFrame = requestAnimationFrame(a);
                }
              };
            soundFrame = requestAnimationFrame(a);
            onChange();
          })(300))
        : ((muted = true), (video.muted = true), onChange());
    },
    destroy() {
      for (let e of (abort.abort(),
      clearInterval(blinkInterval),
      clearTimeout(blinkTimeout),
      [idleFrame, filmFrame, soundFrame].forEach(cancelAnimationFrame),
      video.pause(),
      video.removeAttribute('src'),
      video.load(),
      pageClone?.querySelectorAll('video') ?? []))
        for (let t of e.srcObject?.getTracks() ?? []) t.stop();
      pageClone?.remove();
      root.innerHTML = '';
      lockPage(false);
      Object.assign(page.style, {
        position: '',
        zIndex: '',
        transform: '',
        transformOrigin: '',
        clipPath: '',
        filter: '',
        opacity: '',
      });
      Object.assign(cta.style, {
        boxShadow: '',
        visibility: '',
      });
      logo.style.opacity = '';
    },
  };
}
const soundIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"></path></svg>';
const muteIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"></path><path d="m16 9 6 6M22 9l-6 6"></path></svg>';
export function mountFilm() {
  const root = document.querySelector('.hf-film');
  const headline = document.querySelector('.hf-headline');
  let dock = null,
    dockFrame = 0,
    controller;
  function syncDock() {
    if (!controller.running) {
      cancelAnimationFrame(dockFrame);
      dock?.remove();
      dock = null;
      return;
    }
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'hf-dock';
      dock.setAttribute('role', 'group');
      dock.setAttribute('aria-label', 'Film timeline');
      dock.innerHTML =
        '<button type="button" class="hf-dock-sound" data-film-sound="true"></button><span class="hf-dock-time" aria-hidden="true">00:00.0</span><div class="hf-dock-tracks">' +
        chapters
          .map(
            (chapter) =>
              `<div class="hf-dock-chapter" style="left:${(100 * chapter.from) / 19}%;width:${(100 * (chapter.to - chapter.from)) / 19}%">${chapter.name}</div>`,
          )
          .join('') +
        '<div class="hf-dock-head"></div></div><button type="button">Skip</button>';
      root.after(dock);
      const tracks = dock.querySelector('.hf-dock-tracks');
      let held = false,
        wasPlaying = false;
      function seek(event) {
        const box = tracks.getBoundingClientRect();
        controller.seek(19 * Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)));
      }
      tracks.addEventListener('pointerdown', (event) => {
        tracks.setPointerCapture(event.pointerId);
        held = true;
        wasPlaying = !controller.video.paused;
        controller.video.pause();
        seek(event);
      });
      tracks.addEventListener('pointermove', (event) => {
        if (held) seek(event);
      });
      function release() {
        if (!held) return;
        held = false;
        if (wasPlaying) controller.video.play().catch(() => {});
      }
      tracks.addEventListener('pointerup', release);
      tracks.addEventListener('pointercancel', release);
      dock.querySelector('.hf-dock-sound').addEventListener('click', controller.toggleSound);
      const skip = dock.querySelector('button:last-child');
      skip.addEventListener('click', controller.skip);
      skip.focus();
      function update() {
        const time = controller.video.currentTime;
        dock.querySelector('.hf-dock-head').style.left = `${(100 * time) / 19}%`;
        dock.querySelector('.hf-dock-time').textContent =
          `${String(Math.floor(time / 60)).padStart(2, '0')}:${(time % 60).toFixed(1).padStart(4, '0')}`;
        const chapter = chapters.findIndex((chapter) => time >= chapter.from && time < chapter.to);
        dock
          .querySelectorAll('.hf-dock-chapter')
          .forEach((node, index) => node.classList.toggle('is-on', index === chapter));
        dockFrame = requestAnimationFrame(update);
      }
      dockFrame = requestAnimationFrame(update);
    }
    const muted = controller.video.muted;
    const button = dock.querySelector('.hf-dock-sound');
    button.className = 'hf-dock-sound' + (muted ? ' is-muted' : '');
    button.setAttribute('aria-label', muted ? 'Sound on' : 'Mute');
    button.innerHTML =
      (muted ? muteIcon : soundIcon) + (muted ? '<span aria-hidden="true">Sound on</span>' : '');
  }
  controller = createFilm({
    parts: {
      page: document.querySelector('.hf-stage'),
      headline,
      cta: document.querySelector('.hf-hero .sr-pill'),
      logo: document.querySelector('.sr-brand img'),
      rest:
        innerWidth < 600
          ? (headline.querySelector('span:last-child') ?? headline)
          : document.querySelector('.hf-hero .sr-lockup .sr-light'),
    },
    ribbon: document.querySelector('.hf-ribbon'),
    root,
    src: 'assets/homepage/film-v19.mp4',
    hopSound: 'assets/homepage/framey-hop-v1.mp3',
    film:
      innerWidth >= 900 &&
      innerWidth / innerHeight >= 1.15 &&
      matchMedia('(hover: hover) and (pointer: fine)').matches,
    still: matchMedia('(prefers-reduced-motion: reduce)').matches,
    onChange: syncDock,
  });
  controller.rest();
  return () => {
    cancelAnimationFrame(dockFrame);
    dock?.remove();
    controller.destroy();
  };
}
