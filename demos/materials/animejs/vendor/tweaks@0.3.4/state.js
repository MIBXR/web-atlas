/**
 * @import {Ref} from './gui.js'
 */

/**
 * @typedef {{ __path__: string, data: Object } | 'localStorage'} StateTarget
 */

/**
 * @typedef  {Object} StateProp
 * @property {string} type
 * @property {*} value
 * @property {*} [saved] - Runtime only, set by hydrateTweaks()
 * @property {*} [default]
 * @property {string} [labelKey] - Runtime only, set by hydrateTweaks() or register()
 * @property {string} [folder] - Runtime only, folder prefix for nested keys ('' = no folder)
 * @property {boolean} [used] - Runtime only, tracks if registered this frame
 * @property {number} [order] - Runtime only, registration order for GUI sorting
 * @property {number} [n1] - Runtime only, set by register()
 * @property {number} [n2] - Runtime only, set by register()
 * @property {number} [n3] - Runtime only, set by register()
 * @property {number} [n4] - Runtime only, set by register()
 * @property {number} [n5] - Runtime only, set by register()
 * @property {number} [n6] - Runtime only, set by register()
 * @property {number} [n7] - Runtime only, set by register()
 * @property {string} [s1] - Runtime only, string slot for custom types
 * @property {Record<string, any>|Array<any>} [list] - Runtime only, select options for GUI rendering
 */

/**
 * @typedef  {Object} TweakRegister
 * @property {string} type
 * @property {any} defaultValue
 * @property {number} [n1]
 * @property {number} [n2]
 * @property {number} [n3]
 * @property {number} [n4]
 * @property {number} [n5]
 * @property {number} [n6]
 * @property {number} [n7]
 * @property {Record<string, any>|Array<any>} [list]
 */

/**
 * @typedef  {Object} StateFile
 * @property {string} __path__
 * @property {Record<string, Record<string, StateProp>>} [data]
 */

/** @type {string} */
const TWEAKS_STORAGE_KEY = 'tweaks_state';
/** @type {string} */
const LOCAL_STORAGE_KEY = 'tweaks_gui';
/** @type {number} */
const DEBOUNCE_TIMER = 150;
/** @type {Map<string, (prop: StateProp, labelKey: string) => boolean>} */
const typeRegistry = new Map();
/** @type {Record<string, string[]>} */
const sortedKeys = {};
/** @type {string} */
let statePath = '/state.js';
/** @type {Record<string, Record<string, StateProp>>} */
let syncedTweaks = {};
/** @type {boolean | null} */
let isDev = null;
/** @type {boolean} */
let pendingSave = false;
/** @type {'server' | 'localStorage'} */
let stateStorage = 'server';
/** @type {Record<number, Record<string, Ref>>} */
let localState = {};
/** @type {number} */
let orderCounter = 0;
/** @type {number} */
let localSaveTimeout = 0;
/** @type {number} */
let stateSaveTimeout = 0;

function loadLocal() {
  try {
    const stored = sessionStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) localState = JSON.parse(stored);
  } catch (e) { console.warn('[tweaks] loadLocal failed:', e); }
}

// Removes stale scopes from localState before saving to prevent storage quota overflow.
// Active refs created by GUI.Ref() have _isRef = true, while deserialized refs from
// previous sessions don't — so scopes with no _isRef entries are safe to discard.
function pruneLocalState() {
  for (const scopeId in localState) {
    const scope = localState[scopeId];
    let hasActiveRef = false;
    for (const key in scope) {
      if (scope[key] && scope[key]._isRef) { hasActiveRef = true; break; }
    }
    if (!hasActiveRef) delete localState[scopeId];
  }
}

function saveLocalStorage() {
  clearTimeout(localSaveTimeout);
  localSaveTimeout = 0;
  try {
    pruneLocalState();
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localState));
  } catch (e) { console.warn('[tweaks] saveLocalStorage failed:', e); }
}

function saveLocal() {
  clearTimeout(localSaveTimeout);
  localSaveTimeout = window.setTimeout(saveLocalStorage, DEBOUNCE_TIMER);
}

