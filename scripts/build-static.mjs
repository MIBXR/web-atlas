import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {loadMaterials} from './build-materials.mjs';
import {buildAssetSources, loadAssetSources, serializeAssetSources} from './build-asset-sources.mjs';
import {assertRepositoryLineEndings} from './check-line-endings.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, 'dist');
export const files = ['index.html', 'cases.html', 'patterns.html', 'materials.html', 'lab.html', 'agent.html', 'docs.html', 'asset-cache-worker.js', 'README.md', 'CONTRIBUTING.md', 'AGENTS.md'];
const runtimeFiles = ['data/asset-sources.js', 'site/runtime/asset-runtime.js', 'site/runtime/asset-cache.js', 'asset-cache-worker.js', 'site/runtime/case-loading.js', 'site/runtime/case-loading.css'];
export const folders = ['site', 'data', 'demos', 'entries', 'previews', 'prompts', 'docs', 'agent', 'scripts/templates'];
const localOrigin = 'https://design-atlas.invalid';

function localReference(value, documentPath) {
  const trimmed = value.trim().replace(/&amp;/g, '&');
  if (!trimmed || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(trimmed)) return null;
  try {
    const url = new URL(trimmed, localOrigin + '/' + documentPath);
    if (url.origin !== localOrigin) return null;
    return {canonical:decodeURIComponent(url.pathname.slice(1)), suffix:url.search + url.hash};
  } catch { return null; }
}

export function rewriteAssetURL(value, documentPath, sources) {
  const reference = localReference(value, documentPath);
  const asset = reference && sources.assets[reference.canonical];
  return asset ? asset.url + reference.suffix : value;
}

