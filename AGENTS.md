# Web Atlas 维护

仓库定位与收录原则见 [CONTRIBUTING.md](CONTRIBUTING.md#仓库定位)。

新增内容、目录或内容类型前，先阅读 [CONTRIBUTING.md 的收录边界与三类组织规范](CONTRIBUTING.md#三类组织规范)，确定其类别与文件归属。字段和新增流程以该文档为准。

执行内容或界面审查时，先读[审查清单](docs/review.md)，确定基准版本与增量或全库范围。

内容更新后运行 `npm run build`，再运行 `npm run check`。

向仓库新增测试代码、测试数据、测试框架、自动检查脚本或额外完整性校验，须先获仓库所有者明确授权。

`prompts/`、`agent/`、`data/`、`docs/cases/README.md` 和 README 计数块由构建生成，不手改；预览和原文素材按 CONTRIBUTING 管理。

修改站点页面、组件或交互前，阅读 [站点设计与交互约束](CONTRIBUTING.md#站点设计与交互约束)，查看现有页面与 `site/shared/` 的实际样式；按 [验收与交付](CONTRIBUTING.md#验收与交付) 对照原作、既有页面和干净副本。

提交前按 CONTRIBUTING 完成验收。Git 只收录长期维护的源码、内容、文档和交付预览；在独立功能分支提交并通过 PR 合并。发布使用同一已验证源码提交，流程见 CONTRIBUTING。
