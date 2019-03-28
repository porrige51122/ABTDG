import Vector from '../components/vector';
import EnemyA from '../components/enemies/enemyA';
import EnemyB from '../components/enemies/enemyB';
import EnemyC from '../components/enemies/enemyC';
import EnemyD from '../components/enemies/enemyD';
import EnemyE from '../components/enemies/enemyE';
import EnemyF from '../components/enemies/enemyF';
import EnemyG from '../components/enemies/enemyG';
import EnemyH from '../components/enemies/enemyH';
import EnemyI from '../components/enemies/enemyI';
import EnemyJ from '../components/enemies/enemyJ';
import EnemyK from '../components/enemies/enemyK';
import EnemyL from '../components/enemies/enemyL';

import Explosion from '../components/explosion';
import images from '../objects/images';
import colours from '../objects/colours';
import Spritesheet from './spritesheets';

import notification from '../notification'
class Wave {
  constructor(canvas, ctx, path, wallSize) {
    this.waves = [
      [0,0,0], // wave 1
      [0,1,0], // wave 2
      [2,0,2], // etc..
      [0,1,0,1,0,1],
      [2,2],
      [1,1,1,1,1,1,1,1,1,1],
      [2,1,1,2,1,1],
      [2,2,2,2,2,2],
      [1,3,3,1],
      [0,0,0,0,3],
      [1,1,1,3].
      [2,2,3]
      [3,3,3],
      [4,4,4]
      [4,4,4,4,4],
      [5,5,5,5],
      [4,5,4,4],
      [6,2,2,6,6,2,2],
      [7,7,7],
      [3,3,3,3,3,3,3,3],
      [7,7,9,7,7],
      [7,7,8,8,8,7,7,7]
      [9,9,9],
      [8,8,7,7]
      [3,3,3,3,3,3,3,3,3],
      [5,6,7,5,6,7],
      [10,10,10,10,10],
      [11,11,11,11],
    ];
    this.canvas = canvas;
    this.ctx = ctx;
    this.path = path;
    this.enemies = [];
    this.explosions = [];
    this.wallSize = wallSize;
    this.waveNo = 1;
    this.waveCheck = true;
    this.timerStart = true;
    this.waveText = false;
    this.lives = 5;
  }

  startWave() {
    // Start Time
    if (this.timerStart) {
      this.waveText = true;
      this.startTime = Date.now();
      this.timerStart = false;
    }
    //
    if (Date.now() - this.startTime > 5000) {
      this.waveText = false;
      for (let i = 0; i < this.waves[this.waveNo - 1].length; i++) {
        let vel = new Vector(
          (this.path[1][0] - this.path[0][0]) * this.wallSize,
          (this.path[1][1] - this.path[0][1]) * this.wallSize
        );
        let pos = new Vector(this.path[0][0] * this.wallSize, this.path[0][1] * this.wallSize);
        let size = new Vector(this.wallSize, this.wallSize);
        if (this.waves[this.waveNo - 1][i] == 0)
          this.enemies.push(new EnemyA(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 1)
          this.enemies.push(new EnemyB(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 2)
          this.enemies.push(new EnemyC(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 3)
          this.enemies.push(new EnemyD(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 4)
          this.enemies.push(new EnemyE(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 5)
          this.enemies.push(new EnemyF(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 6)
          this.enemies.push(new EnemyG(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 7)
          this.enemies.push(new EnemyH(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 8)
          this.enemies.push(new EnemyI(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 9)
          this.enemies.push(new EnemyJ(this.canvas, this.ctx, pos, vel, size));
        else if (this.waves[this.waveNo - 1][i] == 10)
          this.enemies.push(new EnemyK(this.canvas, this.ctx, pos, vel, size));
        else
          this.enemies.push(new EnemyL(this.canvas, this.ctx, pos, vel, size));
      }
      this.timerStart = true;
      this.waveNo++;
    }
  }

  update(towers) {
    document.getElementById('lives').innerHTML = this.lives;
    // updating explosions
    for (let i = 0; i < this.explosions.length; i++) {
      this.explosions[i].update()
      if (this.explosions[i].spriteIndex[1] > images.explosion.rows) {
        this.explosions.splice(i, 1);
        i--;
      }
    }
    // pathfinding
    if (this.enemies.length > 0) {
      for (let i = 0; i < this.enemies.length; i++) {
        if (i == 0) {
          this.enemies[i].update(towers);
        } else {
          if (this.enemies[i - 1].pos.length(this.enemies[i].pos) > this.wallSize) {
            this.enemies[i].update(towers);
          }
        }
      }

      // If enemies get past the end, they get removed or if their health goes below 0
      for (let i = 0; i < this.enemies.length; i++) {
        // end of the map
        if (Math.round(this.enemies[i].pos.y) >= Math.round(this.path[this.enemies[i].pathPos + 1][1] * this.wallSize) &&
          Math.round(this.enemies[i].pos.y) <= Math.round(this.path[this.enemies[i].pathPos + 1][1] * this.wallSize) + this.wallSize / 4) {
          this.enemies[i].pathPos++;
          if (this.enemies[i].pathPos < this.path.length - 1) {
            this.enemies[i].vel = new Vector(
              (this.path[this.enemies[i].pathPos + 1][0] - this.path[this.enemies[i].pathPos][0]) * this.wallSize * this.enemies[i].spd,
              (this.path[this.enemies[i].pathPos + 1][1] - this.path[this.enemies[i].pathPos][1]) * this.wallSize * this.enemies[i].spd);
          } else {
            this.enemies.splice(i, 1);
            this.lives--;
            notification("ACK! An Enemy got Through!", colours.flat_dark_terra_cotta);
            i--;
            continue;
          }

        }
        if (this.enemies[i].health <= 0) {
          this.explosions.push(new Explosion(
            this.canvas,
            this.ctx,
            this.enemies[i].pos.subNum(this.wallSize / 2), // position
            new Vector(0, 0), // velocity
            new Vector(this.wallSize * 2, this.wallSize * 2), // size
            new Spritesheet(images.explosion),
            [0, 0]
          ));
          this.enemies.splice(i, 1);
          i--;
          continue;
        }

      }
    } else {
      this.startWave();
    }
  }

  draw() {
    this.explosions.forEach((explosion) => explosion.draw());
    this.enemies.forEach(enemy => enemy.draw());
    if (this.waveText) {
      this.ctx.fillStyle = colours.flat_electric_blue;
      this.ctx.font = (this.wallSize) + 'px "Press Start 2P"';
      this.ctx.fillText('Wave ' + this.waveNo, this.canvas.width / 2 - this.wallSize * 4, this.canvas.height / 2);
    }
  }

  resize(wallSize) {
    this.wallSize = wallSize;
    this.enemies.forEach(enemy => enemy.resize(wallSize));
  }

}

export default Wave;
