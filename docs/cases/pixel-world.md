# 像素：微型世界

调研日期：2026-10-07。这里研究低分辨率世界与探索式网页。

## 真实案例

[Celeste 官方页](https://www.celestegame.com/) 用登山旅程、预告和明确的平台购买入口组织产品信息，并列出 Pedro “Saint11” Medeiros 等创作者。本例借用“以世界和任务讲述产品”的组织方式，地图导航为本地原创。人物、山景与音乐都没有搬到本地。

[PICO-8 官方介绍](https://www.lexaloffle.com/pico-8.php) 明确说明128×128画布、16色、8×8精灵等约束，强调有限规模可以鼓励小而有表现力的作品。本例据此选择低分辨率地图。

## 理论与实现依据

[PICO-8 官方手册](https://www.lexaloffle.com/dl/docs/pico-8_manual.html) 的图形与地图部分给出色板索引和tile模型。本 Demo 使用其16色色板，在128×128 Canvas上用整数像素绘制原创地形、灯塔、树林、村庄和角色。

[Saint11 公开教程集](https://saint11.art/blog/pixel-art-tutorials/) 是游戏像素美术师的逐题示范，涵盖色彩、轮廓与动画等主题。这里只迁移逐像素控制和轮廓辨认的实践，不复制教程插图。[MDN image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering) 则说明图像缩放时pixelated/crisp-edges的行为，作为网页放大的实现依据。

## 我的设计判断

像素风的主题来自自洽的尺度、轮廓和色彩关系，而非滤镜。因此 Tiny Tides 用小岛作实际导航：每个地点有清楚的形象、对应按钮、文本描述与旅行记录。角色的位置会跟随操作变化。正常可读的中文段落放在场景外。

## 映射与约束

| 原始启发 | 本地原创实现 | 检查点 |
|---|---|---|
| 小画布与8×8 tile | 128×128地图、16×16tile地形 | Canvas本身不使用高分辨率矢量伪像素 |
| 世界与任务 | 四个地点和旅行手账 | 地点按钮同步角色位置/文本 |
| 清晰轮廓 | 像素树、房屋、灯塔 | 无原作角色和素材 |
| 网页可达性 | DOM地标、键盘方向、文本索引 | 不用只可鼠标点击的Canvas区域 |

桌面地图以512px/4倍显示，窄屏优先完整显示地图；CSS保留像素边缘。角色不能走到水里，遇到边界时会显示文字反馈。地点访问记录和手账只保存在当前浏览器，不需要账号。重置会清除本Demo专用键，不影响其他页面数据。无音频自动播放、外部字体或网络素材。

所有品牌、地图、地名和旅行文本均为原创虚构。[结构化Prompt与约束](../../entries/cases/pixel-world.json)；[本地Demo](../../demos/cases/pixel-world/index.html)。
