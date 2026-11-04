const contexts = new WeakMap();
const TAU = Math.PI * 2;
const smooth = t => t * t * (3 - 2 * t);

function guideOffset(value, guide, rounding) {
  if (value <= guide[0][0]) return guide[0][1];
  for (let i = 1; i < guide.length; i++) {
    if (value <= guide[i][0]) {
      const [a, b] = guide[i - 1], [c, d] = guide[i];
      let result = b + (d - b) * (value - a) / (c - a);
      if (i > 1 && value - a < rounding) {
        const [x, y] = guide[i - 2];
        const left = b + (b - y) * (value - a) / (a - x);
        result = left + (result - left) * smooth((value - a + rounding) / (rounding * 2));
      }
      if (i < guide.length - 1 && c - value < rounding) {
        const [x, y] = guide[i + 1];
        const right = d + (y - d) * (value - c) / (x - c);
        result += (right - result) * smooth((value - c + rounding) / (rounding * 2));
      }
      return result;
    }
  }
  return guide.at(-1)[1];
}

export function field(x, y, params) {
  const f = params.field;
  if (f.kind === 'rings') {
    const dx = x - f.center[0], dy = (y - f.center[1]) * f.aspect;
    const r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    const fade = Math.min(1, r / (f.noiseFalloff || 1));
    return r + fade * (f.noise[0] * Math.sin(a * 3 + .4) + f.noise[1] * Math.sin(a * 5 + r * .0008));
  }
  if (f.kind === 'dunes') {
    if (f.layers) {
      const levels = f.layers.map(layer => {
        let height = layer.u + layer.offset + layer.slope * (x - 540);
        for (const [amplitude, frequency, phase] of layer.waves) height += amplitude * Math.sin(x / 1080 * TAU * frequency + phase);
        return height;
      });
      for (let i = 1; i < levels.length; i++) {
        if (y <= levels[i]) return f.layers[i - 1].u + (f.layers[i].u - f.layers[i - 1].u) * (y - levels[i - 1]) / (levels[i] - levels[i - 1]);
      }
      return y - levels.at(-1) + f.layers.at(-1).u;
    }
    let height = f.slope * (x - 540);
    for (const [amplitude, frequency, phase] of f.waves) height += amplitude * Math.sin(x / 1080 * TAU * frequency + phase);
    return y - height;
  }
  if (f.kind === 'steps' || f.kind === 'terraces') {
    if (f.staircase) {
      const stair = f.staircase, a = x - stair.shear * y;
      let offset = stair.offset + stair.slope * a;
      for (let i = 0; i < stair.cuts.length; i++) offset += stair.rises[i] / (1 + Math.exp(-(a - stair.cuts[i]) / stair.rounding));
      return y - offset;
    }
    if (f.levels) {
      const levels = f.levels.map(level => guideOffset(x, level.guide, f.rounding));
      for (let i = 1; i < levels.length; i++) {
        if (y <= levels[i]) return f.levels[i - 1].u + (f.levels[i].u - f.levels[i - 1].u) * (y - levels[i - 1]) / (levels[i] - levels[i - 1]);
      }
      return y - levels.at(-1) + f.levels.at(-1).u;
    }
    const vertical = f.kind === 'steps' || f.angle === 90;
    const a = vertical ? y - (f.tilt || 0) * (x - 540) : x, b = vertical ? x : y;
    if (f.wave) {
      let offset = f.wave.offset + f.wave.drift * a;
      for (const cut of f.wave.cuts) {
        const t = Math.max(0, Math.min(1, (a - cut) / f.wave.width + .5));
        offset += f.wave.rise * smooth(t);
      }
      return b - offset;
    }
    return b - guideOffset(a, f.guide, f.rounding || 8) - (f.slope || 0) * a;
  }
  if (f.kind === 'scallops') {
    const v = ((y + f.phase) / f.period % 1) * 2 - 1;
    return x + f.depth * Math.sqrt(Math.max(0, 1 - v * v)) - f.slope * y;
  }
  const dx = x - f.center[0], dy = y - f.center[1], r = Math.hypot(dx, dy);
  const angle = f.twist / (1 + Math.pow(r / f.radius, f.power));
  return f.center[0] + dx * Math.cos(angle) - dy * Math.sin(angle) + f.sway * Math.sin(dy / f.wavelength + f.phase) + f.lean * dy;
}

