import { FeatureDemo } from './demo.js';
import { utils, spring, animate, createTimer } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createCompositionDemo(staggerCanvas, enterEase, leaveEase) {
  let compositionDemo = new FeatureDemo();
  let additiveShapes = utils.$("#additive-demo .shape");
  let compositionEases = ["inOutQuad", "inOutSine", "inOutExpo", spring()];
  utils.set(additiveShapes, {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0
  });
  let compositionAnimations = [];
  let compositionCursor = 0;
  let scheduleComposition = (item20, index5, total7, total8) => {
    let value93 = utils.random(500, 2e3);
    let value94 = {
      id: `composition-${index5}-${total8}`,
      duration: value93,
      ease: utils.randomPick(compositionEases),
      composition: "none"
    };
    value94[index5] = total7;
    compositionAnimations[compositionCursor++] = animate(item20, value94);
    compositionAnimations[compositionCursor++] = createTimer({
      duration: value93 * .8,
      onComplete: () => scheduleComposition(item20, index5, total7, total8)
    });
    if (compositionCursor > 640) {
      compositionCursor = 0;
    }
  };
  compositionDemo.onEnter = () => {
    additiveShapes.forEach((item21, index6) => {
      scheduleComposition(item21, "x", () => utils.random(-90, 90), index6);
      scheduleComposition(item21, "y", () => utils.random(-90, 90), index6);
      scheduleComposition(item21, "rotate", () => utils.random(-90, 90), index6);
      scheduleComposition(item21, "scale", () => utils.random(.05, .4, 4), index6);
    });
  };
  compositionDemo.onLeave = () => {
    animate(additiveShapes, {
      id: "composition-leave",
      scale: 0,
      duration: 250,
      ease: leaveEase
    });
    compositionAnimations.forEach(item22 => item22.cancel());
    compositionAnimations.length = 0;
    compositionCursor = 0;
  };
  return compositionDemo;
}

export { createCompositionDemo };
