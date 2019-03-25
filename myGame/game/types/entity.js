/**
 * entity.js
 * base class which implements shared methods
 **/

//imports
import Vector from '../components/vector'
import colours from '../objects/colours'

// this represents a thing on the canvas
class Entity {
  // init props (maybe remake this with constructor oveloading)
  constructor(canvas, ctx, pos, vel, size, spritesheet, spriteIndex) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pos = pos || new Vector(0, 0); // if not passed, assign v(0,0)
    this.vel = vel || new Vector(0, 0); // if not passed, assign v(0,0)
    this.size = size || new Vector(0, 0); // if not passed, enitity has 0 width and 0 height
    this.spritesheet = spritesheet || null; // if not passed, no spritesheet
    this.spriteIndex = spriteIndex || null; // if not passed, no spritesIndex
  }

  // default draw method
  draw() {}

  // default update method
  update() {}

  // default shouldRemove method
  shouldRemove() {
    return false;
  }

  // returns a random color
  getRandomColour() {
    let r = (Math.random() * 255 | 0).toString(16);
    let g = (Math.random() * 255 | 0).toString(16);
    let b = (Math.random() * 255 | 0).toString(16);
    return (`#${r,g,b}`);
  }

  // returns a random colour from pallet
  getRandomUiColour() {
    return (this.randomProperty(colours));
  }

  // takes an object and returns a random property
  randomProperty(obj) {
    let keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
  }

  // for debug
  str() {
    return (`
    size = ${this.size}
    pos = ${this.pos.str}
    vel = ${this.vel.str}
    `)
  }
}

export default Entity;
