# Hallmark · 反 AI 套路的网页设计 skill · 复用 Prompt

[结构化条目](../../entries/materials/hallmark-skill.json)

先阅读 demos/materials/hallmark-skill/SKILL.md，按宿主阅读 references/flow.md，明确页面材料、受众、用途和语气。已有 design.md 时遵守锁定系统；否则按指名主题、custom 或 deal 的优先顺序选方向，以材料与页面用途确定结构。scaffold 后先完成首屏并运行相应审查，再完成页面，用 sloplint --render 修掉 Floor FAIL，修复或逐条记录 Reflex 破例，完成新上下文审查并保留 CSS 决策戳。需要重新设计或审计时先阅读 references/redesign.md；用 --before 记录、--kept 保留内容与接线，audit 输出报告。参考结果阅读 hallmark 案例的真实页面与 fidelity.md。

## 制作约束

- 本条目保存上游固定提交的技能原文、脚本与评测工具。
- 浏览器检查需要 puppeteer-core 与 Chrome；缺少时只运行静态检查。
- 图片生成只在设置 TOGETHER_API_KEY 且用户要求时使用，默认用 scripts/photos.json 登记的 755 张 Wikimedia Commons 开放授权照片，页面逐张署名。
- redesign 和 audit 只在用户点名时运行；audit 只出报告。
