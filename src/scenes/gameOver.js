import Phaser from 'phaser';
import BgAsset from '../assets/bg.png';
import { CONFIG_WIDTH, CONFIG_HEIGHT } from '../constants';
import leadershipBoard from '../views/leadershipBoard';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  // eslint-disable-next-line class-methods-use-this
  init({ score }) {
    localStorage.setItem('userScore', JSON.stringify(score));
  }

  preload() {
    this.load.image('sky', BgAsset);
  }

  create() {
    const s = this.add.image(0, 0, 'sky');
    s.displayOriginX = 0;
    s.displayOriginY = 0;
    s.displayWidth = CONFIG_WIDTH;
    s.displayHeight = CONFIG_HEIGHT;

    const parentContainer = this.add.dom(0, 0, leadershipBoard());
    parentContainer.displayOriginY = 0;
    parentContainer.displayOriginX = 0;

    this.keys = {
      r: this.input.keyboard.addKey('R'),
    };

    this.keys.r.on(
      'down',
      () => {
        window.location.reload();
      },
      this,
    );
  }
}
