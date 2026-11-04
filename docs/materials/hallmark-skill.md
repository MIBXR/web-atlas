# Hallmark：阅读与使用资料

[结构化条目](../../entries/materials/hallmark-skill.json) 提供固定版本、安装方式、六步工作流、适用范围和关联案例。

## 它做什么

Hallmark 用规则、材料主题和检查限制模型惯用的设计方式：标题上方的小标签、大写且拉开字距的标注、标题中单词染色、紫蓝渐变、卡片套卡片和页尾邮箱订阅等套路都有对应约束。设计页面时，先读取真实材料和项目系统，再决定内容结构与表现方式。

## 三级检查

- **Floor**：不可破例的底线，涵盖正确性、可访问性、内容真实和明确禁用的生成套路。
- **Reflex**：模型常用的惯性做法，若当前页面有采用这些做法的具体理由，逐条记录破例。
- **Finish**：远看不显眼的工艺细节，最终审阅时检查并回答。

规则、等级和破例格式见 [references/gates.md](../../demos/materials/hallmark-skill/references/gates.md)。

## 主题

五十个主题规定纸面、配色、字体、表面和可用材料，主题不规定页面的内容及先后。每份主题文件不超过 8 KB，构建时只读选定的一份及对应图片。`theme.mjs deal` 发三个候选，Agent 看图选择；`theme.mjs draw` 按照片／产品／文字材料与页面用途抽取形状、首屏、导航和页脚。已有锁定的 `design.md` 时沿用系统并跳过发牌。

用户说 custom 时，从提示词与真实材料中建立该客户的专属方向，入口为 [references/direction.md](../../demos/materials/hallmark-skill/references/direction.md)。

效果图画廊展示 50 个主题的官网桌面截图，每张可打开案例中的对应页面。

## 图片

默认图库在 [scripts/photos.json](../../demos/materials/hallmark-skill/scripts/photos.json)，登记 755 张 Wikimedia Commons 的开放授权照片及其署名；`theme.mjs photos` 按主体和主题选图，成品页面逐图署名。

设置 `TOGETHER_API_KEY` 且用户要求生成图片时，使用 [scripts/imagegen.mjs](../../demos/materials/hallmark-skill/scripts/imagegen.mjs)，默认模型为 `black-forest-labs/FLUX.1.1-pro`。真实产品能运行或访问时，先用 `scripts/capture.mjs` 取得产品截图。

## 重新设计与审计

用户点名 Hallmark 后，`/hallmark redesign <目标>` 重新设计已有页面；`/hallmark audit <目标>` 生成报告。Codex CLI 以 `$hallmark` 调用。目标可以是文件、目录或已有应用路由；只有线上 URL 而没有源码时使用 `audit` 和 `--url`。

| 深度 | 保留 | 改变 | 触发说法 |
| --- | --- | --- | --- |
| full | 内容、业务接线和已有品牌；锁定 design.md 的系统 | 系统及构成：页面形状、首屏、章节对象、导航与页脚 | 默认 redesign |
| restyle | 内容、接线与布局 | 字体、颜色、半径、阴影、动效和控件系统 | keep the layout、restyle、reskin、only the colours and type |
| polish | 内容、接线、系统与布局 | 检查指出的生成痕迹、对比度、状态、动效和 token 等局部问题 | polish、keep our look、only fix what looks generated |

重新设计先用 `sloplint --render --before` 保存当前链接、表单、字段、处理器、脚本、标题与截图，完成后以 `--kept` 对照。流程和保留清单见 [references/redesign.md](../../demos/materials/hallmark-skill/references/redesign.md)。

首屏和完成页均有新上下文审查。支持子 Agent 的宿主使用子 Agent；[flow.md 的 Harnesses](../../demos/materials/hallmark-skill/references/flow.md#harnesses) 规定 Codex CLI 在当前线程审查并明说。

## 原文入口

- [SKILL.md](../../demos/materials/hallmark-skill/SKILL.md)：底线、预检、选题、构建与审查主流程。
- [README](../../demos/materials/hallmark-skill/README.md)：上游安装说明、主题和示范；其中相对链接按[固定提交](https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd)阅读。
- [references 入口](../../demos/materials/hallmark-skill/references/flow.md)：流程分支与宿主；同目录包含 gates、主题、构成、材料和重新设计资料。
- [scripts 入口](../../demos/materials/hallmark-skill/scripts/theme.mjs)：主题操作；同目录包含 sloplint、capture、imagegen 与图库数据。
- [eval 入口](../../demos/materials/hallmark-skill/eval/README.md)：评测工具与案例。

## 与案例的关系

[Hallmark 官网与主题页研究](../cases/hallmark.md) 收录技能产品的官网、50 个主题示范页和 21 个 Made 页。案例保留可运行页面、素材与对照结果，技能素材保存生成方法、参考、脚本和评测工具。
