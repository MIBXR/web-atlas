import './settings.js';
import './nav.js';
import './sponsors.js';
import './footer.js';
import '../vendor/animejs@4.5.0/dist/modules/adapters/three/index.js';
import { utils, createScope, animate, stagger, createTimeline, svg, eases, steps, createTimer, splitText, createAnimatable, onScroll, createDraggable } from '../vendor/animejs@4.5.0/dist/modules/index.js';
import { mediaQueries } from './nav.js';
import { Stage, StageLights } from './stage.js';
import { SceneMaterials } from './materials.js';
import { ModuleAssembly, appendModulesTimeline } from './modules-scene.js';
import { Group } from 'three';
import { PostProcessing } from './post-processing.js';
import { CSS3DObject } from '../vendor/three@0.172.0/examples/jsm/renderers/CSS3DRenderer.js';
import { CopyButton } from './copy-button.js';
import highlight from '../vendor/highlight.js@11.11.1/es/core.min.js';
import javascript from '../vendor/highlight.js@11.11.1/es/languages/javascript.min.js';
import { ShapeCanvas } from './canvas.js';
import { createFeatureDemos } from './features/index.js';
import { appendIntroTimeline } from './intro.js';
import { appendToolboxTimeline } from './toolbox.js';
import { appendGetStartedTimeline } from './get-started.js';

