# Arc UI · React 动效组件库

[运行样例](../../demos/materials/arc-ui/index.html) · [素材条目](../../entries/materials/arc-ui.json) · [上游原文](../../demos/materials/arc-ui/source/upstream/README.md)

## 选择组件

八组中文样例使用上游真实组件，界面组合与业务数据由本库编写。按钮适合观察按压与结果交接；形变选择器和弹性滑块展示连续的几何反馈；标签页与计费开关展示选中位置和内容如何一起变化；折线图、对话框和通知提供更完整的状态路径。

样例支持明暗主题、四种强调色和手动减少动态。状态只存在于当前页面，可以通过重新进入样例恢复。它们是组件用法展示，官网布局另见 [官网案例](../../cases.html#style/uiarc-platform)。

## 取得源码

`source/upstream/registry/components/` 保存免费组件，`registry/blocks/` 保存免费组合区块，`registry/foundation.css` 和 `lib/motion-tokens.ts` 提供共享视觉与动效参数。完整安装清单在 `registry.json`；每项 `public/r/<名称>.json` 同时列出文件、外部包和组件依赖。

手工接入时，把需要的组件目录及其依赖复制到项目，保持上游目录关系，并将 `@/` 配置为复制后的源码根。导入 `foundation.css`，按目标项目设置字体与语义颜色，再替换组件 props、标签和业务数据。上游 README 还提供 shadcn registry 和 MCP 用法；在线入口的内容会变化，复用本次版本时以归档快照为准。

## 修改与重建样例

中文页面组合和示例数据在 `source/main.tsx`，样例外框在 `demo/demo.css`，组件原文保持不变。进入 `source/` 后运行：

```sh
npm ci
npm run build
```

构建使用随条目保存的锁文件，生成 `vendor/arc-ui@df3a600/` 的运行 JavaScript、CSS 与依赖许可。以 HTTP 服务打开本体入口即可使用，无需在查看时安装依赖。

## 在目标页面中使用

优先保留组件的键盘路径、焦点管理和减少动态分支，用目标页面的语义 tokens 统一样式。图表的标签、选择器的可访问名称和通知的动作应表达真实业务。示例价格与收录数量用于观察运动，不是产品信息。

素材范围、固定版本与许可事实见结构化条目；许可原文入口集中在 [LICENSES.md](../../demos/materials/arc-ui/LICENSES.md)。
