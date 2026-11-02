# Anime.js · JavaScript 动画引擎官网 · 复用 Prompt

由 [结构化案例](../../entries/cases/animejs-site.json) 自动生成。参考观察与具体边界见 [调研](../../docs/cases/animejs-site.md)。

## 正向 Prompt

读取本案例源码、研究、fidelity.md、source/values.md，并关联 animejs 素材。以原始 HTML、CSS、字体和 22 个 GLB 组成完整官网首页，保留彩环仪表盘开场、粘性工具箱、八节 API 演示、滚动驱动的模块展开与组装、赞助与十二个文档入口。主时间线、局部循环、SVG、Canvas、三维材质、相机、灯光、断点和交接参数从公开包的对应字节段取值。通过同视口、同时刻与同操作序列对照。

## 负向约束

保持原始章节、内容、几何、颜色、交互与动态关系。

## 制作约束

- 首页采用 2026-11-02 的原始结构、CSS、字体、SVG、GLB 与赞助快照。
- 运行依赖固定 Anime.js 4.5.0、Three.js r172、postprocessing 6.36.6、highlight.js 11.11.1。
- 八节特性与滚动时间线按原始站点函数拆解；参数字节定位见 source/values.md。
- 系统配色与减少动态偏好沿用原站实际行为。

## 检查方法

在两个视口滚动至八节 API 演示，操作拖拽与进度条；比较模块展开、缩减、组装时体积标签的变化，再打开相应代码与文档入口。

[查看 Demo](../../demos/cases/animejs-site/index.html) · [返回案例库](../../cases.html#style/animejs-site)
