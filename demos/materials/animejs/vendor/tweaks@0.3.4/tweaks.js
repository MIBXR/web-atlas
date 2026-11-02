import { typeRegistry, syncedTweaks, sortedKeys, saveTweaks, syncTweaks, nextOrder } from './state.js';

export { syncTweaks, saveTweaks };

/**
 * @typedef {import('./state.js').TweakRegister} TweakRegister
 * @typedef {import('./state.js').StateProp} StateProp
 * @typedef {import('./state.js').StateTarget} StateTarget
 * @typedef {import('./gui.js').Ref} Ref
 */

/** @type {Map<string, TweakGroup>} */
const groups = new Map();

/**
 * @typedef {Object} TweakGroupMethods - Built-in type methods, added dynamically by registerType
 * @property {(key: string, defaultValue?: number, min?: number, max?: number, step?: number) => number} Float
 * @property {(key: string, defaultValue?: number, min?: number, max?: number) => number} Int
 * @property {(key: string, defaultValue?: string) => string} Str
 * @property {(key: string, defaultValue?: boolean) => boolean} Bool
 * @property {(key: string, defaultValue?: string) => string} Color
 */

/**
 * @typedef {TweakGroupBase & TweakGroupMethods & {[key: string]: any}} TweakGroup
 */

/**
 * @param {TweakGroup} tweakGroup
 * @param {string} key
 * @param {TweakRegister} params
 */
function register(tweakGroup, key, params) {
  const { type, defaultValue, n1, n2, n3, n4, n5, n6, n7, list } = params;
  const nameSpace = tweakGroup.nameSpace;
  // Add getters / setters so group.key reads/writes nameSpace[key].value
  if (!(key in tweakGroup)) {
    Object.defineProperty(tweakGroup, key, {
      get() { return this.nameSpace[key].value; },
      set(v) {
        this.nameSpace[key].value = v;
        this.dirty = true;
      },
      enumerable: true,
    });
  }
  const slashIdx = key.lastIndexOf(' / ');
  const leafName = slashIdx !== -1 ? key.substring(slashIdx + 3) : key;
  const folder = slashIdx !== -1 ? key.substring(0, slashIdx) : '';
  let prop = nameSpace[key];
  if (!prop) {
    nameSpace[key] = {
      type,
      labelKey: `value::"${leafName}"`,
      folder,
      value: defaultValue,
      default: defaultValue,
      saved: defaultValue,
      used: true,
      order: nextOrder(),
      n1,
      n2,
      n3,
      n4,
      n5,
      n6,
      n7,
      s1: '',
      list,
    }
    tweakGroup.keys.push(key);
    tweakGroup.dirty = true;
    saveTweaks();
    return defaultValue;
  }
  prop.used = true;
  prop.folder = folder;
  const newOrder = nextOrder();
  if (prop.order !== newOrder) {
    prop.order = newOrder;
    tweakGroup.dirty = true;
  }
  if (prop.type !== type) {
    prop.type = type;
    prop.value = defaultValue;
    prop.saved = defaultValue;
    prop.default = defaultValue;
    saveTweaks();
    return defaultValue;
  }
  if (defaultValue !== prop.default) {
    prop.value = defaultValue;
    prop.default = defaultValue;
    prop.saved = defaultValue;
    saveTweaks();
  }
  if (n1 !== undefined) prop.n1 = n1;
  if (n2 !== undefined) prop.n2 = n2;
  if (n3 !== undefined) prop.n3 = n3;
  if (n4 !== undefined) prop.n4 = n4;
  if (n5 !== undefined) prop.n5 = n5;
  if (n6 !== undefined) prop.n6 = n6;
  if (n7 !== undefined) prop.n7 = n7;
  if (list !== undefined) prop.list = list;
  return prop.value;
}

