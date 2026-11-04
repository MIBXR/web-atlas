# HyperFrames · 为 Agent 打造的视频编辑器官网

## 来源与版本

采集对象为 [HyperFrames 官网首页](https://hyperframes.heygen.com/)，日期为 2026-11-02。上游模块定位和运行文件对应关系见 [source/README.md](../../demos/cases/hyperframes-site/source/README.md)，逐文件素材见 [assets-manifest.json](../../demos/cases/hyperframes-site/assets-manifest.json)，对照结论见 [fidelity.md](../../demos/cases/hyperframes-site/fidelity.md)。

## 页面结构

键盘跳转入口 → 顶栏 → 全屏 Hero → 双行作品墙 → Get started 桌面下载 → Open source 四统计与安装命令。固定地面位于全页底层，页面没有独立页脚。

Hero 右上放置 HyperFrames Studio，左下放置定位句与系统下载。Framey 与气泡在桌面触发 Film；Film 以原始影片为时钟，合成 SVG 光线、吉祥物、文字、闪光和页面切分。克隆页面中的 Canvas 被替换为 captureStream(60) 生成的实时视频流；Film 结束或点击 Skip 后恢复页面。

Film 五章为 Arrive（0–1.86s）、Draw（1.86–3.62s）、Cut（3.62–4.62s）、Worlds（4.62–14s）、Download（14–19s）。拖动轨道时先暂停、定位，松开后按原状态继续；声音按钮切换静音状态，开启声音时使用 300ms 音量过渡。

## 碎片光带 WebGL 机制

管线为 Three.js WebGLRenderer → 圆角三角 Shape → 带斜角的 ExtrudeGeometry → 35° 折角法线 → 面与边两套 ShaderMaterial。挤出深度 0.09、斜角厚度 0.0405、大小 0.03645、4 段斜角与 24 段曲线保留原值。

场景以 7331 为种子，使用乘数 16807、模数 2147483647 的 LCG。三行、triSize=3、gap=0.035、videoSpan=4；方向 166°、深度方向 23°、速度 1.6、扭转 6°。formation 使用 formSpan=8、formGap=15、scatter=5、looseRot=1.34，让分散的片段重新组合。代码纹理由等宽字体、原始片段与逐字符语法着色生成。

顶点着色器输出 UV、视空间法线、深度和前后盖标识；片元着色器按视频分组矩形与 fit 裁切视频，结合代码、噪声边界、撕裂、辉光、matcap、曲率和雾。完整 GLSL 与 uniforms 在 ribbon.js 中。DPR 上限为 1.75，逐帧 delta 上限为 0.05；指针旋转以 0.045 插值，摄像机以 0.03 插值。

## 视频墙加载与播放策略

两行分别为 22 和 23 部作品，各复制一次，DOM 共 90 张卡片；复制部分 aria-hidden 且 tabIndex=-1。每行的位移对半行总宽度取模，方向为 -1／+1，速度为 40／34px/s。

threshold=0.2 的 IntersectionObserver 为可见卡片挂载 src 并播放，离开时暂停、移除 src 并 load；rootMargin=400px 的独立观察器挂载海报。saveData 与减少动态停止自动移动和播放。悬停仅 scale(1.03)，曲线 cubic-bezier(.23,1,.32,1)、时长 250ms。

拖动阈值为 6px，超过后捕获指针并抑制点击；横向滚轮或 Shift 滚轮产生 0.86 衰减惯性。键盘焦点将卡片居中。Pause animation 同步暂停两行和视频，暂停时按钮显示 Play animation，点击后恢复。

点击卡片在原生 dialog 中播放同一个本地视频，保留播放控件。竖屏作品使用 is-tall 布局。Close、Esc 和点击背景均可关闭。

## 响应式

- min-width:900px：桌面导航、Hero Canvas 的 translateY(-3%) rotate(6deg) scale(1.04)。
- max-width:899px：左上字标、手机汉堡与 Film dock 的窄屏样式。
- max-width:900px：单列下载卡、两列统计和换行开源操作。
- max-width:800px：220px 卡片、22px 圆角和紧凑分隔线。
- hover:hover：导航、按钮与卡片悬停；减少动态取消过渡，Hero 留静帧，地面不创建渲染器。

场景相机在 aspect<1.2 时采用 dirZ=45°、camY=-2.7、camZ=20.5、fov=57、tiltX=0.069。Framey 在 innerWidth<600 时以主句末行为定位依据。Film 的入口条件为 innerWidth≥900、宽高比≥1.15 且支持 hover 与 fine pointer；手机保留 Framey 跳动与眼睛交互。

## 怎么改

修改 index.html 中的静态结构与原文；styles.css 管理布局和断点，fonts.css 管理字面。ribbon.js 的 settings、codeSnippets、videoSources、matcapSources 与 GLSL 管理三角场。showcase.js 的 films 管理影片标题、比例、卡片视频和海报。app.js 管理导航、系统下载和复制。film.js 的阶段区间、几何路径与 chapters 管理 Film。ground.js 的五个 uniforms 与 styles.css 的 sr-ground-veil 管理地面光色。
