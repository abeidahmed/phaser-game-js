import { API } from '../constants';

const getScores = async () => {
  try {
    const res = await fetch(`${API}/games/zohCTei0yd8ZDA4xMOqH/scores`, {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
    const serverRes = await res.json();
    return serverRes;
  } catch (error) {
    throw new Error(error);
  }
};

const updateScores = async ({ user, score }) => {
  try {
    const res = await fetch(`${API}/games/zohCTei0yd8ZDA4xMOqH/scores`, {
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
