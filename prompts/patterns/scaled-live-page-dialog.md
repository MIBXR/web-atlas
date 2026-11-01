# 对话框内缩放真实页面 · 复用 Prompt

[结构化条目](../../entries/patterns/scaled-live-page-dialog.json)

为目标页面实现「对话框内缩放真实页面」：原生dialog加载同源iframe，页面按固定排版宽度布局，缩放系数取容器宽度比，高度反除系数；前后项取当前过滤结果，关闭恢复当前链接焦点。触发：激活主题链接、前后按钮或Escape。结果：预览保留作品排版，也保留列表的选择上下文。参数：排版宽度=1440px；缩放=k=frame.clientWidth/1440；iframe高=frame.clientHeight/k；实测=1440视口对话框frame宽1224px，k=.85。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；使用原生dialog、可命名iframe、Escape与焦点返回。省略对话框入场运动，缩放与导航保留。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
