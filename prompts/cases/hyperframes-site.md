# HyperFrames · 为 Agent 打造的视频编辑器官网 · 复用 Prompt

由 [结构化案例](../../entries/cases/hyperframes-site.json) 自动生成。参考观察与具体边界见 [调研](../../docs/cases/hyperframes-site.md)。

## 正向 Prompt

以 https://hyperframes.heygen.com/ 在 2026-11-02 的英文首页为依据，实现【目标产品】页面。保留 100svh Hero 的真实 WebGL 三角场、原始 GLSL、种子 7331、3 行、triSize=3、166° 方向、1.6 速度和 6° 扭转；指针与滚动按源码响应。保留全部 45 部影片及复制后的 90 张卡片、40／34px/s 双向移动、0.2 可见观察器、400px 海报预取、6px 拖动阈值与 0.86 惯性；悬停仅缩放 1.03。在 dialog 中播放对应卡片的视频。Film 保留 Framey、SVG 光线、captureStream 页面克隆、19 秒序列、定位轨道、声音和 Skip。保留全部系统下载分支、导航状态、安装命令复制、四统计和固定地面着色器。字体按线上成功与失败状态配置，运行所需素材本地化，链接保持原站绝对地址。在 1440×900 DPR1 与 390×844 DPR2 下逐状态对照。

## 负向约束

不用截图、录屏或整段影片替代实时 Hero；不简化 GLSL、几何、影片数量、文案、交互和断点；不加入悬停才播放的策略、额外音乐或原站没有的界面。

## 制作约束

- 范围固定为 2026-11-02 的英文官网首页。
- 运行时由本库可读 JavaScript、原站 GLSL 和 Three.js 0.185.0 构成。
- 全部卡片视频、海报、碎片视频、Film 和跳动音效保留原文件。
- 字体声明与失败回退按线上实际保留，统计冻结为取证当日值。

## 检查方法

在 ribbon.js 中只改变一个场景参数，观察三角面编组、视差和代码转视频的关系；保持影片数据、文字及操作状态。

[查看 Demo](../../demos/cases/hyperframes-site/index.html) · [返回案例库](../../cases.html#style/hyperframes-site)
