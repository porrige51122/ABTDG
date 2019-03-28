import Tower from '../tower';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

// square
class TowerD extends Tower {
  constructor(canvas, ctx, pos, size) {
    let range = 3;
    let damage = 30;
    let rof = 2.5;
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [3, 0], range, damage, rof)
    this.price = 50;
    this.upgradePrice = 50;
    this.upgradeRate = 20;
  }

  upgrade() {
    if (this.spriteIndex[1] < images.tower.rows - 1) {
      this.spriteIndex[1]++;
      this.damage += 20;
      this.upgradePrice += this.upgradeRate;
      this.upgradeRate *= 2;
      return true;
    }
    return false;
  }
}

export default TowerD;
