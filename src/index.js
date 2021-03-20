import './stylesheets/index.scss';
import Phaser from 'phaser';
import BirdAsset from './assets/bird.png';
import BgAsset from './assets/bg.png';
import PipeAsset from './assets/pipe.png';

import { CONFIG_WIDTH, CONFIG_HEIGHT, GROUND_Y } from './constants';
import FlappyBirdObject from './models/flappyBirdObject';
import PipePairObject from './models/pipePairObject';

class FlappyBirdGame {
  constructor() {
    this.game = this.createGame();
    this.previousFrame = null;
    this.bird = null;
    this.isGameOver = false;
    this.score = 0;
    this.scoreText = null;
    this.gameOverText = null;
    this.pipes = [];
  }

  destroy() {
    this.bird.destroy();

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

  init() {
    for (let i = 0; i < 5; i += 1) {
      this.pipes.push(new PipePairObject(this.scene, 500 + i * 250));
    }

    this.bird = new FlappyBirdObject(this.scene);
    this.isGameOver = false;
    this.score = 0;
  }

  createGame() {
    const self = this;
    const config = {
      type: Phaser.AUTO,
      scene: {
        preload() {
          self.onPreload(this);
        },
        create() {
          self.onCreate();
        },
        update() {
          self.onUpdate(this);
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: CONFIG_WIDTH,
        height: CONFIG_HEIGHT,
      },
    };

    return new Phaser.Game(config);
  }

  onPreload(scene) {
    this.scene = scene;
    this.scene.load.image('sky', BgAsset);
    this.scene.load.image('bird', BirdAsset);
    this.scene.load.image('pipe', PipeAsset);
  }

  handleKeyboardDownKeyF() {
    if (this.scene.scale.isFullscreen) {
      this.scene.scale.stopFullscreen();
    } else {
      this.scene.scale.startFullscreen();
    }
  }

  handleKeyboardDownKeyR() {
    this.destroy();
    this.init();
    this.drawScore();
  }

  onCreate() {
    const s = this.scene.add.image(0, 0, 'sky');
    s.displayOriginX = 0;
    s.displayOriginY = 0;
    s.displayWidth = CONFIG_WIDTH;
    s.displayHeight = CONFIG_HEIGHT;

    this.keys = {
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      f: this.scene.input.keyboard.addKey('F'),
      r: this.scene.input.keyboard.addKey('R'),
    };

    this.keys.f.on('down', this.handleKeyboardDownKeyF, this);
    this.keys.r.on('down', this.handleKeyboardDownKeyR, this);

    this.init();
    this.drawScore();
  }

  onUpdate(scene) {
    if (this.isGameOver) {
      return;
    }

    const currentFrame = scene.time.now;
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

    if (birdAABB.top >= GROUND_Y) {
      this.gameOver();
      return;
    }

    for (let i = 0; i < this.pipes.length; i += 1) {
      if (this.pipes[i].intersects(birdAABB)) {
        this.pipes[i].intersects(birdAABB);
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

    this.gameOverText = this.scene.add.text(
      0,
      CONFIG_HEIGHT * 0.25,
      text,
      style,
    );
    this.isGameOver = true;
  }

  drawScore() {
    const text = 'Score: 0';
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

    this.scoreText = this.scene.add.text(0, 0, text, style);
  }
}

// eslint-disable-next-line no-new
new FlappyBirdGame();
