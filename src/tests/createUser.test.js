import createUser from './mocks/createUser.mock';

test('it creates a new user and returns the game key', () => {
  const res = createUser();
  res.then((serverRes) => {
    expect(serverRes).toMatch(/(Game with ID).*(added)/);
  });
});
