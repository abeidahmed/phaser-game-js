import updateScores from './mocks/updateScores.mock';

test('it updates the score of the user successfully', () => {
  const data = updateScores({ name: 'John', score: '10' });
  data.then((res) => {
    expect(res).toMatch(/score created/);
  });
});
