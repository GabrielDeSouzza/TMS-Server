import { InMemoryAuthRepository } from '@test/repositories/in-memory-auth-repository';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';

import { User } from 'domain/entities/user/User';

import { AuthUserUseCase } from './AuthUserUseCase';

describe('Sign In User', () => {
  it('should be able signin a user with use case', async () => {
    const usersRepository = new InMemoryUserRepository();

    const password = '123456';

    const user = await usersRepository.create(
      new User({
        email: 'wrong1@gmail.com',
        password,
        name: 'Gabriel Guedes',
        role: 'ADMIN',
        username: 'Gabriel Guedes',
      }),
    );

    const inMemoryAuthRepository = new InMemoryAuthRepository(usersRepository);

    const authUserUseCase = new AuthUserUseCase(inMemoryAuthRepository);

    const userLogged = await authUserUseCase.execute({
      email: user.email,
      password,
    });

    expect(userLogged.token).toBeTruthy();
  });

  it('should not be able signin a user when email is wrong', async () => {
    const usersRepository = new InMemoryUserRepository();

    const password = '123456';

    const user = await usersRepository.create(
      new User({
        email: 'wrong1@gmail.com',
        password,
        name: 'Gabriel Guedes',
        role: 'ADMIN',
        username: 'Gabriel Guedes',
      }),
    );

    const inMemoryAuthRepository = new InMemoryAuthRepository(usersRepository);

    const authUserUseCase = new AuthUserUseCase(inMemoryAuthRepository);

    await expect(
      async () =>
        await authUserUseCase.execute({
          email: '111111111',
          password: user.password,
        }),
    ).rejects.toThrow('E-mail not found!');
  });

  it('should not be able signin a user when password is wrong', async () => {
    const usersRepository = new InMemoryUserRepository();

    const password = '123456';
    const passwordWrong = '000000';

    const user = await usersRepository.create(
      new User({
        email: 'wrong1@gmail.com',
        password,
        name: 'Gabriel Guedes',
        role: 'ADMIN',
        username: 'Gabriel Guedes',
      }),
    );

    const inMemoryAuthRepository = new InMemoryAuthRepository(usersRepository);

    const authUserUseCase = new AuthUserUseCase(inMemoryAuthRepository);

    await expect(
      async () =>
        await authUserUseCase.execute({
          email: user.email,
          password: passwordWrong,
        }),
    ).rejects.toThrow('Password incorrect!');
  });
});
