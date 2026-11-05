# three-html-render · HTML-in-Canvas polyfill · 复用 Prompt

[结构化条目](../../entries/materials/three-html-render.json)

使用固定版本 three 0.185.1 与 three-html-render 0.1.2，以原生 HTML/CSS/JavaScript 和本地 importmap 移植固定提交 HTML-Light-Demo 的完整 MorsPageSurface、globals.css 与 MorsLightCanvas。保留 MORS² 标志、原英文文案、五个概念、原面板、页面配色、字号与光照数值；桌面 CSS 视口不小于 768px 时沿用 1440×810 页面与参考 fit，小于 768px 时采用原 mobile 上下排列、页面宽度跟随视口，并以 height: auto 和 min-height: 1180px 容纳内容。由 Three.js HTMLTexture 与 InteractionManager 连接同一页面和 3D 表面，three-html-render 补齐浏览器 API，保留 texElementImage2D 兼容垫片。仅在 polyfill 的 SVG 快照 pageStyles 中使 html/body overflow: visible，保留高于视口的窄版面板，不修改 vendor。吊灯保留摆锤、Verlet 约束、瞄准、拉拽、松手、右键及双击复位，原面板提供光束角度、亮度、五色预设、自定义颜色、开关与复位；初始值为 34°、1450、#ffb36b。plane 复用同一页面并保持最大 8° 指针倾斜。减少动态时固定灯与平面且即时调参，静止后停止持续渲染；不支持时显示同一页面的静态光照并明确说明。分别实测视觉、实际路径、键盘、DOM、触摸、减少动态与后备，未验证项如实标注。保留各软件 MIT 许可；MORS² 品牌文案标志与美术方向署名 @kaolti，页面实现与光照代码署名 jinruozai，本仓库为个人非商业参考用途。

## 制作约束

- HTML-in-Canvas 是 WICG 的浏览器标准提案，原生支持处于实验阶段。HTMLTexture 与 InteractionManager 从 three r185 起由 Three.js 提供，本库补齐浏览器 API。
- 浏览器有原生 texElementImage2D 时使用原生路径；缺少原生支持时退回 SVG foreignObject 光栅化。
- 通过 HTTP/HTTPS 访问；WebGL 不可用或初始化失败时保留同一 MORS² HTML 页面与 CSS 静态光照。
- 桌面 CSS 视口不小于 768px 时保留原作 1440×810 页面与参考 fit；小于 768px 时采用原作的移动端上下布局，页面宽度跟随视口。HTMLTexture 尺寸与相机随 resize 更新。
