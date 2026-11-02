import { FeatureDemo } from './demo.js';
import { utils, spring, createDraggable, animate } from '../../vendor/animejs@4.5.0/dist/modules/index.js';

function createDraggableDemo(staggerCanvas, enterEase, leaveEase) {
  let draggableDemo = new FeatureDemo();
  let draggableElements = utils.$("#draggable-demo .draggable");
  let releaseSpring = spring({
    stiffness: 120,
    damping: 6
  });
  let draggable = createDraggable(draggableElements, {
    container: [0, 0, 0, 0],
    containerFriction: .5,
    releaseContainerFriction: 0,
    releaseEase: releaseSpring
  });
  draggable.progressX = .5;
  draggable.progressY = .5;
  draggable.onGrab = () => {
    animate(draggableElements[0], {
      id: "draggable-grab",
      scale: .8,
      duration: 350,
      ease: "out(3)"
    });
  };
  draggable.onRelease = () => {
    animate(draggableElements[0], {
      id: "draggable-release",
      scale: 1,
      duration: 350,
      ease: "out(3)"
    });
  };
  draggableElements[0].addEventListener("pointerenter", () => {
    if (!draggable.grabbed) {
      animate(draggableElements[0], {
        id: "draggable-hover-in",
        scale: 1.15,
        duration: 350,
        ease: "out(3)"
      });
    }
  });
  draggableElements[0].addEventListener("pointerleave", () => {
    if (!draggable.grabbed) {
      animate(draggableElements[0], {
        id: "draggable-hover-out",
        scale: 1,
        duration: 350,
        ease: "out(3)"
      });
    }
  });
  draggableDemo.onEnter = () => {
    draggable.progressX = .5;
    draggable.progressY = .5;
    animate(draggableElements, {
      id: "draggable-enter",
      scale: [0, 1],
      ease: enterEase
    });
  };
  draggableDemo.onLeave = () => {
    animate(draggableElements, {
      id: "draggable-leave",
      scale: 0,
      ease: leaveEase,
      duration: 350
    });
  };
  return draggableDemo;
}

export { createDraggableDemo };
