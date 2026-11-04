# 终末地：从完整门户理解明亮工业语言

归档 **2026-10-09**，[中国大陆官网](https://endfield.hypergryph.com/)。研究覆盖当日公开门户的八章。干员/玩法/AIC的白底亮黄是其中一种分区语言；活动首页采用雪凇幽梦，世界观分区采用深色点云。

## 一手观察与源码证据

主负责人实际浏览了黑/黄Updating、活动首页、干员与2D→3D、世界观和其他分区，并通过浏览器开发工具采集原站DOM/CSS、portrait规则、公开Next数据与资源。静态抽取只解析JSON/literal与模块引用，不执行原bundle；模块的原URL/hash及偏移可回读。当前干员模块18039包含35项，中文layout另有含26项的旧数组，两者不可混用。35项各有头像/立绘/肖像/enter/idle，共175项资源，元数据与中文flat文本的映射完整。

原站的“3D”不是人物网格。实际使用干员祀的3840×1080影片，将左右两侧的RGB/alpha合成为1920×1080透明canvas；源码alpha=R*.3+G*.59+B*.11，enter ended后切换为idle循环。世界观另有六个原始Float32 xyz点云：帝江号、锚点、集成工业系统、天师桩、天使、裂地者。这些点云无header，按Y跨度1900规范化后应用各模型的offset/pivot/scale/laser参数。扫描、拖动、转场和边缘的对照结果见本体复现说明。

影像的10项内容都有真实标题/日期/分类和预览，玩法四项为视频、AIC五项为图片。原相册黑→黄→媒体400ms各delay0/250/500，文字500/500ms。原公告采用左clip500ms与Y30%组件600ms入场，延迟300ms后卡片300ms横移。比起单纯配色，原CSS字体、斜线大字、网格/mask、媒体书脊与自然滚动构成更有辨识度。

## 交互声音

干员页用短促机械音确认操作，头像悬停不发声。当前官网实测中，以下四段音效均进入实际 `playing` 状态，音量为 `1`；重复点击已选头像仍播放，双击会让两个音频对象重叠。

| 操作 | 官方音效 | 浏览器读取时长 |
| --- | --- | --- |
| 选择头像、2D/3D切换 | [char_click.beff5b.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/char_click.beff5b.mp3) | 0.625秒 |
| 上下翻动头像轨道 | [arrow_click.a72c10.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/arrow_click.a72c10.mp3) | 0.217秒 |
| 手机展开人物档案 | [char_detail_enter.babc4e.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/char_detail_enter.babc4e.mp3) | 1.467秒 |
| 手机关闭人物档案 | [close_click.fe1dc4.mp3](https://web.hycdn.cn/endfield/official-v4/_next/static/media/sound/close_click.fe1dc4.mp3) | 0.435秒 |

[源码8858模块26097](https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/8858-4aae27eec09dc3ad.js)使用由10个 `HTMLAudioElement` 组成的音频池，检查持久化的 `ef-official-sound-control.enabled` 状态。同一音效可叠加，音频池没有空闲槽位时忽略新声音，播放结束后归还槽位；关闭声音只阻止后续短音效。[Header源码226](https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/226-a3c1ec0fe1472086.js)将PC及手机的喇叭按钮接入同一全局状态，并同时控制循环BGM；手机关闭时切换为静音SVG及 `#cccccc`，开启时使用原喇叭SVG。BGM独立淡入淡出，并在后台暂停；源码配置桌面音量1、移动UA音量0.1，短音效则固定音量1。

## 实现与可提取机制

原[明日方舟案例](../../entries/cases/arknights-world.json)的暗灰青色全屏档案与[莱茵影像](rhine-lab.md)的米白橙色有不同媒介与状态证据。

[斜线注册大字与前景记录](../../entries/patterns/hatched-registration-type.json)抽取装饰尺度与记录层级，原站shallow背景的opacity .05、纹理 .75rem及mask可回读；[竖向类别书脊与横向媒体](../../entries/patterns/vertical-media-spine.json)抽取类别与媒体的共同边界。继续复用既有的[单一信号色](../../entries/patterns/restrained-signal-color.json)，不按品牌重复建立“黄绿工业”分类。

[本地对照与状态矩阵](../../demos/cases/endfield-industrial/fidelity.md)。
