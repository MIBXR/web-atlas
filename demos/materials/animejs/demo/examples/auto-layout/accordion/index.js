import { createLayout, spring } from '../../../../vendor/animejs@4.5.0/dist/modules/index.js';

const accordion = createLayout('.accordion', {
  properties: ['background-color'],
  ease: spring({ bounce: .2, duration: 450 }),
  enterFrom: { opacity: 0, filter: 'blur(5px)' },
  leaveTo: { opacity: 0, filter: 'blur(5px)' }
});

document.addEventListener('click', event => {
  const $toggled = /** @type {HTMLElement} */(event.target).closest('.accordion button');
  if ($toggled) accordion.update(() => $toggled.parentElement.classList.toggle('is-open'))
});
