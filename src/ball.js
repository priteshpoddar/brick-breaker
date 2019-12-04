import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.imageBall = document.getElementById("gameBall");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.reset();
    this.size = 16;
  }

  reset() {
    this.speed = {
      x: 4,
      y: -2
    };

    this.position = {
      x: 10,
      y: 400
    };
  }

  draw(ctx) {
    ctx.drawImage(this.imageBall, this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // To bounce off ball from top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    // To detect game over
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // To bounce off ball from left and right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
