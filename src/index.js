import './stylesheets/index.scss';
import initializeGame from './views/initializeGame';
import flappyBirdGame from './models/flappyBirdGame';

const user = JSON.parse(localStorage.getItem('playerName'));
if (!user) {
  window.addEventListener('DOMContentLoaded', initializeGame);
} else {
  flappyBirdGame();
}
