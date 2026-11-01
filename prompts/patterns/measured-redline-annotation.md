# 实测几何的设计红线 · 复用 Prompt

[结构化条目](../../entries/patterns/measured-redline-annotation.json)

为目标页面实现「实测几何的设计红线」：用DOM矩形寻找四向最近相交邻块，SVG显示边界与间距；用Range逐字量宽并按em千分之一标advance，高频指针输入合到一帧。触发：指向、触摸或聚焦可测量区块。结果：尺寸文字能解释当前对象及其排版关系。参数：坐标=round(v)+.5px；字宽=round(glyphWidth/fontSize×1000)；标签=getBBox外扩左右5px、上下2px。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；区块focusin触发同一测量，标签有实际对象名称。尺寸线和读数直接显示，保持几何准确。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
