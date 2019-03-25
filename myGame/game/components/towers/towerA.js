import Tower from '../tower';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

//Circle
class TowerA extends Tower {
  constructor(canvas, ctx, pos, size) {
    let range = 3.5;
    let damage = 5;
    let rof = 1;
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [0, 0], range, damage, rof)
    this.price = 30;
    this.upgradePrice = 10;
    this.upgradeRate = 15;
  }

  upgrade() {
    if (this.spriteIndex[1] < images.tower.rows - 1) {
      this.rof -= 50;
      this.damage += 5;
      this.spriteIndex[1]++;
      this.upgradePrice += this.upgradeRate;
      return true;
    }
    return false;
  }
}

export default TowerA;
