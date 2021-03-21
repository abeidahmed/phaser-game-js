import Phaser from 'phaser';
import { CONFIG_WIDTH, CONFIG_HEIGHT } from '../constants';
import Playable from '../scenes/playable';
import GameOver from '../scenes/gameOver';

const flappyBirdGame = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    dom: {
      createContainer: true,
    },
    scene: [GameOver],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: CONFIG_WIDTH,
      height: CONFIG_HEIGHT,
    },
  };

  return new Phaser.Game(config);
};

export default flappyBirdGame;
