/* Cache only immutable, explicitly mapped media. HTML and application code stay fresh. */
importScripts('data/asset-sources.js');
const manifest = globalThis.AtlasAssetSources;
const cacheName = 'design-atlas-media-v1-' + manifest.commit;
const prefix = 'design-atlas-media-v1-';
const limit = 256 * 1024 * 1024;
const allowed = new Map(Object.values(manifest.assets).map(asset => [asset.url, asset]));
const workerRoot = new URL('.', self.location.href);
const clientModes = new Map();
let writing = Promise.resolve();
let generation = 0;
const pendingWrites = new Set();

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const name of await caches.keys()) {
    if (name.startsWith(prefix) && name !== cacheName) await caches.delete(name);
  }
  await self.clients.claim();
})()));

function save(url, response) {
  if (pendingWrites.has(url)) { response.body?.cancel().catch(() => {}); return Promise.resolve(); }
  pendingWrites.add(url);
  const requestedGeneration = generation;
  writing = writing.catch(() => {}).then(async () => {
    if (requestedGeneration !== generation) return;
    const cache = await caches.open(cacheName);
    if (await cache.match(url)) return;
    const bytes = allowed.get(url).bytes;
    const keys = await cache.keys();
    let total = keys.reduce((sum, key) => sum + (allowed.get(key.url)?.bytes || 0), 0);
    for (const key of keys) {
      if (total + bytes <= limit) break;
      await cache.delete(key);
      total -= allowed.get(key.url)?.bytes || 0;
    }
    // Cache API failures (private mode, disk quota) must never fail a media request.
    await cache.put(url, response);
  });
  return writing.catch(() => {}).finally(() => pendingWrites.delete(url));
}

async function ranged(response, header) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return response;
  const blob = await response.blob();
  const size = blob.size;
  let start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  let end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  if (start > end || start >= size) return new Response(null, {
    status: 416, headers: {'Content-Range': `bytes */${size}`}
  });
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(blob.slice(start, end + 1), {status:206, headers});
}

const filling = new Set();

async function remote(request, url, event) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(url);
    if (cached) return request.headers.has('Range')
      ? ranged(cached, request.headers.get('Range')) : cached;
  } catch { /* Use ordinary network loading when storage is unavailable. */ }
  const range = request.headers.get('Range');
  // Cold range requests stream the network 206 so media stays seekable; the complete file is fetched once in the background for the cache.
  if (range && !filling.has(url)) {
    filling.add(url);
    event.waitUntil((async () => {
      const response = await fetch(new Request(url, {mode:'cors', credentials:'omit', redirect:'follow'}));
      if (response.status === 200 && response.type !== 'opaque') await save(url, response);
    })().finally(() => filling.delete(url)));
  }
  const headers = new Headers();
  if (range) headers.set('Range', range);
  const response = await fetch(new Request(url, {
    mode:'cors', credentials:'omit', headers, redirect:'follow'
  }));
  if (!range && response.status === 200 && response.type !== 'opaque') event.waitUntil(save(url, response.clone()));
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const own = url.origin === workerRoot.origin && url.pathname.startsWith(workerRoot.pathname);
  const key = own ? decodeURIComponent(url.pathname.slice(workerRoot.pathname.length)) : null;
  const mirror = key && manifest.assets[key]?.url;
  if (!allowed.has(request.url) && !mirror) return;
  event.respondWith((async () => {
    if (mirror) {
      const client = event.clientId ? await self.clients.get(event.clientId) : null;
      const forcedLocal = clientModes.get(event.clientId) === 'local' ||
        client && new URL(client.url).searchParams.get('assets') === 'local';
      try {
        const response = await fetch(request);
        if (response.ok || forcedLocal) return response;
      } catch (error) { if (forcedLocal) throw error; }
      // CSS images and fonts use the same local-first fallback as DOM media.
      return remote(request, mirror, event);
    }
    return remote(request, request.url, event);
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'atlas-cache-mode') {
    if (event.source?.id && ['auto','github','local'].includes(event.data.mode)) clientModes.set(event.source.id, event.data.mode);
    return;
  }
  if (event.data?.type === 'atlas-cache-remember') {
    const urls = Array.isArray(event.data.urls) ? [...new Set(event.data.urls)].filter(url => allowed.has(url)) : [];
    const requestedGeneration = generation;
    event.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      // These files are already in use. Explicit fetch lets a cold standalone visit
      // retain resources whose parser requests preceded worker activation.
      for (const url of urls) {
        if (requestedGeneration !== generation) return;
        if (pendingWrites.has(url) || await cache.match(url)) continue;
        try {
          const response = await fetch(new Request(url, {mode:'cors', credentials:'omit'}));
          if (requestedGeneration !== generation) { response.body?.cancel().catch(() => {}); return; }
          if (response.status === 200 && response.type !== 'opaque') await save(url, response);
        } catch { /* Cache warming is optional and never delays an opening. */ }
      }
    })().catch(() => {}));
    return;
  }
  if (event.data?.type !== 'atlas-cache-status' && event.data?.type !== 'atlas-cache-clear') return;
  event.waitUntil((async () => {
    if (event.data.type === 'atlas-cache-clear') {
      generation++;
      await caches.delete(cacheName);
    }
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    event.ports[0]?.postMessage({available:true, files:keys.length,
      bytes:keys.reduce((sum, key) => sum + (allowed.get(key.url)?.bytes || 0), 0), limit});
  })().catch(() => event.ports[0]?.postMessage({available:false, files:0, bytes:0, limit})));
});
