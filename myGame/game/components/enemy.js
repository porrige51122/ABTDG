import Sprite from '../types/sprite';
import Vector from './vector';
import Tower from './tower';
import Health from './health';

import images from '../objects/images';
import Spritesheet from '../types/spritesheets';

class Enemy extends Sprite {
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex, spd, health){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.pathPos = 0;
    this.spd = spd;
    this.health = health;
    this.healthBar = new Health(
      this.canvas,
      this.ctx,
      new Vector(this.pos.x, this.pos.y + this.size.y), // position
      new Vector(0, 0), // velocity
      new Vector(this.size.x, this.size.y/4), // size
      new Spritesheet(images.health),
      [9, 0],
      this.health
    );
    this.vel.multiply(this.spd);

  }

  resize(newSize) {
    this.healthBar.resize(newSize);
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

  draw() {
    let dx = this.pos.getP()[0],
      dy = this.pos.getP()[1];
    let spr = this.spritesheet.getSpriteImage(this.spriteIndex); // sprite source image
    this.ctx.drawImage(
      this.spritesheet.img,  // spritesheet image
      spr.sx, spr.sy, spr.swidth, spr.sheight, // spritesheet frame
      dx, dy, this.size.getP()[0], this.size.getP()[1]  // co-ordinates and size
    );

    this.healthBar.draw();
  }

  update(towers) {
    this.pos.add(this.vel);
    this.healthBar.update(this.health, this.pos);
    // shooting mechanic
    for (let i = 0; i < towers.length; i++) {
      if (this.pos.length(towers[i].pos) < towers[i].range)
        if (!towers[i].isCooldown && !towers[i].isFired) {
          towers[i].isFired = true;
          towers[i].fire(this.pos);
          this.health -= towers[i].damage;
        }
    }
  }
}

export default Enemy;
