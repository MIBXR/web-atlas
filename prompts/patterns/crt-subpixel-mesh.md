# CRT 子像素网与字边色散 · 复用 Prompt

[结构化条目](../../entries/patterns/crt-subpixel-mesh.json)

为目标页面实现「CRT 子像素网与字边色散」：RGB竖条和横扫线叠在图面上，红青text-shadow错位字边，悬停字标放大错位。触发：悬停字标。结果：图像和字标共享克制的CRT语汇。参数：网格=RGB竖向3px周期，横线3px周期；字边=标题±1.5px；字标悬停±2px。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；正文保持真实文本与清楚焦点，不靠字边颜色表达状态。网格和字边是静态构成，悬停状态即时切换。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
