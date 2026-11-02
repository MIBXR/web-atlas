
    precision highp float;
    #include <packing>
    varying vec2 vUv;

    uniform sampler2D tDiffuse;
    uniform float outlineThickness;
    uniform float outlineBlend;
    uniform float contourBlend;
    uniform float backgroundMix;
    uniform float threshold;
    uniform float sourceMix;
    uniform float effectMix;

    uniform vec2 resolution;

    uniform vec3 ambiantColor;
    uniform vec3 backgroundColor;
    uniform vec3 outlineColor;
    uniform vec3 rimColor;
    uniform float rimIntensity;
    uniform vec3 shadowColor;
    uniform float shadowIntensity;
    uniform vec3 worldColor1;

    void main() {

      vec4 texDiffuse = texture2D(tDiffuse, vUv);

      vec3 inColor = texDiffuse.rgb;
      vec3 lineColor = outlineColor;
      vec3 paintColor = worldColor1;
      vec3 toneColor = (vec3(texDiffuse.a) * ambiantColor) + (ambiantColor * .25);

      float shadowTones = texDiffuse.a;
      float x = 1. / resolution.x;
      float y = 1. / resolution.y;

      vec3 vColSamples[4];

      vColSamples[0] = texture2D(tDiffuse, vUv - vec2(x, y) * outlineThickness).rgb;
      vColSamples[1] = texture2D(tDiffuse, vUv + vec2(x, y) * outlineThickness).rgb;
      vColSamples[2] = texture2D(tDiffuse, vUv + vec2(x * outlineThickness, -y * outlineThickness)).rgb;
      vColSamples[3] = texture2D(tDiffuse, vUv + vec2(-x * outlineThickness, y * outlineThickness)).rgb;

      vec3 inColorDiff0 = vColSamples[1] - vColSamples[0];
      vec3 inColorDiff1 = vColSamples[3] - vColSamples[2];

      float edge = sqrt(dot(inColorDiff0, inColorDiff0) + dot(inColorDiff1, inColorDiff1));
      float outline = (edge > threshold ? 1. : 0.);

      vec3 outColor;
      float alpha = 1.0;

      // Shadows & Rim effects
      if (inColor == vec3(1., 1., 1.)) {
        outColor = ((1. - outline) * backgroundColor) + (outline * mix(outlineColor, backgroundColor, contourBlend));
      } else {
        if (shadowTones >= .95) {
          paintColor = mix(paintColor, rimColor, rimIntensity);
        } else if (shadowTones <= .3) {
          paintColor = mix(paintColor, shadowColor, shadowIntensity);
        }
        lineColor = mix(lineColor, paintColor, outlineBlend);
        outColor = ((1. - outline) * mix(toneColor, paintColor, effectMix)) + (outline * lineColor);
      }

      gl_FragColor = vec4(clamp(mix(inColor, outColor, sourceMix), 0.0, 1.0), alpha);

    }
  