//imports
import Vector from '../components/vector';
import Enemy from '../components/enemy';

class Interaction {
  constructor(domain) {
    this.domain = domain;
  }

  update(enemies) {
    this.domain.update(this.domain.mousePos)
    let x1 = this.domain.pos.x;
    let y1 = this.domain.pos.y;
    let x2 = this.domain.mousePos.x;
    let y2 = this.domain.mousePos.y;
    for (let i = 0; i < enemies.length; i++) {
      let c = [enemies[i].pos.x + enemies[i].size.x/2,
        enemies[i].pos.y + enemies[i].size.y/2];
      let r = enemies[i].size.y/2;
      let a = x1 - x2;
      let b = y1 - y2;
      let x = Math.sqrt(a * a + b * b);
      if (Math.abs((c[0] - x1) * (y2 - y1) - (c[1] - y1) * (x2 - x1))/x <= r) {
        this.domain.endPosB = new Vector(this.domain.endPos.x != 0 ? 0 : this.domain.canvas.width,this.domain.endPos.y);
        this.domain.endPos.x = c[0];
        this.domain.endPos.y = c[1];
        enemies[i].health -= this.domain.fire();

        x1 = this.domain.endPos.x;
        y1 = this.domain.endPos.y;
        x2 = this.domain.endPosB.x;
        y2 = this.domain.endPosB.y;
        for (let j = 0; j < enemies.length; j++) {
          if (j==i)
            continue;
          c = [enemies[j].pos.x + enemies[j].size.x/2,
            enemies[j].pos.y + enemies[j].size.y/2];
          r = enemies[j].size.y/2;
          a = x1 - x2;
          b = y1 - y2;
          x = Math.sqrt(a * a + b * b);
          if (Math.abs((c[0] - x1) * (y2 - y1) - (c[1] - y1) * (x2 - x1))/x <= r) {
            this.domain.endPosB.x = c[0];
            this.domain.endPosB.y = c[1];
            enemies[j].health -= this.domain.fire()/2;
          }
        }
        return;
      }
    }
    this.domain.endPosB = this.domain.endPos;
  }

}

export default Interaction;
