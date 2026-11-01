# 字体真实量度生成参考线 · 复用 Prompt

[结构化条目](../../entries/patterns/font-metric-guides.json)

为目标页面实现「字体真实量度生成参考线」：Canvas measureText读取H、x、y的边界，以临时基线标记确定DOM基线，再放置cap、x-height、baseline和descender。触发：字体就绪、视口或字号几何变化。结果：线与实际字体对应，能解释字高而非仅作装饰。参数：度量=H的actualBoundingBoxAscent；x的ascent；y的descent；更新=document.fonts.ready与resize。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；字形和控件保持真实文本，参考线不替代标签。参考线按最终几何直接放置。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