function random(seed) {
  return () => {
    let t = seed += 0x6d2b79f5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const quadVertex = `#version 300 es
in vec2 position;
out vec2 uv;
void main(){uv=vec2(position.x*.5+.5,.5-position.y*.5);gl_Position=vec4(position,0,1);}`;
const paperFragment = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform vec2 size;
uniform vec3 outerColor;
uniform float inset, corner, noiseAmount;
uniform sampler2D fieldMap, bandMap;
uniform vec3 bandRange;
uniform float ringField,ringAspect,ringFalloff,continuousBands;
uniform vec2 ringCenter,ringNoise;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 p=uv*size;
  vec2 q=abs(p-size*.5)-(size*.5-inset-corner);
  float edge=length(max(q,0.))+min(max(q.x,q.y),0.)-corner;
  vec3 color=outerColor;
  if(edge<0.){
    float u=texture(fieldMap,uv).r;
    if(ringField>0.){
      vec2 d=vec2(p.x-ringCenter.x,(p.y-ringCenter.y)*ringAspect);
      float r=length(d),a=atan(d.y,d.x);
      u=r+min(1.,r/ringFalloff)*(ringNoise.x*sin(a*3.+.4)+ringNoise.y*sin(a*5.+r*.0008));
    }
    float index=clamp((u-bandRange.x)/bandRange.y,0.,bandRange.z-1.);
    int bi=int(floor(index));
    vec2 coord=vec2((index+.5)/bandRange.z,1./6.);
    vec4 base=texture(bandMap,coord);
    vec4 line=continuousBands>0.?texture(bandMap,vec2(coord.x,.5)):texelFetch(bandMap,ivec2(bi,1),0);
    float spacing=texelFetch(bandMap,ivec2(bi,0),0).a;
    color=base.rgb;
    if(spacing>0.){
      vec4 meta=texelFetch(bandMap,ivec2(bi,2),0);
      float start=meta.r;
      float phase=start+(u-bandRange.x-float(bi)*bandRange.y)/spacing;
      float strokeSpacing=spacing;
      if(meta.g>0.){strokeSpacing=1.2+3.2*clamp(p.y/size.y,0.,1.);phase=(p.x+.05*p.y)/strokeSpacing;}
      float pixel=max(fwidth(phase),.00001);
      float duty=clamp(line.a/strokeSpacing,0.,1.);
      float distance=abs(fract(phase+.5)-.5);
      float strength=clamp((duty*.5-distance)/pixel+.5,0.,1.);
      strength=mix(duty,strength,smoothstep(1.5,2.5,1./pixel));
      color=mix(color,line.rgb,strength);
    }
  }
  float grain=(hash(floor(p*1.2))-.5)*noiseAmount/255.;
  grain+=(hash(floor(p/vec2(2.,17.)))-.5)*noiseAmount*.35/255.;
  outColor=vec4(color+grain,1.);
}`;
const pointVertex = `#version 300 es
precision highp float;
in vec2 point;
in float radius;
in vec3 color;
in vec2 velocity;
uniform vec2 size;
uniform float scale, time, duration;
out vec3 ink;
out vec2 logicalPoint;
void main(){
  float phase=time*6.28318530718/duration;
  vec2 p=point+velocity*(sin(phase)+.35*(cos(phase)-1.))*duration/6.28318530718;
  gl_Position=vec4(p.x/size.x*2.-1.,1.-p.y/size.y*2.,0,1);
  gl_PointSize=max(.8,radius*2.*scale);
  ink=color;logicalPoint=p;
}`;
const pointFragment = `#version 300 es
precision highp float;
in vec3 ink;
in vec2 logicalPoint;
uniform vec2 size;
uniform float inset,corner;
out vec4 outColor;
void main(){
  vec2 q=abs(logicalPoint-size*.5)-(size*.5-inset-corner);
  if(length(max(q,0.))+min(max(q.x,q.y),0.)-corner>0.)discard;
  float d=length(gl_PointCoord-.5)*2.;
  float alpha=1.-smoothstep(.65,1.,d);
  if(alpha<.01)discard;
  outColor=vec4(ink,alpha);
}`;
const sphereVertex = `#version 300 es
in vec2 position;
uniform vec2 size,center;
uniform float extent;
out vec2 local;
void main(){local=position*extent;vec2 p=center+local;gl_Position=vec4(p.x/size.x*2.-1.,1.-p.y/size.y*2.,0,1);}`;
const sphereFragment = `#version 300 es
precision highp float;
in vec2 local;
out vec4 outColor;
uniform vec3 color;
uniform vec2 size,center;
uniform float radius,mode,intensity,inset,corner,grainAmount,grainDots;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float dotNoise(vec2 p){uvec2 q=uvec2(ivec2(floor(p)));uint n=q.x*1664525u+q.y*1013904223u+12345u;n^=n>>16;n*=2246822519u;n^=n>>13;n*=3266489917u;n^=n>>16;return float(n)/4294967295.;}
void main(){
  vec2 q=abs(center+local-size*.5)-(size*.5-inset-corner);
  if(length(max(q,0.))+min(max(q.x,q.y),0.)-corner>0.)discard;
  float r=length(local),d=r/radius;
  if(mode==3.){
    if(d<1.)discard;
    float halo=exp(-pow((r-radius)/(radius*.28),.85))*intensity;
    float ray=.87+.13*sin(atan(local.y,local.x)*61.+hash(floor(local*.1))*4.);
    outColor=vec4(color*halo*ray,1.);return;
  }
  if(d>1.)discard;
  vec3 c=color;
  if(mode==1.){
    vec3 normal=vec3(local/radius,sqrt(max(0.,1.-d*d)));
    float light=dot(normal,normalize(vec3(-.4,.55,1.)));
    c*=.53+.6*max(0.,light);
  }
  float grain;
  if(grainDots>0.)grain=(dotNoise(local*1.2)-.5)*grainAmount;
  else {grain=(hash(floor(local*1.4))-.5)*grainAmount;grain+=(hash(floor(local/vec2(2.,28.)))-.5)*grainAmount*.57;}
  outColor=vec4(c+grain,mode==2.?.88:1.);
}`;
const familyVertex = `#version 300 es
in vec2 position;
uniform vec2 size;
void main(){gl_Position=vec4(position.x/size.x*2.-1.,1.-position.y/size.y*2.,0,1);}`;
const familyFragment = `#version 300 es
precision highp float;
uniform vec4 color;
uniform float grain;
out vec4 outColor;
void main(){float n=fract(sin(dot(gl_FragCoord.xy,vec2(127.1,311.7)))*43758.5453)-.5;outColor=vec4(color.rgb+n*grain,color.a);}`;

function makeProgram(gl, vertex, fragment) {
  const shaders = [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]].map(([type, source]) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  });
  const program = gl.createProgram();
  shaders.forEach(shader => gl.attachShader(program, shader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  shaders.forEach(shader => gl.deleteShader(shader));
  const uniforms = {};
  for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i++) {
    const {name} = gl.getActiveUniform(program, i);
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return {program, uniforms};
}

function context(canvas) {
  if (contexts.has(canvas)) return contexts.get(canvas);
  const gl = canvas.getContext('webgl2', {alpha:false, antialias:true, preserveDrawingBuffer:true});
  if (!gl) throw new Error('此设备需要支持 WebGL2。');
  gl.getExtension('OES_texture_float_linear');
  const state = {gl, cache:new Map(), paper:makeProgram(gl, quadVertex, paperFragment), points:makeProgram(gl, pointVertex, pointFragment), sphere:makeProgram(gl, sphereVertex, sphereFragment), family:makeProgram(gl, familyVertex, familyFragment)};
  state.pathBuffer = gl.createBuffer();
  state.quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, state.quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  contexts.set(canvas, state);
  return state;
}

function quad(state, program) {
  const {gl} = state;
  gl.useProgram(program.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.quad);
  const location = gl.getAttribLocation(program.program, 'position');
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

function texture(gl, width, height, data, internal, format) {
  const result = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, result);
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, width, height, 0, format, gl.FLOAT, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return result;
}

function prepare(state, params, limit) {
  if (state.cache.has(params)) return state.cache.get(params);
  const {gl} = state, {width, height, bands} = params;
  const detailed = bands.some(band => band.lineSpacing > 0);
  const fw = detailed ? 1080 : 360, fh = Math.ceil(height / (detailed ? 1 : 3));
  const values = new Float32Array(fw * fh);
  for (let y = 0; y < fh; y++) for (let x = 0; x < fw; x++) values[y * fw + x] = field((x + .5) / fw * width, (y + .5) / fh * height, params);
  const fieldTexture = texture(gl, fw, fh, values, gl.R32F, gl.RED);
  const palette = new Float32Array(bands.length * 12);
  let phase = .5;
  bands.forEach((band, i) => {
    palette.set([...band.base.map(c => c / 255), band.lineSpacing], i * 4);
    palette.set([...band.lineColor.map(c => c / 255), band.lineWidth], (bands.length + i) * 4);
    palette[(bands.length * 2 + i) * 4] = phase;
    palette[(bands.length * 2 + i) * 4 + 1] = band.lineAxis || 0;
    phase = band.lineSpacing ? phase + 12 / band.lineSpacing : .5;
  });
  const bandTexture = texture(gl, bands.length, 3, palette, gl.RGBA32F, gl.RGBA);
  const rng = random(params.seed), instances = [];
  const step = Math.max(params.sampleStep || 2.5, Math.sqrt(width * height / limit));
  for (let y = params.inset; y < height - params.inset; y += step) {
    for (let x = params.inset; x < width - params.inset; x += step) {
      const px = x + rng() * step, py = y + rng() * step, u = field(px, py, params);
      const index = Math.max(0, Math.min(bands.length - 1, Math.floor((u - bands[0].from) / 12)));
      const fraction = Math.max(0, Math.min(1, (u - bands[0].from) / 12 - index));
      const band = params.continuousBands && rng() < fraction ? bands[Math.min(index + 1, bands.length - 1)] : bands[index];
      if (rng() > band.density) continue;
      const choose = rng();
      let ci = 0, weight = band.weights[0];
      while (choose > weight && ci < band.colors.length - 1) weight += band.weights[++ci];
      const radius = band.radius[0] + (band.radius[1] - band.radius[0]) * rng();
      const dx = field(px + 1, py, params) - u, dy = field(px, py + 1, params) - u;
      const length = Math.hypot(dx, dy) || 1;
      const speed = params.static ? 0 : params.motion.speed * params.motion.direction;
      const shade = .86 + rng() * .28;
      instances.push(px, py, radius, ...band.colors[ci].map(c => c / 255 * shade), dy / length * speed, -dx / length * speed);
    }
  }
  const points = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, points);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instances), gl.STATIC_DRAW);
  const result = {fieldTexture, bandTexture, points, count:instances.length / 8};
  state.cache.set(params, result);
  if (state.cache.size > 6) {
    const key = state.cache.keys().next().value, old = state.cache.get(key);
    gl.deleteTexture(old.fieldTexture); gl.deleteTexture(old.bandTexture); gl.deleteBuffer(old.points);
    state.cache.delete(key);
  }
  return result;
}

function sphereCenter(sphere, t) {
  if (!sphere.path) return sphere.center;
  const path = sphere.path;
  for (let i = 1; i < path.length; i++) {
    if (t <= path[i][0]) {
      const [a, x, y] = path[i - 1], [b, xx, yy] = path[i];
      const f = (t - a) / (b - a);
      let dx = xx - x;
      if (sphere.wrapWidth && Math.abs(dx) > sphere.wrapWidth / 2) dx -= Math.sign(dx) * sphere.wrapWidth;
      let px = x + dx * f;
      if (sphere.wrapWidth) px = (px % sphere.wrapWidth + sphere.wrapWidth) % sphere.wrapWidth;
      return [px, y + (yy - y) * f];
    }
  }
  return sphere.center;
}

function drawSpheres(state, params, t) {
  const {gl, sphere:program} = state, u = program.uniforms;
  quad(state, program);
  gl.uniform2f(u.size, params.width, params.height);
  gl.uniform1f(u.inset, params.inset || 0); gl.uniform1f(u.corner, params.corner || 0);
  for (const item of params.spheres) {
    gl.uniform2fv(u.center, sphereCenter(item, t));
    let radius = item.radius;
    if (item.path?.[0].length === 4) {
      for (let i = 1; i < item.path.length; i++) {
        if (t <= item.path[i][0]) {
          const a = item.path[i - 1], b = item.path[i];
          radius = a[3] + (b[3] - a[3]) * (t - a[0]) / (b[0] - a[0]);
          break;
        }
      }
    }
    gl.uniform1f(u.radius, radius);
    gl.uniform1f(u.grainAmount, item.grain ?? .035);
    gl.uniform1f(u.grainDots, item.grainDots ? 1 : 0);
    if (item.eclipse) {
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.uniform1f(u.extent, item.eclipse.radius);
      gl.uniform1f(u.mode, 3);
      gl.uniform1f(u.intensity, item.eclipse.intensity);
      gl.uniform3fv(u.color, item.eclipse.color.map(c => c / 255));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(u.extent, radius);
    gl.uniform1f(u.mode, {flat:0, shaded:1, dark:2}[item.mode]);
    gl.uniform3fv(u.color, item.color.map(c => c / 255));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

function drawPiece(state, params, t, rect, limit = 600000, duration = 10) {
  const {gl, paper, points} = state, ready = prepare(state, params, limit);
  gl.viewport(...rect);
  gl.disable(gl.BLEND);
  quad(state, paper);
  const u = paper.uniforms;
  gl.uniform2f(u.size, params.width, params.height);
  gl.uniform3fv(u.outerColor, params.outer.map(c => c / 255));
  gl.uniform1f(u.inset, params.inset); gl.uniform1f(u.corner, params.corner);
  gl.uniform1f(u.noiseAmount, params.paperNoise);
  gl.uniform1f(u.ringField, params.field.kind === 'rings' ? 1 : 0);
  gl.uniform1f(u.continuousBands, params.continuousBands ? 1 : 0);
  if (params.field.kind === 'rings') {
    gl.uniform2fv(u.ringCenter, params.field.center); gl.uniform1f(u.ringAspect, params.field.aspect);
    gl.uniform2fv(u.ringNoise, params.field.noise); gl.uniform1f(u.ringFalloff, params.field.noiseFalloff || 1);
  }
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, ready.fieldTexture); gl.uniform1i(u.fieldMap, 0);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, ready.bandTexture); gl.uniform1i(u.bandMap, 1);
  gl.uniform3f(u.bandRange, params.bands[0].from, 12, params.bands.length);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.useProgram(points.program); gl.bindBuffer(gl.ARRAY_BUFFER, ready.points);
  for (const [name, size, offset] of [['point',2,0], ['radius',1,2], ['color',3,3], ['velocity',2,6]]) {
    const location = gl.getAttribLocation(points.program, name);
    gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, size, gl.FLOAT, false, 32, offset * 4);
  }
  gl.uniform2f(points.uniforms.size, params.width, params.height);
  gl.uniform1f(points.uniforms.scale, rect[2] / params.width);
  gl.uniform1f(points.uniforms.time, params.static ? 0 : t);
  gl.uniform1f(points.uniforms.duration, duration);
  gl.uniform1f(points.uniforms.inset, params.inset); gl.uniform1f(points.uniforms.corner, params.corner);
  gl.drawArrays(gl.POINTS, 0, ready.count);
  drawSpheres(state, params, t);
  return ready.count;
}

function drawFamily(state, params, t, canvas) {
  const {gl, family} = state;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.disable(gl.BLEND);
  gl.useProgram(family.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.pathBuffer);
  const location = gl.getAttribLocation(family.program, 'position');
  gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(family.uniforms.size, params.width, params.height);
  gl.uniform4fv(family.uniforms.color, [...params.outer.map(c => c / 255), 1]);
  gl.uniform1f(family.uniforms.grain, .025);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,params.width,0,0,params.height,0,params.height,params.width,0,params.width,params.height]), gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform4f(family.uniforms.color, 42 / 255, 36 / 255, 33 / 255, .12);
  gl.uniform1f(family.uniforms.grain, 0);
  for (const path of params.paths) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(path.flat()), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.LINE_STRIP, 0, path.length);
  }
  let count = 0;
  for (const child of params.children) {
    const [x, y, width, height] = child.rect;
    const rect = [Math.round(x / params.width * canvas.width), Math.round((params.height - y - height) / params.height * canvas.height), Math.round(width / params.width * canvas.width), Math.round(height / params.height * canvas.height)];
    count += drawPiece(state, child.piece, t, rect, Math.floor(600000 / params.children.length), params.duration);
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  if (params.messenger) drawSpheres(state, {width:params.width, height:params.height, spheres:[params.messenger]}, t);
  return count;
}

export function renderPiece(canvas, params, t = 0) {
  const state = context(canvas);
  const duration = params.duration || 10;
  const time = params.static ? 0 : ((t % duration) + duration) % duration;
  const count = params.field.kind === 'family' ? drawFamily(state, params, time, canvas) : drawPiece(state, params, time, [0, 0, canvas.width, canvas.height]);
  canvas.dataset.points = String(count);
}

export function releaseRenderer(canvas) {
  const state = contexts.get(canvas);
  if (!state) return;
  state.gl.getExtension('WEBGL_lose_context').loseContext();
  contexts.delete(canvas);
}
