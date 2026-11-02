
        precision highp float;
        uniform float verticesNormalMix;
        uniform float rimThreshold;
        uniform float rimAmount;
        varying vec3 vFixedNormal;
        varying vec3 vViewDir;
        vec3 black = vec3(0., 0., 0.);
        vec3 white = vec3(1., 1., 1.);
        vec3 red = vec3(1., 0., 0.);
        vec3 green = vec3(0., 1., 0.);
        vec3 blue = vec3(0., 0., 1.);
        vec3 pink = vec3(1., 0., 1.);
        vec3 yellow = vec3(1., 1., 0.);
        vec3 cyan = vec3(0., 1., 1.);
        vec3 ui1 = vec3(1., 0.5, 0.);
      