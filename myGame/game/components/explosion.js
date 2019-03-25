import Sprite from '../types/sprite';
import Vector from './vector';

class Explosion extends Sprite{
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.frameCount = 0;
  }

  resize(newSize) {
    this.pos = new Vector(
      (this.pos.x/this.size.x) * newSize,
      (this.pos.y/this.size.x) * newSize
    );
    this.vel = new Vector(
      (this.vel.x/this.size.x) * newSize,
      (this.vel.y/this.size.x) * newSize
    );
    this.size = new Vector(newSize, newSize);
  }

  update() {
    const fps = 12;
    this.frameCount++;
    if (this.frameCount >= 60/fps) {
      this.frameCount = 0;
      this.spriteIndex[1]++;
    }
  }
}

export default Explosion;
