import getScores from '../api/getScores';

const renderScores = async (ul) => {
  try {
    const user = JSON.parse(localStorage.getItem('playerName'));
    const score = JSON.parse(localStorage.getItem('userScore'));
    const result = await getScores({ user, score });

    result.forEach((player) => {
      const playerStats = document.createElement('li');
      const playerNameTitle = document.createElement('div');
      playerNameTitle.textContent = player.user;

      const playerScore = document.createElement('div');
      playerScore.textContent = player.score;
      playerStats.append(playerNameTitle);
      playerStats.append(playerScore);

      ul.append(playerStats);
    });
  } catch (error) {
    throw new Error(error);
  }
};

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

  ul.append(li);
  renderScores(ul);

  innerContainer.append(ul);

  return container;
};

export default leadershipBoard;