loadLocal();

/** @return {number} */
function nextOrder() {
  return orderCounter++;
}

// Hydrate loaded state with runtime properties
function hydrateTweaks() {
  for (const nsKey in syncedTweaks) {
    const nameSpace = syncedTweaks[nsKey];
    sortedKeys[nsKey] = [];
    for (const key in nameSpace) {
      const raw = nameSpace[key];
      const slashIdx = key.lastIndexOf('/');
      nameSpace[key] = {
        type: raw.type,
        labelKey: `value::"${slashIdx !== -1 ? key.substring(slashIdx + 1) : key}"`,
        folder: slashIdx !== -1 ? key.substring(0, slashIdx) : '',
        value: raw.value,
        default: raw.default,
        saved: raw.value,
        used: false,
        order: NaN,
        n1: NaN,
        n2: NaN,
        n3: NaN,
        n4: NaN,
        n5: NaN,
        n6: NaN,
        n7: NaN,
        s1: '',
        list: undefined,
      };
      sortedKeys[nsKey].push(key);
    }
  }
}

/**
 * Mark props as unused after sync completes.
 * Props loaded from file but not registered will have used=undefined.
 * They stay in the file but are hidden from GUI until re-registered.
 */
function markUnusedProps() {
  for (const nsKey in syncedTweaks) {
    const nameSpace = syncedTweaks[nsKey];
    for (const key in nameSpace) {
      if (nameSpace[key].used === undefined) nameSpace[key].used = false;
    }
  }
  // Removed because it cases tweaks rows order to change when updating the value
  // orderCounter = 0; // Reset for next registration cycle
}

function flushState() {
  clearTimeout(stateSaveTimeout);
  stateSaveTimeout = 0;
  if (isDev === false) return;
  if (isDev === null) { pendingSave = true; return; }
  /** @type {Record<string, Record<string, StateProp>>} */
  const data = {};
  for (const nsKey in syncedTweaks) {
    const nameSpace = syncedTweaks[nsKey];
    const out = /** @type {Record<string, StateProp>} */({});
    for (const k in nameSpace) {
      const p = nameSpace[k];
      const savedValue = p.saved ?? p.value;
      // Only persist values that differ from their defaults
      if (savedValue === p.default) continue;
      out[k] = /** @type {StateProp} */({ type: p.type, value: savedValue, default: p.default });
    }
    if (Object.keys(out).length) data[nsKey] = out;
  }
  if (stateStorage === 'localStorage') {
    try { localStorage.setItem(TWEAKS_STORAGE_KEY, JSON.stringify(data)); } catch {}
  } else {
    fetch('/__tweaks__/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ __path__: statePath, data })
    }).catch(() => {});
  }
}

function saveTweaks() {
  clearTimeout(stateSaveTimeout);
  stateSaveTimeout = window.setTimeout(flushState, DEBOUNCE_TIMER);
}

/**
 * @param {StateTarget} stateObj
 */
function syncTweaks(stateObj) {
  if (stateObj === 'localStorage') {
    stateStorage = 'localStorage';
    isDev = true;
    try {
      const stored = localStorage.getItem(TWEAKS_STORAGE_KEY);
      if (stored) syncedTweaks = JSON.parse(stored);
    } catch {}
    hydrateTweaks();
    requestAnimationFrame(markUnusedProps);
    return;
  }
  stateStorage = 'server';
  statePath = stateObj.__path__;
  if (stateObj.data) {
    syncedTweaks = /** @type {Record<string, Record<string, StateProp>>} */(stateObj.data);
    hydrateTweaks();
  }
  requestAnimationFrame(markUnusedProps);
  fetch('/__tweaks__/ping')
    .then(res => {
      isDev = res.ok;
      if (isDev && pendingSave) { pendingSave = false; saveTweaks(); }
    })
    .catch(() => { isDev = false; });
}

export {
  typeRegistry,
  syncedTweaks,
  sortedKeys,
  localState,
  saveLocal,
  saveTweaks,
  flushState,
  syncTweaks,
  nextOrder,
}
