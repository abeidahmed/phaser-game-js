import getScores from './mocks/getScores.mock';

test('it returns all the users', () => {
  const res = getScores();
  res.then((users) => {
    expect(typeof users).toBe(Array);
  });
});
