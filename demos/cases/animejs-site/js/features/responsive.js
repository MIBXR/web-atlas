import { FeatureDemo } from './demo.js';
import { createTimeline, stagger, animate } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createResponsiveDemo(staggerCanvas, enterEase, leaveEase) {
  let responsiveDemo = new FeatureDemo();
  let responsiveAxes = {
    x: 0,
    y: 1
  };
  let responsiveLoop = createTimeline({
    id: "responsive-loop",
    autoplay: false
  }).add(".responsive-viewport .circle", {
    y: {
      to: [-50, 50],
      modifier: item31 => item31 * responsiveAxes.y
    },
    x: {
      to: [-50, 50],
      modifier: item32 => item32 * responsiveAxes.x
    },
    alternate: true,
    loop: true,
    duration: 750,
    ease: "inOutQuad"
  }, stagger(100, {
    start: 0
  })).seek(1e3);
  responsiveDemo.syncable = createTimeline({
    id: "responsive",
    autoplay: false
  }).add(".responsive-viewport", {
    width: ["80%", "50%"],
    height: ["50%", "80%"],
    ease: "inOutExpo"
  }).add(responsiveAxes, {
    x: 1,
    y: 0,
    ease: "inOut(6)"
  }, "<<").add(".responsive-viewport .shape", {
    x: [stagger([-110, 110]), 0],
    y: [0, stagger([-110, 110])],
    ease: "inOut(6)"
  }, "<<").init();
  responsiveDemo.onEnter = () => {
    animate(".responsive-viewport .circle", {
      id: "responsive-enter",
      scale: [0, 1],
      ease: enterEase,
      delay: stagger(40)
    });
    responsiveLoop.play();
  };
  responsiveDemo.onLeave = () => {
    animate(".responsive-viewport .circle", {
      id: "responsive-leave",
      scale: 0,
      ease: leaveEase,
      duration: 350
    });
    responsiveLoop.pause();
  };
  return responsiveDemo;
}

export { createResponsiveDemo };
