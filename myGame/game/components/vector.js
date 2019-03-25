/**
 * vector.js
 * An advnaced physics rendering engine
 *
 * links on vectors:
 * https://www.3dgep.com/3d-math-primer-for-game-programmers-vector-operations/
 * http://www.fundza.com/vectors/add_subtract/index.html
 * http://www.fundza.com/vectors/normalize/index.html
 * http://www.fundza.com/vectors/point2line/index.html
 **/

// represents direction and length
class Vector {
  // init
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // debug string
  str() {
    return `(${this.x},${this.y})`;
  }

  // check for equivilance
  eq(other) {
    return this.x === other.x && this.y === other.y;
  }

  // check for non-equivilance
  ne(other) {
    return !this.eq(other);
  }

  // return array of x,y coordinates
  getP() {
    return [this.x, this.y];
  }

  // creates a copy so the original vector is not modified
  copy() {
    let v = new Vector(this.x, this.y);
    return v;
  }

  // adds two vectors together (usefull for movement)
  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  // subtracts two vectors
  sub(other) {
    return this.add(-other);
  }

  addNum(x) {
    this.x += x;
    this.y += x;
    return this;
  }

  // subtracts two vectors
  subNum(x) {
    return this.addNum(-x);
  }

  // takes two vectors and returns a single val
  // if dot product == 0 then vectors are perpendicular
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  // mutliplies vector by a scale factor
  // changes vector len not dir
  multiply(k) {
    this.x *= k;
    this.y *= k;
    return this;
  }

  // results in a vector of the same magnitude, but opposite in direction.
  negate() {
    return this.multiply(-1);
  }

  // div vector by a sf
  divide(k) {
    this.multiply(1 / k);
  }

  // returns a unit vector [1,1]or[1,0]or[0,1]or[0,0]
  // express vectors only by direction and not by length.
  normalize() {
    return this.divide(this.len());
  }

  // trig, caclulates len (useful for collisions)
  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  length(other) {
    return Math.sqrt(Math.pow((other.x - this.x), 2) + Math.pow((other.y - this.y), 2));
  }

  // inverts vector direction
  reflect(normal) {
    let n = normal.copy();
    n.multiply(2 * this.dot(normal));
    this.sub(n);
    return this;
  }

  rotate(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }
}

export default Vector
