import { Injectable } from '@nestjs/common';

import { hashSync } from 'bcrypt';
import { GraphQLError } from 'graphql';

import { type getUserDto } from 'domain/dto/repositories/getDataDtos/GetUserDto';
import { type FindUserWhere } from 'domain/dto/repositories/whereDtos/UserRepositoryDto';
import { type User } from 'domain/entities/User/User';
import { UserRepository } from 'domain/repositories/UserRepository';

@Injectable()
export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async getAllUser(where: FindUserWhere): Promise<User[]> {
    return await this.userRepository.findAllUsers(where);
  }

  async getUser(search: getUserDto): Promise<User> {
    if (!search.id && !search.email) {
      throw new GraphQLError('Is necessary  to provide an ID or EMAIL');
    }

    if (search.id) {
      const user = await this.userRepository.findUserById(search.id);

      if (user) return user;

      throw new GraphQLError('User not Found');
    } else {
      const user = await this.userRepository.findUserByEmail(search.email);
      if (user) return user;

      throw new GraphQLError('User not Found');
    }
  }

  async createUser(newUser: User): Promise<User> {
    newUser.password = hashSync(newUser.password, 10);

    return this.userRepository.createUSer(newUser);
  }

  async updateUser(id: string, user: User): Promise<User> {
    if (user.password) {
      user.password = hashSync(user.password, 10);
    }

    return this.userRepository.updateUser(id, user);
  }
}
