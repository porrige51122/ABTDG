import Sprite from '../types/sprite';
import Vector from './vector';
import images from '../objects/images';

class Health extends Sprite {
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex, health){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.originalHealth = health;
  }

  resize(newSize) {
    this.pos = new Vector(
      Math.floor(this.pos.x/this.size.x) * newSize,
      Math.floor(this.pos.y/this.size.y) * newSize
    );
    this.size = new Vector(newSize, newSize/4);
  }

  update(health, pos) {
    this.spriteIndex[0] = Math.floor((health/this.originalHealth) * (images.health.columns - 1));
    this.pos = new Vector(pos.x, pos.y + this.size.x);
  }
}

export default Health;
