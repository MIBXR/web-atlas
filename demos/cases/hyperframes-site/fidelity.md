# HyperFrames 首页复刻对照

采集日期：2026-11-02。范围为英文官网首页、全部作品、下载系统分支、导航、复制与 Film。

运行时使用本库可读 JavaScript 与 Three.js 0.185.0。原始打包代码保存在 source/upstream/，运行页面不加载 React、Next 或上游打包文件。142 个 Three.js shader chunk 与原站一致。HTML、CSS、SVG、GLSL、媒体与字体来源保留原值。

字体保留原站 32 个 @font-face：Studio TT Norms 400–500 与 TT Norms Pro Mono 使用本地原文件；Studio TT Norms 300、700 和 TT Norms Pro 600 的字面 /fonts/tt-norms/*.woff2 保持原地址与加载失败回退。TT Norms Pro 600 由隐藏的 Skip to main content 入口触发，400 在 Film 的隐藏路由播报层重排时触发。

顶栏采用 control 变体，signup 代码保存在 source/upstream/。GitHub stars、npm downloads last week、Forks 与 Contributors 冻结为取证当日值。Film 声轨与 Framey 跳动音效沿用原文件。

运行页面移除原站统计、广告与跟踪脚本；媒体使用现有 AtlasAssets 解析器和缓存入口。

原站弹层播放高清版本，本案例的 45 个弹层复用各自的本地卡片视频，显示尺寸与控件仍按原站。35 个卡片文件有音轨，10 个无音轨。

## 对照结果

1440×900 桌面与 390×844 Android 触屏视口中，首页文案、90 张视频卡片、两张 Canvas、下载区、开源区、导航和播放弹层均保留。桌面 Film 在第 10 秒的暂停画面与原站逐像素一致。弹层可定位播放，关闭后恢复页面。

Hero 的几何、GLSL 和运动参数来自原作。实时 WebGL 读取累计时间，减少动态时的首帧受视频和 matcap 解码时刻影响，纹理细节随加载时序变化。

视频墙有 109 个取样状态存在像素差异。这些状态的视频位置、尺寸、可见性、透明度、变换与滤镜均与原站一致。

独立页面与站内预览使用 Web Atlas 共用的细滚动条。
