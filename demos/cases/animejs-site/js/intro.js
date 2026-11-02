import { stagger, steps, utils } from '../vendor/animejs@4.5.0/dist/modules/index.js';

function appendIntroTimeline(mainTimeline, {
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
}) {
  mainTimeline.add(materials.outlineShaderMaterial, {
    id: "shader material outline color 2",
    outlineColor: materials.colors.outlineColor
  }, "INTRO+=1000");
  mainTimeline.add(materials.outlineShaderMaterial, {
    id: "shader material rim color",
    rimColor: materials.colors.rimColor,
    duration: 2500
  }, "INTRO+=500");
  mainTimeline.add(materials.outlineShaderMaterial, {
    id: "shader material shadow color",
    shadowColor: materials.colors.shadowColor,
    worldColor1: materials.colors.worldColor1,
    backgroundColor: materials.colors.backgroundColor,
    duration: 3e3
  }, "INTRO");
  mainTimeline.add(document.body, {
    id: "body background color",
    backgroundColor: materials.colors.backgroundColor,
    duration: 3e3
  }, "INTRO");
  mainTimeline.add(lights, {
    id: "lights x",
    x: {
      from: 100
    },
    duration: 3e3
  }, "INTRO");
  mainTimeline.add(".tick", {
    id: "tick opacity",
    opacity: [{
      from: 0,
      to: 1,
      duration: 10
    }, {
      to: (item47, index22, total12) => index22 !== total12 - 1 ? .4 : 0,
      duration: 1e3
    }],
    ease: "out(3)",
    delay: stagger([0, 500], {
      ease: "outIn(2)"
    })
  }, "INTRO");
  mainTimeline.add(".output-progress-bg path", {
    id: "bg path opacity",
    opacity: [0, 1, 0, 1, 0, 1],
    duration: 200,
    ease: steps(5),
    delay: stagger([0, 400], {
      modifier: item48 => utils.clamp(utils.random(-250, 250) + item48, 0, 800)
    })
  }, "<-=1000");
  mainTimeline.add(dottedGridCanvas.circles, {
    id: "grid circles opacity",
    opacity: {
      from: 0,
      to: stagger([.5, 0], {
        grid: gridSize,
        from: heartCenter,
        ease: "out(2)"
      })
    },
    scale: [{
      from: 0,
      to: 4
    }, {
      to: 1
    }],
    duration: 400,
    ease: "out(3)",
    delay: stagger(100, {
      from: "center",
      grid: gridSize
    }),
    onUpdate: () => {
      dottedGridCanvas.render();
    }
  }, "<-=500");
  mainTimeline.add(easingsDotsCanvas.circles, {
    id: "dots circles scale",
    scale: 1,
    composition: "none",
    ease: "inOutQuad",
    duration: 200,
    delay: stagger(14, {
      from: "center",
      ease: "outIn(1)"
    }),
    onUpdate: () => {
      easingsDotsCanvas.render();
    }
  }, "<<+=500");
  mainTimeline.call(() => headingAnimation.play(), "<");
  mainTimeline.call(() => headlineAnimation.play(), "INTRO_ON");
  mainTimeline.call(() => paragraphAnimation.play(), "INTRO_ON+=500");
  mainTimeline.add("#intro .section-text", {
    id: "intro text opacity 2",
    opacity: 1,
    duration: 100
  }, "INTRO_ON");
  mainTimeline.add(["#site-header", ".heading-links .ui-group", ".heading-sponsors"], {
    id: "site header opacity",
    opacity: 1,
    duration: 350
  }, "INTRO_ON+=500");
  mainTimeline.add(sceneRoot, {
    id: "scene z 2",
    z: matches.minM ? 58 : 92,
    duration: 1500
  }, "INTRO_ON-=500");
  mainTimeline.label("INTRO_END");
}

export { appendIntroTimeline };
