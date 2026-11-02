import { FeatureDemo } from './demo.js';
import { utils, svg, createTimeline, animate } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createSvgUtilsDemo(staggerCanvas, enterEase, leaveEase) {
  let svgDemo = new FeatureDemo();
  let svgTracks = utils.$("#drawable-demo .svg-track");
  let svgHighlight = svg.createDrawable("#drawable-demo .svg-track-higlight path");
  let svgBackground = svg.createDrawable("#drawable-demo .svg-track-bg path");
  utils.set(svgTracks, {
    rotateX: 90,
    rotateZ: 0,
    z: 0,
    scale: 0
  });
  let svgTimeline = createTimeline({
    id: "svg-utils",
    autoplay: false
  }).add("#drawable-demo .svg-car", {
    ease: "linear",
    duration: 1e4,
    loop: true,
    ...svg.createMotionPath("#drawable-demo .svg-track-bg path")
  }, 0).add(svgHighlight, {
    draw: "0 1",
    ease: "linear",
    duration: 1e4,
    loop: true
  }, 0).add(svgTracks, {
    rotateZ: 360,
    ease: "linear",
    duration: 2e4,
    loop: true
  }, 0);
  svgDemo.onEnter = () => {
    animate(svgBackground, {
      id: "svg-bg-draw",
      draw: ["0 0", "0 1"],
      duration: 1e3,
      ease: "inOutExpo"
    });
    animate(svgTracks, {
      id: "svg-track-enter",
      rotateX: {
        to: 45,
        duration: 1e3
      },
      scale: [.8, 1],
      z: (item23, index7) => index7 ? 10 : 5,
      ease: "out(3)",
      duration: 350
    });
    svgTimeline.restart();
  };
  svgDemo.onLeave = () => {
    animate(svgTracks, {
      id: "svg-track-leave",
      rotateX: 90,
      z: 0,
      scale: .8,
      ease: "inOut(3)",
      duration: 250
    });
    svgTimeline.pause();
  };
  return svgDemo;
}

export { createSvgUtilsDemo };
