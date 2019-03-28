import Sprite from '../types/sprite';
import Vector from './vector'
import Beam from './beam';

import colours from '../objects/colours';
import images from '../objects/images';
import Spritesheet from '../types/spritesheets';

class TowerUser extends Sprite {
  constructor(canvas, ctx, pos, size) {
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [4, 0]);
    this.mouse = new Vector(0, 0);
    console.log(this.damage);
    this.beam = new Beam (
      this.canvas,
      this.ctx,
      new Vector(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2),
      this.vel,
      new Vector(this.size.x/4, this.size.y/4),
      new Spritesheet(images.bullet)
      [0,2]
    );
    this.price = 80;
    this.upgradePrice = 30;
    this.upgradeRate = 20;
  }

  update(mousePos) {
    this.beam.update(mousePos);
  }

  draw() {
    let dx = this.pos.x,
      dy = this.pos.y;
    let spr = this.spritesheet.getSpriteImage(this.spriteIndex); // sprite source image
    this.ctx.drawImage(
      this.spritesheet.img,  // spritesheet image
      spr.sx, spr.sy, spr.swidth, spr.sheight, // spritesheet frame
      dx, dy, this.size.x, this.size.y); // co-ordinates and size
    this.beam.draw();
  }

  resize(newSize) {
    this.pos = new Vector(
      Math.floor(this.pos.x/this.size.x) * newSize,
      Math.floor(this.pos.y/this.size.y) * newSize
    );
    this.size = new Vector(newSize, newSize);
    this.beam.resize(newSize);
  }

  upgrade() {
    if (this.spriteIndex[1] < images.tower.rows - 1) {
      this.spriteIndex[1]++;
      if (this.spriteIndex[1] == 1)
        this.beam.changeColour(colours.flat_yellow);
      else if (this.spriteIndex[1] == 2)
        this.beam.changeColour(colours.flat_electric_blue);
      else if (this.spriteIndex[1] == 3)
        this.beam.changeColour(colours.flat_registration_black);
      else if (this.spriteIndex[1] == 4)
        this.beam.changeColour(colours.flat_white);
      this.beam.damage *= 2;
      this.upgradePrice += this.upgradeRate;
      this.upgradeRate *= 2;
      return true;
    }
    return false;
  }
}

export default TowerUser;
