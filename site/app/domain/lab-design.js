export const schemes = {
  paper: {
    name: '纸页',
    palette: { bg: '#f7f7f5', ink: '#101010', accent: '#373737' },
    type: 'sans',
    layout: 'split',
    shape: 'soft',
    space: 32,
    graphic: 'line',
    hierarchy: 'clear',
    texture: 'flat',
    motion: true,
    description:
      '中性纸面、墨色信息与少量深灰强调，配合清楚的无衬线层级、细框和留白，表达安静阅读。',
  },
  friendly: {
    name: '亲和',
    palette: { bg: '#fefbff', ink: '#1c1b1d', accent: '#6442d6' },
    type: 'sans',
    layout: 'split',
    shape: 'round',
    space: 28,
    graphic: 'geometry',
    hierarchy: 'clear',
    texture: 'flat',
    motion: true,
    description:
      '柔白表面、深色正文与紫色行动，配合柔和图形和适中留白，让信息清楚、操作亲和。',
  },
  tool: {
    name: '工具',
    palette: { bg: '#f2efe6', ink: '#171717', accent: '#e3402e' },
    type: 'sans',
    layout: 'editorial',
    shape: 'sharp',
    space: 24,
    graphic: 'product',
    hierarchy: 'clear',
    texture: 'flat',
    motion: false,
    description:
      '纸白、炭黑与信号红，配合严格对齐、直线边界与紧凑间距，突出可扫描的工具信息。',
  },
};
export const fontNames = { serif: '衬线', sans: '无衬线', mono: '等宽' };
export const layoutNames = {
  split: '左文右图',
  center: '居中纵向',
  editorial: '左图右文',
};
export const shapeNames = {
  sharp: '直角 / 0px',
  soft: '小圆角 / 8px',
  round: '大圆角 / 24px',
};
export const graphicNames = { line: '线描', geometry: '几何', product: '产品' };
export const fontRules = {
  serif: {
    title: 'Georgia,"SimSun",serif',
    body: 'Arial,"Microsoft YaHei",sans-serif',
    weight: 500,
    track: '-1px',
  },
  sans: {
    title: '"Microsoft YaHei","Segoe UI",Arial,sans-serif',
    body: '"Microsoft YaHei","Segoe UI",Arial,sans-serif',
    weight: 650,
    track: '-.5px',
  },
  mono: {
    title: '"Courier New","Microsoft YaHei",monospace',
    body: '"Courier New","Microsoft YaHei",monospace',
    weight: 700,
    track: '-.8px',
  },
};
export const shapeRules = {
  sharp: { radius: 0, stroke: 1, cap: 'butt' },
  soft: { radius: 8, stroke: 1, cap: 'round' },
  round: { radius: 24, stroke: 1, cap: 'round' },
};
const rgb = (color) =>
  [1, 3, 5].map((start) => parseInt(color.slice(start, start + 2), 16));
const hex = (values) =>
  '#' +
  values
    .map((value) => Math.round(value).toString(16).padStart(2, '0'))
    .join('');
export const blend = (a, b, amount) =>
  hex(
    rgb(a).map((value, index) => value * (1 - amount) + rgb(b)[index] * amount),
  );
