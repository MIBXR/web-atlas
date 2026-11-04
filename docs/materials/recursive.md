# Recursive：从界面到招牌的五轴字体

[来源、版本、许可与使用边界](../../entries/materials/recursive.json)

[打开字体试排](../../demos/materials/recursive/index.html) · [结构化条目](../../entries/materials/recursive.json) · [官方样张](https://www.recursive.design/)

Recursive 把比例字体与等宽字体放在一个可变字体文件中，并能独立调整手写个性、字重、倾斜与草写字形。这里使用官方字体，三种布局与配色是 Web Atlas 的原创组合。

## 来源与参数

[固定版本 README 的 Variable Axes](https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/README.md#variable-axes) 给出以下范围。本地使用同一范围；步长、字号、文案和组合为本地选择。

| 轴 | 范围 | 含义与适配 |
| --- | --- | --- |
| `MONO` | 0–1 | 0 为比例字宽，1 为等宽；改变它会改变横向布局。 |
| `CASL` | 0–1 | 由 Linear 到 Casual，调整笔画曲线、端点和个性；大标题优先选端点。 |
| `wght` | 300–1000 | 由 Light 到 ExtraBlack；重字重应配较大字号。 |
| `slnt` | −15–0 | 负值表示前倾；与草写字形分开控制。 |
| `CRSV` | 0、0.5、1 | 始终正体、随倾斜自动、始终草写；自动模式在 −14° 附近切换字形。 |

官方样张的 `#chooseInstance` 提供命名样式选择。在浏览器中选择 `Mono Casual ExtraBlack Italic` 后，页面显示 MONO 1、CASL 1、wght 1000、slnt −15、CRSV 1。此处只观测了该命名预设的控件响应。完整能力的依据见上游文档，本地样例展示三种具体使用场景。

## 三种试排

三套预设的参数见 [条目中的样例基线](../../entries/materials/recursive.json)。先选择试排用途，再输入当前项目的真实文字。

可以替换试排内容，调整五个轴和字号，再复制当前 CSS。代码样例展示字体试排。切换预设和重置会恢复当前预设的文字与参数；后备开关保持用户选择。所有文本保留在 DOM 中，标签和滑块可用键盘操作，触摸滑动使用原生控件。

混排时观察字号、行高和换行。字体为拉丁文字及相关符号设计，中文回退到系统字体，混排字重与行高由 `demo/demo.css` 设置。数学希腊字母范围见条目来源。

## 自托管

`demo/demo.css` 的 `@font-face` 从 `fonts/` 加载完整 WOFF2，`font-weight: 300 1000` 声明字重范围，五个轴通过 `font-variation-settings` 控制。保留完整原字库；无需 CDN、框架或 JavaScript 字体库。实际文件与许可见[许可索引](../../demos/materials/recursive/LICENSES.md)。完整导出包含字体，`--code-only` 导出提供源码。首次加载下载完整字体文件。

字体加载中使用系统后备，成功后显示明确状态；失败或浏览器不支持可变设置时继续显示文字。“模拟字体不可用”显示系统字体的后备布局。没有自动动画或声音，无持续后台任务，减少动态偏好下操作不变。

`index.html?preset=interface`、`?preset=code`、`?preset=poster` 定位三种试排。`theme=light`／`theme=dark` 指定控件主题；同源嵌入跟随 Atlas 主题，独立打开使用已保存的主题或系统偏好。复制按钮提供当前 CSS；剪贴板不可用时选中代码供手动复制。
