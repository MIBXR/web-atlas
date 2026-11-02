import { FeatureDemo } from './demo.js';
import { createTimeline, stagger, svg } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createScrollDemo(staggerCanvas, enterEase, leaveEase) {
  let scrollDemo = new FeatureDemo();
  let sphereLoop = createTimeline({
    id: "sphere-loop",
    autoplay: false
  }).add("#scrollable-demo path", {
    x: [-4, 4, {
      to: -4,
      duration: 1500
    }],
    y: [-4, 4, {
      to: -4,
      duration: 1500
    }],
    strokeWidth: [2, 4, {
      to: 2,
      duration: 1500
    }],
    loop: true,
    duration: 2500,
    loopDelay: 0,
    ease: "inOut(2)"
  }, stagger(200, {
    reversed: true
  })).init().seek(1e4);
  scrollDemo.syncable = createTimeline({
    id: "scroll-drawable",
    autoplay: false
  }).add(svg.createDrawable("#scrollable-demo path"), {
    draw: [{
      to: stagger([0, 1], {
        modifier: item29 => `${item29} ${item29 + 1.01}`
      })
    }, {
      to: stagger([0, 1], {
        modifier: item30 => `${item30 + 1.01} ${item30 + 1.01}`
      })
    }],
    ease: "inOut(3)",
    delay: stagger(40, {
      reversed: true
    })
  });
  scrollDemo.onEnter = () => {
    sphereLoop.play();
  };
  scrollDemo.onLeave = () => {
    sphereLoop.pause();
  };
  return scrollDemo;
}

export { createScrollDemo };
