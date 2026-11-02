# Anime.js · JavaScript 动画引擎官网

## 来源与版本

[官网首页](https://animejs.com/)的取证日期为 2026-11-02。原始发布入口与全部分块保存在 `demos/cases/animejs-site/source/upstream/`，固定库版本、来源与 source map 响应见 [source/README.md](../../demos/cases/animejs-site/source/README.md)。[打开独立 Demo](../../demos/cases/animejs-site/index.html)。

## 页面结构

| 区块 | 结构与职责 | 实现 |
| --- | --- | --- |
| 顶栏 | 标志、Docs、Easings、Learn、Examples、GitHub、Sponsor 与窄屏菜单；版本选择器在首页由原站 CSS 隐藏，保留三个官方文档地址 | `index.html`、`js/nav.js` |
| intro | 产品标题、命令、Learn more、赞助标志与彩环仪表盘 | `js/intro.js`、`js/canvas.js`、`js/main.js` |
| toolbox | 跨四屏的固定机芯、标签与连线 | `js/toolbox.js`、`js/stage.js` |
| features-gallery | 八节各一屏、共用固定画面 | `js/features/` |
| modules | 跨四屏的模块展开、体积缩减与组装 | `js/modules-scene.js` |
| sponsors | 赞助名单与资金数据 | `js/sponsors.js`、`assets/sponsors/` |
| get-started | 场景退出与十二个文档入口、SVG 箭头反馈 | `js/get-started.js`、`assets/css/core.css` |
| 页脚与进度条 | 站点链接、订阅、复制代码、章节卡与可拖动进度 | `js/footer.js`、`js/copy-button.js`、`js/main.js` |

## 八节演示

| 节点 | API 与实际机制 | 参数 | 源码 |
| --- | --- | --- | --- |
| intuitive | 方块进入时弹簧放大，旋转循环随章节启停 | rotate 90；750ms；inOutExpo；离开 250ms out(3) | `js/features/intuitive.js` |
| composition | 每个形状的 x、y、rotate、scale 独立递归刷新，退出取消活动动画 | 500–2000ms；80% 时长启动下一次；x/y/rotate ±90；scale .05–.4 | `js/features/composition.js` |
| scroll | 球形 SVG 的路径描线与滚动同步，内部路径位置和线宽持续循环 | 2500ms；stagger 200；描线 stagger 40；inOut(3) | `js/features/scroll.js` |
| staggering | 13×13 Canvas 网格以中心距离组织半径、位置与透明度 | stagger 200；起始 50；scale 1→15→1；750ms | `js/features/staggering.js` |
| svgUtils | 小车沿真实路径运行，高亮描线与双层轨道旋转并行 | 小车、描线 10000ms；轨道 20000ms；进入 rotateX 45 | `js/features/svgUtils.js` |
| draggable | 圆形拖拽、约束弹性、抓取与释放缩放 | stiffness 120、damping 6；containerFriction .5；悬停 1.15、抓取 .8 | `js/features/draggable.js` |
| clockwork | 192 个有效刻度与最后一个交接刻度配合径向路径与播放头 | stagger 10；刻度 50ms；播放头 1920ms；径向 stagger 240 | `js/features/clockwork.js` |
| responsive | 演示视口宽高互换，同时把圆点运动从纵向插值到横向 | width 80%→50%；height 50%→80%；750ms；stagger 100 | `js/features/responsive.js` |

所有字串、数值、缓动与 CSS 声明的原包字节偏移见 [values.md](../../demos/cases/animejs-site/source/values.md)。

## 三维模块场景

22 个 GLB 从 `assets/models/` 加载，经 Draco 解码取得原始几何。`ModuleAssembly` 创建 animation、draggable、scroll、scope、timer、stagger、spring、svg、timeline、renderer、waapi、shield 等分组，内部继续运行齿轮旋转、弹簧、层叠、SVG 圆柱形变和时间线顶针。

透视相机基础 fov 为 40，near 1、far 1000。场景由强度 2 的环境光和强度 1 的方向光照明。原始轮廓材质、轮廓后处理与 FXAA GLSL 位于 `js/shaders/`；postprocessing 使用 RenderPass、轮廓 ShaderPass 与 EffectPass 组合。

模块时间线的四个关键位置为 `MODULES_TRANSFORM +=590`、`MODULES_SHRINK +=1250`、`MODULES_ROTATION +=1750`、`MODULES_CASE +=1900`。选定模块横移 ±2.5，随后旋转 ±90 度并缩小为零；条形体积、数字与标签同步收束，最后重新装壳。

## 滚动驱动结构

主时间线标签按 INTRO、HEADING、TOOLBOX、FEATURES、MODULES、SPONSORS、GET_STARTED 排列。页面区块实际高度映射到时间线标签区间，Scroll Observer 的同步系数为 .9。特性画廊使用独立的 `featuresTimeline`，每节在进入与离开时调用对应的 `onEnter`、`onLeave`，可同步的子时间线直接连接滚动进度。

底部进度条将各章节实际高度映射到拖动位置，点击位置以 1/65 为步长吸附。固定章节在进入时启用指针并于 350ms 内显现；离开时关闭指针并淡出。工具箱与模块章节以 250ms inOutQuad 切换背景及着色器颜色。

## 响应式

源端作用域断点为 `minM: 900px`、`isM: 900–1199px`、`minL: 1200px`。桌面相机 z 为 120，手机为 180；主时间线按断点使用对应场景位置。手机标题换行、特性说明、工具标签与底部代码卡沿用原始 CSS 和 Scope 分支。首页沿用固定配色与滚动驱动的明暗章节，正常与减少动态系统偏好使用源端同一套动画逻辑。

## 怎么改

| 内容 | 修改位置 |
| --- | --- |
| 标题、正文、链接与文档目录 | `index.html` |
| 颜色、字号、断点与布局 | `assets/css/core.css`、`assets/css/home.css` |
| 仪表盘点阵、曲线、刻度与开场 | `js/canvas.js`、`js/intro.js`、`js/main.js` |
| 单节 API 演示 | `js/features/<节 id>.js` |
| 模型、模块分组与组装节拍 | `assets/models/`、`js/modules-scene.js` |
| 相机、灯光与轮廓效果 | `js/stage.js`、`js/materials.js`、`js/post-processing.js`、`js/shaders/` |
| 赞助名单与资金数据 | `assets/sponsors/`、`assets/avatars/`、`js/sponsors.js` |

运行库与上游 36 个独立样例见 [Anime.js 素材](../materials/animejs.md)。来源与署名见 [LICENSES.md](../../demos/cases/animejs-site/LICENSES.md)，对照结论见 [fidelity.md](../../demos/cases/animejs-site/fidelity.md)。
