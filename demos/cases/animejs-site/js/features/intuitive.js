import { FeatureDemo } from './demo.js';
import { utils, animate } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createIntuitiveDemo(staggerCanvas, enterEase, leaveEase) {
  let intuitiveDemo = new FeatureDemo();
  let intuitiveSquares = utils.$("#intuitive-demo .square");
  utils.set(intuitiveSquares, {
    rotate: 0,
    scale: .001
  });
  let intuitiveRotate = animate(intuitiveSquares, {
    id: "intuitive-rotate",
    rotate: 90,
    loop: true,
    duration: 750,
    ease: "inOutExpo",
    autoplay: false
  });
  intuitiveDemo.onEnter = () => {
    animate(intuitiveSquares, {
      id: "intuitive-enter",
      scale: 1,
      ease: enterEase
    });
    intuitiveRotate.restart();
  };
  intuitiveDemo.onLeave = () => {
    animate(intuitiveSquares, {
      id: "intuitive-leave",
      scale: 0,
      duration: 250,
      ease: leaveEase
    });
    intuitiveRotate.pause();
  };
  return intuitiveDemo;
}

export { createIntuitiveDemo };
