# 底部地面 Canvas 收束 · 复用 Prompt

[结构化条目](../../entries/patterns/hf-ground-canvas-close.json)

为【目标页面】实现「底部地面 Canvas 收束」。地面：固定全屏 WebGL2 四顶点三角条带，uColorScale=10、uFrequency=7、白色基底、0.8 混合；#f7ecd3cc 遮罩覆盖光色，并贯穿下载和开源区。减少动态时保留 Canvas 节点并停止创建地面渲染器。 管线：WebGL2；四顶点 TRIANGLE_STRIP；DPR≤2。着色器：uColorScale=10；uFrequency=7；uBaseColor=(1,1,1)。时间：uTime += 0.00375 × dt × 60；dt≤0.05。层叠：position:fixed；z-index:-1；veil=#f7ecd3cc。使用来源案例的真实素材与可读实现，按桌面和手机状态对照。

## 制作约束

- 数值来自 2026-11-02 原站打包代码与 CSS。
- 媒体和字体使用来源案例中的完整原文件。
