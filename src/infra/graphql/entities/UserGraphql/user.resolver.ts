import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { UserGraphDTO } from 'infra/graphql/DTO/User';
import { UserWhereArgs } from 'infra/graphql/entities/UserGraphql/Args/WhereUserArgs';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { AcessAllowed } from '../../utilities/decorators/AcessAllowed';
import { RoleInterceptor } from '../../utilities/interceptors/RoleInterceptor';
import { getUserArgs } from './Args/GetUserArgs';
import { UserInput, UserUpdateInput } from './user.input';
import { UserModel, UserModelRefereces } from './user.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.ADMIN)
@UseInterceptors(RoleInterceptor)
@Resolver(() => UserModel || UserModelRefereces)
export class UserResolver {
  constructor(private userCases: UserUseCases) {}
  @Query(() => UserModel || UserModelRefereces, { name: 'user' })
  async getUser(@Args() request: getUserArgs) {
    return await this.userCases.getUser(request);
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
