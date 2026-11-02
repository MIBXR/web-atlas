import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const materialTypes = ['component-library', 'image', 'sound', 'font', 'poster', 'agent-skill', 'prompt-kit'];
const summaryFields = ['id', 'title', 'type', 'category', 'summary', 'tags', 'useCases', 'avoid', 'constraints'];
const isLicense = relative => /\/(?:LICENSE[^/]*|OFL[^/]*|[^/]*-(?:LICENSE|OFL)\.txt|reacticle-MIT-declaration\.txt|dependencies\.txt)$/i.test(relative);

function repositoryFile(root, relative, mustExist = true) {
  if (typeof relative !== 'string' || !relative || /[\\\0<>:"|?*]/.test(relative) || path.posix.isAbsolute(relative) || path.win32.isAbsolute(relative) || relative.split('/').some(part => !part || part === '.' || part === '..' || /[. ]$/.test(part) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) throw new Error(`Unsafe material path: ${relative}`);
  let current = path.resolve(root);
  if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${current}`);
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    const info = fs.lstatSync(current, { throwIfNoEntry: false });
    if (info?.isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`);
    if (!info && mustExist) throw new Error(`Missing material file: ${relative}`);
  }
  return current;
}

function readFile(root, relative) {
  const absolute = repositoryFile(root, relative);
  if (!fs.lstatSync(absolute).isFile()) throw new Error(`Expected regular material file: ${relative}`);
  return fs.readFileSync(absolute);
}

