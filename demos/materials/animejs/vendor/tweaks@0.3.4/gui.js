import { colorCtx, colors } from './styles.js';
import { createIcon } from './icons.js';
import { typeRegistry, localState, saveLocal, saveTweaks, flushState, syncedTweaks } from './state.js';
import { registerTypeGUI } from './tweaks.js';

/** @import {StateProp} from './state.js' */

/** @import  {TweakGroup} from './tweaks.js' */
/** @typedef {{[key: string|number]: any}} Target */
/** @typedef {((newValue?: any) => any) & { value: any, _isRef: true, toJSON: () => any }} Ref */
/** @typedef {number|string} LabelKey */
/** @typedef {CSSStyleDeclaration & { anchorName: string, positionAnchor: string, positionArea: string }} AnchorStyle */

/** @type {string} */
const PREFIX = 'gui_';
/** @type {Map<number, Widget>} */
const uidWidgetMap = new Map();
/** @type {WeakMap<Target, number>} */
const targetUidMap = new WeakMap();
/** @type {WeakMap<HTMLElement, Widget>} */
const inputWidgetMap = new WeakMap();
/** @type {Map<string, Widget>} */
const widgetsMap = new Map();
/** @type {WeakMap<HTMLElement, HTMLDivElement>} */
const windowContentWrappers = new WeakMap();
/** @type {WeakMap<HTMLElement, ResizeObserver>} */
const resizeObservers = new WeakMap();
/** @type {WeakMap<HTMLElement, Widget>} */
const lazyWidgets = new WeakMap();
/** @type {Map<HTMLElement, IntersectionObserver>} One observer per scroll container */
const lazyObservers = new Map();
/** @type {Widget[]} Tracks anchored window opening order for sequential Esc closing */
const anchoredStack = [];
/** @type {Map<number, { groups: TweakGroup[], content: Widget|null, tweakEntries: any[], lastGroupCount: number, tweaksFolderLabel: string, hasFolderOps: boolean }>} */
const panelTweakInfoMap = new Map();
/** @type {Widget|null} */
let tweaksFolderWidget = null;
/** @type {string} */
const SAVED = '\u2726';
/** @type {Object<string, Object<string, Object<string, any>>>|null} */
let tweakVersions = null;
/** @type {{ current: string, previous: string }} */
const tweakVersionSelector = { current: SAVED, previous: SAVED };
/** @type {Object<string, string>} */
let tweakVersionList = { [SAVED]: SAVED };
/** @type {Set<string>} */
const containerTypes = new Set(['gui_panel', 'gui_root', 'gui_popup_window']);
/** @type {HTMLElement} */
const docBody = document.body;
/** @type {Map<Document, Widget>} */
const popupDocMap = new Map();
/** @type {Map<string, Widget>} */
const popupWidgetsMap = new Map();
/** @type {(() => void)[]} */
const constructors = [];
/** @type {Target} */
const globalTarget = {};
/** @type {{ head: Widget|null, tail: Widget|null }} */
const widgetsList = { head: null, tail: null };
/** @type {Widget[]} */
const parentWidgetStack = [];
/** @type {Widget[]} */
const groupWidgetStack = [];
/** @type {(Widget|null)[]} */
const groupItemWidgetStack = [];
/** @type {any[]} */
const pendingUpdates = [];
/** @type {Set<string>} */
const pressedKeys = new Set();
/** @type {Set<string>} */
const heldKeys = new Set();
/** @type {Set<string>} */
const preventDefaultKeys = new Set();
/** @type {Map<string, HTMLElement>} Maps anchor names to their elements */
const anchoredElements = new Map();
/** @type {(Widget|null)[]} */ // Previous widgets saved during anchored window creation, restored in EndWindow
const anchorPrevWidgets = [];
/** @type {Document[]} */
const documentStack = [];
/** @type {(number|string)[]} */
const idStack = [];
/** @type {Widget|null} */
let prevWidget = null;
/** @type {boolean} */
let appendMode = false;
/** @type {number} */
let parentStackIndex = 0;
/** @type {number} */
let groupStackIndex = -1;
/** @type {number} */
let frameCursor = 0;
/** @type {Widget[]} */
let prevFrameWidgets = [];
/** @type {Widget[]} */
let currFrameWidgets = [];
/** @type {number} */
let nextTargetUid = 1;
/** @type {boolean} */
let rafPending = false;
/** @type {boolean} */
let forceAllFoldersOpen = true;
/** @type {number} */
let frameUnsavedCount = 0;
/** @type {number} */
let frameNonDefaultCount = 0;
/** @type {number} */
let frameTime = 0;
/** @type {number} */
let FPS = 10;
/** @type {number} */
let panelMinW = 0;
/** @type {number} */
let panelMinH = 0;
/** @type {number} */
let guiScale = 1;
/** @type {number} */
let panelZIndex = 1000000;
/** @type {Widget|null} Head of dirty input linked list for batched DOM writes */
let dirtyHead = null;
/** @type {number} */
let idStackIndex = -1;
/** @type {number|string} */
let currentGlobalId = 0;
/** @type {number} */
let winW = window.innerWidth;
/** @type {number} */
let winH = window.innerHeight;
/** @type {Document} */
let currentDocument = document;
let documentStackIndex = -1;
/** @type {Widget|null} */
let currentWindowWidget = null;
/** @type {boolean} */
let currentWindowIsFloating = false;
/** @type {Ref|null} */
let currentWindowYRef = null;
/** @type {Ref|null} */
let currentWindowXRef = null;
/** @type {Ref|null} */
let currentWindowVisibleRef = null;
/** @type {Ref|null} */
let currentWindowHeightRef = null;
/** @type {string} */
let nextAnchorName = '';
/** @type {string} */
let nextAnchorArea = '';
/** @type {string} */
let nextAnchorAlign = '';


/** @param {HTMLElement} $root */
function findAnchorRoot($root) {
  for (let i = 0, l = anchoredStack.length; i < l; i++) {
    if (anchoredStack[i].$root === $root && anchoredStack[i].anchorParent) {
      return findAnchorRoot(/** @type {HTMLElement} */(anchoredStack[i].anchorParent));
    }
  }
  return $root;
}

/**
 * @param {HTMLElement} $el
 * @param {Widget} [w]
 */
function raiseZIndex($el, w) {
  panelZIndex++;
  $el.style.zIndex = `${panelZIndex}`;
  if (w) w.zIndex = panelZIndex;
}

/** @param {HTMLElement} $root */
function raiseAnchoredChildren($root) {
  for (let i = 0, l = anchoredStack.length; i < l; i++) {
    const w = anchoredStack[i];
    if (w.anchorParent === $root) {
      raiseZIndex(w.$root, w);
      raiseAnchoredChildren(w.$root);
    }
  }
}

/** @param {HTMLElement} root */
function getLazyObserver(root) {
  let observer = lazyObservers.get(root);
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const w = lazyWidgets.get(/** @type {HTMLElement} */(entries[i].target));
        if (w) {
          w.n1 = entries[i].isIntersecting ? 1 : 0;
          requestRender();
        }
      }
    }, { root, rootMargin: '25%' });
    lazyObservers.set(root, observer);
  }
  return observer;
}

/**
 * Sets position (px) on the previous widget. Only writes when values change.
 * @param {number} [left]
 * @param {number} [top]
 * @param {number} [right]
 * @param {number} [bottom]
 */
function SetPosition(left, top, right, bottom) {
  const w = prevWidget;
  if (!w) return;
  if ((left !== undefined && w.left !== left) || (top !== undefined && w.top !== top)
   || (right !== undefined && w.right !== right) || (bottom !== undefined && w.bottom !== bottom)) {
    if (left !== undefined) w.left = left;
    if (top !== undefined) w.top = top;
    if (right !== undefined) w.right = right;
    if (bottom !== undefined) w.bottom = bottom;
    w.dirtyFlags |= 1;
    markDirty(w);
  }
}

/**
 * Sets position (%) on the previous widget. Only writes when values change.
 * @param {number} [left]
 * @param {number} [top]
 * @param {number} [right]
 * @param {number} [bottom]
 */
function SetPositionPercent(left, top, right, bottom) {
  const w = prevWidget;
  if (!w) return;
  if ((left !== undefined && w.left !== left) || (top !== undefined && w.top !== top)
   || (right !== undefined && w.right !== right) || (bottom !== undefined && w.bottom !== bottom)) {
    if (left !== undefined) w.left = left;
    if (top !== undefined) w.top = top;
    if (right !== undefined) w.right = right;
    if (bottom !== undefined) w.bottom = bottom;
    w.dirtyFlags |= 2;
    markDirty(w);
  }
}

/**
 * Sets dimension (px) on the previous widget. Only writes when values change.
 * @param {number} [width]
 * @param {number} [height]
 */
function SetDimension(width, height) {
  const w = prevWidget;
  if (!w) return;
  if ((width !== undefined && w.width !== width) || (height !== undefined && w.height !== height)) {
    if (width !== undefined) w.width = width;
    if (height !== undefined) w.height = height;
    w.dirtyFlags |= 4;
    markDirty(w);
  }
}

/**
 * Sets dimension (%) on the previous widget. Only writes when values change.
 * @param {number} [width]
 * @param {number} [height]
 */
function SetDimensionPercent(width, height) {
  const w = prevWidget;
  if (!w) return;
  if ((width !== undefined && w.width !== width) || (height !== undefined && w.height !== height)) {
    if (width !== undefined) w.width = width;
    if (height !== undefined) w.height = height;
    w.dirtyFlags |= 8;
    markDirty(w);
  }
}

/**
 * Clamp height to available viewport space below top. Position stays fixed.
 * @param {number} t
 * @param {number} h
 * @returns {number}
 */
function clampH(t, h) {
  if (t + h > winH) h = winH - t;
  if (h < panelMinH) h = panelMinH;
  return h;
}

/**
 * @param {Target} target
 * @param {LabelKey} key
 * @param {any} value
 */
function pushUpdate(target, key, value) {
  pendingUpdates.push(target, key, value);
  requestRender();
}

function flushUpdates() {
  let localChanged = false;
  for (let i = 0; i < pendingUpdates.length; i += 3) {
    const target = pendingUpdates[i];
    target[pendingUpdates[i + 1]] = pendingUpdates[i + 2];
    if (target._isRef) localChanged = true;
  }
  pendingUpdates.length = 0;
  if (localChanged) saveLocal();
}

/**
 * @param {LabelKey} key
 * @param {any} valueOrRef
 * @param {any} [fallback]
 * @return {Ref}
 */
function ensureRef(key, valueOrRef, fallback) {
  if (valueOrRef && valueOrRef._isRef) return valueOrRef;
  return Ref(key, valueOrRef !== undefined ? valueOrRef : fallback);
}

/** @this {{ value: any }} */
function refToJSON() { return { value: this.value }; }

/**
 * @param {any} initVal
 * @return {Ref}
 */
function createRef(initVal) {
  /** @type {Ref} */
  function ref(/** @type {any} */ newValue) {
    if (newValue === undefined) return ref.value;
    if (ref.value !== newValue) {
      ref.value = newValue;
      pushUpdate(ref, 'value', newValue);
    }
    return newValue;
  }
  ref._isRef = true;
  ref.value = initVal;
  ref.toJSON = refToJSON;
  return ref;
}

/**
 * @param {LabelKey} key
 * @param {any} [initialValue]
 * @return {Ref}
 */
function Ref(key, initialValue) {
  const isGlobal = typeof key === 'string' && key[0] === '@';
  const parent = parentWidgetStack[parentStackIndex];
  const scopeId = isGlobal ? 0 : parent ? parent.uid : 0;
  let scope = localState[scopeId];
  if (!scope) scope = localState[scopeId] = {};
  let ref = scope[key];
  if (!ref) {
    // Create a new Ref with initial value
    ref = scope[key] = createRef(initialValue === undefined ? true : initialValue);
  } else if (!ref._isRef) {
    // Ref value from sessionStorage, recreate a callable Ref
    ref = scope[key] = createRef(ref.value);
  }
  return ref;
}


function requestRender() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(renderLoop);
  }
}

/** @param {number} value */
function setScale(value) {
  guiScale = value;
  document.documentElement.style.setProperty('--gui-scale', '' + value);
  // Invalidate cached CSS min-width/min-height (defined in lh units that depend on scale)
  // so they're re-read from computed styles on next panel init
  panelMinW = 0;
  panelMinH = 0;
}

/**
 * @param {string} uid
 * @param {string} type
 * @return {HTMLElement}
 */
function createElement(uid, type) {
  const $el = currentDocument.createElement(type);
  $el.id = PREFIX + uid;
  return $el;
}

class Widget {
  /**
   * @param {number} uid
   * @param {number} parentUid
   * @param {string} type
   * @param {LabelKey} labelKey
   * @param {Target} target
   * @param {string} elType
   */
  constructor(uid, parentUid, type, labelKey, target, elType) {
    /** @type {LabelKey} */
    let key = labelKey;
    /** @type {string|null} */
    let label = null;
    /** @type {string|null} */
    let customId = null;
    /** @type {number} */
    let labelModifierPos = -1;
    /** @type {boolean} */
    const hasRef = /** @type {Ref} */(target)._isRef;

    if (hasRef) key = 'value';

    if (typeof labelKey === 'string') {
      const sepIdx = labelKey.indexOf('::');
      if (sepIdx >= 0) {
        labelModifierPos = sepIdx + 2;
        if (labelModifierPos < labelKey.length && labelKey.charCodeAt(labelModifierPos) === 34) {
          const closeQuote = labelKey.indexOf('"', labelModifierPos + 1);
          if (closeQuote >= 0) labelModifierPos = closeQuote + 1;
        }
        if (!hasRef) {
          const keyStr = labelKey.slice(0, sepIdx);
          const n = +keyStr;
          key = n === n ? n : keyStr;
        }
        if (labelModifierPos > sepIdx + 2) {
          label = labelKey.slice(sepIdx + 3, labelModifierPos - 1) || '';
        } else {
          label = sepIdx > 0 ? labelKey.slice(0, sepIdx) : null;
        }
      } else {
        if (!hasRef) {
          const n = +labelKey;
          key = n === n ? n : labelKey;
        }
        label = labelKey;
      }
    } else {
      label = `${labelKey}`;
    }

    const dotIdx = elType.indexOf('.');
    const tag = dotIdx >= 0 ? elType.slice(0, dotIdx) : elType;
    const isBodyType = elType === 'body';

    /** @type {HTMLElement} */
    const $root = isBodyType ? docBody
                : elType[0] === '#' && document.querySelector(elType)
                || createElement(`${uid}`, elType[0] === '#' ? 'div' : tag);

    if (!isBodyType) $root.classList.add(type);

    // Apply modifiers (#id, .class, [attr]) from :: section
    if (labelModifierPos >= 0) {
      customId = applyLabelModifier($root, /** @type {string} */(labelKey), labelModifierPos);
    }

    // Parse classes and attributes from elType syntax like: 'div.class1.class2[attr=value]'
    if (dotIdx >= 0 && elType[0] !== '#') {
      const bracketIdx = elType.indexOf('[');
      const classEnd = bracketIdx >= 0 ? bracketIdx : elType.length;
      let i = dotIdx;
      while (i < classEnd) {
        let j = elType.indexOf('.', i + 1);
        if (j < 0 || j > classEnd) j = classEnd;
        $root.classList.add(elType.slice(i + 1, j));
        i = j;
      }
      if (bracketIdx >= 0) applyLabelModifier($root, elType, bracketIdx);
    } else if (elType[0] !== '#') {
      const bracketIdx = elType.indexOf('[');
      if (bracketIdx >= 0) applyLabelModifier($root, elType, bracketIdx);
    }

    /** @type {number} */
    this.uid = uid;
    /** @type {string} */
    this.type = type;
    /** @type {string} */
    this.elType = elType;
    /** @type {LabelKey} */
    this.labelKey = labelKey;
    /** @type {number} */
    this.parentUid = parentUid;
    /** @type {number|string} */
    this.globalId = 0;
    /** @type {Target} */
    this.target = target;
    /** @type {LabelKey} */
    this.key = key;
    /** @type {string|null} */
    this.label = label;
    /** @type {HTMLElement} */
    this.$root = $root;
    /** @type {HTMLElement|SVGElement} */
    this.$input = $root;
    /** @type {HTMLElement} */
    this.$content = $root;
    /** @type {any} */
    this.value = undefined;
    /** @type {number} */
    this.n1 = NaN;
    /** @type {number} */
    this.n2 = NaN;
    /** @type {number} */
    this.n3 = NaN;
    /** @type {number} */
    this.n4 = NaN;
    /** @type {number} */
    this.n5 = NaN;
    /** @type {number} */
    this.n6 = NaN;
    /** @type {number} */
    this.n7 = NaN;
    /** @type {boolean} */
    this.init = false;
    /** @type {boolean} */
    this.used = false;
    /** @type {boolean} */
    this.removed = false;
    /** @type {boolean} */
    this.active = false;
    /** @type {number} Cached tweak row state: bit 0 = unsaved, bit 1 = modified, bit 2 = revert button added */
    this.tweakState = 0;
    /** @type {HTMLElement|null} */
    this.anchorParent = null;
    /** @type {number} */
    this.zIndex = 0;
    /** @type {number} */
    this.left = NaN;
    /** @type {number} */
    this.top = NaN;
    /** @type {number} */
    this.right = NaN;
    /** @type {number} */
    this.bottom = NaN;
    /** @type {number} */
    this.width = NaN;
    /** @type {number} */
    this.height = NaN;
    /** @type {Widget|null} */
    this.dirtyNext = null;
    /** @type {number} Bitmask: 1 = position dirty (px), 2 = position dirty (%), 4 = dimension dirty (px), 8 = dimension dirty (%) */
    this.dirtyFlags = 0;
    /** @type {Widget|null} */
    this.prev = null;
    /** @type {Widget|null} */
    this.next = null;
    // Register the widget with its custom id for lookup via SetParent('#id')
    if (customId) {
      // gui_popup_window always overwrites; it may be recreated with a new uid on reopen
      if (type === 'gui_popup_window') popupWidgetsMap.set('#' + customId, this);
      else {
        // First live registration wins; a later widget must not displace an active canonical one (e.g. #editor).
        // Exception: overwrite when the existing entry was removed (went unused and was evicted by endRender),
        // so a recreated widget (e.g. inline timeline panel after popup closes) can re-register.
        const prev = widgetsMap.get('#' + customId);
        if (!prev || prev.removed) widgetsMap.set('#' + customId, this);
      }
    }
  }
}

