import Tower from '../tower';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class TowerMove extends Tower {
  constructor(canvas, ctx, pos, size) {
    let range = 0;
    let damage = 0;
    let rof = 0;
    super(canvas, ctx, pos, new Vector(0, 0), size, new Spritesheet(images.tower), [0, 0], range, damage, rof)
  }
}

export default TowerMove;
