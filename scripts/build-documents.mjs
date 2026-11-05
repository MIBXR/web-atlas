import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {documentContent} from '../site/app/domain/document-title.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const groups = ['项目指南', '研究方法与索引', '案例研究', '巧思研究', '素材使用', '复用 Prompt', '项目说明'];
const guideTitles = {'docs/guide.md':'项目指南', 'docs/agent.md':'Agent 工作流与数据契约'};
const projectOrder = ['README.md', 'CONTRIBUTING.md', 'AGENTS.md'];

export function documentCatalog() {
  const paths = [];
  function collect(relative) {
    for (const item of fs.readdirSync(path.join(root, relative), {withFileTypes:true})) {
      const child = path.posix.join(relative, item.name);
      if (item.isDirectory()) collect(child);
      else if (item.name.endsWith('.md')) paths.push(child);
    }
  }
  for (const directory of ['docs', 'prompts']) collect(directory);
  paths.push(...projectOrder);
  const documents = paths.map(relative => {
    const text = fs.readFileSync(path.join(root, relative), 'utf8');
    const {title} = documentContent(text, relative);
    const group = guideTitles[relative] ? groups[0] : projectOrder.includes(relative) ? groups[6] : relative.startsWith('prompts/') ? groups[5] : relative.startsWith('docs/cases/') ? groups[2] : relative.startsWith('docs/patterns/') ? groups[3] : relative.startsWith('docs/materials/') ? groups[4] : groups[1];
    return {path:relative, title, group};
  });
  const guideOrder = Object.keys(guideTitles);
  documents.sort((a,b) => groups.indexOf(a.group)-groups.indexOf(b.group) || (a.group === groups[0] ? guideOrder.indexOf(a.path)-guideOrder.indexOf(b.path) : a.group === groups[6] ? projectOrder.indexOf(a.path)-projectOrder.indexOf(b.path) : a.title.localeCompare(b.title,'zh-CN')) || a.path.localeCompare(b.path));
  return documents;
}

export function buildDocuments() {
  const documents = documentCatalog();
  fs.writeFileSync(path.join(root,'data/docs.js'), 'window.ATLAS_DOCUMENTS = ' + JSON.stringify(documents,null,2) + ';\n', 'utf8');
  return documents;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(`Built ${buildDocuments().length} public Markdown documents.`);
