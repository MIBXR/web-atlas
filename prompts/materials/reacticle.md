# Reacticle · 长文排版组件库 · 复用 Prompt

[结构化条目](../../entries/materials/reacticle.json)

使用 Reacticle 0.2.6 的语义化 React 长文组件。先读 beautiful-article 对应主题的 profile，再从这 11 篇原作样文选择与文章目标一致的排版语言。通过公共入口导入 ThemeProvider、Article 与所需组件，沿用主题 token 与结构纪律；自绘 Raw 图形继续使用 --ra-* 变量。保持原始来源、论点与数据出处，图表只在帮助当前段落时加入，交互使用可访问的真实控件。参考样例时保留其完整组件与主题 CSS，不将主题简化为配色；需要离线分发时本地化字体并保留 MIT 声明和 OFL。

## 制作约束

- 固定 Reacticle 0.2.6 源码提交 dcfc4baf386bbc220cd1aa6274bed3b741108465；React 18.3 是上游声明的 peer 依赖，样例使用固定 lockfile 安装结果。
- 每篇严格采用 apps/site/src/data/gallery.tsx 中的报告与主题组合；RateLimiter.tsx 导出的组件名为 RateLimiterSpec，11 个主题对应关系与任务表一致。
- 组件、文章与主题 CSS 不作修改；独立入口保留原画廊文章容器及原站 CSS，省略官网导航、浮动返回标签与上一篇／下一篇。入口禁用 Prism 自动全页扫描，逐行代码高亮仍由原 React 组件提供。
- 原站 13 个 Google Fonts 家族的 76 个 WOFF2 文件已本地化并附 OFL；中文沿用原主题的系统字体回退，不增加官网没有的中文网络字体。
- 通过 HTTP/HTTPS 打开样例目录，JS、CSS、公式字体与本地化字体均使用相对路径；文章外链保留原作指向。
- 原始 package.json 声明 MIT，但该固定提交的仓库内没有 LICENSE 文件；许可声明与实际缺失情况同时记录，不虚构上游许可文本。
- 样文原文保持原样；主题风格说明为中文概括，依据 garden-skills 固定提交的 theme-profiles。
- 样文中的交互、阅读辅助与动态行为沿用上游实现；source/ 归档公共组件、主题、11 篇报告、最小入口及原依赖配置，依赖按上游 lockfile 安装；逐篇对照结论见 fidelity.md。