/** @param {Widget} child */
function addToList(child) {
  const prev = widgetsList.tail;
  const next = prev ? prev.next : widgetsList.head;
  prev ? prev.next = child : widgetsList.head = child;
  next ? next.prev = child : widgetsList.tail = child;
  child.prev = prev;
  child.next = next;
}

/** @param {Widget} child */
function removeFromList(child) {
  const prev = child.prev;
  const next = child.next;
  prev ? prev.next = next : widgetsList.head = next;
  next ? next.prev = prev : widgetsList.tail = prev;
  child.prev = null;
  child.next = null;
}

/**
 * @param {HTMLElement} $el
 * @param {string} lk
 * @param {number} labelModifierPos
 * @return {string|null}
 */
function applyLabelModifier($el, lk, labelModifierPos) {
  let customId = null;
  for (let i = labelModifierPos; i < lk.length;) {
    const ch = lk.charCodeAt(i);
    if (ch === 91) { // [
      const end = lk.indexOf(']', i + 1);
      if (end < 0) break;
      const eqIdx = lk.indexOf('=', i + 1);
      if (eqIdx > -1 && eqIdx < end) {
        const attrName = lk.slice(i + 1, eqIdx);
        const attrValue = lk.slice(eqIdx + 1, end);
        if (attrName === 'style') $el.style.cssText += attrValue;
        else $el.setAttribute(attrName, attrValue);
      } else {
        $el.setAttribute(lk.slice(i + 1, end), '');
      }
      i = end + 1;
    } else {
      // Scan until next # . or [
      let end = i + 1;
      while (end < lk.length) {
        const c = lk.charCodeAt(end);
        if (c === 35 || c === 46 || c === 91) break; // # . [
        end++;
      }
      if (end > i + 1) {
        if (ch === 35) customId = lk.slice(i + 1, end); // #id
        else if (ch === 46) $el.classList.add(lk.slice(i + 1, end)); // .class
      }
      i = end;
    }
  }
  return customId;
}

/**
 * @param {string} type
 * @param {LabelKey} labelKey
 * @param {Target} target
 * @param {string} elType
 * @return {Widget}
 */
function getOrCreateWidget(type, labelKey, target, elType) {
  // Lazy-create body widget if needed
  if (!parentWidgetStack[0]) {
    parentWidgetStack[0] = new Widget(0, 0, 'body', 'body', globalTarget, 'body');
  }

  // Auto-create floating panel for widgets placed directly under body
  let currParent = parentWidgetStack[parentStackIndex];
  if (!containerTypes.has(type) && currParent.type === 'body') {
    const panelWidget = getOrCreateWidget('gui_panel', '#GUI', globalTarget, 'div.gui_root.gui_panel.is_floating');
    if (!panelWidget.init) {
      panelWidget.active = true;
      panelWidget.init = true;
    }
    parentWidgetStack[++parentStackIndex] = panelWidget;
    prevWidget = null;
    currParent = panelWidget;
  }

  /** @type {Widget|undefined} */
  const prevFrameWidget = prevFrameWidgets[frameCursor];

  // If the previous frame widget matches the current parameters no need to create a new widget
  if (prevFrameWidget && !prevFrameWidget.removed &&
      prevFrameWidget.type === type &&
      prevFrameWidget.labelKey === labelKey &&
      prevFrameWidget.target === target &&
      prevFrameWidget.elType === elType &&
      prevFrameWidget.parentUid === currParent.uid &&
      prevFrameWidget.globalId === currentGlobalId
  ) {
    currFrameWidgets[frameCursor] = prevFrameWidget;
    prevWidget = prevFrameWidget;
    prevFrameWidget.used = true;
    frameCursor++;
    return prevFrameWidget;
  }

  // If it doesn't match the previous frame widget, check if it's in the cache
  let targetUid = targetUidMap.get(target);
  if (!targetUid) {
    targetUid = nextTargetUid++;
    targetUidMap.set(target, targetUid);
  }
  // Build a unique path string from widget props
  const widgetPath = `${currentGlobalId}_${currParent.uid}_${type}_${elType}_${labelKey}_${targetUid}`;
  // DJB2 hash to derive a numeric uid from the path
  let hash = 5381;
  for (let i = 0, l = widgetPath.length; i < l; i++) {
    hash = ((hash << 5) + hash) ^ widgetPath.charCodeAt(i);
  }
  // Truncate to 30 bit unsigned integer for use as widget uid
  let uid = (hash >>> 0) & 0x3FFFFFFF;
  let widget = uidWidgetMap.get(uid);

  // Collision check to verify if cached widget matches current props
  if (widget && (
    widget.type !== type ||
    widget.labelKey !== labelKey ||
    widget.target !== target ||
    widget.elType !== elType ||
    widget.parentUid !== currParent.uid ||
    widget.globalId !== currentGlobalId
  )) {
    console.warn('Hash colision detected');
    // Increment uid until we find a match or empty slot
    do { uid = (uid + 1) & 0x3FFFFFFF; widget = uidWidgetMap.get(uid); }
    while (widget && (widget.type !== type || widget.labelKey !== labelKey || widget.target !== target || widget.elType !== elType || widget.parentUid !== currParent.uid || widget.globalId !== currentGlobalId));
  }

  // If no widget found in the cache, create a new one
  if (!widget) {
    widget = new Widget(uid, currParent.uid, type, labelKey, target, elType);
    uidWidgetMap.set(uid, widget);
    addToList(widget);
  }
  widget.globalId = currentGlobalId;

  // Skip DOM placement for widgets whose root element was supplied externally (id overridden via #id modifier)
  // or for gui_popup_window whose $root is a placeholder div, with real content in widget.$content (the popup body).
  if (widget.$root.id === PREFIX + widget.uid && widget.type !== 'gui_popup_window') {
    if (prevWidget && prevWidget.parentUid === currParent.uid) {
      if (widget.$root.previousElementSibling !== prevWidget.$root) {
        prevWidget.$root.after(widget.$root);
      }
      if (prevWidget.type === 'label') {
        const inputTag = widget.$input.tagName;
        if (inputTag === 'INPUT' || inputTag === 'SELECT' || inputTag === 'TEXTAREA' || inputTag === 'BUTTON') {
          /** @type {HTMLLabelElement} */(prevWidget.$root).htmlFor = widget.$input.id;
        } else if (prevWidget.$root.tagName === 'LABEL') {
          // Convert label to span if target isn't labelable
          const $label = prevWidget.$root;
          const $span = document.createElement('span');
          $span.className = $label.className;
          while ($label.firstChild) $span.appendChild($label.firstChild);
          $label.replaceWith($span);
          prevWidget.$root = $span;
          prevWidget.$content = $span;
          prevWidget.$input = $span;
        }
      }
    // Append (not prepend) when explicitly requested, or when the parent is a root-level container
    // (body or gui_popup_window) where there is no meaningful "top" anchor, so render order defines order.
    } else if (appendMode || currParent.type === 'body' || currParent.type === 'gui_popup_window') {
      if (widget.$root.parentElement !== currParent.$content) {
        currParent.$content.append(widget.$root);
      }
    } else if (widget.$root.parentElement !== currParent.$content || widget.$root !== currParent.$content.firstElementChild) {
      currParent.$content.prepend(widget.$root);
    }
  }

  currFrameWidgets[frameCursor] = widget;
  prevWidget = widget;
  widget.used = true;
  frameCursor++;
  return widget;
}

/**
 * @param {string} value
 * @return {string}
 */
function filterNumeric(value) {
  let result = '';
  let hasDot = false, hasE = false, afterE = false, hasDigit = false;
  for (const char of value) {
    if (char === '-' && (result === '' || afterE)) {
      result += char; afterE = false;
    } else if (char === '+' && afterE) {
      result += char; afterE = false;
    } else if ((char === '.' || char === ',') && !hasDot && !hasE) {
      result += '.'; hasDot = true;
    } else if ((char === 'e' || char === 'E') && !hasE && hasDigit) {
      result += 'e'; hasE = afterE = true;
    } else if (char >= '0' && char <= '9') {
      result += char; hasDigit = true; afterE = false;
    }
  }
  return result === '.' ? '0.' : result;
}

/**
 * @param {Widget} widget
 * @param {number} value
 * @return {string}
 */
function snapClampInputValue(widget, value) {
  const min = widget.n1;
  const max = widget.n2;
  const step = widget.n3 > 0 ? widget.n3 : 1;
  const offset = isFinite(min) ? min : isFinite(max) ? max : 0;
  const rounded = Math.round((value - offset) / step) * step + offset;
  const stepString = `${step}`;
  const dotIndex = stepString.indexOf('.');
  const decimals = dotIndex === -1 ? 0 : stepString.length - dotIndex - 1;
  let clamped = Math.min(max, Math.max(min, rounded));
  if (widget.n4 < widget.n5) {
    clamped = Math.min(widget.n5, Math.max(widget.n4, clamped));
  }
  return clamped.toFixed(decimals);
}

/** @param {Event} e */
function onMeasureInput(e) {
  const $input = /** @type {HTMLInputElement} */(e.target);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  const raw = $input.value;
  const num = parseFloat(raw);
  if (num !== num) return;
  const unit = raw.slice((`${num}`).length);
  const clamped = +snapClampInputValue(widget, num);
  pushUpdate(widget.target, widget.key, unit ? clamped + unit : +clamped);
  if (e.type === 'blur') {
    widget.active = true;
    // Clear cached unit when user commits without one, prevents re-append
    if (!unit) widget.target.n4 = '';
  }
  requestRender();
}

