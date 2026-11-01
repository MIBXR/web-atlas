# 样例制作资料

`main.tsx` 组合上游组件，`build.mjs` 捆绑运行文件并收集依赖许可；依赖由 `package.json` 与 `package-lock.json` 固定。

`upstream/` 保存原始组件、区块、共享逻辑、类型、registry 安装条目与使用说明。版本及范围见素材条目。样例只导入实际使用的组件，完整免费源码仍可直接取用。

上游 `lib/media.ts` 引用的 `public/media/` 示例图片未随公开仓库提供。需要这些图片的区块可按文件内的 `/media/people/`、`/media/photos/` 路径从 `https://uiarc.dev` 获取并确认相应权利，或传入自己的图片；本地八组样例不依赖这些图片。

在本目录运行 `npm ci`、`npm run build`，输出到 `../vendor/arc-ui@df3a600/`。使用与修改说明见 [中文文档](../../../../docs/materials/arc-ui.md)。
