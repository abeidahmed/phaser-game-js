import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.score = null;
  }

  init({ score }) {
    this.score = score;
  }

  create() {
    console.log(this.score);
  }
}
