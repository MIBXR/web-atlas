import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const [cacheArg, workArg] = process.argv.slice(2);
if (!cacheArg || !workArg) throw new Error('Usage: node source/localize.mjs <cache-directory> <work-directory>');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = path.resolve(cacheArg);
const work = path.resolve(workArg);
fs.mkdirSync(cache, {recursive:true});
fs.mkdirSync(work, {recursive:true});
const requestFile = path.join(cache, 'requests.json');
const replacementFile = path.join(work, 'replacements.json');
const requests = fs.existsSync(requestFile) ? JSON.parse(fs.readFileSync(requestFile, 'utf8')) : {};
const replacements = fs.existsSync(replacementFile) ? JSON.parse(fs.readFileSync(replacementFile, 'utf8')) : [];
const known = new Set(replacements.map(row => JSON.stringify(row)));
const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36';
const purpose = 'WebAtlasHallmarkArchive/1.0 (personal design reference; https://github.com/MIBXR/web-atlas)';
const fontHosts = new Set(['fonts.googleapis.com', 'fonts.gstatic.com', 'api.fontshare.com', 'cdn.fontshare.com']);
const sheets = new Map();
const builtSheets = new Set();
const destinations = new Map();
const names = new Map();
const decode = value => value.replaceAll('&amp;', '&');
const relative = (file, target) => path.relative(path.dirname(path.join(root, file)), path.join(root, target)).replaceAll('\\', '/');
const save = () => fs.writeFileSync(replacementFile, JSON.stringify(replacements, null, 2) + '\n');
for (const row of replacements) {
  if (!/^(?:https?:)?\/\//.test(row.original) || !row.replacement) continue;
  const target = path.relative(root, path.resolve(path.dirname(path.join(root, row.file)), row.replacement)).replaceAll('\\', '/');
  const url = new URL(decode(row.original), 'https://api.fontshare.com').href;
  if (/^fonts\/css\//.test(target)) sheets.set(url, target);
  else {
    names.set(target, url);
    destinations.set(`${path.posix.dirname(target)}\n${url}`, target);
  }
}
function record(file, original, replacement) {
  const row = {file, original, replacement};
  const key = JSON.stringify(row);
  if (!known.has(key)) { known.add(key); replacements.push(row); save(); }
}
async function replaceAsync(text, expression, callback) {
  let result = '', start = 0;
  for (const match of text.matchAll(expression)) {
    result += text.slice(start, match.index) + await callback(...match);
    start = match.index + match[0].length;
  }
  return result + text.slice(start);
}
async function download(url) {
  if (requests[url]) return fs.readFileSync(path.join(cache, requests[url]));
  const wikimedia = new URL(url).hostname === 'upload.wikimedia.org';
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, {headers:{'User-Agent':wikimedia ? purpose : chrome}, signal:AbortSignal.timeout(60000)});
    if (response.status === 429 && attempt < 4) {
      const seconds = Math.max(Number(response.headers.get('retry-after')) || 0, 5 * 2 ** attempt);
      console.log(`429: retry in ${seconds}s: ${url}`);
      await new Promise(resolve => setTimeout(resolve, seconds * 1000));
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const name = `request-${String(Object.keys(requests).length + 1).padStart(4, '0')}.bin`;
    fs.writeFileSync(path.join(cache, name), bytes);
    requests[url] = name;
    fs.writeFileSync(requestFile, JSON.stringify(requests, null, 2) + '\n');
    console.log(`${bytes.length} bytes: ${url}`);
    return bytes;
  }
}
function allocate(directory, url) {
  const key = `${directory}\n${url}`;
  if (destinations.has(key)) return destinations.get(key);
  const base = decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[,']/g, '_');
  const extension = path.extname(base);
  const stem = base.slice(0, base.length - extension.length);
  let name = base, count = 1;
  while (names.has(`${directory}/${name}`) && names.get(`${directory}/${name}`) !== url) name = `${stem}-${++count}${extension}`;
  const destination = `${directory}/${name}`;
  names.set(destination, url);
  destinations.set(key, destination);
  return destination;
}
async function asset(url, directory) {
  url = new URL(url, 'https://api.fontshare.com').href;
  const target = allocate(directory, url);
  const bytes = await download(url);
  fs.mkdirSync(path.dirname(path.join(root, target)), {recursive:true});
  fs.writeFileSync(path.join(root, target), bytes);
  return target;
}
function fontSize() {
  const directory = path.join(root, 'fonts');
  return fs.existsSync(directory) ? fs.readdirSync(directory, {recursive:true}).reduce((sum, file) => {
    const stat = fs.statSync(path.join(directory, file));
    return sum + (stat.isFile() ? stat.size : 0);
  }, 0) : 0;
}
async function stylesheet(url) {
  if (builtSheets.has(url)) return sheets.get(url);
  const target = sheets.get(url) || `fonts/css/font-${String(sheets.size + 1).padStart(2, '0')}.css`;
  sheets.set(url, target);
  let css = (await download(url)).toString('utf8');
  css = await replaceAsync(css, /url\(\s*(['"]?)((?:https?:)?\/\/[^)'"\s]+)\1\s*\)/g, async (whole, quote, original) => {
    const destination = await asset(original, 'fonts/files');
    const replacement = relative(target, destination);
    record(target, original, replacement);
    if (fontSize() > 100 * 1024 * 1024) throw new Error('fonts/ exceeds 100 MiB; stop without trimming.');
    return whole.replace(original, replacement);
  });
  fs.mkdirSync(path.dirname(path.join(root, target)), {recursive:true});
  fs.writeFileSync(path.join(root, target), css);
  if (fontSize() > 100 * 1024 * 1024) throw new Error('fonts/ exceeds 100 MiB; stop without trimming.');
  builtSheets.add(url);
  return target;
}
const files = fs.readdirSync(root, {recursive:true}).map(file => file.replaceAll('\\', '/')).filter(file => /\.(html|css|js)$/.test(file) && !/^(?:fonts|source)\//.test(file)).sort();
try {
  for (const url of sheets.keys()) await stylesheet(url);
  for (const file of files) {
    const originalText = fs.readFileSync(path.join(root, file), 'utf8');
    let text = originalText;
    if (file.endsWith('.html')) {
      text = await replaceAsync(text, /<link\b[^>]*>/gi, async tag => {
        const href = /\bhref\s*=\s*(["'])(.*?)\1/i.exec(tag);
        if (!href || !/^https?:/.test(href[2])) return tag;
        const url = decode(href[2]);
        const host = new URL(url).hostname;
        if (/\brel\s*=\s*["']preconnect["']/i.test(tag) && fontHosts.has(host)) {
          record(file, tag, '');
          return '';
        }
        if (host !== 'fonts.googleapis.com' && host !== 'api.fontshare.com') return tag;
        const replacement = relative(file, await stylesheet(url));
        record(file, href[2], replacement);
        return tag.replace(href[2], replacement);
      });
      text = text.replace(/<script\b[^>]*\bsrc\s*=\s*(["'])[^"']*(?:_vercel\/insights|google-analytics\.com|googletagmanager\.com)[^"']*\1[^>]*>[\s\S]*?<\/script\s*>/gi, tag => {
        record(file, tag, '');
        return '';
      });
    }
    text = await replaceAsync(text, /@import\s+(?:url\(\s*)?(["'])(https:\/\/(?:fonts\.googleapis\.com|api\.fontshare\.com)[^"']+)\1\s*\)?[^;]*;/gi, async (whole, quote, original) => {
      const replacement = relative(file, await stylesheet(decode(original)));
      record(file, original, replacement);
      return whole.replace(original, replacement);
    });
    text = await replaceAsync(text, /https?:\/\/[^\s"'<>`]+/g, async original => {
      const url = decode(original);
      const parsed = new URL(url);
      if (['github.com', 'api.github.com', 'x.com', 'commons.wikimedia.org', 'www.usehallmark.com', 'www.w3.org'].includes(parsed.hostname) || /(?:^|\.)example\.com$/.test(parsed.hostname)) return original;
      if (!/\.(?:avif|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp[34]|webm|wav|ogg)(?:[?#]|$)/i.test(parsed.pathname)) throw new Error(`Unclassified remote resource in ${file}: ${url}`);
      const isFont = /\.(?:woff2?|ttf|otf)$/i.test(parsed.pathname);
      const directory = isFont ? 'fonts/files' : `${path.posix.dirname(file)}/photos`;
      const replacement = relative(file, await asset(url, directory));
      record(file, original, replacement);
      return replacement;
    });
    if (text !== originalText) fs.writeFileSync(path.join(root, file), text);
  }
  save();
  console.log(JSON.stringify({files:files.length, stylesheetURLs:sheets.size, replacements:replacements.length, fontBytes:fontSize()}));
} catch (error) {
  save();
  fs.writeFileSync(path.join(work, 'localize-error.json'), JSON.stringify({message:error.message, cause:error.cause?.message}, null, 2) + '\n');
  throw error;
}