/** @param {Event} e */
function onNumberInput(e) {
  const $input = /** @type {HTMLInputElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  const inputValue = filterNumeric($input.value);
  $input.value = inputValue;
  const value = parseFloat(inputValue);
  if (isNaN(value)) return;
  const clamped = +snapClampInputValue(widget, value);
  if (widget.type === 'range_input') $input.value = `${clamped}`;
  pushUpdate(widget.target, widget.key, clamped);
  widget.value = clamped;
  widget.active = true;
}

/** @param {KeyboardEvent} e */
function onNumberKeydown(e) {
  const $input = /** @type {HTMLInputElement} */(e.currentTarget);
  if ($input.readOnly || $input.disabled) return;
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  const c = e.code;
  const isRange = widget.type === 'range_input';
  const isVertical = c === 'ArrowUp' || c === 'ArrowDown';
  const isHorizontal = c === 'ArrowLeft' || c === 'ArrowRight';
  if (!isVertical && !(isRange && isHorizontal)) return;
  const currentValue = parseFloat($input.value);
  if (isNaN(currentValue)) return;
  e.preventDefault();
  const step = widget.n3;
  let increment;
  /**
   * step      | normal    | alt    | shift
   * ----------|-----------|--------|------------
   * ≤ 0       | 1         | 1      | 10
   * < 0.1     | step x 10 | step   | step x 100
   * < 1       | step      | step   | step x 10
   * ≥ 1       | step      | step   | step x 2
   */
  if (step <= 0) {
    increment = e.shiftKey ? 10 : 1;
  } else if (e.altKey) {
    increment = step;
  } else if (e.shiftKey) {
    increment = step >= 1 ? step * 2 : step >= 0.1 ? step * 10 : step * 100;
  } else {
    increment = step >= 0.1 ? step : step * 10;
  }
  const dir = (c === 'ArrowUp' || c === 'ArrowRight') ? 1 : -1;
  const clamped = snapClampInputValue(widget, currentValue + increment * dir);
  const isMeasure = widget.type === 'measure_input';
  const unit = isMeasure ? $input.value.slice((`${currentValue}`).length) : '';
  if (isMeasure) {
    const writeValue = unit ? clamped + unit : clamped;
    $input.value = writeValue;
    pushUpdate(widget.target, widget.key, writeValue);
    widget.value = writeValue;
  } else {
    $input.value = clamped;
    pushUpdate(widget.target, widget.key, +clamped);
    widget.value = +clamped;
  }
  widget.active = true;
}

/** @param {Event} e */
function onInput(e) {
  const $input = /** @type {HTMLInputElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  const value = $input.value;
  if (widget.target[widget.key] !== value) {
    pushUpdate(widget.target, widget.key, value);
    widget.value = value;
    widget.active = true;
  }
}

/** @param {Event} e */
function onButtonClick(e) {
  const $input = /** @type {HTMLButtonElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  widget.active = true;
  requestRender();
}

/** @param {Event} e */
function onToggleClick(e) {
  const $input = /** @type {HTMLInputElement|HTMLButtonElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  pushUpdate(widget.target, widget.key, !widget.target[widget.key]);
  widget.active = true;
}

/** @param {PointerEvent} e */
function onPoint2DDown(e) {
  e.preventDefault();
  /** @type {HTMLElement} */(e.currentTarget).setPointerCapture(e.pointerId);
}

/** @returns {Widget|null} */
function findParentPanel() {
  for (let i = parentStackIndex; i >= 0; i--) {
    const t = parentWidgetStack[i]?.type;
    if (t === 'gui_panel' || t === 'gui_popup_window') return parentWidgetStack[i];
  }
  return null;
}

/** @param {PointerEvent} e */
function onPoint2DMove(e) {
  const $point = /** @type {HTMLElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($point);
  if (!widget || !$point.hasPointerCapture(e.pointerId)) return;
  const $area = /** @type {HTMLElement} */($point.parentElement);
  const rect = $area.getBoundingClientRect();
  const minX = widget.n1, maxX = widget.n2;
  const minY = widget.n3, maxY = widget.n4;
  const step = widget.n5;
  const padX = widget.n6, padY = widget.n7;

  let rx = (e.clientX - rect.left) / rect.width;
  let ry = 1 - (e.clientY - rect.top) / rect.height;
  let x = minX + rx * (maxX - minX);
  let y = minY + ry * (maxY - minY);

  if (step > 0) {
    x = Math.round((x - minX) / step) * step + minX;
    y = Math.round((y - minY) / step) * step + minY;
  }
  x = Math.max(minX + padX, Math.min(maxX - padX, x));
  y = Math.max(minY + padY, Math.min(maxY - padY, y));

  const idx = /** @type {number} */(widget.key);
  pushUpdate(widget.target, idx, x);
  pushUpdate(widget.target, idx + 1, y);
  widget.active = true;
}

/** @param {KeyboardEvent} e */
function onPoint2DKeydown(e) {
  const $point = /** @type {HTMLElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($point);
  if (!widget) return;
  const c = e.code;
  const isX = c === 'ArrowLeft' || c === 'ArrowRight';
  const isY = c === 'ArrowUp' || c === 'ArrowDown';
  if (!isX && !isY) return;
  e.preventDefault();

  const idx = /** @type {number} */(widget.key);
  const minX = widget.n1, maxX = widget.n2;
  const minY = widget.n3, maxY = widget.n4;
  const step = widget.n5;
  const padX = widget.n6, padY = widget.n7;
  let inc = step > 0 ? step : (isX ? (maxX - minX) : (maxY - minY)) / 50;
  if (e.shiftKey) inc *= 10;
  if (e.altKey) inc *= 0.1;

  if (isX) {
    const x = widget.target[idx];
    const newX = Math.max(minX + padX, Math.min(maxX - padX, x + inc * (c === 'ArrowRight' ? 1 : -1)));
    pushUpdate(widget.target, idx, newX);
  } else {
    const y = widget.target[idx + 1];
    const newY = Math.max(minY + padY, Math.min(maxY - padY, y + inc * (c === 'ArrowUp' ? 1 : -1)));
    pushUpdate(widget.target, idx + 1, newY);
  }
  widget.active = true;
}

/** @param {Widget} widget */
function updateInputValueIfNeeded(widget) {
  const value = widget.target[widget.key];
  if (widget.value !== value) {
    widget.value = value;
    markDirty(widget);
  }
}

/** @param {Widget} w */
function markDirty(w) {
  if (!w.dirtyNext && w !== dirtyHead) { w.dirtyNext = dirtyHead; dirtyHead = w; }
}

function flushWidgetsValues() {
  let w = dirtyHead;
  while (w) {
    const next = w.dirtyNext;
    const t = w.type;
    const f = w.dirtyFlags;
    // Value writes
    if (t === 'plot_line_canvas') {
      /** @type {SVGPathElement} */(w.$input).setAttribute('d', w.value);
    } else if (t === 'display_text_input') {
      w.$root.textContent = w.value;
    } else if (t === 'checkbox_input') {
      /** @type {HTMLInputElement} */(w.$root).checked = w.value;
    } else if (t === 'toggle_button_input') {
      w.$root.classList.toggle('is_active', w.value);
    } else if (t === 'group') {
      w.$root.classList.toggle('has_unsaved', w.value);
    } else if (t === 'point2d_input') {
      w.$root.style.left = w.left + '%';
      w.$root.style.top = w.top + '%';
    } else if (t === 'scrubber_slider') {
      w.$root.classList.toggle('is_clamped', !!w.n5);
      w.$root.style.setProperty('--clamp-left', '' + w.n1);
      w.$root.style.setProperty('--clamp-right', '' + w.n2);
      if (w.n7) {
        const $tip = /** @type {HTMLElement} */(w.value);
        $tip.style.translate = w.n6 + 'px ' + w.top + 'px';
        $tip.textContent = '' + w.target[w.key];
      }
    } else if (t === 'number_input' || t === 'range_input') {
      /** @type {HTMLInputElement} */(w.$input).value = snapClampInputValue(w, w.value);
    } else if (t === 'measure_input') {
      // Skip display update while the user is typing to avoid overwriting their input
      if (document.activeElement !== w.$input) /** @type {HTMLInputElement} */(w.$input).value = w.value;
    } else if (t === 'text_input' || t === 'select_input_wrapper') {
      /** @type {HTMLInputElement} */(w.$input).value = w.value;
    }
    // Position / dimension writes
    if (f) {
      const s = w.$root.style;
      const unit = (f & 1) ? 'px' : '%';
      if (f & 3) {
        if (w.left === w.left) s.left = w.left + unit;
        if (w.top === w.top) s.top = w.top + unit;
        if (w.right === w.right) s.right = w.right + unit;
        if (w.bottom === w.bottom) s.bottom = w.bottom + unit;
      }
      if (f & 12) {
        const dUnit = (f & 4) ? 'px' : '%';
        if (w.width === w.width) s.width = w.width + dUnit;
        if (w.height === w.height) s.height = w.height + dUnit;
      }
      w.dirtyFlags = 0;
    }
    w.dirtyNext = null;
    w = next;
  }
  dirtyHead = null;
}

/**
 * @param {Widget} widget
 * @param {number} min
 * @param {number} max
 * @param {number} step
 */
function updateNumberInputConstraintsIfNeeded(widget, min, max, step) {
  if (widget.n1 !== min) {
    widget.n1 = min; // used by snapClampInputValue
    /** @type {HTMLInputElement} */(widget.$input).min = isFinite(min) ? `${min}` : '';
  }
  if (widget.n2 !== max) {
    widget.n2 = max; // used by snapClampInputValue
    /** @type {HTMLInputElement} */(widget.$input).max = isFinite(max) ? `${max}` : '';
  }
  if (widget.n3 !== step) {
    widget.n3 = step; // used by snapClampInputValue
    /** @type {HTMLInputElement} */(widget.$input).step = step > 0 ? `${step}` : '';
  }
}

/**
 * @param {Widget} widget
 * @return {boolean}
 */
function getAndResetActiveState(widget) {
  const active = widget.active;
  widget.active = false;
  return active;
}

/**
 * @param {Widget} [parentWidget]
 */
function PushParent(parentWidget) {
  const widget = parentWidget || prevWidget;
  if (!widget) return;
  parentWidgetStack[++parentStackIndex] = widget;
  prevWidget = null; // First child of new parent will use prepend/append path instead of insert-after-sibling
  appendMode = false; // Reset append mode set by SetParent so nested children prepend normally
}

/**
 * @param {Widget} [parentWidget]
 */
function AppendParent(parentWidget) {
  PushParent(parentWidget);
  appendMode = true;
}

/**
 * @param {LabelKey} [labelKey] Only used to keep track of the closed parent
 */
function PopParent(labelKey) {
  if (parentStackIndex <= 0) return;
  prevWidget = parentWidgetStack[parentStackIndex--];
}

/** @param {number|string} id */
function PushId(id) {
  idStack[++idStackIndex] = currentGlobalId;
  currentGlobalId = id;
}

/** @param {number|string} [id] */
function PopId(id) {
  currentGlobalId = idStackIndex >= 0 ? idStack[idStackIndex--] : 0;
}

/**
 * @param {string} id
 * @return {boolean}
 */
function SetParent(id) {
  const popupWidget = popupWidgetsMap.get(id);
  // Use the popup widget only when the popup window is open (active) and was used this frame.
  // When the popup is closed, active=false even though used=true (getOrCreateWidget always marks used),
  // so we fall back to the inline widgetsMap entry to render content in the main document.
  const namedWidget = (popupWidget && popupWidget.used && popupWidget.active)
    ? popupWidget
    : (widgetsMap.get(id) || null);
  if (namedWidget) {
    // Widget was removed from the DOM (went unused while its popup was open). Skip rendering
    // into its detached $root; the caller's BeginWindow will recreate it on the next frame.
    if (namedWidget.removed) return false;
    namedWidget.used = true; // Make sure widget is marked as used otherwise it will be removed at end of frame
    parentWidgetStack[++parentStackIndex] = namedWidget;
    prevWidget = null; // Reset prevWidget so new children are positioned relative to parent.$content
    appendMode = true; // Append after existing children instead of prepending before them
    return namedWidget.active; // Return active state so caller can skip content when parent is closed (e.g. collapsed panel)
  }
  // Skip rendering when the target has a registered popup but no active inline widget
  if (popupWidget) return false;
  const elType = id === 'body' ? 'body' : id[0] === '#' ? id : '#' + id;
  getOrCreateWidget('gui_root', id, globalTarget, elType);
  PushParent();
  appendMode = true;
  return true;
}

/**
 * @param {Widget} groupWidget
 */
function PushGroup(groupWidget) {
  groupWidgetStack[++groupStackIndex] = groupWidget;
  groupItemWidgetStack[groupStackIndex] = null;
  groupWidget.n1 = 0; // item counter
}

/**
 * @param {LabelKey} [labelKey] Only used to keep track of the closed parent
 */
function PopGroup(labelKey) {
  if (groupStackIndex >= 0) groupStackIndex--;
}

// WIDGETS

/**
 * @param {LabelKey} id
 * @param {string} [elType]
 * @param {Target} [target]
 * @return {boolean}
 */
function BeginGroup(id, elType = 'div.col', target = globalTarget) {
  const widget = getOrCreateWidget('group', id, target, elType);
  // When the target is a TweakGroup, toggle 'has_unsaved' on the row to highlight modified tweaks
  if (target.isTweakGroup) {
    const prop = target.nameSpace[widget.key];
    if (prop) {
      const unsaved = prop.value !== prop.saved;
      if (widget.value !== unsaved) {
        widget.value = unsaved;
        markDirty(widget);
      }
    }
  }
  PushParent();
  PushGroup(widget);
  return true;
}

/**
 * @param {LabelKey} [id] Only used to keep track of the closed parent
 */
function EndGroup(id) {
  PopParent();
  PopGroup();
}

/**
 * @param {LabelKey} id
 * @param {string} [elType]
 * @return {boolean}
 */
function BeginLazyItem(id, elType = 'div.col') {
  const widget = getOrCreateWidget('lazy_item', id, globalTarget, elType);
  if (!widget.init) {
    widget.n1 = 1; // visible by default on first frame
    // Find the closest scrollable ancestor to use as the IntersectionObserver root
    const scrollRoot = /** @type {HTMLElement} */(widget.$root.closest('.gui_panel') || widget.$root.parentElement);
    widget.value = getLazyObserver(scrollRoot);
    lazyWidgets.set(widget.$root, widget);
    /** @type {IntersectionObserver} */(widget.value).observe(widget.$root);
    widget.init = true;
  }
  PushParent();
  if (!widget.n1) {
    PopParent();
  }
  return !!widget.n1;
}

/**
 * @param {LabelKey} [id] Only used to keep track of the closed parent
 */
function EndLazyItem(id) {
  PopParent();
}

/**
 * @param {HTMLElement} $el
 * @param {string} label
 */
function parseLabel($el, label) {
  let start = label.indexOf('<{');
  if (start < 0) { $el.innerHTML = label; return; }
  let pos = 0;
  while (start >= 0) {
    const closeIdx = label.indexOf('}>', start + 2);
    if (closeIdx < 0) break;
    if (start > pos) $el.insertAdjacentHTML('beforeend', label.slice(pos, start));
    $el.appendChild(createIcon(label.slice(start + 2, closeIdx)));
    pos = closeIdx + 2;
    start = label.indexOf('<{', pos);
  }
  if (pos < label.length) $el.insertAdjacentHTML('beforeend', label.slice(pos));
  else if (pos === 0) $el.innerHTML = label;
}

/** @param {string} [labelKey] */
function VSpace(labelKey) {
  const widget = getOrCreateWidget('vspace', prevWidget ? prevWidget.uid : 'vspace', globalTarget, 'div');
  if (!widget.init) {
    if (labelKey) applyLabelModifier(widget.$root, labelKey, 0);
    widget.init = true;
  }
  return true;
}

/** @param {string} [labelKey] */
function HSpace(labelKey) {
  const widget = getOrCreateWidget('hspace', prevWidget ? prevWidget.uid : 'hspace', globalTarget, 'div');
  if (!widget.init) {
    if (labelKey) applyLabelModifier(widget.$root, labelKey, 0);
    widget.init = true;
  }
  return true;
}

/** @param {string} [labelKey] */
/** @param {number|string} [size] */
function VGap(size) {
  const widget = getOrCreateWidget('vgap', prevWidget ? prevWidget.uid : 'vgap', globalTarget, 'div');
  if (!widget.init && typeof size === 'string') applyLabelModifier(widget.$root, size, 0);
  if (typeof size === 'number' && widget.n1 !== size) {
    widget.n1 = size;
    widget.$root.style.minHeight = `var(--gui-width-${size})`;
  }
  widget.init = true;
  return true;
}

/** @param {number|string} [size] */
function HGap(size) {
  const widget = getOrCreateWidget('hgap', prevWidget ? prevWidget.uid : 'hgap', globalTarget, 'div');
  if (!widget.init && typeof size === 'string') applyLabelModifier(widget.$root, size, 0);
  if (typeof size === 'number' && widget.n1 !== size) {
    widget.n1 = size;
    widget.$root.style.width = `var(--gui-width-${size})`;
  }
  widget.init = true;
  return true;
}

/**
 * @param {LabelKey} labelKey
 */
function Label(labelKey) {
  const widget = getOrCreateWidget('label', labelKey, globalTarget, 'label');
  if (!widget.init) {
    inputWidgetMap.set(widget.$root, widget);
    if (widget.label) parseLabel(widget.$root, widget.label);
    widget.$root.onclick = onButtonClick;
    widget.init = true;
  }
  return getAndResetActiveState(widget);
}

/** @param {LabelKey} label */
function Icon(label) {
  const widget = getOrCreateWidget('icon', label, globalTarget, 'div');
  if (!widget.init) {
    if (widget.label) parseLabel(widget.$root, widget.label);
    widget.init = true;
  }
}

/**
 * @param {string} elType
 * @param {string|number} html
 */
function Html(elType, html) {
  const widget = getOrCreateWidget('html', html, globalTarget, elType);
  if (!widget.init) {
    if (html !== undefined && widget.label) parseLabel(widget.$root, widget.label);
    widget.init = true;
  }
  if (html !== undefined && widget.value !== html) {
    widget.value = html;
    widget.$root.innerHTML = `${html}`;
  }
  return true;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function TextInput(target, labelKey) {
  const widget = getOrCreateWidget('text_input', labelKey, target, 'input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'text';
    $input.placeholder = 'empty';
    $input.oninput = onInput;
    inputWidgetMap.set($input, widget);
    widget.init = true;
  }
  updateInputValueIfNeeded(widget);
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function Text(target, labelKey) {
  BeginGroup(labelKey, 'div.row.text_row', target);
  Label(labelKey);
  const active = TextInput(target, labelKey);
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function DisplayTextInput(target, labelKey) {
  const widget = getOrCreateWidget('display_text_input', labelKey, target, 'div.ui_item');
  if (!widget.init) {
    widget.init = true;
  }
  const value = widget.target[widget.key];
  if (widget.value !== value) {
    widget.value = value;
    markDirty(widget);
  }
  return false;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function DisplayText(target, labelKey) {
  BeginGroup(labelKey, 'div.row.text_row', target);
  Label(labelKey);
  DisplayTextInput(target, labelKey);
  EndGroup();
  return false;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function NumberInput(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  const widget = getOrCreateWidget('number_input', labelKey, target, 'input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'text';
    $input.placeholder = '0';
    $input.inputMode = 'decimal';
    $input.oninput = onNumberInput;
    $input.onblur = e => requestAnimationFrame(() => onNumberInput(e));
    $input.onkeydown = onNumberKeydown;
    inputWidgetMap.set($input, widget);
    widget.init = true;
  }
  updateNumberInputConstraintsIfNeeded(widget, min, max, step);
  updateInputValueIfNeeded(widget);
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function Number(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  BeginGroup(labelKey, 'div.row.number_row', target);
  Label(labelKey);
  let active = false;
  if (min !== -Infinity && max !== Infinity) {
    if (SliderInput(target, labelKey, min, max, step)) active = true;
    if (NumberInput(target, labelKey, min, max, step)) active = true;
  } else {
    active = NumberInput(target, labelKey, min, max, step);
  }
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function MeasureInput(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  const widget = getOrCreateWidget('measure_input', labelKey, target, 'input.number_input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'text';
    $input.oninput = onMeasureInput;
    $input.onblur = e => requestAnimationFrame(() => onMeasureInput(e));
    $input.onkeydown = onNumberKeydown;
    inputWidgetMap.set($input, widget);
    widget.init = true;
  }
  updateNumberInputConstraintsIfNeeded(widget, min, max, step);
  updateInputValueIfNeeded(widget);
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function Measure(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  BeginGroup(labelKey, 'div.row.number_row', target);
  const key = groupWidgetStack[groupStackIndex].key;
  Label(labelKey);
  let active = false;
  if (min !== -Infinity && max !== Infinity) {
    // Slider needs a numeric value; temporarily swap if the value is a string with unit
    const origValue = target[key];
    const numValue = typeof origValue === 'string' ? (parseFloat(origValue) || 0) : origValue;
    if (origValue !== numValue) target[key] = numValue;
    if (SliderInput(target, labelKey, min, max, step)) active = true;
    if (origValue !== numValue) target[key] = origValue;
    if (MeasureInput(target, labelKey, min, max, step)) active = true;
  } else {
    active = MeasureInput(target, labelKey, min, max, step);
  }
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function VectorInput(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  const widget = getOrCreateWidget('fieldset_input', labelKey, target, 'fieldset');
  PushParent();
  const vec = widget.target[widget.key];
  let active = false;
  if (Array.isArray(vec)) {
    for (let i = 0; i < vec.length; i++) {
      if (NumberInput(vec, i, min, max, step)) active = true;
    }
  } else if (vec && typeof vec === 'object') {
    for (const k in vec) {
      if (NumberInput(vec, k, min, max, step)) active = true;
    }
  }
  PopParent();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function Vector(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  BeginGroup(labelKey, 'div.row.vector_row', target);
  Label(labelKey);
  const active = VectorInput(target, labelKey, min, max, step);
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function SliderInput(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  const widget = getOrCreateWidget('range_input', labelKey, target, 'input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'range';
    $input.oninput = onNumberInput;
    $input.onkeydown = onNumberKeydown;
    inputWidgetMap.set($input, widget);
    widget.init = true;
  }
  updateNumberInputConstraintsIfNeeded(widget, min, max, step);
  updateInputValueIfNeeded(widget);
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @return {boolean}
 */
function Slider(target, labelKey, min = -Infinity, max = Infinity, step = 0) {
  BeginGroup(labelKey, 'div.row.slider_row', target);
  Label(labelKey);
  const rangeActive = SliderInput(target, labelKey, min, max, step);
  const numberActive = NumberInput(target, labelKey, min, max, step);
  EndGroup();
  return rangeActive || numberActive;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [minX]
 * @param {number} [maxX]
 * @param {number} [minY]
 * @param {number} [maxY]
 * @param {number} [step]
 * @param {number} [paddingX]
 * @param {number} [paddingY]
 * @param {number} [height]
 * @return {boolean}
 */
function Point2DArea(target, labelKey, minX = 0, maxX = 1, minY = 0, maxY = 1, step = 0, paddingX = 0, paddingY = 0, height) {
  const widget = getOrCreateWidget('point2d_area', labelKey, target, 'fieldset.point2d_area.ui_item');
  if (!widget.init) {
    widget.$content = widget.$root;
    widget.init = true;
  }
  // Bounds passed to Point2DInput children
  widget.n1 = minX;
  widget.n2 = maxX;
  widget.n3 = minY;
  widget.n4 = maxY;
  let active = false;
  if (height) {
    if (widget.n5 !== height) {
      widget.n5 = height; // cached height
      widget.$root.style.aspectRatio = '';
      widget.$root.style.setProperty('--gui-rows', '' + height);
    }
  } else {
    const rangeX = Math.abs(maxX - minX) || 1;
    const rangeY = Math.abs(maxY - minY) || 1;
    const aspect = rangeX / rangeY;
    if (widget.n5 !== aspect) {
      widget.n5 = aspect; // cached aspect ratio
      widget.$root.style.removeProperty('--gui-rows');
      widget.$root.style.aspectRatio = `${aspect}`;
    }
  }
  PushParent();
  const data = widget.target[widget.key];
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i += 2) {
      if (Point2DInput(data, i, step, paddingX, paddingY)) active = true;
    }
  }
  PopParent();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [step]
 * @param {number} [paddingX]
 * @param {number} [paddingY]
 * @return {boolean}
 */
function Point2DInput(target, labelKey, step = 0, paddingX = 0, paddingY = 0) {
  const parent = parentWidgetStack[parentStackIndex];
  const widget = getOrCreateWidget('point2d_input', labelKey, target, 'div.point2d_point');
  if (!widget.init) {
    widget.$root.tabIndex = 0;
    widget.$root.onpointerdown = onPoint2DDown;
    widget.$root.onpointermove = onPoint2DMove;
    widget.$root.onkeydown = onPoint2DKeydown;
    inputWidgetMap.set(widget.$root, widget);
    widget.init = true;
  }
  // Bounds from parent, used by onPoint2DMove/onPoint2DKeydown
  widget.n1 = parent.n1; // minX
  widget.n2 = parent.n2; // maxX
  widget.n3 = parent.n3; // minY
  widget.n4 = parent.n4; // maxY
  widget.n5 = step; // used by onPoint2DMove/onPoint2DKeydown
  widget.n6 = paddingX; // used by onPoint2DMove/onPoint2DKeydown
  widget.n7 = paddingY; // used by onPoint2DMove/onPoint2DKeydown
  const idx = /** @type {number} */(widget.key);
  const x = target[idx];
  const y = target[idx + 1];
  const rangeX = widget.n2 - widget.n1 || 1;
  const rangeY = widget.n4 - widget.n3 || 1;
  const left = ((x - widget.n1) / rangeX) * 100;
  const top = (1 - (y - widget.n3) / rangeY) * 100;
  if (widget.left !== left || widget.top !== top) {
    widget.left = left;
    widget.top = top;
    markDirty(widget);
  }
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [minX]
 * @param {number} [maxX]
 * @param {number} [minY]
 * @param {number} [maxY]
 * @param {number} [step]
 * @param {number} [paddingX]
 * @param {number} [paddingY]
 * @param {number} [height]
 * @return {boolean}
 */
function Point2D(target, labelKey, minX = 0, maxX = 1, minY = 0, maxY = 1, step = 0, paddingX = 0, paddingY = 0, height) {
  BeginGroup(labelKey, 'div.row.point2d_row', target);
  Label(labelKey);
  const active = Point2DArea(target, labelKey, minX, maxX, minY, maxY, step, paddingX, paddingY, height);
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number|Ref} rangeStart
 * @param {number|Ref} rangeEnd
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @param {undefined|boolean|Ref} [clamped]
 * @return {number}
 */
function ScrubberInput(target, labelKey, rangeStart, rangeEnd, min = -Infinity, max = Infinity, step = 0, clamped) {
  const widget = getOrCreateWidget('scrubber_slider', labelKey, target, 'fieldset.ui_item.ui_input');
  if (!widget.init) {
    const $progress = document.createElement('div');
    const $clamp = document.createElement('div');
    const $tooltip = document.createElement('div');
    $progress.className = 'scrubber_slider_progress';
    $clamp.className = 'scrubber_slider_clamp';
    $tooltip.classList.add('scrubber_tooltip', 'color_3', 'color_bg_4');
    widget.$root.appendChild($progress);
    widget.$root.appendChild($clamp);
    (widget.$root.closest('.gui_root') || widget.$root).appendChild($tooltip);
    widget.$root.onpointerdown = () => {
      const rect = widget.$root.getBoundingClientRect();
      widget.left = rect.left;
      widget.top = rect.top;
      widget.width = rect.width;
      widget.n7 = 1;
      $tooltip.classList.add('is_scrubbing');
    };
    widget.$root.onpointerup = () => { widget.n7 = 0; $tooltip.classList.remove('is_scrubbing'); };
    widget.$root.onlostpointercapture = () => { widget.n7 = 0; $tooltip.classList.remove('is_scrubbing'); };
    widget.$content = widget.$root;
    widget.$input = $progress;
    widget.value = $tooltip; // A bit hacky but good enough for now
    widget.init = true;
  }

  PushParent();

  const hasClamping = clamped !== undefined;
  const rangeStartRef = ensureRef('rangeStart', rangeStart, min);
  const rangeEndRef = ensureRef('rangeEnd', rangeEnd, max);
  const clampedRef = hasClamping ? ensureRef('clamped', clamped, true) : null;

  const isClamped = clampedRef ? clampedRef() : false;
  const startVal = isClamped ? rangeStartRef() : min;
  const endVal = isClamped ? rangeEndRef() : max;
  const mainVal = target[widget.key];
  const range = max - min;

  let active = 0;

  // Main slider
  if (SliderInput(target, labelKey, min, max, step)) active = 1;
  // Update tooltip while scrubbing — positioned fixed, escapes overflow containers
  if (widget.n7) {
    const pct = range > 0 ? (mainVal - min) / range : 0;
    const thumbOffset = 3 * guiScale;
    widget.n6 = widget.left + thumbOffset + (widget.width - thumbOffset * 2) * pct; // tooltip X position
    markDirty(widget);
  }
  if (prevWidget) {
    prevWidget.n4 = startVal; // clamp min for snapClampInputValue
    prevWidget.n5 = endVal; // clamp max for snapClampInputValue
    if (widget.n3 !== min || widget.n4 !== max) {
      widget.n3 = min; // cached min for marker update
      widget.n4 = max; // cached max for marker update
      const $root = prevWidget.$root;
      if (range <= 0 || !isFinite(range)) {
        $root.style.backgroundImage = 'none';
      } else {
        const minInterval = range / 60;
        const magnitude = Math.pow(10, Math.floor(Math.log10(minInterval)));
        const normalized = minInterval / magnitude;
        const S = normalized <= 1 ? magnitude
                : normalized <= 2 ? magnitude * 2
                : normalized <= 5 ? magnitude * 5
                : magnitude * 10;
        const L = S * 10;
        const lSize = (L / range) * 100;
        const lOffset = ((Math.ceil(min / L) * L) - min) / range * 100;
        const sRepeat = (S / L) * 50;
        // const mRepeat = 50;
        $root.style.backgroundImage =
          `linear-gradient(to right, var(--gui-color-fg-6) calc(1px * var(--gui-scale)), transparent calc(1px * var(--gui-scale))),` +
          // `repeating-linear-gradient(to right, var(--gui-color-bg-3) 0 .5px, transparent .5px ${mRepeat}%),` +
          `repeating-linear-gradient(to right, var(--gui-color-bg-3) 0 calc(1px * var(--gui-scale)), transparent calc(1px * var(--gui-scale)) ${sRepeat}%)`;
        $root.style.backgroundSize = `${lSize}% calc(37.5%), ${lSize}% calc(37.5%)`;
        $root.style.backgroundPosition = `${lOffset}% center`;
      }
    }
  }

  if (isClamped) {
    if (SliderInput(rangeStartRef, labelKey, min, max, step)) {
      if (rangeStartRef() > mainVal) pushUpdate(target, widget.key, rangeStartRef());
      active = 2;
    }
    if (prevWidget) {
      if (prevWidget.n4 !== min || prevWidget.n5 !== endVal) {
        prevWidget.n4 = min;
        prevWidget.n5 = endVal;
        /** @type {HTMLInputElement} */(prevWidget.$input).value = snapClampInputValue(prevWidget, rangeStartRef());
      }
    }
    if (SliderInput(rangeEndRef, labelKey, min, max, step)) {
      if (rangeEndRef() < mainVal) pushUpdate(target, widget.key, rangeEndRef());
      active = 3;
    }
    if (prevWidget) {
      if (prevWidget.n4 !== startVal || prevWidget.n5 !== max) {
        prevWidget.n4 = startVal;
        prevWidget.n5 = max;
        /** @type {HTMLInputElement} */(prevWidget.$input).value = snapClampInputValue(prevWidget, rangeEndRef());
      }
    }
    const leftPercent = ((rangeStartRef() - min) / range) * 100;
    const rightPercent = 100 - ((rangeEndRef() - min) / range) * 100;
    if (widget.n1 !== leftPercent || widget.n2 !== rightPercent) {
      widget.n1 = leftPercent;
      widget.n2 = rightPercent;
      markDirty(widget);
    }
    if (widget.n5 !== 1) {
      widget.n5 = 1;
      markDirty(widget);
    }
  } else {
    if (widget.n5 !== 0) {
      widget.n5 = 0;
      markDirty(widget);
    }
  }

  PopParent();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number|Ref} rangeStart
 * @param {number|Ref} rangeEnd
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @param {undefined|boolean|Ref} [clamped]
 * @return {boolean|number}
 */
function Scrubber(target, labelKey, rangeStart, rangeEnd, min = -Infinity, max = Infinity, step = 0, clamped) {
  BeginGroup(labelKey, 'div.row.scrubber_slider_row', target);
  Label(labelKey);
  const hasClamping = clamped !== undefined;
  const rangeStartRef = ensureRef('rangeStart', rangeStart, min);
  const rangeEndRef = ensureRef('rangeEnd', rangeEnd, max);
  const clampedRef = hasClamping ? ensureRef('clamped', clamped, true) : undefined;
  const isClamped = clampedRef ? clampedRef() : false;
  if (clampedRef) {
    if (ButtonInput(isClamped ? '<{clamp}>::.width_1' : '<{clamp}>::.width_1')) {
      clampedRef(!isClamped);
    }
  }
  const rangeActive = ScrubberInput(target, labelKey, rangeStartRef, rangeEndRef, min, max, step, clampedRef);
  const numberActive = NumberInput(
    target,
    labelKey,
    isClamped ? rangeStartRef() : min,
    isClamped ? rangeEndRef() : max,
    step
  );
  EndGroup();
  return rangeActive || numberActive;
}

/**
 * @param {Target} target
 * @param {string|number} value
 * @param {LabelKey} labelKey
 */
function Option(target, value, labelKey) {
  const widget = getOrCreateWidget('option', labelKey, target, 'option');
  if (!widget.init) {
    const $el = /** @type {HTMLOptionElement} */(widget.$root);
    $el.textContent = widget.label || `${widget.labelKey}`;
    $el.value = `${value}`;
    widget.init = true;
  }
  updateInputValueIfNeeded(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {Target} list
 * @return {boolean}
 */
function SelectInput(target, labelKey, list) {
  const widget = getOrCreateWidget('select_input_wrapper', labelKey, target, 'div.ui_item');
  if (!widget.init) {
    const $select = document.createElement('select');
    const $icon = createIcon('arrowUpDown');
    $select.id = widget.$root.id;
    $select.classList.add('select_input', 'ui_item', 'ui_action');
    $select.oninput = onInput;
    widget.$root.appendChild($select);
    widget.$root.appendChild($icon);
    widget.$root.removeAttribute('id');
    widget.$input = $select;
    widget.$content = $select;
    inputWidgetMap.set($select, widget);
    widget.init = true;
  }
  PushParent();
  if (Array.isArray(list)) {
    for (let i = 0, l = list.length; i < l; i++) Option(list, i, list[i]);
  } else if (list && typeof list === 'object') {
    for (const name in list) Option(list, name, name);
  }
  PopParent();
  updateInputValueIfNeeded(widget);
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {Target} list
 * @return {boolean}
 */
function Select(target, labelKey, list) {
  BeginGroup(labelKey, 'div.row.select_row', target);
  Label(labelKey);
  const active = SelectInput(target, labelKey, list);
  EndGroup();
  return active;
}

/**
 * @param {string} label
 * @return {boolean}
 */
function ButtonInput(label) {
  const widget = getOrCreateWidget('button_input', label, globalTarget, 'button.ui_button.ui_item.ui_input.ui_action');
  if (!widget.init) {
    const $input = /** @type {HTMLButtonElement} */(widget.$root);
    inputWidgetMap.set($input, widget);
    if (widget.label) parseLabel($input, widget.label);
    $input.onclick = onButtonClick;
    widget.init = true;
  }
  return getAndResetActiveState(widget);
}

/**
 * @param {string} label
 * @return {boolean}
 */
function Button(label) {
  BeginGroup(label, 'div.row.button_row');
  const active = ButtonInput(label);
  EndGroup();
  return active;
}

/**
 * @param {string} label
 * @param {undefined|boolean|Ref} [toggled]
 * @return {boolean}
 */
function ToggleButtonInput(label, toggled) {
  const group = groupStackIndex >= 0 ? groupWidgetStack[groupStackIndex] : null;
  const inGroup = group !== null && group.type === 'toggle_group';
  const ref = inGroup ? /** @type {Ref} */(group.target) : ensureRef('toggled', toggled, true);
  const widget = getOrCreateWidget('toggle_button_input', label, globalTarget, 'button.ui_button.ui_item.ui_input');
  const id = inGroup ? widget.key : null;
  const isActive = inGroup ? ref() === id : ref();
  if (!widget.init) {
    inputWidgetMap.set(widget.$root, widget);
    if (widget.label) parseLabel(widget.$root, widget.label);
    widget.$root.onclick = onButtonClick;
    widget.init = true;
  }
  const changed = getAndResetActiveState(widget);
  if (changed) {
    if (inGroup) ref(id); else ref(!isActive);
  }
  const nowActive = inGroup ? ref() === id : ref();
  if (widget.value !== nowActive) {
    widget.value = nowActive;
    markDirty(widget);
  }
  return changed;
}

/**
 * @param {string} label
 * @param {undefined|boolean|Ref} [toggled]
 * @return {boolean}
 */
function ToggleButton(label, toggled) {
  BeginGroup(label, 'div.row.toggle_button_row');
  const active = ToggleButtonInput(label, toggled);
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function CheckboxInput(target, labelKey) {
  const widget = getOrCreateWidget('checkbox_input', labelKey, target, 'input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'checkbox';
    inputWidgetMap.set($input, widget);
    $input.onclick = onToggleClick;
    widget.value = target[widget.key];
    $input.checked = widget.value;
    widget.init = true;
  }
  const targetValue = target[widget.key];
  if (widget.value !== targetValue) {
    widget.value = targetValue;
    markDirty(widget);
  }
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function Checkbox(target, labelKey) {
  BeginGroup(labelKey, 'div.row.checkbox_row', target);
  Label(labelKey);
  const active = CheckboxInput(target, labelKey);
  EndGroup();
  return active;
}

/**
 * @param {string} v
 * @return {number}
 */
function hexToFloat(v) {
  return Math.round(parseInt(v, 16) / 255 * 1000) / 1000;
}

/**
 * @param {string|number} v
 * @return {string}
 */
function toHex2(v) {
  return (+v).toString(16).padStart(2, '0');
}

/** @param {Event} e */
function onColorInput(e) {
  const $input = /** @type {HTMLInputElement} */(e.currentTarget);
  const widget = inputWidgetMap.get($input);
  if (!widget) return;
  const hex = $input.value;
  const original = widget.target[widget.key];
  const alpha = widget.n4;
  const isArr = Array.isArray(original);
  const isObj = original && typeof original === 'object';
  widget.$input.style.setProperty('--color', hex);
  if (isArr || isObj) {
    pushUpdate(original, isArr ? 0 : 'r', hexToFloat(hex.slice(1, 3)));
    pushUpdate(original, isArr ? 1 : 'g', hexToFloat(hex.slice(3, 5)));
    pushUpdate(original, isArr ? 2 : 'b', hexToFloat(hex.slice(5, 7)));
  } else if (typeof original === 'number') {
    pushUpdate(widget.target, widget.key, parseInt(hex.slice(1), 16));
  } else {
    const r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
    pushUpdate(widget.target, widget.key, original[0] === '#'
      ? (alpha >= 0 ? hex + toHex2(Math.round(alpha * 255)) : hex)
      : (alpha >= 0 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`));
  }
  widget.active = true;
}

/**
 * Show a color picker for RGB values
 * Color values other than RGB will be converted to RGB
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function ColorInput(target, labelKey) {
  const widget = getOrCreateWidget('color_input', labelKey, target, 'input.ui_item.ui_input');
  if (!widget.init) {
    const $input = /** @type {HTMLInputElement} */(widget.$root);
    $input.type = 'color';
    $input.oninput = onColorInput;
    inputWidgetMap.set($input, widget);
    widget.n4 = -1; // Set alpha chanel value to -1 by default: no alpha
    widget.init = true;
  }
  const color = widget.target[widget.key];
  const isArr = Array.isArray(color);
  const isObj = !isArr && color && typeof color === 'object';
  let changed = false;
  if (isArr || isObj) {
    const r = isArr ? color[0] : color.r;
    const g = isArr ? color[1] : color.g;
    const b = isArr ? color[2] : color.b;
    const a = isArr ? (color.length > 3 ? color[3] : -1) : ('a' in color ? color.a : -1);
    if (widget.n1 !== r || widget.n2 !== g || widget.n3 !== b || widget.n4 !== a) {
      // Cached RGBA for change detection
      widget.n1 = r;
      widget.n2 = g;
      widget.n3 = b;
      widget.n4 = a;
      colorCtx.fillStyle = `rgb(${r * 255},${g * 255},${b * 255})`;
      changed = true;
    }
  } else if (widget.value !== color) {
    widget.value = color;
    colorCtx.fillStyle = typeof color === 'number' ? '#' + color.toString(16).padStart(6, '0') : color;
    const m = /** @type {string} */(colorCtx.fillStyle).match(/([\d.]+)\)$/);
    widget.n4 = m ? +m[1] : -1; // cached alpha, used by onColorInput
    changed = true;
  }
  if (changed) {
    let hex = /** @type {string} */(colorCtx.fillStyle);
    if (hex[0] === 'r') {
      const m = hex.match(/(\d+),\s*(\d+),\s*(\d+)/);
      hex = m ? '#' + toHex2(m[1]) + toHex2(m[2]) + toHex2(m[3]) : '#000000';
    }
    widget.$input.style.setProperty('--color', hex);
    widget.$input.style.setProperty('--alpha', widget.n4 >= 0 ? `${widget.n4}` : '');
    /** @type {HTMLInputElement} */(widget.$input).value = hex;
  }
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @return {boolean}
 */
function Color(target, labelKey) {
  BeginGroup(labelKey, 'div.row.color_row', target);
  Label(labelKey);
  const colorActive = ColorInput(target, labelKey);
  const value = target[(parentWidgetStack[parentStackIndex]).key];
  const inputActive = Array.isArray(value) || (value && typeof value === 'object')
    ? VectorInput(target, labelKey, 0, 1, .01)
    : TextInput(target, labelKey);
  EndGroup();
  return colorActive || inputActive;
}

const svgNS = 'http://www.w3.org/2000/svg';

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [minX]
 * @param {number} [maxX]
 * @param {number} [minY]
 * @param {number} [maxY]
 * @param {number} [height]
 * @param {number} [lineWidth]
 * @return {boolean}
 */
function PlotLineCanvas(target, labelKey, minX, maxX, minY, maxY, height, lineWidth = 2) {
  const widget = getOrCreateWidget('plot_line_canvas', labelKey, target, 'div.ui_item');
  const $root = widget.$root;
  const data = widget.target[widget.key];
  const dataLength = Array.isArray(data) ? data.length : 0;
  if (dataLength < 4) return false;
  // Calculate bounds and data hash
  let mx = data[0], MX = data[0], my = data[1], MY = data[1];
  let dataHash = (dataLength * 31 + (data[0] * 1e4 | 0)) | 0;
  dataHash = (dataHash * 31 + (data[1] * 1e4 | 0)) | 0;
  for (let i = 2; i < dataLength; i += 2) {
    const x = data[i], y = data[i + 1];
    if (x < mx) mx = x; else if (x > MX) MX = x;
    if (y < my) my = y; else if (y > MY) MY = y;
    dataHash = (dataHash * 31 + (x * 1e4 | 0)) | 0;
    dataHash = (dataHash * 31 + (y * 1e4 | 0)) | 0;
  }
  // Override with user-provided bounds
  if (minX !== undefined) mx = minX;
  if (maxX !== undefined) MX = maxX;
  if (minY !== undefined) my = minY;
  if (maxY !== undefined) MY = maxY;
  const rangeX = Math.abs(MX - mx) || 1;
  const rangeY = Math.abs(MY - my) || 1;
  if (!widget.init) {
    widget.init = true;
    widget.n1 = NaN; // force re-measure on next frame when layout is stable
    const $svg = document.createElementNS(svgNS, 'svg');
    $svg.setAttribute('preserveAspectRatio', 'none');
    const $path = document.createElementNS(svgNS, 'path');
    $svg.appendChild($path);
    $root.appendChild($svg);
    widget.$input = /** @type {*} */($path);
    const sw = lineWidth * guiScale;
    widget.n4 = sw;
    $path.setAttribute('stroke-width', `${sw}`);
    requestRender();
  }
  const $path = /** @type {SVGPathElement} */(widget.$input);
  const sw = lineWidth * guiScale;
  if (widget.n4 !== sw) {
    widget.n4 = sw;
    $path.setAttribute('stroke-width', `${sw}`);
  }
  // Update CSS size when aspect/height changes
  let sizeChanged = false;
  const sizeKey = height ? height : rangeX / rangeY;
  if (widget.n1 !== sizeKey) {
    widget.n1 = sizeKey; // cached size key (height or aspect)
    if (height) {
      const h = height < 1 ? 1 : height;
      $root.style.aspectRatio = '';
      $root.style.setProperty('--gui-rows', '' + h);
    } else {
      $root.style.removeProperty('--gui-rows');
      $root.style.aspectRatio = `${rangeX / rangeY}`;
    }
    sizeChanged = true;
  }
  // Update viewBox when bounds change
  const $svg = /** @type {SVGSVGElement} */($root.firstChild);
  if (sizeChanged) {
    $svg.setAttribute('viewBox', '0 0 ' + rangeX + ' ' + rangeY);
  }
  if (sizeChanged || widget.n5 !== dataHash) {
    widget.n5 = dataHash;
    let d = '';
    let isNewSegment = true;
    for (let i = 0; i < dataLength; i += 2) {
      const x = data[i];
      if (isNaN(x)) {
        isNewSegment = true;
      } else {
        const px = x - mx;
        const py = rangeY - (data[i + 1] - my);
        if (isNewSegment) {
          d += 'M' + px + ' ' + py;
          isNewSegment = false;
        } else {
          d += 'L' + px + ' ' + py;
        }
      }
    }
    widget.value = d;
    markDirty(widget);
  }
  return getAndResetActiveState(widget);
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [minX]
 * @param {number} [maxX]
 * @param {number} [minY]
 * @param {number} [maxY]
 * @param {number} [height]
 * @param {number} [lineWidth]
 * @return {boolean}
 */
function PlotLine(target, labelKey, minX, maxX, minY, maxY, height, lineWidth) {
  BeginGroup(labelKey, 'div.row.plot_line_row', target);
  Label(labelKey);
  const active = PlotLineCanvas(target, labelKey, minX, maxX, minY, maxY, height, lineWidth);
  EndGroup();
  return active;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @param {number[]} [storeArray]
 * @param {number} [height]
 * @param {number} [interval]
 * @return {boolean}
 */
function MonitorCanvas(target, labelKey, min = 0, max = 100, step = 0, storeArray, height = 2, interval = 0) {
  const widget = getOrCreateWidget('monitor', labelKey, target, 'fieldset');
  PushParent();
  if (!widget.init) {
    /** @type {number[]} */
    const plot = widget.value = storeArray || [];
    if (!plot.length) for (let i = 0; i < 60; i++) { plot[i * 2] = i; plot[i * 2 + 1] = 0; }
    widget.n1 = 0;
    widget.init = true;
  }
  const plot = widget.value;
  const raw = +target[widget.key];
  const val = raw === raw ? raw : 0; // NaN guard
  if (!interval || !widget.n3 || frameTime - widget.n3 >= interval) {
    if (interval) widget.n3 = frameTime;
    for (let i = 1; i < 119; i += 2) plot[i] = plot[i + 2];
    plot[119] = val;
    widget.n1 = val;
  }
  Label(labelKey);
  PlotLineCanvas(widget, 'value::[readonly][inert]', 0, 59, min, max, height);
  NumberInput(widget, 'n1::.drop_shadow[readonly][inert]', min, max, step);
  if (widget.n1 !== widget.n2) {
    widget.n2 = widget.n1;
    const numberWidget = currFrameWidgets[frameCursor - 1];
    const $input = /** @type {HTMLInputElement} */(numberWidget.$input);
    const len = $input.value.length;
    $input.setAttribute('size', `${len < 3 ? 3 : len}`);
  }
  PopParent();
  return true;
}

/**
 * @param {Target} target
 * @param {LabelKey} labelKey
 * @param {number} [min]
 * @param {number} [max]
 * @param {number} [step]
 * @param {number[]} [storeArray]
 * @param {number} [height]
 * @param {number} [interval]
 * @return {boolean}
 */
function Monitor(target, labelKey, min = 0, max = 100, step = 0, storeArray, height = 2, interval = 0) {
  getOrCreateWidget('monitor', labelKey, target, 'div.row.monitor_row');
  PushParent();
  MonitorCanvas(target, labelKey, min, max, step, storeArray, height, interval);
  PopParent();
  return true;
}

/**
 * @param {string} label
 * @param {undefined|boolean|Ref} [expanded]
 * @param {Widget} [folderWidget]
 * @param {boolean} [keepOpen]
 * @return {boolean}
 */
function Header(label, expanded, folderWidget, keepOpen) {
  BeginGroup(label, 'div.row.header_row');
  let active = true;
  if (expanded === undefined) {
    const headerWidget = getOrCreateWidget('header', label, globalTarget, 'h2.ui_item');
    if (!headerWidget.init) {
      if (headerWidget.label) parseLabel(headerWidget.$root, headerWidget.label);
      headerWidget.init = true;
    }
  } else {
    const expandedRef = ensureRef(label, expanded, true);
    ToggleButtonInput(label, expandedRef);
    active = forceAllFoldersOpen || expandedRef();
    AppendParent(); // push toggle button as parent, append icon after label
    const iconWidget = getOrCreateWidget('icon', label, globalTarget, 'div');
    if (!iconWidget.init) {
      iconWidget.$root.appendChild(createIcon(folderWidget && folderWidget.$root.classList.contains('tree_node') ? 'chevronRight' : 'expand'));
      iconWidget.$root.appendChild(createIcon('collapse'));
      const dot = createIcon('dot');
      dot.classList.add('folder_dot');
      /** @type {HTMLElement} */(iconWidget.$root.parentElement).prepend(dot);
      iconWidget.init = true;
    }
    if (iconWidget.value !== active) {
      iconWidget.value = active;
      /** @type {HTMLElement} */(iconWidget.$root.children[0]).style.display = active ? 'none' : 'flex';
      /** @type {HTMLElement} */(iconWidget.$root.children[1]).style.display = active ? 'flex' : 'none';
    }
    PopParent();
  }
  if (!keepOpen) EndGroup();
  return active;
}

/**
 * @param {DOMRect} rect
 * @param {number} cx
 * @param {number} cy
 * @returns {number} Bitmask: 1=top, 2=right, 4=bottom, 8=left
 */
function getResizeEdges(rect, cx, cy) {
  const zone = 6 * guiScale;
  let m = 0;
  if (cy - rect.top < zone) m |= 1;
  if (rect.right - cx < zone) m |= 2;
  if (rect.bottom - cy < zone) m |= 4;
  if (cx - rect.left < zone) m |= 8;
  return m;
}

/**
 * @param {number} edges
 * @returns {string}
 */
function edgesToCursor(edges) {
  const v = edges & (1 | 4);
  const h = edges & (2 | 8);
  if (v && h) return ((edges & 1) === ((edges & 8) >> 3)) ? 'nwse' : 'nesw';
  if (v) return 'ns';
  if (h) return 'ew';
  return '';
}

const currentFocusedElementRef = Ref('@focusedElement', '');

/** @type {WeakMap<HTMLElement, string>} */
const anchorNameCache = new WeakMap();

/**
 * @param {string} [name]
 * @return {string}
 */
function AnchorName(name = '') {
  if (!prevWidget) return '';
  const el = prevWidget.$root;
  if (!name) {
    name = anchorNameCache.get(el);
    if (!name) { name = '--' + el.id; anchorNameCache.set(el, name); }
  }
  const prev = anchoredElements.get(name);
  if (prev === el) return name;
  if (prev) /** @type {AnchorStyle} */ (prev.style).anchorName = '';
  /** @type {AnchorStyle} */ (el.style).anchorName = name;
  anchoredElements.set(name, el);
  return name;
}

/**
 * @param {string} name
 * @param {string} area
 * @param {string} [align]
 */
function AnchorPosition(name, area, align) {
  nextAnchorName = name;
  nextAnchorArea = area;
  nextAnchorAlign = align || '';
}

/**
 * @param {string} title
 * @param {boolean} [fitContent]
 * @param {undefined|boolean|Ref} [visible]
 * @param {undefined|number|Ref} [x]
 * @param {undefined|number|Ref} [y]
 * @param {undefined|number|Ref} [width]
 * @param {undefined|number|Ref} [height]
 * @return {boolean}
 */
function BeginWindow(title, fitContent = true, visible, x, y, width, height) {
  // When anchor positioning is requested from inside a panel, escape to root level
  // so the anchored window floats above its parent panel. Determine the correct root
  // by checking where the anchor element lives: if it's in a popup document, push that
  // popup widget as root and switch currentDocument so child widgets render there.
  if (nextAnchorName && parentWidgetStack[parentStackIndex] && parentWidgetStack[parentStackIndex].type !== 'body') {
    anchorPrevWidgets.push(prevWidget);
    documentStack[++documentStackIndex] = currentDocument;
    const anchorEl = anchoredElements.get(nextAnchorName);
    const anchorDoc = anchorEl ? anchorEl.ownerDocument : currentDocument;
    const popupWidget = anchorDoc !== document ? popupDocMap.get(anchorDoc) : null;
    const popupTarget = popupWidget && popupWidget.active ? popupWidget : null;
    if (popupTarget) currentDocument = anchorDoc;
    PushParent(popupTarget || parentWidgetStack[0]);
  }
  const currParent = parentWidgetStack[parentStackIndex];
  const isFloating = !currParent || currParent.type === 'body' || currParent.type === 'gui_popup_window';
  const elType = isFloating ? 'div.gui_root.gui_panel.is_floating' : 'div.gui_root.gui_panel';
  const widget = getOrCreateWidget('gui_panel', title, globalTarget, elType);
  PushParent();
  // Reset $content so child widgets are placed correctly
  if (isFloating && fitContent) {
    let $wrapper = windowContentWrappers.get(widget.$root);
    if (!$wrapper) {
      $wrapper = currentDocument.createElement('div');
      widget.$root.appendChild($wrapper);
      $wrapper.classList.add('gui_scroll_content')
      windowContentWrappers.set(widget.$root, $wrapper);
    }
    widget.$content = $wrapper;
  } else {
    widget.$content = widget.$root;
  }
  const widthRef = ensureRef('width', width, 0);
  const heightRef = ensureRef('height', height, 0);
  const yRef = ensureRef('y', y, 0);
  const xRef = ensureRef('x', x, 0);
  const scrollRef = Ref('scroll', 0);
  const visibleRef = isFloating ? ensureRef('visible', visible, true) : null;
  const needsInit = !widget.init;
  // Set module state for WindowBar
  currentWindowWidget = widget;
  currentWindowIsFloating = isFloating;
  currentWindowYRef = yRef;
  currentWindowXRef = xRef;
  currentWindowVisibleRef = visibleRef;
  currentWindowHeightRef = heightRef;
  // n7 bit flags: bit 1 (& 2) = use left, bit 2 (& 4) = use bottom
  const anchored = isFloating && !!nextAnchorName;
  if (needsInit && anchored && visible === undefined && visibleRef && !visibleRef()) {
    visibleRef(true);
  }
  const $rootStyle = /** @type {AnchorStyle} */ (widget.$root.style);
  // Set up or update anchor positioning. Re-runs when the anchor element moves
  // to a different root (e.g. panel switching between popup and inline mode).
  // Deferred until the anchor element exists (registered via AnchorName).
  const anchoredEl = anchored ? anchoredElements.get(nextAnchorName) : null;
  const newAnchorParent = anchoredEl ? /** @type {HTMLElement|null} */(anchoredEl.closest('.gui_root')) : null;
  if (anchored && newAnchorParent && (widget.anchorParent !== newAnchorParent || $rootStyle.positionAnchor !== nextAnchorName || (widget.$root.compareDocumentPosition(newAnchorParent) & 5))) {
    widget.anchorParent = newAnchorParent;
    $rootStyle.positionAnchor = nextAnchorName;
    $rootStyle.positionArea = nextAnchorArea;
    widget.$root.style.alignSelf = nextAnchorAlign;
    widget.$root.style.left = 'auto';
    widget.$root.style.right = 'auto';
    widget.$root.style.top = 'auto';
    widget.$root.style.bottom = 'auto';
    widget.$root.classList.add('is_anchored');
    // Place after anchor parent; append inside body to avoid placing outside <body>
    if (newAnchorParent === newAnchorParent.ownerDocument.body) {
      newAnchorParent.appendChild(widget.$root);
    } else {
      newAnchorParent.after(widget.$root);
    }
  } else if (!anchored && widget.anchorParent) {
    widget.anchorParent = null;
    $rootStyle.positionAnchor = '';
    $rootStyle.positionArea = '';
    widget.$root.style.alignSelf = '';
    widget.$root.classList.remove('is_anchored');
  }
  // Ensure anchored child is never below its anchor parent (runs every frame as a safety net)
  if (anchored) {
    if (widget.anchorParent) {
      const parentZ = parseInt(widget.anchorParent.style.zIndex) || 0;
      if (widget.zIndex <= parentZ) {
        panelZIndex = Math.max(panelZIndex, parentZ);
        raiseZIndex(widget.$root, widget);
      }
    }
    nextAnchorName = '';
    nextAnchorArea = '';
    nextAnchorAlign = '';
  }

  if (!widget.init) {
    widget.$root.onscroll = () => { if (widget.active) scrollRef(widget.$root.scrollTop); };
    if (scrollRef()) widget.$root.style.visibility = 'hidden';
    if (!panelMinW) {
      const s = getComputedStyle(widget.$root);
      panelMinW = parseFloat(s.minWidth);
      panelMinH = parseFloat(s.minHeight);
    }
    // Detect position corner from CSS classes
    const cl = widget.$root.classList;
    // n5: use left for x-axis
    if (cl.contains('top_left') || cl.contains('bottom_left')) widget.n5 = 1;
    // n6: use bottom for y-axis
    if (cl.contains('bottom_left') || cl.contains('bottom_right')) widget.n6 = 1;
    if (isFloating) {
      raiseZIndex(widget.$root, widget);
      let startX = 0, startY = 0, captured = false;
      let resizeMask = 0, initW = 0, initH = 0, initY = 0, initX = 0, maxH = 0, minW = 0, minH = 0;
      /** @type {DOMRect|null} */
      let cachedRect = null;
      // Disable resize axes when width/height classes are set
      const hasWidthClass = widget.$root.className.indexOf('width_') !== -1;
      const hasHeightClass = widget.$root.className.indexOf('height_') !== -1;
      const resizeAllow = (hasWidthClass ? 0 : 2 | 8) | (hasHeightClass ? 0 : 1 | 4);
      // n5: use left instead of right
      const useLeft = widget.n5;
      // n6: use bottom instead of top
      const useBottom = widget.n6;
      let anchorMaxW = 0, anchorMaxH = 0;
      // Allowed resize edges for anchored windows based on position-area.
      // Only edges the window extends toward (away from anchor) are resizable.
      function anchorAllowedEdges() {
        if (!widget.anchorParent) return 15; // all edges: top(1) + right(2) + bottom(4) + left(8)
        const area = /** @type {AnchorStyle} */ (widget.$root.style).positionArea;
        let aa = 0;
        // Enable resize on each edge the window extends toward (away from anchor)
        if (area.indexOf('right') !== -1) aa |= 2;
        if (area.indexOf('left') !== -1) aa |= 8;
        if (area.indexOf('bottom') !== -1) aa |= 4;
        if (area.indexOf('top') !== -1) aa |= 1;
        // Single-axis area (e.g. 'right'): allow both edges on the unspecified axis
        if (!(aa & (2 | 8))) aa |= 2 | 8;
        if (!(aa & (1 | 4))) aa |= 1 | 4;
        return aa;
      }
      widget.$root.onpointerdown = (e) => {
        if (!widget.active) return;
        const rootEl = findAnchorRoot(widget.$root);
        raiseZIndex(rootEl);
        raiseAnchoredChildren(rootEl);
        // Raise clicked anchored window above its siblings
        if (widget.anchorParent) {
          raiseZIndex(widget.$root, widget);
          raiseAnchoredChildren(widget.$root);
        }
        const $el = widget.$root;
        cachedRect = $el.getBoundingClientRect();
        const m = getResizeEdges(cachedRect, e.clientX, e.clientY) & resizeAllow & anchorAllowedEdges();
        if (!m) return;
        resizeMask = m;
        initW = cachedRect.width;
        initH = cachedRect.height;
        initX = useLeft ? cachedRect.left : winW - cachedRect.right;
        initY = useBottom ? winH - cachedRect.bottom : cachedRect.top;
        maxH = $el.scrollHeight + (cachedRect.height - $el.clientHeight);
        const cs = getComputedStyle($el);
        minW = parseFloat(cs.minWidth) || panelMinW;
        minH = parseFloat(cs.minHeight) || panelMinH;
        if (widget.anchorParent) {
          anchorMaxW = (m & 2) ? winW - cachedRect.left : (m & 8) ? cachedRect.right : initW;
          anchorMaxH = (m & 4) ? winH - cachedRect.top : (m & 1) ? cachedRect.bottom : initH;
        }
        if (m & (1 | 4)) {
          $el.style.height = cachedRect.height + 'px';
          $el.style.maxHeight = 'none';
        }
        startX = e.clientX;
        startY = e.clientY;
        e.preventDefault();
        $el.setPointerCapture(e.pointerId);
        captured = true;
      }
      widget.$root.onpointermove = (e) => {
        if (!widget.active) return;
        const $el = widget.$root;
        if (captured) {
          widget.n2 = 1; // flag resize active
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          let w = initW, h = initH;
          if (resizeMask & 2) w += dx;
          if (resizeMask & 8) w -= dx;
          if (resizeMask & 4) h += dy;
          if (resizeMask & 1) h -= dy;
          if (w < minW) w = minW;
          if (h < minH) h = minH;
          if (fitContent && h > maxH) h = maxH;
          if (widget.anchorParent) {
            // Anchored: clamp to viewport from anchor point
            if (w > anchorMaxW) w = anchorMaxW;
            if (h > anchorMaxH) h = anchorMaxH;
          } else {
            // Non-anchored: position-based clamping
            let x = (resizeMask & (useLeft ? 8 : 2)) ? initX + initW - w : initX;
            let y = (resizeMask & (useBottom ? 4 : 1)) ? initY + initH - h : initY;
            if (y < 0) { h += y; y = 0; }
            if (x < 0) { w += x; x = 0; }
            if (y + h > winH) h = winH - y;
            if (x + w > winW) w = winW - x;
            if (h < minH) h = minH;
            if (w < minW) w = minW;
            $el.style[useBottom ? 'bottom' : 'top'] = Math.round(y) + 'px';
            $el.style[useLeft ? 'left' : 'right'] = Math.round(x) + 'px';
          }
          w = Math.round(w);
          h = Math.round(h);
          if (!hasWidthClass) $el.style.width = w + 'px';
          if (!hasHeightClass) $el.style.height = h + 'px';
        } else {
          if (e.target !== $el) {
            $el.style.removeProperty('cursor');
            return;
          }
          if (!cachedRect) cachedRect = $el.getBoundingClientRect();
          const m = getResizeEdges(cachedRect, e.clientX, e.clientY) & resizeAllow & anchorAllowedEdges();
          const c = edgesToCursor(m);
          if (c) {
            $el.style.cursor = c + '-resize';
          } else {
            $el.style.removeProperty('cursor');
          }
        }
      }
      widget.$root.onpointerleave = () => { widget.$root.style.removeProperty('cursor'); };
      widget.$root.onlostpointercapture = () => {
        captured = false;
        widget.$root.style.removeProperty('cursor');
        cachedRect = widget.$root.getBoundingClientRect();
        if (!hasWidthClass) widthRef(Math.round(cachedRect.width));
        if (!hasHeightClass) heightRef(Math.round(cachedRect.height));
        // Anchored windows: skip position ref updates — position is managed by CSS anchor positioning
        if (!widget.anchorParent) {
          yRef(Math.round(parseFloat(widget.$root.style[useBottom ? 'bottom' : 'top'])));
          xRef(Math.round(parseFloat(widget.$root.style[useLeft ? 'left' : 'right'])));
        }
        if (fitContent) {
          widget.$root.style.height = '';
          widget.$root.style.maxHeight = cachedRect.height + 'px';
        } else {
          widget.$root.style.maxHeight = 'none';
        }
        requestRender();
      }
    }
  }
  // Window n-slots:
  // n2 = resize active
  // n3 = content height baseline (managed by ResizeObserver)
  // n4 = restoration flag (NaN = pending; 1 = scroll deferred; 0 = restored)
  // n5 = use left for x-axis (1 = left, NaN = right)
  // n6 = use bottom for y-axis (1 = bottom, NaN = top)
  if (isFloating) {
    widget.n2 = 0; // reset resize signal
    if (visibleRef && !visibleRef()) {
      widget.n3 = NaN;
      widget.n4 = NaN;
      widget.$root.style.visibility = '';
      widget.$root.classList.toggle('is_hidden', true);
      // Apply persisted position once on close or first frame (so minimized panel stays in place)
      if (!anchored && xRef() && (widget.active || widget.width !== widget.width)) {
        widget.$root.style[widget.n6 ? 'bottom' : 'top'] = yRef() + 'px';
        widget.$root.style[widget.n5 ? 'left' : 'right'] = xRef() + 'px';
      }
      widget.active = false;
      // Remove from anchored stack when closing
      if (anchored) {
        const idx = anchoredStack.indexOf(widget);
        if (idx !== -1) anchoredStack.splice(idx, 1);
      }
      const wrapper = windowContentWrappers.get(widget.$root);
      const ro = wrapper && resizeObservers.get(wrapper);
      if (ro) { ro.disconnect(); resizeObservers.delete(wrapper); }
    } else {
      if (!anchored && (width !== undefined || widthRef() || heightRef())) {
        let boundsChanged = false;
        let py = yRef(), px = xRef(), w = widthRef(), h = heightRef();
        if (py + h > winH) { h = winH - py; boundsChanged = true; }
        if (px + w > winW) { w = winW - px; boundsChanged = true; }
        if (h < panelMinH) { h = panelMinH; boundsChanged = true; }
        if (w < panelMinW) { w = panelMinW; boundsChanged = true; }
        if (py + h > winH) { py = winH - h; boundsChanged = true; }
        if (px + w > winW) { px = winW - w; boundsChanged = true; }
        if (py < 0) { py = 0; boundsChanged = true; }
        if (px < 0) { px = 0; boundsChanged = true; }
        if (boundsChanged) { yRef(py); xRef(px); widthRef(w); heightRef(h); }
      }
      if (!anchored) {
        const w = +widthRef(), h = +heightRef(), x = +xRef(), y = +yRef();
        // n5: use left instead of right
        const useLeft = widget.n5;
        // n6: use bottom instead of top
        const useBottom = widget.n6;
        if (widget.width !== w || widget.height !== h
         || (useLeft ? widget.left : widget.right) !== x
         || (useBottom ? widget.bottom : widget.top) !== y) {
          widget.width = w; widget.height = h;
          if (useLeft) widget.left = x; else widget.right = x;
          if (useBottom) widget.bottom = y; else widget.top = y;
          widget.init = true;
          widget.$root.style.width = '';
          widget.$root.style.height = '';
          widget.$root.style.maxHeight = '';
          widget.$root.style.top = '';
          widget.$root.style.right = '';
          widget.$root.style.bottom = '';
          widget.$root.style.left = '';
          if (widthRef()) {
            widget.$root.style.width = widthRef() + 'px';
            if (fitContent) {
              widget.$root.style.maxHeight = heightRef() + 'px';
            } else if (heightRef()) {
              widget.$root.style.height = heightRef() + 'px';
              widget.$root.style.maxHeight = 'none';
            }
            widget.$root.style[useBottom ? 'bottom' : 'top'] = yRef() + 'px';
            widget.$root.style[useLeft ? 'left' : 'right'] = xRef() + 'px';
          }
        }
      } // end !anchored
      if (anchored && !widget.init) {
        widget.init = true;
      }
      widget.$root.classList.toggle('is_hidden', false);
      // Track anchored window opening order for sequential Esc closing
      if (anchored && anchoredStack.indexOf(widget) === -1) {
        anchoredStack.push(widget);
      }
      // Close the most recently opened anchored window on Esc
      if (anchored && IsKeyPressed('Escape') && anchoredStack[anchoredStack.length - 1] === widget) {
        if (visibleRef) visibleRef(false);
        anchoredStack.pop();
        pressedKeys.delete('Escape');
      }
      widget.active = true;
      const wrapper = windowContentWrappers.get(widget.$root);
      if (fitContent && wrapper && !resizeObservers.has(wrapper)) {
        const ro = new ResizeObserver((entries) => {
          const contentH = entries[0].contentRect.height;
          // Skip adjustment on first observation (n3 is NaN), when hidden, or during drag resize
          if (widget.n3 !== widget.n3 || !widget.active || widget.removed || widget.n2) {
            const isFirstObs = widget.n3 !== widget.n3;
            widget.n3 = contentH;
            // On first observation, if content overflows the stored height, expand to fit.
            // Skip if panel is minimized (heightRef at panelMinH) to preserve minimize state.
            if (isFirstObs && heightRef() > panelMinH) {
              const $r = widget.$root;
              const scrollH = $r.scrollHeight + ($r.offsetHeight - $r.clientHeight);
              if (scrollH > heightRef()) {
                const h = clampH(yRef(), scrollH);
                heightRef(h);
                $r.style.maxHeight = h + 'px';
                widget.n3 = NaN;
              }
            }
            return;
          }
          // Content height changed since last observation — adjust panel size
          if (contentH !== widget.n3) {
            if (fitContent) {
              if (!widthRef()) widthRef(Math.round(widget.$root.getBoundingClientRect().width));
              const delta = contentH - widget.n3;
              let h = heightRef();
              // Apply content height delta directly for both growing and shrinking.
              // Using scrollHeight for shrinking doesn't work because maxHeight caps scrollHeight,
              // preventing the panel from detecting that content is actually shorter.
              h += delta;
              heightRef(clampH(yRef(), h));
              if (widget.anchorParent) {
                // Anchored windows: explicit maxHeight conflicts with CSS anchor positioning
                // and causes the window to visually detach from its anchor point.
                // Clear maxHeight when content grows so anchor positioning sizes naturally.
                // Manual resize (onlostpointercapture) sets maxHeight which persists until content outgrows it.
                if (delta > 0) widget.$root.style.maxHeight = '';
              } else {
                // Non-anchored windows: set maxHeight directly to match the new content size.
                widget.$root.style.maxHeight = heightRef() + 'px';
              }
            }
            widget.n3 = contentH;
          }
          requestRender();
        });
        ro.observe(wrapper);
        resizeObservers.set(wrapper, ro);
      }
    }
  } else {
    widget.init = true;
    widget.active = true;
  }

  // Scroll + focus restoration
  if (!needsInit && widget.active) {
    if (isNaN(widget.n4)) {
      // Frame 1: content is being rebuilt, defer scroll/focus to next frame
      if (scrollRef()) widget.$root.style.visibility = 'hidden';
      else widget.$root.style.visibility = '';
      widget.n4 = 1;
      if (isFloating && !widthRef()) {
        const rect = widget.$root.getBoundingClientRect();
        widthRef(Math.round(rect.width));
        heightRef(Math.ceil(rect.height));
        if (!fitContent) {
          widget.$root.style.height = rect.height + 'px';
          widget.$root.style.maxHeight = 'none';
        }
      }
    } else if (widget.n4 === 1) {
      // Frame 2: content is now populated, restore scroll and focus
      widget.$root.scrollTop = scrollRef();
      widget.$root.style.visibility = '';
      const focusEl = currentFocusedElementRef() ? document.getElementById(currentFocusedElementRef()) : null;
      if (focusEl) focusEl.focus({ preventScroll: true });
      widget.n4 = 0;
    }
  }

  return widget.active;
}

function EndWindow() {
  PopParent();
  // The anchor block in BeginWindow pushes a root-level widget onto the stack so the floating
  // window is created outside its nested panel context, then saves prevWidget to anchorPrevWidgets.
  // After PopParent() above undoes BeginWindow's own push, we land on that root widget:
  //   - parentWidgetStack[0] (body) in inline mode
  //   - a gui_popup_window widget in popup mode
  // Undo the anchor push and restore prevWidget. anchorPrevWidgets.length > 0 guards against
  // false-positives when a non-anchored window's EndWindow happens to land on one of these types.
  const parent = parentWidgetStack[parentStackIndex];
  if (parentStackIndex > 0 && anchorPrevWidgets.length > 0 &&
      (parent === parentWidgetStack[0] || parent.type === 'gui_popup_window')) {
    currentDocument = documentStackIndex >= 0 ? documentStack[documentStackIndex--] : document;
    parentStackIndex--;
    prevWidget = anchorPrevWidgets.pop() || null;
  }
}

/**
 * Begins rendering into a popup window.
 * Works like BeginWindow but renders into a separate browser popup.
 * The popup persists across main page reloads via a named window.
 * @param {string} title - Window title with modifiers (must include a #id)
 * @param {Ref} [visible] - Ref controlled by the caller; set to false externally when popup closes
 * @param {undefined|number|Ref} [x] - Screen x position; remembered across open/close cycles
 * @param {undefined|number|Ref} [y] - Screen y position; remembered across open/close cycles
 * @param {undefined|number|Ref} [width]
 * @param {undefined|number|Ref} [height]
 * @return {boolean}
 */
function BeginPopupWindow(title, visible, x, y, width, height) {
  const widget = getOrCreateWidget('gui_popup_window', title, globalTarget, 'div.gui_root');
  PushParent();
  currentWindowWidget = widget;
  currentWindowIsFloating = false;
  const visibleRef = ensureRef('visible', visible, true);
  // Sentinel: endRender detected win.closed and set active=false while keeping init=true.
  // Clear the visible ref so the caller switches to BeginWindow on the next frame,
  // then reset init and skip this frame (the replacement widget doesn't exist yet).
  if (widget.init && !widget.active) {
    visibleRef(false);
    widget.init = false;
    PopParent();
    return false;
  }
  const xRef = ensureRef('x', x, 0);
  const yRef = ensureRef('y', y, 0);
  const widthRef = ensureRef('width', width, 800);
  const heightRef = ensureRef('height', height, 300);
  if (!widget.init) {
    const windowName = 'tweaks_' + widget.uid;
    const xVal = xRef(), yVal = yRef();
    let features = 'popup,width=' + widthRef() + ',height=' + heightRef();
    if (xVal || yVal) features += ',left=' + xVal + ',top=' + yVal;
    const newWin = window.open('', windowName, features);
    if (!newWin) { widget.active = false; PopParent(); return false; }
    // Remove stale event listeners from previous page contexts, clear body content and reset styles
    const $body = newWin.document.body;
    $body.innerHTML = '';
    const $styles = document.getElementById('gui_styles');
    if ($styles) newWin.document.head.appendChild($styles.cloneNode(true));
    $body.classList.add('gui_root', 'gui_popup_window');
    widget.$content = $body;
    widget.value = newWin;
    widget.active = true;
    widget.init = true;
    newWin.document.title = widget.label || document.title;
    popupDocMap.set(newWin.document, widget);
    newWin.document.addEventListener('keydown', onKeydown);
    newWin.document.addEventListener('keyup', onKeyup);
    newWin.document.addEventListener('pointerdown', onFocusCapture, true);
  }
  // Sync position and size refs from the live window each frame so any user-driven
  // resize or move is remembered for the next open. Position is polled here since
  // browsers provide no 'move' event, so renders are triggered by onFocusCapture.
  // Guard against reading a closed window: Chrome returns 0 for all geometry properties
  // on closed windows, which would corrupt the refs before endRender detects the close.
  const win = /** @type {Window} */(widget.value);
  if (!win.closed) {
    // | 0 truncates to integer: sub-pixel floats on high-DPI would cause ref writes every frame.
    // Use innerWidth/innerHeight to match window.open features (which specify content dimensions).
    const sx = win.screenX | 0, sy = win.screenY | 0;
    const ow = win.innerWidth | 0, oh = win.innerHeight | 0;
    if (xRef() !== sx) xRef(sx);
    if (yRef() !== sy) yRef(sy);
    if (widthRef() !== ow) widthRef(ow);
    if (heightRef() !== oh) heightRef(oh);
    documentStack[++documentStackIndex] = currentDocument;
    currentDocument = win.document;
  } else {
    // Window closed externally but endRender has not detected it yet, skip this frame
    PopParent();
    return false;
  }
  return widget.active;
}

function EndPopupWindow() {
  currentDocument = documentStackIndex >= 0 ? documentStack[documentStackIndex--] : document;
  PopParent();
}

/**
 * @param {string} title
 */
function WindowBar(title) {
  // Capture current window state locally (stable for closure init)
  const isFloating = currentWindowIsFloating;
  const windowWidget = /** @type {Widget} */(currentWindowWidget);
  const yRef = /** @type {Ref} */(currentWindowYRef);
  const xRef = /** @type {Ref} */(currentWindowXRef);
  BeginGroup(title, 'div.row.panel_bar.panel_header');
  const titleWidget = getOrCreateWidget('panel_title', title, globalTarget, 'h2.panel_title');
  if (!titleWidget.init) {
    if (titleWidget.label) parseLabel(titleWidget.$root, titleWidget.label);
    if (isFloating) {
      // n5: use left instead of right
      const useLeft = windowWidget.n5;
      // n6: use bottom instead of top
      const useBottom = windowWidget.n6;
      let moveStartX = 0, moveStartY = 0;
      let moveInitW = 0, moveInitH = 0, moveInitY = 0, moveInitX = 0;
      titleWidget.$root.onpointerdown = (e) => {
        if (windowWidget.anchorParent) return; // anchored windows are not draggable
        const rect = windowWidget.$root.getBoundingClientRect();
        moveInitW = rect.width;
        moveInitH = rect.height;
        moveInitX = useLeft ? rect.left : winW - rect.right;
        moveInitY = useBottom ? winH - rect.bottom : rect.top;
        moveStartX = e.clientX;
        moveStartY = e.clientY;
        e.preventDefault();
        /** @type {HTMLElement} */(e.currentTarget).setPointerCapture(e.pointerId);
      }
      titleWidget.$root.onpointermove = (e) => {
        if (!/** @type {HTMLElement} */(e.currentTarget).hasPointerCapture(e.pointerId)) return;
        // Left: x increases when moving right; Right (default): x decreases when moving right
        let px = useLeft
          ? moveInitX + e.clientX - moveStartX
          : moveInitX - e.clientX + moveStartX;
        // Bottom: y increases when moving up; Top (default): y increases when moving down
        let py = useBottom
          ? moveInitY - e.clientY + moveStartY
          : moveInitY + e.clientY - moveStartY;
        if (py + moveInitH > winH) py = winH - moveInitH;
        if (px + moveInitW > winW) px = winW - moveInitW;
        if (py < 0) py = 0;
        if (px < 0) px = 0;
        px = Math.round(px);
        py = Math.round(py);
        windowWidget.$root.style[useBottom ? 'bottom' : 'top'] = py + 'px';
        windowWidget.$root.style[useLeft ? 'left' : 'right'] = px + 'px';
      }
      titleWidget.$root.onlostpointercapture = () => {
        yRef(Math.round(parseFloat(windowWidget.$root.style[useBottom ? 'bottom' : 'top'])));
        xRef(Math.round(parseFloat(windowWidget.$root.style[useLeft ? 'left' : 'right'])));
        requestRender();
      }
    }
    titleWidget.init = true;
  }
  EndGroup(title);
}

/**
 * @param {string} title
 * @param {boolean} fitContent
 * @param {undefined|boolean|Ref} [visible]
 * @param {undefined|number|Ref} [x]
 * @param {undefined|number|Ref} [y]
 * @param {undefined|number|Ref} [width]
 * @param {undefined|number|Ref} [height]
 * @return {boolean}
 */
function BeginPanel(title = 'GUI', fitContent = true, visible, x, y, width, height) {

  const popupRef = Ref('popup', false);
  const guiScaleRef = Ref('@GuiScale', 1);
  const sv = guiScaleRef();
  if (guiScale !== sv) setScale(sv);
  const settingsRef = Ref('@Settings', false);
  const isPopup = popupRef();
  if (isPopup) {
    const px = Ref('popupX', screen.availWidth - 332);
    const py = Ref('popupY', 0);
    const pw = Ref('popupW', 332);
    const ph = Ref('popupH', screen.availHeight);
    if (!BeginPopupWindow(title, popupRef, px, py, pw, ph)) {
      return false;
    }
  } else {
    BeginWindow(title, fitContent, visible, x, y, width, height);
  }

  const visibleRef = /** @type {Ref} */(currentWindowVisibleRef);
  const heightRef = /** @type {Ref} */(currentWindowHeightRef);
  const yRef = /** @type {Ref} */(currentWindowYRef);
  const isFloating = currentWindowIsFloating;
  const widget = /** @type {Widget} */(currentWindowWidget);

  if (isFloating) {

    if (IsKeyPressed('Escape') && !anchoredStack.length) {
      visibleRef(!visibleRef());
    }

    if (!widget.active) {
      if (ButtonInput('<{menu}>::.width_1')) visibleRef(true);
      EndWindow();
      return false;
    }

    WindowBar(title);
    const tweakInfo = panelTweakInfoMap.get(widget.uid);
    PushParent();
      BeginGroup('rightPanelButtons', 'fieldset.fieldset_input');
        if (tweakInfo) {
          const hasUnsaved = frameUnsavedCount > 0;
          if (hasUnsaved) {
            Html('span.color_fg_1.color_6.padded_left.font_mono.display_flex', frameUnsavedCount);
          } else {
            Html('span.color_fg_9.padded_left.font_mono.display_flex', '');
          }
          AppendParent();
            Icon(hasUnsaved ? '<{dot}>' : '<{tweaks}>');
          PopParent();
        }
        ToggleButtonInput('<{settings}>::.width_1.color_bg_0[title=Settings]', settingsRef);
        if (ButtonInput('<{floating}>::.width_1.color_bg_0[title=Pop out]')) popupRef(true);
      EndGroup('rightPanelButtons');
    PopParent();
    PushParent();
      BeginGroup('leftPanelButtons', 'fieldset.fieldset_input');
        if (ButtonInput('<{close}>::.width_1.color_bg_0[title=Close]')) visibleRef(false);
        if (ButtonInput('<{minus}>::.width_1.color_bg_0[title=Minimize]')) {
          heightRef(panelMinH);
          if (fitContent) {
            widget.$root.style.height = '';
            widget.$root.style.maxHeight = panelMinH + 'px';
          } else {
            widget.$root.style.height = panelMinH + 'px';
          }
        }
        if (ButtonInput('<{plus}>::.width_1.color_bg_0[title=Expand]')) {
          const $r = widget.$root;
          const scrollH = $r.scrollHeight + ($r.offsetHeight - $r.clientHeight);
          let h = scrollH;
          let py = yRef();
          if (py + h > winH) py = winH - h;
          if (py < 0) { py = 0; h = winH; }
          if (h < panelMinH) h = panelMinH;
          yRef(py);
          heightRef(h);
          $r.style[widget.n6 ? 'bottom' : 'top'] = py + 'px';
          if (fitContent) {
            $r.style.height = '';
            $r.style.maxHeight = h + 'px';
          } else {
            $r.style.height = h + 'px';
          }
        }
      EndGroup('leftPanelButtons');
    PopParent();
  } else if (!isPopup) {
    // Non-floating, non-popup panel header
    WindowBar(title);
  }

  // Content group + tweakInfo
  if (widget.active) {
    BeginGroup(title, 'div.col.panel_content');
    const contentWidget = parentWidgetStack[parentStackIndex];
    widget.$content = contentWidget.$root;
    if (settingsRef()) {
      BeginGroup('settings', 'div.row');
        Label('UI Scale');
        BeginToggleGroup('uiScale::.width_full', guiScaleRef);
          ToggleButtonInput('1::"100%"');
          ToggleButtonInput('1.25::"80%"');
          ToggleButtonInput('1.5::"67%"');
          ToggleButtonInput('2::"50%"');
        EndToggleGroup();
      EndGroup('settings');
      VGap('settingsSeparator');
    }
    let tweakInfo = panelTweakInfoMap.get(widget.uid);
    if (!tweakInfo) {
      tweakInfo = { groups: [], content: null, tweakEntries: [], lastGroupCount: 0, tweaksFolderLabel: '', hasFolderOps: false };
      panelTweakInfoMap.set(widget.uid, tweakInfo);
    }
    tweakInfo.content = contentWidget;
  } else {
    PopParent();
  }
  return widget.active;
}

/**
 * @param {LabelKey} [id] Only used to keep track of the closed parent
 */
function EndPanel(id) {
  EndGroup();
  if (currentWindowWidget && currentWindowWidget.type === 'gui_popup_window') {
    // Save the content widget (visible in the popup document) so AnchorName
    // after EndPanel sets the CSS anchor on an element inside the popup.
    // EndPopupWindow would overwrite prevWidget with the popup's orphaned $root.
    const contentWidget = prevWidget;
    EndPopupWindow();
    prevWidget = contentWidget;
  } else {
    PopParent();
  }
}

/**
 * @param {string} label
 * @param {string|Ref} [selected]
 * @return {boolean}
 */
function BeginTabs(label, selected = '') {
  const selectedRef = ensureRef(label, selected, '');
  BeginGroup(label, 'div.col.tabs', selectedRef);
  const widget = getOrCreateWidget('toggle_group', label, selectedRef, 'div.row.tabs_row');
  PushParent();
  PushGroup(widget);
  PopParent();
  return true;
}

/**
 * @param {string} [id] Only used to keep track of the closed parent
 */
function EndTabs(id) {
  PopGroup(); // Pop tabs_row from group stack
  EndGroup(); // Pop tabs from both stacks
}

/**
 * @param {string} label
 * @return {boolean}
 */
function Tab(label) {
  const currentGroup = groupStackIndex >= 0 ? groupWidgetStack[groupStackIndex] : null;
  if (!currentGroup) return false;
  const tabsWidget = parentWidgetStack[parentStackIndex];
  if (!tabsWidget || tabsWidget.elType !== 'div.col.tabs') return false;
  const isFirst = currentGroup.n1++ === 0;
  PushParent(currentGroup);
  prevWidget = groupStackIndex >= 0 ? groupItemWidgetStack[groupStackIndex] : null;
  ToggleButtonInput(label);
  const ref = /** @type {Ref} */(currentGroup.target);
  // Default to first tab if no selection
  if (isFirst && ref.value === '') {
    ref(label);
  }
  if (groupStackIndex >= 0) groupItemWidgetStack[groupStackIndex] = prevWidget;
  PopParent();
  return ref.value === label;
}

/**
 * @param {string} label
 * @param {string|Ref} [selected]
 * @return {boolean}
 */
function BeginToggleGroup(label, selected = '') {
  const selectedRef = ensureRef(label, selected, '');
  const widget = getOrCreateWidget('toggle_group', label, selectedRef, 'fieldset.toggle_group');
  PushParent();
  PushGroup(widget);
  return true;
}

/**
 * @param {LabelKey} [id]
 */
function EndToggleGroup(id) {
  PopParent();
  PopGroup();
}

/**
 * @param {string} label
 * @param {undefined|boolean|Ref} [expanded]
 * @return {boolean}
 */
function BeginFolder(label, expanded) {
  const widget = getOrCreateWidget('folder', label, globalTarget, 'section.col.ui_heading');
  PushParent();
  let active = true;
  if (widget.label) active = Header(label, expanded, widget);
  if (active) {
    BeginGroup('folder_content', 'div.col.folder_content');
  } else {
    PopParent();
  }
  return active;
}

/**
 * @param {LabelKey} [id] Only used to keep track of the closed parent
 */
function EndFolder(id) {
  EndGroup();
  PopParent();
}

/**
 * @param {string} label
 * @param {boolean|Ref} [expanded]
 * @return {boolean}
 */
function BeginFolderHeader(label, expanded) {
  const widget = getOrCreateWidget('folder', label, globalTarget, 'section.col.ui_heading');
  PushParent();
  const active = Header(label, expanded, widget, true);
  widget.value = active; // store for EndFolderHeader
  return active;
}

function EndFolderHeader() {
  EndGroup(); // close header_row — parent is now the folder widget
  const folderWidget = parentWidgetStack[parentStackIndex];
  if (folderWidget.value) {
    BeginGroup('folder_content', 'div.col.folder_content');
  } else {
    PopParent();
  }
}

/** @type {Record<string, import('./state.js').StateProp>} */
let sortNamespace;
/** @param {string} a @param {string} b */
const sortByOrder = (a, b) => (sortNamespace[a].order ?? 0) - (sortNamespace[b].order ?? 0);

/**
 * @param {TweakGroup} tweakGroup
 * @param {string} folderFilter
 * @return {boolean}
 */
function renderTweakGroup(tweakGroup, folderFilter) {
  const { nameSpace, keys } = tweakGroup;
  let changed = false;
  let filterLen = 0;
  if (folderFilter) filterLen = folderFilter.length;
  if (tweakGroup.dirty) {
    sortNamespace = nameSpace;
    keys.sort(sortByOrder);
    tweakGroup.dirty = false;
  }
  /** @type {string|undefined} */
  let prevFolder;
  if (filterLen > 0) PushId(folderFilter);
  for (let i = 0, l = keys.length; i < l; i++) {
    const prop = nameSpace[keys[i]];
    if (!prop || !prop.used) continue;
    const folder = prop.folder;
    // Skip props outside the filtered folder subtree
    if (filterLen > 0) {
      let matched = false;
      if (folder) {
        if (folder.startsWith(folderFilter) && (folder.length === filterLen || folder.charCodeAt(filterLen) === 32)) matched = true;
      }
      if (!matched) {
        const key = keys[i];
        if (key.startsWith(folderFilter) && (key.length === filterLen || key.charCodeAt(filterLen) === 47 || key.charCodeAt(filterLen) === 32)) matched = true;
      }
      if (!matched) continue;
    }
    if (folder !== prevFolder) {
      if (prevFolder !== undefined) EndGroup();
      prevFolder = folder;
      BeginGroup(folder || '_', 'div.col');
      if (folder) {
        const headerLabel = filterLen > 0 ? folder.substring(filterLen + 1) : folder;
        if (headerLabel) Header(headerLabel);
      }
    }
    const labelKey = /** @type {string} */(prop.labelKey);
    const constructor = typeRegistry.get(prop.type);
    const currentFrameCursor = frameCursor;
    if (constructor && constructor(prop, labelKey)) changed = true;
    const rowWidget = currFrameWidgets[currentFrameCursor];
    if (rowWidget) {
      const isUnsaved = prop.value !== prop.saved;
      const isModified = prop.saved !== prop.default;
      // tweakState bits: 0 = unsaved, 1 = modified, 2 = revert button created
      const newState = (isUnsaved ? 1 : 0) | (isModified ? 2 : 0);
      if ((rowWidget.tweakState & 3) !== newState) {
        rowWidget.tweakState = newState | (rowWidget.tweakState & 4);
        rowWidget.$root.classList.toggle('has_unsaved', isUnsaved);
        rowWidget.$root.classList.toggle('has_modified', isModified);
      }
      if (newState && !(rowWidget.tweakState & 4)) {
        const labelEl = rowWidget.$root.firstElementChild;
        if (labelEl) {
          rowWidget.tweakState |= 4;
          const btn = document.createElement('span');
          btn.className = 'tweak_revert';
          btn.appendChild(createIcon('dot'));
          btn.appendChild(createIcon('revert'));
          btn.appendChild(createIcon('cross'));
          btn.onpointerdown = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (prop.value !== prop.saved) {
              prop.value = prop.saved;
            } else {
              prop.value = prop.default;
              prop.saved = prop.default;
              saveTweaks();
            }
            tweakGroup.changed = true;
            requestRender();
          };
          labelEl.prepend(btn);
        }
      }
    }
  }
  if (prevFolder !== undefined) EndGroup();
  if (filterLen > 0) PopId();
  return changed;
}

/**
 * @param {TweakGroup} tweakGroup
 * @param {string} [folderFilter]
 * @return {boolean}
 */
function Tweaks(tweakGroup, folderFilter) {
  const panel = findParentPanel();
  if (panel) {
    const info = panelTweakInfoMap.get(panel.uid);
    if (info) {
      if (info.groups.indexOf(tweakGroup) === -1) {
        info.groups.push(tweakGroup);
      }
      info.tweakEntries.push(0, tweakGroup, folderFilter || '');
      const changed = tweakGroup.changed;
      tweakGroup.changed = false;
      return changed;
    }
  }
  let changed = tweakGroup.changed;
  tweakGroup.changed = false;
  if (tweaksFolderWidget) {
    if (tweakGroup.hasUnsaved()) tweaksFolderWidget.$root.classList.add('has_unsaved');
    return changed;
  }
  if (renderTweakGroup(tweakGroup, folderFilter || '')) changed = true;
  return changed;
}

/**
 * @param {string} label
 * @param {boolean|Ref} [expanded]
 */
function TweaksFolder(label, expanded) {
  const panel = findParentPanel();
  if (panel) {
    const info = panelTweakInfoMap.get(panel.uid);
    if (info) {
      info.tweakEntries.push(1, label, expanded);
      info.hasFolderOps = true;
      return;
    }
  }
  if (tweaksFolderWidget) return;
  if (!BeginFolder(label, expanded)) {
    tweaksFolderWidget = /** @type {Widget} */(prevWidget);
    tweaksFolderWidget.$root.classList.remove('has_unsaved');
  }
}

/**
 * @param {import('./tweaks.js').TweakGroup} tweakGroup
 * @return {boolean}
 */
function TweaksStatusBar(tweakGroup) {
  const panel = findParentPanel();
  if (panel) {
    const info = panelTweakInfoMap.get(panel.uid);
    if (info) {
      if (info.groups.indexOf(tweakGroup) === -1) {
        info.groups.push(tweakGroup);
      }
      const changed = tweakGroup.changed;
      tweakGroup.changed = false;
      return changed;
    }
  }
  return false;
}

function EndTweaksFolder() {
  const panel = findParentPanel();
  if (panel) {
    const info = panelTweakInfoMap.get(panel.uid);
    if (info) {
      info.tweakEntries.push(2);
      return;
    }
  }
  if (tweaksFolderWidget) {
    tweaksFolderWidget = null;
    return;
  }
  EndFolder();
}

function revertToSaved() {
  for (const nsKey in syncedTweaks) {
    const ns = syncedTweaks[nsKey];
    for (const k in ns) ns[k].value = ns[k].saved;
  }
}

/**
 * @param {Object<string, Object<string, Object<string, any>>>} versions
 * @param {string} key
 */
function loadVersion(versions, key) {
  if (key === SAVED) {
    revertToSaved();
  } else {
    const snapshot = versions[key];
    if (snapshot) {
      for (const nsKey in snapshot) {
        const ns = syncedTweaks[nsKey];
        if (!ns) continue;
        const snap = snapshot[nsKey];
        for (const k in snap) {
          if (ns[k]) ns[k].value = snap[k];
        }
      }
    }
  }
}

/** @param {TweakGroup[]} groups */
function markGroupsChanged(groups) {
  for (let g = 0; g < groups.length; g++) groups[g].changed = true;
}

/**
 * @param {{ groups: TweakGroup[], content: Widget|null, tweakEntries: any[], lastGroupCount: number, tweaksFolderLabel: string, hasFolderOps: boolean }} info
 * @param {number} uid
 */
function renderPanelTweaks(info, uid) {
  const content = info.content;
  if (!content || !content.used) { panelTweakInfoMap.delete(uid); return; }
  if (!info.groups.length) return;
  if (tweakVersions === null) {
    const stored = sessionStorage.getItem('tweaks_versions');
    tweakVersions = stored ? JSON.parse(stored) : {};
    for (const k in tweakVersions) tweakVersionList[k] = k;
  }
  const hasUnsaved = frameUnsavedCount > 0;
  content.$root.classList.toggle('has_unsaved', hasUnsaved);
  // Manually set up parent context to inject status bar widgets into the panel's content widget.
  // Can't use SetParent() because it looks up by string id and doesn't reset stack indices.
  parentStackIndex = 2; // Reset stack depth (0 is body root, 1 is panel, 2 is our target parent)
  parentWidgetStack[1] = /** @type {Widget} */(uidWidgetMap.get(uid)); // Include the panel widget so findParentPanel() works
  parentWidgetStack[2] = content; // Set the panel's content widget as the current parent
  prevWidget = null; // No sibling reference, new widgets append at the end of parent
  appendMode = true; // Append after existing children rather than prepending
  groupStackIndex = -1; // Clear any stale group context left by constructors
  if (info.tweakEntries.length > 0) {
    // Recompute label only when group count changes
    if (info.groups.length !== info.lastGroupCount) {
      info.lastGroupCount = info.groups.length;
      info.tweaksFolderLabel = info.groups.length === 1
        ? 'Tweaks::"' + info.groups[0].stateName + '"'
        : 'Tweaks';
    }
    {
      const useFolder = info.hasFolderOps;
      const shouldRender = useFolder ? BeginFolder(info.tweaksFolderLabel, false) : true;
      if (shouldRender) {
        let ei = 0;
        let skipDepth = 0;
        while (ei < info.tweakEntries.length) {
          const op = info.tweakEntries[ei];
          if (op === 0) {
            if (skipDepth === 0) {
              if (renderTweakGroup(info.tweakEntries[ei + 1], info.tweakEntries[ei + 2])) {
                info.tweakEntries[ei + 1].changed = true;
              }
            }
            ei += 3;
          } else if (op === 1) {
            if (skipDepth > 0) {
              skipDepth++;
            } else {
              // Scan contained tweakGroups for unsaved state
              let fUnsaved = false;
              for (let d = 1, si = ei + 3; d > 0 && si < info.tweakEntries.length;) {
                const sop = info.tweakEntries[si];
                if (sop === 0) {
                  if (!fUnsaved) {
                    const ns = info.tweakEntries[si + 1].nameSpace;
                    for (const k in ns) {
                      const p = ns[k];
                      if (p.used && p.value !== p.saved) { fUnsaved = true; break; }
                    }
                  }
                  si += 3;
                } else if (sop === 1) { d++; si += 3; }
                else { d--; si += 1; }
              }
              const expanded = BeginFolder(info.tweakEntries[ei + 1], info.tweakEntries[ei + 2]);
              const fw = expanded ? parentWidgetStack[parentStackIndex - 1] : prevWidget;
              if (fw) fw.$root.classList.toggle('has_unsaved', fUnsaved);
              if (!expanded) skipDepth = 1;
            }
            ei += 3;
          } else {
            if (skipDepth > 0) skipDepth--;
            else EndFolder();
            ei += 1;
          }
        }
        if (useFolder) EndFolder();
      }
      if (useFolder) {
        // Mark the Tweaks folder as unsaved
        /** @type {any} */(prevWidget).$root.classList.toggle('has_unsaved', hasUnsaved);
      }
    }
    info.tweakEntries.length = 0;
    info.hasFolderOps = false;
  }
  BeginGroup('tweaks_status', 'div.row.panel_bar.panel_footer');
  const saveLabel = hasUnsaved ? '<{dot}>SAVE&nbsp;&nbsp;::.color_6.padded_right[title=Save all tweaks (Cmd+S)]' : 'SAVE::[disabled][title=Save all tweaks (Cmd+S)]';
  if (ButtonInput(saveLabel)) {
    for (const nsKey in syncedTweaks) {
      const ns = syncedTweaks[nsKey];
      for (const k in ns) ns[k].saved = ns[k].value;
    }
    flushState();
  }
  if (ButtonInput(hasUnsaved ? 'REVERT::.width_3[title=Revert to last saved values]' : 'REVERT::[disabled].width_3[title=Revert to last saved values]')) {
    revertToSaved();
    markGroupsChanged(info.groups);
  }
  if (ButtonInput(frameNonDefaultCount > 0 ? 'RESET::.width_3[title=Reset to default values]' : 'RESET::[disabled].width_3[title=Reset to default values]')) {
    for (const nsKey in syncedTweaks) {
      const ns = syncedTweaks[nsKey];
      for (const k in ns) ns[k].value = ns[k].default;
    }
    markGroupsChanged(info.groups);
  }
  const versions = /** @type {Object<string, Object<string, Object<string, any>>>} */(tweakVersions);
  if (SelectInput(tweakVersionSelector, 'current::.width_2', tweakVersionList)) {
    const prev = tweakVersionSelector.previous;
    // Save current values back to previous version before switching
    if (prev !== SAVED && versions[prev]) {
      for (const nsKey in syncedTweaks) {
        const ns = syncedTweaks[nsKey];
        const sn = versions[prev][nsKey] || (versions[prev][nsKey] = {});
        for (const k in ns) { if (ns[k].used) sn[k] = ns[k].value; }
      }
      sessionStorage.setItem('tweaks_versions', JSON.stringify(versions));
    }
    tweakVersionSelector.previous = tweakVersionSelector.current;
    loadVersion(versions, tweakVersionSelector.current);
    markGroupsChanged(info.groups);
  }
  const isSaved = tweakVersionSelector.current === SAVED;
  if (ButtonInput(isSaved ? '<{plus}>::tweaks_new_version.width_2[title=Create new version]' : '<{plus}>::tweaks_new_version.width_1[title=Create new version]')) {
    let n = 1;
    while (('V' + n) in versions) n++;
    const name = 'V' + n;
    /** @type {Object<string, Object<string, any>>} */
    const snapshot = {};
    for (const nsKey in syncedTweaks) {
      const ns = syncedTweaks[nsKey];
      /** @type {Object<string, any>} */
      const sn = snapshot[nsKey] = {};
      for (const k in ns) { if (ns[k].used) sn[k] = ns[k].value; }
    }
    versions[name] = snapshot;
    tweakVersionList[name] = name;
    tweakVersionSelector.current = name;
    tweakVersionSelector.previous = name;
    sessionStorage.setItem('tweaks_versions', JSON.stringify(versions));
  }
  if (!isSaved) {
    if (ButtonInput('<{close}>::tweaks_del_version.width_1[title=Delete version]')) {
      const keys = Object.keys(tweakVersionList);
      const idx = keys.indexOf(tweakVersionSelector.current);
      delete versions[tweakVersionSelector.current];
      delete tweakVersionList[tweakVersionSelector.current];
      const prevKey = idx > 0 ? keys[idx - 1] : SAVED;
      tweakVersionSelector.current = prevKey;
      tweakVersionSelector.previous = prevKey;
      loadVersion(versions, prevKey);
      markGroupsChanged(info.groups);
      sessionStorage.setItem('tweaks_versions', JSON.stringify(versions));
    }
  }
  EndGroup('tweaks_status');
}

function beginRender() {
  frameTime = performance.now();
  flushUpdates();
  // Skip clearing rafPending during the force-open pass to prevent widget
  // init code from scheduling extra rAF callbacks that inflate the FPS.
  if (!forceAllFoldersOpen) rafPending = false;
  frameCursor = 0;
  parentStackIndex = 0;
  groupStackIndex = -1;
  prevWidget = null;
  nextAnchorName = '';
  nextAnchorArea = '';
  nextAnchorAlign = '';
  let widget = widgetsList.head;
  while (widget) {
    widget.used = false;
    widget = widget.next;
  }
  for (let i = 0, l = constructors.length; i < l; i++) {
    // Reset parent context so each render callback starts at the body root
    parentStackIndex = 0;
    prevWidget = null;
    appendMode = false;
    currentGlobalId = 0;
    idStackIndex = -1;
    documentStackIndex = -1;
    constructors[i]();
  }
  // Render panel-level tweaks status bars after all constructors
  if (panelTweakInfoMap.size > 0) {
    if (IsKeyDown('Meta') && IsKeyPressed('KeyS', true)) {
      for (const nsKey in syncedTweaks) {
        const ns = syncedTweaks[nsKey];
        for (const k in ns) { ns[k].saved = ns[k].value; }
      }
      flushState();
    }
    frameUnsavedCount = 0;
    frameNonDefaultCount = 0;
    for (const nsKey in syncedTweaks) {
      const ns = syncedTweaks[nsKey];
      for (const k in ns) {
        const prop = ns[k];
        if (prop.used) {
          if (prop.value !== prop.saved) frameUnsavedCount++;
          if (prop.value !== prop.default) frameNonDefaultCount++;
        }
      }
    }
    panelTweakInfoMap.forEach(renderPanelTweaks);
  }
}

function endRender() {
  flushWidgetsValues();
  let widget = widgetsList.head;
  while (widget) {
    const next = widget.next;
    if (!widget.used) {
      widget.removed = true;
      uidWidgetMap.delete(widget.uid);
      widget.$root.remove();
      removeFromList(widget);
      // Remove stale anchored window entries when a widget is recreated (e.g. title/labelKey changes)
      // The old widget stays in anchoredStack blocking subsequent Esc presses.
      const idx = anchoredStack.indexOf(widget);
      if (idx !== -1) anchoredStack.splice(idx, 1);
      if (widget.type === 'lazy_item') {
        /** @type {IntersectionObserver} */(widget.value).unobserve(widget.$root);
        lazyWidgets.delete(widget.$root);
      }
      if (widget.type === 'gui_popup_window' && widget.value) {
        const win = /** @type {Window} */(widget.value);
        if (!win.closed) { popupDocMap.delete(win.document); win.close(); }
      }
    } else if (widget.type === 'gui_popup_window' && widget.value) {
      const win = /** @type {Window} */(widget.value);
      if (win.closed) {
        // Popup closed externally: clean up and leave init=true as a sentinel.
        // Next frame, BeginPopupWindow will see init=true + active=false,
        // clear the caller's visible ref, and return false.
        popupDocMap.delete(win.document);
        widget.value = null;
        widget.$content = widget.$root;
        widget.active = false;
      }
    }
    widget = next;
  }
  const swap = prevFrameWidgets;
  prevFrameWidgets = currFrameWidgets;
  currFrameWidgets = swap;
  pressedKeys.clear();
}

function renderLoop() {
  // First render forces all folders open to initialize nested widgets
  // second render restores normal folder state.
  if (forceAllFoldersOpen) {
    beginRender();
    endRender();
    forceAllFoldersOpen = false;
  }
  beginRender();
  endRender();
}

function renderInterval() {
  if (!rafPending) renderLoop();
}

setInterval(renderInterval, 1000 / FPS);

/** @param {() => void} constructor */
function render(constructor) {
  constructors.push(constructor);
  requestRender();
}

function onWindowResize() {
  /** @type {number} */
  winW = window.innerWidth;
  /** @type {number} */
  winH = window.innerHeight;
  requestRender();
}

/** @param {BeforeUnloadEvent} e */
function onBeforeUnload(e) {
  for (const nsKey in syncedTweaks) {
    const ns = syncedTweaks[nsKey];
    for (const k in ns) {
      const prop = ns[k];
      if (prop.used && prop.value !== prop.saved) {
        e.preventDefault();
        return;
      }
    }
  }
}

/** @param {Event} e */
function onFocusCapture(e) {
  // Sync modifier key state to fix stale Meta on Mac
  // (Cmd keyup sometimes doesn't fire after Cmd+shortcut sequences)
  if (!/** @type {PointerEvent} */(e).metaKey && !/** @type {PointerEvent} */(e).ctrlKey) heldKeys.delete('Meta');
  const el = /** @type {HTMLElement} */(e.target).closest('[id^="gui_"]');
  if (el) currentFocusedElementRef(el.id);
}

/** @param {KeyboardEvent} e */
function onKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyR' && e.view !== window) {
    e.preventDefault();
    window.location.reload();
    return;
  }
  if ((e.metaKey || e.ctrlKey) && preventDefaultKeys.has(e.code)) e.preventDefault();
  if (e.metaKey || e.ctrlKey) {
    pressedKeys.add('Meta');
    heldKeys.add('Meta');
  }
  pressedKeys.add(e.code);
  heldKeys.add(e.code);
  requestRender();
}

/** @param {KeyboardEvent} e */
function onKeyup(e) {
  heldKeys.delete(e.code);
  if (!e.metaKey && !e.ctrlKey) heldKeys.delete('Meta');
  requestRender();
}

function onWindowBlur() {
  heldKeys.clear();
}

/** @param {string} code @param {boolean} [preventDefault] */
function IsKeyPressed(code, preventDefault) {
  if (preventDefault) preventDefaultKeys.add(code);
  return pressedKeys.has(code);
}

/** @param {string} code */
function IsKeyDown(code) {
  return heldKeys.has(code);
}

/** @return {boolean} True when a GUI widget is capturing keyboard input (e.g., text field focused) */
function WantCaptureKeyboard() {
  const el = document.activeElement;
  if (!el) return false;
  if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return !!el.closest('[id^="gui_"]');
  if (el.tagName === 'INPUT') {
    const t = /** @type {HTMLInputElement} */(el).type;
    return (t === 'text' || t === 'number' || t === 'range') && !!el.closest('[id^="gui_"]');
  }
  return false;
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('blur', onWindowBlur);
window.addEventListener('beforeunload', onBeforeUnload);
document.addEventListener('pointerdown', onFocusCapture, true);
document.addEventListener('focusin', onFocusCapture);
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);

export const GUI = {
  Ref,
  SetParent, PushParent, AppendParent, PopParent, PushId, PopId,
  SetPosition, SetPositionPercent, SetDimension, SetDimensionPercent,
  AnchorName, AnchorPosition,
  BeginWindow, EndWindow, BeginPopupWindow, EndPopupWindow, WindowBar,
  BeginPanel, EndPanel,
  BeginGroup, EndGroup, BeginLazyItem, EndLazyItem,
  BeginFolder, EndFolder,
  BeginFolderHeader, EndFolderHeader,
  BeginTabs, EndTabs,
  BeginToggleGroup, EndToggleGroup,
  VSpace, HSpace,
  VGap, HGap,
  Tab,
  Header,
  Label,
  Icon,
  Html,
  TextInput, Text, DisplayTextInput, DisplayText,
  NumberInput, Number, MeasureInput, Measure,
  VectorInput, Vector,
  SliderInput, Slider,
  Point2DArea, Point2DInput, Point2D,
  ScrubberInput, Scrubber,
  SelectInput, Select,
  PlotLineCanvas, PlotLine,
  MonitorCanvas, Monitor,
  ButtonInput, Button,
  ToggleButtonInput, ToggleButton,
  CheckboxInput, Checkbox,
  ColorInput, Color,
  Tweaks, TweaksStatusBar,
  TweaksFolder, EndTweaksFolder,
  IsKeyDown, IsKeyPressed, WantCaptureKeyboard,
  widgetsMap, colors, render, beginRender, endRender, requestRender,
}

// Register built-in tweak type GUI widgets

/**
 * @param {StateProp} prop
 * @param {boolean} [symmetric]
 * @param {number} [minOverride]
 * @param {number} [maxOverride]
 * @param {number} [stepOverride]
 */
function inferNumericBounds(prop, symmetric, minOverride, maxOverride, stepOverride) {
  const v = Math.abs(prop.default) || 1;
  let max, step;
  if (v <= 1)        { max = 1;     step = 0.01; }
  else if (v <= 10)  { max = v * 3;  step = 0.1; }
  else if (v <= 100) { max = v * 3;  step = 1;   }
  else               { max = v * 3;  step = 10;  }
  const neg = prop.default < 0;
  prop.n1 = minOverride != null ? minOverride : (symmetric || neg) ? -max : 0;
  prop.n2 = maxOverride != null ? maxOverride : (neg && !symmetric) ? 0 : max;
  prop.n3 = stepOverride != null ? stepOverride : step;
}

registerTypeGUI('Float', (prop, labelKey) => {
  if (prop.n1 === undefined || isNaN(prop.n1)) inferNumericBounds(prop);
  return GUI.Number(prop, labelKey, prop.n1, prop.n2, prop.n3);
});

registerTypeGUI('Int', (prop, labelKey) => {
  if (prop.n1 === undefined || isNaN(prop.n1)) {
    inferNumericBounds(prop);
    if (/** @type {number} */(prop.n2) < 1) prop.n2 = 1;
  }
  return GUI.Number(prop, labelKey, prop.n1, prop.n2, 1);
});

registerTypeGUI('Num', (prop, labelKey) => {
  // Init: extract unit suffix from saved value or default, infer bounds from numeric part
  if (!prop.s1 && typeof prop.value !== 'number') {
    // Prefer saved value's unit over default's (user may have changed it)
    const unitSrc = typeof prop.value === 'string' ? prop.value : (typeof prop.default === 'string' ? prop.default : '');
    prop.s1 = unitSrc ? unitSrc.slice((`${parseFloat(unitSrc)}`).length) : '';
    if (prop.n1 === undefined || isNaN(prop.n1)) {
      const origDefault = prop.default;
      prop.default = parseFloat(origDefault) || 0;
      inferNumericBounds(prop);
      prop.default = origDefault;
    }
  }
  // Slider writes numeric values; re-append the cached unit
  if (typeof prop.value === 'number' && prop.s1) {
    prop.value = prop.value + prop.s1;
  }
  const active = GUI.Measure(prop, labelKey, prop.n1, prop.n2, prop.n3);
  // Update cached unit on blur (committed by MeasureInput)
  if (active && typeof prop.value === 'string') {
    prop.s1 = prop.value.slice((`${parseFloat(prop.value)}`).length);
  }
  return active;
});

registerTypeGUI('Str', (prop, labelKey) => GUI.Text(prop, labelKey));
registerTypeGUI('Bool', (prop, labelKey) => GUI.Checkbox(prop, labelKey));
registerTypeGUI('Color', (prop, labelKey) => GUI.Color(prop, labelKey));
registerTypeGUI('Select', (prop, labelKey) => {
  const list = /** @type {Record<string, any>|Array<any>} */(prop.list);
  const isArr = Array.isArray(list);
  if (isArr) {
    const idx = list.indexOf(prop.value);
    if (idx !== -1) prop.value = idx;
  }
  const changed = GUI.Select(prop, labelKey, list);
  if (isArr) {
    const i = +prop.value;
    if (i >= 0 && i < list.length) prop.value = list[i];
  }
  return changed;
});
