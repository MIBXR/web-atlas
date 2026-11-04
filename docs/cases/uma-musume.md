# 赛马娘：群像、斜切节奏与玩法轨道

## 真实旅程

正常首次进入时，页面展示赛道群像、品牌与平台下载徽章；向下依次经过 News、About、Gameplay、Characters、Media 到 footer，再反向回到首屏。在 2040×938 的现场视口中，各章组成原生长页，没有整屏滚轮锁定。未见独立声音门或深浅主题切换。

Gameplay 三态由真实角色立绘、两张游戏截图与文字板共同水平移动，源样式为 **400ms cubic-bezier(.25,1,.5,1)**；第 1 态禁用 Previous，第 3 态禁用 Next。角色区域是否有持续滚动的 marquee 尚未确认，本地未添加。

点击 About 缩略图后，站内打开原生视频：[top_about.mp4](https://umamusume.com/assets/videos/top_about.mp4)。原始 MP4 容器仅有视频轨道、没有音轨。关闭视频后返回长页，比赛画面的剪辑形成节奏。官网其他 PV 外链的声音未在本地核实，未发现独立 BGM。

## 触发 → 响应 → 目的

| 触发 | 响应 | 目的 |
| --- | --- | --- |
| 正常上下滚动 | 群像后进入安静新闻，再进 PV 和复杂玩法 | 情绪与信息密度交替，而不把每章套一张卡片 |
| Gameplay Next/编号 | 400ms 整块横移，立绘/截图/文案对应 | 以真实玩法证据解释一个玩法主题 |
| 到轮播首尾 | 对应箭头禁用 | 明确内容数量，不制造无尽自动翻页 |
| 点击 About | 原始无音轨 MP4 在 modal 播放 | 奔跑与比赛画面的剪辑表现赛场节奏，用户决定进入 |

## 风格与理论

奔跑方向与赛道纵深形成运动感；反复出现的斜切标题带、人物与游戏截图统一页面风格。白底新闻降低视觉负担，真实平台徽章提供熟悉的操作入口。固定白/绿主题来自赛场情境，本地未添加暗色版本。

[W3C Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/) 支持用户控制、键盘和当前状态，[Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 支持本地减少动态。两者是本地适配的依据。

## 导航观察

原页异步注入公共导航。加载后确认其使用固定的蓝色纹理导航和真实 Logo：首屏桌面放大 2.8 倍，滚过 `min(innerWidth,2000)*0.07` 缩回基准，反向恢复，过渡 300ms cubic-bezier(.19,1,.22,1)；手机比例为 1.72。公开样式和 inject-components.js 与现场尺寸相互佐证。

[本地对照与差异](../../demos/cases/uma-musume/fidelity.md)
