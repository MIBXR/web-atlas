# Hallmark 官网源码

来源为 [Nutlope/hallmark](https://github.com/Nutlope/hallmark/tree/4f6a46c6dc325d40ab268c93e25c7b96676ebccd/site) 提交 `4f6a46c6dc325d40ab268c93e25c7b96676ebccd` 的 `site/`，运行入口为上一级 `index.html`。首页、50 个主题页和 21 个 Made 页保留来源目录结构、样式、脚本与英文内容，直接由静态服务器运行。

从固定提交以 `git -c core.autocrlf=false archive` 导出 `site/` 内容到案例根目录，排除 `site/.gitignore`。资源本地化使用 Node.js，无第三方依赖，在案例根目录运行：

```sh
node source/localize.mjs <下载缓存绝对目录> <工作记录绝对目录>
```

脚本以导出的原文件为输入，把字体样式表及全部字库保存在 `fonts/`，把远程摄影保存在对应页面的 `photos/`，保持原始资源响应字节。重复运行复用缓存与已有替换记录；工作记录目录保存 `replacements.json` 和下载错误信息。字体超过 100 MiB 或资源不可下载时脚本报错停止。

生成这些页面的技能、参考、脚本与评测工具见 [hallmark-skill 原文素材](../../../materials/hallmark-skill/SKILL.md)，中文使用说明见[阅读与使用资料](../../../../docs/materials/hallmark-skill.md)。

源码 MIT 许可原文见 [LICENSE](LICENSE)，第三方资源见 [LICENSES.md](../LICENSES.md)，本地化和对照结果见 [fidelity.md](../fidelity.md)。
