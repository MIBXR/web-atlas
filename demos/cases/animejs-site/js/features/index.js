import { spring } from '../../vendor/animejs@4.5.0/dist/modules/index.js';
import { createIntuitiveDemo } from './intuitive.js';
import { createCompositionDemo } from './composition.js';
import { createSvgUtilsDemo } from './svgUtils.js';
import { createClockworkDemo } from './clockwork.js';
import { createStaggeringDemo } from './staggering.js';
import { createDraggableDemo } from './draggable.js';
import { createScrollDemo } from './scroll.js';
import { createResponsiveDemo } from './responsive.js';

function createFeatureDemos(staggerCanvas) {
  const enterEase = spring();
  const leaveEase = 'out(3)';
  return {
    intuitive: createIntuitiveDemo(staggerCanvas, enterEase, leaveEase),
    composition: createCompositionDemo(staggerCanvas, enterEase, leaveEase),
    svgUtils: createSvgUtilsDemo(staggerCanvas, enterEase, leaveEase),
    clockwork: createClockworkDemo(staggerCanvas, enterEase, leaveEase),
    staggering: createStaggeringDemo(staggerCanvas, enterEase, leaveEase),
    draggable: createDraggableDemo(staggerCanvas, enterEase, leaveEase),
    scroll: createScrollDemo(staggerCanvas, enterEase, leaveEase),
    responsive: createResponsiveDemo(staggerCanvas, enterEase, leaveEase)
  };
}

export { createFeatureDemos };
