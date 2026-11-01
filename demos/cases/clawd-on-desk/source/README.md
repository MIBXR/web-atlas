# 官网源文件

`website/index.html`、`website/scripts/`、`website/styles/` 和 `website/google-fonts.css` 保存官网直接发布的未压缩文件；网址与采集日期见[案例条目](../../../../entries/cases/clawd-on-desk.json)。官网由浏览器直接执行这些 HTML、CSS、JavaScript 和 SVG，无需打包器。

运行入口为上一级 `index.html`，它加载这里的原始脚本、上一级的 `assets/` 与本地 `fonts/`。像素花形由 `website/scripts/pixel-flower.js` 原生生成，输入配色、形状与采样函数均在文件内。SVG 动画的关键帧与画面数据在每份 SVG 内。

产品仓库固定为 `rullerzhou-afk/clawd-on-desk@44507f6863e3837895368d62794992613873cce8`。当前公开产品仓库、分支和作者公开仓库检索未发现宣传站工程；上述网站文件是部署快照，不冒称来自这个 Git 提交。产品应用的 Electron、IPC、打包、测试与发布工具不是此网页的制作依赖。

许可索引见[LICENSES.md](../LICENSES.md)，本地接入范围与对照见[fidelity.md](../fidelity.md)。
