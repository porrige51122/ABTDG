import Enemy from '../enemy';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class EnemyH extends Enemy {
  constructor(canvas, ctx, pos, vel, size) {
    let spd = 0.02;
    let health = 300;
    super(canvas, ctx, pos, vel, size, new Spritesheet(images.enemy), [0, 7], spd, health)
  }
}

export default EnemyH;
