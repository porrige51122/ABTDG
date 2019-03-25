/**
 * sprite.js
 * sprites are any moving thing on the canvas
 **/
// imports
import Entity from './entity';
import Vector from '../components/vector';

// sprite class
class Sprite extends Entity {
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex) {
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    // ..
  }

  nextFrame() {
    this.spriteIndex++;
  }

  // @override
  draw() {
    let dx = this.pos.getP()[0],
      dy = this.pos.getP()[1];
    let spr = this.spritesheet.getSpriteImage(this.spriteIndex); // sprite source image
    this.ctx.drawImage(
      this.spritesheet.img,  // spritesheet image
      spr.sx, spr.sy, spr.swidth, spr.sheight, // spritesheet frame
      dx, dy, this.size.getP()[0], this.size.getP()[1]); // co-ordinates and size
  }

  // @override
  clear() {}

  // @override
  update() {
    this.pos.add(this.vel);
  }

  resize(newSize) {
    this.pos = new Vector(
      Math.floor(this.pos.x/this.size.x) * newSize,
      Math.floor(this.pos.y/this.size.y) * newSize
    );
    this.size = new Vector(newSize, newSize);
  }
}

export default Sprite;
