# 可确认的命令复制 · 复用 Prompt

[结构化条目](../../entries/patterns/confirmed-command-copy.json)

为目标页面实现「可确认的命令复制」：复制当前命令或可见代码，成功后设置勾与Copied，计时后恢复；主页面用Clipboard API并保留选区复制分支。触发：激活复制按钮。结果：用户知道复制的是哪段内容以及操作是否成功。参数：反馈时长=首页1600ms；Lumen/Terminal 1400ms。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；使用原生按钮、明确名称和状态播报，复制失败保留可选文本。成功勾与文字即时变化，计时恢复保留。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
