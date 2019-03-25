/**
 * spritesheet.js
 * A sheet for sprites
 **/

class Spritesheet {
  constructor(image) {
    this.img = image.img;
    this.rows = image.rows; // number of sprites in a row
    this.columns = image.columns; // number of sprites in a column
    this.frameSize = [(this.img.width / this.columns) >> 0, (this.img.height / this.rows) >> 0]; // width and hight of sprite
    this._frameCentre = [this.frameSize[0] / 2, this.frameSize[1] / 2]; // center of the image (not currently used)
  }

  // this method takes index and returns the corresponding sprite image
  getSpriteImage(index) {
    return ({
      sx: this.frameSize[0] * index[0], // x-axis coordinate of the top left corner of the sub-rectangle of the source image
      sy: this.frameSize[1] * index[1], // y-axis coordinate of the top left corner of the sub-rectangle of the source image
      swidth: this.frameSize[0], // width of the sub-rectangle of the source image
      sheight: this.frameSize[1] // hieght of the sub-rectangle of the source image
    });
  }
}

export default Spritesheet;
