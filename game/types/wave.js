import Vector from '../components/vector';
import Enemy from '../components/enemy';

import Explosion from '../components/explosion';
import images from '../objects/images';
import colours from '../objects/colours';
import Spritesheet from './spritesheets';

import notification from '../notification'
class Wave {
  constructor(canvas, ctx, path, wallSize) {
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
      for (let i = 0; i < (this.waveNo/5) * 5 * Math.random(); i++) {
        let vel = new Vector(
          (this.path[1][0] - this.path[0][0]) * this.wallSize,
          (this.path[1][1] - this.path[0][1]) * this.wallSize
        );
        let pos = new Vector(this.path[0][0] * this.wallSize, this.path[0][1] * this.wallSize);
        let size = new Vector(this.wallSize, this.wallSize);
        this.enemies.push(new Enemy(
          this.canvas,
          this.ctx,
          pos,
          vel,
          size,
          new Spritesheet(images.enemy),
          [0, Math.floor(Math.random() * ((this.waveNo/2) > 12 ? 12 : this.waveNo/2))],
          Math.random() * (0.0001 * this.waveNo) + 0.005,
          (this.waveNo * this.waveNo) * 2 + 10
        ));
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
