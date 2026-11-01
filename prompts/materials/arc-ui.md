# Arc UI · React 动效组件库（免费部分） · 复用 Prompt

[结构化条目](../../entries/materials/arc-ui.json)

在已有 React 页面中使用 Arc UI 免费组件。先读取固定源码、registry 安装条目、中文说明与运行样例，按任务选择 Button、MorphSelect、ElasticSlider、Tabs、BillingToggle、LineChart、Dialog 或 ToastStack。保留上游 TypeScript、CSS Modules、motion tokens 和键盘模型，接入 foundation.css，以语义变量切换明暗与强调色；只修改业务 props、数据和页面组合。保持按钮、输入和标签的可访问名称，尊重系统减少动态。源文件从 source/upstream/ 复制，依赖使用当前项目明确固定的版本，保留 MIT 与各运行依赖、字体许可。官网首页的布局应从独立案例取得，不把官网媒体当作组件实现。

## 制作约束

- 固定归档 df3a600 的 144 个 registry 条目：120 个 registry:ui、22 个 registry:block 和 2 个共享基础条目。
- 上游要求 React 19、TypeScript 与 Next.js 或 Vite；本地以 React 19.3.0、Motion 13.4.0 和固定锁文件捆绑八组样例。
- source/upstream/ 的 registry、lib、types、public/r 与根使用说明保留原始结构和字节，未引入上游的维护检查脚本。
- 样例数据、状态与操作仅作用于当前页面，不接入账户、支付或持久化服务。
- 浏览器实测覆盖本地 Chromium 桌面和手机模拟宽度；上游其余组件可直接从完整源码取材。
