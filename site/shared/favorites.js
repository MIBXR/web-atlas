(() => {
  'use strict';
  const key = 'web-atlas-favorites';
  const format = 'web-atlas-favorites';
  const valid = {
    cases: new Set((window.ATLAS_CASES || []).map(entry => entry.id)),
    patterns: new Set((window.ATLAS_PATTERNS || []).map(pattern => pattern.id)),
    materials: new Set((window.ATLAS_MATERIALS || []).map(material => material.id)),
  };
  const clean = (kind, ids) => [...new Set(ids.filter(id => typeof id === 'string' && valid[kind].has(id)))];
  const listeners = new Set();
  let state = { cases: [], patterns: [], materials: [] }, persisted = true, error = '';
  function readBackup(value) {
    const data = typeof value === 'string' ? JSON.parse(value) : value;
    if (data?.format === format && Array.isArray(data.cases) && Array.isArray(data.patterns) && Array.isArray(data.materials)) {
      return { cases: clean('cases', data.cases), patterns: clean('patterns', data.patterns), materials: clean('materials', data.materials) };
    }
    throw new Error('格式错误，请选择导出的收藏 JSON 文件。');
  }
  try {
    const value = localStorage.getItem(key);
    if (value !== null) state = readBackup(value);
  } catch {
    persisted = false; error = '无法读取本地收藏，可导入备份恢复。';
  }
  const payload = () => ({ format, cases: [...state.cases], patterns: [...state.patterns], materials: [...state.materials] });
  function notify() {
    listeners.forEach(listener => listener({ persisted, error }));
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(payload()));
      persisted = true; error = '';
    } catch {
      persisted = false; error = '未能完整保存本地收藏，本次修改保留在当前页面。请导出备份。';
    }
    notify();
    return persisted;
  }
  const api = {
    has: (kind, id) => state[kind].includes(id),
    ids: kind => [...state[kind]],
    toggle(kind, id) {
      if (!valid[kind].has(id)) return { selected: false, persisted };
      const selected = !api.has(kind, id);
      state[kind] = selected ? [...state[kind], id] : state[kind].filter(value => value !== id);
      return { selected, persisted: save() };
    },
    exportBackup: payload,
    importBackup(value) {
      const incoming = readBackup(value);
      const added = {};
      for (const kind of ['cases', 'patterns', 'materials']) {
        const merged = [...new Set([...state[kind], ...incoming[kind]])];
        added[kind] = merged.length - state[kind].length;
        state[kind] = merged;
      }
      return { added, total: { cases: state.cases.length, patterns: state.patterns.length, materials: state.materials.length }, persisted: save() };
    },
    subscribe(listener) {
      listeners.add(listener); listener({ persisted, error });
      return () => listeners.delete(listener);
    },
  };
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    try {
      state = event.newValue === null ? { cases: [], patterns: [], materials: [] } : readBackup(event.newValue);
      persisted = true; error = ''; notify();
    } catch {
      persisted = false; error = '无法读取另一页面的收藏更新，当前收藏仍保留。'; notify();
    }
  });
  window.AtlasFavorites = api;
})();
