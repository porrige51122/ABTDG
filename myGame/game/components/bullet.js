import Sprite from '../types/sprite'
import Vector from './vector';


class Bullet extends Sprite{
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex, angle){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.frameCount = 0;
    this.angle = angle;
  }

  draw() {
    let dx = this.pos.getP()[0],
      dy = this.pos.getP()[1];
    let spr = this.spritesheet.getSpriteImage(this.spriteIndex);
    this.ctx.save();
    this.ctx.translate(dx, dy); //moves shape to origin
    this.ctx.rotate(this.angle); // sets angle
    this.ctx.drawImage(
      this.spritesheet.img,  // spritesheet image
      spr.sx, spr.sy, spr.swidth, spr.sheight, // spritesheet frame
      0, 0, this.size.getP()[0], this.size.getP()[1]); // co-ordinates and size
    this.ctx.restore();

  }

  resize(newSize) {
  }

  update() {
    const fps = 20;
    this.frameCount++;
    if (this.frameCount >= 60/fps) {
      this.frameCount = 0;
      this.spriteIndex[1]++;
    }
  }
}

export default Bullet;
