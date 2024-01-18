import { Injectable } from '@nestjs/common';

import { hashSync } from 'bcrypt';
import { GraphQLError } from 'graphql';

import { type FindUserWhere } from 'domain/dto/repositories/UserRepositoryDto';
import { type User } from 'domain/entities/User/User';
import { UserRepository } from 'domain/repositories/UserRepository';

import { type getUserDto } from 'app/dtos/user/GetUserDto';

@Injectable()
export class UserCases {
  constructor(private userRepository: UserRepository) {}

  async getAllUser(where: FindUserWhere): Promise<User[]> {
    return await this.userRepository.findAllUsers(where);
  }

  async getUser(search: getUserDto): Promise<User> {
    if (search) {
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
