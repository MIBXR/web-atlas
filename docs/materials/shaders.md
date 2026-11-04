# Shaders：图层组合与参数调节

[结构化条目](../../entries/materials/shaders.json) · [打开演示](../../demos/materials/shaders/index.html)

上游 [JavaScript 接口与组件说明](https://github.com/shader-effects-inc/shaders/tree/81fd4ece5d493ca6c424a2af41f0e2c361ec8258) 提供 `createShader`，按 `components` 数组组合和处理图层。四个演示使用真实上游组件，用于学习独立效果；配色、参考图、参数控件与触发按钮是本库的原创演示选择。

| 演示 | 可操作内容 | 参数依据 |
| --- | --- | --- |
| 流动渐变 `MeshGradient` | 速度、色块数、旋转、平滑度及色彩 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/MeshGradient/index.ts) |
| 条纹玻璃 `FlutedGlass` | 密度、折射、角度与高光 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/FlutedGlass/index.ts) |
| 指针涟漪 `CursorRipples` | 指针或触摸反馈的强度、衰减、半径与色散 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/CursorRipples/index.ts) |
| 噪声溶解 `NoiseDissolve` | 手动进度、噪声尺度、边缘软度与正反向转场 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/NoiseDissolve/index.ts) |

参数依据保存在结构化条目的 `demos[].parameters` 中。上游源码的 `ui.min/max` 给出编辑控件的建议范围；本地 MeshGradient 速度采用 `0–2`（上游 UI 为 `0–10`），FlutedGlass 角度采用 `0–180`（上游 UI 为 `0–360`），其余范围沿用源码 UI 建议。演示的步长与默认值是本地选择。MeshGradient 显式设置 `stops: null`，使两色控件生效；页面实际默认值和组件组合以 [demo.js](../../demos/materials/shaders/demo/demo.js) 为准。配色、输入响应和舞台尺寸由本地演示配置。玻璃与涟漪需要底图才能判断形变，演示使用本地原创 SVG，不取用官网的付费作品。

## 运行与适配

通过 HTTP/HTTPS 打开演示，浏览器需提供 WebGPU。舞台一次运行一种效果，控制区通过标准 DOM 控件切换效果、调节参数、重置和暂停。选择效果或调节参数时，可以直接查看底图、颜色和运动的变化。

`index.html?effect=mesh-gradient`、`fluted-glass`、`cursor-ripples`、`noise-dissolve` 定位效果；`theme=light`／`theme=dark` 指定控件主题。同源嵌入跟随 Atlas 主题，独立打开读取已保存的主题或系统偏好；舞台保持深色。

`demo/demo.js` 按需加载 `vendor/shaders@4.0.4/shaders-4.0.4.js`，以 `demo/reference.svg` 为滤镜输入。切换与重置时，先销毁原实例，再按序初始化；参数通过 `shader.update('effect', props)` 更新，暂停时请求静止画面。每次创建实例时设置 `disableTelemetry: true`，首个合成帧由官方 `onReady` 确认。复制按钮提供当前参数的 `shaders/js` 代码。软件依赖许可见[许可索引](../../demos/materials/shaders/LICENSES.md)。

演示区的静态参考展示底图与图层构成；WebGPU 可用且首个合成帧就绪后，状态显示着色器正在运行。WebGPU 不可用时显示静态示意。主要内容和操作保留在 DOM；减少动态、暂停或页面隐藏时停止持续动画。
