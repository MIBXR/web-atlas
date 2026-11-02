#include <opaque_fragment>
        vec3 n = vFixedNormal;
        vec3 normalColor = vec3(.5 * (1. + n.x), .5 * (1. + n.y), .5 * (1. + n.z));

        float NdotL  = dot(normalize(normal), normalize(directionalLights[0].direction));
        float rimDot = 1. - dot(vViewDir, normal);
        float rimPower = clamp(rimDot * pow(NdotL, rimThreshold), 0., 1.);
        float rimColor = outgoingLight.r >= .95 ? rimPower - (1. - rimAmount) : .0;
        float lightColor = outgoingLight.r < .95 ? .0 : 1.;
        float shadowsColor = lightColor + clamp(rimColor, -0.05, 0.);

        float mixNormal = verticesNormalMix;

        if (vColor.rgb == black
         || vColor.rgb == red
         || vColor.rgb == green
         || vColor.rgb == blue
         || vColor.rgb == pink
         || vColor.rgb == yellow
         || vColor.rgb == cyan
         || vColor.rgb == ui1
        ) {
          mixNormal = 0.;
        }

        // World colors
        if (vColor.r == 0.0) { normalColor.r = 0.0; }
        if (vColor.g == 0.0) { normalColor.g = 0.0; }
        if (vColor.b == 0.0) { normalColor.b = 0.0; }
        if (vColor.r == 1.0) { normalColor.r = 1.0; }
        if (vColor.g == 1.0) { normalColor.g = 1.0; }
        if (vColor.b == 1.0) { normalColor.b = 1.0; }

        float depth = (gl_FragCoord.w) * 10.;

        mixNormal = clamp(mixNormal * depth, 0., verticesNormalMix);

        vec3 diffuse = mix(vColor.rgb, normalColor, mixNormal);
        gl_FragColor = vec4(diffuse, shadowsColor);
        