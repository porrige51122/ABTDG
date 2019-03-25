import Tower from '../tower';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

//triangle
class TowerB extends Tower {
  constructor(canvas, ctx, pos, size) {
    let range = 3;
    let damage = 5;
    let rof = 1;
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [1, 0], range, damage, rof)
    this.price = 40;
    this.upgradePrice = 20;
    this.upgradeRate = 15;
  }

  upgrade() {
    if (this.spriteIndex[1] < images.tower.rows - 1) {
      this.spriteIndex[1]++;
      this.range += 1;
      this.rof /= 2;
      this.upgradePrice += 20;
      this.upgradePrice += this.upgradeRate;
      return true;
    }
    return false;
  }
}

export default TowerB;
