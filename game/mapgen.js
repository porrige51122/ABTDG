class MapGen {
  constructor(thickness, bends) {
    this.height = 20;
    this.width = 15;
    this.map = new Array(this.height * this.width);
    this.path = new Array(bends + 2);
    this.thickness = thickness;
  }

  generate() {
    this.path[0] = new Array(Math.round(this.width/2), 0)

    this.path[this.path.length - 1] = new Array(Math.round(this.width/2), this.height);

    this.map.fill(0);

    for (let i = 1; i < this.path.length - 1; i++)
      this.path[i] = this.genPoints(Math.round((this.height/(this.path.length - 1)) * i))

    for (let i = 1; i < this.path.length; i++)
      this.drawLine(this.path[i-1][0], this.path[i-1][1], this.path[i][0], this.path[i][1])

    return this.map;
  }

  genPoints(y) {
    let buffer = 2
		return new Array( Math.round(Math.random() * (this.width - (buffer*2)))+buffer, y );

  }

  drawLine(x1, y1, x2, y2) {
    let m;
    const xr = x1 - x2;
    const yr = y1 - y2;

    if (xr != 0)
      m = yr / xr;
    else {
      m = 0;
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
        this.spread(x1, y, this.thickness)
      return;
    }
    let c = Math.round(y1 - (m * x1));
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
      for (let x = Math.min(x1, x2) - 2; x <= Math.max(x1, x2) + 2; x++)
        if (y >= (m * x) + c - Math.abs(m) && y <= (m * x) + c + Math.abs(m))
          this.spread(x, y, this.thickness);
  }

  spread(x, y, limit) {
    limit--;
    if (limit == 0 || x >= this.width - 1 || y >= this.height || x < 1 || y < 0)
      return;
    this.map[(y * this.width) + x] = 1;
    this.spread(x + 1, y, limit);
		this.spread(x, y + 1, limit);
		this.spread(x - 1, y, limit);
		this.spread(x, y - 1, limit);
  }
}

export default MapGen;
