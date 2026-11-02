# Anime.js · JavaScript 动画引擎

## 是什么

Anime.js 为网页提供统一的动画、时间线、交错、滚动、拖拽、文本与布局 API。此素材保存 v4.5.0 的 36 个上游样例、完整发行库与制作源码。[打开样例](../../demos/materials/animejs/index.html)。

## 安装与导入

```js
import { animate, stagger, createTimeline, onScroll, createDraggable, svg }
  from './vendor/animejs@4.5.0/dist/modules/index.js';

animate('.square', { rotate: 90, delay: stagger(60) });
createTimeline().add('.square', { x: 100 }).add('.circle', { scale: 1.2 });
animate('.item', { y: [80, 0], autoplay: onScroll({ sync: true }) });
createDraggable('.handle', { container: '.track' });
animate(svg.createDrawable('path'), { draw: '0 1' });
```

通过 HTTP 静态服务打开 `index.html?demo=<路径>`。目录层级保持为 `demo/examples/`，共享 CSS 与素材位于 `demo/examples/assets/`。库引用统一指向 `vendor/`；Three.js 样例的 importmap 使用 0.184.0，tweaks/gui 指向 npm 包内的 `gui.js`。

## 样例索引

36 项取自 [4.5.0 仓库示例目录](https://github.com/juliangarnier/anime/tree/2c9cf8ea00329f6768c7d7902252ed977d75ce42/examples)。官网 Examples 入口指向[作者的 CodePen 合集](https://codepen.io/collection/Poerqa)。

| 样例 | API 与来源说明 |
| --- | --- |
| [指针引导的游动生物](../../demos/materials/animejs/index.html?demo=additive-creature) | animate、createTimeline、stagger |
| [萤火虫轨迹叠加](../../demos/materials/animejs/index.html?demo=additive-fireflies) | animate、createTimer |
| [从中心扩散的点阵](../../demos/materials/animejs/index.html?demo=advanced-grid-staggering) | createTimeline、stagger |
| [平滑追随指针](../../demos/materials/animejs/index.html?demo=animatable-follow-cursor) | createAnimatable |
| [标志描线](../../demos/materials/animejs/index.html?demo=animejs-v4-logo-animation) | createTimeline、svg、stagger |
| [手风琴折叠](../../demos/materials/animejs/index.html?demo=auto-layout/accordion) | createLayout |
| [可展开卡片](../../demos/materials/animejs/index.html?demo=auto-layout/cards) | createLayout。图片沿用 picsum.photos。 |
| [代码块换行](../../demos/materials/animejs/index.html?demo=auto-layout/code) | createLayout |
| [网格列切换](../../demos/materials/animejs/index.html?demo=auto-layout/grid-columns) | createLayout |
| [导航选中态](../../demos/materials/animejs/index.html?demo=auto-layout/nav) | createLayout |
| [滚动重排](../../demos/materials/animejs/index.html?demo=auto-layout/onscroll) | createLayout、onScroll |
| [元素周期表](../../demos/materials/animejs/index.html?demo=auto-layout/periodic-table) | createLayout |
| [行星卡片](../../demos/materials/animejs/index.html?demo=auto-layout/planets) | createLayout |
| [待办清单](../../demos/materials/animejs/index.html?demo=auto-layout/todo-list) | createLayout |
| [画布粒子](../../demos/materials/animejs/index.html?demo=canvas-2d) | animate、createTimer。省去上游失效的 assets/css/styles.css 链接。 |
| [播放时钟](../../demos/materials/animejs/index.html?demo=clock-playback-controls) | animate、createTimeline |
| [无限轮播](../../demos/materials/animejs/index.html?demo=draggable-infinite-auto-carousel) | createDraggable、createTimeline |
| [滚动吸附轮播](../../demos/materials/animejs/index.html?demo=draggable-mouse-scroll-snap-carousel) | createDraggable |
| [拖拽实验台](../../demos/materials/animejs/index.html?demo=draggable-playground) | createDraggable、createSpring |
| [不等速打字](../../demos/materials/animejs/index.html?demo=irregular-playback-typewriter) | createTimeline、irregular |
| [多层变换](../../demos/materials/animejs/index.html?demo=layered-css-transforms) | createTimeline、createSpring |
| [响应式滚动区域](../../demos/materials/animejs/index.html?demo=onscroll-responsive-scope) | createScope、onScroll |
| [粘性滚动](../../demos/materials/animejs/index.html?demo=onscroll-sticky) | onScroll、createTimeline |
| [交错延迟](../../demos/materials/animejs/index.html?demo=stagger) | stagger、createTimeline |
| [动态图表](../../demos/materials/animejs/index.html?demo=svg-graph) | svg、animate |
| [路径描线](../../demos/materials/animejs/index.html?demo=svg-line-drawing) | svg.createDrawable、createTimeline |
| [文字悬停](../../demos/materials/animejs/index.html?demo=text/hover-effects) | splitText、animate。保留 Google Fonts 外链。 |
| [字符扰乱](../../demos/materials/animejs/index.html?demo=text/scramble) | scrambleText |
| [文字扰乱时间线](../../demos/materials/animejs/index.html?demo=text/scramble-tl) | scrambleText、createTimeline。删除上游未公开的 animatorkit 导入及 showGUI() 调用。 |
| [逐字拆分](../../demos/materials/animejs/index.html?demo=text/split-effects) | splitText、createTimeline。保留 Google Fonts 外链。 |
| [拆字实验台](../../demos/materials/animejs/index.html?demo=text/split-playground) | splitText。保留 Google Fonts 外链。 |
| [三维对象变换](../../demos/materials/animejs/index.html?demo=threejs/transforms) | animate、threeAdapter |
| [五万颗星](../../demos/materials/animejs/index.html?demo=timeline-50K-stars) | createTimeline、animate |
| [椋鸟群](../../demos/materials/animejs/index.html?demo=timeline-refresh-starlings) | createTimeline |
| [无缝循环](../../demos/materials/animejs/index.html?demo=timeline-seamless-loop) | createTimeline、stagger |
| [时间线压力演示](../../demos/materials/animejs/index.html?demo=timeline-stress-test) | createTimeline |

## 官方文档

[Anime.js documentation](https://animejs.com/documentation)。许可与署名见[LICENSES.md](../../demos/materials/animejs/LICENSES.md)。
