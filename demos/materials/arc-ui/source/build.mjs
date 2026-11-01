import { build } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.dirname(fileURLToPath(import.meta.url));
const vendor = path.resolve(source, '../vendor/arc-ui@df3a600');
await build({
  entryPoints: [path.join(source, 'main.tsx')],
  outfile: path.join(vendor, 'runtime.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  target: 'es2022',
  alias: { '@': path.join(source, 'upstream') },
  legalComments: 'linked'
});
const licenses = [];
async function collect(directory) {
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    if (!item.isDirectory() || item.name.startsWith('.')) continue;
    const folder = path.join(directory, item.name);
    if (item.name.startsWith('@')) { await collect(folder); continue; }
    const pkg = JSON.parse(await fs.readFile(path.join(folder, 'package.json'), 'utf8'));
    if (pkg.name === 'esbuild' || pkg.name.startsWith('@esbuild/')) continue;
    const license = (await fs.readdir(folder)).find(name => /^licen[sc]e(?:\.|$)/i.test(name));
    if (!license) continue;
    const filename = `${pkg.name.replaceAll('/', '-')}-${pkg.version}.txt`;
    await fs.mkdir(path.join(vendor, 'licenses'), { recursive: true });
    await fs.copyFile(path.join(folder, license), path.join(vendor, 'licenses', filename));
    licenses.push({ name: pkg.name, version: pkg.version, license: pkg.license, file: `licenses/${filename}` });
  }
}
await collect(path.join(source, 'node_modules'));
await fs.writeFile(path.join(vendor, 'licenses.json'), `${JSON.stringify(licenses, null, 2)}\n`);
console.log('Arc UI 样例运行文件已生成。');
