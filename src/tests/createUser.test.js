import createUser from '../api/createUser';

describe('testing createUser api endpoint', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('creates a user', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: 'Created user' }));
    const res = await createUser('John Doe');

    expect(res.result).toBe('Created user');
  });
});
