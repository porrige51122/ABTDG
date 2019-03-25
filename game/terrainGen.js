class TerrainGen {
  constructor(map) {
    this.width = 15;
    this.height = 20;
    this.omap = map;
    this.newmap = new Array(this.width * this.height);
  }

  load() {
    for (let i = 0; i < this.omap.length; i++) {
      let ul = 0;
      let um = 0;
      let ur = 0;
      let mr = 0;
      let ml = 0;
      let dl = 0;
      let dm = 0;
      let dr = 0;
      if (this.omap[i] == 0) {
        if (i <= this.width) {
          if (i != 0)
            ml = this.omap[i - 1];
          mr = this.omap[i + 1];
          dl = this.omap[i - 1 + this.width];
          dm = this.omap[i + this.width];
          dr = this.omap[i + 1 + this.width];
        } else if (i > this.omap.length - this.width) {
          if (i != this.omap.length - 1)
            mr = this.omap[i + 1];
          ml = this.omap[i - 1];
          ul = this.omap[i - 1 - this.width];
          um = this.omap[i - this.width];
          ur = this.omap[i + 1 - this.width];
        } else {
          ml = this.omap[i - 1];
          mr = this.omap[i + 1];
          dl = this.omap[i - 1 + this.width];
          dm = this.omap[i + this.width];
          dr = this.omap[i + 1 + this.width];
          ul = this.omap[i - 1 - this.width];
          um = this.omap[i - this.width];
          ur = this.omap[i + 1 - this.width];
        }

        this.newmap[i] = this.check(ur, um, ul, ml, mr, dr, dm, dl);
      } else {
        this.newmap[i] = 0;
      }
    }
    return this.newmap;
  }

  check(ur, um, ul, ml, mr, dr, dm, dl) {
    let result = 1;
    if (ur == 1)
      result += 128;
    if (um == 1)
      result += 64;
    if (ul == 1)
      result += 32;
    if (ml == 1)
      result += 16;
    if (mr == 1)
      result += 8;
    if (dr == 1)
      result += 4;
    if (dm == 1)
      result += 2;
    if (dl == 1)
      result += 1;
    return result;
  }
}

export default TerrainGen;
