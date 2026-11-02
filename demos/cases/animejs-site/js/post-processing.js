import { EffectComposer, ChromaticAberrationEffect, BloomEffect, KernelSize, RenderPass, ShaderPass, EffectPass } from '../vendor/postprocessing@6.36.6/build/index.js';

var PostProcessing = class {
  constructor(stage, materials) {
    this.stage = stage;
    this.composer = new EffectComposer(stage.renderer, {
      alpha: false
    });
    this.chromaEffect = new ChromaticAberrationEffect();
    this.bloomEffect = new BloomEffect({
      resolutionScale: .5
    });
    this.params = {
      bloomIntensity: .87,
      bloomLuminanceThreshold: 0,
      bloomLuminanceSmoothing: 0,
      bloomKernelSize: KernelSize.LARGE,
      chromaOffsetX: 3e-4,
      chromaOffsetY: 0
    };
    this.renderScenePass = new RenderPass(stage.scene, stage.camera);
    this.outlinePass = new ShaderPass(materials.outlineShaderMaterial, "tDiffuse");
    this.fxaaPass = new ShaderPass(materials.fxaaShaderMaterial, "tDiffuse");
    this.effectPass = new EffectPass(stage.camera);
    this.composer.addPass(this.renderScenePass);
    this.composer.addPass(this.outlinePass);
    this.composer.addPass(this.effectPass);
    this.updateDimensions();
    this.updateEffects();
  }
  updateEffects() {
    this.bloomEffect.intensity = this.params.bloomIntensity;
    this.bloomEffect.luminanceMaterial.uniforms.threshold.value = this.params.bloomLuminanceThreshold;
    this.bloomEffect.luminanceMaterial.uniforms.smoothing.value = this.params.bloomLuminanceSmoothing;
    this.bloomEffect.kernelSize = this.params.bloomKernelSize;
    this.chromaEffect.uniforms.get("offset").value.x = this.params.chromaOffsetX;
    this.chromaEffect.uniforms.get("offset").value.y = this.params.chromaOffsetY;
  }
  render() {
    this.composer.render();
  }
  updateDimensions() {
    let value32 = window.devicePixelRatio > 2 ? 3 : 2;
    this.composer.setSize(this.stage.width * value32, this.stage.height * value32, false);
  }
};

export { PostProcessing };
