# 页面制作资料

`content.json` 是本地页面使用的卡片与标识数据，标识保留原站逐个指定的高度因子与比例。`foundation.css` 来自免费组件快照的共享设计 tokens，许可为旁边的 MIT 原文。

`site-styles/` 与 `site-scripts/` 保存采集时公开加载的发布产物，用于核对布局、断点、字体和交互参数，不由本地页面加载。官网未提供独立网站工程，本地实现位于上级的 HTML、CSS 和 JavaScript。

`components.tsx` 组合原始 Accordion、SegmentedControl、AnimatedCounter、CopyButton、Button 与 Radix Dialog，负责 FAQ、价格、复制反馈和手机菜单。共享源码取自本库 `demos/materials/arc-ui/source/upstream/`，版本由 Arc UI 素材固定。

重建时保留案例与 Arc UI 素材在仓库中的相对路径，在本目录运行 `npm ci`、`npm run build`；输出为上级 `vendor/arc-ui@df3a600/`。依赖锁与运行许可随本体保存。

原始媒体、字体与逐文件来源见上级素材清单。免费组件的完整制作源码与锁定构建依赖由 [Arc UI 素材](../../../materials/arc-ui/source/README.md) 提供。
