import { type User } from '../entities/user/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findAllUser(id: string): Promise<User[]>;
  abstract findUserById(id: string): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
}
