import { build } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.dirname(fileURLToPath(import.meta.url));
const vendor = path.resolve(source, '../vendor/arc-ui@df3a600');
const registry=JSON.parse(await fs.readFile(path.join(source,'upstream/registry.json'),'utf8'));
const groups={};
for(const group of ['actions','inputs','content','charts','text','blocks']){
  const code=await fs.readFile(path.join(source,`previews/${group}.tsx`),'utf8');
  const ids=code.match(/export const \w+=\[([^\n]+)\]/)[1].matchAll(/'([^']+)'/g);
  for(const [,id] of ids)groups[id]=group;
}
const navigation=JSON.parse(await fs.readFile(path.join(source,'navigation.json'),'utf8'));
const categories={};
let order=0;
for(const section of navigation.sections)for(const category of section.groups)for(const id of category.items)categories[id]={id:category.id,title:category.title,titleZh:category.titleZh,order:order++};
const catalog=registry.items.filter(item=>['registry:ui','registry:block'].includes(item.type)).map(item=>{
  const titleZh=navigation.labels[item.name],category=categories[item.name];
  if(!titleZh||!category)throw Error(`Missing translation or category: ${item.name}`);
  return {id:item.name,title:item.title,titleZh,category,kind:item.type==='registry:block'?'block':'component',group:groups[item.name],url:item.docs.match(/https:\/\/[^\s]+/)[0],files:item.files.map(file=>file.path)};
}).sort((a,b)=>a.category.order-b.category.order);
await fs.writeFile(path.resolve(source,'../demo/catalog.json'),`${JSON.stringify({sections:navigation.sections,items:catalog},null,2)}\n`);
await fs.mkdir(path.join(vendor,'chunks'),{recursive:true});
for(const file of await fs.readdir(path.join(vendor,'chunks')))await fs.unlink(path.join(vendor,'chunks',file));
await build({
  entryPoints: [path.join(source, 'main.tsx')],
  outdir:vendor,
  entryNames:'runtime',
  chunkNames:'chunks/[name]-[hash]',
  splitting:true,
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  target: 'es2022',
  alias: { '@/lib/media':path.join(source,'media.tsx'), '@': path.join(source, 'upstream'), 'next/image':path.join(source,'media.tsx'), 'next/link':path.join(source,'next-link.tsx') },
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
