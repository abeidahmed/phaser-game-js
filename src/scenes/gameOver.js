import Phaser from 'phaser';
import BgAsset from '../assets/bg.png';
import { CONFIG_WIDTH, CONFIG_HEIGHT } from '../constants';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.score = null;
  }

  init({ score }) {
    this.score = score;
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

    const container = document.createElement('div');
    container.classList.add('leaderboard-container');

    const innerContainer = document.createElement('div');
    innerContainer.classList.add('leaderboard-inner-container');
    container.append(innerContainer);

    const title = document.createElement('h1');
    title.textContent = 'Leadership board';
    innerContainer.append(title);

    const ul = document.createElement('ul');
    ul.classList.add('box');
    const li = document.createElement('li');
    const liTitle = document.createElement('div');
    liTitle.textContent = 'Username';
    const liScoreTitle = document.createElement('div');
    liScoreTitle.textContent = 'Score';
    li.append(liTitle);
    li.append(liScoreTitle);

    const playerStats = document.createElement('li');
    const playerNameTitle = document.createElement('div');
    playerNameTitle.textContent = 'Abeid Ahmed';

    const playerScore = document.createElement('div');
    playerScore.textContent = '40';
    playerStats.append(playerNameTitle);
    playerStats.append(playerScore);

    ul.append(li);
    ul.append(playerStats);

    innerContainer.append(ul);

    const parentContainer = this.add.dom(0, 0, container);
    parentContainer.displayOriginY = 0;
    parentContainer.displayOriginX = 0;
  }
}
