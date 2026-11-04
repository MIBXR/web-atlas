import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const categories = ['视觉构成', '交互反馈', '滚动叙事', '导航与状态', '加载与媒体', '内容组织'];
const experienceTypes = ['visual', 'micro-motion', 'page-motion', 'sound', 'structure'];
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function repositoryFile(root, relative, mustExist = true) {
  if (typeof relative !== 'string' || !relative || /[\\\0<>:"|?*]/.test(relative) || path.posix.isAbsolute(relative) || path.win32.isAbsolute(relative) || relative.split('/').some(p => !p || p === '.' || p === '..' || /[. ]$/.test(p) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p))) throw new Error(`Unsafe pattern path: ${relative}`);
  let current = path.resolve(root);
  if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${current}`);
  for (const component of relative.split('/')) {
    current = path.join(current, component);
    const info = fs.lstatSync(current, { throwIfNoEntry: false });
    if (info?.isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`);
    if (!info && mustExist) throw new Error(`Missing pattern file: ${relative}`);
  }
  return current;
}

function textFile(root, relative) {
  const absolute = repositoryFile(root, relative);
  if (!fs.lstatSync(absolute).isFile()) throw new Error(`Expected regular pattern file: ${relative}`);
  return new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(absolute));
}

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing pattern text: ${label}`);
}
function textArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`Expected pattern array: ${label}`);
  value.forEach((item, i) => requireText(item, `${label}/${i}`));
  if (new Set(value).size !== value.length) throw new Error(`Duplicate pattern value: ${label}`);
}

export function loadPatterns({ root = defaultRoot, entries } = {}) {
  if (!entries) entries = fs.readdirSync(repositoryFile(root, 'entries/cases')).filter(n => n.endsWith('.json')).map(n => JSON.parse(textFile(root, `entries/cases/${n}`)));
  const directory = repositoryFile(root, 'entries/patterns');
  const cases = new Map(entries.map(e => [e.id, e]));
  const patterns = fs.readdirSync(directory).filter(n => n.endsWith('.json')).sort().map(name => {
    const p = JSON.parse(textFile(root, `entries/patterns/${name}`));
    if (typeof p.id !== 'string' || !idPattern.test(p.id) || name !== p.id + '.json') throw new Error(`Pattern filename/id mismatch: ${name}`);
    for (const key of ['title', 'category', 'summary', 'mechanism', 'effect', 'prompt']) requireText(p[key], `${p.id}.${key}`);
    if (p.trigger !== undefined) requireText(p.trigger, `${p.id}.trigger`);
    if (!categories.includes(p.category)) throw new Error(`Unknown pattern category: ${p.id}`);
    if (p.experienceTypes !== undefined) {
      textArray(p.experienceTypes, `${p.id}.experienceTypes`);
      if (!p.experienceTypes.length) throw new Error(`Empty pattern experience types: ${p.id}`);
      if (p.experienceTypes.some(type => !experienceTypes.includes(type))) throw new Error(`Unknown pattern experience type: ${p.id}`);
    }
    for (const key of ['useCases', 'avoid', 'constraints', 'sourceFiles']) textArray(p[key], `${p.id}.${key}`);
    if (!p.useCases.length || !p.constraints.length || !p.sourceFiles.length) throw new Error(`Empty pattern guidance: ${p.id}`);
    if (!['foundation', 'support', 'accent'].includes(p.composition?.role)) throw new Error(`Unknown composition role: ${p.id}`);
    if (p.composition.notes !== undefined) requireText(p.composition.notes, `${p.id}.composition.notes`);
    for (const key of ['pairsWellWith', 'conflicts']) textArray(p.composition[key], `${p.id}.composition.${key}`);
    if (!Array.isArray(p.parameters)) throw new Error(`Expected parameters array: ${p.id}`);
    for (const parameter of p.parameters) for (const key of ['name', 'value', 'note']) requireText(parameter[key], `${p.id}.parameters.${key}`);
    if (!Array.isArray(p.sources) || !p.sources.length) throw new Error(`Missing provenance: ${p.id}`);
    const sourceKeys = new Set();
    for (const source of p.sources) {
      const entry = cases.get(source.caseId);
      if (!entry) throw new Error(`Unknown pattern source case: ${p.id}/${source.caseId}`);
      for (const key of ['locator', 'observation']) requireText(source[key], `${p.id}.sources.${key}`);
      if (!['observed', 'adapted', 'inferred'].includes(source.evidence)) throw new Error(`Unknown evidence kind: ${p.id}`);
      const [relative, pointer] = source.locator.split('#');
      const original = textFile(root, relative);
      if (!p.sourceFiles.includes(relative)) throw new Error(`Locator absent from sourceFiles: ${p.id}/${relative}`);
      const provenanceKey = source.caseId + ':' + source.locator;
      if (sourceKeys.has(provenanceKey)) throw new Error(`Duplicate pattern source: ${p.id}`);
      sourceKeys.add(provenanceKey);
      if (!pointer) throw new Error(`Pattern locator must identify a field or document section: ${p.id}`);
      if (relative.endsWith('.json')) {
        let value = JSON.parse(original);
        for (const component of pointer.split('/').filter(Boolean)) {
          const key = component.replace(/~1/g, '/').replace(/~0/g, '~');
          value = value && Object.hasOwn(value, key) ? value[key] : undefined;
        }
        if (value === undefined) throw new Error(`Unknown pattern JSON locator: ${source.locator}`);
        const observation = typeof value === 'string' ? value : JSON.stringify(value);
        if (source.observation !== observation) throw new Error(`Stale pattern observation: ${p.id}/${source.locator}. Recheck extraction against the updated source.`);
      } else if (relative.endsWith('.md') && !original.includes(pointer)) throw new Error(`Unknown pattern document section: ${source.locator}`);
      if (source.capturedAt !== undefined && (source.capturedAt !== entry.capturedAt || !/^\d{4}-\d{2}-\d{2}$/.test(source.capturedAt))) throw new Error(`Pattern snapshot date differs from case: ${p.id}`);
      if (source.referenceUrl !== undefined && !/^https?:\/\//.test(source.referenceUrl)) throw new Error(`Invalid pattern reference URL: ${p.id}`);
    }
    for (const relative of p.sourceFiles) {
      const absolute = repositoryFile(root, relative);
      if (!fs.lstatSync(absolute).isFile()) throw new Error(`Pattern source is not a file: ${relative}`);
    }
    return p;
  });
  const ids = new Set(patterns.map(p => p.id));
  if (ids.size !== patterns.length || !patterns.length) throw new Error('Duplicate or empty pattern library');
  if (new Set(patterns.map(p => p.title)).size !== patterns.length) throw new Error('Duplicate pattern title; merge shared mechanisms');
  for (const p of patterns) for (const key of ['pairsWellWith', 'conflicts']) for (const id of p.composition[key]) if (!ids.has(id) || id === p.id) throw new Error(`Invalid pattern relationship: ${p.id}/${id}`);
  return patterns.sort((a, b) => a.order - b.order);
}

export function buildPatterns({ root = defaultRoot, patterns, caseRecords, caseBundles, write = true } = {}) {
  patterns ??= loadPatterns({ root });
  if (!caseRecords || !caseBundles) {
    const catalog = JSON.parse(textFile(root, 'agent/catalog.json'));
    caseRecords = catalog.entries;
    caseBundles = caseRecords.map(record => JSON.parse(textFile(root, record.paths.bundle)));
  }
  const recordsById = new Map(caseRecords.map(record => [record.id, record]));
  const bundlesById = new Map(caseBundles.map(bundle => [bundle.id, bundle]));
  const outputs = new Map();
  const bundles = [];
  const records = patterns.map(pattern => {
    const sourceCases = [...new Set(pattern.sources.map(s => s.caseId))].sort().map(id => {
      const record = recordsById.get(id);
      if (!record) throw new Error(`Pattern source record missing: ${id}`);
      return { id, title: record.title, paths: { bundle: record.paths.bundle, demo: record.paths.demo } };
    });
    for (const source of pattern.sources) {
      const relative = source.locator.split('#')[0];
      if (!bundlesById.get(source.caseId)?.files.some(file => file.path === relative)) throw new Error(`Pattern locator is outside its stated source case: ${pattern.id}/${source.caseId}/${relative}`);
    }
    for (const relative of pattern.sourceFiles) if (!sourceCases.some(source => bundlesById.get(source.id)?.files.some(file => file.path === relative))) throw new Error(`Pattern source cannot be verified through its case manifest: ${pattern.id}/${relative}`);
    const prompt = `prompts/patterns/${pattern.id}.md`;
    const research = `docs/patterns/${pattern.id}.md`;
    const documentPaths = [prompt, ...(fs.existsSync(path.join(root, research)) ? [research] : [])];
    const documents = documentPaths.map(relative => ({path:relative, role:relative === prompt ? 'prompt' : 'research', content:textFile(root, relative)}));
    const files = new Map(sourceCases.flatMap(source => bundlesById.get(source.id).files).map(file => [file.path, file]));
    for (const relative of [`entries/patterns/${pattern.id}.json`, ...documentPaths]) files.set(relative, {path:relative, role:'context'});
    if (pattern.preview) {
      repositoryFile(root, pattern.preview);
      files.set(pattern.preview, {path:pattern.preview, role:'preview'});
    }
    const bundle = { schemaVersion: 1, id: pattern.id, pattern, sourceCases, documents, files:[...files.values()].sort((a,b) => a.path.localeCompare(b.path)) };
    const relative = `agent/patterns/${pattern.id}.json`;
    const bytes = encode(bundle);
    outputs.set(relative, bytes);
    bundles.push(bundle);
    return { ...pattern, paths: { bundle: relative } };
  });
  const catalog = { schemaVersion: 1, patternCount: records.length, repository: 'https://github.com/MIBXR/web-atlas', patterns: records };
  outputs.set('agent/patterns/index.json', encode(catalog));
  outputs.set('data/patterns.js', Buffer.from('window.ATLAS_PATTERNS = ' + JSON.stringify(patterns, null, 2) + ';\n', 'utf8'));
  if (write) {
    fs.mkdirSync(repositoryFile(root, 'agent/patterns', false), { recursive: true });
    for (const [relative, bytes] of outputs) fs.writeFileSync(repositoryFile(root, relative, false), bytes);
    for (const name of fs.readdirSync(repositoryFile(root, 'agent/patterns'))) if (name.endsWith('.json') && !outputs.has(`agent/patterns/${name}`)) fs.unlinkSync(repositoryFile(root, `agent/patterns/${name}`));
  }
  return { catalog, bundles, outputs };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(`Built ${buildPatterns().catalog.patternCount} curated design patterns.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
