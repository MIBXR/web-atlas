# 包豪斯：几何与实验

调研日期：2026-10-07。范围是基础形色教学的现代网页迁移。

## 已阅读的案例与理论

[Bauhaus Dessau 官方首页](https://bauhaus-dessau.de/en/welcome/) 将展览和活动组织为图像、名称、日期、开放时间、场所和票务入口，并提供无障碍入口。借鉴的是“文化内容与可行动信息同场呈现”。

[Bauhaus Kooperation 的 Kandinsky 课程档案](https://bauhauskooperation.de/wissen/das-bauhaus/lehre/unterricht/unterricht-wassily-kandinsky) 记述其1922–1933年的基础教学，包括分析性绘画、抽象形态元素和色彩课程。档案记录圆/三角/方形与三原色对应关系的课程调查、论证及批评。本例使用“有限形态研究关系”的方法。

网页重排结合 [Carbon 2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview) 对关键对齐线和响应式布局的当代规范。该规范用于本地网页布局。

## 我的设计判断

包豪斯的可复用价值在于将观察、构成、材料和制作联系起来。Demo 以可操作的原创构成为主体。用户先看到形与功能的命题，接着切换构成/角度并导出，再选择纸、木、金属的课程，最后阅读制作方法。

相较本库 Swiss 条目，Swiss 的主要任务是编排文字与日程；这里的主要任务是实验形状之间的关系。两者有历史关联，但产品信息架构与核心操作明显不同。

## 复现映射

| 原始证据或方法 | 本地原创迁移 | 检查点 |
|---|---|---|
| 基础抽象元素课程 | 自绘圆、三角、矩形、线条 | 无馆藏原图依赖 |
| 构成关系研究 | 平衡/节奏/张力三预设 | 图形位置确实变化 |
| 观察与制作连接 | 旋转滑块及SVG导出 | 下载反映当前角度 |
| 文化机构可行动信息 | 材料课程的details | 键盘可展开内容 |

## 约束与可复用性

几何图形与文字分区，黑字配纸底保留长文可读性。首屏构成在手机上缩小到视口内，控制区纵向排列，不以隐藏内容“保持海报感”。动画仅在用户主动选择时发生，减少动态偏好下即时更新。系统字体、原创SVG和原生交互保证离线运行，不需要CDN或构建。

本 Demo 的品牌 Form/03、课程、场地与文案均为虚构。[结构化Prompt与Token](../../entries/cases/bauhaus-geometry.json)；[本地 Demo](../../demos/cases/bauhaus-geometry/index.html)。
