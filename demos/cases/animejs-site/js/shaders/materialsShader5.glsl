
        varying vec3 vFixedNormal;
        varying vec3 vViewDir;

        void main() {
          vFixedNormal = normalize(normal);
          vViewDir = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
        