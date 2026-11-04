# 纪念碑谷：电影首入、奖项进入与中心画廊

## 参考与证据

- [Monument Valley 一代官方宣传页](https://www.monumentvalleygame.com/mv1)（实例）：2026-10-07：一代宣传页的白导航、影像、粉蓝奖项、奶油媒体区、画廊及社区。
- [ustwo games：Monument Valley作品页](https://ustwogames.co.uk/our-games/monument-valley/)（实例）：开发者介绍Ida、不可思议建筑和视觉幻象，支撑产品重点；本地使用实际游戏画面。
- [ustwo games：联系信息](https://ustwogames.co.uk/contact-us/)（实例）：官方伦敦工作室地址是国家分类的依据。
- [W3C WAI：Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/)（规范）：画廊用户控制、键盘和当前状态的规范参考。
- [W3C：Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)（规范）：本地减少动态分支约束：停止自动推进与背景，取消非必要位移。
- [MV1 官方公开交互脚本](https://www.monumentvalleygame.com/js/main.js)（实例）：同一页面1000ms loader、450ms章节定位、中心活动区、手机奖项分组、Slick14图及媒体播放器机制。
- [MV1 官方公开样式](https://www.monumentvalleygame.com/style.css)（实例）：同一归档页Humanist字体、350ms奖项/高度/标签过渡及画廊0.5侧图透明度。

[原站首屏](../../previews/cases/monument-valley-game-reference.jpg) · [本地桌面](../../previews/cases/monument-valley-game.jpg) · [本地手机](../../previews/cases/monument-valley-game-mobile.jpg)

## 构成与设计分析

**可观察事实：**MV1先显示一秒加载，再进入静音影片，按下载、预告、奖项、社交、媒体、十四图画廊、社区、页尾展开。当前活动区由视口中心决定；奖项以350ms双向显隐，画廊轨道以500ms切换，每3000ms自动推进，悬停或获得焦点时暂停。真实Humanist字体与品牌资产维持作品比例。

**本库分析：**影片与竖屏游戏图展示细节；几何字标、小索引、月桂与整幅色带只建立秩序。奖项在阅读中心出现，突出获奖事实；中心画廊突出当前作品，侧图则提示还可继续探索。

| 维度 | 设计职责与约束 |
|---|---|
| 配色 | 固定白导航、#221f20影像/下载/画廊、粉蓝奖项、奶油媒体、粉社区与紫页尾，以整幅色带改变观看节奏。 |
| 字体 | 官方细线几何字标与真实Humanist521 BT Roman/Bold，小号导航和28px奖项标题保持作品秩序。 |
| 版式 | 真实影像先行，内容按下载/预告/奖项/社交/媒体/十四图画廊/社区/页尾展开，左侧索引按视口中心更新。 |
| 素材 | 官方MP4、字标SVG、月亮/月桂、十四张游戏截图和社区图均本地保存，不以自行绘制替代作品。 |
| 形状 | 微小六边形索引、成对月桂与直边色带；手机圆形菜单和保留游戏原纵横比的画廊。 |
| 层级 | 影像建立体验，商店徽章提供行动，十项奖项建立信任，中心画廊展示细节并预告侧图。 |
| 动态 | 加载1000ms；章节450ms swing；奖项与手机展开350ms ease-in-out；画廊500ms ease/3000ms自动，暂停及减少动态明确可控。 |
| 协调关系 | 建筑与字标共享几何秩序，克制的控件与固定色带形成放映节奏；进入、展开与轨道分别服务内容职责。 |

## 触发、响应与体验位置

- 首次进入：白色LOADING遮罩1000ms后直接移除，真实背景视频静音循环；可持续暂停。
- 桌面左侧章节索引：点击以450ms swing将章节中心对齐视口中心；悬停或键盘进入索引时，标签350ms出现、内容降至0.2透明度。
- 奖项：视口中心进入/离开时，350ms opacity 0↔1、translateY 20px↔0，双向有效；手机Show All/Hide通过350ms高度变化展开/收回六项。
- 十四图画廊：500ms整条水平轨道、3秒自动推进、无限首尾衔接；桌面三张、手机一张加20%侧图，箭头/14个索引/方向键与点击侧图有效。悬停、焦点、离屏和后台暂停。
- 前景预告：主动Play播放同一67.988秒官方MP4及原声轨；原生进度/暂停和实际声音开关有效，播放时暂停背景。
- 手机圆形菜单：350ms全屏白色面板进入/退出，Escape可关闭；本地明确增加暂停、键盘、后台节流和减少动态分支。

## 主题与声音

当前MV1页面没有全局主题选择；固定白导航、深色影像/画廊及各章节品牌色，不随系统深浅切换。页面按固定顺序展示作品世界，完整色带与原始媒体营造统一氛围。

背景MP4静音循环；用户主动Play前景影片时，才播放真实原声，原生媒体控件及Sound on/off控制影片的muted状态。影片声轨与空间/解谜画面共同营造作品气氛；没有独立BGM，用户开始观看才进入有声体验。

## 复用入口

[Prompt](../../prompts/cases/monument-valley-game.md) · [案例条目](../../entries/cases/monument-valley-game.json) · [Demo](../../demos/cases/monument-valley-game/index.html) · [资产清单](../../demos/cases/monument-valley-game/assets-manifest.json)

[本地对照与差异](../../demos/cases/monument-valley-game/fidelity.md)
