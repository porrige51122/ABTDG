import Sprite from '../types/sprite'
import Vector from './vector';
import Enemy from './enemy';
import colours from '../objects/colours';

class Beam extends Sprite {
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.frameCount = 0;
    this.mousePos = this.pos;
    this.endPos = this.mousePos;
    this.damage = 0.1;
    this.endPosB = this.endPos;
    this.colour = colours.flat_dark_terra_cotta;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.ctx.lineTo(this.endPos.x, this.endPos.y);
    this.ctx.lineWidth = this.size.x;
    this.ctx.strokeStyle = this.colour;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.endPos.x, this.endPos.y);
    this.ctx.lineTo(this.endPosB.x, this.endPosB.y);
    this.ctx.stroke();
    this.ctx.restore();

  }

  resize(newSize) {
    this.pos = new Vector(
      Math.floor(this.pos.x/this.size.x) * newSize/4,
      Math.floor(this.pos.y/this.size.y) * newSize/4
    );
    this.size = new Vector(newSize/4, newSize/4);
  }

  update(mousePos) {
    this.mousePos = mousePos;
    let x1 = this.pos.x;
    let x2 = mousePos.x;
    let y1 = this.pos.y;
    let y2 = mousePos.y;
    let m = (y2 - y1)/(x2 - x1);
    let dx, dy;
    let c = y1 - m * x1;
    if (x1 > x2) {
      dx = 0;
      dy = m * dx + c;
    } else {
      dx = this.canvas.width;
      dy = m * dx + c;
    }
    this.endPos = new Vector (dx, dy);
  }

  changeColour(colour) {
    this.colour = colour;
  }

  fire() {
    return this.damage;
  }
}

export default Beam;
