# Arc UI · React 动效组件库

[运行目录](../../demos/materials/arc-ui/index.html) · [素材条目](../../entries/materials/arc-ui.json) · [对照结果](../../demos/materials/arc-ui/fidelity.md)

## 预览与代码

目录覆盖固定免费快照中的 120 个组件和 22 个区块。目录按官网的小分类分级，名称同时显示中文与英文，可按任一语言搜索；每项可在预览和代码之间切换。代码区使用等宽字体、语法高亮和行号，列出该条目的 TypeScript、CSS 与关联文件，支持逐文件复制。

预览运行真实上游组件，区块优先使用上游自带样例。按钮包含样式、尺寸、图标、加载与结果状态；图表可更新数据，输入与浮层保留键盘操作。外框提供带原生转场的主题切换、八色外观、主题 CSS 复制，以及适应／真实手机视口／全屏预览。手机目录通过顶部左侧按钮打开，以可拖拽的底部抽屉显示；桌面和手机都显示面包屑。减少动态遵循系统设置。状态仅用于本地演示，官网布局另见 [官网案例](../../cases.html#style/uiarc-platform)。

## 源码与重建

原始组件与区块在 `source/upstream/registry/`，依赖关系在 `registry.json` 和 `public/r/`。目录外框在 `source/main.tsx`，六类预览组合在 `source/previews/`，外框样式在 `demo/demo.css`。复制组件时保留内部目录、共享 tokens 和 `@/` 路径别名。

在本体的 `source/` 中运行：

```sh
npm ci
npm run build
```

构建生成目录数据、按需加载的运行文件与依赖许可。以 HTTP 服务打开本体入口即可使用；制作资料见 [source/README.md](../../demos/materials/arc-ui/source/README.md)，许可和媒体署名见 [LICENSES.md](../../demos/materials/arc-ui/LICENSES.md)。
