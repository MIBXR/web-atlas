# Google Material Web：Material 3 官方组件

[来源、版本、许可与使用边界](../../entries/materials/material-web.json)

[操作四种样例](../../demos/materials/material-web/index.html) · [结构化条目](../../entries/materials/material-web.json) · [官方仓库](https://github.com/material-components/material-web)

Google 的 `@material/web` 使用 Lit，将 Material 3 设计语言实现为 Web Components。本素材使用官方 Material Web 软件。四个业务组合、中文内容、配色控件与原创 SVG 属于 Web Atlas；按钮、文本框、开关、滑块和对话框使用真实官方实现。

## 四个可借用的组合

| 组合 | 实际操作与结果 | 参数来源与本地选择 |
| --- | --- | --- |
| 操作层级 | 加入计划后禁用主要操作；查看安排输出独立内容；重置恢复。 | [按钮文档](https://material-web.dev/components/button/) 定义填充、描边、文字等层级及 `disabled`；角色和卡片内容为本地组合。 |
| 表单验证 | 空值或错误邮箱显示说明并聚焦首个错误；有效输入只报告格式检查通过；清空恢复。 | [文本框文档](https://material-web.dev/components/text-field/) 提供 `required`、`type`、`maxlength`、`checkValidity()`、`error`、`errorText`。名称24字符限制与中文消息为本地选择。 |
| 偏好设置 | 开关显隐完成标记，滑块改变目标卡数量；键盘与触摸输入走相同状态更新。 | [开关](https://material-web.dev/components/switch/) 的 `selected` 和 `change`；[滑块](https://material-web.dev/components/slider/) 的 `input`、`min/max/step/value`、`ticks/labeled`。数量1–8、默认4为本地用途。 |
| 确认对话框 | 归档、取消、Escape、恢复；关闭后焦点回到归档触发按钮。 | [对话框文档](https://material-web.dev/components/dialog/) 的 `show()`、`close(value)`、`returnValue`、`closed`、`quick`。归档状态只存在当前页面。 |

源端观察中，已用浏览器打开 [官方按钮 Stories](https://material-web.dev/components/button/stories/)，观察五种按钮、图标与链接变体并操作按钮。其他 API 与主题规则以官方文档和固定版本源码为依据，本地四组功能单独实测。

## 参数与接入

浏览器通过 `vendor/material-web@2.5.0/material-web.js` 注册选用的组件，样例代码位于 `demo/`。运行模块包含全部依赖与组件样式，无 CDN 或远程字体。以静态 HTTP/HTTPS 服务器提供素材导出目录，再打开 `demos/materials/material-web/index.html`。`?sample=actions`、`form`、`preferences`、`dialog` 可定位样例。

[Material Theming](https://material-web.dev/theming/material-theming/) 以 CSS 自定义属性区分系统颜色角色和组件 tokens。本地两套配色由固定配置提供，覆盖 primary/on-primary、container/on-container、surface/on-surface、outline、error 等成对角色。主题可跟随 Atlas 或系统，也可手动选择浅/深。按钮形状通过各组件的 `container-shape` 设置；`4–28px` 范围、`2px` 步长和 `20px` 默认值是本地教学选择。

表单示例在浏览器内调用校验接口，成功提示表示格式检查通过。

## 可读性、动效与失败状态

组件自带 Shadow DOM。页面通过官方字号 token 保持正文、标签和支持文本的尺度，并对滑块 `.label` 取消缩放过渡，避免值标签在进入过程中小于12px。这项 Shadow DOM 适配位于本地代码。功能图标使用实际 SVG，没有加载 Material Symbols 字体或用文本字符替代图标。

界面没有自动循环、音频或后台计时器。系统或手动减少动态时，关闭 Shadow DOM 的局部 CSS 过渡、禁用 ripple，并设置 `dialog.quick`；页面隐藏时结束当前短动画，回到页面不自动触发新动作。确认弹窗使用上游对话框焦点约束；关闭后等待触发按钮的 Lit 渲染完成再恢复焦点。

组件加载成功前显示静态结构说明，实际控件区域保持隐藏；模块加载失败时明确显示「静态后备 · 真实组件未运行」。未定义的对话框也保持隐藏。静态结构用于说明层级；模块加载后提供真实组件、表单和对话框。

## 重建依赖

运行包由 esbuild 0.25.12 合并并压缩选用的官方模块，CSS-in-JS 随包，保留行内许可。`source/vendor/components.mjs`、`source/vendor/package.json`、`source/vendor/package-lock.json` 提供重建输入，`source/vendor/provenance.json` 保存来源与转换记录。

将这三份重建输入复制到仓库外的临时目录，在该目录运行：

```sh
npm ci --ignore-scripts --no-audit --no-fund
./node_modules/.bin/esbuild components.mjs --bundle --format=esm --target=es2022 --minify --legal-comments=inline --outfile=material-web.js
```

用产物替换 `vendor/material-web@2.5.0/material-web.js`。构建依赖留在仓库外，交付目录保留运行模块与[许可索引](../../demos/materials/material-web/LICENSES.md)列出的许可原文。

[本地对照结果](../../demos/materials/material-web/fidelity.md)。
