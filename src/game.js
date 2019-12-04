import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

import { buildLevel, level1 } from './level.js';

const GAME_STATE = {
  RUNNING: 0,
  PAUSED: 1,
  MENU: 2,
  GAMEOVER: 3,
}

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAME_STATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObject = [];

    this.lives = 3;

    new InputHandler(this.paddle, this);

  }

  start() {
    if(this.gameState !== GAME_STATE.MENU) return;

    const bricks = buildLevel(this, level1);
    this.gameObject = [this.ball, this.paddle, ...bricks];
    this.gameState = GAME_STATE.RUNNING;
  }

  update(deltaTime) {

    if(this.lives === 0) this.gameState = GAME_STATE.GAMEOVER;

    if(
      this.gameState === GAME_STATE.PAUSED
      || this.gameState === GAME_STATE.MENU
      || this.gameState === GAME_STATE.GAMEOVER
      ) return;
    
    this.gameObject.forEach(object => {
      object.update(deltaTime);
    });

    this.gameObject = this.gameObject.filter(object => !object.markedForDelete);
  }

  draw(ctx) {
    this.gameObject.forEach(object => {
      object.draw(ctx);
    });

    if(this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
    }

    if(this.gameState === GAME_STATE.MENU) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0)'
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Press SPACEBAR to start', this.gameWidth / 2, this.gameHeight / 2);
    }

    if(this.gameState === GAME_STATE.GAMEOVER) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0)'
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
    }

  }

  togglePause() {
    if(this.gameState === GAME_STATE.RUNNING) {
      this.gameState = GAME_STATE.PAUSED;
    } else {
      this.gameState = GAME_STATE.RUNNING;
    }
  }
}
