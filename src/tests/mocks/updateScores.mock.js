import { API } from '../../constants';

const updateScores = async ({ user, score }) => {
  try {
    const res = await fetch(`${API}/games/PeVDSytp5BQMlIq7YQsR/scores`, {
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
    const response = await res.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default updateScores;
