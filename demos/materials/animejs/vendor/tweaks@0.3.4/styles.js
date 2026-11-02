/**
 * @param  {string} name
 * @param  {string} firstCol
 * @param  {string} secondCol
 * @param  {number} steps
 * @param  {number} start
 * @param  {number} end
 * @param  {number} [pow]
 * @return {string}
 */
function generateColorValues(name, firstCol, secondCol, steps, start, end, pow = 1) {
  let str = ``;
  for (let i = 0; i < steps; i++) {
    const linear = steps > 1 ? i / (steps - 1) : 0;
    const t = start + (1 - Math.pow(1 - linear, pow)) * (end - start);
    str += `--gui-${name}-${i + 1}: color-mix(in oklch, ${secondCol} ${t}%, ${firstCol});\n`;
  }
  return str;
}

/**
 * @param {string} gap
 * @param {number} count
 * @return {string}
 */
function generateWidthVars(gap, count) {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `--gui-width-${i}: calc(${i}lh + (var(${gap}) * ${i - 1}));\n`;
  }
  return str;
}

/**
 * @param {string} prefix
 * @param {string} prop
 * @param {number} count
 * @param {string} [extra]
 * @return {string}
 */
function generateSizeClasses(prefix, prop, count, extra) {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `.gui_root .${prefix}_${i} { ${extra || ''}${prop}: var(--gui-width-${i}); }\n`;
    str += `.gui_root.${prefix}_${i} { ${extra || ''}${prop}: calc(var(--gui-width-${i}) - var(--gui-root-padding) * 2); }\n`;
  }
  return str;
}

/**
 * @param {number} count
 * @return {string}
 */
/**
 * @param {number} count
 * @return {string}
 */
function generateGridColsClasses(count) {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `.gui_root .grid_cols_${i} { --gui-grid-cols: ${i}; }\n`;
  }
  return str;
}

/**
 * @param {string} side - 'top', 'right', 'bottom', or 'left'
 * @param {number} min
 * @param {number} max
 * @return {string}
 */
function generateMarginClasses(side, min, max) {
  let str = '';
  for (let i = min; i <= max; i++) {
    const v = i ? `calc(${i}px * var(--gui-scale))` : '0';
    str += `.gui_root.gui_panel.is_floating.is_anchored.margin_${side}_${i} { --gui-margin-${side}: ${v}; }\n`;
  }
  return str;
}

/**
 * @param  {number} count
 * @return {string}
 */
function generateFlexClasses(count) {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `.gui_root .flex_${i} { flex: none; width: calc(100% / ${count} * ${i}); }\n`;
  }
  return str;
}

/**
 * @param {number} maxDepth
 * @return {string}
 */
function generateFolderOffsets(maxDepth) {
  let str = '';
  let selector = '.gui_root';
  for (let i = 1; i <= maxDepth; i++) {
    selector += ' .folder_content';
    str += `${selector} { --gui-label-offset: calc(var(--gui-gap-x) * 2 * ${i}); }\n`;
  }
  return str;
}

/**
 * @param {number} maxDepth
 * @return {string}
 */
function generateTreeNodeOffsets(maxDepth) {
  let str = '.gui_root .tree_node > .folder_content { padding-left: calc(var(--gui-width-1) + var(--gui-gap-x)); }\n';
  let selector = '.gui_root';
  for (let i = 1; i <= maxDepth; i++) {
    selector += ' .tree_node > .folder_content';
    str += `${selector} { --gui-label-offset: calc(var(--gui-width-1) * ${i} + var(--gui-gap-x)); }\n`;
  }
  return str;
}

/** @type {Record<string, string>} */
export const colors = {
  // 'white': '#F6F4F2',
  'white': '#ffeedd',
  'black': '#252423',
  'red': '#FF4B4B',
  'corail': '#FF7D36',
  'orange': '#FFA828',
  'yellow': '#FFCC2A',
  'citrus': '#F9F640',
  'lime': '#B7FF54',
  'green': '#8DFF55',
  'turquoise': '#00FFAA',
  'cyan': '#26F2D5',
  'sky': '#05DBE9',
  'sega': '#33B3F1',
  'king': '#4D9CFF',
  'indigo': '#7C85FF',
  'lavender': '#A369FF',
  'purple': '#C06DDF',
  'magenta': '#E962BF',
  'pink': '#FF718B',
}

function generateColorVars() {
  let css = '', i = 1;
  for (const name in colors) css += `--gui-color-${i++}: ${colors[name]};\n`;
  return css;
}

function generateColorClasses() {
  let css = '', i = 1;
  for (const name in colors) {
    const hex = colors[name];
    css += `.gui_root .color_${name},\n`;
    css += `.gui_root .color_${i++} {\n`;
    css += `  --gui-color-fg: ${hex};\n`;
    css += `  --gui-color-bg: ${hex};\n`;
    css += `  --gui-folder-color: ${hex};\n`;
    css += ` }\n`;
  }
  return css;
}

