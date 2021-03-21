import { API } from '../constants';

const sorter = (object) => object.sort((a, b) => (a.score > b.score ? -1 : 1));

const getScores = async () => {
  try {
    const res = await fetch(`${API}/games/XAaxay46daPVy7fbxR3j/scores`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    const { result } = await res.json();
    return sorter(result);
  } catch (error) {
    throw new Error(error);
  }
};

const updateScores = async ({ user, score }) => {
  try {
    const res = await fetch(`${API}/games/XAaxay46daPVy7fbxR3j/scores`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    });
    await res.json();

    return getScores();
  } catch (error) {
    throw new Error(error);
  }
};

export default updateScores;
