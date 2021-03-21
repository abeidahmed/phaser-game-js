import Phaser from 'phaser';
import BirdAsset from '../assets/bird.png';
import BgAsset from '../assets/bg.png';
import PipeAsset from '../assets/pipe.png';
import PipePairObject from '../models/pipePairObject';
import FlappyBirdObject from '../models/flappyBirdObject';
import { CONFIG_WIDTH, CONFIG_HEIGHT, GROUND_Y } from '../constants';

export default class Playable extends Phaser.Scene {
  constructor() {
    super('playable');
    this.previousFrame = null;
    this.bird = null;
    this.isGameOver = false;
    this.score = 1;
    this.scoreText = null;
    this.gameOverText = null;
    this.pipes = [];
  }

  initializeGame() {
    for (let i = 0; i < 5; i += 1) {
      this.pipes.push(new PipePairObject(this, 500 + i * 400));
    }

    this.bird = new FlappyBirdObject(this);
    this.isGameOver = false;
    this.score = 1;
  }

  destroy() {
    this.bird.destroyBird();

    for (let i = 0; i < this.pipes.length; i += 1) {
      this.pipes[i].destroy();
    }

    this.scoreText.destroy();
    if (this.gameOverText !== null) {
      this.gameOverText.destroy();
    }
    this.bird = null;
    this.pipes = [];
    this.previousFrame = null;
  }

  preload() {
    this.load.image('sky', BgAsset);
    this.load.image('bird', BirdAsset);
    this.load.image('pipe', PipeAsset);
  }

  handleKeyboardDownKeyF() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  create() {
    const s = this.add.image(0, 0, 'sky');
    s.displayOriginX = 0;
    s.displayOriginY = 0;
    s.displayWidth = CONFIG_WIDTH;
    s.displayHeight = CONFIG_HEIGHT;

    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      f: this.input.keyboard.addKey('F'),
    };

    this.keys.f.on('down', this.handleKeyboardDownKeyF, this);

    this.initializeGame();
    this.drawScore();
  }

  update() {
    if (this.isGameOver) {
      return;
    }

    const currentFrame = this.time.now;
    if (this.previousFrame == null) {
      this.previousFrame = currentFrame;
    }

    const timeElapsedInS = (currentFrame - this.previousFrame) / 1000.0;

    this.bird.update(timeElapsedInS, this.keys);

    this.updatePipes(timeElapsedInS);
    this.checkGameOver();

    this.previousFrame = currentFrame;
  }

  checkGameOver() {
    const birdAABB = this.bird.bounds;
    birdAABB.top += 10;
    birdAABB.bottom -= 10;
    birdAABB.left += 10;
    birdAABB.right -= 10;

    if (birdAABB.top >= GROUND_Y || birdAABB.bottom < 0) {
      this.gameOver();
      return;
    }

    for (let i = 0; i < this.pipes.length; i += 1) {
      if (this.pipes[i].intersects(birdAABB)) {
        this.gameOver();
        return;
      }
    }
  }

  updatePipes(timeElapsed) {
    const oldPipeX = this.pipes[0].x + this.pipes[0].width;

    for (let i = 0; i < this.pipes.length; i += 1) {
      this.pipes[i].update(timeElapsed);
    }

    const newPipeX = this.pipes[0].x + this.pipes[0].width;

    if (oldPipeX > 50 && newPipeX <= 50) {
      this.score += 1;
      this.scoreText.text = `Score: ${this.score}`;
    }

    if (this.pipes[0].x + this.pipes[0].width <= 0) {
      const p = this.pipes.shift();
      p.reset(this.pipes[this.pipes.length - 1].x + 200.0);
      this.pipes.push(p);
    }
  }

  gameOver() {
    const text = 'GAME OVER';
    const style = {
      font: '100px Roboto',
      fill: '#FFFFFF',
      align: 'center',
      fixedWidth: CONFIG_WIDTH,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 2,
        fill: true,
      },
    };

    this.gameOverText = this.add.text(0, CONFIG_HEIGHT * 0.25, text, style);
    this.isGameOver = true;
    this.scene.start('game-over', { score: this.score });
  }

  drawScore() {
    const text = 'Score: 1';
    const style = {
      font: '40px Roboto',
      fill: '#FFFFFF',
      align: 'center',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 2,
        fill: true,
      },
    };

    this.scoreText = this.add.text(0, 0, text, style);
  }
}
