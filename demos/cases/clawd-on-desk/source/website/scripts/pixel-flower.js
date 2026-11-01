// Shared by demo C and the homepage so the selected appearance cannot drift.
(() => {
  const COLORS = Object.freeze(['#b56e55', '#bd9760', '#839579', '#c49383']);
  const BASE_GAP = 34;
  const RADIUS = 90;
  function hash(x, y) {
    let h = ((x | 0) * 73856093) ^ ((y | 0) * 19349663);
    return ((h << 13) | (h >>> 19)) >>> 0;
  }
  function motif(h) {
    const color = COLORS[h % COLORS.length];
    const rows = h % 3 === 0
      ? ['0011100', '0111110', '1111111', '1110111', '1111111', '0111110', '0011100']
      : ['0011100', '0011100', '1111111', '1110111', '1111111', '0011100', '0011100'];
    return `<g shape-rendering="crispEdges">${rows.map((row, y) => [...row].map((v, x) => v === '1'
      ? `<rect x="${(x - 3.5) * 2}" y="${(y - 3.5) * 2}" width="2" height="2" fill="${color}"/>`
      : '').join('')).join('')}<rect x="-1" y="-1" width="2" height="2" fill="#ba9857"/></g>`;
  }
  function opacityAt(distance) {
    return distance < RADIUS ? Math.pow(1 - distance / RADIUS, .68) * .9 : 0;
  }
  window.ClawdPixelFlower = Object.freeze({
    BASE_GAP, RADIUS, COLORS, hash, motif, opacityAt,
    gapAt: percent => Math.round(BASE_GAP * percent / 100),
    scaleAt: opacity => .65 + opacity * .5,
    DOT_COLOR: '#c76f50', DOT_ALPHA: .20, DOT_SIZE: 2,
  });
})();
