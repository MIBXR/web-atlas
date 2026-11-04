# 两版套印与错版字形 · 复用 Prompt

[结构化条目](../../entries/patterns/overprint-misregistration.json)

为目标页面实现「两版套印与错版字形」：两块独立色版按混合模式叠印；文字用相同内容的彩色副本偏移，相交圆继续以multiply产生第三色。结果：共享内容的错版露边与叠色可以直接辨认。参数：错版=translate(2px,3px)；混合=两色版var(--blend)，重叠圆multiply。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；装饰副本不参与朗读，文字保持单一可读名称。保持静态套印与错位，停用套准入场动画。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
