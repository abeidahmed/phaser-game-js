const leadershipBoard = () => {
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

  return container;
};

export default leadershipBoard;
