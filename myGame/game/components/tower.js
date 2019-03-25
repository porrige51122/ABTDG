import Sprite from '../types/sprite';
import Vector from './vector';
import Bullet from './bullet';

import images from '../objects/images';
import Spritesheet from '../types/spritesheets';

class Tower extends Sprite {
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex, range, damage, rof){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
    this.rof = rof * 1000; //to milliseconds
    this.range = range * this.size.x; // to Tiles;
    this.damage = damage;
    this.isSelected = false;
    this.isFired = false;
    this.isCooldown = false;
    this.bullets = [];
  }

  draw() {
    if (this.isSelected) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x + this.size.x/2, this.pos.y + this.size.x/2, this.range, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x + this.size.x/2, this.pos.y + this.size.x/2, this.range, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      this.ctx.fill();
    }
    let dx = this.pos.getP()[0],
      dy = this.pos.getP()[1];
    let spr = this.spritesheet.getSpriteImage(this.spriteIndex); // sprite source image
    this.ctx.drawImage(
      this.spritesheet.img,  // spritesheet image
      spr.sx, spr.sy, spr.swidth, spr.sheight, // spritesheet frame
      dx, dy, this.size.getP()[0], this.size.getP()[1]); // co-ordinates and size

    this.bullets.forEach((bullet) => bullet.draw());
  }

  resize(newSize) {
    this.bullets.forEach((bullet) => bullet.resize(newSize));
    this.pos = new Vector(
      Math.floor(this.pos.x/this.size.x) * newSize,
      Math.floor(this.pos.y/this.size.x) * newSize
    );
    this.range = this.range/this.size.x * newSize
    this.size = new Vector(newSize, newSize);
  }

  update() {
    this.bullets.forEach((bullet) => bullet.update());
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].spriteIndex[1] > images.bullet.columns) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
    if (this.isFired) {
      this.isFired = false;
      this.startTime = Date.now();
      this.isCooldown = true;
    } else if (this.isCooldown && (Date.now() - this.startTime > this.rof)) {
      this.isCooldown = false;
    }
  }

  fire(enemyPos) {
    this.bullets.push(
      new Bullet(
        this.canvas,
        this.ctx,
        new Vector(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2), // position
        new Vector(0, 0), // velocity
        new Vector(this.pos.length(new Vector(enemyPos.x, enemyPos.y)), this.size.y/4), // size
        new Spritesheet(images.bullet),
        [0, 0],
        this.pos.rotate(new Vector(enemyPos.x, enemyPos.y))
      )
    );
  }
}

export default Tower;