function text(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing material text: ${label}`);
}

function textArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`Expected material array: ${label}`);
  value.forEach((item, index) => text(item, `${label}/${index}`));
  if (new Set(value).size !== value.length) throw new Error(`Duplicate material value: ${label}`);
}

function walkFiles(root, relative) {
  return fs.readdirSync(repositoryFile(root, relative)).sort().flatMap(name => {
    const child = `${relative}/${name}`;
    const stat = fs.lstatSync(repositoryFile(root, child));
    if (stat.isDirectory()) return walkFiles(root, child);
    if (!stat.isFile()) throw new Error(`Unsupported material file: ${child}`);
    return [child];
  });
}

export function loadMaterials({ root = defaultRoot } = {}) {
  const directory = repositoryFile(root, 'entries/materials', false);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort().map(name => {
    const material = JSON.parse(readFile(root, `entries/materials/${name}`));
    if (!idPattern.test(material.id) || name !== `${material.id}.json`) throw new Error(`Material filename/id mismatch: ${name}`);
    for (const key of ['title', 'type', 'category', 'summary', 'prompt', 'research']) text(material[key], `${material.id}.${key}`);
    for (const key of ['tags', 'useCases', 'avoid', 'constraints', 'sourceFiles']) textArray(material[key], `${material.id}.${key}`);
    if (!material.useCases.length || !material.constraints.length || !material.sourceFiles.length) throw new Error(`Empty material guidance: ${material.id}`);
    if (!materialTypes.includes(material.type)) throw new Error(`Unknown material type: ${material.id}/${material.type}`);
    for (const key of ['url', 'verifiedAt']) text(material.upstream?.[key], `${material.id}.upstream.${key}`);
    for (const key of ['repository', 'version', 'commit']) if (material.upstream[key] !== undefined) text(material.upstream[key], `${material.id}.upstream.${key}`);
    if (!/^https?:\/\//.test(material.upstream.url) || !/^\d{4}-\d{2}-\d{2}$/.test(material.upstream.verifiedAt) || material.upstream.commit !== undefined && !/^[a-f0-9]{40}$/.test(material.upstream.commit)) throw new Error(`Invalid material snapshot: ${material.id}`);
    for (const key of ['name', 'url', 'scope', 'notes']) text(material.license?.[key], `${material.id}.license.${key}`);
    for (const key of ['keyboard', 'reducedMotion']) text(material.accessibility?.[key], `${material.id}.accessibility.${key}`);
    if (!Array.isArray(material.sources) || !material.sources.length) throw new Error(`Missing material provenance: ${material.id}`);
    for (const source of material.sources) {
      for (const key of ['title', 'url', 'note']) text(source[key], `${material.id}.sources.${key}`);
      if (!/^https?:\/\//.test(source.url)) throw new Error(`Invalid material source URL: ${material.id}`);
    }
    const contentPath = `demos/materials/${material.id}`;
    if (material.snapshotPath !== undefined) {
      if (material.snapshotPath !== contentPath + '/') throw new Error(`Unexpected material snapshot path: ${material.id}`);
      text(material.snapshotEntry, `${material.id}.snapshotEntry`);
      readFile(root, material.snapshotPath + material.snapshotEntry);
    }
    if (material.type === 'agent-skill') {
      if (material.snapshotEntry !== 'SKILL.md') throw new Error(`Expected SKILL.md entry: ${material.id}`);
      textArray(material.workflow, `${material.id}.workflow`);
      if (!material.workflow.length || material.workflow.some(step => !/[\u3400-\u9fff]/.test(step))) throw new Error(`Expected Chinese skill workflow: ${material.id}`);
      if (!Array.isArray(material.relatedEntries)) throw new Error(`Expected skill related entries: ${material.id}`);
      for (const related of material.relatedEntries) {
        const directory = {case:'entries/cases', material:'entries/materials', pattern:'entries/patterns'}[related.kind];
        if (!['case', 'material', 'pattern'].includes(related.kind) || !idPattern.test(related.id)) throw new Error(`Invalid skill related entry: ${material.id}`);
        text(related.note, `${material.id}.relatedEntries.note`);
        if (JSON.parse(readFile(root, `${directory}/${related.id}.json`)).id !== related.id) throw new Error(`Unknown skill related entry: ${material.id}/${related.id}`);
      }
      if (material.gallery !== undefined) {
        if (!Array.isArray(material.gallery)) throw new Error(`Expected skill gallery: ${material.id}`);
        for (const picture of material.gallery) {
          if (!['work', 'style', 'theme'].includes(picture.kind)) throw new Error(`Invalid skill gallery kind: ${material.id}`);
          text(picture.caption, `${material.id}.gallery.caption`);
          if (picture.replicated !== false) throw new Error(`Skill gallery must declare replicated: false: ${material.id}`);
          readFile(root, picture.path);
          if (picture.replicaPage !== undefined) readFile(root, picture.replicaPage.split('?')[0]);
        }
      }
    }
    if (!material.snapshotPath) {
      if (!material.demo?.startsWith(contentPath + '/')) throw new Error(`Unexpected material demo path: ${material.id}`);
      if (!Array.isArray(material.demos) || !material.demos.length) throw new Error(`Missing interactive material demos: ${material.id}`);
      if (new Set(material.demos.map(demo => demo.id)).size !== material.demos.length) throw new Error(`Duplicate material demo: ${material.id}`);
    }
    for (const demo of material.demos || []) {
      for (const key of ['id', 'title', 'summary', 'entrypoint']) text(demo[key], `${material.id}.demos.${key}`);
      repositoryFile(root, demo.entrypoint.split(/[?#]/)[0]);
      if (demo.parameters !== undefined) {
        if (!Array.isArray(demo.parameters)) throw new Error(`Expected material parameters: ${material.id}/${demo.id}`);
        for (const parameter of demo.parameters) for (const key of ['name', 'value', 'note']) text(parameter[key], `${material.id}/${demo.id}.${key}`);
      }
    }
    for (const relative of [material.demo, material.preview, material.research, ...material.sourceFiles].filter(relative => relative !== undefined)) repositoryFile(root, relative);
    return material;
  }).sort((a, b) => a.order - b.order);
}

export function buildMaterials({ root = defaultRoot, materials, write = true } = {}) {
  materials ??= loadMaterials({ root });
  const outputs = new Map();
  const bundles = [];
  const records = materials.map(material => {
    const contentFiles = walkFiles(root, `demos/materials/${material.id}`);
    const documentPaths = [material.research, `prompts/materials/${material.id}.md`, ...contentFiles.filter(relative => relative.endsWith('.md') || isLicense(relative))];
    const documents = [...new Set(documentPaths)].map(relative => {
      const bytes = readFile(root, relative);
      new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      return { path: relative, role: relative === material.research ? 'research' : relative === `prompts/materials/${material.id}.md` ? 'prompt' : isLicense(relative) ? 'license' : relative.includes('/source/') ? 'process' : relative.endsWith('/fidelity.md') ? 'fidelity' : 'context', content: bytes.toString('utf8') };
    });
    const sharedSources = material.sourceFiles.filter(relative => relative === 'site/shared/theme.js');
    const paths = new Set([`entries/materials/${material.id}.json`, material.preview, ...(material.demo ? ['site/runtime/demo-scrollbars.css'] : []), ...sharedSources, ...documentPaths, ...contentFiles, ...(material.gallery || []).flatMap(picture => [picture.path, picture.replicaPage?.split('?')[0]].filter(Boolean))]);
    const files = [...paths].sort().map(relative => {
      const role = relative === material.preview ? 'preview' : isLicense(relative) ? 'license' : relative.includes('/source/') ? 'process' : material.sourceFiles.includes(relative) ? 'source' : relative.includes('/fonts/') ? 'font' : relative.includes('/vendor/') && !documentPaths.includes(relative) ? 'vendor' : documentPaths.includes(relative) || relative === `entries/materials/${material.id}.json` || /\.(?:md|txt|json)$/i.test(relative) ? 'context' : /\.(?:html|js|mjs|css|svg)$/i.test(relative) ? 'source' : 'asset';
      return { path: relative, role };
    });
    for (const relative of material.sourceFiles) if (!files.some(file => file.path === relative)) throw new Error(`Material source is outside its source manifest: ${material.id}/${relative}`);
    for (const demo of material.demos || []) if (!files.some(file => file.path === demo.entrypoint.split(/[?#]/)[0] && file.role === 'source')) throw new Error(`Material demo is outside its source manifest: ${material.id}/${demo.id}`);
    const bundle = { schemaVersion: 1, id: material.id, material, documents, files, sourceFiles: material.sourceFiles };
    const relative = `agent/materials/${material.id}.json`;
    const bytes = encode(bundle);
    outputs.set(relative, bytes);
    bundles.push(bundle);
    return { ...Object.fromEntries(summaryFields.map(key => [key, material[key]])), paths: { bundle: relative, demo: material.demo, snapshot: material.snapshotPath, snapshotEntry: material.snapshotEntry, entry: `entries/materials/${material.id}.json`, preview: material.preview } };
  });
  const catalog = { schemaVersion: 1, repository: 'https://github.com/MIBXR/web-atlas', materialCount: records.length, materials: records };
  outputs.set('agent/materials/index.json', encode(catalog));
  outputs.set('data/materials.js', Buffer.from('window.ATLAS_MATERIALS = ' + JSON.stringify(materials, null, 2) + ';\n', 'utf8'));
  if (write) {
    fs.mkdirSync(repositoryFile(root, 'agent/materials', false), { recursive: true });
    for (const [relative, bytes] of outputs) fs.writeFileSync(repositoryFile(root, relative, false), bytes);
    for (const name of fs.readdirSync(repositoryFile(root, 'agent/materials'))) if (name.endsWith('.json') && !outputs.has(`agent/materials/${name}`)) fs.unlinkSync(repositoryFile(root, `agent/materials/${name}`));
  }
  return { catalog, bundles, outputs };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(`Built ${buildMaterials().catalog.materialCount} source-backed materials.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
