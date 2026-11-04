# 98.css：带有桌面记忆的 CSS 组件

[来源、版本、许可与使用边界](../../entries/materials/98-css.json)

[本地工作台](../../demos/materials/98-css/index.html) · [结构化资料](../../entries/materials/98-css.json) · [官方完整文档](https://jdan.github.io/98.css/)

## 能力与演示范围

[官方文档](https://jdan.github.io/98.css/)明确说明，98.css 以语义化 HTML 配合 CSS，不提供 JavaScript 行为。窗口边框、蓝色标题栏、凹陷面板、表单、表格和进度条由 98.css 提供；本地标签切换、筛选、应用设置与模拟进度由原创代码实现。

| 用法 | 原库构成 | 本地组合与可操作状态 |
| --- | --- | --- |
| 设置窗口 | window / title-bar / status-bar、原生表单 | 外观和选项两页；应用配色、说明与留白；恢复默认 |
| 素材目录 | sunken-panel、table、highlighted | 名称筛选、选中摘要、无结果分支 |
| 传输进度 | progress-indicator、segmented | 实心和分段切换、开始、暂停、10% 步进、重置与完成 |

官方浏览器观察确认标准复选框可选中。源码显示默认控件为 11px；本地适配 CSS 将控件提高到 14px、辅助文字至少 12px，按钮至少 36px 高，并扩大标签点击区域。

## 参数与接入

接入方式见结构化条目；将样式及相邻字体一并部署；本页无 CDN、框架或构建器依赖。每个独立目录包含 HTML、适配 CSS、原创 JavaScript、官方 CSS 与字体，Agent 构建提供完整文件路径与角色。

`index.html?demo=settings`、`?demo=catalog`、`?demo=progress` 定位三种用法。`theme=light`／`theme=dark` 指定外层说明主题；同源嵌入跟随 Atlas 主题，窗口舞台保持青绿与灰色。

窗口类和分段进度来自[固定版本样式](https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/style.css)。三套桌面颜色、留白开关、每 240ms 增加 2% 和手动每次 10% 都是本地演示参数。进度来自本地计时器与手动步进。

## 输入、动态与后备

标签支持左右、Home、End；表单和目录条目使用标准控件，指针与触摸点击触发相同操作。减少动态时，进度通过手动步进更新；页面隐藏或切换用法时暂停，返回后不自动续播。没有声音，窗口舞台保留固定配色，外层说明跟随 Atlas 主题。

`..?fallback=1` 可查看主动关闭交互的静态首屏；无 JavaScript 时保留样式、原生设置首屏和来源说明，应用等操作不执行。CSS 缺失时仍可阅读语义化内容，但无法呈现复古外观。

字体与 CSS 的许可分别收录在 [许可索引](../../demos/materials/98-css/LICENSES.md)。
