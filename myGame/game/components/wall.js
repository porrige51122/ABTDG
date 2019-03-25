import Sprite from '../types/sprite'

class Wall extends Sprite{
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex){
    super(canvas, ctx, pos, vel, size, spritesheet, spriteIndex);
  }
}

export default Wall;
