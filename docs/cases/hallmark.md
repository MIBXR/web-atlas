# Hallmark：官网与主题页研究

## 来源与范围

来源为 [Hallmark 官网](https://www.usehallmark.com/) 与 [Nutlope/hallmark 固定提交](https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site)，提交 `4f6a46c6dc325d40ab268c93e25c7b96676ebccd`，对应已确认逐文件一致的线上版本。共 72 页：首页、50 个主题示范页和 21 个 Made 页，入口与目录保持原作。

官网属于 Together AI 的 skill 产品展示，来源地区为美国；主题与 Made 中的机构、人物、地址、价格和数据是示范设定。生成技能、参考与评测工具见 [hallmark-skill 素材](../materials/hallmark-skill.md)。

## 模块状态矩阵

完整六列状态矩阵、双宽像素差、冷缓存时序、声音与原作交互结果见 [fidelity.md](../../demos/cases/hallmark/fidelity.md)。

| 模块 | 入口与状态 | 对照结果位置 |
| --- | --- | --- |
| Hero | 校对标题、九牌、抬牌让位、重抽、打开主题 | fidelity 首页矩阵与冷缓存关键帧 |
| One prompt, two pages | 三组 pair、同步读到底、自动扫一次、拖动与键盘接管 | fidelity 首页矩阵的比较区 |
| How | 三问题、三主题牌、三线框预案、四条 lint、悬停重放 | fidelity 首页矩阵的 How |
| Themes | 四类计数、十项到五十项、主题对话框、前后项与焦点返回 | fidelity 首页矩阵的主题区 |
| Same | Kiln 两页与 Midnight 两页 | fidelity 首页矩阵的 Same |
| FAQ | 七个 details 独立开合 | fidelity 首页矩阵的 FAQ |
| Made | 十七卡三维转轮、自转、惯性、接管、键盘与侧页点击 | fidelity 首页矩阵的 Made |
| 安装与顶栏 | 三个 Agent 面板、命令复制、滚动表面交接与星标数位 | fidelity 首页矩阵的安装和顶栏 |

## 首页如何说明产品

**Hero** 先给可打开的证据。五张桌面页与四张手机页沿浅弧发出，名称在抬牌时出现；Deal again 先预解码另一组页面，再收回和重发。标题以划线、写入和落位将 A 改成 The，把纠正默认结果的主张变成可见动作。

**One prompt, two pages** 用同一提示词、同一模型的两张真实整页对比。外层滚动归一后分别映射到两图的溢出高度，使长短页一起读完；分隔线先示范一次，随后由拖动和键盘保持选择。

**How** 解释制作过程。四格分别呈现提问、方向、构成和检查，每格只做一个局部动作；三套线框循环说明布局不是固定模板，逐项修复把抽象检查变成可读状态。

**Themes** 证明材料范围。四流派计数与结果对应，初始只显示十项，缩小首轮选择范围。打开主题后，原生对话框显示该材料的说明与真实页面，固定 1440px 排版宽度再缩放；前后项按当前过滤结果切换，关闭后返回当前主题。

**Same** 证明同材料下仍能产生不同结构。Kiln 的陶艺学校和器物商店、Midnight 的视频工具和爵士场所分别成对展示，同组页面共用配色与字体，内容和构成则按各自用途组织。

**FAQ** 把安装条件、已有站点、主题选择、真实产品、设计系统、照片和重复结果等问题放在原位开合区。原生 details 让用户自行决定阅读量。

**Made** 扩展成品证据。三维转轮通过前后深度、明暗和当前标题组织页面；惯性后吸附，用户接触后停用闲置自转。侧页点击在本轮 Edge 中的原作结果见 fidelity。

**页脚安装** 把说明收束到实际命令。Claude Code、Codex、OpenCode 面板切换安装位置和调用方法，复制成功由勾与状态文字确认；官网首页保持无声。

## 主题页与 Made 页

材料主题把配色、字体与尺度放在 `themes/<id>/tokens.css`，公共基础放在 `base.css`，具体页面构成放在 `style.css`，状态与绘制由按需加载的独立脚本或内联脚本管理。十四个主要交互示范如下，Bloom 与 Ribbon 的视听示范单列在其后。

| 主题 | 核心机制 |
| --- | --- |
| Refract | 同一焦散着色器绘池底、课表和十五根水柱，工作日／周末切换同步说明与时间标记。 |
| Vantage | 同一点位的图层、两次扫描比较、截面与投影标注共享测量场。 |
| Coral | 信件、信封、回信和 Paid 盖章解释催款，吸附发票由滚动说明选择状态。 |
| Furrow | 程序等高线、地块和路线共用几何，放大镜重绘局部，图钉选择当天日志。 |
| Cobalt | 字符数据跨类型门解码，失败包等待重试，字段悬停联动真实几何连线。 |
| Terminal | 配置文本组成灰度兔与字标，指针加热字格，会话逐字点亮主机路径。 |
| Hum | 顺序标记单词长出字形植物，下一词焦点和五分钟撕纸时间带同步。 |
| Almanac | 日期与港口参数共同推导潮线、高低潮、日照遮罩和读数。 |
| Atelier | 指针拨开程序雾，试香纸羽流与选香颜色联动。 |
| Studio | DOM Range 和实际矩形生成字母／区块红线，三套系统可自动预览与手动接管。 |
| Lumen | 回答逐词流入，日负载曲线与平价线并置，代码标签决定可见请求和复制内容。 |
| Specimen | 真实字形量度生成 cap、x-height、基线和 descender，试排参数与读数同步。 |
| Solstice | 数量按钮同步瓶数与订单总价，首屏日光按材料缓慢落定。 |
| Dusk | 滚动后顶栏玻璃化，作业标签切换面板，每月夜间柱列按可见状态长入。 |

Bloom 的一份十六拍谱面生成哼唱曲线、量化音符、四轨包络和合成事件；Ribbon 的推子同时控制雨、风、列车画面和声音，Listen 主动启用，Stop 淡出后挂起。Ultraviolet 用内联脚本管理 solo／mute 的视觉层次和本地音频峰值轮廓。

无外链脚本主题的 CSS 形成另一组材料：Arcade 的子像素网和字边色散、Grid 的互补裁切反白、Halftone 的网点渐隐、Midnight 的双色摄影、Overprint／Riso 的套印与错版、Pasteup 的微倾斜纸片和纤维。各主题通过统一的颜色、排版或成像规则形成可辨识的材料特征。

Made 的四个 custom 页面分别是 [伴侣预算](../../demos/cases/hallmark/made/custom-couples-budget/index.html)、[上门修车](../../demos/cases/hallmark/made/custom-mobile-bike-repair/index.html)、[照片改名 CLI](../../demos/cases/hallmark/made/custom-photo-rename-cli/index.html) 和 [拉面柜台](../../demos/cases/hallmark/made/custom-ramen-counter/index.html)，根据各自用途组织页面，并与主题材料生成页一同构成成品展示。

## 全部页面清单

50 个主题按首页网格顺序排列，从本站案例首页的 Show all 50 themes 展开。

| 主题 | 流派 | 材料 | 示范品牌 |
| --- | --- | --- | --- |
| [Refract](../../demos/cases/hallmark/themes/refract/index.html) | 氛围 | 阳光照在白色灰泥上，水光在表面流动 | Bellwater Lido |
| [Cobalt](../../demos/cases/hallmark/themes/cobalt/index.html) | 现代极简 | 干净的开发者工具，以一抹电光蓝点睛 | Relay |
| [Dusk](../../demos/cases/hallmark/themes/dusk/index.html) | 现代极简 | 暮色薄雾与石板底色，产品置于烟色玻璃中 | Closewise |
| [Vantage](../../demos/cases/hallmark/themes/vantage/index.html) | 现代极简 | 夜间扫描，每个点都经过测量与扫掠 | Swath |
| [Furrow](../../demos/cases/hallmark/themes/furrow/index.html) | 现代极简 | 暖纸上的实用农场办公室，以一抹橘色点睛 | Fieldbook |
| [Studio](../../demos/cases/hallmark/themes/studio/index.html) | 社论 | 设计工作室的白墙，作品保留真实色彩 | Field Office |
| [Atelier](../../demos/cases/hallmark/themes/atelier/index.html) | 社论 | 温暖日光中的安静工作室，石灰墙与赭褐色 | Maison Orla |
| [Ribbon](../../demos/cases/hallmark/themes/ribbon/index.html) | 氛围 | 安静夜色、机加工推子与一颗亮着的胶囊按钮 | Lull |
| [Dose](../../demos/cases/hallmark/themes/dose/index.html) | 现代极简 | 诊室般洁净的应用，带淡绿色调 | Tandem |
| [Coral](../../demos/cases/hallmark/themes/coral/index.html) | 现代极简 | 暖灰色的平静应用，以一抹珊瑚色传递信号 | Tilly |
| [Almanac](../../demos/cases/hallmark/themes/almanac/index.html) | 社论 | 石板色纸上的参考书，精确到小数位 | Tidetable 2027 |
| [Arcade](../../demos/cases/hallmark/themes/arcade/index.html) | 俏皮 | 夜间街机机柜，喧闹而明亮 | Pixel Picnic |
| [Bloom](../../demos/cases/hallmark/themes/bloom/index.html) | 氛围 | 两团陶土色微光温暖柔软纸面 | Driftsong |
| [Blueprint](../../demos/cases/hallmark/themes/blueprint/index.html) | 现代极简 | 普鲁士蓝绘图纸与白色线条 | Halden and Roe |
| [Broadside](../../demos/cases/hallmark/themes/broadside/index.html) | 社论 | 在浅黄纸上压印的木活字海报 | Wickford Autumn Machinery Sale |
| [Brutal](../../demos/cases/hallmark/themes/brutal/index.html) | 社论 | 黑色线框、硬边色块与一抹酸黄 | Unit Nine |
| [Carnival](../../demos/cases/hallmark/themes/carnival/index.html) | 社论 | 两种颜色争夺版面的游乐场招贴 | Cold Comfort |
| [Console](../../demos/cases/hallmark/themes/console/index.html) | 现代极简 | 供全天运行软件使用的石墨色面板 | Benchmark |
| [Darkroom](../../demos/cases/hallmark/themes/darkroom/index.html) | 氛围 | 近黑色墙面上的黑白照片 | Low Water |
| [Editorial](../../demos/cases/hallmark/themes/editorial/index.html) | 社论 | 非涂布纸上的黑墨杂志跨页 | Margin Notes |
| [Formwork](../../demos/cases/hallmark/themes/formwork/index.html) | 社论 | 浇筑混凝土、硬阴影与黑白摄影 | Ashgrove Concrete |
| [Garden](../../demos/cases/hallmark/themes/garden/index.html) | 社论 | 燕麦色纸、深绿墨与日光 | Hollins Orchard |
| [Grid](../../demos/cases/hallmark/themes/grid/index.html) | 社论 | 瑞士式栏网、群青色块与一处红色标记 | Kessler Archive |
| [Halftone](../../demos/cases/hallmark/themes/halftone/index.html) | 俏皮 | 奶油黄纸上经过网点印刷的漫画 | Pop Fizz |
| [Hedgerow](../../demos/cases/hallmark/themes/hedgerow/index.html) | 社论 | 深篱绿、奶油色文字与一抹亮绿新芽 | Five Mile Gin |
| [Hum](../../demos/cases/hallmark/themes/hum/index.html) | 俏皮 | 欢快而有触感，按钮像键盘按键般按下 | Sprout |
| [Ink](../../demos/cases/hallmark/themes/ink/index.html) | 社论 | 白纸、纯黑与一抹蓝绿 | Barton Road Library of Things |
| [Kiln](../../demos/cases/hallmark/themes/kiln/index.html) | 氛围 | 暗色工坊里只有炽热物体发光 | Cone Six |
| [Loom](../../demos/cases/hallmark/themes/loom/index.html) | 社论 | 窗光下近看的本色织物 | Wren Weaving |
| [Lumen](../../demos/cases/hallmark/themes/lumen/index.html) | 氛围 | 紫罗兰夜色与熔融黄铜细节 | quarry |
| [Manifesto](../../demos/cases/hallmark/themes/manifesto/index.html) | 社论 | 暖黑底上的紧排大写字与一抹战斗红 | Right to Repair Coalition |
| [Midnight](../../demos/cases/hallmark/themes/midnight/index.html) | 氛围 | 铺满边缘的午夜蓝，冷静而有电影感 | Afterimage |
| [Newsprint](../../demos/cases/hallmark/themes/newsprint/index.html) | 社论 | 地方报纸头版、粗衬线标题与分栏线 | The Lantern |
| [Overprint](../../demos/cases/hallmark/themes/overprint/index.html) | 俏皮 | 新闻纸上的两色油墨，交叠处印出苔绿色 | The Boiler Room |
| [Paste-up](../../demos/cases/hallmark/themes/pasteup/index.html) | 俏皮 | 牛皮纸板上拼贴的小志 | Small Hours Zine Fair |
| [Piste](../../demos/cases/hallmark/themes/piste/index.html) | 俏皮 | 雪白、冷色油墨与一抹钴蓝 | Col Blanc |
| [Rim](../../demos/cases/hallmark/themes/rim/index.html) | 现代极简 | 暖黑底与测量标记，俯瞰地球 | Northstar |
| [Riso](../../demos/cases/hallmark/themes/riso/index.html) | 社论 | 蓝色与荧光粉双色滚筒孔版印刷 | Off Register |
| [Solstice](../../demos/cases/hallmark/themes/solstice/index.html) | 社论 | 低垂晚光中的奶油色与金色 | Long Meadow |
| [Specimen](../../demos/cases/hallmark/themes/specimen/index.html) | 社论 | 采用纤细 Bodoni 字体的字样册 | Halyard |
| [Spore](../../demos/cases/hallmark/themes/spore/index.html) | 氛围 | 灯光与烛光照亮咖啡黑底色 | Night Cellar |
| [Sport](../../demos/cases/hallmark/themes/sport/index.html) | 社论 | 混凝土底上的赛事大写字与一抹电光黄 | Calder Valley Half Marathon |
| [Squeeze](../../demos/cases/hallmark/themes/squeeze/index.html) | 俏皮 | 森林绿与明亮近摄的水果 | Peachy |
| [Sticker](../../demos/cases/hallmark/themes/sticker/index.html) | 俏皮 | 亮粉与青柠色模切贴纸 | Pip and Pocket |
| [Terminal](../../demos/cases/hallmark/themes/terminal/index.html) | 氛围 | 页面就是终端，图像由字符印出 | burrow |
| [Terrazzo](../../demos/cases/hallmark/themes/terrazzo/index.html) | 现代极简 | 米白底上的白卡片、宽标题与铁锈色 | Sample Room |
| [Ultraviolet](../../demos/cases/hallmark/themes/ultraviolet/index.html) | 现代极简 | 淡紫纸面汇聚成一抹饱和紫罗兰色 | stemcell |
| [Vellum](../../demos/cases/hallmark/themes/vellum/index.html) | 社论 | 老印刷所里的羊皮纸、哥特体与群青 | Fenwick and Daughters |
| [Wayfind](../../demos/cases/hallmark/themes/wayfind/index.html) | 现代极简 | 等宽字导视，以钴蓝标明实时状态 | Platform |
| [Werkstatt](../../demos/cases/hallmark/themes/werkstatt/index.html) | 俏皮 | 由三原色构成的工作坊 | Summer School of Making |

21 个 Made 页按目录名排序；本站案例首页从转轮和 Same 区块进入，转轮含 Made 页和主题页，共 17 张牌。

| 页面 | 主题 | 需求 | 首页入口 |
| --- | --- | --- | --- |
| [Ward Hollis](../../demos/cases/hallmark/made/atelier-architect/index.html) | atelier | 建筑事务所 | 转轮 |
| [Little Otters](../../demos/cases/hallmark/made/bloom-swim-school/index.html) | bloom | 游泳学校 | 无 |
| [Rowan](../../demos/cases/hallmark/made/cobalt-database-client/index.html) | cobalt | 数据库客户端 | 转轮 |
| [Kneedle](../../demos/cases/hallmark/made/coral-physio-booking/index.html) | coral | 物理治疗预约 | 无 |
| [Ours](../../demos/cases/hallmark/made/custom-couples-budget/index.html) | 自定义 | 伴侣预算 | 转轮 |
| [Mobile bike repair](../../demos/cases/hallmark/made/custom-mobile-bike-repair/index.html) | 自定义 | 上门自行车维修 | 转轮 |
| [whenshot](../../demos/cases/hallmark/made/custom-photo-rename-cli/index.html) | 自定义 | 照片改名命令行工具 | 转轮 |
| [Ramen at the counter that stays lit](../../demos/cases/hallmark/made/custom-ramen-counter/index.html) | 自定义 | 拉面柜台 | 转轮 |
| [Ines Calvo](../../demos/cases/hallmark/made/darkroom-photographer/index.html) | darkroom | 纪实摄影师 | 转轮 |
| [Long Acre Farm Shop](../../demos/cases/hallmark/made/furrow-farm-shop/index.html) | furrow | 农场商店 | 无 |
| [Long Lane Walks](../../demos/cases/hallmark/made/hedgerow-dog-walking/index.html) | hedgerow | 遛狗服务 | 转轮 |
| [Loop](../../demos/cases/hallmark/made/hum-coding-camp/index.html) | hum | 编程夏令营 | 转轮 |
| [Wheel House](../../demos/cases/hallmark/made/kiln-pottery-school/index.html) | kiln | 陶艺学校 | Same 区块 |
| [Ashfield Stoneware](../../demos/cases/hallmark/made/kiln-stoneware-shop/index.html) | kiln | 炻器商店 | Same 区块 |
| [The Low Room](../../demos/cases/hallmark/made/midnight-jazz-club/index.html) | midnight | 爵士俱乐部 | Same 区块 |
| [Reelcut](../../demos/cases/hallmark/made/midnight-video-tool/index.html) | midnight | 视频剪辑工具 | Same 区块 |
| [Gwithian Surf School](../../demos/cases/hallmark/made/piste-surf-school/index.html) | piste | 冲浪学校 | 无 |
| [Inlet](../../demos/cases/hallmark/made/ribbon-meditation-app/index.html) | ribbon | 冥想应用 | 转轮 |
| [shift](../../demos/cases/hallmark/made/terminal-migrations-cli/index.html) | terminal | 数据库迁移命令行工具 | 无 |
| [Northdrift](../../demos/cases/hallmark/made/vellum-coffee-subscription/index.html) | vellum | 咖啡订阅 | 无 |
| [Tilde & Co](../../demos/cases/hallmark/made/vellum-translation/index.html) | vellum | 文学翻译 | 无 |

## 怎么改

[条目的 migration](../../entries/cases/hallmark.json) 列出手牌池、比较数据、主题网格、转轮和主题 token 的位置。制作入口与资源本地化用法见 [source/README.md](../../demos/cases/hallmark/source/README.md)。
