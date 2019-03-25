import wall from '../../assets/images/walls.png';
import tower from '../../assets/images/towers.png';
import enemy from '../../assets/images/enemies.png';
import explosion from '../../assets/images/explosion.png';
import health from '../../assets/images/health.png';
import bullet from '../../assets/images/bullet.png';


const wallSpritesheet = new Image();
wallSpritesheet.src = wall;

const towerSpritesheet = new Image();
towerSpritesheet.src = tower;

const enemySpritesheet = new Image();
enemySpritesheet.src = enemy;

const explosionSpritesheet = new Image();
explosionSpritesheet.src = explosion;

const healthSpritesheet = new Image();
healthSpritesheet.src = health;

const bulletSpritesheet = new Image();
bulletSpritesheet.src = bullet;

// object list of spritesheets and their rows/cols
// if spritesheet is vertical, swap rows/cols
const spritesheets = {
  wall: {
    img: wallSpritesheet,
    rows: 256,
    columns: 1
  },
  tower: {
    img: towerSpritesheet,
    rows: 5,
    columns: 5
  },
  enemy: {
    img: enemySpritesheet,
    rows: 12,
    columns: 1
  },
  explosion: {
    img: explosionSpritesheet,
    rows: 6,
    columns: 1
  },
  health: {
    img: healthSpritesheet,
    rows: 1,
    columns: 10
  },
  bullet: {
    img: bulletSpritesheet,
    rows: 6,
    columns: 1
  }

};

export default spritesheets;
