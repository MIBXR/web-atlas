const vertexShader = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUv;

void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`,
  fragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uColorScale;
uniform float uFrequency;
uniform vec3 uBaseColor;

vec2 distort(vec2 p, float offset) {
  p += offset;
  for (float i = 1.0; i < 7.0; i++) {
    p.x += 0.3 / i * sin(i * 5.0 * p.y + uTime);
    p.y += 0.1 / i * cos(i * 3.0 * p.x + uTime);
  }
  return p;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float r = sin(distort(uv, 0.0).x * uFrequency) * 0.5 + 0.5;
  float g = sin(distort(uv, 0.02).x * uFrequency) * 0.5 + 0.5;
  float b = sin(distort(uv, 0.04).x * uFrequency) * 0.5 + 0.5;
  vec3 color = pow(vec3(r, g, b), vec3(uColorScale));
  vec3 finalColor = mix(uBaseColor, color, 0.8);
  fragColor = vec4(finalColor, 1.0);
}
`;

export function createGround(canvas) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
    desynchronized: true,
  });
  if (!gl) return () => {};
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  const vertex = compile(gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aPos');
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const uniforms = Object.fromEntries(
    ['uRes', 'uTime', 'uColorScale', 'uFrequency', 'uBaseColor'].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  let disposed = false,
    active = false,
    frame = 0,
    previous = 0,
    time = 0;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(Math.max(1, canvas.clientWidth) * dpr));
    const height = Math.max(1, Math.round(Math.max(1, canvas.clientHeight) * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }
  function render(timestamp) {
    if (!active || disposed) return;
    const delta = Math.min(0.05, Math.max(0, (timestamp - previous) / 1000)) || 1 / 60;
    previous = timestamp;
    time += 0.00375 * delta * 60;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uniforms.uRes, canvas.width, canvas.height);
    gl.uniform1f(uniforms.uTime, time);
    gl.uniform1f(uniforms.uColorScale, 10);
    gl.uniform1f(uniforms.uFrequency, 7);
    gl.uniform3f(uniforms.uBaseColor, 1, 1, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    frame = requestAnimationFrame(render);
  }
  function stop() {
    active = false;
    if (frame) cancelAnimationFrame(frame);
  }
  function visibility() {
    if (document.hidden) stop();
    else if (!disposed && !active) {
      active = true;
      previous = performance.now();
      resize();
      frame = requestAnimationFrame(render);
    }
  }
  visibility();
  document.addEventListener('visibilitychange', visibility);
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  window.addEventListener('resize', resize);
  return () => {
    disposed = true;
    stop();
    observer.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', visibility);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };
}
