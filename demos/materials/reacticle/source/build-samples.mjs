import { mkdirSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const source = dirname(fileURLToPath(import.meta.url));
const output = resolve(process.argv[2]);
const samples = [
  ['caffeine-half-life', 'tufte', 'CaffeineHalfLife'],
  ['movable-type', 'press', 'MovableType'],
  ['pool-exhaustion', 'shannon', 'PoolExhaustion'],
  ['orbit-spec', 'vignelli', 'OrbitSpec'],
  ['linear-attention', 'knuth', 'LinearAttention'],
  ['first-newsletter', 'freddie', 'FirstNewsletter'],
  ['slow-breathing', 'andy', 'SlowBreathing'],
  ['front-page', 'bodoni', 'FrontPage'],
  ['geometry-of-meaning', 'bayer', 'GeometryOfMeaning'],
  ['rate-limiter-spec', 'fuller', 'RateLimiterSpec'],
  ['color-clash', 'sottsass', 'ColorClash'],
];
for (const [slug, theme, component] of samples) {
  const entry = resolve(output, '_inputs', slug);
  mkdirSync(entry, { recursive: true });
  const report = component === 'RateLimiterSpec' ? 'RateLimiter' : component;
  const path = target => relative(entry, resolve(source, target)).replaceAll('\\', '/');
  const title = readFileSync(resolve(source, '..', 'demo', slug, 'index.html'), 'utf8').match(/<title>(.*?)<\/title>/)[1];
  writeFileSync(resolve(entry, 'index.html'), `<!doctype html><html lang="zh-CN" data-theme="${theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><script>window.Prism = { manual: true };</script></head><body><div id="root"></div><script type="module" src="./entry.tsx"></script></body></html>`);
  writeFileSync(resolve(entry, 'entry.tsx'), `import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'reacticle';
import { ${component} as Report } from '${path(`apps/site/src/reports/${report}.tsx`)}';
import '${path('apps/site/src/site.css')}';
createRoot(document.getElementById('root')!).render(<div className="gx-reader" data-theme="${theme}"><div className="gx-reader__stage"><div className="gx-reader__paper"><ThemeProvider theme="${theme}"><Report /></ThemeProvider></div></div></div>);
`);
  await build({
    configFile: false,
    root: entry,
    base: './',
    publicDir: false,
    plugins: [react(), {
      name: 'local-fonts',
      transformIndexHtml: () => [{ tag: 'link', attrs: { rel: 'stylesheet', href: '../fonts/fonts.css' }, injectTo: 'head-prepend' }, { tag: 'link', attrs: { rel: 'stylesheet', href: '../../../../../site/runtime/demo-scrollbars.css' }, injectTo: 'head' }],
    }],
    resolve: { alias: {
      reacticle: resolve(source, 'src/index.ts'),
      react: resolve(source, 'node_modules/react'),
      'react-dom': resolve(source, 'node_modules/react-dom'),
    } },
    build: { outDir: resolve(output, slug), emptyOutDir: true },
  });
}
cpSync(resolve(source, '../fonts'), resolve(output, 'fonts'), { recursive: true });
