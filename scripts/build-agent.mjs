import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderDetailNotes } from './detail-notes.mjs';
import { loadPatterns, buildPatterns } from './build-patterns.mjs';
import { loadMaterials, buildMaterials } from './build-materials.mjs';
import { assertRepositoryLineEndings } from './check-line-endings.mjs';

export const repository = 'https://github.com/MIBXR/web-atlas';
export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const catalogFields = ['id', 'title', 'category', 'tags', 'summary', 'useCases', 'avoid', 'country', 'implementation', 'studyScope', 'capturedAt', 'theoryVerifiedAt', 'tokens', 'composition', 'interaction', 'themeBehavior', 'soundBehavior'];
const sharedFiles = ['data/asset-sources.js', 'site/runtime/asset-runtime.js', 'site/runtime/asset-cache.js', 'site/runtime/demo-scrollbars.css', 'asset-cache-worker.js', 'site/runtime/case-loading.css', 'site/runtime/case-loading.js', 'site/icons/favicon.svg', 'docs.html', 'site/app/theme-boot.js', 'site/app/domain/case-notes.mjs'];

// Public paths always use the repository's portable, relative path syntax.
// Check every existing component rather than trusting a lexical prefix alone.
export function resolveRepositoryPath(root, relative, { mustExist = true } = {}) {
  if (typeof relative !== 'string' || !relative || /[\\\0<>:"|?*]/.test(relative) || path.posix.isAbsolute(relative) || path.win32.isAbsolute(relative) || relative.split('/').some(part => !part || part === '.' || part === '..' || /[. ]$/.test(part) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) {
    throw new Error(`Unsafe repository path: ${relative}`);
  }
  const absoluteRoot = path.resolve(root);
  const rootStat = fs.lstatSync(absoluteRoot);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error(`Repository root must be a real directory: ${absoluteRoot}`);
  const target = path.resolve(absoluteRoot, ...relative.split('/'));
  if (path.relative(absoluteRoot, target).startsWith('..' + path.sep) || target === absoluteRoot) throw new Error(`Path escapes repository: ${relative}`);
  let current = absoluteRoot;
  for (const component of relative.split('/')) {
    current = path.join(current, component);
    if (!fs.existsSync(current)) {
      // existsSync follows symlinks, including broken ones: inspect with lstat too.
      try { if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (mustExist) throw new Error(`Missing repository file: ${relative}`);
      continue;
    }
    if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`);
  }
  return target;
}

function readFile(root, relative) {
  const absolute = resolveRepositoryPath(root, relative);
  if (!fs.lstatSync(absolute).isFile()) throw new Error(`Expected a regular file: ${relative}`);
  return fs.readFileSync(absolute);
}

function readText(root, relative) {
  const bytes = readFile(root, relative);
  // Reject lossy decoding; documents must preserve the exact original UTF-8 text.
  new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  return bytes.toString('utf8');
}

function walkFiles(root, relative) {
  const absolute = resolveRepositoryPath(root, relative);
  const result = [];
  for (const name of fs.readdirSync(absolute).sort()) {
    const child = relative + '/' + name;
    const stat = fs.lstatSync(resolveRepositoryPath(root, child));
    if (stat.isDirectory()) result.push(...walkFiles(root, child));
    else if (stat.isFile()) result.push(child);
    else throw new Error(`Unsupported filesystem object: ${child}`);
  }
  return result;
}

function fileRole(relative, entry, documentPaths) {
  if (relative.includes('/source/')) return 'process';
  if (/(?:^|\/)(?:LICENSE[^/]*|THIRD-PARTY-NOTICES[^/]*|[^/]*-LICENSE\.txt|[^/]*-OFL\.txt)$/.test(relative)) return 'license';
  if (relative.startsWith('site/client/')) return relative.endsWith('.LEGAL.txt') ? 'license' : 'vendor';
  if (relative.startsWith('site/app/')) return 'context';
  if (relative.includes('/fonts/')) return 'font';
  if (relative.includes('/vendor/')) return 'vendor';
  if (documentPaths.has(relative) || relative === `entries/cases/${entry.id}.json` || /\.(?:md|txt|json)$/i.test(relative)) return 'context';
  if (relative === entry.preview || relative === entry.referencePreview || relative.startsWith('previews/')) return 'preview';
  if (relative.includes('/assets/')) return 'asset';
  return /\.(?:html|js|mjs|css)$/i.test(relative) ? 'source' : 'asset';
}

function documentRecord(root, relative, role) {
  return { path: relative, role, content: readText(root, relative) };
}

function makeBundle(root, entry, entryPath, patternIds = []) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) throw new Error(`Invalid case id: ${entry.id}`);
  if (entryPath !== `entries/cases/${entry.id}.json`) throw new Error(`Entry filename does not match id: ${entryPath}`);
  if (entry.demo !== `demos/cases/${entry.id}/index.html`) throw new Error(`Unexpected demo path for ${entry.id}: ${entry.demo}`);
  const definitions = [
    [entry.research, 'research'],
    [`prompts/cases/${entry.id}.md`, 'prompt'],
    [entry.fidelity, 'fidelity'],
    [entry.assetManifest, 'asset-manifest'],
  ].filter(([relative]) => relative !== undefined);
  const licenses = `demos/cases/${entry.id}/LICENSES.md`;
  if (fs.existsSync(path.join(root, licenses))) definitions.push([licenses, 'license']);
  const documents = definitions.map(([relative, role]) => documentRecord(root, relative, role));
  const documentPaths = new Set(documents.map(doc => doc.path));
  const paths = new Set([
    ...walkFiles(root, `demos/cases/${entry.id}`),
    entryPath, ...documentPaths, entry.preview,
    ...sharedFiles,
    ...walkFiles(root, 'site/client'),
    // Small shared renderer dependencies and their original license notices.
    ...walkFiles(root, 'site/vendor'),
  ]);
  if (entry.referencePreview) paths.add(entry.referencePreview);
  const mobilePreview = `previews/cases/${entry.id}-mobile.jpg`;
  const mobilePath = resolveRepositoryPath(root, mobilePreview, { mustExist: false });
  if (fs.existsSync(mobilePath)) paths.add(mobilePreview);
  const files = [...paths].sort().map(relative => ({ path: relative, role: fileRole(relative, entry, documentPaths) }));
  return { schemaVersion: 1, id: entry.id, entry, patternIds, documents, files };
}

export function buildAgent({ root = defaultRoot, write = true } = {}) {
  assertRepositoryLineEndings(root);
  const entryDirectory = resolveRepositoryPath(root, 'entries/cases');
  const entries = fs.readdirSync(entryDirectory).filter(name => name.endsWith('.json')).sort().map(name => {
    const entryPath = 'entries/cases/' + name;
    return { entryPath, entry: JSON.parse(readText(root, entryPath)) };
  }).sort((a, b) => a.entry.order - b.entry.order || a.entry.id.localeCompare(b.entry.id, 'en'));
  if (!entries.length) throw new Error('No entries found');
  if (new Set(entries.map(({ entry }) => entry.id)).size !== entries.length) throw new Error('Duplicate case ids');
  const bundles = [];
  const outputs = new Map();
  const originalEntries = entries.map(({ entry }) => entry);
  const patterns = loadPatterns({ root, entries: originalEntries });
  const records = entries.map(({ entry, entryPath }) => {
    const patternIds = patterns.filter(pattern => pattern.sources.some(source => source.caseId === entry.id)).map(pattern => pattern.id);
    const bundle = makeBundle(root, entry, entryPath, patternIds);
    const { notes } = renderDetailNotes({ entries: originalEntries, patterns, id: entry.id });
    bundle.webNotes = { format: 'text/html', renderer: 'site/app/domain/case-notes.mjs', content: notes };
    const bundlePath = `agent/cases/${entry.id}.json`;
    const data = encode(bundle);
    outputs.set(bundlePath, data);
    bundles.push(bundle);
    const record = Object.fromEntries(catalogFields.filter(key => entry[key] !== undefined).map(key => [key, entry[key]]));
    record.paths = { bundle: bundlePath, preview: entry.preview, demo: entry.demo, entry: entryPath };
    return record;
  });
  const patternData = patterns.length ? buildPatterns({ root, patterns, caseRecords: records, caseBundles: bundles, write: false }) : null;
  if (patternData) for (const [relative, bytes] of patternData.outputs) outputs.set(relative, bytes);
  const materials = loadMaterials({ root });
  const materialData = materials.length ? buildMaterials({ root, materials, write: false }) : null;
  if (materialData) for (const [relative, bytes] of materialData.outputs) outputs.set(relative, bytes);
  const catalog = { schemaVersion: 1, entryCount: records.length, repository, entries: records };
  if (patternData) {
    catalog.patterns = { path: 'agent/patterns/index.json', patternCount: patterns.length };
  }
  if (materialData) {
    catalog.materials = { path: 'agent/materials/index.json', materialCount: materials.length };
  }
  outputs.set('agent/cases/index.json', encode({schemaVersion:1, repository, entryCount:records.length, entries:records}));
  catalog.cases = {path:'agent/cases/index.json', entryCount:records.length};
  outputs.set('agent/catalog.json', encode(catalog));
  if (write) {
    fs.rmSync(resolveRepositoryPath(root, 'agent'), {recursive:true, force:true});
    // Check the destination before creating directories or replacing any bytes.
    fs.mkdirSync(resolveRepositoryPath(root, 'agent/cases', { mustExist: false }), { recursive: true });
    if (patternData) fs.mkdirSync(resolveRepositoryPath(root, 'agent/patterns', { mustExist: false }), { recursive: true });
    if (materialData) fs.mkdirSync(resolveRepositoryPath(root, 'agent/materials', { mustExist: false }), { recursive: true });
    for (const [relative, data] of outputs) fs.writeFileSync(resolveRepositoryPath(root, relative, { mustExist: false }), data);
    const casesPath = resolveRepositoryPath(root, 'agent/cases');
    for (const name of fs.readdirSync(casesPath)) {
      const relative = `agent/cases/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) {
        const absolute = resolveRepositoryPath(root, relative);
        if (!fs.lstatSync(absolute).isFile()) throw new Error(`Unexpected generated path: ${relative}`);
        fs.unlinkSync(absolute);
      }
    }
    if (patternData) for (const name of fs.readdirSync(resolveRepositoryPath(root, 'agent/patterns'))) {
      const relative = `agent/patterns/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) fs.unlinkSync(resolveRepositoryPath(root, relative));
    }
    if (materialData) for (const name of fs.readdirSync(resolveRepositoryPath(root, 'agent/materials'))) {
      const relative = `agent/materials/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) fs.unlinkSync(resolveRepositoryPath(root, relative));
    }
  }
  return { catalog, bundles, patternCatalog: patternData?.catalog, patternBundles: patternData?.bundles || [], materialCatalog: materialData?.catalog, materialBundles: materialData?.bundles || [], outputs };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { catalog } = buildAgent();
    console.log(`Built Agent catalog and ${catalog.entryCount} case bundles.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
