# 同一标题跨色场反白 · 复用 Prompt

[结构化条目](../../entries/patterns/knockout-headline-split.json)

为目标页面实现「同一标题跨色场反白」：两份几何对齐的标题以同一栏界做互补clip-path，一侧墨色一侧反白；手机移除副本裁切。触发：视口进入手机断点。结果：字形连续，色场边界又保持清楚。参数：边界=--cols-7；手机=取消副本clip-path。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；副本aria-hidden，原文提供完整标题语义。裁切为静态布局，窄屏给完整单份标题。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
