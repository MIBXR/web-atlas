import { marked, Renderer } from '../../vendor/marked.umd.js';
import DOMPurify from '../../vendor/purify.min.js';
import { documentContent } from './document-title.mjs';
import { project } from '../project';

function localPath(url) {
  const base = new URL('.', document.baseURI);
  return url.origin === base.origin && url.pathname.startsWith(base.pathname)
    ? decodeURIComponent(url.pathname.slice(base.pathname.length))
    : null;
}

function upstreamReference(sourceURL, reference, sources, raw) {
  const sourcePath = localPath(sourceURL);
  const source = sources.find((item) => sourcePath.startsWith(item.path));
  if (!source) return null;
  const pinned = [source.upstream?.url, source.referenceUrl, ...source.sources]
    .filter(Boolean)
    .map((url) =>
      url.match(
        /^https:\/\/github\.com\/([^/]+\/[^/]+)\/(blob|tree)\/([a-f\d]{40})(?:\/([^?#]*))?/i,
      ),
    )
    .find(Boolean);
  if (!pinned) return null;
  const repository = source.upstream?.repository || pinned[1];
  const commit = source.upstream?.commit || pinned[3];
  const directory =
    pinned[2] === 'tree'
      ? (pinned[4] || '').replace(/\/$/, '')
      : (pinned[4] || '').split('/').slice(0, -1).join('/');
  const target = new URL(
    reference,
    new URL(
      (directory ? directory + '/' : '') + sourcePath.slice(source.path.length),
      'https://github.com/',
    ),
  );
  if (raw)
    return `https://raw.githubusercontent.com/${repository}/${commit}${target.pathname}${target.search}${target.hash}`;
  const type =
    target.pathname.endsWith('/') ||
    !target.pathname.split('/').pop().includes('.')
      ? 'tree'
      : 'blob';
  return `https://github.com/${repository}/${type}/${commit}${target.pathname}${target.search}${target.hash}`;
}

export async function prepareMarkdown(text, file, sources, signal) {
  const { title, body } = documentContent(text, file);
  const codeBlocks = [];
  const renderer = new Renderer();
  renderer.code = ({ text, lang }) => {
    const index =
      codeBlocks.push({
        code: text,
        language: lang?.split(/\s+/)[0] || 'text',
      }) - 1;
    return `<div data-arc-code="${index}"></div>`;
  };
  const fragment = DOMPurify.sanitize(
    marked.parse(body, { gfm: true, async: false, renderer }),
    {
      USE_PROFILES: { html: true },
      RETURN_DOM_FRAGMENT: true,
      FORBID_TAGS: ['style', 'iframe', 'form'],
      FORBID_ATTR: ['style'],
    },
  );
  const reserved = new Set(['app', 'main']);
  for (const heading of fragment.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const base =
      heading.id ||
      heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}_\s-]/gu, '')
        .replace(/[\s-]+/g, '-') ||
      'section';
    let id = base;
    let suffix = 2;
    while (reserved.has(id)) id = base + '-' + suffix++;
    reserved.add(id);
    heading.id = id;
  }
  const firstHeading = fragment.querySelector('h1');
  const titleAnchor = firstHeading?.id || 'document-title';
  const headings = [
    { id: titleAnchor, title, level: 1 },
    ...[...fragment.querySelectorAll('h1,h2,h3')]
      .filter((heading) => heading !== firstHeading)
      .map((heading) => ({
        id: heading.id,
        title: heading.textContent,
        level: Number(heading.tagName.slice(1)),
      })),
  ].filter((heading) => project.documentTocLevels.includes(heading.level));
  firstHeading?.remove();
  const sourceURL = new URL(file, document.baseURI);
  await Promise.all(
    [...fragment.querySelectorAll('a[href],img[src]')].map(async (node) => {
      const image = node.tagName === 'IMG';
      const reference = node.getAttribute(image ? 'src' : 'href');
      if (!image && reference.startsWith('#')) return;
      const url = new URL(reference, sourceURL);
      const path = localPath(url);
      if (!image && path?.endsWith('.md')) {
        node.href = project.documentURL(
          path,
          decodeURIComponent(url.hash.slice(1)),
        );
        return;
      }
      if (
        !image &&
        path?.startsWith('demos/') &&
        /^demos\/(?:cases|materials)\/[A-Za-z0-9_-]+\/?$/.test(path)
      )
        url.pathname = url.pathname.replace(/\/?$/, '/index.html');
      const asset = window[project.assetAPI].resolve(url.href);
      const exists =
        asset !== url.href ||
        path === null ||
        (await fetch(url, { method: 'HEAD', signal })).ok;
      const upstream = exists
        ? null
        : upstreamReference(sourceURL, reference, sources, image);
      if (image) {
        node.src = upstream || asset;
        node.loading = 'lazy';
        node.decoding = 'async';
      } else {
        if (!exists && !upstream) {
          node.replaceWith(document.createTextNode(node.textContent));
          return;
        }
        node.href = upstream || asset;
        if (new URL(node.href, document.baseURI).origin !== location.origin) {
          node.target = '_blank';
          node.rel = 'noreferrer';
        }
      }
    }),
  );
  for (const table of fragment.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'markdown-table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格');
    table.replaceWith(wrapper);
    wrapper.append(table);
  }
  signal.throwIfAborted();
  const container = document.createElement('div');
  container.append(fragment);
  return {
    title,
    titleAnchor,
    headings,
    codeBlocks,
    html: container.innerHTML,
  };
}
