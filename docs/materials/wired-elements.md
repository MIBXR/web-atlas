# Wired Elements：有手绘语言的可操作组件

[来源、版本、许可与使用边界](../../entries/materials/wired-elements.json)

[本地工作台](../../demos/materials/wired-elements/index.html) · [结构化资料](../../entries/materials/wired-elements.json) · [作者完整示例](https://wiredjs.com/showcase)

## 三种可借用组合

| 场景 | 组件与参数依据 | 本地职责 |
| --- | --- | --- |
| 任务清单 | [checkbox 的 checked / change](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-checkbox/README.md)、[progress 的 value / max](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-progress/README.md) | 三项任务和 1/3 默认进度为本地示例；勾选实时同步并可重置 |
| 偏好面板 | [toggle 的 checked](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-toggle/README.md) | 将模式和摘要选项应用到当前预览，不保存设置 |
| 概念卡片 | [card 的 elevation 1–5 / fill](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-card/README.md)、[slider 的 value / min / max](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-slider/README.md) | 默认层级 3、纸面与填色为本地选择，变化时重绘边界 |

三者都使用真实库组件；场景布局、文案、主题与状态联动是 Web Atlas 原创组合。

## 接入与适配

按条目中的安装方式导入包。这里直接自托管官方 `lib/wired-elements-esm.js`，其中已包含组件和 Lit 运行时，不依赖 CDN。通过 HTTP/HTTPS 提供目录访问，保留其相对文件路径和许可；Agent 构建提供完整文件路径与角色。

`index.html?demo=checklist`、`?demo=preferences`、`?demo=card` 定位三种场景。`demo/demo.js` 按需加载 `vendor/wired-elements@2.1.2/wired-elements-2.1.2.js`；许可原文见[许可索引](../../demos/materials/wired-elements/LICENSES.md)。`theme=light`／`theme=dark` 指定说明面板主题，同源嵌入继承 Atlas 主题。

手绘舞台固定浅纸面。所有文本至少 12px，不缩小整个 Demo。标签支持方向键；组件内部复选框提供原生键盘操作，滑块和开关补齐内部名称。无自动动画或声音；开启减少动态后仍可改变参数。模块无法加载时，静态后备显示结构说明，`..?fallback=1` 可查看该分支。模块加载后显示手绘组件。
