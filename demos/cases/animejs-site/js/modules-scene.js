import { LoadingManager, Raycaster, Group, Vector3, Mesh, CylinderGeometry, Color, Float32BufferAttribute } from 'three';
import { GLTFLoader } from '../vendor/three@0.172.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/three@0.172.0/examples/jsm/loaders/DRACOLoader.js';
import { utils, stagger, createTimeline, animate, spring } from '../vendor/animejs@4.5.0/dist/modules/index.js';
import { CSS2DObject } from '../vendor/three@0.172.0/examples/jsm/renderers/CSS2DRenderer.js';

var assetManager = new LoadingManager();
var gltfLoader = new GLTFLoader(assetManager);
var dracoLoader = new DRACOLoader();
function loadGeometry(url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, model => {
      const mesh = model.scene.children[0];
      if (mesh) resolve(mesh.geometry);else reject(new Error(`GLTF model ${url} doesn't contain a valid scene`));
    }, undefined, reject);
  });
}
async function loadGeometries(urls) {
  const jobs = Object.entries(urls).map(([name, url]) => loadGeometry(url).then(geometry => [name, geometry]));
  return Object.fromEntries(await Promise.all(jobs));
}
var ModuleAssembly = class {
  constructor(materials, scope, stage) {
    this.geometries = null;
    this.materials = materials;
    this.scope = scope;
    this.stage = stage;
    this.raycaster = new Raycaster();
    this.root = new Group();
    this.rootWorldPostion = new Vector3();
    this.easesObjects = [];
    this.caseFrontVentObjects = [];
    this.caseBackVentObjects = [];
    this.case01Objects = [];
    this.case02FrontObjects = [];
    this.case02BackObjects = [];
    this.labels = [];
    this.modulesObjects = {
      animate: new Group(),
      draggable: new Group(),
      scroll: new Group(),
      engine: new Group(),
      scope: new Group(),
      timer: new Group(),
      stagger: new Group(),
      spring: new Group(),
      svg: new Group(),
      timeline: new Group(),
      renderer: new Group(),
      waapi: new Group(),
      case01: new Group(),
      case02: new Group(),
      case02Back: new Group()
    };
    utils.set(this.modulesObjects.waapi, {
      z: 2.6,
      scale: .8
    });
    this.createLabel("waapi", this.modulesObjects.waapi, -1, 0, 0, "color-waapi");
    utils.set(this.modulesObjects.timeline, {
      z: 2.05
    });
    this.createLabel("timeline", this.modulesObjects.timeline, -1, 0, 0, "color-timeline");
    utils.set(this.modulesObjects.stagger, {
      z: 1.52
    });
    this.createLabel("stagger", this.modulesObjects.stagger, -1, 0, 0, "color-utils");
    utils.set(this.modulesObjects.svg, {
      z: 1.16
    });
    this.createLabel("svg", this.modulesObjects.svg, -1, 0, 0, "color-svg");
    utils.set(this.modulesObjects.spring, {
      z: .99
    });
    this.createLabel("spring", this.modulesObjects.spring, -1, 0, 0, "color-easings");
    utils.set(this.modulesObjects.animate, {
      z: 0
    });
    this.createLabel("animation", this.modulesObjects.animate, -1, 0, 0, "color-animation");
    utils.set(this.modulesObjects.timer, {
      z: .6
    });
    this.createLabel("timer", this.modulesObjects.timer, 1, 0, 0, "color-timer");
    this.createLabel("easings", this.modulesObjects.animate, 1, 0, 0, "color-easings");
    utils.set(this.modulesObjects.draggable, {
      z: -.62
    });
    this.createLabel("draggable", this.modulesObjects.draggable, 1, 0, 0, "color-draggable");
    utils.set(this.modulesObjects.scroll, {
      z: -1.05
    });
    this.createLabel("scroll", this.modulesObjects.scroll, 1, 0, 0, "color-events");
    utils.set(this.modulesObjects.engine, {
      z: -1.85
    });
    utils.set(this.modulesObjects.scope, {
      z: -1.81
    });
    this.createLabel("scope", this.modulesObjects.scope, 1, 0, 0, "color-scope");
    utils.set(this.modulesObjects.renderer, {
      z: 2.7,
      scale: .98
    });
    utils.set(this.modulesObjects.case01, {
      z: 1.8
    });
    utils.set(this.modulesObjects.case02, {
      z: .35
    });
    utils.set(this.modulesObjects.case02Back, {
      z: -1.78
    });
    for (let value41 in this.modulesObjects) {
      this.root.add(this.modulesObjects[value41]);
    }
    for (let value42 = 0, value43 = 13; value42 < value43; value42++) {
      let group = new Group();
      group.dataset = {
        index: 0
      };
      this.easesObjects.push(group);
    }
    for (let value44 = 0, value45 = 15; value44 < value45; value44++) {
      let group2 = new Group();
      let group3 = new Group();
      this.caseFrontVentObjects.push(group2);
      this.caseBackVentObjects.push(group3);
      this.modulesObjects.case02.add(group2);
      this.modulesObjects.case02Back.add(group3);
    }
    for (let value46 = 0, value47 = 4; value46 < value47; value46++) {
      let group4 = new Group();
      let group5 = new Group();
      let group6 = new Group();
      this.case01Objects.push(group4);
      this.case02FrontObjects.push(group5);
      this.case02BackObjects.push(group6);
      this.modulesObjects.case01.add(group4);
      this.modulesObjects.case02.add(group5);
      this.modulesObjects.case02Back.add(group6);
    }
    this.createMeshes();
  }
  createLabel(name, group, x = 0, y = 0, z = 0, colorClass) {
    let listItem = document.createElement("li");
    let pointEl = document.createElement("div");
    let textEl = document.createElement("div");
    let leftList = document.querySelector(".toolbox-labels-left");
    let rightList = document.querySelector(".toolbox-labels-right");
    let flipped = x > 0;
    (flipped ? leftList : rightList).appendChild(listItem);
    textEl.classList.add("module-label-text");
    pointEl.classList.add("module-label-point");
    listItem.innerHTML = name;
    textEl.innerHTML = name;
    textEl.classList.add("module-" + name);
    if (colorClass) {
      listItem.classList.add(colorClass);
      textEl.classList.add(colorClass);
    }
    let pointObject = new CSS2DObject(pointEl);
    let textObject = new CSS2DObject(textEl);
    utils.set(pointObject, {
      x: x,
      y: y,
      z: z
    });
    utils.set(textObject, {
      x: 0,
      y: 1.25,
      z: z
    });
    this.labels.push(pointObject);
    group.add(pointObject);
    group.add(textObject);
    this.stage.labelsRenderer.domElement.appendChild(pointEl);
    this.stage.labelsRenderer.domElement.appendChild(textEl);
    this.stage.lines.createLine(listItem, pointEl, !flipped, colorClass);
    return pointObject;
  }
  createMesh(group, geometryName, properties) {
    let mesh = new Mesh(this.geometries[geometryName], this.materials.outlineMaterial);
    if (properties) {
      utils.set(mesh, properties);
    }
    group.add(mesh);
    return mesh;
  }
  async loadGeometries() {
    this.geometries = await loadGeometries({
      animate01: "assets/models/module-animate-01.glb",
      easing01: "assets/models/module-easing-01.glb",
      draggable01: "assets/models/module-draggable-01.glb",
      draggable02: "assets/models/module-draggable-02.glb",
      scroll01: "assets/models/module-scroll-01.glb",
      engine01: "assets/models/module-engine-01.glb",
      scope01: "assets/models/module-scope-01.glb",
      timer01: "assets/models/module-timer-01.glb",
      timer02: "assets/models/module-timer-02.glb",
      timer03: "assets/models/module-timer-03.glb",
      timer04: "assets/models/module-timer-04.glb",
      timer05: "assets/models/module-timer-05.glb",
      stagger01: "assets/models/module-stagger-01.glb",
      stagger02: "assets/models/module-stagger-02.glb",
      spring01: "assets/models/module-spring-01.glb",
      svg01: "assets/models/module-svg-01.glb",
      timeline01: "assets/models/module-timeline-01.glb",
      timeline02: "assets/models/module-timeline-02.glb",
      renderer01: "assets/models/module-renderer-01.glb",
      waapi01: "assets/models/module-waapi-01.glb",
      shield01: "assets/models/module-shield-01.glb",
      shield02: "assets/models/module-shield-02.glb"
    });
  }
  async createMeshes() {
    await this.loadGeometries();
    this.createMesh(this.modulesObjects.animate, "animate01");
    let easingsGroup = new Group();
    this.modulesObjects.animate.add(easingsGroup);
    let easePivots = [];
    let easeMeshes = [];
    for (let value49 = 0, value50 = this.easesObjects.length; value49 < value50; value49++) {
      let group7 = new Group();
      let value48 = this.easesObjects[value49];
      easePivots.push(group7);
      easingsGroup.add(group7);
      group7.add(value48);
      easeMeshes.push(this.createMesh(value48, "easing01"));
    }
    utils.set(easePivots, {
      x: stagger(.044),
      rotateZ: stagger([20, -20])
    });
    utils.set(easeMeshes, {
      y: stagger([-.07, -.11], {
        from: "center",
        ease: "in(2)"
      })
    });
    createTimeline({
      id: "easing-meshes-bob"
    }).add(easeMeshes, {
      y: [{
        to: "+=.03",
        ease: "inQuad",
        duration: 500
      }, {
        to: "-=.03",
        ease: "outQuad",
        duration: 1e3
      }],
      loop: true,
      ease: "inOutQuad"
    }, stagger(200));
    utils.set(easingsGroup, {
      x: .75,
      y: .65,
      z: 0,
      rotateZ: -63
    });
    let draggableGroups = [];
    this.createMesh(this.modulesObjects.draggable, "draggable01");
    for (let value51 = 0, value52 = 5; value51 < value52; value51++) {
      let group8 = new Group();
      draggableGroups.push(group8);
      this.modulesObjects.draggable.add(group8);
      this.createMesh(group8, "draggable02", {
        y: .92
      });
    }
    createTimeline({
      id: "draggable-meshes-rotate",
      defaults: {
        loop: true
      }
    }).add(draggableGroups, {
      rotateZ: [stagger([-90, 0]), stagger([-450, -360])],
      duration: 3e3,
      ease: "inOut(4)"
    }, stagger(160)).init();
    let scrollMesh = this.createMesh(this.modulesObjects.scroll, "scroll01");
    animate(scrollMesh, {
      id: "scroll-mesh-rotate",
      rotateZ: -360,
      ease: "linear",
      duration: 32e3,
      loop: true
    });
    let scopeMesh = this.createMesh(this.modulesObjects.scope, "scope01", {
      scale: .98
    });
    animate(scopeMesh, {
      id: "scope-mesh-rotate",
      rotateZ: -360,
      ease: "linear",
      duration: 64e3,
      loop: true
    });
    let engineMesh = this.createMesh(this.modulesObjects.engine, "engine01");
    animate(engineMesh, {
      id: "engine-mesh-rotate",
      rotateZ: -360,
      ease: "linear",
      duration: 64e3,
      loop: true
    });
    let timerFace = this.createMesh(this.modulesObjects.timer, "timer01", {
      z: .075
    });
    let timerRing = this.createMesh(this.modulesObjects.timer, "timer02", {
      z: -.08
    });
    let timerGearLeft = this.createMesh(this.modulesObjects.timer, "timer03", {
      z: .16,
      x: -.225,
      y: .5
    });
    let timerGearRight = this.createMesh(this.modulesObjects.timer, "timer04", {
      z: .16,
      x: .5,
      y: .4
    });
    this.createMesh(this.modulesObjects.timer, "timer05", {
      z: .26,
      scale: .95
    });
    createTimeline({
      id: "timer-meshes",
      defaults: {
        loop: true
      }
    }).add(timerFace, {
      rotateZ: function () {
        let value54 = [];
        for (let value53 = 0; value53 < 36; value53++) {
          value54.push({
            to: -(360 / 36) * value53,
            duration: 1e3
          });
        }
        return value54;
      }(),
      ease: "outElastic(.2, 1)"
    }, 0).add(timerRing, {
      rotateZ: function () {
        let value56 = [];
        for (let value55 = 0; value55 < 24; value55++) {
          value56.push({
            to: -(360 / 24) * value55,
            duration: 1e3
          });
        }
        return value56;
      }(),
      ease: "linear"
    }, 0).add(timerGearLeft, {
      rotateZ: 360,
      ease: "linear",
      duration: 7e3
    }, 0).add(timerGearRight, {
      rotateZ: -360,
      ease: "linear",
      duration: 6e3
    }, 0);
    let springMesh = this.createMesh(this.modulesObjects.spring, "spring01");
    animate(springMesh, {
      id: "spring-mesh-rotate",
      rotateZ: [0, -90,, -180, -270, -360],
      ease: spring({
        stiffness: 10,
        damping: 3
      }),
      loop: true
    });
    let staggerGroup = this.modulesObjects.stagger;
    let staggerMeshes = [];
    for (let value57 = 0; value57 < 4; value57++) {
      staggerMeshes.push(this.createMesh(staggerGroup, "stagger02", {
        z: -.1 * value57 + .06
      }));
    }
    createTimeline({
      id: "stagger-meshes-bob"
    }).add(staggerMeshes, {
      z: [{
        to: "+=.08",
        ease: "inOut(2)",
        duration: 1e3
      }, {
        to: "-=.08",
        ease: "inOut(2)",
        duration: 800
      }],
      loop: true
    }, stagger(200, {
      from: "last"
    }));
    this.createMesh(staggerGroup, "stagger01", 0);
    let segments = 69;
    let cylinderGeometry = new CylinderGeometry(.9, .9, .1, segments, 1, false).toNonIndexed();
    let positions = cylinderGeometry.getAttribute("position");
    let vertexColors = [];
    let sideColors = [];
    for (let value59 = 0; value59 < segments; value59++) {
      let value58 = value59 % 2;
      sideColors[value59] = new Color().setHSL(utils.random(value58 ? .25 : .55, value58 ? .45 : .75, 2), 1, .5);
    }
    let topColor = new Color().setHSL(.1, 1, .5);
    let bottomColor = new Color().setHSL(.9, 1, .5);
    for (let value67 = 0; value67 < positions.count; value67 += 3) {
      let value65 = cylinderGeometry.attributes.normal.getY(value67);
      let value66;
      if (Math.abs(value65) > .9) {
        value66 = value65 > 0 ? topColor : bottomColor;
      } else {
        let value60 = positions.array[value67 * 3];
        let value61 = positions.array[value67 * 3 + 2];
        let value62 = Math.atan2(value61, value60);
        let value63 = Math.floor((value62 + Math.PI) / (Math.PI * 2) * segments);
        value66 = sideColors[value63] || sideColors[0];
      }
      for (let value64 = 0; value64 < 3; value64++) {
        vertexColors.push(value66.r, value66.g, value66.b);
      }
    }
    cylinderGeometry.setAttribute("color", new Float32BufferAttribute(vertexColors, 3));
    let svgCylinder = new Mesh(cylinderGeometry, this.materials.outlineMaterial);
    this.modulesObjects.svg.add(svgCylinder);
    this.createMesh(this.modulesObjects.svg, "svg01", 0);
    utils.set(svgCylinder, {
      rotateX: 90
    });
    animate(svgCylinder, {
      id: "svg-cylinder-rotate",
      rotateY: -360,
      loop: true,
      duration: 1e4,
      ease: "linear"
    });
    let morphState = {
      progress: 0,
      segments: 2,
      odd: .5,
      even: .1,
      positions: cylinderGeometry.attributes.position.array.slice(),
      radius: {
        x: [],
        z: []
      },
      newRadius: {
        x: [],
        z: []
      }
    };
    function sampleRadius() {
      let value76 = {
        x: [],
        z: []
      };
      for (let value75 = 0; value75 < morphState.positions.length; value75 += 3) {
        let value69 = morphState.positions[value75];
        let value70 = morphState.positions[value75 + 2];
        let value71 = (Math.atan2(value70, value69) + Math.PI) / (Math.PI * 2);
        let value72 = morphState.segments;
        let value73 = utils.lerp(morphState.even, morphState.odd, (Math.sin(value71 * Math.PI * value72) + 1) / 2);
        let value74 = Math.sqrt(value69 * value69 + value70 * value70);
        if (value74 > 0) {
          let value68 = value74 - value73;
          value76.x[value75] = value69 / value74 * value68;
          value76.z[value75] = value70 / value74 * value68;
        } else {
          value76.x[value75] = value69;
          value76.z[value75] = value70;
        }
      }
      return value76;
    }
    function updateRadius() {
      let value78 = morphState.p;
      let value79 = morphState.radius;
      let value80 = morphState.newRadius;
      for (let value77 = 0; value77 < morphState.positions.length; value77 += 3) {
        cylinderGeometry.attributes.position.array[value77] = utils.lerp(value79.x[value77], value80.x[value77], value78);
        cylinderGeometry.attributes.position.array[value77 + 2] = utils.lerp(value79.z[value77], value80.z[value77], value78);
      }
      cylinderGeometry.attributes.position.needsUpdate = true;
    }
    createTimeline({
      id: "svg-cylinder-morph",
      loop: true,
      onUpdate: () => updateRadius()
    }).call(() => {
      morphState.radius = sampleRadius();
      morphState.segments = utils.random(4, 32, 0);
      morphState.odd = utils.random(0, .5, 2);
      morphState.even = utils.random(0, .2, 2);
      morphState.newRadius = sampleRadius();
    }).add(morphState, {
      p: [0, 1],
      duration: 750,
      ease: "inOutQuad"
    });
    let timelineGroup = this.modulesObjects.timeline;
    let timelineMeshes = [];
    let angleStep = Math.PI * 2 / 8;
    let radius = .68;
    for (let value84 = 0; value84 < 8; value84++) {
      let value81 = angleStep * value84;
      let value82 = Math.cos(value81) * radius;
      let value83 = Math.sin(value81) * radius;
      timelineMeshes.push(this.createMesh(timelineGroup, "timeline02", {
        x: value82,
        y: value83,
        z: -.35,
        rotateZ: -90 + value84 * 45
      }));
    }
    createTimeline({
      id: "timeline-meshes-bob"
    }).add(timelineMeshes, {
      z: [{
        to: "+=.15",
        ease: "inOut(2)",
        duration: 1e3
      }, {
        to: "-=.15",
        ease: "inOut(2)",
        duration: 800
      }],
      loop: true
    }, stagger(200, {
      from: "last"
    }));
    this.createMesh(timelineGroup, "timeline01");
    this.createMesh(this.modulesObjects.renderer, "renderer01", {
      z: .025
    });
    this.createMesh(this.modulesObjects.waapi, "waapi01", {
      z: 0,
      y: 0,
      x: 0
    });
    let shieldOffset = .541;
    let shieldScale = .925;
    let shieldDepth = 1;
    let shieldZ = 0;
    this.createMesh(this.case01Objects[0], "shield01", {
      scale: shieldScale,
      scaleZ: shieldDepth,
      x: -shieldOffset,
      y: shieldOffset,
      z: shieldZ,
      rotateZ: 0
    });
    this.createMesh(this.case01Objects[2], "shield01", {
      scale: shieldScale,
      scaleZ: shieldDepth,
      x: shieldOffset,
      y: -shieldOffset,
      z: shieldZ,
      rotateZ: -180
    });
    this.createMesh(this.case01Objects[3], "shield01", {
      scale: shieldScale,
      scaleZ: shieldDepth,
      x: -shieldOffset,
      y: -shieldOffset,
      z: shieldZ,
      rotateZ: -270
    });
    let ventOffset = .585;
    let ventZ = .715;
    let frontVentMeshes = [];
    this.createMesh(this.case02FrontObjects[0], "shield02", {
      x: -ventOffset,
      y: ventOffset,
      z: ventZ,
      rotateZ: 0
    });
    this.createMesh(this.case02FrontObjects[1], "shield02", {
      x: ventOffset,
      y: -ventOffset,
      z: ventZ,
      rotateZ: -180
    });
    this.createMesh(this.case02FrontObjects[2], "shield02", {
      x: -ventOffset,
      y: -ventOffset,
      z: ventZ,
      rotateZ: -270
    });
    for (let value85 = 0; value85 < this.caseFrontVentObjects.length; value85++) {
      frontVentMeshes.push(this.createMesh(this.caseFrontVentObjects[value85], "shield02", {
        x: ventOffset,
        y: ventOffset,
        z: ventZ,
        rotateZ: -90,
        scaleZ: .025
      }));
    }
    utils.set(frontVentMeshes, {
      z: stagger([0, 1.37], {
        start: .03
      })
    });
    let backVentMeshes = [];
    this.createMesh(this.case02BackObjects[0], "shield02", {
      x: -ventOffset,
      y: ventOffset,
      z: ventZ,
      rotateZ: 0
    });
    this.createMesh(this.case02BackObjects[1], "shield02", {
      x: ventOffset,
      y: -ventOffset,
      z: ventZ,
      rotateZ: -180
    });
    this.createMesh(this.case02BackObjects[2], "shield02", {
      x: -ventOffset,
      y: -ventOffset,
      z: ventZ,
      rotateZ: -270
    });
    for (let value86 = 0; value86 < this.caseBackVentObjects.length; value86++) {
      backVentMeshes.push(this.createMesh(this.caseBackVentObjects[value86], "shield02", {
        x: ventOffset,
        y: ventOffset,
        z: ventZ,
        rotateZ: -90,
        scaleZ: .025
      }));
    }
    utils.set(backVentMeshes, {
      z: stagger([0, 1.37], {
        start: .03
      })
    });
  }
};
dracoLoader.setDecoderPath("./assets/draco/");
gltfLoader.setDRACOLoader(dracoLoader);
function appendModulesTimeline(mainTimeline, {
  dottedGridCanvas,
  sceneRoot,
  matches,
  assemblyRoot,
  moduleAssembly,
  bundleSizeEl,
  minimalBundleSize,
  cssRoot,
  heartAnimation,
  heartCanvas
}) {
  mainTimeline.label("MODULES");
  mainTimeline.label("MODULES_TRANSFORM", "MODULES+=590");
  mainTimeline.label("MODULES_SHRINK", "MODULES+=1250");
  mainTimeline.label("MODULES_CASE", "MODULES+=1900");
  mainTimeline.label("MODULES_ROTATION", "MODULES+=1750");
  mainTimeline.add([".output-progress-bg", ".output-progress", ".clock", dottedGridCanvas.$canvas], {
    id: "progress bg opacity 4",
    opacity: .001,
    duration: 500
  }, "MODULES+=100");
  mainTimeline.add(sceneRoot, {
    id: "scene z 5",
    z: matches.minM ? 20 : -15,
    duration: 1e3
  }, "MODULES");
  mainTimeline.add(sceneRoot, {
    id: "scene rotate x",
    rotateX: 45,
    duration: 1e3
  }, "MODULES");
  mainTimeline.add(sceneRoot, {
    id: "scene rotate y",
    rotateY: -720,
    duration: 1625
  }, "MODULES_ROTATION");
  mainTimeline.add(sceneRoot, {
    id: "scene z 6",
    z: 57,
    rotateX: 0,
    duration: 1625
  }, "MODULES_ROTATION");
  mainTimeline.add(assemblyRoot, {
    id: "engine z 2",
    z: 2,
    duration: 1e3
  }, "MODULES_ROTATION");
  mainTimeline.add([moduleAssembly.modulesObjects.waapi, moduleAssembly.modulesObjects.timeline, moduleAssembly.modulesObjects.svg, moduleAssembly.modulesObjects.spring, moduleAssembly.modulesObjects.draggable, moduleAssembly.modulesObjects.scroll], {
    id: "modules waapi x",
    x: (item52, index23) => index23 % 2 ? -2.5 : 2.5,
    y: (item53, index24) => (index24 % 2, 0),
    duration: 750
  }, stagger(25, {
    start: "MODULES_TRANSFORM",
    reversed: false
  }));
  mainTimeline.add(".module-label-text div", {
    id: "label text opacity",
    opacity: [0, 1],
    scale: [0, 1],
    ease: "inOut(2)",
    duration: 200,
    delay: stagger(10)
  }, "MODULES_TRANSFORM+=450");
  mainTimeline.add([moduleAssembly.modulesObjects.waapi, moduleAssembly.modulesObjects.timeline, moduleAssembly.modulesObjects.svg, moduleAssembly.modulesObjects.spring, moduleAssembly.modulesObjects.draggable, moduleAssembly.modulesObjects.scroll], {
    id: "modules waapi rotate y",
    rotateY: (item54, index25) => index25 % 2 ? -90 : 90,
    scale: 0,
    duration: 1e3
  }, stagger(25, {
    start: "MODULES_SHRINK",
    reversed: false
  }));
  mainTimeline.add([".chart-bar.module-waapi", ".chart-bar.module-timeline", ".chart-bar.module-svg", ".chart-bar.module-spring", ".chart-bar.module-draggable", ".chart-bar.module-scroll"], {
    id: "module waapi width",
    width: "0%",
    ease: "linear",
    duration: 1e3
  }, stagger(25, {
    start: "MODULES_SHRINK",
    reversed: false
  }));
  mainTimeline.add([".module-label-text.module-waapi .size", ".module-label-text.module-timeline .size", ".module-label-text.module-svg .size", ".module-label-text.module-spring .size", ".module-label-text.module-draggable .size", ".module-label-text.module-scroll .size"], {
    id: "waapi size inner html",
    innerHTML: "0",
    ease: "linear",
    modifier: utils.roundPad(2),
    duration: 1e3
  }, stagger(25, {
    start: "MODULES_SHRINK",
    reversed: false
  }));
  mainTimeline.add([".module-label-text.module-waapi div", ".module-label-text.module-timeline div", ".module-label-text.module-svg div", ".module-label-text.module-spring div", ".module-label-text.module-draggable div", ".module-label-text.module-scroll div", ".module-label-text div"], {
    id: "text waapi scale",
    scale: 0,
    ease: "inOut(2)",
    duration: 200,
    delay: stagger(40)
  }, "<-=400");
  mainTimeline.add(bundleSizeEl, {
    id: "bundle size inner html",
    innerHTML: minimalBundleSize,
    ease: "linear",
    modifier: utils.roundPad(2),
    duration: 1e3
  }, "MODULES_SHRINK");
  mainTimeline.add(moduleAssembly.modulesObjects.waapi, {
    id: "modules waapi z 2",
    z: 2.5,
    duration: 500,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM");
  mainTimeline.add(moduleAssembly.modulesObjects.renderer, {
    id: "modules renderer z 2",
    z: 1.5,
    duration: 2e3,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM+=400");
  mainTimeline.add(cssRoot, {
    id: "css z 3",
    z: 25 - 5.5,
    duration: 2e3,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM+=400");
  mainTimeline.add(moduleAssembly.modulesObjects.stagger, {
    id: "modules stagger z",
    z: 1.12,
    duration: 1500,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM+=500");
  mainTimeline.add(moduleAssembly.modulesObjects.engine, {
    id: "engine modules z",
    z: -1.2,
    duration: 1500,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM+=700");
  mainTimeline.add(moduleAssembly.modulesObjects.scope, {
    id: "modules scope z 2",
    z: -1.12,
    duration: 1500,
    ease: "inOut(3)"
  }, "MODULES_TRANSFORM+=750");
  mainTimeline.add(moduleAssembly.case02BackObjects[0], {
    id: "case02 back x 4",
    x: 0,
    y: 0,
    z: .7,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=200");
  mainTimeline.add(moduleAssembly.case02BackObjects[1], {
    id: "case02 back x 5",
    x: 0,
    y: 0,
    z: .7,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=200");
  mainTimeline.add(moduleAssembly.case02BackObjects[2], {
    id: "case02 back x 6",
    x: 0,
    y: 0,
    z: .7,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=200");
  mainTimeline.add(moduleAssembly.case02FrontObjects[0], {
    id: "case02 front x 4",
    x: 0,
    y: 0,
    z: 0,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=100");
  mainTimeline.add(moduleAssembly.case02FrontObjects[1], {
    id: "case02 front x 5",
    x: 0,
    y: 0,
    z: 0,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=100");
  mainTimeline.add(moduleAssembly.case02FrontObjects[2], {
    id: "case02 front x 6",
    x: 0,
    y: 0,
    z: 0,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=100");
  mainTimeline.add(moduleAssembly.case01Objects[0], {
    id: "engine case01 x 4",
    x: 0,
    y: 0,
    z: -.6,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=0");
  mainTimeline.add(moduleAssembly.case01Objects[2], {
    id: "engine case01 x 5",
    x: 0,
    y: 0,
    z: -.6,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=0");
  mainTimeline.add(moduleAssembly.case01Objects[3], {
    id: "engine case01 x 6",
    x: 0,
    y: 0,
    z: -.6,
    scale: {
      to: 1,
      duration: 100
    },
    scaleZ: {
      to: .5125,
      duration: 100
    },
    ease: "out(3)"
  }, "MODULES_CASE+=0");
  mainTimeline.add([moduleAssembly.caseBackVentObjects[7], moduleAssembly.caseBackVentObjects[8], moduleAssembly.caseBackVentObjects[9], moduleAssembly.caseBackVentObjects[10], moduleAssembly.caseBackVentObjects[11], moduleAssembly.caseBackVentObjects[12], moduleAssembly.caseBackVentObjects[13], moduleAssembly.caseBackVentObjects[14], moduleAssembly.caseFrontVentObjects[0], moduleAssembly.caseFrontVentObjects[1], moduleAssembly.caseFrontVentObjects[2], moduleAssembly.caseFrontVentObjects[3], moduleAssembly.caseFrontVentObjects[4], moduleAssembly.caseFrontVentObjects[5], moduleAssembly.caseFrontVentObjects[6], moduleAssembly.caseFrontVentObjects[7]], {
    id: "back vent rotate z 3",
    rotateZ: 0,
    scale: 1,
    ease: "out(3)",
    opacity: {
      to: 1,
      duration: 0,
      delay: stagger(10, {
        from: "last",
        start: 150
      })
    },
    delay: stagger(10, {
      from: "last"
    })
  }, "MODULES_CASE");
  mainTimeline.add(sceneRoot, {
    id: "scene z 7",
    z: matches.minM ? 64 : 100,
    duration: 2e3
  }, "MODULES_CASE");
  mainTimeline.call(({
    backwards: item55
  }) => {
    if (item55) {
      heartAnimation.pause();
    } else {
      heartAnimation.restart();
    }
  }, "-=500");
  mainTimeline.add([".output-progress-bg", ".output-progress", ".clock"], {
    id: "progress bg opacity 5",
    opacity: 1,
    duration: 500
  }, "<<");
  mainTimeline.add([heartCanvas.$canvas], {
    id: "heart scale 2",
    scale: 1,
    duration: 500
  }, "<<");
  mainTimeline.label("MODULES_END");
}

export { assetManager, gltfLoader, dracoLoader, loadGeometry, loadGeometries, ModuleAssembly, appendModulesTimeline };
