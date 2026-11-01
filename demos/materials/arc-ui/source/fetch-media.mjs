import fs from 'node:fs/promises';
const source=new URL('./',import.meta.url);
const {files:paths}=JSON.parse(await fs.readFile(new URL('media.json',source),'utf8'));
for(const file of paths){
  const response=await fetch(`https://uiarc.dev${file}`);
  if(!response.ok)throw Error(`${response.status}: ${file}`);
  const output=new URL(`../demo${file}`,source);
  await fs.mkdir(new URL('./',output),{recursive:true});
  await fs.writeFile(output,Buffer.from(await response.arrayBuffer()));
}
console.log(`已保存 ${paths.length} 个官方预览媒体文件。`);
