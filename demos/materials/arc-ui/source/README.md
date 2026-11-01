# 样例制作资料

`upstream/` 保留固定免费源码的原始结构与字节。`main.tsx` 组织导航与源码查看，`catalog-panel.tsx` 提供共用目录，`library-overlays.tsx` 提供抽屉与快捷搜索，`appearance.tsx` 管理完整主题转场和外观；`preview-stage.tsx` 提供尺寸形变与全屏，`frame.tsx` 为真实 390×844 手机视口隔离样例；`previews/` 按按钮、输入、内容、图表、文字与区块组合实际组件。`navigation.json` 保存官网小分类和本库中英名称；`build.mjs` 结合 registry 生成 `demo/catalog.json`，捆绑六类预览并收集运行许可；依赖由 `package.json` 和 `package-lock.json` 固定。

在本目录运行 `npm ci`、`npm run build`，输出到 `../vendor/arc-ui@df3a600/`。查看时无需安装依赖。源码查看器沿用免费 CodeBlock 的词法规则，字体和配色对照官网代码区；行号不参与复制。

## 示例媒体

`media.json` 记录采集的官方媒体路径与依据。`fetch-media.mjs` 读取这份清单，从 `https://uiarc.dev` 下载原始文件到 `demo/media/` 和 `demo/block-logos/`；已有原件随素材保存，常规构建不访问网络。

`media.tsx` 通过上游 ArcProvider 接入本地图片；公开源码声明的头像 JPG 路径映射到官网实际提供的 SVG。`next-link.tsx` 与图片入口为区块中的 Next.js 标签提供本地锚点和图片，组件源码保持原样。

头像的生成依据在上游 `lib/media.ts` 和原站 `demo/media/CREDITS.md`。原站提到的生成脚本与移植引擎未随免费仓库提供；本素材保留已生成的 SVG 和公开输入，没有本地头像生成步骤。照片与品牌标识沿用原件，出处与署名见 [LICENSES.md](../LICENSES.md)。
