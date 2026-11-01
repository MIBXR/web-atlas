# 用纸面动作讲解业务流程 · 复用 Prompt

[结构化条目](../../entries/patterns/paper-action-explainer.json)

为目标页面实现「用纸面动作讲解业务流程」：信件滑进窗口信封，贴资后回信进入，最后在发票盖Paid；每步只动画transform和opacity，离屏暂停。触发：首屏纸面场景进入视口。结果：用户从对象处理顺序理解提醒、寄出、回信与付款。参数：寄信=700ms后滑动1700ms，2550ms贴资；回信与盖章=3050ms回信1150ms；4400ms盖章520ms。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；对象旁保留稳定说明，主要行动使用真实按钮。直接呈现寄信后的可读场景。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
