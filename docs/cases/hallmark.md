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

**Themes** 证明材料范围。四流派计数与结果对应，初始十项让首轮选择收敛。打开主题后，原生对话框显示该材料的说明与真实页面，固定 1440px 排版宽度再缩放；前后项沿当前过滤结果，关闭返回当前主题。

**Same** 证明同材料下仍能产生不同结构。Kiln 的陶艺学校和器物商店、Midnight 的视频工具和爵士场所分别成对展示，共同配色与字体连接同组，页面内容及构成保持各自用途。

**FAQ** 把安装条件、已有站点、主题选择、真实产品、设计系统、照片和重复结果等问题放在原位开合区。原生 details 让用户自行决定阅读量。

**Made** 扩展成品证据。三维转轮通过前后深度、明暗和当前标题组织页面；惯性后吸附，用户接触后停用闲置自转。侧页点击在本轮 Edge 中的原作结果见 fidelity。

**页脚安装** 把说明收束到实际命令。Claude Code、Codex、OpenCode 面板切换安装位置和调用方法，复制成功由勾与状态文字确认；官网首页保持无声。

## 主题页与 Made 页

材料主题把配色、字体与尺度放在 `themes/<id>/tokens.css`，公共基础放在 `base.css`，具体页面构成放在 `style.css`，状态与绘制按需要加载独立或内联脚本。十四个主要交互示范如下，Bloom 与 Ribbon 的视听示范单列在其后。

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

无外链脚本主题的 CSS 形成另一组材料：Arcade 的子像素网和字边色散、Grid 的互补裁切反白、Halftone 的网点渐隐、Midnight 的双色摄影、Overprint／Riso 的套印与错版、Pasteup 的微倾斜纸片和纤维。它们以共同颜色、排版或成像规则建立材料身份。

Made 的四个 custom 页面分别是 [伴侣预算](../../demos/cases/hallmark/made/custom-couples-budget/index.html)、[上门修车](../../demos/cases/hallmark/made/custom-mobile-bike-repair/index.html)、[照片改名 CLI](../../demos/cases/hallmark/made/custom-photo-rename-cli/index.html) 和 [拉面柜台](../../demos/cases/hallmark/made/custom-ramen-counter/index.html)，以各自用途选择构成，与主题材料生成页共同进入成品范围。

## 怎么改

[条目的 migration](../../entries/cases/hallmark.json) 列出手牌池、比较数据、主题网格、转轮和主题 token 的位置。制作入口与资源本地化用法见 [source/README.md](../../demos/cases/hallmark/source/README.md)。
