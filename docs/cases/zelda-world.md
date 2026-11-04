# 塞尔达 WORLD · 单次参考快照

参考 URL：https://www.nintendo.com/jp/zelda/totk/world/index.html
采集日期：2026-10-07。日文 WORLD；归档本次所见，不维护官网后续变化。

首次进入时，用户先选择 ON/OFF，随后原始古代纹章显现。2 秒时纹章发亮、模糊并向外扩散，3.6 秒时切换到世界影片。公开 main.js 明确了两个原始音轨的用途：se.mp3 对应纹章显现，bgm.mp3 在入口移交影片时接续。选择 OFF 不播放；选择 ON 后可用顶栏 SOUND 关闭。音乐跨章节延续，开场音效为视觉上“打开世界”的动作配上声音。本地没有添加通用音乐或点击声。

三章“翔ける／創る／紡ぐ”叠在同一舞台，点击缩略项触发 300ms 输入锁；旧影片 1 秒模糊退场，新影片 1.6 秒、延迟 0.6 秒进入，主题字 1.6 秒、延迟 1 秒进入。片尾前 1 秒进入下一章，避免完整片尾黑场。快速连续选择时保留最后一次请求。手机水平滑动阈值为 10px 并在两端停止；桌面源代码的 wheel 翻章已被注释，本地也不添加这种交互。

原始 frame_thumbnail 角纹、8 点削角白线和 hover/current 内框呼应古代世界观。鼠标移动或触摸会唤醒界面，3 秒闲置后控件在 0.8 秒内模糊淡出，只留下影片画面。原站未见明暗主题入口，页面保持暗色舞台、青绿与象牙字标。

公开渲染依据：https://www.nintendo.com/jp/zelda/totk/assets/js/main.js 。完整最终素材来源见 assets-manifest.json。官方美术、商标与音乐版权归 Nintendo。

可复用设计原则：将主题符号用作入口和控件轮廓；用不同的进入时刻区分影片与文字的层级；闲置时隐藏控件，分开操作阶段与观看阶段。Prompt 见对应 entry。

WORLD、CHARACTER、MOVIE 导航使用官方白色与绿色艺术字图片；当前项和悬停显示绿层，叠加 10px 青绿光晕与 120% 亮度，过渡为 0.8 秒。SOUND、ON、OFF 使用官方艺术字，声音状态以象牙色下划线表达。三章缩略项上的标题保留素材宽高比；桌面标题高度最高 15px，手机高度随视口缩放。素材对应的公开样式见 [main.css](https://www.nintendo.com/jp/zelda/totk/assets/css/main.css) 与 [world.css](https://www.nintendo.com/jp/zelda/totk/assets/css/world.css)。

[本地对照与差异](../../demos/cases/zelda-world/fidelity.md)
