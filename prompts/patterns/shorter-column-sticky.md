# 较短一栏吸附的两栏详情 · 复用 Prompt

[结构化条目](../../entries/patterns/shorter-column-sticky.json)

为作品详情实现共享页面滚动的 2:1 双栏，间距 32px、align-items:start，说明栏最小 340px。舞台列在 1160px 起始终 position:sticky；读取顶栏、操作栏、舞台、说明的实际高度，top 为顶栏高加操作栏高加 24px。说明比舞台短时也使用同一 sticky 偏移。用 ResizeObserver 和 resize 重算，路由离开断开观察器；两栏不加固定高或内部滚动。末尾由网格容器自然约束 sticky，两栏和最后子项下外边距为 0，容器后留 48px 接页脚。≤1159px 回单列并取消吸附。用 8 节与 2 节说明按钮演示长短关系，保留键盘操作和减少动态下的内容。

## 制作约束

- 舞台始终吸附，说明较短时也吸附；top 为顶栏高度、操作栏实高与留白之和。
- 网格 align-items:start，两栏及最后子项无下外边距；单列时取消吸附。