export function rewriteCSS(text, documentPath, sources) {
  return text.replace(/url\(\s*(?:(["'])((?:\\.|(?!\1)[\s\S])*?)\1|([^"')]*))\s*\)/gi, (whole, quote, quoted, bare) => {
    const value = quote ? quoted : bare.trim();
    const rewritten = rewriteAssetURL(value, documentPath, sources);
    return rewritten === value ? whole : `url(${quote || '"'}${rewritten}${quote || '"'})`;
  });
}

// URL/descriptor boundaries preserve data URLs, which can contain commas.
export function rewriteSrcset(text, documentPath, sources) {
  let position = 0;
  let last = 0;
  let result = '';
  while (position < text.length) {
    while (position < text.length && /[\s,]/.test(text[position])) position++;
    const start = position;
    while (position < text.length && !/\s/.test(text[position])) position++;
    let end = position;
    while (end > start && text[end - 1] === ',') end--;
    if (end > start) {
      result += text.slice(last, start) + rewriteAssetURL(text.slice(start, end), documentPath, sources);
      last = end;
    }
    if (end < position) continue;
    let parentheses = 0;
    while (position < text.length) {
      const character = text[position++];
      if (character === '(') parentheses++;
      if (character === ')') parentheses = Math.max(0, parentheses - 1);
      if (character === ',' && !parentheses) break;
    }
  }
  return result + text.slice(last);
}

function rewriteTag(tag, documentPath, sources) {
  return tag.replace(/(\b(?:srcset|src|poster|href|style)\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/gi, (whole, prefix, double, single, bare) => {
    const quote = double !== undefined ? '"' : single !== undefined ? "'" : '';
    const value = double ?? single ?? bare;
    const decoded = value.replace(/&(?:amp|quot|apos|lt|gt|#x[\da-f]+|#\d+);/gi, entity => {
      const named = {'&amp;':'&', '&quot;':'"', '&apos;':"'", '&lt;':'<', '&gt;':'>'};
      if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
      const code = entity[2].toLowerCase() === 'x' ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    });
    const attribute = prefix.trim().split(/\s*=/)[0].toLowerCase();
    const rewritten = attribute === 'style' ? rewriteCSS(decoded, documentPath, sources) : attribute === 'srcset' ? rewriteSrcset(decoded, documentPath, sources) : rewriteAssetURL(decoded, documentPath, sources);
    if (decoded === rewritten) return whole;
    const delimiter = quote || '"';
    const escaped = rewritten.replace(/&/g, '&amp;').replace(delimiter === '"' ? /"/g : /'/g, delimiter === '"' ? '&quot;' : '&#39;');
    return prefix + delimiter + escaped + delimiter;
  });
}

export function rewriteHTML(text, documentPath, sources) {
  return text.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<(?:[^>"']|"[^"]*"|'[^']*')+>/gi, token => {
    if (token.startsWith('<!--')) return token;
    if (/^<script\b/i.test(token)) return token.replace(/^<script\b[^>]*>/i, tag => rewriteTag(tag, documentPath, sources));
    if (/^<style\b/i.test(token)) return token.replace(/(^<style\b[^>]*>)([\s\S]*)(<\/style\s*>$)/i, (_, open, css, close) => rewriteTag(open, documentPath, sources) + rewriteCSS(css, documentPath, sources) + close);
    return rewriteTag(token, documentPath, sources);
  });
}

function injectAssets(text, documentPath, assetsMode) {
  const directory = path.posix.dirname(documentPath);
  const relative = name => path.posix.relative(directory === '.' ? '' : directory, name) || name;
  const hasRuntime = /<script\b[^>]*\bsrc\s*=\s*["'][^"']*asset-runtime\.js["']/i.test(text);
  const scripts = hasRuntime ? '' : `<script src="${relative('data/asset-sources.js')}"></script><script src="${relative('site/runtime/asset-runtime.js')}"></script>`;
  const setup = `<script data-atlas-assets>window.AtlasAssetMode=${JSON.stringify(assetsMode === 'github' ? 'github' : 'auto')};</script>${scripts}`;
  if (!/<head\b[^>]*>/i.test(text)) throw new Error('Asset runtime requires a head element: ' + documentPath);
  // Resolve the library theme before asset loading can delay the first paint.
  const head = /<head\b[^>]*>[\s\S]*?<\/head\s*>/i.exec(text)?.[0] || '';
  const themeBoot = /<script src="[^"]*\/(?:theme|theme-boot)\.js"><\/script>/i.exec(head)?.[0];
  if (themeBoot) return text.replace(themeBoot, themeBoot + setup);
  return text.replace(/<head\b[^>]*>/i, head => head + setup);
}

export function prepareStatic(assetsMode = 'local') {
  assertRepositoryLineEndings(root);
  if (!['local', 'github'].includes(assetsMode)) throw new Error('Asset mode must be local or github.');
  if (path.relative(root, output) !== 'dist' || fs.lstatSync(output, {throwIfNoEntry:false})?.isSymbolicLink()) throw new Error('Static output must be the real dist directory inside this repository.');
  const includedRuntime = runtimeFiles.filter(name => fs.existsSync(path.join(root, name)));
  const runtimeReady = includedRuntime.includes('site/runtime/asset-runtime.js') && includedRuntime.includes('data/asset-sources.js');
  if (assetsMode === 'github' && !runtimeReady) throw new Error('GitHub mode requires data/asset-sources.js and site/runtime/asset-runtime.js in the source checkout.');
  const snapshotPaths = loadMaterials({root}).filter(material => material.snapshotPath).map(material => material.snapshotPath);
  // Hosted HTML/CSS is rewritten for playback, and Markdown gains a UTF-8 BOM.
  // Agent source must come from the original Git bytes, not those display files.
  const revision = spawnSync('git', ['rev-parse', 'HEAD'], {cwd:root, encoding:'utf8'});
  const clean = spawnSync('git', ['status', '--porcelain'], {cwd:root, encoding:'utf8'});
  const sourceCommit = revision.stdout?.trim();
  if (revision.status !== 0 || clean.status !== 0 || clean.stdout.trim() || !/^[a-f\d]{40}$/.test(sourceCommit)) throw new Error('Commit the verified source before static packaging so Agent source URLs identify the exact original bytes.');
  const sources = assetsMode === 'github' ? buildAssetSources(root, sourceCommit) : includedRuntime.includes('data/asset-sources.js') ? loadAssetSources() : {assets:{}};
  fs.rmSync(output, {recursive:true, force:true});
  fs.mkdirSync(output);
  const omitted = new Set(assetsMode === 'github' ? Object.keys(sources.assets) : []);
  let omittedBytes = 0;
  for (const name of [...files, ...folders]) {
    fs.cpSync(path.join(root, name), path.join(output, name), {recursive:true, filter:source => {
      const info = fs.lstatSync(source);
      if (path.basename(source) === '.git' || !info.isDirectory() && !info.isFile()) throw new Error('Static content cannot contain Git metadata, links or special files: ' + source);
      const canonical = path.relative(root, source).split(path.sep).join('/');
      if (omitted.has(canonical)) { omittedBytes += sources.assets[canonical].bytes; return false; }
      return true;
    }});
  }
  if (assetsMode === 'github') {
    fs.writeFileSync(path.join(output, 'data/asset-sources.js'), serializeAssetSources(sources), 'utf8');
  }
  let markedDocuments = 0;
  let totalBytes = 0;
  let rewrittenDocuments = 0;
  function finalize(directory) {
    for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
      const target = path.join(directory, item.name);
      if (item.isDirectory()) finalize(target);
      else if (item.isFile()) {
        const canonical = path.relative(output, target).split(path.sep).join('/');
        if (snapshotPaths.some(prefix => canonical.startsWith(prefix)) && !/\.(?:html|css)$/.test(item.name)) {
          totalBytes += fs.statSync(target).size;
          continue;
        }
        if (item.name.endsWith('.html') || item.name.endsWith('.css')) {
          const original = fs.readFileSync(target, 'utf8');
          let text = original;
          if (assetsMode === 'github') text = item.name.endsWith('.html') ? rewriteHTML(text, canonical, sources) : rewriteCSS(text, canonical, sources);
          if (runtimeReady && item.name.endsWith('.html')) text = injectAssets(text, canonical, assetsMode);
          if (text !== original) { fs.writeFileSync(target, text, 'utf8'); rewrittenDocuments++; }
        } else if (item.name.endsWith('.md')) {
          const bytes = fs.readFileSync(target);
          if (!bytes.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]))) fs.writeFileSync(target, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), bytes]));
          markedDocuments++;
        }
        totalBytes += fs.statSync(target).size;
      }
    }
  }
  finalize(output);
  const catalogPath = path.join(output, 'agent', 'catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  catalog.source = {repository:'MIBXR/web-atlas', commit:sourceCommit, baseUrl:`https://raw.githubusercontent.com/MIBXR/web-atlas/${sourceCommit}/`};
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  if (fs.existsSync(path.join(output, '.git'))) throw new Error('Git metadata cannot be served.');
  console.log(`Prepared dist (${assetsMode} assets): ${totalBytes} bytes (${(totalBytes / 1024 / 1024).toFixed(3)} MiB).`);
  console.log(`Omitted ${omitted.size} byte-preserved media assets (${omittedBytes} bytes); rewrote ${rewrittenDocuments} HTML/CSS documents. Executable libraries and full local source assets remain in the checkout.`);
  console.log(`Marked ${markedDocuments} deployed Markdown documents as UTF-8; tracked source files unchanged.`);
  return {assetsMode, totalBytes, omittedAssets:omitted.size, omittedBytes, rewrittenDocuments};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argumentsList = process.argv.slice(2);
  if (argumentsList.some(value => !/^--assets=(?:local|github)$/.test(value)) || argumentsList.length > 1) throw new Error('Usage: node scripts/build-static.mjs [--assets=local|github]');
  prepareStatic(argumentsList[0]?.split('=')[1] || 'local');
}
