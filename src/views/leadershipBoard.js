import getScores from '../api/getScores';

const renderScores = async (ul) => {
  const liLoading = document.createElement('li');
  liLoading.classList.add('loading-content');
  const loadingSpan = document.createElement('span');
  loadingSpan.textContent = 'Leaderboard is loading. Please wait...';
  liLoading.append(loadingSpan);

  ul.append(liLoading);

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
  } finally {
    liLoading.remove();
  }
};

const leadershipBoard = () => {
  const container = document.createElement('div');
  container.classList.add('leaderboard-container');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('leaderboard-inner-container');
  container.append(innerContainer);

  const title = document.createElement('h1');
  title.textContent = 'Showing top 10 scorers';
  innerContainer.append(title);

  const info = document.createElement('span');
  info.textContent = "Press 'r' to restart the game";
  innerContainer.append(info);

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
