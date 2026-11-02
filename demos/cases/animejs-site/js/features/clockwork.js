import { FeatureDemo } from './demo.js';
import { createTimeline, utils, stagger, svg, animate } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createClockworkDemo(staggerCanvas, enterEase, leaveEase) {
  let clockworkDemo = new FeatureDemo();
  let clockworkTimeline = createTimeline({
    id: "clockwork",
    autoplay: false
  }).set(".clock .tick:last-child", {
    opacity: 0
  }, 0).add(".clock .tick:not(:last-child)", {
    x: (item24, index8) => {
      let value95 = index8 % 12 ? 6 : 12;
      let value96 = utils.get(item24, "rotate", false) * Math.PI / 180;
      return "+=" + value95 * Math.sin(value96);
    },
    y: (item25, index9) => {
      let value97 = index9 % 12 ? 6 : 12;
      let value98 = utils.get(item25, "rotate", false) * Math.PI / 180;
      return "-=" + value97 * Math.cos(value98);
    },
    opacity: {
      to: 1,
      duration: 0,
      ease: "linear",
      delay: 45
    },
    scaleX: 2,
    ease: "inOutQuad",
    duration: 50,
    loop: 1,
    alternate: true,
    composition: "none"
  }, stagger(10)).set(".clock .tick:first-child", {
    opacity: 0
  }, "<-=90").set(".clock .tick:last-child", {
    opacity: .5
  }, "<<").add(svg.createDrawable(".clock-grid .circle-grid-drawable path"), {
    draw: ["1 1", "0 1"],
    strokeWidth: ["20", "5"],
    opacity: [1, .15],
    ease: "linear",
    duration: item26 => +item26.getAttribute("id").split("_")[1] * 1920,
    delay: stagger(240)
  }, 50).add(".timeline-playhead", {
    rotate: 360,
    ease: "linear",
    duration: 1920
  }, 50).init();
  clockworkDemo.syncable = clockworkTimeline;
  clockworkDemo.onEnter = () => {
    animate(".tick", {
      id: "clockwork-enter",
      scaleY: (item27, index10) => index10 % 12 ? 1.5 : 2.25,
      duration: 350
    });
  };
  clockworkDemo.onLeave = () => {
    animate(".tick", {
      id: "clockwork-leave",
      scaleY: 1,
      duration: 250
    });
  };
  return clockworkDemo;
}

export { createClockworkDemo };
