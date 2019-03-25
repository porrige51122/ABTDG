// imports
import Sprite from '../types/sprite';

// class Ball
class Ball extends Sprite {
  // init props
  constructor(canvas, ctx, pos, vel, rad, col ) {
    super(canvas, ctx, pos, vel); //call me baby
    this.rad = rad; // radius (pixels)
    this.size = 2*rad; // size = diameter
    this.col = col; // colour
  }

  // @override
  draw() {
    let x = this.pos.getP()[0],
      y = this.pos.getP()[1];
    this.ctx.fillStyle = this.col;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.rad, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  // @override
  update() {
    this.pos.add(this.vel);
  }

  // @override
  shouldRemove() {
    return this.pos.x + this.rad <= 0 ||
      this.pos.y + this.rad <= 0 ||
      this.pos.x - this.rad >= this.canvas.width ||
      this.pos.y - this.rad >= this.canvas.height;
  }
}

export default Ball;
