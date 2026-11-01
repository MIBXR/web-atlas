# Hallmark 复刻对照

## 范围与条件

来源为 [Hallmark 官网](https://www.usehallmark.com/) 与 [Nutlope/hallmark 固定提交的 site/](https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site)，提交 `4f6a46c6dc325d40ab268c93e25c7b96676ebccd`，归档与对照日期为 2026-11-01。该提交对应已确认逐文件一致的官网版本。本案例直接导出原作首页、50 个主题页与 21 个 Made 页，保持原入口、目录、样式、脚本、摄影、截图、英文内容及案例内字号。

浏览器为无头 Edge `155.0.4283.62`，经 CDP 操作；CSS 视口为 `1440×900`、`390×844`，DPR 1、语言 en、浅色、100% 缩放。每个新文档在页面脚本之前注入相同种子 `20261101` 的 Math.random；使用默认图形后端。以 `PORT=4180 node scripts/serve.mjs` 直接服务 worktree。

静态取景等待 `document.fonts.ready` 和图片就绪后再等 4 秒；整页取景先滚过页面、请求完整图片，再等待并回到顶部。比较页两侧进行相同滚动。首页、具有外链脚本的主题与 Carnival 的动态画面使用两个独立无头实例，分别保持渲染；其余页面使用同条件的两个标签页。Furrow 以四分之一视口步长到达纸页的 40% 可见阈值。首屏保留滚动条，整页图取文档内容宽度 `1425`／`375px`。

像素差按同位置比较 RGB，任一通道差值大于 16 的像素计为不同，比例为不同像素数除以比较区域总像素数；尺寸不同则补白到共同尺寸。动态画面的时间和输入事件间隔保留实际浏览器结果。

## 逐类资源替换

本地化入口为 [source/localize.mjs](source/localize.mjs)，逐文件来源、用途、许可与尺寸见 [assets-manifest.json](assets-manifest.json)，字体家族和摄影 credit 见 [LICENSES.md](LICENSES.md)。

| 范围 | 原值 | 本地对应 | 处理 |
| --- | --- | --- | --- |
| HTML 字体链接与 CSS 字体导入 | Google Fonts／Fontshare，共 66 个不同样式表请求 | `fonts/css/font-01.css` 至 `font-66.css` | 使用桌面 Chrome UA；同一 URL 保存一份。保留全部字体族、字重、正斜体、font-display、unicode-range 与 @font-face。 |
| 字体样式表中的字库 | Google 字库及 Fontshare，包括 `//cdn.fontshare.com/…` | `fonts/files/` | 原始响应字节，保留全部响应格式，仅把 url 改相对路径。 |
| 字体 preconnect | Google Fonts、Gstatic、Fontshare API／CDN | 删除对应标签 | 字体从案例目录读取。 |
| 19 个 Made 页的 Wikimedia 图片 | src／srcset 中 238 个不同 `upload.wikimedia.org` URL | 对应页面的 `photos/` | 逐 URL 保存原始响应字节；不同宽度分别保存；文件名采用 URL 末段，其中逗号和单引号换为下划线；429 退避重试；credit 的 Commons 外链保留。 |
| 原有摄影、截图、图标、CSS 与 JavaScript | 固定提交 `site/` 文件 | 原目录与文件名 | git archive 保留原始字节；HTML 仅作上述资源本地化；不导入仅含 `.vercel` 的上游 `.gitignore`。 |

`fonts/` 共 9,046,106 字节（8.63 MiB，含许可原文）。Made 摄影完整保留。字体逐家族按原文记录，Ultra 为 Apache License 2.0，其余按 OFL 或 Fontshare 条款。源码中没有任务所列的统计／追踪标签。GitHub 星标请求、GitHub／X 外链、example.com 示例地址和官网 OG／canonical 信息保留。

## 同视口并排结果

共 72 页、144 组视口，覆盖首页、50 个主题页和 21 个 Made 页，每组均含首屏与整页。144 组两侧的文档宽高与 scrollWidth 相同；0 组有横向溢出。下表列出任一截图像素差超过 1% 的页面与视口，共 4 页、8 组。

| 页面 | CSS 宽度 | 首屏差 | 整页差 | 原因 |
| --- | --- | --- | --- | --- |
| themes/bloom | 1440px | 4.00% | 0.00% | 6100ms 编曲开场的轨道展开与听写阶段不同 |
| themes/bloom | 390px | 5.01% | 0.00% | 6100ms 编曲开场的轨道展开与听写阶段不同 |
| themes/cobalt | 1440px | 3.09% | 0.51% | 字符场、数据包与越门解码逐帧变化 |
| themes/cobalt | 390px | 2.58% | 0.48% | 字符场、数据包与越门解码逐帧变化 |
| themes/refract | 1440px | 14.38% | 3.15% | WebGL 焦散水光随时间变化 |
| themes/refract | 390px | 1.31% | 2.24% | WebGL 焦散水光随时间变化 |
| themes/vantage | 1440px | 12.66% | 1.87% | WebGL 扫带、点云缓转与页脚扫字相位不同 |
| themes/vantage | 390px | 4.06% | 1.13% | WebGL 扫带、点云缓转与页脚扫字相位不同 |
| 其余视口合计 | 136 组 | ≤1% | ≤1% | 含 68 个两宽均在阈值内的完整页面。 |

过程证据位于 `C:/Users/mibxr/AppData/Local/Temp/atlas-work/hallmark/work/`：`static-results.json` 逐页保存文档宽高、scrollWidth、图片自然尺寸、控制台错误与失败请求；`screens/` 为两侧首屏及整页原图；`compare/<页>-<宽>.png` 为左线上、右本地的整页并排图，`-first.png` 为首屏并排图。

## 首页交互与状态矩阵

两宽均逐步读取状态并截图。原站定位相对 `https://www.usehallmark.com/`，本地对应相对 `/demos/cases/hallmark/`。

| 模块／状态 | 原站定位 | 起始条件与触发 | 原站可见响应与先后 | 本地对应 | 证据与判定 |
| --- | --- | --- | --- | --- | --- |
| 冷缓存标题校对与发牌 | `/`；`[data-hl]`、`[data-fan]` | 清缓存进入；0.95、1.5、2.5、4s 取帧 | 首绘后 A→划线→The 写入与落位；九牌发出 | 同入口与原始 headline／fan 脚本 | 连续 PNG 帧与页面内计时见 `cold-results.json`、`states/cold-*`。线上外部 CSS／字体使首绘和动画晚于本地；两侧资源就绪后均显示最终标题与到位手牌。 |
| 手牌悬停与离开 | `[data-fan-hand] .card` | 悬停 Cobalt，移开 | 牌抬升、名称出现，邻牌让位；离开复原 | 同名卡片 | 两侧同牌 is-up 与变换一致，图片全部就绪；`home-*-card-hover-*`。 |
| 色块反向抬牌 | `[data-chips]` | 查找色条入口 | 当前 HTML 中该节点数为 0 | 同样为 0 | 源码 fan.js 保留可空的色条分支，页面没有可操作色块；两侧一致。 |
| Deal again 与连按两次 | `[data-fan-deal]` | 单次点击；随后快速双击 | 收牌、换九个不在当前桌面的主题、再发；busy 拦住第二次点击 | 原作 fan.js 与本地 WebP | 两宽每轮两侧 slug 序列一致，九图全部加载；`deal-again`、`deal-double`。 |
| 点牌打开主题 | `.card`、`[data-th-dlg]` | 点手牌 | 对应主题名、材料说明及 iframe 打开 | 原作主题对话框 | 两侧 iframe complete、字体 loaded；Escape 后聚焦主题网格中的对应链接；`card-dialog*`。 |
| 两整页同步阅读 | `[data-cmp-pin]`、`[data-cmp]` | 滚过起点、中点和终点 | 两图以共同进度读到各自底部 | 相同 pair 与变换 | 桌面终点位移均为 -2525.4／-4217.5px；图底与画框底差小于 0.1px；窄屏对应状态一致。 |
| 分隔线自动扫一次 | `[data-cmp-handle]` | 首次进入比较区 | 50→74→30→50 | 相同自动扫 | 单页连续观测两宽、两侧均覆盖 30–74；`feedback-results.json` 与 `sweep-mid-*`。 |
| 拖动、方向键与扫动中接管 | `[data-cmp]`、`[data-cmp-handle]` | 拖至 70%；Left；Shift+Right；另一次首入扫动中拖至 23% | 手动值替代自动扫，键盘每次 2%／Shift 10% | 同一 set／mine 流程 | 常规序列 70→68→78；扫动中接管后读数为 23，1.7s 后仍为 23；`interaction-final.json`。 |
| 切换比较标签 | `[data-cmp-tabs]` | 选三组标签 | pair、问题数和阅读高度换组 | 三组本地整页 WebP | 各 pair 两图 complete，两侧选择和高度对应；`pair-*`。 |
| How 入场与线框循环 | `[data-how]`、`[data-wire]` | 进入视口并等待 | 三问题依次出现、三牌发出、四项 lint 修复；线框 0→1→2 循环 | 原作 how.js | 两宽问题数 0→3、修复数 0→4；1.9s 线框更新及逐项 class 变化见 `feedback-results.json`。 |
| How 悬停重放 | `.how__art--deal` | 从外部移入发牌格 | is-dealt 清除，260ms 后恢复 | 同一原作事件 | 两宽两侧均记录 false→true；`how-replay-*`。 |
| 四流派、计数与更多 | `[data-th-filter]`、`[data-th-more]` | 依次选四类；初态点击 Show all | 20／12／9／9 项；初态 10→50 项，焦点到第 11 项 | 同一主题网格 | 两宽过滤数与显示数逐项相同；`filter-*`、`themes-collapsed`、`themes-more`。 |
| 主题悬停材料文字 | `.th__link[data-slug=refract]` | 悬停主题缩略图 | 缩略图描边强调；材料文字在对话框显示 | 相同 CSS 与 data-mat | 悬停伪元素 content 均为 none，网格没有材料说明层；两侧一致。 |
| 对话框缩放、前后与焦点 | `[data-th-dlg-page]` | 开 Refract→下一项 Cobalt→上一项 Refract→Escape | 实页按 1440px 布局缩放，关闭后聚焦 Refract 链接 | 同名 iframe 和按钮 | 两宽 iframe 尺寸与缩放相同；桌面 scale=.85、框宽 1224px；`theme-dialog`、`dialog-next/prev/escape`。 |
| Same 区 | `#same` | 滚动到达 | Kiln、Midnight 各两页并列 | 原作四幅页面截图与链接 | 两宽到达、图片就绪，主要布局与原站一致；`same`。 |
| FAQ | `#faq details` | 七项分别展开再收起 | 原生独立开合 | 原作 details | 两宽七项均开合，状态数一致；`faq-*`。 |
| Made 拖动、惯性与再次拖动 | `[data-wheel]` | 拖动并松手；惯性中反向拖动 | 松手后继续转，反向拖动接管，再吸附 | 原作 wheel.js | 两宽两侧均有松手后的角位移和再次接管；事件间隔使个别吸附项不同；`interaction-final.json`、`wheel-inertia/redrag`。 |
| Made 闲置与键盘 | `[data-wheel]` | 未接触时等待；方向键切项；接触后等待 | 闲置自转，方向键选择，接触后停用闲置转动 | 原作轮与 17 张卡 | 两宽两侧均观察到自转、键盘切项、吸附后停止自转；`wheel-keyboard`、`idle-stopped-*`。 |
| Made 点侧页 | `.wheel__card` | 点击可见的侧牌 | Edge 155 中当前项保持，侧页选择未生效 | 相同现象 | 两宽两侧 pointerdown 命中侧牌，pointer capture 后 click 目标为 wheel，卡片 click 分支未命中；`wheel-side-results.json`。此项未通过。 |
| 安装标签与复制 | `[data-ag-tabs]`、`[data-copy]` | 选 Claude／Codex／OpenCode；复制命令 | 对应 panel 切换；按钮变勾并播报 Copied | 原作 tabs／copy | 三面板状态相同；两宽两侧 Clipboard 读回均为 `npx skills add nutlope/hallmark -g`，反馈均为 Copied；`feedback-results.json`。 |
| 顶栏与 GitHub 数字 | `[data-nav]`、`[data-gh]` | 滚动、悬停、等待星标响应 | 顶栏纸面／暗面变化，悬停为背景和描边／阴影变化；数位滚到实时星标 | 原作 core.js／CSS | 两宽 class 与数位终点对应；当前源码没有指针跟随光斑，background-image 为 none；`nav-stuck`、`github-hover`。 |
| 减少动态 | `prefers-reduced-motion: reduce` | 携带偏好首入 | 直接给最终 The 和内容，How 三问题与四修复已呈现 | 原作偏好分支 | 两宽两侧无标题 ghost，标题 class 为 hl，问题 3、修复 4；`reduced-motion`。 |

## 冷缓存关键帧

| 导航后时刻 | 线上 1440px | 线上 390px | 本地两宽 |
| --- | --- | --- | --- |
| 0.95s | 首绘前空白，文档 loading | 首绘前空白，文档 loading | A，字体 loaded |
| 1.5s | 首绘前空白，文档 loading | A，字体 loading | 校对动画中，The 开始写入 |
| 2.5s | A，字体 loading | 校对动画中 | The 放大落入行内 |
| 4s | 校对动画中 | 校对动画中 | 最终黑色 The |

页面内定时采样记录真实 `performance.now()`；连续帧选择对应时刻最近的已显示帧，首绘前使用当时的空白帧，静止后使用仍显示的最终帧。逐帧时间与文档状态见 `cold-results.json`；资源就绪后的静态首屏比较见上表。

## 主题页主要操作

以下各项均在两宽、两侧实际操作并截图，逐项状态、控制台和请求记录位于 `theme-results.json` 与 `theme-states/`。

| 主题／状态 | 原站定位 | 起始条件与触发 | 原站响应 | 本地对应 | 证据与判定 |
| --- | --- | --- | --- | --- | --- |
| Bloom 声音 | `/themes/bloom/`；`[data-play]` | 点击播放，再停止 | AudioContext running；停止后 UI 复位、主增益断开，Context 保持 running | 同一谱面与合成脚本 | 两侧状态及播放按钮一致，通过。 |
| Ribbon 声音 | `/themes/ribbon/`；`[data-listen]` | Listen→Stop | running→suspended，停止约 900ms 后挂起 | 同一夜景与合成脚本 | 两宽两侧一致，通过。 |
| Ultraviolet 音频 | `/themes/ultraviolet/`；solo、`.drop__file` | 选 solo，再读 1 秒本地 WAV | 通道降强调；绘峰值，解码 Context closed | 同一内联脚本 | 两侧波形与关闭状态一致；页面没有启用试听／播放按钮，声音播放状态无可触发入口。 |
| Refract | `/themes/refract/`；`[data-days=weekend]` | 选择周末 | 水柱换组，说明变为早八点前最安静 | 同一水面与图表 | 两侧说明和控制状态相同，通过。 |
| Vantage | `/themes/vantage/`；`[data-layer]` | 关闭 Ground | 地面层关闭，其他层保留 | 同一场地点云 | 两侧 checkbox 状态和画面对应，通过。 |
| Coral | `/themes/coral/`；tone | 选择 Firm | 信件与朗读说明切为逾期付款语气 | 同一纸面与文案 | 两宽两侧说明完整相同，通过。 |
| Furrow | `/themes/furrow/`；`[data-entry=fld]` | 点击 Field work 图钉 | Field work 卡页与图钉选中 | 同一地图与日志 | 两侧 fld 选中，通过。 |
| Cobalt | `/themes/cobalt/`；`[data-replay-go]` | Replay | sent→200 OK，新增日志和耗时 | 同一字符场与回执 | 两侧回执和 busy 结束状态对应，通过。 |
| Terminal | `/themes/terminal/`；`#tab-cargo` | 选 cargo | 安装命令切为 cargo | 同一字符画与安装区 | 两侧 tab／panel 一致，通过。 |
| Hum | `/themes/hum/`；首个 `.tile` | 点 The | One word, one plant；第一株成长 | 同一阅读花园 | 两侧词状态、植物和文字一致，通过。 |
| Almanac | `/themes/almanac/`；`[data-port=1]` | 选 Middle range | 港口状态、潮线与高低潮／日照读数重算 | 同一推导图表 | 两侧港口选中及读数对应，通过。 |
| Atelier | `/themes/atelier/`；`[data-scent=2]` | 选 Rosemary | 纸条／标签选中，香气色场换色 | 同一场与选择脚本 | 两侧 No.2 选中，通过。 |
| Studio | `/themes/studio/`；`[data-sys=3]`、`[data-measure]` | 选系统3，再指向测量区块 | board3 显示，红线和尺寸读数出现 | 同一实测工具 | 两侧系统、读数和红线对应，通过。 |
| Lumen | `/themes/lumen/`；代码 tabs | 选 python | 可见请求代码换为 Python | 同一流式回答与代码区 | 两侧 tab／panel 一致，通过。 |
| Specimen | `/themes/specimen/`；size、Italic | 范围条 End，再选 Italic | 字号 160、weight 400、斜体 | 同一试排区 | 两宽两侧值和样本对应，通过。 |
| Solstice | `/themes/solstice/`；`[data-q=1]` | 数量加一 | 2→3，Order 3 bottles, £48 | 同一计数逻辑 | 两侧数量与金额相同，通过。 |
| Dusk | `/themes/dusk/`；tabs | 选 Flags | 对应差异标记演示面板显示 | 同一主题面板 | 两侧标签与面板相同，通过。 |

## 保留差异与运行结果

- 字体与 Wikimedia 请求按资源表改为本地路径，原作画面和交互代码保留。冷缓存首绘及校对动画的绝对时刻因字体／样式表到达时间不同；资源就绪后的布局对应。
- Canvas／WebGL、开场演示、跑马字与 Made 自转保留实际时间相位；拖动惯性保留实际输入事件间隔。相关像素差逐页列于结果表。
- 转轮点侧页在本轮 Edge 中两侧均未切项，事件重定向链已记录。色条反向抬牌、网格悬停材料文字、GitHub 指针光斑和 Ultraviolet 试听均按当前页面入口记录。
- JavaScript console.error 与未捕获异常为 0。捕获到的非成功资源请求均指向本地服务器根 `/favicon.ico`（404）；案例图片、字体、样式和脚本完成加载。

制作入口见 [source/README.md](source/README.md)，许可见 [LICENSES.md](LICENSES.md)。
