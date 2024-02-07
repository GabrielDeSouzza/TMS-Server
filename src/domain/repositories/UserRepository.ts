import { type getUserDto } from 'domain/dto/repositories/getDataDtos/GetUserDto';
import { type FindAllUserWhereRequestDTO } from 'domain/dto/repositories/whereDtos/UserRepositoryDto';

import { type User } from '../entities/User/User';

export abstract class UserRepository {
  abstract findUser(request: getUserDto): Promise<User>;
  abstract createUser(user: User): Promise<User>;
  abstract updateUser(id: string, user: User): Promise<User>;
  abstract findAllUsers(where: FindAllUserWhereRequestDTO): Promise<User[]>;
}
