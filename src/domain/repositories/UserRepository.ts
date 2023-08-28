import { type IUser, type User } from '../entities/user/User';

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<User>;
  abstract createUSer(user: IUser): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract updateUser(user: IUser): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
}
