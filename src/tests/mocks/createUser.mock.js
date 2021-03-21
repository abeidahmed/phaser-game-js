import { API } from '../../constants';

const createUser = async () => {
  try {
    const res = await fetch(`${API}/games/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: 'Testing',
      }),
    });
    const serverRes = await res.json();

    return serverRes;
  } catch (error) {
    throw new Error(error);
  }
};

export default createUser;
