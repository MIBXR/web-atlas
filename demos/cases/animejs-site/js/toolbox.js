import { stagger } from '../vendor/animejs@4.5.0/dist/modules/index.js';

function appendToolboxTimeline(mainTimeline, {
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
}) {
  mainTimeline.label("HEADING");
  mainTimeline.label("HEADING_CASE", "HEADING+=250");
  mainTimeline.add(sceneRoot, {
    id: "scene z 3",
    z: {
      to: matches.minM ? 15 : -50,
      ease: "out(3)"
    },
    rotateX: {
      to: 90,
      ease: "out(3)"
    },
    rotateY: {
      to: -135,
      ease: "inOut(2)"
    }
  }, "HEADING");
  mainTimeline.add(".heading-links", {
    id: "heading links y",
    y: 200,
    opacity: {
      to: 0,
      duration: 150,
      delay: 150
    },
    ease: "linear",
    duration: 250
  }, "HEADING");
  mainTimeline.add([easingsDotsCanvas.$canvas, easingsLinesCanvas.$canvas], {
    id: "easings dots scale",
    scale: .001,
    duration: 150
  }, "HEADING+=250");
  mainTimeline.add([".output-progress-bg", ".clock"], {
    id: "progress bg opacity 2",
    opacity: [1, .001],
    duration: 50
  }, "<<");
  mainTimeline.call(({
    backwards: item49
  }) => headingAnimation[item49 ? "play" : "pause"](), "<");
  mainTimeline.add(moduleAssembly.case01Objects, {
    id: "engine case01 rotate z",
    rotateZ: [180, 0],
    duration: 300,
    ease: "inOut(3)"
  }, "HEADING+=100");
  mainTimeline.add(moduleAssembly.modulesObjects.renderer, {
    id: "modules renderer rotate z",
    rotateZ: -360,
    duration: 300
  }, "HEADING+=100");
  mainTimeline.add(moduleAssembly.case02BackObjects[0], {
    id: "case02 back x",
    x: -8,
    y: 8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=100");
  mainTimeline.add(moduleAssembly.case02BackObjects[1], {
    id: "case02 back x 2",
    x: 8,
    y: -8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=100");
  mainTimeline.add(moduleAssembly.case02BackObjects[2], {
    id: "case02 back x 3",
    x: -8,
    y: -8,
    scale: {
      to: 0,
      duration: 50
    },
    duration: 300
  }, "HEADING_CASE+=100");
  mainTimeline.add(moduleAssembly.case02FrontObjects[0], {
    id: "case02 front x",
    x: -8,
    y: 8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=0");
  mainTimeline.add(moduleAssembly.case02FrontObjects[1], {
    id: "case02 front x 2",
    x: 8,
    y: -8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=0");
  mainTimeline.add(moduleAssembly.case02FrontObjects[2], {
    id: "case02 front x 3",
    x: -8,
    y: -8,
    scale: {
      to: 0,
      duration: 50
    },
    duration: 300
  }, "HEADING_CASE+=0");
  mainTimeline.add(moduleAssembly.case01Objects[0], {
    id: "engine case01 x",
    x: -8,
    y: 8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=50");
  mainTimeline.add(moduleAssembly.case01Objects[2], {
    id: "engine case01 x 2",
    x: 8,
    y: -8,
    scale: 0,
    duration: 300
  }, "HEADING_CASE+=50");
  mainTimeline.add(moduleAssembly.case01Objects[3], {
    id: "engine case01 x 3",
    x: -8,
    y: -8,
    scale: {
      to: 0,
      duration: 50
    },
    duration: 300
  }, "HEADING_CASE+=50");
  mainTimeline.add(moduleAssembly.modulesObjects.renderer, {
    id: "modules renderer z",
    z: 3.25,
    duration: 300
  }, "HEADING_CASE");
  mainTimeline.add(moduleAssembly.modulesObjects.waapi, {
    id: "modules waapi z",
    z: 2.75,
    duration: 300
  }, "HEADING_CASE+=50");
  mainTimeline.add(cssRoot, {
    id: "css z 2",
    z: 30,
    duration: 300
  }, "HEADING_CASE");
  mainTimeline.add(moduleAssembly.modulesObjects.scope, {
    id: "modules scope z",
    z: -2.4,
    duration: 300
  }, "HEADING_CASE+=50");
  mainTimeline.add([moduleAssembly.caseBackVentObjects, moduleAssembly.caseFrontVentObjects], {
    id: "back vent rotate z 2",
    rotateZ: -200,
    duration: 300,
    opacity: {
      to: 0,
      duration: 0,
      delay: stagger(2, {
        from: "last",
        start: 175
      })
    },
    delay: stagger(2, {
      from: "last"
    })
  }, "HEADING_CASE+=50");
  mainTimeline.add(toolboxLabels, {
    id: "boxlabels selector opacity",
    opacity: [0, 1],
    duration: 250,
    ease: "out(3)",
    delay: stagger(10, {
      from: "last"
    })
  }, "HEADING+=700");
  mainTimeline.add(drawableConnectors, {
    id: "label lines draw",
    draw: ["0 0", "0 1"],
    duration: 250,
    ease: "out(3)",
    delay: stagger(10, {
      from: "last"
    })
  }, "<<+=50");
  mainTimeline.call(({
    backwards: item50
  }) => {
    if (!item50) {
      stage.lines.updateDimensions();
    }
  }, "<<");
  mainTimeline.label("HEADING_END");
  mainTimeline.label("TOOLBOX");
  mainTimeline.add(sceneRoot, {
    id: "scene z 4",
    z: {
      to: matches.minM ? 55 : 92,
      ease: "inOut(3)"
    },
    rotateX: {
      to: 0,
      ease: "inOut(2)"
    },
    rotateY: {
      to: -360,
      ease: "inOut(2)"
    }
  }, "TOOLBOX");
  mainTimeline.add(drawableConnectors, {
    id: "label lines draw 2",
    draw: ["0 1", "0 0"],
    duration: 250,
    ease: "out(3)",
    delay: stagger(10)
  }, "TOOLBOX+=200");
  mainTimeline.add(toolboxLabels, {
    id: "boxlabels selector opacity 2",
    opacity: [1, 0],
    duration: 250,
    ease: "inOut(3)",
    delay: stagger(10)
  }, "<<+=50");
  mainTimeline.call(({
    backwards: item51
  }) => {
    if (item51) {
      stage.lines.updateDimensions();
    }
  }, "<<");
  mainTimeline.add([".output-progress-bg"], {
    id: "progress bg opacity 3",
    opacity: .2,
    duration: 50
  }, "<+=400");
  mainTimeline.add([".clock", "#features-gallery"], {
    id: "clock opacity",
    opacity: 1,
    duration: 50
  }, "<<");
  mainTimeline.label("TOOLBOX_END");
  mainTimeline.label("FEATURES");
  mainTimeline.label("FEATURES_END");
}

export { appendToolboxTimeline };