export function opaque(color, background) {
  return color.length === 9
    ? blend(background, color, parseInt(color.slice(7, 9), 16) / 255)
    : color;
}
export const luminance = (color) =>
  rgb(color)
    .map((value) => {
      const channel = value / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    })
    .reduce(
      (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
      0,
    );
export const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
export const bestText = (background) =>
  contrast(background, '#ffffff') > contrast(background, '#171717')
    ? '#ffffff'
    : '#171717';

export function referenceDesign(entry) {
  const palette = (entry.tokens?.palette || []).filter((color) =>
    /^#[0-9a-f]{6}$/i.test(color),
  );
  const bg = /^#[0-9a-f]{6}$/i.test(entry.background)
    ? entry.background.toLowerCase()
    : '#f4eee2';
  const readable = palette.filter((color) => contrast(color, bg) >= 4.5);
  const ink = (readable.length ? readable : ['#171717', '#fff1e8']).toSorted(
    (a, b) => contrast(b, bg) - contrast(a, bg),
  )[0];
  const accent = /^#[0-9a-f]{6}$/i.test(entry.accent)
    ? entry.accent
    : palette[2] || '#49654d';
  return {
    name: entry.title,
    palette: { bg, ink: ink.toLowerCase(), accent: accent.toLowerCase() },
    type: /retro-80s|pixel-world/.test(entry.id)
      ? 'mono'
      : /zelda-world|hand-drawn|isometric-3d/.test(entry.id)
        ? 'serif'
        : 'sans',
    layout: /apple-product|shape-morph/.test(entry.id)
      ? 'center'
      : /swiss-grid|line-art|persona-kinetic/.test(entry.id)
        ? 'editorial'
        : 'split',
    shape:
      /swiss-grid|bauhaus-geometry|line-art|persona-kinetic|retro-80s|pixel-world/.test(
        entry.id,
      )
        ? 'sharp'
        : entry.category === '产品'
          ? 'round'
          : 'soft',
    space: /apple-product|hand-drawn/.test(entry.id)
      ? 48
      : /retro-80s|pixel-world/.test(entry.id)
        ? 24
        : 32,
    graphic: /line-art|hand-drawn/.test(entry.id)
      ? 'line'
      : /swiss-grid|bauhaus-geometry|shape-morph/.test(entry.id)
        ? 'geometry'
        : 'product',
    hierarchy: 'clear',
    texture: /hand-drawn|zelda-world/.test(entry.id)
      ? 'grain'
      : entry.category === '产品'
        ? 'lift'
        : 'flat',
    motion: true,
  };
}

export function resolvedPalette(design, systemDark, canvas) {
  const bg = opaque(design.palette.bg, canvas);
  const palette = {
    bg,
    ink: opaque(design.palette.ink, bg),
    accent: opaque(design.palette.accent, bg),
  };
  const choice = design.themeChoice || 'reference';
  const dark = choice === 'system' ? systemDark : choice === 'dark';
  if (choice === 'reference' || dark === luminance(bg) < 0.25) return palette;
  return dark
    ? {
        bg: blend(bg, '#111713', 0.93),
        ink: blend(palette.ink, '#ffffff', 0.9),
        accent: blend(palette.accent, '#ffffff', 0.42),
      }
    : {
        bg: blend(bg, '#ffffff', 0.96),
        ink: blend(palette.ink, '#101b14', 0.94),
        accent: blend(palette.accent, '#101b14', 0.57),
      };
}

export function configuration(design, palette, reference, origins, systemDark) {
  return {
    version: 3,
    purpose: '同一虚构产品内容的设计元素教学实验，不是来源网站复刻',
    reference: reference
      ? {
          id: reference.id,
          title: reference.title,
          sources: reference.sources.map((source) => ({
            title: source.title,
            url: source.url,
          })),
        }
      : null,
    baseScheme: design.name,
    color: {
      background: palette.bg,
      text: palette.ink,
      accent: palette.accent,
      buttonText: bestText(palette.accent),
    },
    theme: {
      choice: design.themeChoice || 'reference',
      resolved: luminance(palette.bg) < 0.25 ? 'dark' : 'light',
      systemDark,
      sourceBehavior: reference?.themeBehavior || null,
      note: '教学迁移使用协调颜色角色，固定主题案例的真实demo不改色',
    },
    sound: {
      kind: 'none',
      control: '协调实验不播放音乐或操作音',
      interactionRole: '反馈由文字和微动效表达',
      sourceBehavior: reference?.soundBehavior || null,
    },
    typography: {
      choice: design.type,
      titleFont: fontRules[design.type].title,
      bodyFont: fontRules[design.type].body,
    },
    layout: { choice: design.layout, meaning: layoutNames[design.layout] },
    shape: {
      choice: design.shape,
      radiusPx: shapeRules[design.shape].radius,
      strokePx: shapeRules[design.shape].stroke,
      buttonRadiusPx: 8,
    },
    spacing: {
      basePx: design.space,
      note: '手机外边距上限28px，组间距离继续按所选尺度变化',
    },
    graphic: {
      choice: design.graphic,
      meaning: graphicNames[design.graphic],
      asset: '本地原创SVG，无外部素材',
    },
    hierarchy: design.hierarchy,
    texture: design.texture,
    motion: {
      type: 'micro-motion',
      enabled: design.motion,
      reducedMotionPreferred: matchMedia('(prefers-reduced-motion:reduce)')
        .matches,
      note: '仅协调实验的局部反馈；文字反馈始终存在',
    },
    elementOrigins: origins,
    constraints: [
      '内容先于装饰',
      '颜色角色一致',
      '自然滚动，手机重排，键盘焦点可见',
      '产品文案保持相同，图形呈现方式可单独切换',
    ],
  };
}
