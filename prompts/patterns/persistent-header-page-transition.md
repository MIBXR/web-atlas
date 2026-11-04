# 顶栏不动的页面切换 · 复用 Prompt

[结构化条目](../../entries/patterns/persistent-header-page-transition.json)

在共享顶栏的 hash 路由中，支持 document.startViewTransition 且 prefers-reduced-motion 不为 reduce 时，用 startViewTransition 包住 DOM 更新，其他情况直接调用同一更新函数。在不减少动态的媒体查询中给唯一顶栏 view-transition-name:atlas-header；根 group、old、new 过渡 140ms ease-out；atlas-header 组与新快照 animation:none，旧快照 display:none，新快照 mix-blend-mode:normal。路由负责滚动复位、正文焦点与 aria-current。跨文档站点另用 @view-transition{navigation:auto}；Demo 只演示同文档切换。

## 制作约束

- 固定的 view-transition-name 必须只对应一个顶栏元素；顶栏在首次切换前已经存在。
- 不支持 startViewTransition 或设置为减少动态时，直接更新 DOM，滚动和焦点由路由处理。
