import './stylesheets/index.scss';
import FlappyBirdGame from './models/flappyBirdGame';

const container = document.createElement('div');
container.classList.add('container');

const title = document.createElement('h1');
title.classList.add('container-title');
title.textContent = 'Welcome to Flappy Bird!';

container.append(title);

const form = document.createElement('form');
form.classList.add('play-form');

const formInput = document.createElement('input');
formInput.setAttribute('type', 'text');
formInput.setAttribute('placeholder', 'Enter your name...');
formInput.classList.add('play-input');

const formBtn = document.createElement('button');
formBtn.setAttribute('type', 'submit');
formBtn.textContent = 'PLAY GAME';
formBtn.classList.add('play-btn');

form.append(formInput);
form.append(formBtn);
container.append(form);

document.body.prepend(container);

// eslint-disable-next-line no-new
// new FlappyBirdGame();
