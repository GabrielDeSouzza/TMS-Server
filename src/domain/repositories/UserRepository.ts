import { type IUser, type User } from '../entities/user/User';

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<User>;
  abstract createUSer(
    user: Omit<IUser, 'updated_at' | 'created_at' | 'id'>,
  ): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract updateUser(id: string, user: Partial<IUser>): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
}
