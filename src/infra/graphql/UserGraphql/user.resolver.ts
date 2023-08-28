import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GraphQLError } from 'graphql';

import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserInput } from './user.input';
import { UserModel } from './user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userRepository: UserRepository) {}
  @Query(() => UserModel, { name: 'user' })
  async getUserForId(
    @Args('id', { nullable: true }) id?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {
    if (id) {
      return await this.userRepository.findUserById(id);
    }

    if (email) {
      return await this.userRepository.findUserByEmail(email);
    }

    throw new GraphQLError('ID OR EMAIL IS REQUIRED');
  }
  @Query(() => [UserModel], { name: 'users' })
  async getAllUsers() {
    return this.userRepository.findAllUsers();
  }
  @Mutation(() => UserModel)
  async createUSer(@Args('createUserInput') createUserInput: UserInput) {
    return await this.userRepository.createUSer(createUserInput);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('id') updateUserInput: UserInput) {
    return await this.userRepository.updateUser(updateUserInput);
  }
}
