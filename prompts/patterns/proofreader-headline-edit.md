# 校对式改写首屏标题 · 复用 Prompt

[结构化条目](../../entries/patterns/proofreader-headline-edit.json)

为目标页面实现「校对式改写首屏标题」：首入允许动态时，用 ghost 测量旧词与新词的矩形，先画斜线、写小词，再放大落位并用 FLIP 补偿邻词；最后真实文字接管。触发：页面首入且允许动态。结果：改词过程与最终主张连成一件事，文本仍可读取。参数：起点=950ms；校对轴=划线240ms；写入340ms；落位1540ms；转墨2140ms；接管=ghost 180ms 淡出；字体等待最多3000ms。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；最终标题保留真实文字与 aria-label。跳过改词过程，直接显示最终标题。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
