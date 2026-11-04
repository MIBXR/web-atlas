# Shaders · 可调节的 WebGPU 效果 · 复用 Prompt

[结构化条目](../../entries/materials/shaders.json)

在现有 HTML/CSS/JavaScript 页面中使用固定版本 shaders 4.0.4 的 createShader 接口，为一个有明确任务的区域选择 MeshGradient、FlutedGlass、CursorRipples 或 NoiseDissolve。先读取本地四种演示的参数与源码，在保留真实 DOM 文本和操作的情况下调整配色、强度与图层。保持同一舞台只运行当前选中的效果，支持参数重置和暂停；页面隐藏或减少动态时停止持续动画。WebGPU 不可用时显示能继续阅读和操作的静态后备。保留原软件许可与第三方声明，不复制官网平台预设。桌面与窄屏都检查文字至少 12px、焦点、触摸及资源加载。

## 制作约束

- 本地 Demo 使用固定的 shaders 4.0.4 JavaScript 运行时，需要浏览器提供 WebGPU。
- 通过 HTTP/HTTPS 访问；WebGPU 不可用时显示静态示意。
- 减少动态、页面隐藏或主动暂停时停止持续动画；恢复运行由页面状态与用户操作决定。
- 保留 MIT 版权和许可文本。
- 本地参考图和四套参数是 Web Atlas 的演示选择。
