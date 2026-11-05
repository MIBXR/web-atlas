# Google Material Web · Material 3 官方组件 · 复用 Prompt

[结构化条目](../../entries/materials/material-web.json)

在已有HTML/CSS/JavaScript页面中使用Google官方@material/web 2.5.0，先读取Material Web素材包的来源、维护模式边界、许可、四种样例与依赖锁定记录。依据页面任务选择操作层级、带验证的文本框、switch/slider偏好面板或确认对话框，不复制示例业务文案。沿用当前页面导航与布局，用官方CSS系统颜色角色和组件形状token统一主题。提供真实标签、SVG功能图标、错误纠正、取消/Escape与关闭后焦点返回；所有文本包括Shadow DOM浮动标签及slider值标签在实际渲染中至少12px，取消会缩小文字的过渡。模块失败显示标注的静态后备；系统减少动态或手动减少时关闭局部过渡/ripple，dialog使用quick，页面隐藏时停止当前短动画。保持输入本地或明确接入当前项目的真实提交逻辑，不宣称示例已联网保存。保留Apache-2.0、Lit BSD-3-Clause、tslib 0BSD及转换说明；通过HTTP运行并检查桌面、窄屏、键盘、触摸和资源加载。

## 制作约束

- 固定 @material/web 2.5.0；官方库处于维护模式，等待新维护者。
- 提供 Material 3 Web Components，采用 Lit 运行时。
- 本地 vendor 合并了所选官方组件、CSS-in-JS 及 Lit/tslib 依赖，保留许可和锁文件；更换版本须重新核验 API 与 Shadow DOM 适配。
- 以 HTTP/HTTPS 提供 ES module；模块加载失败时显示静态说明。
- 按钮圆角调节范围为 4–28px。
- 启用系统的减少动态设置或手动选择减少动态时，关闭局部过渡和 ripple，dialog 使用 quick；滑块值标签取消缩放过渡以保持文字至少12px；无持续动画或后台计时器。
