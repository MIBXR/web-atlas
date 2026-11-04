import vm from 'node:vm';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Run the actual human-facing renderer, with original entries supplied directly
// rather than a possibly stale generated data/cases.js. Browser services unrelated
// to rendering are stubbed; route(), renderDetail(), composition() and
// behaviors() execute unchanged and produce the production #detail.innerHTML.
export function renderDetailNotes({ entries, patterns, id, rendererSource }) {
  const nodes = new Map();
  function node(selector) {
    if (nodes.has(selector)) return nodes.get(selector);
    const classes = new Set();
    const element = {
      innerHTML: '', textContent: '', value: '', hidden: false, dataset: {}, clientWidth: 1000,
      classList: { add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value), toggle(value, force) { if (force === undefined) force = !classes.has(value); force ? classes.add(value) : classes.delete(value); return force; } },
      style: { setProperty() {} }, addEventListener() {}, setAttribute() {}, append() {}, focus() {}, select() {}, scrollIntoView() {}, showModal() {},
    };
    nodes.set(selector, element);
    return element;
  }
  const location = new URL(`http://atlas.local/cases.html#style/${id}`);
  const document = { querySelector: node, querySelectorAll: () => [], createElement: tag => node(`created:${tag}`), body: node('body'), activeElement: { tagName: 'BODY' }, addEventListener() {} };
  const window = { ATLAS_CASES: entries, ATLAS_PATTERNS: patterns, AtlasPreview: { mount: () => ({ refresh() {}, disconnect() {} }) }, addEventListener() {}, scrollTo() {} };
  const sandbox = { window, document, location, URL, console, AtlasIcons: { svg: () => '' }, localStorage: { getItem: () => null, setItem() {} }, history: { replaceState() {}, pushState() {} }, navigator: { clipboard: { writeText: async () => {} } }, ResizeObserver: class { observe() {} disconnect() {} }, setTimeout: () => 0, clearTimeout() {}, Blob };
  const context = vm.createContext(sandbox);
  new vm.Script(fs.readFileSync(new URL('../site/shared/favorites.js', import.meta.url), 'utf8')).runInContext(context, { timeout: 2000 });
  new vm.Script(fs.readFileSync(new URL('../site/shared/patterns-ui.js', import.meta.url), 'utf8')).runInContext(context, { timeout: 2000 });
  new vm.Script(rendererSource, { filename: 'site/pages/cases/atlas.js' }).runInContext(context, { timeout: 2000 });
  assert.equal(node('#detail').hidden, false, `${id}: detail route was not rendered`);
  const html = node('#detail').innerHTML;
  assert.ok(html, `${id}: detail HTML is empty`);
  const opening = '<aside class="notes">';
  const start = html.indexOf(opening);
  const end = html.indexOf('</aside>', start);
  assert.ok(start >= 0 && end > start, `${id}: missing rendered notes aside`);
  return { html, notes: html.slice(start + opening.length, end) };
}
