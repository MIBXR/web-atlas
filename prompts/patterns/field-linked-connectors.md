# 字段悬停联动弯折连线 · 复用 Prompt

[结构化条目](../../entries/patterns/field-linked-connectors.json)

为目标页面实现「字段悬停联动弯折连线」：读取两侧字段矩形，选择中间折线通道，生成水平段、圆角和端点；以共同data-k同步行与线，ResizeObserver重算位置。触发：悬停字段或容器尺寸变化。结果：用户能沿同一高亮找出源字段与结果字段。参数：圆角=最大12px，受两端高差约束；节点=5px节点；行端外移12px。先读来源实际源码与 fidelity.md，以目标内容替换原作材料；字段名称保持稳定，迁移时为聚焦提供同一data-k高亮。直接生成静态连线，选中高亮即时完成。

## 制作约束

- 固定提交源码与复刻范围见 demos/cases/hallmark/fidelity.md。
