import { FeatureDemo } from './demo.js';
import { utils, stagger, createTimeline } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createStaggeringDemo(staggerCanvas, enterEase, leaveEase) {
  let staggeringDemo = new FeatureDemo();
  let staggerGrid = [13, 13];
  let staggerOrigin = 200;
  utils.set(staggerCanvas.circles, {
    opacity: stagger([0, 1], {
      grid: staggerGrid,
      from: "center",
      reversed: true,
      modifier: item28 => utils.round(item28 + .25, 0) ? 1 : 0
    })
  });
  let staggeringTimeline = createTimeline({
    id: "staggering",
    autoplay: false,
    onUpdate: () => staggerCanvas.render()
  }).add(staggerCanvas.circles, {
    scale: [1, stagger([15, 1], {
      grid: staggerGrid,
      from: "center"
    }), {
      to: 1,
      duration: 500
    }],
    opacity: [{
      to: ["-=.8", "+=.8"]
    }, {
      to: "-=.8",
      delay: 900
    }],
    x: [{
      to: stagger([staggerOrigin, staggerOrigin + 110], {
        grid: staggerGrid,
        from: "center",
        axis: "x"
      }),
      duration: 500
    }, {
      to: stagger([staggerOrigin, staggerOrigin + 100], {
        grid: staggerGrid,
        from: "center",
        axis: "x"
      }),
      duration: 1e3
    }],
    y: [{
      to: stagger([staggerOrigin, staggerOrigin + 110], {
        grid: staggerGrid,
        from: "center",
        axis: "y"
      }),
      duration: 500
    }, {
      to: stagger([staggerOrigin, staggerOrigin + 100], {
        grid: staggerGrid,
        from: "center",
        axis: "y"
      }),
      duration: 1e3
    }],
    duration: 750,
    loop: true,
    ease: "inOutQuad"
  }, stagger(200, {
    grid: staggerGrid,
    from: "center",
    ease: "in",
    start: 50
  })).init();
  staggeringDemo.onEnter = () => {
    staggeringTimeline.restart();
  };
  staggeringDemo.onLeave = () => {
    staggeringTimeline.pause();
  };
  return staggeringDemo;
}

export { createStaggeringDemo };
