# 滚动驱动的 GLB 模块组装 · 复用 Prompt

[结构化条目](../../entries/patterns/anime-glb-module-assembly.json)

读取 animejs-site 的完整来源包，为目标页面实现「滚动驱动的 GLB 模块组装」。真实模型在主时间线中展开、横移、缩减、旋转与装壳；模块标签和 Bundle size 使用同一组时间线位置。 数值与素材从 source/values.md、对应区块源码和原始资源中取得。保持触发、交接、反向滚动和原生入口关系。

## 制作约束

- 几何、时间线与素材参数定位到来源代码。
- 章节内容与操作入口保留原生 DOM。
