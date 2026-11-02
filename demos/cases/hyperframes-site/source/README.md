# HyperFrames 首页来源与实现

upstream/ 保存原始 HTML、CSS、JavaScript 和可取得的 source map。模块编号与运行文件对应关系位于 [trace.json](trace.json)。

| 原站模块 | 本库运行文件 |
| --- | --- |
| HyperFramesScene、createRibbonField | ../ribbon.js |
| HyperFramesFilm、Film timeline | ../film.js |
| HyperFramesGround / sGround | ../ground.js |
| HyperFramesShowcase | ../showcase.js |
| HyperFramesNav、Download、InstallCommand | ../app.js |
| 页面结构和样式 | ../index.html、../styles.css、../fonts.css |

运行库为 ../vendor/three@0.185.0/，包含 three.module.js、three.core.js 与 MIT 许可。所有媒体地址通过 AtlasAssets 解析；素材索引见 [assets-manifest.json](../assets-manifest.json)。

运行时从 index.html 打开，使用仓库根目录的 scripts/serve.mjs 提供静态服务。
