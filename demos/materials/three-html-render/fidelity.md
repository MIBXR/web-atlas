# three-html-render：对照结果

在本地 HTTP 下，无头 Edge `155.0.4283.62` 已实测运行真实 WebGL，实际使用 SVG foreignObject polyfill 路径。浏览器有原生 `texElementImage2D` 时走原生路径。

1440px 同条件对照中，原作与本地的源页面均为 1440×810，投影矩形均为 `(155.4016, 144.3815, 1129.1948, 628.1824)`；标题计算字号 77px、字重 670、行高 72.38px、字体栈及控制板边界相同。初始画面观察未见明显的构图、黑位、材质或光照差异，保留参考场景的暗部表现。摆动画面的光斑边缘有轻微偏移，取帧时间差为可能原因，未经独立验证。动态画面未达到 1:1。

页面、光照、摆锤和兼容垫片由本库按固定 HTML-Light-Demo 提交的 MorsPageSurface.tsx、MorsLightCanvas.tsx、config.ts、globals.css 与 three-html-compatibility.ts 自行移植；Three.js、polyfill 与原字标资源沿用归档版本。现有记录未列出额外删减及原因。垫片处理纹理上传重载，pageStyles 修正窄屏长页面的光栅化，减少动态与静态后备的用法见下文。

390px 下源页面实测为 390×1240，五个概念均可真实点击切换。Tab 依次聚焦 Space、Meta、Field、Rule、Latent、power、beam，`focus-visible` 落在文档内真实 DOM 控件；ArrowRight 将光束角度从 34 调至 35。右键单击切换下一颜色，右拖 100px 将角度从 34 调至 48。

摆动后的绘制计数停在 10150，等待 1.2 秒仍为 10150，确认停止渲染。减少动态时灯固定，绘制计数间隔 1 秒保持 `10 → 10`；plane 指针移动前后的矩阵相同，正常模式矩阵会改变。面板仍即时生效。CDP 单触点模拟可拖灯，无 pointercancel，拖动时 `scrollY` 保持 0；浅蓝色板可触摸选中。

WebGL 不可用或初始化失败时，显示同一 MORS² HTML 页面与 CSS 静态光照，并标明“当前环境无法运行 WebGL 光照，显示的是静态示意。”禁用 WebGL 的独立 Edge 进程已验证 390px 后备：可用区域宽 375px、无横向溢出，polyfill host 清除、源页面回到 scene，原面板开关可从开启切换为关闭。

原生路径、读屏器、真实触屏设备、其他浏览器、长期性能与电量表现未验证。