class TweakGroupBase {
  /**
   * @param {string} stateName
   * @param {Record<string, StateProp>} nameSpace
   * @param {string[]} keys
   */
  constructor(stateName, nameSpace, keys) {
    this.stateName = stateName;
    this.nameSpace = nameSpace;
    this.keys = keys;
    this.dirty = false;
    this.isTweakGroup = true;
    this.changed = false;
  }
  /** Register a pre-built type descriptor, e.g. group.add('x', Float(0, 0, 100))
   * @param {string} key
   * @param {TweakRegister} params
   */
  add(key, params) {
    return register(/** @type {TweakGroup} */(/** @type {any} */(this)), key, params);
  }
  /** @param {string} [filter] */
  hasKeys(filter) {
    if (!this.keys.length) return false;
    if (!filter) return true;
    const ks = this.keys, ns = this.nameSpace, fl = filter.length;
    for (let i = 0, l = ks.length; i < l; i++) {
      const k = ks[i];
      if (!ns[k]) continue;
      if (k.startsWith(filter) && (k.length === fl || k[fl] === '/' || k[fl] === ' ')) return true;
    }
    return false;
  }
  /** @param {string} [filter] */
  hasUnsaved(filter) {
    const ks = this.keys;
    const ns = this.nameSpace;
    for (let i = 0, l = ks.length; i < l; i++) {
      const p = ns[ks[i]];
      if (!p || !p.used || p.value === p.saved) continue;
      if (!filter) return true;
      const fl = filter.length;
      const k = ks[i];
      if (k.startsWith(filter) && (k.length === fl || k[fl] === '/' || k[fl] === ' ')) return true;
    }
    return false;
  }
}

/** @param {string} stateName */
function createNamespace(stateName) {
  if (!syncedTweaks[stateName]) syncedTweaks[stateName] = {};
  if (!sortedKeys[stateName]) sortedKeys[stateName] = [];
  return /** @type {TweakGroup} */(new TweakGroupBase(stateName, syncedTweaks[stateName], sortedKeys[stateName]));
}

/**
 * @param {string} name
 * @param {Record<string, TweakRegister | Record<string, TweakRegister>>} [schema]
 */
export function createTweaks(name, schema) {
    let group = groups.get(name);
    if (!group) {
      group = createNamespace(name);
      groups.set(name, group);
    }
    if (schema) {
      for (const key in schema) {
        const entry = schema[key];
        if (entry && typeof entry === 'object' && !entry.type) {
          // Nested plain object = auto-folder
          if (!(key in group)) {
            const subObj = {};
            for (const subKey in entry) {
              const fullKey = key + '/' + subKey;
              Object.defineProperty(subObj, subKey, {
                get() { return group.nameSpace[fullKey].value; },
                set(v) { group.nameSpace[fullKey].value = v; group.dirty = true; },
                enumerable: true,
              });
            }
            Object.defineProperty(group, key, { value: subObj, enumerable: true });
          }
          const nested = /** @type {Record<string, TweakRegister>} */(entry);
          for (const subKey in nested) {
            register(group, key + '/' + subKey, nested[subKey]);
          }
        } else {
          register(group, key, /** @type {TweakRegister} */(entry));
        }
      }
    }
  return group;
}

/**
 * @param {string} typeName
 * @param {any} typeDefault
 * @return {(...args: any[]) => TweakRegister}
 */
export function registerType(typeName, typeDefault) {
    /** @type {(...args: any[]) => TweakRegister} */
    const paramsFactory = (defaultValue = typeDefault, ...ns) => ({
      type: typeName, defaultValue, n1: ns[0], n2: ns[1], n3: ns[2], n4: ns[3], n5: ns[4], n6: ns[5], n7: ns[6]
    });
    /** @type {any} */ (TweakGroupBase.prototype)[typeName] =
    /** @this {TweakGroup} @param {string} key @param {...any} args */
    function(key, ...args) {
      // Fast getter: no extra args and key already exists
      if (args.length === 0 && this.nameSpace[key]) {
        const prop = this.nameSpace[key];
        prop.used = true;
        const newOrder = nextOrder();
        if (prop.order !== newOrder) {
          prop.order = newOrder;
          this.dirty = true;
        }
        return prop.value;
      }
      return register(this, key, paramsFactory(...args));
    };
  return paramsFactory;
}

/**
 * @param {string} typeName
 * @param {(prop: StateProp, labelKey: string) => boolean} constructorFn
 */
export function registerTypeGUI(typeName, constructorFn) {
  typeRegistry.set(typeName, constructorFn);
}

export const Float = registerType('Float', 0);
export const Int = registerType('Int', 0);
export const Num = registerType('Num', 0);
export const Str = registerType('Str', '');
export const Bool = registerType('Bool', false);
export const Color = registerType('Color', 'rgb(0, 0, 0)');

/**
 * @param {Array<any>|Record<string, any>} options
 * @param {any} [defaultValue]
 * @return {TweakRegister}
 */
export function Select(options, defaultValue) {
  if (defaultValue === undefined) {
    if (Array.isArray(options)) {
      defaultValue = options[0];
    } else {
      for (const k in options) { defaultValue = k; break; }
    }
  }
  return { type: 'Select', defaultValue, list: options };
}
