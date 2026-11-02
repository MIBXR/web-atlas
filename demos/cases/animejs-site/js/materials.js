import { materialsShader1, materialsShader2, materialsShader3, materialsShader4, materialsShader5, materialsShader6, materialsShader7 } from './shaders/index.js';
import { Vector2, Color, MeshToonMaterial, ShaderMaterial, Uniform } from 'three';
import { utils } from '../vendor/animejs@4.5.0/dist/modules/index.js';

var outlineShader = {
  vertex: materialsShader1,
  fragment: materialsShader2
};
var fxaaShader = {
  uniforms: {
    tDiffuse: {
      value: null
    },
    resolution: {
      value: new Vector2(1 / 1024, 1 / 512)
    }
  },
  vertexShader: materialsShader3,
  fragmentShader: materialsShader4
};
var SceneMaterials = class {
  constructor(stage) {
    this.stage = stage;
    this.dummyColor = new Color();
    this.colors = {
      backgroundColor: utils.get(document.documentElement, "--backgroundColor"),
      outlineColor: utils.get(document.documentElement, "--outlineColor"),
      outlineColorLight: utils.get(document.documentElement, "--outlineColorLight"),
      rimColor: utils.get(document.documentElement, "--rimColor"),
      shadowColor: utils.get(document.documentElement, "--shadowColor"),
      worldColor1: utils.get(document.documentElement, "--worldColor1"),
      worldColorLight1: utils.get(document.documentElement, "--worldColorLight1")
    };
    this.outlineMaterialParams = {
      verticesNormalMix: .08,
      rimThreshold: 1,
      rimAmount: .25
    };
    this.outlinePassParams = {
      resolutionScale: 4,
      verticesNormalMix: .18,
      threshold: .035,
      outlineThickness: 1,
      outlineBlend: .4,
      contourBlend: .65,
      sourceMix: 1,
      effectMix: 1,
      backgroundMix: 1,
      rimIntensity: 1,
      shadowIntensity: 1
    };
    this.outlineMaterial = new MeshToonMaterial({
      vertexColors: true
    });
    this.outlineMaterial.onBeforeCompile = item7 => {
      item7.uniforms.verticesNormalMix = {
        value: this.outlineMaterialParams.verticesNormalMix
      };
      item7.uniforms.rimThreshold = {
        value: this.outlineMaterialParams.rimThreshold
      };
      item7.uniforms.rimAmount = {
        value: this.outlineMaterialParams.rimAmount
      };
      item7.vertexShader = item7.vertexShader.replace("void main() {", materialsShader5);
      item7.fragmentShader = materialsShader6 + item7.fragmentShader;
      item7.fragmentShader = item7.fragmentShader.replace("#include <color_fragment>", "");
      item7.fragmentShader = item7.fragmentShader.replace("#include <opaque_fragment>", materialsShader7);
      this.outlineMaterial.userData.shader = item7;
    };
    this.outlinePassColors = {
      backgroundColor: this.colors.backgroundColor,
      outlineColor: this.colors.outlineColor,
      rimColor: this.colors.rimColor,
      shadowColor: this.colors.shadowColor,
      worldColor1: this.colors.worldColor1
    };
    this.outlineShaderMaterial = new ShaderMaterial({
      vertexShader: outlineShader.vertex,
      fragmentShader: outlineShader.fragment,
      transparent: true,
      uniforms: {
        tDiffuse: new Uniform(null),
        resolutionScale: new Uniform(this.outlinePassParams.resolutionScale),
        resolution: new Uniform(new Vector2(stage.width * this.outlinePassParams.resolutionScale, stage.height * this.outlinePassParams.resolutionScale)),
        threshold: new Uniform(this.outlinePassParams.threshold),
        outlineThickness: new Uniform(this.outlinePassParams.outlineThickness),
        outlineBlend: new Uniform(this.outlinePassParams.outlineBlend),
        contourBlend: new Uniform(this.outlinePassParams.contourBlend),
        sourceMix: new Uniform(this.outlinePassParams.sourceMix),
        effectMix: new Uniform(this.outlinePassParams.effectMix),
        backgroundMix: new Uniform(this.outlinePassParams.backgroundMix),
        backgroundColor: new Uniform(new Color(this.outlinePassColors.backgroundColor)),
        outlineColor: new Uniform(new Color(this.outlinePassColors.outlineColor)),
        rimColor: new Uniform(new Color(this.outlinePassColors.rimColor)),
        rimIntensity: new Uniform(this.outlinePassParams.rimIntensity),
        shadowColor: new Uniform(new Color(this.outlinePassColors.shadowColor)),
        shadowIntensity: new Uniform(this.outlinePassParams.shadowIntensity),
        worldColor1: new Uniform(new Color(this.outlinePassColors.worldColor1))
      }
    });
    this.updateDimensions();
    this.fxaaShaderMaterial = new ShaderMaterial({
      vertexShader: fxaaShader.vertexShader,
      fragmentShader: fxaaShader.fragmentShader,
      uniforms: {
        tDiffuse: new Uniform(null),
        resolutionScale: new Uniform(1),
        resolution: new Uniform(new Vector2(1 / stage.width, 1 / stage.height))
      }
    });
  }
  updateDimensions() {
    this.outlineShaderMaterial.uniforms.resolution.value.set(this.stage.width * this.outlinePassParams.resolutionScale, this.stage.height * this.outlinePassParams.resolutionScale);
  }
};

export { outlineShader, fxaaShader, SceneMaterials };
