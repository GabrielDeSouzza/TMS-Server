import { type User } from 'domain/entities/user/User';
import { type UserRepository } from 'domain/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    const isUserExist = this.users.some(item => item.id === user.id);

    if (isUserExist) {
      throw new Error('User already exists!');
    }

    this.users.push(user);

    return user;
  }

  async findAllUser(userId: string): Promise<User[]> {
    const currentUser = this.users.find(user => user.id === userId);

    if (!currentUser) {
      throw new Error('User does not exist!');
    }

    return this.users;
  }

  async findUserById(id: string): Promise<User> {
    const user = this.users.find(item => item.id === id);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find(item => item.email === email);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }
}