const styles = document.createElement('style');
styles.setAttribute('id', 'gui_styles');
styles.textContent = /*css*/`

  :root { --gui-scale: 1; }

  /** Custom Properties */
  .gui_root {
    ${generateColorVars()}
    --gui-font-sans: system-ui, sans-serif;
    --gui-font-mono: monospace;
    --gui-font-size: calc(12px * var(--gui-scale));
    --gui-font-size-mono: calc(11px * var(--gui-scale));
    --gui-line-height: calc(21px * var(--gui-scale));
    --gui-fg: var(--gui-color-1);
    --gui-bg: var(--gui-color-2);
    --gui-color-fg: var(--gui-fg);
    --gui-color-bg: var(--gui-fg);
    --gui-contour-width: calc(1px * var(--gui-scale));
    --gui-gap-x: calc(2px * var(--gui-scale));
    --gui-gap-y: calc(2px * var(--gui-scale));
    --gui-border-radius: calc(3px * var(--gui-scale));
    --gui-root-padding: calc(6px * var(--gui-scale));
    --gui-panel-min-width: calc(14lh + (var(--gui-gap-x) * 13) + (var(--gui-root-padding) * 2));
    --gui-panel-min-height: calc(1lh + var(--gui-root-padding) * 2);
    --gui-panel-max-height: 100lvh;
    --gui-label-offset: 0px;
    --gui-label-width: var(--gui-width-7);
    --gui-input-padding: calc(6px * var(--gui-scale));
    ${generateWidthVars('--gui-gap-x', 20)}
  }

  .gui_root * {
    --gui-color-panel-header-fg: var(--gui-color-fg-1);
    --gui-color-panel-header-bg: var(--gui-color-bg-6);

    --gui-color-input-fg: var(--gui-color-fg-3);
    --gui-color-input-bg: var(--gui-color-bg-5);
    --gui-color-input-hover-fg: var(--gui-color-fg-1);
    --gui-color-input-hover-bg: var(--gui-color-bg-4);

    --gui-color-action-fg: var(--gui-color-fg-2);
    --gui-color-action-bg: var(--gui-color-bg-4);
    --gui-color-action-hover-fg: var(--gui-color-fg-1);
    --gui-color-action-hover-bg: var(--gui-color-bg-3);
    --gui-color-action-active-fg: var(--gui-color-fg-4);
    --gui-color-action-active-bg: var(--gui-color-bg-4);

    --gui-color-action-primary-fg: var(--gui-color-fg-2);
    --gui-color-action-primary-bg: var(--gui-color-bg-3);
    --gui-color-action-primary-hover-fg: var(--gui-color-fg-1);
    --gui-color-action-primary-hover-bg: var(--gui-color-bg-1);
    --gui-color-action-primary-active-fg: var(--gui-color-fg-1);
    --gui-color-action-primary-active-bg: var(--gui-color-fg-5);
    --gui-color-action-primary-active-hover-fg: var(--gui-color-fg-1);
    --gui-color-action-primary-active-hover-bg: var(--gui-color-fg-5);
    --gui-color-action-primary-active-focus-fg: var(--gui-color-fg-1);
    --gui-color-action-primary-active-focus-bg: var(--gui-color-fg-5);

    --gui-color-toggle-fg: var(--gui-color-bg-4);
    --gui-color-toggle-bg: var(--gui-color-fg-2);
    --gui-color-toggle-hover-fg: var(--gui-color-bg-3);
    --gui-color-toggle-hover-bg: var(--gui-color-fg-2);
    --gui-color-toggle-active-fg: var(--gui-color-fg-1);
    --gui-color-toggle-active-bg: var(--gui-color-bg-2);
    --gui-color-toggle-active-hover-fg: var(--gui-color-fg-1);
    --gui-color-toggle-active-hover-bg: var(--gui-color-bg-1);
    --gui-color-toggle-active-focus-fg: var(--gui-color-fg-1);
    --gui-color-toggle-active-focus-bg: var(--gui-color-bg-1);

    --gui-color-folder-fg: var(--gui-color-fg-3);
    --gui-color-folder-bg: var(--gui-color-bg-5);
    --gui-color-folder-hover-fg: var(--gui-color-fg-2);
    --gui-color-folder-hover-bg: var(--gui-color-bg-3);
    --gui-color-folder-active-fg: var(--gui-color-fg-1);
    --gui-color-folder-active-bg: var(--gui-color-bg-4);
    --gui-color-folder-active-hover-fg: var(--gui-color-fg-1);
    --gui-color-folder-active-hover-bg: var(--gui-color-bg-3);

    --gui-color-label-fg: var(--gui-color-fg-4);
    --gui-color-label-hover-fg: var(--gui-color-fg-1);
  }

  /** Color System */
  .gui_root, .gui_root * {
    ${generateColorValues('color-fg', 'var(--gui-color-fg)', 'var(--gui-bg)', 6, 0, 40, 1.5)}
    ${generateColorValues('color-bg', 'var(--gui-color-bg)', 'var(--gui-bg)', 6, 60, 100, 1.25)}
  }

  /** Global Reset */
  /** Ugly, and probably not the most performant css selector ever created, but it seems to work well to properly reset everything */
  .gui_root,
  .gui_root *:not(.html *):where(:not(svg):not(svg *)), /** Needed otherwise some SVG elements won't be rendered */
  .gui_root *:not(.html *)::before,
  .gui_root *:not(.html *)::after { all: revert }

  .gui_root,
  .gui_root *:not(.html *),
  .gui_root *:not(.html *)::before,
  .gui_root *:not(.html *)::after {
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0;
    font-variation-settings: normal;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    font-style: normal;
    font-stretch: 100%;
    direction: ltr;
    writing-mode: horizontal-tb;
    text-shadow: none;
    user-select: none;
    display: block;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border: none;
    margin: 0;
    padding: 0;
    font-size: var(--gui-font-size);
    line-height: var(--gui-line-height);
    font-family: var(--gui-font-sans);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    text-align: left;
    text-decoration: none;
    outline: none;
    inset: auto;
  }
  .gui_root *:not(.html *)::before,
  .gui_root *:not(.html *)::after {
    pointer-events: none;
    position: absolute;
    background-color: transparent;
  }
  .gui_root *::selection {
    background-color: var(--gui-color-fg);
    color: var(--gui-bg);
  }

  /** Layout */
  .gui_root.row,
  .gui_root.col,
  .gui_root .row,
  .gui_root .col {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .gui_root.row,
  .gui_root .row {
    flex-direction: row;
    min-height: 1lh;
    margin-bottom: var(--gui-gap-y);
    gap: var(--gui-gap-x);
    background-color: transparent;
  }
  .gui_root.col,
  .gui_root .col {
    flex-direction: column;
  }

  /** Popup */
  html:has(.gui_popup_window),
  .gui_popup_window {
    overflow: hidden;
    overscroll-behavior-y: none;
    background: var(--gui-bg);
  }
  .gui_popup_window {
    position: absolute;
    overflow-y: auto;
    width: calc(100%);
    height: calc(100%);
    top: 0;
    left: 0;
    padding: var(--gui-root-padding);
    margin: 0;
    overflow: auto;
    color: var(--gui-fg);
    background: var(--gui-bg);
  }
  .gui_popup_window .panel_content {
    padding-bottom: var(--gui-root-padding);
  }

  /** Base UI */
  .gui_root .label,
  .gui_root h2,
  .gui_root .ui_item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .gui_root .label {
    display: inline-flex;
    position: relative;
    color: var(--gui-color-label-fg);
    flex-shrink: 0;
    width: calc(var(--gui-label-width) - var(--gui-label-offset));
    padding-left: var(--gui-input-padding);
    background-color: transparent;
  }
  .gui_root .label:empty {
    display: none;
  }
  .gui_root .label:hover,
  .gui_root .label:has(~ *:hover) {
    color: var(--gui-color-label-hover-fg);
  }
  .gui_root .label[disabled] {
    pointer-events: none;
  }
  .gui_root .ui_item {
    color: var(--gui-color-input-fg);
    flex-shrink: 1;
    width: 100%;
    min-height: 1lh;
    border: calc(var(--gui-gap-y) * .5) calc(var(--gui-gap-x) * .5);
    border-radius: var(--gui-border-radius);
    padding-left: var(--gui-input-padding);
    padding-right: var(--gui-input-padding);
    background-color: var(--gui-color-input-bg);
  }
  .gui_root .ui_item:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 var(--gui-contour-width) var(--gui-color-fg-1);
  }
  .gui_root .ui_input {
    font-family: var(--gui-font-mono);
    font-size: var(--gui-font-size-mono);
  }
  .gui_root .ui_input:hover,
  .gui_root .ui_input:focus-visible,
  .gui_root .select_input_wrapper:hover .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .label:hover ~ .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .label:hover ~ .fieldset_input .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .label:hover ~ .select_input_wrapper .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .label:hover ~ .scrubber_slider.is_clamped .scrubber_slider_progress,
  .gui_root .width_label:hover ~ .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .width_label:hover ~ .fieldset_input .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .width_label:hover ~ .select_input_wrapper .ui_input:not(.is_active):not([disabled]):not([inert]),
  .gui_root .width_label:hover ~ .scrubber_slider.is_clamped .scrubber_slider_progress {
    color: var(--gui-color-input-hover-fg);
    background-color: var(--gui-color-input-hover-bg);
  }
  .gui_root [disabled] {
    pointer-events: none;
    --gui-color-input-fg: var(--gui-color-bg-4);
    --gui-color-input-bg: var(--gui-color-bg-6);
    --gui-color-action-fg: var(--gui-color-bg-4);
    --gui-color-action-bg: var(--gui-color-bg-6);
    --gui-color-action-primary-fg: var(--gui-color-bg-4);
    --gui-color-action-primary-bg: var(--gui-color-bg-6);
    --gui-color-label-fg: var(--gui-color-bg-4);
    --gui-color-toggle-fg: var(--gui-color-bg-5);
    --gui-color-toggle-bg: var(--gui-color-bg-4);
    --gui-color-toggle-active-fg: var(--gui-color-bg-3);
    --gui-color-toggle-active-bg: var(--gui-color-bg-5);
  }
  .gui_root [readonly] {
    pointer-events: none;
  }
  .gui_root .ui_input::placeholder {
    color: var(--gui-color-fg-5);
  }
  .gui_root div.ui_input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .gui_root .ui_action {
    color: var(--gui-color-action-fg);
    background-color: var(--gui-color-action-bg);
    font-family: var(--gui-font-sans);
  }
  .gui_root .ui_action:hover,
  .gui_root .ui_action:focus-visible,
  .gui_root .label:hover ~ .ui_action:not(.is_active):not([disabled]):not([inert]),
  .gui_root .label:hover ~ .fieldset_input .ui_action:not(.is_active):not([disabled]):not([inert]),
  .gui_root .width_label:hover ~ .ui_action:not(.is_active):not([disabled]):not([inert]),
  .gui_root .width_label:hover ~ .fieldset_input .ui_action:not(.is_active):not([disabled]):not([inert]) {
    color: var(--gui-color-action-hover-fg);
    background-color: var(--gui-color-action-hover-bg);
  }
  .gui_root .ui_button:not(:disabled):hover,
  .gui_root .ui_action:not(:disabled):hover {
    cursor: default;
  }
  .gui_root .ui_action:active {
    color: var(--gui-color-action-active-fg);
    background-color: var(--gui-color-action-active-bg);
  }
  .gui_root .ui_button {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: var(--gui-font-sans);
  }
  .gui_root .fieldset_input {
    display: flex;
    gap: var(--gui-gap-x);
  }

  /** Panel */
  .gui_root.gui_panel {
    overflow-y: auto;
    overscroll-behavior-y: none;
    width: 100%;
    color: var(--gui-color-fg);
    background-color: var(--gui-bg);
    border-radius: calc(var(--gui-border-radius) + var(--gui-root-padding));
  }
  .gui_root.gui_panel:not(:empty) {
    border: var(--gui-root-padding) solid var(--gui-bg);
  }
  .gui_root.gui_panel.is_floating {
    position: fixed;
    /*contain: layout style;*/
    z-index: 1000000;
    top: 0;
    right: 0;
    border-radius: calc(var(--gui-border-radius) + var(--gui-root-padding));
    /*background-clip: padding-box;*/
  }
  .gui_root.gui_panel.is_floating:not([class*="width_"]) {
    width: var(--gui-panel-min-width);
    min-width: var(--gui-panel-min-width);
  }
  .gui_root.gui_panel.is_floating:not([class*="height_"]) {
    min-height: var(--gui-panel-min-height);
  }
  .gui_root.gui_panel.is_floating:not([class*="height_"]):has(.panel_header),
  .gui_root.gui_panel.is_floating:not([class*="height_"]):has(.panel_footer) {
    min-height: calc(var(--gui-panel-min-height) + var(--gui-root-padding) + calc(1lh + (var(--gui-gap-y) * 1)));
  }
  .gui_root.gui_panel.is_floating:not([class*="height_"]):has(.panel_footer):has(.panel_header) {
    min-height: calc(var(--gui-panel-min-height) + var(--gui-root-padding) + calc(1lh + (var(--gui-gap-y) * 2)));
  }
  .gui_root.gui_panel.is_floating:not(:empty) {
    box-shadow: 0 0 0 var(--gui-contour-width) var(--gui-color-bg-4);
  }
  .gui_root.gui_panel.is_floating.top_left,
  .gui_root.gui_panel.is_floating.bottom_left { right: auto; left: 0; }
  .gui_root.gui_panel.is_floating.bottom_left,
  .gui_root.gui_panel.is_floating.bottom_right { top: auto; bottom: 0; }
  .gui_root.gui_panel.is_hidden {
    overflow: hidden;
    width: auto!important;
    height: auto!important;
    min-width: 0!important;
    min-height: 0!important;
    max-height: none!important;
  }
  .gui_root.gui_panel.is_hidden:not(:has(> :not(.gui_scroll_content:empty))) {
    border: 0!important;
  }
  .gui_root .gui_scroll_content {
    display: flex;
    flex-direction: column;
  }
 .gui_root .panel_bar {
    display: flex;
    justify-content: space-between;
    position: sticky;
    z-index: 10000;
    color: var(--gui-color-panel-header-fg);
    background: var(--gui-color-panel-header-bg);
    box-shadow: 0 0 0 var(--gui-gap-y) var(--gui-bg);
    border-radius: 0;
    box-shadow: 0 calc(var(--gui-root-padding) * 1) 0 0 var(--gui-bg), 0 calc(var(--gui-root-padding) * -1) 0 0 var(--gui-bg);
    margin-bottom: var(--gui-root-padding);
  }
  .gui_root .panel_header {
    top: 0px;
  }
  .gui_root .panel_footer {
    bottom: 0px;
    margin-top: calc(var(--gui-root-padding) - var(--gui-gap-y));
    margin-bottom: 0px;
  }
  .gui_root .panel_bar .ui_button {
    z-index: 1;
  }
  .gui_root .panel_title {
    position: absolute;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 var(--gui-width-2);
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: var(--gui-color-fg-4);
    touch-action: none;
    flex-shrink: 1;
    width: 100%;
    text-align: center;
    font-weight: 700;
  }
  .gui_root.gui_panel.is_floating:not(.is_hidden) .panel_title {
    width: 100%;
    cursor: grab;
  }
  .gui_root.gui_panel.is_floating .panel_title:active {
    cursor: grabbing;
  }
  .gui_root.gui_panel.is_floating.is_anchored {
    --gui-margin-top: 0;
    --gui-margin-right: 0;
    --gui-margin-bottom: 0;
    --gui-margin-left: 0;
    margin: var(--gui-margin-top) var(--gui-margin-right) var(--gui-margin-bottom) var(--gui-margin-left);
    max-height: 100%;
    overflow: auto;
  }
  .gui_root.gui_panel.is_floating.is_anchored .panel_title {
    cursor: default;
  }
  .gui_root.gui_panel.is_floating.is_anchored .panel_title:active {
    cursor: default;
  }

  /** Toggle Button / tabs */
  .gui_root .toggle_group {
    gap: var(--gui-gap-x);
    display: flex;
    flex-shrink: 0;
  }
  .gui_root .toggle_group .ui_button {
    display: flex;
  }
  .gui_root .toggle_button_input.is_active {
    color: var(--gui-color-toggle-active-fg);
    background-color: var(--gui-color-toggle-active-bg);
  }
  .gui_root .toggle_button_input.is_active:hover {
    color: var(--gui-color-toggle-active-hover-fg);
    background-color: var(--gui-color-toggle-active-hover-bg);
  }
  .gui_root .toggle_button_input.is_active:focus-visible {
    color: var(--gui-color-toggle-active-focus-fg);
    background-color: var(--gui-color-toggle-active-focus-bg);
    /*box-shadow: inset 0 0 0 var(--gui-contour-width) var(--gui-color-toggle-active-focus-bg), inset 0 0 0 calc(2px * var(--gui-scale)) var(--gui-color-toggle-active-focus-fg);*/
  }

  .gui_root .button_primary {
    color: var(--gui-color-action-primary-fg);
    background-color: var(--gui-color-action-primary-bg);
  }
  .gui_root .button_primary:hover {
    color: var(--gui-color-action-primary-hover-fg);
    background-color: var(--gui-color-action-primary-hover-bg);
  }
  .gui_root .button_primary:focus-visible {
    color: var(--gui-color-action-primary-hover-fg);
    background-color: var(--gui-color-action-primary-hover-bg);
  }
  .gui_root .button_primary.is_active {
    color: var(--gui-color-action-primary-active-fg);
    background-color: var(--gui-color-action-primary-active-bg);
  }
  .gui_root .button_primary.is_active:hover {
    color: var(--gui-color-action-primary-active-hover-fg);
    background-color: var(--gui-color-action-primary-active-hover-bg);
  }
  .gui_root .button_primary.is_active:focus-visible {
    color: var(--gui-color-action-primary-active-focus-fg);
    background-color: var(--gui-color-action-primary-active-focus-bg);
  }

  /** Folders */
  .gui_root .folder,
  .gui_root .header,
  .gui_root .header_row .toggle_button_input {
    font-weight: 700;
  }
  .gui_root .folder {
    background-color: var(--gui-bg);
  }
  /** Prevents folders from shrinking when their parent have width utility classes set (like width_6) and only resize the actual folder button */
  .gui_root .folder.ui_heading,
  .gui_root .folder.ui_heading .header_row {
    width: 100%;
  }
  .gui_root .folder::before {
    content: "";
    z-index: 21; /* Sticky row have zIndex set to 20, this must be on top */
    top: 1lh;
    left: 0;
    bottom: var(--gui-gap-y);
    border-right: var(--gui-gap-x) solid var(--gui-color-folder-active-bg);
  }
  .gui_root .folder:has(> .header_row > h2)::before {
    display: none;
  }
  .gui_root .tree_node.folder::before {
    z-index: 20; /* Tree nodes lines must be go bellow the buttons */
    left: calc(.5lh - var(--gui-contour-width));
    border-right: var(--gui-contour-width) solid var(--gui-color-folder-active-bg);
  }
  .gui_root .tree_node > .header_row {
    position: sticky;
    z-index: 99999999;
    top: calc(1lh + var(--gui-root-padding));
    background-color: var(--gui-bg);
    box-shadow: 0 calc(var(--gui-gap-y) * -1) 0 0 var(--gui-bg), 0 calc(var(--gui-gap-y) * 1) 0 0 var(--gui-bg);
  }
  .gui_root > .folder::before,
  .gui_root > .panel_content > .folder:last-child::before {
    border-bottom-left-radius: var(--gui-border-radius);
  }
  .gui_root .folder:has( > .header_row:hover)::before {
    border-color: var(--gui-color-folder-active-hover-bg);
  }
  .gui_root .folder:has( > .header_row .ui_button:first-child:focus-visible)::before {
    border-color: var(--gui-color-folder-active-hover-fg);
  }
  .gui_root .folder > .folder_content {
    --gui-color-fg: var(--gui-fg);
    --gui-color-bg: var(--gui-fg);
    overflow: visible;
    padding-left: calc(var(--gui-gap-x) * 2);
  }
  :where(.gui_root .folder_content) > .folder {
    --gui-color-fg: var(--gui-folder-color, var(--gui-fg));
    --gui-color-bg: var(--gui-folder-color, var(--gui-fg));
  }
  ${generateFolderOffsets(10)}
  ${generateTreeNodeOffsets(10)}
  .gui_root .folder:has(> .header_row > h2) > .folder_content {
    --gui-label-offset: 0px;
    padding-left: 0;
  }
  .gui_root .header_row > .toggle_group {
    display: contents;
  }
  .gui_root .tabs_row {
    gap: 0;
  }
  .gui_root .header_row > .toggle_button_input:first-child .icon:last-child {
    position: absolute;
    top: 0;
    right: 0;
  }
  /* :first-child makes sure to only target the toggle button used as folder */
  .gui_root .header_row > .toggle_button_input:first-child {
    color: var(--gui-color-folder-fg);
    background-color: var(--gui-color-folder-bg);
    justify-content: flex-start;
  }
  .gui_root .header_row > .toggle_button_input:first-child.is_active {
    color: var(--gui-color-folder-active-fg);
    background-color: var(--gui-color-folder-active-bg);
  }
  .gui_root .header_row:not(.tree_node) > .toggle_button_input:first-child.is_active {
    border-bottom-left-radius: 0;
  }
  .gui_root .header_row > .toggle_button_input:first-child:hover,
  .gui_root .header_row > .toggle_button_input:first-child:focus-visible {
    color: var(--gui-color-folder-hover-fg);
    background-color: var(--gui-color-folder-hover-bg);
  }
  .gui_root .header_row > .toggle_button_input.is_active:first-child:hover,
  .gui_root .header_row > .toggle_button_input.is_active:first-child:focus-visible {
    color: var(--gui-color-folder-active-hover-fg);
    background-color: var(--gui-color-folder-active-hover-bg);
  }
  .gui_root .header_row h2.header {
    background-color: transparent;
    color: var(--gui-color-bg-1);
  }
  /** Tree-style folder */
  .gui_root .header_row > .toggle_button_input.tree_node,
  .gui_root .header_row > .toggle_button_input.tree_node.is_active {
    background-color: transparent;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding-left: 0;
    gap: calc(var(--gui-input-padding) + var(--gui-gap-x));
  }
  .gui_root .header_row > .toggle_button_input.tree_node:first-child .icon:last-child {
    position: relative;
  }

  /** Range */
  .gui_root .range_input {
    --pad: .125rem;
    --thumb-width: calc(2px * var(--gui-scale));
    --thumb-height: var(--gui-width-1);
    appearance: none;
    padding: 0 var(--pad);
  }
  .gui_root .range_input.height_2 { --thumb-height: var(--gui-width-2); }
  .gui_root .range_input.height_3 { --thumb-height: var(--gui-width-3); }
  .gui_root .range_input + .number_input {
    min-width: var(--gui-width-3);
  }
  .gui_root .number_row .range_input,
  .gui_root .slider_row .range_input {
    width: 200%;
  }
  .gui_root .range_input:not(:disabled):hover {
    cursor: pointer;
  }
  .gui_root .range_input:not(:disabled):active {
    cursor: grabbing;
  }
  .gui_root .range_input:hover,
  .gui_root .range_input:focus-visible {
    --marker: linear-gradient(var(--gui-color-fg-5), var(--gui-color-fg-5));
    background-image: var(--marker), var(--marker), var(--marker);
    background-size: var(--gui-contour-width) calc(var(--thumb-width) * 3);
    background-position: 25% center, center center, 75% center;
    background-repeat: no-repeat;
    background-origin: content-box;
  }
  .gui_root .range_input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border-radius: var(--gui-contour-width);
    background-color: currentColor;
  }
  .gui_root .range_input::-webkit-slider-thumb:active {
    cursor: grabbing;
  }
  .gui_root .range_input::-moz-range-thumb {
    border: none;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border-radius: var(--gui-contour-width);
    background-color: currentColor;
  }
  .gui_root .range_input::-moz-range-thumb:active {
    cursor: grabbing;
  }

  /** Range Slider */
  .gui_root .scrubber_slider {
    --gui-color-fg: var(--gui-color-1);
    --gui-color-bg: var(--gui-color-1);
    --thumb-offset: calc(3px * var(--gui-scale)); /* 2px pad + 1px (half of 2px main thumb) */
    position: relative;
    width: 100%;
    height: 1lh;
  }
  .gui_root .scrubber_slider,
  .gui_root .scrubber_slider[disabled],
  .gui_root .scrubber_slider[disabled]:hover {
    background-color: transparent;
  }
  .gui_root .scrubber_slider:hover {
    background-color: var(--gui-color-bg-4);
  }
  .gui_root .scrubber_slider.is_clamped:hover {
    background-color: transparent;
  }
  .gui_root .scrubber_slider_progress,
  .gui_root .scrubber_slider_clamp {
    pointer-events: none;
    position: absolute;
    top: 0;
    height: 1lh;
    left: calc(var(--thumb-offset) * (1 - var(--clamp-left, 0) / 50) + var(--clamp-left, 0) * 1%);
    right: calc(var(--thumb-offset) * (1 - var(--clamp-right, 0) / 50) + var(--clamp-right, 0) * 1%);
    scale: 0;
  }
  .gui_root .scrubber_slider.is_clamped .scrubber_slider_progress,
  .gui_root .scrubber_slider.is_clamped .scrubber_slider_clamp {
    scale: 1;
  }
  .gui_root .scrubber_slider_progress {
    z-index: 0;
    background-color: var(--gui-color-bg-5);
    box-shadow: calc(-2px * var(--gui-scale)) 0 0 0 var(--gui-color-bg-5), calc(2px * var(--gui-scale)) 0 0 0 var(--gui-color-bg-5);
    border-top: var(--gui-contour-width) solid var(--gui-color-bg-4);
    border-bottom: var(--gui-contour-width) solid var(--gui-color-bg-4);
  }
  .gui_root .scrubber_slider.is_clamped:hover .scrubber_slider_progress {
    background-color: var(--gui-color-bg-4);
    box-shadow: calc(-2px * var(--gui-scale)) 0 0 0 var(--gui-color-bg-4), calc(2px * var(--gui-scale)) 0 0 0 var(--gui-color-bg-4);
  }
  .gui_root .scrubber_slider.is_clamped:has(.range_input:nth-of-type(1):focus-visible) .scrubber_slider_progress {
    border-top: var(--gui-contour-width) solid var(--gui-color-fg-6);
    border-bottom: var(--gui-contour-width) solid var(--gui-color-fg-6);
  }
  .gui_root .scrubber_slider_clamp {
    z-index: 3;
  }
  .gui_root .scrubber_slider_clamp::before,
  .gui_root .scrubber_slider_clamp::after {
    content: "";
    top: 0;
    height: 1lh;
    width: calc(3px * var(--gui-scale));
    border: var(--gui-contour-width) solid var(--gui-color-fg-4);
  }
  .gui_root .scrubber_slider_clamp::before {
    border-radius: var(--gui-border-radius) 0 0 var(--gui-border-radius);
    right: 100%;
    border-right: none;
    border-left-width: calc(2px * var(--gui-scale));
  }
  .gui_root .scrubber_slider_clamp::after {
    border-radius: 0 var(--gui-border-radius) var(--gui-border-radius) 0;
    left: 100%;
    border-left: none;
    border-right-width: calc(2px * var(--gui-scale));
  }
  .gui_root .scrubber_tooltip {
   position: fixed;
   z-index: 99999999;
   left: 0;
   top: calc(var(--gui-gap-y) * -1);
   transform: translate(-50%, -100%);
   font-family: var(--gui-font-mono);
   font-size: var(--gui-font-size-mono);
   padding: 0 var(--gui-input-padding);
   border-radius: var(--gui-border-radius);
   pointer-events: none;
   opacity: 0;
   white-space: nowrap;
  }
  .gui_root .scrubber_tooltip.is_scrubbing {
    opacity: 1;
  }
  .gui_root .scrubber_slider_row .number_input {
    width: 50%;
  }
  .gui_root .scrubber_slider .range_input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--gui-color-bg-5);
  }
  .gui_root .scrubber_slider .range_input[disabled] {
    --gui-color-bg-1: var(--gui-color-bg-4);
    --gui-color-bg-3: var(--gui-color-bg-4);
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1) {
    z-index: 1;
    background-repeat: repeat-x;
    background-origin: content-box;
    background-color: transparent;
    backface-visibility: hidden;
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1)::-webkit-slider-thumb {
    height: calc(var(--gui-width-1) - 4px * var(--gui-scale));
    background-color: var(--gui-color-3);
  }
  .gui_root .scrubber_slider .range_input[disabled]:nth-of-type(1)::-webkit-slider-thumb {
    background-color: var(--gui-color-bg-2);
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1)::-moz-range-thumb {
    height: calc(var(--gui-width-1) - 4px * var(--gui-scale));
    background-color: var(--gui-color-3);
  }
  .gui_root .scrubber_slider .range_input[disabled]:nth-of-type(1)::-moz-range-thumb {
    background-color: var(--gui-color-bg-2);
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(2),
  .gui_root .scrubber_slider .range_input:nth-of-type(3) {
    pointer-events: none;
    z-index: 3;
    background: none;
    width: calc(100% + 4px * var(--gui-scale));
    left: calc(-2px * var(--gui-scale));
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1):focus-visible,
  .gui_root .scrubber_slider .range_input:nth-of-type(2):focus-visible,
  .gui_root .scrubber_slider .range_input:nth-of-type(3):focus-visible {
    box-shadow: none;
  }
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(2):hover) .scrubber_slider_clamp::before,
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(2):focus-visible) .scrubber_slider_clamp::before {
    border-color: var(--gui-color-action-hover-fg);
  }
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(3):hover) .scrubber_slider_clamp::after,
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(3):focus-visible) .scrubber_slider_clamp::after {
    border-color: var(--gui-color-action-hover-fg);
  }
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(2):focus-visible) .scrubber_slider_progress,
  .gui_root .scrubber_slider:has(.range_input:nth-of-type(3):focus-visible) .scrubber_slider_progress {
    background-color: var(--gui-color-bg-5);
  }
  .gui_root .scrubber_slider:not(.is_clamped) .range_input:nth-of-type(1):focus-visible {
    background-color: var(--gui-color-bg-5);
  }
  .gui_root .scrubber_slider.is_clamped:focus-visible {
    box-shadow: none;
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1):focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 var(--gui-contour-width) var(--gui-bg), 0 0 0 calc(2px * var(--gui-scale)) var(--gui-fg);
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(2):not([readonly])::-webkit-slider-thumb,
  .gui_root .scrubber_slider .range_input:nth-of-type(3):not([readonly])::-webkit-slider-thumb {
    pointer-events: all;
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(2)::-webkit-slider-thumb,
  .gui_root .scrubber_slider .range_input:nth-of-type(3)::-webkit-slider-thumb {
    height: 1lh;
    width: calc(8px * var(--gui-scale));
    background-color: transparent;
    cursor: col-resize;
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(1):focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 var(--gui-contour-width) var(--gui-bg), 0 0 0 calc(2px * var(--gui-scale)) var(--gui-fg);
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(2):not([readonly])::-moz-range-thumb,
  .gui_root .scrubber_slider .range_input:nth-of-type(3):not([readonly])::-moz-range-thumb {
    pointer-events: all;
  }
  .gui_root .scrubber_slider .range_input:nth-of-type(2)::-moz-range-thumb,
  .gui_root .scrubber_slider .range_input:nth-of-type(3)::-moz-range-thumb {
    height: 1lh;
    width: calc(8px * var(--gui-scale));
    background-color: transparent;
    cursor: col-resize;
  }

  /** Checkbox */
  .gui_root .checkbox_input {
    appearance: none;
    flex: none;
    width: 1lh;
  }
  .gui_root .checkbox_input:checked::after {
    content: "";
    top: calc(50% - var(--gui-contour-width));
    left: 50%;
    height: .4lh;
    width: .2lh;
    color: inherit;
    border-bottom: calc(2px * var(--gui-scale)) solid currentColor;
    border-right: calc(2px * var(--gui-scale)) solid currentColor;
    background-color: transparent;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  /** Select */
  .gui_root .select_input_wrapper {
    padding: 0;
    width: 100%;
  }
  .gui_root .select_input_wrapper .icon {
    position: absolute;
    top: 0;
    right: 0;
  }
  .gui_root .select_input {
    appearance: none;
    width: 100%;
    padding-left: var(--gui-input-padding);
    padding-right: 1lh;
  }

  /** Color */
  .gui_root .color_input {
    --color: #000;
    --alpha: 1;
    flex: none;
    width: 1lh;
    height: 1lh;
    padding: 0;
  }
  .gui_root .color_input::before,
  .gui_root .color_input::after {
    content: "";
    inset: 0;
    border-radius: var(--gui-border-radius);
  }
  .gui_root .color_input::before {
    background-color: #000;
  }
  .gui_root .color_input::after {
    opacity: var(--alpha);
    background-color: var(--color);
  }
  .gui_root .color_input:hover::after,
  .gui_root .color_input:focus-visible::after,
  .gui_root .color_input:hover::before,
  .gui_root .color_input:focus-visible::before {
    content: "";
    box-shadow: inset 0 0 0 var(--gui-contour-width) var(--gui-color-input-hover-fg), inset 0 0 0 calc(var(--gui-contour-width) * 2) var(--gui-bg);
  }

  /** Plot Line */
  .gui_root .plot_line_canvas {
    flex: 2.5;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  .gui_root .plot_line_canvas > svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .gui_root .plot_line_canvas path {
    fill: none;
    vector-effect: non-scaling-stroke;
  }

  /** Point2D */
  .gui_root .point2d_area {
    overflow: visible;
    flex: 1;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  /** Shared height from --gui-rows */
  .gui_root .plot_line_canvas,
  .gui_root .point2d_area {
    height: calc(var(--gui-rows) * (1lh + var(--gui-gap-y)) - var(--gui-gap-y));
  }
  .gui_root .plot_line_canvas path {
    stroke: currentColor;
  }
  .gui_root .grid_square {
    background-image:
      linear-gradient(to right, var(--gui-color-bg-4) var(--gui-contour-width), transparent var(--gui-contour-width)),
      linear-gradient(to bottom, var(--gui-color-bg-4) var(--gui-contour-width), transparent var(--gui-contour-width));
    background-size: calc((100% + var(--gui-contour-width)) / var(--gui-grid-cols)) calc((100% + var(--gui-contour-width)) / var(--gui-rows));
    background-position: calc(var(--gui-contour-width) * -1) calc(var(--gui-contour-width) * -1);
  }
  .gui_root .grid_dot {
    background-image: radial-gradient(circle, var(--gui-color-bg-2) var(--gui-contour-width), transparent var(--gui-contour-width));
    background-size: calc((100% + 20px + 2px * var(--gui-scale)) / var(--gui-grid-cols)) calc((100% + 2px * var(--gui-scale)) / var(--gui-rows));
    background-position: calc(-50% - 20px - 2px * var(--gui-scale)) calc(-.5lh - 2px * var(--gui-scale));
  }
  .gui_root .point2d_area > .plot_line_canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
  }
  .gui_root .point2d_point {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: calc(24px * var(--gui-scale));
    height: calc(24px * var(--gui-scale));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    touch-action: none;
  }
  .gui_root .point2d_point::after {
    content: "";
    display: block;
    z-index: 1;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--gui-color-input-fg);
  }
  .gui_root .point2d_point:active {
    cursor: grabbing;
  }
  .gui_root .point2d_point:hover::after,
  .gui_root .point2d_point:focus-visible::after {
    background-color: var(--gui-color-input-hover-fg);
  }
  .gui_root .point2d_point:focus-visible::after {
    box-shadow: 0 0 0 var(--gui-contour-width) var(--gui-bg), 0 0 0 calc(var(--gui-contour-width) * 2) var(--gui-fg);
  }

  /** Monitor */
  .gui_root .monitor {
    display: flex;
    gap: var(--gui-gap-x);
    flex: 1;
    width: 100%;
  }
  .gui_root .monitor .label,
  .gui_root .monitor .ui_input {
    position: absolute;
    z-index: 1;
    top: 0;
    width: auto;
    min-width: 0;
    padding: 0 var(--gui-input-padding);
    border-radius: 0;
    background-color: transparent;
  }
  .gui_root .monitor .label {
    z-index: 2;
    left: 0;
  }
  .gui_root .monitor .ui_input {
    right: 0;
    text-align: right;
  }

  /** Utilities */
  .gui_root .abs { position: absolute; }
  .gui_root .rel { position: relative; }
  .gui_root .abs_left,
  .gui_root .abs_right,
  .gui_root .abs_bottom,
  .gui_root .abs_center {
    position: absolute;
    z-index: 1;
  }
  .gui_root .abs_left { left: 0; }
  .gui_root .abs_right { right: 0; text-align: right; }
  .gui_root .abs_bottom { bottom: 0; }
  .gui_root .abs_top { top: 0; }
  .gui_root .abs_center {
    left: 50%;
    translate: -50% 0;
  }
  .gui_root .sticky_top,
  .gui_root .sticky_bottom {
    position: sticky;
    z-index: 20;
    background: var(--gui-bg);
  }
  .gui_root .sticky_top {
    top: calc(var(--gui-width-1) + var(--gui-gap-y) * 3);
    box-shadow: 0 calc(var(--gui-gap-y) * -1) 0 0 var(--gui-bg), 0 calc(var(--gui-gap-y) * 1) 0 0 var(--gui-bg);
  }
  .gui_root .sticky_bottom {
    bottom: var(--gui-gap-y);
    box-shadow: 0 calc(var(--gui-gap-y) * -1) 0 0 var(--gui-bg), 0 calc(var(--gui-gap-y) * 2) 0 0 var(--gui-bg);
  }
  .gui_root .padded {
    padding-left: var(--gui-input-padding);
    padding-right: var(--gui-input-padding);
  }
  .gui_root .padded_left {
    padding-left: var(--gui-input-padding);
    padding-right: 0;
  }
  .gui_root .padded_right {
    padding-left: 0;
    padding-right: var(--gui-input-padding);
  }
  .gui_root .padded_none {
    padding-left: 0;
    padding-right: 0;
  }
  .gui_root .padded_slider {
    padding-left: calc(var(--gui-contour-width) + var(--gui-gap-x));
    padding-right: calc(var(--gui-contour-width) + var(--gui-gap-x));
  }
  .gui_root .padded_small {
    padding-left: var(--gui-contour-width);
    padding-right: var(--gui-contour-width);
  }
  .gui_root .gap_x { gap: var(--gui-gap-x); }
  .gui_root .gap_y { gap: var(--gui-gap-y); }

  /** Text */
  .gui_root .font_bold { font-weight: bold; }
  .gui_root .font_mono { font-family: var(--gui-font-mono); font-size: var(--gui-font-size-mono); }
  .gui_root .font_sans { font-family: var(--gui-font-sans); }
  .gui_root .align_left { justify-content: flex-start; text-align: left; }
  .gui_root .align_right { justify-content: flex-end; text-align: right; }
  .gui_root .align_center { justify-content: center; text-align: center; }

  /** Display */
  .gui_root .display_block  { display: block; }
  .gui_root .display_none   { display: none; }
  .gui_root .display_flex   { display: flex; }
  .gui_root .align_center   { align-items: center; }
  .gui_root .justif_center  { justify-content: center; }

  /** SVGs widths */
  .gui_root .line_width_1   { --gui-line-width: 1 }
  .gui_root .line_width_2   { --gui-line-width: 2 }
  .gui_root .line_width_3   { --gui-line-width: 3 }
  .gui_root .line_width_4   { --gui-line-width: 4 }
  .gui_root .line_width_5   { --gui-line-width: 5 }
  .gui_root .line_width_6   { --gui-line-width: 6 }
  .gui_root .line_width_7   { --gui-line-width: 7 }
  .gui_root .line_width_8   { --gui-line-width: 8 }
  .gui_root .line_width_9   { --gui-line-width: 9 }
  .gui_root .line_width_10  { --gui-line-width: 10 }
  .gui_root .line_width_20  { --gui-line-width: 20 }
  .gui_root .line_width_1lh { --gui-line-width: var(--gui-line-height) }
  .gui_root .line_cap_round path { stroke-linecap: round }
  .gui_root .line_dash path { stroke-dasharray: calc(1 * var(--gui-scale)) calc(2 * var(--gui-scale)) }
  .gui_root .icon_contour svg > * {
    stroke: var(--gui-color-bg-4);
    stroke-width: var(--gui-contour-width);
    paint-order: stroke fill;
  }

  /** Dimensions */
  .gui_root .width_full { flex-shrink: 1; flex-grow: 1; width: 100% }
  .gui_root .width_half { flex-shrink: 1; flex-grow: 1; width: 50% }
  .gui_root .width_label { flex-shrink: 0;  width: calc(var(--gui-label-width) - var(--gui-label-offset)); }
  ${generateSizeClasses('width', 'width', 20, 'flex: none; ')}
  .gui_root .height_full { height: 100%; }
  .gui_root .height_half { height: 50%; }
  ${generateSizeClasses('height', 'min-height', 20)}
  ${generateFlexClasses(20)}
  ${generateGridColsClasses(20)}
  ${generateMarginClasses('top', -10, 10)}
  ${generateMarginClasses('right', -10, 10)}
  ${generateMarginClasses('bottom', -10, 10)}
  ${generateMarginClasses('left', -10, 10)}
  .gui_root .hspace { pointer-events: none; min-width: var(--gui-width-1); }
  .gui_root .vspace { pointer-events: none; width: 100%; min-height: var(--gui-width-1); }
  .gui_root .hgap { pointer-events: none;  min-width: calc(var(--gui-root-padding) - var(--gui-gap-y) * 1); }
  .gui_root .vgap { pointer-events: none; width: 100%; min-height: calc(var(--gui-root-padding) - var(--gui-gap-y) * 1); }

  /** zIndex */
  .gui_root .z_index_0 { z-index: 0; }
  .gui_root .z_index_1 { z-index: 1; }
  .gui_root .z_index_2 { z-index: 2; }
  .gui_root .z_index_3 { z-index: 3; }
  .gui_root .z_index_4 { z-index: 4; }
  .gui_root .z_index_5 { z-index: 5; }
  .gui_root.z_index_max, .gui_root .z_index_max { z-index: 99999999999999!important; }

  /** Color fg */
  .gui_root .color_fg_0  { color: transparent; }
  .gui_root .color_fg_1  { color: var(--gui-color-fg-1) }
  .gui_root .color_fg_2  { color: var(--gui-color-fg-2) }
  .gui_root .color_fg_3  { color: var(--gui-color-fg-3) }
  .gui_root .color_fg_4  { color: var(--gui-color-fg-4) }
  .gui_root .color_fg_5  { color: var(--gui-color-fg-5) }
  .gui_root .color_fg_6  { color: var(--gui-color-fg-6) }
  .gui_root .color_fg_7  { color: var(--gui-color-bg-1) }
  .gui_root .color_fg_8  { color: var(--gui-color-bg-2) }
  .gui_root .color_fg_9  { color: var(--gui-color-bg-3) }
  .gui_root .color_fg_10 { color: var(--gui-color-bg-4) }
  .gui_root .color_fg_11 { color: var(--gui-color-bg-5) }
  .gui_root .color_fg_12 { color: var(--gui-color-bg-6) }

  /** Color bg */
  .gui_root .color_bg_0  { background-color: transparent; }
  .gui_root .color_bg_1  { background-color: var(--gui-color-fg-1) }
  .gui_root .color_bg_2  { background-color: var(--gui-color-fg-2) }
  .gui_root .color_bg_3  { background-color: var(--gui-color-fg-3) }
  .gui_root .color_bg_4  { background-color: var(--gui-color-fg-4) }
  .gui_root .color_bg_5  { background-color: var(--gui-color-fg-5) }
  .gui_root .color_bg_6  { background-color: var(--gui-color-fg-6) }
  .gui_root .color_bg_7  { background-color: var(--gui-color-bg-1) }
  .gui_root .color_bg_8  { background-color: var(--gui-color-bg-2) }
  .gui_root .color_bg_9  { background-color: var(--gui-color-bg-3) }
  .gui_root .color_bg_10 { background-color: var(--gui-color-bg-4) }
  .gui_root .color_bg_11 { background-color: var(--gui-color-bg-5) }
  .gui_root .color_bg_12 { background-color: var(--gui-color-bg-6) }

  /** Color border */
  .gui_root .border { border: 1px solid currentColor; }
  .gui_root .color_border_0  { border-color: transparent; }
  .gui_root .color_border_1  { border-color: var(--gui-color-fg-1) }
  .gui_root .color_border_2  { border-color: var(--gui-color-fg-2) }
  .gui_root .color_border_3  { border-color: var(--gui-color-fg-3) }
  .gui_root .color_border_4  { border-color: var(--gui-color-fg-4) }
  .gui_root .color_border_5  { border-color: var(--gui-color-fg-5) }
  .gui_root .color_border_6  { border-color: var(--gui-color-fg-6) }
  .gui_root .color_border_7  { border-color: var(--gui-color-bg-1) }
  .gui_root .color_border_8  { border-color: var(--gui-color-bg-2) }
  .gui_root .color_border_9  { border-color: var(--gui-color-bg-3) }
  .gui_root .color_border_10 { border-color: var(--gui-color-bg-4) }
  .gui_root .color_border_11 { border-color: var(--gui-color-bg-5) }
  .gui_root .color_border_12 { border-color: var(--gui-color-bg-6) }

  /** Color classes */
  ${generateColorClasses()}

  /** Drop shadow */
  .gui_root .drop_shadow {
    filter: drop-shadow(0 0 1px var(--gui-bg)) drop-shadow(0 0 1px var(--gui-bg)) drop-shadow(0 0 1px var(--gui-bg)) drop-shadow(0 0 1px var(--gui-bg));
  }

  /** Border radius */
  .gui_root .border_radius { border-radius: var(--gui-border-radius); }
  .gui_root .border_radius_group > * { border-radius: 0; }
  .gui_root .border_radius_group > *:first-child { border-radius: var(--gui-border-radius) 0 0 var(--gui-border-radius); }
  .gui_root .border_radius_group > *:last-child { border-radius: 0 var(--gui-border-radius) var(--gui-border-radius) 0; }
  /** Icons */
  .gui_root .icon {
    pointer-events: none;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 1lh;
    height: 1lh;
  }
  .gui_root .icon svg {
    fill: currentColor;
    width: calc(17px * var(--gui-scale));
    height: calc(17px * var(--gui-scale));
  }

  /** Unsaved / modified indicators */
  .gui_root .tweak_revert {
    display: none;
    cursor: pointer;
    pointer-events: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 1lh;
    height: 1lh;
  }
  .gui_root .tweak_revert .gui_icon_revert,
  .gui_root .tweak_revert .gui_icon_cross {
    display: none;
  }
  .gui_root .row.has_modified > .label > .tweak_revert,
  .gui_root .row.has_unsaved > .label > .tweak_revert {
    display: flex;
  }
  .gui_root .row.has_modified > .label > .tweak_revert {
    color: var(--gui-color-14);
  }
  .gui_root .row.has_unsaved > .label > .tweak_revert {
    color: var(--gui-color-6);
  }
  .gui_root .row.has_unsaved > .label > .tweak_revert:hover .gui_icon_dot,
  .gui_root .row.has_modified > .label > .tweak_revert:hover .gui_icon_dot {
    display: none;
  }
  .gui_root .row.has_unsaved > .label > .tweak_revert:hover .gui_icon_revert,
  .gui_root .row.has_modified:not(.has_unsaved) > .label > .tweak_revert:hover .gui_icon_cross {
    display: flex;
  }
  .gui_root .row.has_unsaved {
    --gui-color-fg: var(--gui-color-6);
  }
  .gui_root .folder_dot {
    display: none;
    position: absolute;
    right: .75lh;
    top: 0;
    color: inherit;
  }
  .gui_root .folder.has_unsaved > .header_row .folder_dot {
    display: flex;
  }
`;

document.head.appendChild(styles);

/** @type {CanvasRenderingContext2D} */
export const colorCtx = /** @type {CanvasRenderingContext2D} */(document.createElement('canvas').getContext('2d'));
