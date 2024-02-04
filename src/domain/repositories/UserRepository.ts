import { type FindUserWhere } from 'domain/dto/repositories/whereDtos/UserRepositoryDto';

import { type User } from '../entities/User/User';

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<User>;
  abstract createUSer(user: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract updateUser(id: string, user: User): Promise<User>;
  abstract findAllUsers(where: FindUserWhere): Promise<User[]>;
}