var [pageEl] = utils.$(".page");
var [engineEl] = utils.$("#engine");
var learnMoreButtons = utils.$(".learn-more");
var scope = createScope({
  mediaQueries: mediaQueries
});
var stage = new Stage();
var materials = new SceneMaterials(stage);
var moduleAssembly = new ModuleAssembly(materials, scope, stage);
var assemblyRoot = moduleAssembly.root;
var cssRoot = new Group();
var sceneRoot = new Group();
var postProcessing = new PostProcessing(stage, materials);
var output3D = new CSS3DObject(stage.$output);
var [installCode] = utils.$(".npm-install code");
var learnMoreIcons = utils.$(".learn-more .icon");
var installCopyButton = new CopyButton(installCode.innerHTML);
installCode.appendChild(installCopyButton.$el);
pageEl.classList.add("is-ready");
var codeBlocks = utils.$(".sub-nav code");
for (let value100 = 0; value100 < codeBlocks.length; value100++) {
  let element2 = codeBlocks[value100];
  let copyButton = new CopyButton(element2.innerHTML);
  element2.parentElement.appendChild(copyButton.$el);
  highlight.highlightElement(element2);
  highlight.registerLanguage("javascript", javascript);
  if (element2.classList.contains("language-undefined")) {
    let value99 = highlight.highlight(element2.innerHTML, {
      language: "javascript"
    });
    element2.innerHTML = value99.value;
    element2.classList.remove("language-undefined");
    element2.classList.add("language-javascript");
  }
}
function scrollToToolbox() {
  animate(document.documentElement, {
    id: "scroll-page",
    scrollTop: window.innerHeight * 3,
    ease: "inOut(2)",
    duration: 2500
  });
}
learnMoreButtons.forEach(item33 => {
  item33.addEventListener("click", scrollToToolbox);
});
animate(learnMoreIcons, {
  id: "learn-more-icons",
  translateY: {
    to: "+=1.15em"
  },
  ease: "linear",
  opacity: {
    to: [(item34, index11) => index11 ? 1 : 0, (item35, index12) => index12 ? 0 : 1]
  },
  loop: true
});
var gridSize = [13, 13];
var heartCenter = 84;
var heartCanvas = new ShapeCanvas(stage.$output);
heartCanvas.$canvas.classList.add("heart-canvas");
heartCanvas.$canvas.classList.add("grid-canvas");
var dottedGridCanvas = new ShapeCanvas(stage.$output);
dottedGridCanvas.$canvas.classList.add("dotted-grid-canvas");
dottedGridCanvas.$canvas.classList.add("grid-canvas");
var staggerCanvas = new ShapeCanvas(utils.$("#staggering-demo")[0]);
var staggerColor = utils.get('[data-demo="staggering"]', "--hex-current-1");
staggerCanvas.$canvas.classList.add("staggering-canvas");
staggerCanvas.$canvas.classList.add("grid-canvas");
var gridWidth = dottedGridCanvas.width * .5;
var gridHeight = dottedGridCanvas.height * .5;
var gridSpacingX = gridWidth / (gridSize[0] - 1);
var gridSpacingY = gridHeight / (gridSize[1] - 1);
var gridOriginX = (dottedGridCanvas.width - gridWidth) / 2;
var gridOriginY = (dottedGridCanvas.height - gridHeight) / 2;
var dialColor = utils.get(document.body, "--hex-red-1");
for (let value102 = 0; value102 < gridSize[0]; value102++) {
  for (let value101 = 0; value101 < gridSize[1]; value101++) {
    dottedGridCanvas.addCircle(1, dialColor, {
      x: gridOriginX + value101 * gridSpacingX,
      y: gridOriginY + value102 * gridSpacingY
    });
    heartCanvas.addCircle(1, dialColor, {
      x: gridOriginX + value101 * gridSpacingX,
      y: gridOriginY + value102 * gridSpacingY
    });
    staggerCanvas.addCircle(1, staggerColor, {
      x: gridOriginX + value101 * gridSpacingX,
      y: gridOriginY + value102 * gridSpacingY
    });
  }
}
var easingsLinesCanvas = new ShapeCanvas(stage.$output);
easingsLinesCanvas.$canvas.classList.add("easings-lines-canvas");
easingsLinesCanvas.$canvas.classList.add("grid-canvas");
var easingsDotsCanvas = new ShapeCanvas(stage.$output);
easingsDotsCanvas.$canvas.classList.add("easings-dots-canvas");
easingsDotsCanvas.$canvas.classList.add("grid-canvas");
var lineOpacityStagger = stagger([.75, .1], {
  from: "center",
  ease: "in(1)"
});
var dotOpacityStagger = stagger([1, .75], {
  from: "center",
  ease: "in(1)"
});
var lineCount = 73;
var dotCount = 37;
var lineMargin = 30;
var linesVerticalMargin = 82;
var dotsHorizontalMargin = 80;
var dotsVerticalRange = 78;
for (let value103 = 0; value103 < lineCount; value103++) {
  easingsLinesCanvas.addLine(lineMargin, 0, easingsLinesCanvas.width - lineMargin, 0, 2, dialColor, {
    scaleX: 0
  });
}
utils.set(easingsLinesCanvas.lines, {
  id: "easings lines opacity",
  opacity: lineOpacityStagger,
  y: stagger([linesVerticalMargin, easingsLinesCanvas.height - linesVerticalMargin])
});
for (let value104 = 0; value104 < dotCount; value104++) {
  easingsDotsCanvas.addCircle(3, dialColor, {
    y: easingsDotsCanvas.height / 2
  });
}
utils.set(easingsDotsCanvas.circles, {
  id: "dots circles opacity",
  opacity: dotOpacityStagger,
  x: stagger([dotsHorizontalMargin, easingsDotsCanvas.width - dotsHorizontalMargin])
});
var heartMask = [0, 0, .1, .1, .1, 0, 0, 0, .1, .1, .1, 0, 0, 0, .1, .5, .6, .5, .2, .1, .2, .5, .6, .5, .1, 0, .1, .6, .8, .9, .9, .7, .5, .7, .9, .9, .8, .6, .1, .5, .9, 1, 1, 1, .9, .8, .9, 1, 1, 1, .9, .5, .8, .9, 1, 1, 1, 1, 1, 1, 1, 1, 1, .9, .8, .8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .8, .6, .9, 1, 1, 1, 1, 1, 1, 1, 1, 1, .9, .6, .4, .8, 1, 1, 1, 1, 1, 1, 1, 1, 1, .8, .4, .2, .6, .9, 1, 1, 1, 1, 1, 1, 1, .9, .6, .2, .1, .3, .6, .8, 1, 1, 1, 1, 1, .8, .6, .3, .1, 0, .1, .3, .5, .8, 1, 1, 1, .8, .5, .3, .1, 0, 0, 0, 0, .2, .4, .7, .9, .7, .4, .2, 0, 0, 0, 0, 0, 0, 0, .1, .2, .4, .2, .1, 0, 0, 0, 0];
heartMask.forEach((item36, index13) => {
  heartCanvas.circles[index13].scale = item36 > .1 ? item36 * 12 : 0;
});
utils.set(heartCanvas.circles, {
  id: "heart circles opacity",
  opacity: stagger([.8, .1], {
    grid: gridSize,
    from: heartCenter
  })
});
var heartAnimation = createTimeline({
  id: "heart",
  autoplay: false,
  onUpdate: () => {
    heartCanvas.render();
  }
}).add(heartCanvas.circles, {
  id: "heart circles scale",
  scale: [{
    from: 0
  }, {
    to: 0,
    duration: 800
  }],
  duration: 500,
  loop: true,
  loopDelay: 100,
  ease: "inOutQuad"
}, stagger(150, {
  grid: gridSize,
  from: heartCenter,
  ease: "in(4)"
})).init();
var clockEl = document.createElement("div");
clockEl.classList.add("clock");
stage.$output.appendChild(clockEl);
for (let value108 = 0; value108 < 193; value108++) {
  let value105 = document.createElement("div");
  value105.className = "tick";
  value105.dataset.index = "0";
  let value106 = 360 / 192 * value108;
  let value107 = value106 * Math.PI / 180;
  utils.set(value105, {
    id: "tick x",
    x: 178 * Math.sin(value107),
    y: -178 * Math.cos(value107),
    rotate: value106
  });
  clockEl.appendChild(value105);
}
var pinnedSections = utils.$(".section-container");
var progressPaths = utils.$(".output-progress path");
var progressBgPaths = utils.$(".output-progress-bg path");
var drawableProgress = svg.createDrawable(progressPaths);
var demoSections = utils.$(".feature-section-demo");
var demoElements = utils.$(".feature-demo");
var drawableConnectors = svg.createDrawable("#path-animation polyline");
var toolboxLabels = [".toolbox-labels-right li", ".toolbox-labels-left li"];
var chartBars = utils.$(".modules-sizes-chart .chart-bar");
var moduleLabelElements = utils.$(".module-label-text");
moduleLabelElements.forEach(element3 => {
  let [value110] = utils.$(".modules-sizes-chart .chart-bar." + element3.classList[1]);
  if (value110) {
    let value109 = value110.dataset.size;
    element3.innerHTML = '<div><span class="label-dot"></span><span class="size">' + value109 + "</span> KB</div>";
  }
});
var selectedChartBars = utils.$([".chart-bar.module-scope", ".chart-bar.module-animation", ".chart-bar.module-timer", ".chart-bar.module-stagger"]);
var [bundleSizeEl] = utils.$(".modules-bundle-size span");
var fullBundleSize = 0;
var minimalBundleSize = 0;
chartBars.forEach(item37 => fullBundleSize += +item37.dataset.size);
bundleSizeEl.innerHTML = utils.roundPad(fullBundleSize, 2);
chartBars.forEach(element4 => {
  let value111 = +element4.dataset.size;
  let value112 = value111 / fullBundleSize;
  element4.style.width = value112 * 100 + "%";
  selectedChartBars.forEach(item38 => {
    if (element4 === item38) {
      minimalBundleSize += value111;
    }
  });
});
var headingEases = [];
var inEases = [];
var outEases = [];
var inOutEases = [];
var outInEases = [];
var otherEases = [];
for (let value114 in eases) {
  let value113;
  value113 = value114;
  if (value114 !== "irregular" && value114 !== "cubicBezier" && value114 !== "linear") {
    if (value114.startsWith("inOut")) {
      inOutEases.push(value113);
    } else {
      if (value114.startsWith("outIn")) {
        outInEases.push(value113);
      } else {
        if (value114.startsWith("in")) {
          inEases.push(value113);
        } else {
          if (value114.startsWith("out")) {
            outEases.push(value113);
          } else {
            otherEases.push(value113);
          }
        }
      }
    }
  }
}
headingEases.push(outEases[2]);
headingEases.push(inOutEases[4]);
headingEases.push(steps(utils.random(3, 7, 0)));
var easeCount = Math.max(utils.shuffle(inEases).length, utils.shuffle(outEases).length, utils.shuffle(inOutEases).length, utils.shuffle(outInEases).length, utils.shuffle(otherEases).length);
for (let value115 = 0; value115 < easeCount; value115++) {
  if (value115 < inEases.length) {
    headingEases.push(inEases[value115]);
  }
  if (value115 < outEases.length) {
    headingEases.push(outEases[value115]);
  }
  if (value115 < inOutEases.length) {
    headingEases.push(inOutEases[value115]);
  }
  if (value115 < outInEases.length) {
    headingEases.push(outInEases[value115]);
  }
  if (value115 < otherEases.length) {
    headingEases.push(otherEases[value115]);
  }
}
var easedStagger = (item40, index15, total10, total11) => (item39, index14, total9) => stagger(item40, {
  ease: index15,
  from: total10,
  reversed: total11
})(item39, index14, total9);
var headingAnimation = createTimeline({
  id: "heading-animation",
  loop: true,
  autoplay: false,
  onUpdate: () => {
    easingsLinesCanvas.render();
    easingsDotsCanvas.render();
  },
  defaults: {
    duration: 500
  }
});
for (let value117 = 0; value117 < headingEases.length; value117++) {
  let value116 = headingEases[value117];
  headingAnimation.add(easingsLinesCanvas.lines, {
    id: "easings lines scale x",
    scaleX: easedStagger([.01, .75], value116, "center", true),
    delay: stagger(10, {
      from: "center"
    }),
    ease: value116
  }).add(moduleAssembly.easesObjects, {
    id: "engine eases y",
    y: easedStagger([0, .08], value116, "center", true),
    delay: stagger(20, {
      from: "center"
    }),
    ease: value116
  }, "<<").add(easingsDotsCanvas.circles, {
    id: "dots circles y",
    y: easedStagger([easingsDotsCanvas.height * .5 - dotsVerticalRange, easingsDotsCanvas.height * .5 + dotsVerticalRange], value116, "last", false),
    delay: stagger(20, {
      from: "center"
    }),
    ease: value116
  }, "<<");
}
headingAnimation.add(easingsLinesCanvas.lines, {
  id: "easings lines scale x 2",
  scaleX: 0,
  delay: stagger(10, {
    from: "center"
  })
}).add(moduleAssembly.easesObjects, {
  id: "engine eases y 2",
  y: 0,
  delay: stagger(20, {
    from: "center"
  })
}, "<<").add(easingsDotsCanvas.circles, {
  id: "dots circles y 2",
  y: easingsDotsCanvas.height * .5,
  delay: stagger(20, {
    from: "center"
  })
}, "<<");
output3D.scale.setScalar(.5);
utils.set(assemblyRoot, {
  id: "engine scale",
  scale: 10
});
utils.set(cssRoot, {
  id: "css scale",
  scale: .1
});
cssRoot.add(output3D);
sceneRoot.add(assemblyRoot);
sceneRoot.add(cssRoot);
stage.scene.add(sceneRoot);
stage.camera.lookAt(stage.scene.position);
var lights = new StageLights(stage);
sceneRoot.add(lights.ambientLight);
sceneRoot.add(lights.directionalLight);
scope.add(({
  matches: matches
}) => {
  if (matches.minM) {
    lights.x = -200;
    lights.y = 135;
    lights.z = -80;
  } else {
    lights.x = -200;
    lights.y = 135;
    lights.z = -110;
  }
});
function renderFrame() {
  stage.renderer.info.reset();
  postProcessing.render();
  stage.CSSRenderer.render(stage.scene, stage.camera);
}
var renderLoop = createTimer({
  id: "render-loop",
  frameRate: 60,
  autoplay: false,
  onUpdate: renderFrame
});
function resizeScene() {
  stage.updateDimensions();
  materials.updateDimensions();
  postProcessing.updateDimensions();
  if (renderLoop.paused) {
    renderLoop.seek(renderLoop.currentTime);
  }
}
var resizeTimer = createTimer({
  id: "resize-timer",
  duration: 250,
  autoplay: false,
  onComplete: resizeScene
});
var hasInitialSize = false;
var resizeObserver = new ResizeObserver(() => {
  if (hasInitialSize) {
    resizeTimer.restart();
  }
  hasInitialSize = true;
});
resizeObserver.observe(engineEl);
renderLoop.play();
var featureSections = utils.$("#features-gallery .feature-section");
featureSections.forEach((element5, index16) => {
  let value118 = element5.classList[element5.classList.length - 1];
  progressPaths[index16].classList.add(value118);
  progressBgPaths[index16].classList.add(value118);
  demoElements[index16].classList.add(value118);
  demoSections[index16].classList.add(value118);
});
var featureText = utils.$("#features-gallery .section-text");
var featureHeadings = utils.$("#features-gallery .section-text-heading");
var featureDemos = createFeatureDemos(staggerCanvas);
var featuresTimeline = createTimeline({
  id: "features",
  defaults: {
    composition: "none"
  },
  autoplay: false
});
var setDialColor = item41 => {
  animate(".tick", {
    id: "tick-color",
    color: item41,
    duration: 250,
    ease: "out(3)",
    composition: "none"
  });
  animate(dottedGridCanvas.circles, {
    id: "dotted-grid-color",
    color: item41,
    duration: 250,
    ease: "out(3)",
    delay: stagger(15, {
      from: "center",
      grid: gridSize
    }),
    onUpdate: () => dottedGridCanvas.render(),
    composition: "none"
  });
};
scope.add("toggleText", (item42, index17) => {
  if (!scope.matches.minM) {
    animate(featureText[item42], {
      id: "toggle-text-" + item42,
      opacity: index17 ? .001 : 1,
      duration: 250,
      ease: "inOut(3)"
    });
  }
});
featureSections.forEach((element6, index18) => {
  let value123 = demoElements[index18];
  let value124 = demoSections[index18];
  let value125 = featureDemos[element6.dataset.demo];
  let element7 = featureHeadings[index18];
  let value126 = element7.querySelector("p");
  let value127 = element7.querySelector("h2");
  let element8 = element6.querySelector("ul");
  let value128 = index18 === featureSections.length - 1;
  utils.set(element8, {
    id: "text ul opacity",
    opacity: .001
  });
  utils.set([value126, value127], {
    id: "text p opacity",
    opacity: .5
  });
  featuresTimeline.call(playback => {
    let value119 = playback.backwards;
    if (value123) {
      if (value125) {
        if (value119) {
          value125.onLeave();
        } else {
          value125.onEnter();
        }
      }
      animate([value123, value124], {
        id: "feature-enter-demo-" + index18,
        opacity: value119 ? .001 : 1,
        duration: 250,
        ease: "inOut(3)"
      });
      animate([value126, value127], {
        id: "feature-enter-text-" + index18,
        opacity: value119 ? .5 : 1,
        duration: 250,
        ease: "out(3)"
      });
      if (scope.matches.minM) {
        if (value119) {
          animate(element8, {
            id: "feature-hide-ul-" + index18,
            opacity: .001,
            duration: 250,
            delay: .001,
            ease: "out(3)"
          });
        } else {
          animate(element8, {
            id: "feature-show-ul-" + index18,
            opacity: 1,
            "--scaleX": {
              to: [0, 1],
              duration: 300,
              ease: "inOut(2.4)"
            },
            duration: 350,
            ease: "inOut(3)"
          });
          animate(element8.querySelectorAll("li"), {
            id: "feature-show-li-" + index18,
            opacity: [.001, 1],
            duration: 250,
            delay: stagger(100, {
              start: 350
            }),
            ease: "inOut(3)"
          });
          animate(element8.querySelectorAll("li .icon"), {
            id: "feature-show-icon-" + index18,
            translateX: ["-.25rem", 0],
            duration: 250,
            delay: stagger(100, {
              start: 350
            }),
            ease: "inOut(3)",
            onComplete: utils.cleanInlineStyles
          });
        }
      } else {
        scope.methods.toggleText(index18, value119);
      }
    }
    element6.classList.toggle("is-in-view", !value119);
    let value120 = utils.get(element6, "--hex-current-1");
    setDialColor(value120);
  }).add(drawableProgress[index18], {
    id: "progress bars draw",
    draw: "0 1",
    ease: "linear"
  }, index18 ? "<" : 0).add([drawableProgress[index18], progressBgPaths[index18]], {
    id: "progress bars stroke width",
    strokeWidth: [5, 10],
    ease: "outQuart",
    duration: 50
  }, "<<");
  if (index18) {
    featuresTimeline.add([drawableProgress[index18 - 1], progressBgPaths[index18 - 1]], {
      id: "progress bars stroke width 2",
      strokeWidth: [10, 5],
      ease: "outQuart",
      duration: 50
    }, "<<");
  }
  if (value125 && value125.syncable) {
    featuresTimeline.add(value125.syncable, {
      id: "demo syncable progress",
      progress: 1,
      ease: "linear"
    }, "<<");
  }
  if (value128) {
    featuresTimeline.add([drawableProgress[drawableProgress.length - 1], progressBgPaths[drawableProgress.length - 1]], {
      id: "progress bars stroke width 3",
      strokeWidth: [10, 5],
      ease: "outQuart",
      duration: 50
    });
  }
  featuresTimeline.call(playback2 => {
    let value121 = playback2.backwards;
    if (value123) {
      if (value125) {
        if (value121) {
          value125.onEnter();
        } else {
          value125.onLeave();
        }
      }
      animate([value123, value124], {
        id: "feature-leave-demo-" + index18,
        opacity: value121 ? 1 : .001,
        duration: 250,
        ease: "inOut(3)"
      });
      animate([value126, value127], {
        id: "feature-leave-text-" + index18,
        opacity: value121 ? 1 : .5,
        duration: 250,
        ease: "out(3)"
      });
      if (scope.matches.minM) {
        animate([element8], {
          id: "feature-leave-ul-" + index18,
          opacity: value121 ? 1 : .001,
          duration: 250,
          delay: value121 ? .001 : 150,
          ease: "out(3)"
        });
      } else {
        scope.methods.toggleText(index18, !value121);
      }
    }
    element6.classList.toggle("is-in-view", value121);
    let value122 = value128 && !value121 ? utils.get(element6, "--hex-red-1") : utils.get(element6, "--hex-current-1");
    setDialColor(value122);
  }, "-=1");
});
featuresTimeline.init();
function createTextAppearance(selector, splitChars = false) {
  let split = splitText(selector, {
    words: {
      class: "word"
    },
    chars: splitChars && {
      class: "char"
    }
  });
  return createTimeline({
    id: "text-appear-" + selector,
    autoplay: false
  }).add(splitChars ? split.chars : split.words, {
    x: [".35em", 0],
    opacity: [0, 1],
    duration: 1e3,
    delay: stagger(25, {
      ease: "outIn(2)"
    }),
    ease: "outQuint"
  }).init();
}
var sectionsByLabel = utils.$("[data-label]");
var headlineAnimation = createTextAppearance("#intro h2", true);
var paragraphAnimation = createTextAppearance("#intro p");
var chapters = utils.$("[data-chapter]");
var [scrollBar] = utils.$(".scroll-bar");
var ghostCursor = createAnimatable(".scroll-cursor-ghost", {
  x: 150,
  scale: 250,
  opacity: 150
});
var anythingWords = ["HTML", "WebGL", "CSS", "Canvas 2D", "SVG", "anything"];
var anythingIndex = 0;
var scrambleAnimation = null;
var currentSplit = null;
function splitAnything(element, text) {
  if (currentSplit) {
    currentSplit.revert();
  }
  if (text !== undefined) {
    element.innerHTML = text;
  }
  currentSplit = splitText(element, {
    words: {
      class: "word"
    },
    chars: {
      class: "char"
    }
  });
  return currentSplit;
}
var animateAnything = () => {
  let [anythingEl] = utils.$(".animate-anything");
  let chars = splitAnything(anythingEl).chars;
  scrambleAnimation = createTimeline({
    id: "scramble-out",
    delay: 1e3,
    onComplete: () => {
      let [element9] = utils.$(".animate-anything");
      splitAnything(element9, anythingWords[anythingIndex++]);
      if (anythingIndex > anythingWords.length - 1) {
        anythingIndex = 0;
      }
      scrambleAnimation = createTimeline({
        id: "scramble-in",
        onComplete: () => {
          animateAnything();
        }
      }).add(currentSplit.chars, {
        id: "anything char opacity",
        opacity: [0, 1],
        scaleX: [0, 1],
        x: [10, 0],
        duration: 150,
        delay: stagger(25, {
          from: "first",
          ease: "in(3)",
          start: 100
        })
      }, 0).add(".animate-anything-dot", {
        id: "anything dot x",
        x: [-element9.offsetWidth, 0],
        scaleX: [8, 1],
        transformOrigin: ["0% 0%", "0% 0%"],
        color: item43 => utils.get(item43, "--hex-fg-2"),
        duration: chars.length * 25 + 75,
        ease: "out(3)"
      }, 0).add({
        id: "gap",
        duration: 750
      }).init();
    }
  }).add(chars, {
    id: "chars opacity",
    opacity: 0,
    scaleX: 0,
    duration: 100,
    delay: stagger(25, {
      from: "last",
      ease: "in(3)"
    })
  }, 0).add(".animate-anything-dot", {
    id: "anything dot x 2",
    x: -anythingEl.offsetWidth,
    transformOrigin: ["100% 0%", "100% 0%"],
    scaleX: [4, 1],
    duration: chars.length * 25 + 100,
    color: item44 => utils.get(item44, "--hex-red-1"),
    delay: 50,
    ease: "out(3)"
  }, 0);
};
paragraphAnimation.onComplete = animateAnything;
headlineAnimation.add("#intro .section-text h2 .red-dot", {
  id: "red dot x",
  x: [".25em", "0em"],
  opacity: [0, 1],
  color: {
    from: "#FFF"
  },
  duration: 300,
  ease: "inOut(3)"
}, 550).add("#intro .section-text h2 .red-dot", {
  id: "red dot color",
  color: item45 => utils.get(item45, "--hex-fg-1"),
  duration: 1500
}, "<+=500").init();
var getPointerProgress = event => {
  let value129 = scrollBar.getBoundingClientRect();
  let value130 = event.clientX - value129.left;
  return utils.snap(1 / 65).round(4).clamp(0, 1)(value130 / value129.width);
};
scope.add("showCard", (element10, index19) => {
  if (!(element10.querySelector("code") && !scope.matches.minM)) {
    animate(element10, {
      id: "show-card-" + index19,
      y: 0,
      opacity: 1,
      ease: "inOut(3)",
      duration: 350
    });
  }
});
scope.add("hideCard", (element11, index20) => {
  if (!(element11.querySelector("code") && !scope.matches.minM)) {
    animate(element11, {
      id: "hide-card-" + index20,
      y: "120%",
      opacity: 0,
      ease: "inOut(3)",
      duration: 250
    });
  }
});
chapters.forEach((item46, index21) => {
  let element12 = document.createElement("a");
  element12.setAttribute("href", "#" + item46.getAttribute("id"));
  let value133 = document.querySelector(`[data-card="${item46.dataset.chapter}"]`);
  element12.classList.add("scroll-button");
  element12.dataset.index = index21 + "";
  scrollBar.appendChild(element12);
  if (value133) {
    let value131 = value133.getAttribute("data-enter-offset") || "";
    let value132 = value133.getAttribute("data-leave-offset") || "";
    utils.set(value133, {
      id: "card y",
      y: "120%",
      opacity: 0
    });
    onScroll({
      target: item46,
      enter: "top top" + value131,
      leave: "top bottom" + value132,
      onEnter: () => {
        scope.methods.showCard(value133, index21);
      },
      onLeave: () => {
        scope.methods.hideCard(value133, index21);
      }
    });
  }
});
var chapterButtons = utils.$(".scroll-button");
scope.add(({
  matches: matches,
  data: data
}) => {
  stage.camera.position.z = matches.minM ? 120 : 180;
  utils.set(sceneRoot, {
    id: "scene z",
    z: matches.minM ? 52 : 90,
    rotateX: 0,
    rotateY: 0
  });
  utils.set(cssRoot, {
    id: "css z",
    z: 25
  });
  utils.set(assemblyRoot, {
    id: "engine z",
    z: -5
  });
  utils.set([".clock", easingsLinesCanvas.$canvas, easingsDotsCanvas.$canvas], {
    id: "clock z",
    z: stagger(15)
  });
  utils.set([heartCanvas.$canvas, easingsDotsCanvas.circles, dottedGridCanvas.circles], {
    id: "heart scale",
    scale: .001
  });
  utils.set([".output-progress-bg", ".clock"], {
    id: "progress bg opacity",
    opacity: 1
  });
  utils.set([moduleAssembly.caseBackVentObjects, moduleAssembly.caseFrontVentObjects], {
    id: "back vent rotate z",
    rotateZ: 0,
    opacity: 1
  });
  utils.set(["#intro .section-text", "#site-header", ".heading-links .ui-group", ".heading-sponsors"], {
    id: "intro text opacity",
    opacity: .001
  });
  headingAnimation.pause().seek(0);
  headlineAnimation.pause().seek(0);
  paragraphAnimation.pause().seek(0);
  heartCanvas.render();
  easingsDotsCanvas.render();
  easingsLinesCanvas.render();
  dottedGridCanvas.render();
  if (scrambleAnimation) {
    scrambleAnimation.cancel();
  }
  let mainTimeline = createTimeline({
    id: "main-timeline",
    autoplay: false,
    defaults: {
      ease: "inOut(3)"
    }
  }).label("INTRO").label("INTRO_ON", 1400);
  utils.set(materials.outlineShaderMaterial, {
    id: "shader material outline color",
    outlineColor: "#000",
    rimColor: "#000",
    shadowColor: "#000",
    worldColor1: "#000",
    backgroundColor: "#000"
  });
  appendIntroTimeline(mainTimeline, {
    materials,
    lights,
    dottedGridCanvas,
    gridSize,
    heartCenter,
    easingsDotsCanvas,
    headingAnimation,
    headlineAnimation,
    paragraphAnimation,
    sceneRoot,
    matches
  });
  appendToolboxTimeline(mainTimeline, {
    sceneRoot,
    matches,
    easingsDotsCanvas,
    easingsLinesCanvas,
    headingAnimation,
    moduleAssembly,
    cssRoot,
    toolboxLabels,
    drawableConnectors,
    stage
  });
  appendModulesTimeline(mainTimeline, {
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
  });
  appendGetStartedTimeline(mainTimeline, {
    sceneRoot,
    matches,
    cssRoot
  });
  let timelineProxy = {
    currentTime: 0,
    progress: 0
  };
  let progressConverter = createTimeline({
    id: "progress-converter",
    autoplay: false,
    defaults: {
      ease: "linear"
    }
  });
  let introAnimation = animate(timelineProxy, {
    id: "intro-animation",
    currentTime: [mainTimeline.labels.INTRO, mainTimeline.labels.INTRO_END],
    composition: "none",
    ease: "linear",
    duration: 4e3,
    onUpdate: () => {
      mainTimeline.seek(timelineProxy.currentTime);
    }
  });
  let cursorTimeline = createTimeline({
    id: "cursor-timeline",
    autoplay: false,
    defaults: {
      ease: "linear"
    }
  });
  let setPageProgress = item56 => {
    progressConverter.progress = item56;
    document.scrollingElement.scrollTop = (document.body.scrollHeight - window.innerHeight) * timelineProxy.progress;
  };
  let handleScrollBarClick = event2 => {
    let element13 = event2.target;
    if (element13 && !element13.classList.contains("scroll-cursor")) {
      setPageProgress(getPointerProgress(event2));
    }
  };
  let hideGhost = () => {
    ghostCursor.opacity(0);
    ghostCursor.scale(0);
  };
  let showGhost = () => {
    ghostCursor.opacity(1);
    ghostCursor.scale(1);
  };
  let subNavHidden = true;
  let showSubNav = () => {
    if (subNavHidden) {
      utils.set(".sub-nav", {
        id: "sub nav pointer events",
        pointerEvents: "auto"
      });
      subNavHidden = false;
      createTimeline({
        id: "show-sub-nav"
      }).add(".home-progress-card", {
        id: "progress card opacity",
        opacity: 1,
        y: ["100%", 0],
        duration: 250
      }).add(".home-progress-card .scroll-button", {
        id: "scroll button opacity",
        opacity: [0, .5],
        duration: 250,
        delay: stagger(20)
      }).add(".home-progress-card .scroll-cursor:not(.scroll-cursor-ghost)", {
        id: "not ghost opacity",
        opacity: [0, 1],
        scale: [0, 1.2, 1],
        duration: 250,
        delay: stagger(50)
      }, "<<+=250").init();
    }
  };
  let hideSubNav = () => {
    if (!subNavHidden) {
      utils.set(".sub-nav", {
        id: "sub nav pointer events 2",
        pointerEvents: "none"
      });
      subNavHidden = true;
      createTimeline({
        id: "hide-sub-nav"
      }).add(".home-progress-card", {
        id: "progress card opacity 2",
        opacity: 0,
        y: "100%",
        duration: 250
      }).init();
    }
  };
  utils.set(".scroll-cursor", {
    id: "scroll cursor x",
    x: 0,
    scale: 1
  });
  let enlargeCursor = () => {
    animate(".scroll-cursor", {
      id: "grab-cursor",
      scale: 1.25,
      duration: 250
    });
  };
  let resetCursor = () => {
    animate(".scroll-cursor", {
      id: "release-cursor",
      scale: 1,
      duration: 150
    });
  };
  let cursorDraggable = createDraggable(".scroll-cursor", {
    y: false,
    container: ".scroll-bar",
    containerFriction: 1,
    containerPadding: [0, -1, 0, -1],
    onGrab: () => {
      enlargeCursor();
      hideGhost();
    },
    onRelease: draggable => {
      resetCursor();
      if (draggable.progressX < .02 || draggable.progressX > .98) {
        hideSubNav();
      } else {
        showSubNav();
      }
    },
    onUpdate: draggable2 => {
      if (draggable2.grabbed) {
        setPageProgress(draggable2.progressX);
      }
    }
  });
  let handleScrollBarMove = event3 => {
    let element14 = event3.target;
    if (element14 && !element14.classList.contains("scroll-cursor") && !cursorDraggable.grabbed) {
      ghostCursor.x(getPointerProgress(event3) * scrollBar.offsetWidth - 2);
      showGhost();
    } else {
      hideGhost();
    }
  };
  cursorDraggable.progressX = 0;
  let scrollTimeline = createTimeline({
    id: "tl-scroller",
    defaults: {
      ease: "linear"
    },
    onBegin: () => {
      if (!introAnimation.completed) {
        introAnimation.pause();
      }
    },
    autoplay: onScroll({
      target: document.body,
      sync: .9,
      enter: "max",
      leave: "min",
      onUpdate: ({
        progress: item57
      }) => {
        mainTimeline.seek(timelineProxy.currentTime);
        if (!cursorDraggable.grabbed) {
          cursorTimeline.progress = item57;
          if (item57 < .02 || item57 > .98) {
            hideSubNav();
          } else {
            showSubNav();
          }
        }
      }
    })
  });
  let totalChapterHeight = chapters.reduce((item58, element15) => item58 + element15.offsetHeight, 0);
  let chapterHeightSum = 0;
  let processedChapterHeight = 0;
  chapters.forEach((element16, index26) => {
    cursorTimeline.add(cursorDraggable, {
      id: "cursor draggable progress x",
      progressX: 1 / chapters.length * (index26 + 1),
      duration: +element16.offsetHeight
    });
    processedChapterHeight += element16.offsetHeight;
    chapterHeightSum += element16.offsetHeight;
    let value134 = chapterHeightSum / totalChapterHeight;
    progressConverter.add(timelineProxy, {
      id: "tlproxy progress",
      progress: value134,
      duration: 1e4 / chapters.length
    });
    setPageProgress(timelineProxy.progress);
  });
  processedChapterHeight = 0;
  sectionsByLabel.forEach((element17, index27) => {
    let value135 = element17.getAttribute("data-label");
    scrollTimeline.add(timelineProxy, {
      id: "tlproxy current time",
      composition: "none",
      currentTime: [mainTimeline.labels[value135], mainTimeline.labels[value135 + "_END"]],
      duration: element17.offsetHeight
    }, processedChapterHeight);
    processedChapterHeight += element17.offsetHeight;
  });
  scrollBar.addEventListener("click", handleScrollBarClick);
  scrollBar.addEventListener("mousemove", handleScrollBarMove);
  scrollBar.addEventListener("mouseenter", showGhost);
  scrollBar.addEventListener("mouseleave", hideGhost);
  cursorDraggable.$target.addEventListener("mouseenter", enlargeCursor);
  cursorDraggable.$target.addEventListener("mouseleave", resetCursor);
  return () => {
    scrollBar.removeEventListener("click", handleScrollBarClick);
    scrollBar.removeEventListener("mousemove", handleScrollBarMove);
    scrollBar.removeEventListener("mouseenter", showGhost);
    scrollBar.removeEventListener("mouseleave", hideGhost);
    cursorDraggable.$target.removeEventListener("mouseenter", enlargeCursor);
    cursorDraggable.$target.removeEventListener("mouseleave", resetCursor);
  };
});
onScroll({
  target: "#features-gallery",
  container: document.body,
  sync: .9,
  enter: () => "top top-=1",
  leave: () => "bottom bottom+=100lvh"
}).link(featuresTimeline);
pinnedSections.forEach((element18, index28) => {
  let value138 = element18.classList.contains("section-light");
  let value139 = element18.getAttribute("data-enter-offset") || "";
  let value140 = element18.getAttribute("data-leave-offset") || "";
  let value141 = element18.querySelector(".fixed-section");
  let value142 = 250;
  let value143 = "inOutQuad";
  onScroll({
    target: element18,
    container: document.body,
    enter: "top top" + value139,
    leave: "bottom bottom" + value140,
    onUpdate: () => {
      if (value138) {
        stage.labelsRenderer.render(stage.scene, stage.camera);
        stage.lines.update();
      }
    },
    onEnter: () => {
      let value136 = value141 || null;
      if (value136) {
        utils.set(value136, {
          id: "to hide pointer events",
          pointerEvents: "auto"
        });
        animate(value136, {
          id: "show-fixed-section",
          opacity: 1,
          duration: 350,
          ease: "linear"
        });
      }
      if (value138) {
        document.body.classList.add("is-light");
        createTimeline({
          id: "to-light-theme",
          defaults: {
            duration: value142,
            ease: value143
          }
        }).add(document.body, {
          id: "body background color 2",
          backgroundColor: materials.colors.worldColorLight1
        }, 0).add(materials.outlineShaderMaterial, {
          id: "shader material outline blend",
          outlineBlend: .35,
          contourBlend: .35,
          rimColor: materials.colors.worldColorLight1,
          worldColor1: materials.colors.worldColorLight1,
          shadowColor: materials.colors.worldColorLight1,
          backgroundColor: materials.colors.worldColorLight1,
          outlineColor: materials.colors.outlineColorLight
        }, 0);
      }
    },
    onLeave: () => {
      let value137 = value141 || null;
      if (value137) {
        utils.set(value137, {
          id: "to hide pointer events 2",
          pointerEvents: "none"
        });
        animate(value137, {
          id: "hide-fixed-section",
          opacity: .001,
          duration: 350,
          ease: "linear"
        });
      }
      if (value138) {
        document.body.classList.remove("is-light");
        createTimeline({
          id: "to-dark-theme",
          defaults: {
            duration: value142,
            ease: value143
          }
        }).add(document.body, {
          id: "body background color 3",
          backgroundColor: materials.colors.backgroundColor
        }, 0).add(materials.outlineShaderMaterial, {
          id: "shader material outline blend 2",
          outlineBlend: .4,
          contourBlend: .65,
          rimColor: materials.colors.rimColor,
          shadowColor: materials.colors.shadowColor,
          worldColor1: materials.colors.worldColor1,
          backgroundColor: materials.colors.backgroundColor,
          outlineColor: materials.colors.outlineColor
        }, 0);
      }
    }
  });
});
/*! Bundled license information:

postprocessing/build/index.js:
  (**
   * postprocessing v6.36.6 build Tue Dec 31 2024
   * https://github.com/pmndrs/postprocessing
   * Copyright 2015-2024 Raoul van Rüschen
   * @license Zlib
   *)
*/
