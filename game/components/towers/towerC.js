import Tower from '../tower';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

// pentagon
class TowerC extends Tower {
  constructor(canvas, ctx, pos, size) {
    let range = 8;
    let damage = 10;
    let rof = 1;
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [2, 0], range, damage, rof)
    this.price = 60;
    this.upgradePrice = 50;
    this.upgradeRate = 20;
  }

  upgrade() {
    if (this.spriteIndex[1] < images.tower.rows - 1) {
      this.range += 1;
      this.spriteIndex[1]++;
      this.upgradePrice += 20;
      this.upgradePrice += this.upgradeRate;
      return true;
    }
    return false;
  }
}

export default TowerC;
