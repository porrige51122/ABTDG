import Enemy from '../enemy';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class EnemyJ extends Enemy {
  constructor(canvas, ctx, pos, vel, size) {
    let spd = 0.005;
    let health = 700;
    super(canvas, ctx, pos, vel, size, new Spritesheet(images.enemy), [0, 9], spd, health)
  }
}

export default EnemyJ;
