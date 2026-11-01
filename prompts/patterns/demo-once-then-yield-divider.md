# 分隔线示范一次后交给用户 · 复用 Prompt

[结构化条目](../../entries/patterns/demo-once-then-yield-divider.json)

为目标页面实现「分隔线示范一次后交给用户」：首次进入阈值后播放分隔比例关键帧；拖动或键盘调用同一个set，并由mine取消自动RAF和标记已接管。触发：比较区初次出现，随后拖动或键盘操作。结果：一次示范让控制可发现，手动操作有持续所有权。参数：自动关键帧=0ms 50%；360ms 74%；800ms 30%；1100ms 50%；启动=可见比例.55，延迟150ms；键盘=2%；Shift 10%；Home/End 0/100%。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；用role=slider与aria值表达比例，方向键和Home/End可用。跳过示范，保持手动分隔线。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
