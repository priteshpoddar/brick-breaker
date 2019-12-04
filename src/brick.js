import { detectCollision } from './collisionDetection.js';

export default class Brick {
    constructor(game, postion) {
      this.imageBall = document.getElementById("gameBrick");
  
      this.gameWidth = game.gameWidth;
      this.gameHeight = game.gameHeight;
  
      this.game = game;
      this.position = postion;
  
      this.width = 80;
      this.height = 24;

      this.markedForDelete = false;
    }
  
    draw(ctx) {
      ctx.drawImage(
        this.imageBall,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
      );
    }
  
    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDelete = true;
        }
    }
  }
  