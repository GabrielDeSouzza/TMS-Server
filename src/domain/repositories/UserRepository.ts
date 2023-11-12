import { type User } from '../entities/user/User';

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<User>;
  abstract createUSer(user: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract updateUser(id: string, user: User): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
}
