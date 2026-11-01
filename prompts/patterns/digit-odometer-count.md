# 数字逐位滚入 · 复用 Prompt

[结构化条目](../../entries/patterns/digit-odometer-count.json)

为目标页面实现「数字逐位滚入」：每位创建0–9的纵向列，用目标数字乘行高计算translateY，以位序延迟滚入；非数字字符单独保留。触发：星标API返回有效数字。结果：数值到达有清楚的轻量反馈，最终文字与实际数据一致。参数：列高=每位1.2em；交错=每位90ms；格式=千以上显示k，万以上取整数k。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；以完整数值更新aria-label，装饰数位不代替名称。直接定位最终数位，跳过滚动。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
