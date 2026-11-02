import {
  WebGLRenderer,
  Color,
  Scene,
  PerspectiveCamera,
  Group,
  TextureLoader,
  VideoTexture,
  CanvasTexture,
  Vector4,
  ShaderMaterial,
  Mesh,
  Vector3,
  Matrix4,
  Quaternion,
  Euler,
  Vector2,
  Timer,
  ExtrudeGeometry,
  Shape,
  Float32BufferAttribute,
  SRGBColorSpace,
  MathUtils,
} from './vendor/three@0.185.0/three.module.js';
const clamp = MathUtils.clamp,
  lerp = MathUtils.lerp,
  smoothstep = MathUtils.smoothstep,
  degToRad = MathUtils.degToRad;
let settings = Object.freeze({
    rows: 3,
    triSize: 3,
    cornerRound: 1,
    direction: 166,
    dirZ: 23,
    speed: 1.6,
    depth: -7,
    overscan: 18,
    gap: 0.035,
    groupGap: 0.6,
    twist: 6,
    twistDrift: 0,
    videoSpan: 4,
    assemble: 1,
    formPos: 0,
    formSpan: 8,
    formGap: 15,
    scatter: 5,
    looseRot: 1.34,
    revealSpan: 8,
    revealPos: -0.01,
    sweepDir: 91,
    glowHue: 0,
    glowSat: 0.35,
    tiltX: 0.07,
    tiltY: 0.35,
    camShift: 0,
    camX: 0,
    camY: 0,
    camZ: 14,
    fov: 50,
    tear: 0.22,
    glitch: 3,
    glow: 2.5,
    transStyle: 0,
    noiseType: 0,
    edgeFreq: 8.5,
    edgeSpeed: 0.95,
    glowWidth: 3.35,
    codeTheme: 0,
    codeMatcapIdx: 1,
    codeMix: 0,
    codeOpacity: 1,
    codeHue: 1.04,
    wire: 0,
    wireColor: '#b0b0b0',
    videoMatcapIdx: 0,
    videoMix: 0.35,
    videoOpacity: 1,
    videoHue: 0,
    windowMap: 1,
    curve: 0.8,
    content: 1,
    contentFlip: 1,
    codeScale: 1.3,
    grain: 0,
    grainPx: 6,
    videoZoom: 1,
    fog: 0,
    fogNear: 29.5,
    fogFar: 46.5,
    fogFade: 1,
    grainAmount: 0.97,
    grainDensity: 2,
    grainContrast: 4,
    bgTone: '#151517',
    auroraA: '#2f9e33',
    auroraB: '#2492bb',
    auroraC: '#8f6399',
    auroraGlow: 0.16,
    auroraSpread: 1.8,
  }),
  codeSnippets = [
    {
      tag: 'INDEX.HTML',
      lines: [
        '<div id="root"',
        '  data-composition-id="promo"',
        '  data-width="1920"',
        '  data-height="1080">',
        '  <h1 id="title" class="clip"',
        '    data-start="0"',
        '    data-duration="5">',
      ],
    },
    {
      tag: 'TIMELINE.JS',
      lines: [
        'const tl = gsap.timeline(',
        '  { paused: true });',
        'tl.from("#title", {',
        '  opacity: 0, y: -50,',
        '  duration: 1 }, 0);',
        'window.__timelines =',
        '  { "promo": tl };',
      ],
    },
    {
      tag: 'SCENE.JS',
      lines: [
        'tl.fromTo(".stat",',
        '  { y: 40, opacity: 0 },',
        '  { y: 0, opacity: 1,',
        '    ease: "power3.out",',
        '    stagger: 0.08 },',
        '  beats.intro + 0.4);',
      ],
    },
    {
      tag: 'TERMINAL',
      lines: [
        '$ npx hyperframes init promo',
        '$ npx hyperframes preview',
        '$ npx hyperframes check',
        '$ npx hyperframes render \\',
        '    --output promo.mp4',
        '$ npx skills add \\',
        '    heygen-com/hyperframes',
      ],
    },
  ],
  tokenPattern =
    /(\/\/.*$|\/\*.*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b|#[0-9a-fA-F]{3,8}\b)|(\b(?:const|let|var|function|return|if|else|for|while|new|class|import|from|export|void|uniform|varying|float|vec2|mat2|vec4|sampler2D|step|mix|texture2D)\b|<\/?[a-zA-Z][\w-]*|[<>]|=>)/gm,
  codePalette = {
    bg: '#0b0b0d',
    ln: 'rgba(232,230,223,0.22)',
    p: '#75777f',
    k: '#e8e6df',
    s: '#b3b0a2',
    n: '#ff4d00',
    c: 'rgba(117,119,127,0.5)',
    tag: 'rgba(232,230,223,0.4)',
  };
function drawCode(code, characters) {
  let {
      context: context,
      width: width,
      height: height,
      fontSize: fontSize,
      lineHeight: lineHeight,
      padding: padding,
      gutter: gutter,
      snippet: snippet,
    } = code,
    font = `${fontSize}px "TT Norms Pro Mono", monospace`,
    lines = snippet.lines;
  context.fillStyle = codePalette.bg;
  context.fillRect(0, 0, width, height);
  context.font = `${Math.round(0.8 * fontSize)}px "TT Norms Pro Mono", monospace`;
  context.fillStyle = codePalette.tag;
  context.textAlign = 'center';
  context.fillText(snippet.tag, width / 2, 0.9 * padding);
  context.textAlign = 'left';
  let remaining = Math.floor(characters),
    currentLine = 0,
    visibleCharacters = lines.map((e, t) => {
      if (remaining < 0) return -1;
      let i = e.length + 1;
      if (remaining >= i) {
        remaining -= i;
        currentLine = Math.min(t + 1, lines.length - 1);
        return e.length;
      }
      let n = remaining;
      currentLine = t;
      remaining = -1;
      return n;
    }),
    typing = characters < code.totalChars,
    scrollLine = Math.max(0, currentLine - (code.visibleLines - 1));
  code.scroll += (scrollLine - code.scroll) * 0.3;
  for (let t = 0; t < lines.length && !(visibleCharacters[t] < 0); t++) {
    let n = 1.5 * padding + (t - code.scroll + 1) * lineHeight;
    if (n < padding || n > height - 0.3 * padding) continue;
    context.font = font;
    context.fillStyle = codePalette.ln;
    context.fillText(String(t + 1).padStart(2, '0'), 0.62 * padding, n);
    let h = gutter,
      d = visibleCharacters[t];
    for (let e of (function (e) {
      let t,
        i = [],
        n = 0;
      for (tokenPattern.lastIndex = 0; null !== (t = tokenPattern.exec(e)); ) {
        if (t.index > n) {
          i.push({
            t: 'p',
            s: e.slice(n, t.index),
          });
        }
        t[1]
          ? i.push({
              t: 'c',
              s: t[1],
            })
          : t[2]
            ? i.push({
                t: 's',
                s: t[2],
              })
            : t[3]
              ? i.push({
                  t: 'n',
                  s: t[3],
                })
              : i.push({
                  t: 'k',
                  s: t[4],
                });
        n = t.index + t[0].length;
      }
      if (n < e.length) {
        i.push({
          t: 'p',
          s: e.slice(n),
        });
      }
      return i;
    })(lines[t])) {
      if (d <= 0) break;
      let t = e.s.length <= d ? e.s : e.s.slice(0, d);
      d -= e.s.length;
      context.font = 's' === e.t || 'c' === e.t ? `italic ${font}` : font;
      context.fillStyle = codePalette[e.t];
      context.fillText(t, h, n);
      h += context.measureText(t).width;
    }
    if (typing && t === currentLine) {
      context.fillStyle = codePalette.n;
      context.fillRect(h + 0.15 * fontSize, n - 0.85 * fontSize, 0.55 * fontSize, 1.05 * fontSize);
    }
  }
  code.texture.needsUpdate = true;
}
let vertexShader = `
  varying vec2 vUv;
  varying float vDepth;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vCapZ;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    vNormal = normalize(normalMatrix * normal);
    vViewPos = -mv.xyz;
    vCapZ = normal.z; // +1 front cap, -1 back cap of the extruded slab
    gl_Position = projectionMatrix * mv;
  }
`,
  shaderLibrary = `
  varying vec2 vUv;
  varying float vDepth;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vCapZ;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  vec3 hueShift(vec3 color, float a) {
    const vec3 k = vec3(0.57735);
    float c = cos(a);
    return color * c + cross(k, color) * sin(a)
         + k * dot(k, color) * (1.0 - c);
  }
  vec2 matcapUV(vec3 n, vec3 viewDir) {
    vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    vec3 y = cross(viewDir, x);
    return vec2(dot(x, n), dot(y, n)) * 0.495 + 0.5;
  }
  vec3 screenBlend(vec3 a, vec3 b) {
    return 1.0 - (1.0 - a) * (1.0 - b);
  }
`,
  faceShader = `
  uniform sampler2D uCode;
  uniform sampler2D uVideo;
  uniform sampler2D uMatcapCode;
  uniform sampler2D uMatcapVideo;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uPaper;
  uniform vec2 uVideoFit;
  uniform vec4 uVideoRect;
  uniform float uVideoZoom;
  uniform float uTear;
  uniform float uGlitch;
  uniform float uGlow;
  uniform float uFog;
  uniform float uMixCode;
  uniform float uMixVideo;
  uniform float uOpacityCode;
  uniform float uOpacityVideo;
  uniform float uContent;
  uniform float uHueCode;
  uniform float uHueVideo;
  uniform float uGrain;
  uniform float uGrainPx;
  uniform float uCurve;
  uniform vec2 uCurveDir;
  uniform vec2 uSweep;
  uniform vec3 uGlowA;
  uniform vec3 uGlowB;
  uniform float uFlip;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uFogFade;
  uniform float uWire;
  uniform vec3 uWireColor;
  uniform vec3 uCodeBg;
  uniform float uTileScale;
  uniform vec2 uCentroidUv;
  uniform float uWindow;
  uniform float uTransStyle;
  uniform float uNoiseType;
  uniform float uEdgeFreq;
  uniform float uEdgeSpeed;
  uniform float uGlowWidth;

  __LIB__

  float edgeNoise(vec2 p) {
    if (uNoiseType < 0.5) return noise(p); // SMOOTH
    if (uNoiseType < 1.5) // FBM — layered turbulence
      return noise(p) * 0.55 + noise(p * 2.03) * 0.28 + noise(p * 4.09) * 0.17;
    if (uNoiseType < 2.5) { // RIDGED — sharp creases
      float f = noise(p) * 0.6 + noise(p * 2.7) * 0.4;
      return 1.0 - abs(2.0 * f - 1.0);
    }
    return hash(floor(p)); // BLOCKY — hard digital cells
  }

  void main() {
    float act = smoothstep(0.0, 0.02, uProgress)
              * (1.0 - smoothstep(0.985, 1.0, uProgress));

    // content orientation: optional 180\xb0 flip, and the back cap of the
    // slab un-mirrors itself so twisted-away tiles never read backwards
    vec2 tUv = mix(vUv, vec2(1.0) - vUv, uFlip);
    if (vCapZ < 0.0) tUv.x = 1.0 - tUv.x;

    // ---- transition field: signed distance d to the reveal boundary ----
    // sweep coordinate along an adjustable direction in face space
    float sx = 0.5 + (vUv.x - 0.5) * uSweep.x + (vUv.y - 0.5) * uSweep.y;
    float prog = uProgress * 1.24 - 0.12;
    float en = edgeNoise(vUv * uEdgeFreq + uSeed * 13.0
                         + vec2(0.0, uTime * uEdgeSpeed));
    float d;
    if (uTransStyle < 0.5) {
      // SWEEP — the classic scanline with a noisy edge
      d = sx - prog - (en - 0.5) * uTear * act;
    } else if (uTransStyle < 1.5) {
      // BURN — ragged directional edge, embers bleeding ahead of it
      d = sx - prog - (en - 0.5) * (uTear * 2.5 + 0.12) * act;
    } else if (uTransStyle < 2.5) {
      // DISSOLVE — the noise field itself is the reveal order
      d = en - (uProgress * 1.3 - 0.15);
    } else if (uTransStyle < 3.5) {
      // BLOCKS — mosaic cells reveal in shuffled order, lightly swept
      float cellH = hash(floor(vUv * uEdgeFreq) + uSeed);
      d = mix(cellH, sx, 0.35) - prog;
    } else if (uTransStyle < 4.5) {
      // SLICES — torn strips, rerolled over time for a glitchy rip
      float sliceH = hash(vec2(floor(vUv.y * uEdgeFreq),
                               uSeed + floor(uTime * uEdgeSpeed)));
      d = sx - prog - (sliceH - 0.5) * (uTear * 2.0 + 0.04) * act;
    } else {
      // IRIS — a circular wipe blooming from the face center
      d = length(vUv - 0.5) / 0.72 - uProgress * 1.1
        + (en - 0.5) * uTear * act;
    }

    float band = smoothstep(0.22, 0.0, d) * act;
    float row = floor(vUv.y * 28.0 + uSeed * 40.0);
    float jitter = (hash(vec2(row, floor(uTime * 22.0))) - 0.5)
                 * 0.09 * band * uGlitch;
    vec2 cuv = tUv + vec2(jitter, 0.0);
    vec3 code = texture2D(uCode, cuv).rgb;
    float split = 0.012 * band * uGlitch;
    code.r = texture2D(uCode, cuv + vec2(split, 0.0)).r;
    code.b = texture2D(uCode, cuv - vec2(split, 0.0)).b;

    float settle = 1.0 + 0.05 * (1.0 - uProgress);
    // tile-face uv → group uv (one video split across the tile group);
    // flip/unmirror act in group space so the video stays one coherent
    // picture across its span of tiles.
    // WINDOW mapping: GAP scales the mesh around its centroid, so
    // un-scale the uv the same way — every piece stays registered to
    // the group lattice. GLUED keeps pixels attached to the tile.
    vec2 luv = mix(vUv, uCentroidUv + (vUv - uCentroidUv) * uTileScale, uWindow);
    vec2 guv = uVideoRect.xy + luv * uVideoRect.zw;
    guv = mix(guv, vec2(1.0) - guv, uFlip);
    if (vCapZ < 0.0) guv.x = 1.0 - guv.x;
    vec2 vuv = (guv - 0.5) * uVideoFit * settle / uVideoZoom + 0.5;
    vec3 video = texture2D(uVideo, vuv).rgb;
    float develop = smoothstep(0.0, -0.18, d);
    video = mix(vec3(0.98, 0.97, 0.94), video, develop);

    float reveal = step(d, 0.0);
    vec3 content = mix(code, video, reveal);

    float gd = abs(d);
    // BURN bleeds extra glow into the unrevealed side, like embers
    if (uTransStyle > 0.5 && uTransStyle < 1.5 && d > 0.0) gd *= 0.55;
    float glowLine = exp(-gd * 60.0 / uGlowWidth) * act * uGlow;
    content = mix(content, uGlowA, min(glowLine * 0.85, 1.0));
    content += uGlowB * exp(-gd * 220.0 / uGlowWidth) * act * uGlow;

    vec3 nBase = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    vec2 cc = vUv - 0.5;
    vec3 bend = vec3(
      uCurveDir.x * cc.x + 0.3 * sin(cc.y * 4.2 + uSeed * 7.0),
      uCurveDir.y * cc.y + 0.3 * sin(cc.x * 3.6 + uSeed * 5.0),
      0.0
    ) * uCurve;
    vec3 n = normalize(nBase + bend);
    vec2 muv = matcapUV(n, viewDir);
    float fresnel = pow(1.0 - abs(dot(n, viewDir)), 2.5);

    vec3 mcC = hueShift(texture2D(uMatcapCode, muv).rgb, uHueCode);
    vec3 mcV = hueShift(texture2D(uMatcapVideo, muv).rgb, uHueVideo);
    vec3 shadedC = mcC * (0.8 + 0.7 * fresnel) * uMixCode;
    vec3 shadedV = mcV * (0.8 + 0.7 * fresnel) * uMixVideo;
    vec3 shaded = mix(shadedC, shadedV, reveal);

    vec3 lit = screenBlend(content * 0.92, shaded);
    vec3 col = mix(shaded, lit, uContent);

    float lumC = dot(mcC, vec3(0.299, 0.587, 0.114));
    float lumV = dot(mcV, vec3(0.299, 0.587, 0.114));
    float alphaC = clamp(uOpacityCode + fresnel * 0.5 + lumC * 0.35 * uMixCode, 0.0, 1.0);
    float alphaV = clamp(uOpacityVideo + fresnel * 0.35 + lumV * 0.2 * uMixVideo, 0.0, 1.0);
    float alpha = mix(alphaC, alphaV, reveal);

    // wireframe mode: ahead of the sweep the face empties out, leaving
    // the rim (edge material) and the typed code floating in wire color;
    // the video fills the tile solid behind the passing scanline
    if (uWire > 0.5) {
      float glyph = smoothstep(0.08, 0.32, distance(code, uCodeBg));
      vec3 wireCol = uWireColor * (glyph + fresnel * 0.25);
      float wireAlpha = clamp(glyph * uOpacityCode + fresnel * 0.12, 0.0, 1.0);
      wireCol = mix(wireCol, uGlowA, min(glowLine * 0.85, 1.0));
      wireCol += uGlowB * exp(-gd * 220.0 / uGlowWidth) * act * uGlow;
      wireAlpha = max(wireAlpha, min(glowLine, 1.0) * 0.9);
      col = mix(wireCol, col, reveal);
      alpha = mix(wireAlpha, alpha, reveal);
    }

    // static screen-locked grain — one film layer for the whole frame
    col += (hash(floor(gl_FragCoord.xy / max(uGrainPx, 1.0)) * 0.7) - 0.5) * uGrain;

    float fog = smoothstep(uFogNear, uFogFar, vDepth) * uFog;
    col = mix(col, uPaper, fog);
    alpha *= 1.0 - fog * uFogFade;

    gl_FragColor = vec4(col, alpha);
  }
`.replace('__LIB__', shaderLibrary),
  edgeShader = `
  uniform sampler2D uMatcapCode;
  uniform sampler2D uMatcapVideo;
  uniform vec3 uPaper;
  uniform float uFog;
  uniform float uTime;
  uniform float uMixCode;
  uniform float uMixVideo;
  uniform float uOpacityCode;
  uniform float uOpacityVideo;
  uniform float uHueCode;
  uniform float uHueVideo;
  uniform float uGrain;
  uniform float uGrainPx;
  uniform float uProgress;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uFogFade;
  uniform float uWire;
  uniform vec3 uWireColor;

  __LIB__

  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(vViewPos);
    vec2 muv = matcapUV(n, viewDir);
    float fresnel = pow(1.0 - abs(dot(n, viewDir)), 2.0);

    vec3 mcC = hueShift(texture2D(uMatcapCode, muv).rgb, uHueCode);
    vec3 mcV = hueShift(texture2D(uMatcapVideo, muv).rgb, uHueVideo);
    vec3 mc = mix(mcC, mcV, uProgress);
    float mixAmt = mix(uMixCode, uMixVideo, uProgress);
    vec3 col = mc * (0.7 + 0.9 * mixAmt) + mc * fresnel * 0.8;

    float mcLum = dot(mc, vec3(0.299, 0.587, 0.114));
    float opacity = mix(uOpacityCode, uOpacityVideo, uProgress);
    float alpha = clamp(opacity + 0.2 + fresnel * 0.4 + mcLum * 0.4, 0.0, 1.0);

    // wireframe mode: the rim IS the wireframe — solid wire color while
    // showing code, easing back to the glassy edge as the video arrives
    if (uWire > 0.5) {
      vec3 wc = uWireColor * (0.75 + fresnel * 0.6);
      float wa = clamp(0.85 + fresnel * 0.3, 0.0, 1.0);
      col = mix(wc, col, uProgress);
      alpha = mix(wa, alpha, uProgress);
    }

    // static screen-locked grain — one film layer for the whole frame
    col += (hash(floor(gl_FragCoord.xy / max(uGrainPx, 1.0)) * 0.7) - 0.5) * uGrain;

    float fog = smoothstep(uFogNear, uFogFar, vDepth) * uFog;
    col = mix(col, uPaper, fog);
    alpha *= 1.0 - fog * uFogFade;

    gl_FragColor = vec4(col, alpha);
  }
`.replace('__LIB__', shaderLibrary),
  videoSources = [
    'assets/hyperframes-landing/skills.mp4',
    'assets/hyperframes-landing/keyframes.mp4',
    'assets/hyperframes-landing/music-vid.mp4',
    'assets/hyperframes-landing/k3-promo.mp4',
    'assets/hyperframes-landing/hf-stripe.mp4',
    'assets/hyperframes-landing/video-agent.mp4',
    'assets/hyperframes-landing/media-use.mp4',
    'assets/hyperframes-landing/captions.mp4',
    'assets/hyperframes-landing/vfx.mp4',
    'assets/hyperframes-landing/hyperframes-launch.mp4',
  ],
  initialVideos = new Set([4, 5, 6, 7]),
  matcapSources = [
    'assets/hyperframes/matcap-1.webp',
    'assets/hyperframes/matcap-2.webp',
    'assets/hyperframes/matcap-3.webp',
    'assets/hyperframes/matcap-4.webp',
  ];
function createTriangle(size, rounding, flipped) {
  let height = (size * Math.sqrt(3)) / 2,
    geometry = new ExtrudeGeometry(
      (function roundedTriangle(size, rounding, flipped) {
        let height = (size * Math.sqrt(3)) / 2,
          radius = 0.12 * size * rounding,
          corners = flipped
            ? [
                {
                  x: -size / 2,
                  y: height,
                },
                {
                  x: 0,
                  y: 0,
                },
                {
                  x: size / 2,
                  y: height,
                },
              ]
            : [
                {
                  x: -size / 2,
                  y: 0,
                },
                {
                  x: size / 2,
                  y: 0,
                },
                {
                  x: 0,
                  y: height,
                },
              ],
          shape = new Shape(),
          incoming = [],
          outgoing = [];
        for (let e = 0; e < 3; e++) {
          let t = corners[e],
            i = corners[(e + 3 - 1) % 3],
            n = corners[(e + 1) % 3],
            s = {
              x: t.x - i.x,
              y: t.y - i.y,
            },
            h = {
              x: n.x - t.x,
              y: n.y - t.y,
            },
            c = Math.hypot(s.x, s.y),
            u = Math.hypot(h.x, h.y),
            d = Math.min(radius, 0.5 * c, 0.5 * u);
          incoming.push({
            x: t.x - (s.x / c) * d,
            y: t.y - (s.y / c) * d,
          });
          outgoing.push({
            x: t.x + (h.x / u) * d,
            y: t.y + (h.y / u) * d,
          });
        }
        shape.moveTo(incoming[0].x, incoming[0].y);
        for (let e = 0; e < 3; e++) {
          shape.quadraticCurveTo(corners[e].x, corners[e].y, outgoing[e].x, outgoing[e].y);
          let t = incoming[(e + 1) % 3];
          shape.lineTo(t.x, t.y);
        }
        shape.closePath();
        return shape;
      })(size, rounding, flipped),
      {
        depth: 0.09,
        bevelEnabled: true,
        bevelThickness: 0.0405,
        bevelSize: 0.03645,
        bevelSegments: 4,
        curveSegments: 24,
      },
    ),
    position = geometry.attributes.position,
    uv = geometry.attributes.uv;
  for (let t = 0; t < position.count; t++)
    uv.setXY(t, (position.getX(t) + size / 2) / size, position.getY(t) / height);
  uv.needsUpdate = true;
  geometry.translate(0, flipped ? (-2 * height) / 3 : -height / 3, -0.045);
  let creasedGeometry = (function creaseNormals(geometry, creaseAngle = Math.PI / 3) {
    let positions,
      flatGeometry = geometry.index ? geometry.toNonIndexed() : geometry,
      attribute = flatGeometry.attributes.position,
      vertexCount = attribute.count;
    if (true === attribute.isBufferAttribute && 3 === attribute.itemSize && false === attribute.normalized)
      positions = attribute.array;
    else {
      positions = new Float64Array(3 * vertexCount);
      for (let e = 0; e < vertexCount; e++) {
        positions[3 * e + 0] = attribute.getX(e);
        positions[3 * e + 1] = attribute.getY(e);
        positions[3 * e + 2] = attribute.getZ(e);
      }
    }
    let cosine = Math.cos(creaseAngle),
      quantization = (1 + 1e-10) * 100,
      faceCount = vertexCount / 3,
      faceNormals = new Float64Array(3 * faceCount);
    for (let e = 0; e < faceCount; e++) {
      let t = 9 * e,
        n = positions[t + 0],
        r = positions[t + 1],
        a = positions[t + 2],
        s = positions[t + 3],
        o = positions[t + 4],
        l = positions[t + 5],
        c = positions[t + 6],
        u = positions[t + 7],
        d = positions[t + 8],
        p = c - s,
        f = u - o,
        m = d - l,
        g = n - s,
        v = r - o,
        _ = a - l,
        x = f * _ - m * v,
        M = m * g - p * _,
        y = p * v - f * g,
        S = 1 / (Math.sqrt(x * x + M * M + y * y) || 1);
      faceNormals[3 * e + 0] = x * S;
      faceNormals[3 * e + 1] = M * S;
      faceNormals[3 * e + 2] = y * S;
    }
    let welded = new Int32Array(vertexCount),
      quantized = new Int32Array(3 * vertexCount),
      tableSize = 1;
    for (; tableSize < 2 * vertexCount; ) tableSize <<= 1;
    let mask = tableSize - 1,
      hashTable = new Int32Array(tableSize),
      uniqueCount = 0;
    for (let e = 0; e < vertexCount; e++) {
      let t = 3 * e,
        n = ~~(positions[t + 0] * quantization),
        r = ~~(positions[t + 1] * quantization),
        a = ~~(positions[t + 2] * quantization),
        s = (Math.imul(n, 0x466f45d) ^ Math.imul(r, 0x127409f) ^ Math.imul(a, 0x4f9ffb7)) & mask;
      for (;;) {
        let t = hashTable[s];
        if (0 === t) {
          let t = 3 * uniqueCount;
          quantized[t + 0] = n;
          quantized[t + 1] = r;
          quantized[t + 2] = a;
          hashTable[s] = uniqueCount + 1;
          welded[e] = uniqueCount++;
          break;
        }
        let i = 3 * (t - 1);
        if (quantized[i + 0] === n && quantized[i + 1] === r && quantized[i + 2] === a) {
          welded[e] = t - 1;
          break;
        }
        s = (s + 1) & mask;
      }
    }
    let adjacencyOffsets = new Int32Array(uniqueCount + 1);
    for (let e = 0; e < vertexCount; e++) adjacencyOffsets[welded[e] + 1]++;
    for (let e = 0; e < uniqueCount; e++) adjacencyOffsets[e + 1] += adjacencyOffsets[e];
    let adjacentFaces = new Int32Array(vertexCount),
      writeOffsets = adjacencyOffsets.slice(0, uniqueCount);
    for (let e = 0; e < faceCount; e++) {
      let t = 3 * e;
      adjacentFaces[writeOffsets[welded[t + 0]]++] = e;
      adjacentFaces[writeOffsets[welded[t + 1]]++] = e;
      adjacentFaces[writeOffsets[welded[t + 2]]++] = e;
    }
    let normals = new Float32Array(3 * vertexCount);
    for (let e = 0; e < faceCount; e++) {
      let t = 3 * e,
        i = faceNormals[t + 0],
        n = faceNormals[t + 1],
        r = faceNormals[t + 2];
      for (let e = 0; e < 3; e++) {
        let a = t + e,
          o = welded[a],
          l = 0,
          u = 0,
          d = 0;
        for (let e = adjacencyOffsets[o], t = adjacencyOffsets[o + 1]; e < t; e++) {
          let t = 3 * adjacentFaces[e],
            a = faceNormals[t + 0],
            o = faceNormals[t + 1],
            c = faceNormals[t + 2];
          if (i * a + n * o + r * c > cosine) {
            l += a;
            u += o;
            d += c;
          }
        }
        let p = 1 / (Math.sqrt(l * l + u * u + d * d) || 1);
        normals[3 * a + 0] = l * p;
        normals[3 * a + 1] = u * p;
        normals[3 * a + 2] = d * p;
      }
    }
    flatGeometry.setAttribute('normal', new Float32BufferAttribute(normals, 3, false));
    return flatGeometry;
  })(geometry, degToRad(35));
  if (creasedGeometry !== geometry) {
    geometry.dispose();
  }
  return {
    geometry: creasedGeometry,
    aspect: size / height,
  };
}
export function createRibbonField(canvas, onReady) {
  let resizeTimeout,
    disposed = false,
    frame = 0,
    visible = true,
    animated = !matchMedia('(prefers-reduced-motion: reduce)').matches,
    paperColor = new Color(settings.bgTone),
    wireColor = new Color(settings.wireColor),
    codeBackground = new Color('#0b0b0d'),
    seed = 7331,
    random = () => ((seed = (16807 * seed) % 0x7fffffff) - 1) / 0x7ffffffe,
    randomRange = (min, max) => min + random() * (max - min),
    renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0, 0);
  let scene = new Scene(),
    camera = new PerspectiveCamera(settings.fov, 1, 0.1, 90);
  camera.position.set(settings.camX, settings.camY, settings.camZ);
  let field = new Group();
  scene.add(field);
  let mobileCamera = {
      dirZ: 45,
      camY: -2.7,
      camZ: 20.5,
      fov: 57,
      tiltX: 0.069,
    },
    cameraSetting = (key) => (camera.aspect < 1.2 ? mobileCamera[key] : settings[key]);
  function resize() {
    let { w: width, h: height } = {
      w: canvas.clientWidth || window.innerWidth,
      h: canvas.clientHeight || window.innerHeight,
    };
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  resize();
  let contextLost = (event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    console.warn('[HyperFrames] WebGL context lost — ribbon stopped');
  };
  canvas.addEventListener('webglcontextlost', contextLost);
  let textureLoader = new TextureLoader(),
    matcaps = matcapSources.map((source) => {
      const texture = textureLoader.load(window.AtlasAssets.resolve(source));
      texture.colorSpace = SRGBColorSpace;
      return texture;
    }),
    playRetries = [],
    videos = videoSources.map((source, index) => {
      let video = document.createElement('video'),
        preload = animated || initialVideos.has(index),
        initial = initialVideos.has(index);
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      video.preload = preload ? (initial ? 'auto' : 'metadata') : 'none';
      if (preload) {
        video.src = window.AtlasAssets.resolve(source);
      }
      let start = () => {
        if (!(!animated || video.dataset.started)) {
          video.dataset.started = '1';
          video.preload = 'auto';
          if (visible) {
            video.play().catch(() => {
              if (disposed) return;
              let e = () => void (visible && !disposed && video.play());
              playRetries.push(e);
              window.addEventListener('pointerdown', e, {
                once: true,
              });
            });
          }
        }
      };
      if (initial) {
        start();
      }
      let texture = new VideoTexture(video);
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = 1006;
      return {
        texture: texture,
        video: video,
        start: start,
      };
    }),
    startTimers = [];
  if (animated) {
    let e = 0;
    for (let t = 0; t < videos.length; t++)
      if (!initialVideos.has(t)) {
        startTimers.push(setTimeout(() => videos[t].start(), 600 * ++e));
      }
  }
  let halfWidth = (depth) =>
      Math.tan(degToRad(camera.fov / 2)) * (cameraSetting('camZ') - depth) * camera.aspect,
    halfHeight = (depth) => Math.tan(degToRad(camera.fov / 2)) * (cameraSetting('camZ') - depth),
    tiles = [],
    fieldWidth = 1,
    groupCount = 1,
    travel = 0,
    upGeometry = null,
    downGeometry = null;
  function fitVideo(tile) {
    let video = tile.video;
    if (!video.videoWidth) return;
    let aspect = video.videoWidth / video.videoHeight,
      fit = tile.faceMaterial.uniforms.uVideoFit.value;
    aspect > tile.groupAspect ? fit.set(tile.groupAspect / aspect, 1) : fit.set(1, aspect / tile.groupAspect);
  }
  function clearTiles() {
    for (let tile of tiles) {
      field.remove(tile.mesh);
      tile.faceMaterial.uniforms.uCode.value.dispose();
      tile.faceMaterial.dispose();
      tile.edgeMaterial.dispose();
    }
    upGeometry?.dispose();
    downGeometry?.dispose();
    upGeometry = downGeometry = null;
    tiles = [];
  }
  function requiredColumns() {
    let size = settings.triSize,
      span =
        (2 * (halfWidth(settings.depth) + halfHeight(settings.depth))) / 2 +
        Math.max(halfWidth(settings.depth), halfHeight(settings.depth)) +
        3 * size +
        settings.overscan,
      groupSize = 2 * Math.max(1, Math.round(settings.videoSpan)),
      maxColumns = Math.floor((2 * Math.floor(400 / settings.rows)) / groupSize) * groupSize;
    return Math.min(
      Math.ceil(Math.ceil(span / (size / 2)) / groupSize) * groupSize,
      Math.max(maxColumns, groupSize),
    );
  }
  let builtColumns = 0;
  function buildTiles() {
    clearTiles();
    seed = 7331;
    travel = 0;
    builtColumns = requiredColumns();
    let size = settings.triSize,
      height = (size * Math.sqrt(3)) / 2,
      upTriangle = createTriangle(size, settings.cornerRound, false),
      downTriangle = createTriangle(size, settings.cornerRound, true);
    upGeometry = upTriangle.geometry;
    downGeometry = downTriangle.geometry;
    let aspect = upTriangle.aspect,
      columns = Math.ceil(
        ((2 * (halfWidth(settings.depth) + halfHeight(settings.depth))) / 2 +
          Math.max(halfWidth(settings.depth), halfHeight(settings.depth)) +
          3 * size +
          settings.overscan) /
          (size / 2),
      ),
      videoSpan = Math.max(1, Math.round(settings.videoSpan)),
      tilesPerVideo = 2 * videoSpan;
    fieldWidth =
      (size / 2) *
      (columns = Math.min(
        (columns = Math.ceil(columns / tilesPerVideo) * tilesPerVideo),
        Math.max(
          Math.floor((2 * Math.floor(400 / settings.rows)) / tilesPerVideo) * tilesPerVideo,
          tilesPerVideo,
        ),
      ));
    groupCount = columns / videoSpan;
    let groupAspect = ((size / 2) * (videoSpan + 1)) / (settings.rows * height);
    for (let row = 0; row < settings.rows; row++)
      for (let column = 0; column < columns; column++) {
        let flipped = (column + row) % 2 == 1,
          code = (function createCodeTexture(snippet, aspect, scale, random, paddingRatio = 0.2) {
            let resolution = 230 * clamp(scale, 1, 6),
              downscale = Math.min(1, 620 / resolution),
              height = Math.round(resolution * downscale),
              width = Math.round(height * aspect),
              canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let fontSize = Math.round(20.7 * settings.codeScale * downscale),
              lineHeight = Math.round(1.6 * fontSize),
              padding = Math.round(Math.min(width, height) * paddingRatio),
              texture = new CanvasTexture(canvas);
            texture.colorSpace = SRGBColorSpace;
            texture.generateMipmaps = false;
            texture.minFilter = 1006;
            let code = {
              context: canvas.getContext('2d'),
              texture: texture,
              snippet: snippet,
              width: width,
              height: height,
              fontSize: fontSize,
              lineHeight: lineHeight,
              padding: padding,
              gutter: padding + 2.2 * fontSize,
              visibleLines: Math.max(3, Math.floor((height - 2.4 * padding) / lineHeight)),
              totalChars: snippet.lines.reduce((e, t) => e + t.length + 1, 0),
              scroll: 0,
              speed: 7 + 5 * random(),
              nextDraw: 0,
            };
            drawCode(code, code.totalChars);
            return code;
          })(codeSnippets[Math.floor(random() * codeSnippets.length)], aspect, 0.72 * size, random),
          media = videos[Math.floor(column / videoSpan) % videos.length],
          videoRect = new Vector4(
            (column % videoSpan) / (videoSpan + 1),
            row / settings.rows,
            2 / (videoSpan + 1),
            1 / settings.rows,
          ),
          faceMaterial = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: faceShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
              uCode: {
                value: code.texture,
              },
              uVideo: {
                value: media.texture,
              },
              uMatcapCode: {
                value: matcaps[settings.codeMatcapIdx],
              },
              uMatcapVideo: {
                value: matcaps[settings.videoMatcapIdx],
              },
              uProgress: {
                value: 0,
              },
              uTime: {
                value: 0,
              },
              uSeed: {
                value: 10 * random(),
              },
              uPaper: {
                value: paperColor,
              },
              uVideoFit: {
                value: new Vector2(1, 1),
              },
              uVideoRect: {
                value: videoRect,
              },
              uVideoZoom: {
                value: settings.videoZoom,
              },
              uTear: {
                value: settings.tear,
              },
              uGlitch: {
                value: settings.glitch,
              },
              uGlow: {
                value: settings.glow,
              },
              uFog: {
                value: settings.fog,
              },
              uMixCode: {
                value: settings.codeMix,
              },
              uMixVideo: {
                value: settings.videoMix,
              },
              uOpacityCode: {
                value: settings.codeOpacity,
              },
              uOpacityVideo: {
                value: settings.videoOpacity,
              },
              uContent: {
                value: settings.content,
              },
              uHueCode: {
                value: settings.codeHue,
              },
              uHueVideo: {
                value: settings.videoHue,
              },
              uGrain: {
                value: settings.grain,
              },
              uGrainPx: {
                value: settings.grainPx,
              },
              uCurve: {
                value: settings.curve,
              },
              uCurveDir: {
                value: new Vector2(
                  randomRange(0.5, 1.4) * (0.5 > random() ? -1 : 1),
                  randomRange(0.4, 1.2) * (0.5 > random() ? -1 : 1),
                ),
              },
              uSweep: {
                value: new Vector2(0, 1),
              },
              uGlowA: {
                value: new Color('#ff4d00'),
              },
              uGlowB: {
                value: new Color('#ff7326'),
              },
              uFlip: {
                value: settings.contentFlip,
              },
              uFogNear: {
                value: settings.fogNear,
              },
              uFogFar: {
                value: settings.fogFar,
              },
              uFogFade: {
                value: settings.fogFade,
              },
              uWire: {
                value: settings.wire,
              },
              uWireColor: {
                value: wireColor,
              },
              uCodeBg: {
                value: codeBackground,
              },
              uTileScale: {
                value: 1 - settings.gap,
              },
              uCentroidUv: {
                value: new Vector2(0.5, flipped ? 2 / 3 : 1 / 3),
              },
              uWindow: {
                value: settings.windowMap,
              },
              uTransStyle: {
                value: settings.transStyle,
              },
              uNoiseType: {
                value: settings.noiseType,
              },
              uEdgeFreq: {
                value: settings.edgeFreq,
              },
              uEdgeSpeed: {
                value: settings.edgeSpeed,
              },
              uGlowWidth: {
                value: settings.glowWidth,
              },
            },
          }),
          edgeMaterial = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: edgeShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
              uMatcapCode: {
                value: matcaps[settings.codeMatcapIdx],
              },
              uMatcapVideo: {
                value: matcaps[settings.videoMatcapIdx],
              },
              uPaper: {
                value: paperColor,
              },
              uFog: {
                value: settings.fog,
              },
              uTime: {
                value: 0,
              },
              uProgress: {
                value: 0,
              },
              uMixCode: {
                value: settings.codeMix,
              },
              uMixVideo: {
                value: settings.videoMix,
              },
              uOpacityCode: {
                value: settings.codeOpacity,
              },
              uOpacityVideo: {
                value: settings.videoOpacity,
              },
              uHueCode: {
                value: settings.codeHue,
              },
              uHueVideo: {
                value: settings.videoHue,
              },
              uGrain: {
                value: settings.grain,
              },
              uGrainPx: {
                value: settings.grainPx,
              },
              uFogNear: {
                value: settings.fogNear,
              },
              uFogFar: {
                value: settings.fogFar,
              },
              uFogFade: {
                value: settings.fogFade,
              },
              uWire: {
                value: settings.wire,
              },
              uWireColor: {
                value: wireColor,
              },
            },
          }),
          mesh = new Mesh(flipped ? downGeometry : upGeometry, [faceMaterial, edgeMaterial]);
        field.add(mesh);
        tiles.push({
          mesh: mesh,
          faceMaterial: faceMaterial,
          edgeMaterial: edgeMaterial,
          video: media.video,
          aspect: aspect,
          groupAspect: groupAspect,
          code: code,
          typedCharacters: random() * code.totalChars,
          columnOffset: (size / 2) * column,
          group: Math.floor(column / videoSpan),
          rowOffset: row * height + (flipped ? (2 * height) / 3 : height / 3),
          flip: flipped,
          previousOffset: 0,
          scatterJitter: new Vector3(randomRange(-1, 1), randomRange(-1, 1), randomRange(-0.5, 0.5)),
          rotationJitter: {
            x: randomRange(-1, 1),
            y: randomRange(-1, 1),
            z: randomRange(-1, 1),
          },
          looseOrientation: new Quaternion(),
          formationJitter: randomRange(-1, 1),
        });
      }
    for (let tile of tiles) fitVideo(tile);
  }
  let pointer = {
      x: 0,
      y: 0,
    },
    pointerMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
  if (animated) {
    window.addEventListener('pointermove', pointerMove);
  }
  let tangent = new Vector3(),
    normalAxis = new Vector3(),
    surfaceNormal = new Vector3(),
    basis = new Matrix4(),
    orientation = new Quaternion(),
    travelAxis = new Vector3(),
    binormal = new Vector3(),
    acrossAxis = new Vector3(),
    euler = new Euler(),
    glowA = new Color(),
    glowB = new Color(),
    sweep = new Vector2(),
    easeInOutCubic = (e) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2),
    timer = new Timer(),
    ready = false,
    built = false;
  function render() {
    timer.update();
    let delta = animated ? Math.min(timer.getDelta(), 0.05) : 0,
      elapsed = timer.getElapsed();
    field.rotation.y = lerp(field.rotation.y, pointer.x * settings.tiltY, 0.045);
    field.rotation.x = lerp(field.rotation.x, -pointer.y * cameraSetting('tiltX'), 0.045);
    if (camera.fov !== cameraSetting('fov')) {
      camera.fov = cameraSetting('fov');
      camera.updateProjectionMatrix();
    }
    camera.position.x = lerp(camera.position.x, settings.camX + pointer.x * settings.camShift, 0.03);
    camera.position.y = lerp(
      camera.position.y,
      cameraSetting('camY') - pointer.y * settings.camShift * 0.55,
      0.03,
    );
    camera.position.z = cameraSetting('camZ');
    travel += settings.speed * delta;
    let heading = degToRad(settings.direction),
      depthAngle = degToRad(cameraSetting('dirZ'));
    travelAxis.set(
      Math.cos(heading) * Math.cos(depthAngle),
      Math.sin(heading) * Math.cos(depthAngle),
      Math.sin(depthAngle),
    );
    acrossAxis.set(-Math.sin(heading), Math.cos(heading), 0);
    binormal.crossVectors(travelAxis, acrossAxis).normalize();
    let twist = degToRad(settings.twist),
      twistPhase = degToRad(settings.twistDrift) * elapsed,
      triangleHeight = (settings.triSize * Math.sqrt(3)) / 2,
      bandHeight = settings.rows * triangleHeight,
      groupGap = settings.groupGap,
      period = fieldWidth + groupCount * groupGap,
      revealCenter = settings.revealPos * period,
      formationCenter = settings.formPos * period,
      tileScale = 1 - settings.gap;
    glowA.setHSL(settings.glowHue / 360, settings.glowSat, 0.55);
    glowB.setHSL(settings.glowHue / 360, 0.9 * settings.glowSat, 0.68);
    let sweepAngle = degToRad(settings.sweepDir);
    for (let t of (sweep.set(Math.cos(sweepAngle), Math.sin(sweepAngle)), tiles)) {
      let n = (t.columnOffset + t.group * groupGap + travel) % period;
      if (n < 0) {
        n += period;
      }
      if ((n -= period / 2) < t.previousOffset - period / 2) {
        t.typedCharacters = 0;
        t.code.scroll = 0;
      }
      t.previousOffset = n;
      let r = t.rowOffset - bandHeight / 2,
        a = n * twist + twistPhase,
        s = Math.cos(a),
        o = Math.sin(a),
        c = travelAxis.x * n + acrossAxis.x * r * s + binormal.x * r * o,
        f = travelAxis.y * n + acrossAxis.y * r * s + binormal.y * r * o,
        m = settings.depth + travelAxis.z * n + acrossAxis.z * r * s + binormal.z * r * o;
      tangent
        .set(
          travelAxis.x + twist * r * (-acrossAxis.x * o + binormal.x * s),
          travelAxis.y + twist * r * (-acrossAxis.y * o + binormal.y * s),
          travelAxis.z + twist * r * (-acrossAxis.z * o + binormal.z * s),
        )
        .normalize();
      normalAxis.set(
        acrossAxis.x * s + binormal.x * o,
        acrossAxis.y * s + binormal.y * o,
        acrossAxis.z * s + binormal.z * o,
      );
      surfaceNormal.crossVectors(tangent, normalAxis).normalize();
      normalAxis.crossVectors(surfaceNormal, tangent);
      basis.makeBasis(tangent, normalAxis, surfaceNormal);
      orientation.setFromRotationMatrix(basis);
      let g = 1;
      if (1 === settings.assemble) {
        let e = t.formationJitter * settings.formSpan * 0.25;
        g = easeInOutCubic(smoothstep(n, formationCenter - settings.formSpan + e, formationCenter + e));
      }
      if (g < 1) {
        t.looseOrientation.setFromEuler(
          euler.set(
            t.rotationJitter.x * settings.looseRot,
            t.rotationJitter.y * settings.looseRot,
            t.rotationJitter.z * settings.looseRot,
          ),
        );
        let e = settings.formGap * (1 - g);
        t.mesh.position.set(
          c - travelAxis.x * e + t.scatterJitter.x * settings.scatter * (1 - g),
          f - travelAxis.y * e + t.scatterJitter.y * settings.scatter * (1 - g),
          m - travelAxis.z * e + t.scatterJitter.z * settings.scatter * (1 - g),
        );
        t.mesh.quaternion.slerpQuaternions(t.looseOrientation, orientation, g);
      } else {
        t.mesh.position.set(c, f, m);
        t.mesh.quaternion.copy(orientation);
      }
      t.mesh.scale.setScalar(tileScale);
      let v = smoothstep(n, revealCenter - settings.revealSpan / 2, revealCenter + settings.revealSpan / 2);
      if (v < 0.05) {
        t.typedCharacters += delta * t.code.speed;
        if (t.typedCharacters > t.code.totalChars + 60) {
          t.typedCharacters = 0;
          t.code.scroll = 0;
        }
        if (elapsed >= t.code.nextDraw) {
          drawCode(t.code, t.typedCharacters);
          t.code.nextDraw = elapsed + 0.15;
        }
      }
      let x = t.faceMaterial.uniforms;
      x.uProgress.value = v;
      x.uTime.value = elapsed;
      x.uVideoZoom.value = settings.videoZoom;
      x.uTear.value = settings.tear;
      x.uGlitch.value = settings.glitch;
      x.uGlow.value = settings.glow;
      x.uFog.value = settings.fog;
      x.uMixCode.value = settings.codeMix;
      x.uMixVideo.value = settings.videoMix;
      x.uContent.value = settings.content;
      x.uHueCode.value = settings.codeHue;
      x.uHueVideo.value = settings.videoHue;
      x.uGrain.value = settings.grain;
      x.uGrainPx.value = settings.grainPx;
      x.uCurve.value = settings.curve;
      x.uFlip.value = settings.contentFlip;
      x.uFogNear.value = settings.fogNear;
      x.uFogFar.value = settings.fogFar;
      x.uFogFade.value = settings.fogFade;
      x.uWire.value = settings.wire;
      x.uTileScale.value = tileScale;
      x.uWindow.value = settings.windowMap;
      x.uTransStyle.value = settings.transStyle;
      x.uNoiseType.value = settings.noiseType;
      x.uEdgeFreq.value = settings.edgeFreq;
      x.uEdgeSpeed.value = settings.edgeSpeed;
      x.uGlowWidth.value = settings.glowWidth;
      x.uSweep.value.copy(sweep);
      x.uGlowA.value.copy(glowA);
      x.uGlowB.value.copy(glowB);
      let S = t.edgeMaterial.uniforms;
      S.uTime.value = elapsed;
      S.uProgress.value = v;
      S.uFog.value = settings.fog;
      S.uMixCode.value = settings.codeMix;
      S.uMixVideo.value = settings.videoMix;
      S.uHueCode.value = settings.codeHue;
      S.uHueVideo.value = settings.videoHue;
      S.uGrain.value = settings.grain;
      S.uGrainPx.value = settings.grainPx;
      S.uFogNear.value = settings.fogNear;
      S.uFogFar.value = settings.fogFar;
      S.uFogFade.value = settings.fogFade;
      S.uWire.value = settings.wire;
    }
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady?.();
    }
    if (animated && visible) {
      frame = requestAnimationFrame(render);
    }
  }
  let scroll = () => {
    let t = canvas.offsetHeight;
    for (let i = canvas; i; i = i.offsetParent) t += i.offsetTop;
    let i = scrollY < t;
    if (i !== visible && animated) {
      for (let { video: e } of ((visible = i), cancelAnimationFrame(frame), videos))
        if (e.dataset.started) {
          visible ? e.play().catch(() => {}) : e.pause();
        }
      if (visible && built) {
        frame = requestAnimationFrame(render);
      }
    }
  };
  window.addEventListener('scroll', scroll, {
    passive: true,
  });
  scroll();
  let resizeObserver = new ResizeObserver(() => {
    resize();
    if (built && requiredColumns() > builtColumns) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!disposed && requiredColumns() > builtColumns) {
          buildTiles();
        }
      }, 200);
    }
    if (!animated) {
      render();
    }
    scroll();
  });
  resizeObserver.observe(canvas);
  Promise.race([
    document.fonts
      .load('12px "TT Norms Pro Mono"')
      .then(() => document.fonts.load('italic 12px "TT Norms Pro Mono"'))
      .catch(() => {}),
    new Promise((e) => setTimeout(e, 1800)),
  ])
    .then(() => {
      if (!disposed) {
        built = true;
        buildTiles();
        render();
      }
    })
    .catch((e) => {
      console.error('[HyperFrames] ribbon field failed to build:', e);
    });
  let metadataListeners = videos.map(({ video: e }) => {
    let t = () => {
      for (let tile of tiles)
        if (tile.video === e) {
          fitVideo(tile);
        }
    };
    e.addEventListener('loadedmetadata', t);
    return {
      video: e,
      handler: t,
    };
  });
  return function () {
    for (let e of ((disposed = true),
    cancelAnimationFrame(frame),
    clearTimeout(resizeTimeout),
    startTimers.forEach(clearTimeout),
    resizeObserver.disconnect(),
    window.removeEventListener('scroll', scroll),
    window.removeEventListener('pointermove', pointerMove),
    playRetries))
      window.removeEventListener('pointerdown', e);
    for (let { video: e, handler: t } of (clearTiles(), metadataListeners))
      e.removeEventListener('loadedmetadata', t);
    for (let { texture: e, video: t } of videos) {
      e.dispose();
      t.pause();
      t.removeAttribute('src');
      t.load();
    }
    for (let e of matcaps) e.dispose();
    canvas.removeEventListener('webglcontextlost', contextLost);
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
