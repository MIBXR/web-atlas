import { utils } from '../vendor/animejs@4.5.0/dist/modules/index.js';

var ShapeCanvas = class {
  constructor(parent) {
    this.$canvas = document.createElement("canvas");
    this.$parent = parent;
    this.$parent.appendChild(this.$canvas);
    this.scale = 2;
    let width = this.$parent.offsetWidth;
    let height = this.$parent.offsetHeight;
    this.$canvas.style.width = `${width}px`;
    this.$canvas.style.height = `${height}px`;
    this.$canvas.width = width * this.scale;
    this.$canvas.height = height * this.scale;
    this.width = width;
    this.height = height;
    this.ctx = this.$canvas.getContext("2d");
    this.ctx.scale(this.scale, this.scale);
    this.shapes = [];
    this.circles = [];
    this.lines = [];
    this.shapesLength = 0;
  }
  updateDimensions() {
    let width = this.$parent.offsetWidth;
    let height = this.$parent.offsetHeight;
    this.$canvas.style.width = `${width}px`;
    this.$canvas.style.height = `${height}px`;
    this.$canvas.width = width * this.scale;
    this.$canvas.height = height * this.scale;
    this.width = width;
    this.height = height;
    this.ctx.scale(this.scale, this.scale);
  }
  addCircle(radius, color, properties = {}) {
    let value87 = {
      isCircle: true,
      radius: radius,
      color: color,
      x: properties.x || 0,
      y: properties.y || 0,
      scale: properties.scale !== undefined ? properties.scale : 1,
      scaleX: properties.scaleX !== undefined ? properties.scaleX : 1,
      scaleY: properties.scaleY !== undefined ? properties.scaleY : 1,
      opacity: properties.opacity !== undefined ? properties.opacity : 1
    };
    this.shapes.push(value87);
    this.circles.push(value87);
    this.shapesLength++;
    return value87;
  }
  addLine(item19, index4, total5, total6, lineWidth, color, properties = {}) {
    let value88 = {
      isLine: true,
      x1: item19,
      y1: index4,
      x2: total5,
      y2: total6,
      color: color,
      x: properties.x || 0,
      y: properties.y || 0,
      lineWidth: lineWidth || 1,
      scale: properties.scale !== undefined ? properties.scale : 1,
      scaleX: properties.scaleX !== undefined ? properties.scaleX : 1,
      scaleY: properties.scaleY !== undefined ? properties.scaleY : 1,
      opacity: properties.opacity !== undefined ? properties.opacity : 1
    };
    this.shapes.push(value88);
    this.lines.push(value88);
    this.shapesLength++;
    return value88;
  }
  render() {
    let context = this.ctx;
    context.clearRect(0, 0, this.width, this.height);
    for (let value92 = 0; value92 < this.shapesLength; value92++) {
      let value91 = this.shapes[value92];
      context.save();
      context.globalAlpha = utils.clamp(value91.opacity, 0, 1);
      if (value91.isCircle) {
        context.translate(value91.x, value91.y);
        context.scale(value91.scale * value91.scaleX, value91.scale * value91.scaleY);
        context.beginPath();
        context.arc(0, 0, value91.radius, 0, Math.PI * 2);
        context.fillStyle = value91.color;
        context.fill();
      } else if (value91.isLine) {
        context.translate(value91.x, value91.y);
        let value89 = (value91.x1 + value91.x2) / 2;
        let value90 = (value91.y1 + value91.y2) / 2;
        context.translate(value89, value90);
        context.scale(value91.scale * value91.scaleX, value91.scale * value91.scaleY);
        context.translate(-value89, -value90);
        context.beginPath();
        context.moveTo(value91.x1, value91.y1);
        context.lineTo(value91.x2, value91.y2);
        context.strokeStyle = value91.color;
        context.lineWidth = value91.lineWidth;
        context.stroke();
      }
      context.restore();
    }
  }
};

export { ShapeCanvas };
