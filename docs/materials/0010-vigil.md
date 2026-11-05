# Vigil：24 件点彩生成作品

[结构化条目](../../entries/materials/0010-vigil.json) 提供来源、许可和站内画廊。

## 这是什么

Vigil 是艺术家 0010 的长线生成艺术系列。本条目收录 2026-09-27 至 2026-11-04 的 24 件 demo：18 段单件视频、4 张静帧与 2 段家族视频，并提供本库实现的 WebGL2 复刻。

作者在 2026-09-27 的帖子中称，Vigil 是 Curtains（2023）的自然演进，生成种子会有运动。

## 画面语言

浅色或墨色外框包住圆角内框；底纸有细纹，带场交替使用点彩、细线与实色。点的疏密和大小改变明暗，红球、浅色球、暗色球与日食在带场上形成落点。

- **同心带 `rings`：** 在到圆心的距离上叠加低频扰动，圆心在画内或画外；对应 `rings-pale`、`arcs-rust`、`arcs-sand`、`arcs-night`、`rings-green-eclipse`、`rings-olive-void`、`arcs-grey-planets`。
- **波层 `dunes`：** 水平方向的正弦叠加形成波高，再按纵向场值分层；对应 `eclipse-slate`、`dunes-crimson`、`black-sun-teal`、`dunes-ember`、`dunes-sand`、`dunes-navy-sun`、`dunes-violet-planets`。
- **折带 `steps`：** 竖向带沿分段折线横移，折角在短距离内圆化；对应 `steps-blush`、`steps-rose`、`steps-rust-teal`。
- **阶地 `terraces`：** 连续波状阶梯与重复折线沿对角方向展开，片内相位改变点密度与细线；对应 `terrace-ice`、`terrace-brown`、`terrace-indigo`。
- **鳞带 `scallops`：** 纵向重复内弧，并以点的密度和细线区分相邻列；对应 `scallops-teal`。
- **漩涡 `swirl`：** 坐标围绕圆心扭转，扭转角随半径平滑衰减，叠加横向 S 形位移，带场在中心绕成漩涡；对应 `swirl-night`。

大形、框和主要球体的位置关系固定；颗粒沿带场切向移动。四张静帧固定在 `t=0`。逐件差异、运动与可测量结果见 [复刻对照](../../demos/materials/0010-vigil/fidelity.md)。

## 复刻怎么工作、怎么调

`demo/renderer.js` 导出 `renderPiece(canvas, params, t)`，使用原生 WebGL2。固定种子的伪随机数生成器在 CPU 上按带场与密度拒绝采样，点实例总数上限为 60 万；参数与时刻相同，画面就相同。绘制顺序是外框、圆角内框、底纸、带场、细线、点彩与球体。

24 件作品的参数在 `demo/pieces.js`：

- `field` 定义二维坐标到场值 `u` 的映射。修改圆心、正弦的振幅与相位、折线节点、鳞带周期或扭转半径，调整大形；阶地的 `wave` 定义波状阶梯，`staircase` 定义重复折线的高度、圆化和倾斜。
- `bands` 按 `u` 分段，设置 `base` 底色、`density` 点密度、`radius` 点半径范围、`colors` 与 `weights` 点色及占比、`lineSpacing` 与 `lineWidth` 细线间距和宽度。`continuousBands` 使片内密度、颜色和细线在相邻参数间连续变化。尺寸以 1080 宽为基准；细线用 `fwidth` 按距离抗锯齿，线距小于约两个设备像素时，细线淡化到平均灰度。
- `spheres` 设置 `center`、`radius`、`color`，`mode` 可选 `flat`、`shaded`、`dark`；`eclipse` 设置日冕颜色、强度和范围，`path` 保存移动球的时间与位置。
- `motion` 设置点沿场切向移动的速度。单件周期为 10 秒，`duration` 指定家族的 12.8 秒或 14.4 秒周期；`static` 使静帧始终固定在 `t=0`。

## 家族与 messenger

`family-four` 在 16:9 画纸上并排四件波层作品，`family-six` 在画纸中央排列六件环带作品。`children` 保存每件的矩形位置与独立带场参数；细线路径连接作品，红色 messenger 沿位置采样路径移动，四件与六件家族分别在 12.8 秒与 14.4 秒走完路径。家族使用同一个 WebGL2 上下文逐件绘制。

## 怎么用

在[素材详情](../../materials.html#material/0010-vigil)的“作品画廊”中点击原作首帧，弹窗同时显示复刻与原作。桌面左右排列，手机上下排列。复刻画布固定为原件分辨率，CSS 控制显示尺寸；视频默认静音循环，有音轨的作品显示“声音”按钮。

取用渲染器时复制 `demo/renderer.js` 与 `demo/pieces.js`，设置画布尺寸后调用：

```js
import {renderPiece, releaseRenderer} from './renderer.js';
import {pieces} from './pieces.js';

const piece = pieces.find(piece => piece.id === 'eclipse-slate');
canvas.width = piece.originalWidth;
canvas.height = piece.originalHeight;
renderPiece(canvas, piece, 0);
```

持续播放时在 `requestAnimationFrame` 中传入秒数；与原作视频对比时使用视频的 `currentTime`。结束时取消动画帧并调用 `releaseRenderer(canvas)` 释放 WebGL 上下文。原作保存在 `demos/materials/0010-vigil/demo/media/<id>.mp4` 或 `.jpg`；帖子、文件与作品 id 见[来源表](../../demos/materials/0010-vigil/source/README.md)，权利归属见[许可索引](../../demos/materials/0010-vigil/LICENSES.md)。
