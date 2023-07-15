import { User } from './User';

describe('User', () => {
  it('should create user', () => {
    const user = new User({
      email: 'gabrielrguedess@gmail.com',
      name: 'Gabriel Guedes',
      password: '1234',
      role: 'ADMIN',
      username: 'GabrielGuedess',
    });

    expect(user).toBeTruthy();
  });
});
