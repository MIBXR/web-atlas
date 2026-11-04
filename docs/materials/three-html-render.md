# three-html-render：HTML-in-Canvas polyfill

[来源、版本、许可与使用边界](../../entries/materials/three-html-render.json)

[本地工作台](../../demos/materials/three-html-render/index.html) · [结构化资料](../../entries/materials/three-html-render.json) · [固定版本源码](https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add)

## 能力与演示范围

[HTML-in-Canvas](https://github.com/WICG/html-in-canvas) 是 WICG 的浏览器标准提案，原生支持仍处于实验阶段。本条目收录提供兼容能力的 three-html-render 库。`HTMLTexture` 和 `InteractionManager` 从 three r185 起由 Three.js 提供；本样例使用这些接口，three-html-render 补齐浏览器 API。

| 用法 | 库与 Three.js 构成 | 本地组合与可操作状态 |
| --- | --- | --- |
| 吊灯照亮网页 | HTML-in-Canvas polyfill、HTMLTexture、SpotLight | 将完整 MORS² 页面放入参考光照场景；左键或单指拉灯，松手自由摆动；右键拖动调光束角度、右键单击切颜色、双击复位 |
| 基础平面 | HTML-in-Canvas polyfill、HTMLTexture、Three.js InteractionManager | 同一 MORS² 页面贴在 3D 平面上，指针移动产生最大 8° 倾斜；保留概念切换、面板、悬停和键盘焦点 |

页面保留原标志、英文文案与 Space、Meta、Field、Rule、Latent 五个概念按钮及其说明。灯光面板保留光束角度、亮度、五色预设、自定义颜色、开关和复位，通过真实 DOM 控件支持键盘与触屏操作。画面内的排版、字号、色彩和装饰按参考保留。

## 参数与接入

接入方式见结构化条目。独立演示通过静态 HTTP/HTTPS 服务访问，并通过 importmap 指向本地 `vendor/`，不依赖 React、CDN 或运行时构建。importmap 的依赖地址和 `three.core.js` 别名均将目录名中的 `@` 编码为 `%40`，与托管服务的规范化 URL 一致。

默认入口为 `index.html?demo=lamp`，基础平面为 `index.html?demo=plane`。吊灯初始 `angle: 34`、`brightness: 1450`、`color: #ffb36b` 与五色色板来自参考项目 `config.ts`，场景与摆锤数值按 `MorsLightCanvas.tsx` 移植。平面最大倾斜 8° 是本地演示参数。

本素材处于 `0.1.x`。npm 0.1.2 不提供 README 所述的 `html-texture`／`interaction-manager` 子路径；本地从 Three.js 核心和 addon 使用对应能力。

本版本组合需要 `texElementImage2D` 兼容垫片：Three.js 根据函数的参数数量选择上传重载，polyfill 的函数签名会触发不适用的短重载。改写自参考实现的垫片仅在 polyfill 启用且签名符合条件时包装为六参数函数，原生实现保持原样。

接入时，通过 polyfill 的 `pageStyles` 仅向 SVG 快照注入 `html,body{overflow:visible!important}`，使高于视口的窄版灯光面板完整光栅化；不修改 vendor 原始文件。

## 输入、动态与后备

桌面 CSS 视口不小于 768px 时保留原作 1440×810 页面与参考 fit 取景。小于 768px 时采用原 mobile 上下排列，让页面宽度跟随视口，并以 `height: auto`、`min-height: 1180px` 容纳完整内容；窗口 resize 时同步更新 HTMLTexture 尺寸与相机取景。画面内文字按原作设计保留。

正常模式下吊灯保留参考的 Verlet 摆锤与约束、指针瞄准与拉拽、松手动量、右键调节和双击复位，静止后停止渲染。`prefers-reduced-motion: reduce` 时灯固定在初始角度，平面不倾斜；面板照常即时生效，没有过渡动画。

WebGL 不可用或初始化失败时，显示同一 HTML 页面与 CSS 径向渐变静态灯光，并在页面标明后备状态。

[本地对照结果](../../demos/materials/three-html-render/fidelity.md)。

## 参考接入

页面实现、样式与光照代码改写自 jinruozai 的 [HTML-Light-Demo 固定提交](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)。原生移植依据为 `MorsPageSurface.tsx`、`globals.css`、`MorsLightCanvas.tsx`、`config.ts` 和 `three-html-compatibility.ts`；[mors-logo.svg](../../demos/materials/three-html-render/demo/mors-logo.svg) 保持参考仓库原始字节。样例代码与图形位于 `demo/`，运行库分别位于 `vendor/three@0.185.1/`、`vendor/three-html-render@0.1.2/`，许可原文与署名见[许可索引](../../demos/materials/three-html-render/LICENSES.md)。
