# Wired Elements · 可操作的手绘草稿 · 复用 Prompt

[结构化条目](../../entries/materials/wired-elements.json)

使用固定版本 wired-elements 2.1.2，在现有 HTML/CSS/JavaScript 项目里为可讨论的轻量流程选择任务清单、偏好面板或概念卡片。读取本地演示，把真实 wired-checkbox、wired-progress、wired-toggle、wired-card 和 wired-slider 接到当前页面的明确状态。使用原库 SVG 手绘边界，保持 DOM 文本、标签、键盘操作和至少 12px 的实际文字。卡片 elevation 遵循 1–5；配色与内容按任务选择。自托管官方 ESM，保留 MIT 与 BSD 许可；加载失败时显示明确静态说明，不声称组件仍已运行。无需求时不加入循环动画、声音、持久化或额外框架。

## 制作约束

- 锁定最新非预发布版本 2.1.2。
- 需要 JavaScript、Custom Elements 和 Shadow DOM；自托管官方完整 ESM，运行时不依赖 CDN。
- 标签、复选框、滑块和开关可通过键盘操作；为内部开关和滑块补充可访问名称。
- 保留 Wired / RoughJS MIT 与 bundle 内 Lit / lit-html BSD 3-Clause 许可。
