class cactus {
  constructor() {
    this.x = canvas.width + 150;
    this.y = canvas.height - 130
    this.width = 150;
    this.height = 200;
    this.xspeed = 15;
    this.count = 0;
  }
  show() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= this.xspeed;

    if (this.x < player.x) {
      this.count++;
    }

    if (this.count == 1) {
      game.points++;
      pointsDiv.innerHTML = game.points;
    }
  }
}
