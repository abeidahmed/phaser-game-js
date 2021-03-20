import flappyBirdGame from '../models/flappyBirdGame';

const initializeGame = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const title = document.createElement('h1');
  title.classList.add('container-title');
  title.textContent = 'Welcome to Flappy Bird!';

  const form = document.createElement('form');
  form.classList.add('play-form');

  const formInput = document.createElement('input');
  formInput.setAttribute('type', 'text');
  formInput.setAttribute('placeholder', 'Enter your name...');
  formInput.setAttribute('required', '');
  formInput.classList.add('play-input');

  const formBtn = document.createElement('button');
  formBtn.setAttribute('type', 'submit');
  formBtn.textContent = 'PLAY GAME';
  formBtn.classList.add('play-btn');

  form.append(title);
  form.append(formInput);
  form.append(formBtn);
  container.append(form);

  document.body.prepend(container);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    container.remove();
    localStorage.setItem('playerName', JSON.stringify(formInput.value));
    flappyBirdGame();
  });
};

export default initializeGame;
