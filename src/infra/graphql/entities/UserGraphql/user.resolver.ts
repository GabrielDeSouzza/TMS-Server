import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { hashSync } from 'bcrypt';
import { GraphQLError } from 'graphql';

import { ROLE } from 'domain/entities/User/User';

import { FindAllUserUseCase } from 'app/useCases/user/FindAllUserUseCase';

import { UserWhereArgs } from 'infra/graphql/args/UserArgs';
import { UserGraphDTO } from 'infra/graphql/DTO/User';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserRepository } from '../../../../domain/repositories/UserRepository';
import { AcessAllowed } from '../../utilities/decorators/AcessAllowed';
import { RoleInterceptor } from '../../utilities/interceptors/RoleInterceptor';
import { UserInput, UserUpdateInput } from './user.input';
import { UserModel } from './user.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.ADMIN)
@UseInterceptors(RoleInterceptor)
@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private findAll: FindAllUserUseCase,
  ) {}
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
  async getAllUsers(@Args() args: UserWhereArgs) {
    return this.findAll.execute({
      where: args.where,
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
    });
  }

  @Mutation(() => UserModel)
  async createUSer(@Args('createUserInput') createUserInput: UserInput) {
    createUserInput.password = hashSync(createUserInput.password, 10);
    const user = UserGraphDTO.createInputToEntity(createUserInput);

    return await this.userRepository.createUSer(user);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('id') id: string,
    @Args('userUpdate') updateUserInput: UserUpdateInput,
  ) {
    const user = UserGraphDTO.updateInputToEntity(updateUserInput);

    return await this.userRepository.updateUser(id, user);
  }
}
