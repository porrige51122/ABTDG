// imports
import Entity from './types/entity';
import Spritesheet from './types/spritesheets';
import Ball from './components/ball';
import Wall from './components/wall';
import TowerMove from './components/towers/towerA';
import TowerA from './components/towers/towerA';
import TowerB from './components/towers/towerB';
import TowerC from './components/towers/towerC';
import TowerD from './components/towers/towerD';
import Sprite from './types/sprite';
import TowerUser from './components/towerUser';
import network from './network';
import Vector from './components/vector';
import Wave from './types/wave';
import Interaction from './types/interaction';
import images from './objects/images';
import colours from './objects/colours';
import prefetcher from './prefetcher';
import getImageNames from './imagenames'
import MapGen from './mapgen';
import TerrainGen from './terrainGen';
import notification from './notification'
import logo from '../assets/images/ABTDG-logo-trans.svg'

import( /* webpackChunkName: "fa" */ '../node_modules/@fortawesome/fontawesome-free/js/fontawesome');
import( /* webpackChunkName: "fa-regular" */ '../node_modules/@fortawesome/fontawesome-free/js/regular.min');
import( /* webpackChunkName: "fa-regular" */ '../node_modules/@fortawesome/fontawesome-free/js/solid.min');
import('../assets/css/style.scss');

// this class represents the canvas
class CVS extends Entity {
  // init the canvas properties
  constructor(canvas, ctx, w, h) {
    super(canvas, ctx, null, null, new Vector(w, h)); // always call super
    // setting fps
    this.times = [];
    this.fps;
    this.money = 100;
    this.income = true;
    this.intrest = 5;

    this.resizeX = 0;
    this.resizeY = 0;
    // map generation
    let a = new MapGen(3, 4); // [Thickness, Bends]
    this.map = a.generate();
    let b = new TerrainGen(this.map);
    this.map = b.load();

    // button init
    this.towerPressed = false;
    this.towerValue = 0;
    this.upgradePressed = false;

    // start frame loop
    prefetcher(getImageNames(), () => {
      // list of all sprites on the canvas
      this.walls = this.buildWalls(0);
      this.towers = [];
      this.interactions = [];
      this.buildListeners();

      // Waves Start

      a.path.splice(0, 0, [8,-2]);
      a.path.forEach((path) => console.log(path));

      this.waves = new Wave(this.canvas, this.ctx, a.path, this.wallSize);
      this.waves.startWave();
      this.loop();
    });
  }

  setWallSize() {
    // calculating wall size relative to screen
    // (3/4) == screen to sidebar
    // / 2 == number of screens displayed
    // / 15 == map width
    // * 20 == map height
    // * 0.99 1% border
    this.wallSize = window.innerWidth * (3 / 4) / 15 * 20 < window.innerHeight * 0.98 ?
      Math.floor(window.innerWidth * (3 / 4) / 15) :
      Math.floor(window.innerHeight * (1 / 20) * 0.98);
  }

  buildWalls(offset) {
    this.setWallSize();
    let walls = new Array(this.map.length);
    let y = -1;
    for (let i = 0; i < this.map.length; i++) {
      if (i % 15 == 0)
        y++;
      walls[i] = new Wall(
        this.canvas,
        this.ctx,
        new Vector(offset + i % 15 * this.wallSize, y * this.wallSize), // position
        new Vector(0, 0), // velocity
        new Vector(this.wallSize, this.wallSize), // size
        new Spritesheet(images.wall),
        [0, this.map[i]] // frame in spritesheet
      )
    }
    return walls;
  }

