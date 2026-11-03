# 双层混合的双色摄影 · 复用 Prompt

[结构化条目](../../entries/patterns/duotone-blend-photo.json)

为目标页面实现「双层混合的双色摄影」：原图先灰度化并提高对比，用multiply混入底色，再叠同底色的lighten层，保持细节和统一印刷色调。结果：不同来源照片形成同一材料系统。参数：图像处理=grayscale(1) contrast(1.08)与multiply；副层=同底色::before使用lighten。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；原图保留替代文本，颜色处理不承载唯一信息。双色处理为静态样式，保持原构成。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
