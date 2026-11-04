# 原神：版本舞台、人物换色与声线

## 真实浏览与公开代码

从首屏进入后，依次向下浏览角色/武器、登录福利、活动日历、Xbox/Paimon、footer，再反向返回。文档滚动位置保持 0，位移发生在垂直 Swiper wrapper 上；1440×1000 视口中，主要画布高度为 810，外侧留出上下空白。末尾的 footer 最终位移不足一个整屏。

选择 Vesna 与 Vodyanitsa 时，立绘和姓名的 opacity 变化时长为 100ms，完整人物背景也从青绿变为蓝色，肖像与麦克风随人物改变。麦克风实际加载官方音频；公开配置明确 `playMode: random`、`clickOnPlaying: pause`，英文语言包为每位角色列出 3 条 MP3。源首页只有静音循环主视觉视频，没有发现独立背景音乐。

代码依据：[公开 setups](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/setups.d850a780.js)、[公开配置](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/config.73224177.js)。这些代码佐证本次快照。

## 触发 → 响应 → 目的

| 触发 | 页面响应 | 设计目的 |
| --- | --- | --- |
| 向下/向上滚轮 | 整块舞台正反位移，末尾有限位移 | 每节有完整构图与节奏，保留前后章节关系 |
| 选择人物肖像 | 100ms 立绘交叉淡化；人物与整个背景同步 | 人物拥有自己的色彩身份，而不是共用模板 |
| 点击人物麦克风 | 对应角色随机台词，再点暂停 | 用声音补充人物性格，操作和声线有明确归属 |

## 理论与主题

群像和巨标题传递情绪，下载区域引导行动；章节换色用于信息分组和建立视觉层级。人物、肖像、字体、金色边饰与完整背景共同维持幻想游戏的视觉语言。此快照采用固定 IP 主题，未见深浅切换；角色背景变化表示人物状态，不是系统主题。

[W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) 支持本地持续动画暂停，[Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) 支持本地焦点和关闭流程。这些规范用于本地可访问性适配。

[本地对照与差异](../../demos/cases/genshin-world/fidelity.md)
