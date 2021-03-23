import { getScores } from '../api/getScores';

describe('testing getScores api endpoint', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('passes', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        result: [
          {
            name: 'hello',
            score: 9,
          },
        ],
      }),
    );

    const res = await getScores();
    expect(res[0].name).toBe('hello');
    expect(res[0].score).toBe(9);
  });
});
