# 半色调渐隐边界 · 复用 Prompt

[结构化条目](../../entries/patterns/halftone-fade-edge.json)

为目标页面实现「半色调渐隐边界」：radial-gradient生成可调半径与周期的网点，再用线性mask让网点从实到空；边界层独立于文字和摄影。结果：印刷颗粒成为色面衔接，而非普通透明渐变。参数：过渡带=64px；网点与遮罩=--halftone-dot/--halftone-size；110° mask。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；网点不传递必要内容且不截获操作。静态渐隐边界保持可见。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