  buildListeners() {
    const BUTT1 = document.getElementById('tower1');
    const BUTT2 = document.getElementById('tower2');
    const BUTT3 = document.getElementById('tower3');
    const BUTT4 = document.getElementById('tower4');
    const BUTT5 = document.getElementById('tower5');
    const BUTT6 = document.getElementById('upgrade');
    const BUTT7 = document.getElementById('intrestbut');
    const BUTT8 = document.getElementById('sell');
    const BUTT9 = document.getElementById('cancel');


    this.moveTower = new TowerMove(
      this.canvas,
      this.ctx,
      new Vector(-50, -50),
      new Vector(this.wallSize, this.wallSize),
    );
    // checking mouse position
    canvas.addEventListener("mousemove", () => {
      let rect = canvas.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      if (this.towerPressed) {
        this.moveTower.pos.x = Math.floor(mouseX / this.wallSize) * this.wallSize;
        this.moveTower.pos.y = Math.floor(mouseY / this.wallSize) * this.wallSize;
        this.moveTower.spriteIndex[0] = this.towerValue;
      } else {
        this.moveTower.pos.x = -50;
        this.moveTower.pos.y = -50;
      }
      for (let i = 0; i < this.towers.length; i++) {
        if (this.towers[i].spriteIndex[0] == 4)
          this.towers[i].update(new Vector(mouseX, mouseY));
      }
    });

    // checking mouse click
    canvas.addEventListener("mouseup", () => {
      let rect = canvas.getBoundingClientRect();
      let mouseX = Math.floor((event.clientX - rect.left) / this.wallSize) * this.wallSize;
      let mouseY = Math.floor((event.clientY - rect.top) / this.wallSize) * this.wallSize;
      // tower place
      out: if (this.towerPressed) {
        this.moveTower.pos.x = -50;
        this.moveTower.pos.y = -50;

        this.towerPressed = false;
        let canPlace = false;
        for (let i = 0; i < this.walls.length; i++) {
          if (this.walls[i].pos.x == mouseX && this.walls[i].pos.y == mouseY &&
            this.walls[i].spriteIndex[1] >= 1) {
            //checks if another tower is there already
            for (let j = 0; j < this.towers.length; j++) {
              if (mouseX == this.towers[j].pos.x && mouseY == this.towers[j].pos.y) {
                notification("Cannot place on another tower",);
                break out;
              }
            }
            let tower;
            if (this.towerValue == 0)
              tower = new TowerA(
                this.canvas,
                this.ctx,
                new Vector(mouseX, mouseY), // position
                new Vector(this.wallSize, this.wallSize) // size
              );
            else if (this.towerValue == 1)
              tower = new TowerB(
                this.canvas,
                this.ctx,
                new Vector(mouseX, mouseY), // position
                new Vector(this.wallSize, this.wallSize) // size
              );
            else if (this.towerValue == 2)
              tower = new TowerC(
                this.canvas,
                this.ctx,
                new Vector(mouseX, mouseY), // position
                new Vector(this.wallSize, this.wallSize) // size
              );
            else if (this.towerValue == 3)
              tower = new TowerD(
                this.canvas,
                this.ctx,
                new Vector(mouseX, mouseY), // position
                new Vector(this.wallSize, this.wallSize) // size
              );
            else if (this.towerValue == 4) {
              tower = new TowerUser (
                this.canvas,
                this.ctx,
                new Vector(mouseX, mouseY), // position
                new Vector(this.wallSize, this.wallSize) // size
              );
            }
            // Add check money here
            if (this.money >= tower.price) {
              this.towers.push(tower);
              if (this.towerValue == 4)
                this.interactions.push(new Interaction (
                  this.towers[this.towers.length - 1].beam
                ));
              this.money -= tower.price;
              canPlace = true;
            } else {
              canPlace = true;
              notification("Not enough money!");
            }

          }
        }
        if (!canPlace) {
          notification("Cannot place a tower here");
        }
        document.getElementById('noTowSelected').classList.remove("hide");
        document.getElementById('towSelected').classList.add("hide");
      } else if (this.upgradePressed) {
        this.upgradePressed = false;
        let canUpgrade = false;

        // if you can't upgrade, then error message
        if (!canUpgrade) {
          notification("No Tower Selected");
        }
      } else {
        let towerGotSelected = false;
        this.towers.forEach((tower) => {
          if (tower.pos.x == mouseX && tower.pos.y == mouseY) {
            towerGotSelected = true;
            document.getElementById('upgradePrice').innerHTML = tower.upgradePrice;
            document.getElementById('sellPrice').innerHTML = (tower.price + (tower.upgradeRate * tower.spriteIndex[1])) * 0.8;
            tower.isSelected = true;
          } else {
            document.getElementById('towerSel').classList.add("hide");
            tower.isSelected = false;
          }
        })
        if (towerGotSelected)
          document.getElementById('towerSel').classList.remove("hide");
      }
    });

    BUTT1.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.add("hide");
      document.getElementById('towSelected').classList.remove("hide");
      this.towerPressed = true;
      this.towerValue = 0;
    });
    BUTT2.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.add("hide");
      document.getElementById('towSelected').classList.remove("hide");
      this.towerPressed = true;
      this.towerValue = 1;
    });
    BUTT3.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.add("hide");
      document.getElementById('towSelected').classList.remove("hide");
      this.towerPressed = true;
      this.towerValue = 2;
    });
    BUTT4.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.add("hide");
      document.getElementById('towSelected').classList.remove("hide");
      this.towerPressed = true;
      this.towerValue = 3;
    });
    BUTT5.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.add("hide");
      document.getElementById('towSelected').classList.remove("hide");
      this.towerPressed = true;
      this.towerValue = 4;
    });
    BUTT6.addEventListener("click", () => {
      this.upgradePressed = true;

      // select then upgrade
      this.towers.forEach((tower) => {
        if (tower.isSelected) {
          let canUpgrade = false;
          if (this.money >= tower.upgradePrice) {
            if (tower.upgrade()) {
              this.money -= tower.upgradePrice - tower.upgradeRate;
              document.getElementById('upgradePrice').innerHTML = tower.upgradePrice;
              document.getElementById('sellPrice').innerHTML = (tower.price + (tower.upgradeRate * tower.spriteIndex[1])) * 0.8;
              canUpgrade = true;
            } else {
              canUpgrade = true;
              notification("Max Upgrade Already Reached");
            }
          } else {
            canUpgrade = true;
            notification("Not enough money");
          }
          this.upgradePressed = false;
          if (!canUpgrade) {
            notification("No Tower Selected");
          }
        }
      });
    });
    BUTT7.addEventListener("click", () => {
      if (this.money >= 50) {
        this.intrest += 3;
        this.money -= 50;
      }
    });
    BUTT8.addEventListener("click", () => {
      this.upgradePressed = true;

      for (let i = 0; i < this.towers.length; i++)
        if (this.towers[i].isSelected) {
          let towerPrice =
            (this.towers[i].price + (this.towers[i].upgradeRate * this.towers[i].spriteIndex[1])) * 0.8;
          this.money += towerPrice;
          this.towers.splice(i, 1);
          document.getElementById('towerSel').classList.add("hide");
          notification("Tower sold for $"+towerPrice);
        }
    });
    BUTT9.addEventListener("click", () => {
      document.getElementById('noTowSelected').classList.remove("hide");
      document.getElementById('towSelected').classList.add("hide");
      this.towerPressed = false;
    });

  }

  // frame loop
  // @override
  loop() {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length
      // console.log(this.fps);
      this.resize()
      this.clear();
      this.update();
      this.draw();
      this.loop();
    });
  }

  // clear the canvas for the next frame
  clear() {
    this.ctx.fillStyle = colours.flat_davys_grey;
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

  }

  // calls all sprites' update methods and updates states
  // @override
  update() {
    if (this.waves.lives != 0) {
      if (this.income) {
        this.income = false;
        this.incomeTime = Date.now();
      } else {
        if (this.incomeTime + 5000 < Date.now()) {
          this.money += this.intrest;
          this.income = true;
        }
      }
      document.getElementById('money').innerHTML = this.money;
      document.getElementById('income').innerHTML = this.intrest;
      this.walls.forEach((sprite, i) => {
        if (sprite.shouldRemove()) {
          this.walls.splice(i, 1);
        } else {
          sprite.update();
        }
      });
      this.towers.forEach((sprite, i) => {
        if (sprite.shouldRemove()) {
          this.walls.splice(i, 1);
        } else if (sprite.spriteIndex[0] != 4) {
          sprite.update();
        } else {
        }
      });
      this.interactions.forEach((interaction) => {
        interaction.update(this.waves.enemies);
      })
      this.waves.update(this.towers);
    }
  }

  // draws all of the sprites to the canvas
  // @override
  draw() {
    if (this.waves.lives == 0) {
      this.ctx.fillStyle = colours.flat_davys_grey;
      this.ctx.fillRect(0, 0, this.size.x, this.size.y);
      this.ctx.fillStyle = colours.flat_electric_blue;
      this.ctx.font = (this.wallSize) + 'px "Press Start 2P"';
      this.ctx.fillText('GAME OVER ', this.canvas.width / 2 - this.wallSize * 4, this.canvas.height / 2);
      this.ctx.font = (this.wallSize)/2 + 'px "Press Start 2P"';
      this.ctx.fillText('You reached wave ' + (this.waves.waveNo - 1), this.canvas.width / 2 - this.wallSize * 4, this.canvas.height / 2 + this.wallSize);
      let enemy = new Sprite (
        this.canvas,
        this.ctx,
        new Vector((this.canvas.width/2) - this.wallSize * 2.5, this.wallSize * 3), // position
        new Vector(0, 0),
        new Vector(this.wallSize * 5, this.wallSize * 5), // size
        new Spritesheet(images.enemy),
        [0, 11]
      );
      enemy.draw();
      document.getElementById('Game').classList.add("hide");
      document.getElementById('GameOver').classList.remove("hide");
    } else {
      this.walls.forEach(sprite => sprite.draw());
      // this.enemywalls.forEach(sprite => sprite.draw());
      this.towers.forEach(sprite => sprite.draw());
      this.waves.draw();
      this.moveTower.draw();
    }
  }

  resize() {
    if (this.resizeX != window.innerWidth || this.resizeY != window.innerHeight) {
      this.resizeX = window.innerWidth;
      this.resizeY = window.innerHeight;
      this.setWallSize();
      this.size = new Vector(this.wallSize * 15, this.wallSize * 20);
      this.canvas.width = this.size.x;
      this.canvas.height = this.size.y;

      // scale coordinates
      this.walls.forEach((sprite) => sprite.resize(this.wallSize));
      // this.enemywalls.forEach((sprite) => sprite.resize(this.wallSize));
      this.towers.forEach((sprite) => sprite.resize(this.wallSize));
      this.waves.resize(this.wallSize);
      this.moveTower.resize(this.wallSize);
    }

  }
}

// ensure everything is executed in order
// public static void main String[]
((_args) => {

  // get the canvas and context
  const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
   load = document.getElementById('load'),
   content = document.getElementById('content');

  setTimeout(() => {
    load.classList.remove('is-active');
    content.style.display = '';
  }, 3000)

  // make the canvas into an object
  const cvs = new CVS(canvas, ctx, 0, 0); // inital size is 0,0 to force the resize method ;)
})();
