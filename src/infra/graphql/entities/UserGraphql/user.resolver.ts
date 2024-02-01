import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { UserWhereArgs } from 'infra/graphql/args/UserArgs';
import { UserGraphDTO } from 'infra/graphql/DTO/User';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { AcessAllowed } from '../../utilities/decorators/AcessAllowed';
import { RoleInterceptor } from '../../utilities/interceptors/RoleInterceptor';
import { UserInput, UserUpdateInput } from './user.input';
import { UserModel, UserModelRefereces } from './user.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.ADMIN)
@UseInterceptors(RoleInterceptor)
@Resolver(() => UserModel || UserModelRefereces)
export class UserResolver {
  constructor(private userCases: UserUseCases) {}
  @Query(() => UserModel || UserModelRefereces, { name: 'user' })
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {
    return await this.userCases.getUser({ email, id });
  }
  @Query(() => [UserModel], { name: 'users' })
  async getAllUsers(@Args() args: UserWhereArgs) {
    return await this.userCases.getAllUser({
      where: args.where,
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
    });
  }

  @Mutation(() => UserModel)
  async createUSer(@Args('createUserInput') createUserInput: UserInput) {
    const user = UserGraphDTO.createInputToEntity(createUserInput);

    return await this.userCases.createUser(user);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('id') id: string,
    @Args('userUpdate') updateUserInput: UserUpdateInput,
  ) {
    const user = UserGraphDTO.updateInputToEntity(updateUserInput);

    return await this.userCases.updateUser(id, user);
  }
}
