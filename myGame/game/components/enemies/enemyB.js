import Enemy from '../enemy';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class EnemyB extends Enemy {
  constructor(canvas, ctx, pos, vel, size) {
    let spd = 0.005;
    let health = 40;
    super(canvas, ctx, pos, vel, size, new Spritesheet(images.enemy), [0, 1], spd, health)
  }
}

export default EnemyB;
