# 粘性分节全屏 API 演示 · 复用 Prompt

[结构化条目](../../entries/patterns/anime-pinned-feature-demos.json)

读取 animejs-site 的完整来源包，为目标页面实现「粘性分节全屏 API 演示」。八节内容共用固定演示层；滚动驱动进度与章节子时间线，每节进入时播放、离开时暂停或复位。 数值与素材从 source/values.md、对应区块源码和原始资源中取得。保持触发、交接、反向滚动和原生入口关系。

## 制作约束

- 几何、时间线与素材参数定位到来源代码。
- 章节内容与操作入口保留原生 DOM。
