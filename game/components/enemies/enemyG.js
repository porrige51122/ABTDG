import Enemy from '../enemy';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class EnemyG extends Enemy {
  constructor(canvas, ctx, pos, vel, size) {
    let spd = 0.01;
    let health = 200;
    super(canvas, ctx, pos, vel, size, new Spritesheet(images.enemy), [0, 6], spd, health)
  }
}

export default EnemyG;
