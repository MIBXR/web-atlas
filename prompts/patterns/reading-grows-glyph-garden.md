# 顺序朗读长出字形植物 · 复用 Prompt

[结构化条目](../../entries/patterns/reading-grows-glyph-garden.json)

为目标页面实现「顺序朗读长出字形植物」：按当前词序接受点击，越序给出下一词；更新aria-pressed、下一词焦点、植物和种子，时间带定期撕片。触发：按句子顺序标记已读词或重新开始。结果：阅读进度是具体的生长结果，顺序与下一步清楚。参数：词与时间=6词；300s；撕片=每1s减时，每5s撕片；听读=en-GB，rate=.82。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；每词使用原生按钮与aria-pressed，读后焦点移向下一词。显示已读完的静态花园，并保留重读入口。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
