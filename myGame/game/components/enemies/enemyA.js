import Enemy from '../enemy';
import Vector from '../vector'

import images from '../../objects/images';
import Spritesheet from '../../types/spritesheets';

class EnemyA extends Enemy {
  constructor(canvas, ctx, pos, vel, size) {
    let spd = 0.005;
    let health = 20;
    super(canvas, ctx, pos, vel, size, new Spritesheet(images.enemy), [0, 0], spd, health)
  }
}

export default EnemyA;
