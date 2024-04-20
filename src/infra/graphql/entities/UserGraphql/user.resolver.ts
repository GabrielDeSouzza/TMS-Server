import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GraphQLUpload } from 'graphql-upload-minimal';

import { ROLE } from 'domain/entities/User/User';
import { FileUploadDTO } from 'domain/shared/dtos/FileUploadDto';

import { UserUseCases } from 'app/useCases/user/UserCases';

import {
  UserCountArgs,
  UserWhereArgs,
} from 'infra/graphql/entities/UserGraphql/Args/WhereUserArgs';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { AcessAllowed } from '../../utilities/decorators/AcessAllowed';
import { RoleInterceptor } from '../../utilities/interceptors/RoleInterceptor';
import { getUserArgs } from './Args/GetUserArgs';
import { UserUpdateManyInput, UserInput, UserUpdateInput } from './user.input';
import { UserModel, UserModelRefereces } from './user.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.ADMIN)
@UseInterceptors(RoleInterceptor)
@Resolver(() => UserModel || UserModelRefereces)
export class UserResolver {
  constructor(private userCases: UserUseCases) {}

  @Query(() => UserModel || UserModelRefereces, { name: 'user' })
  async getUser(@Args() request: getUserArgs) {
    const user = await this.userCases.getUser(request);

    return user;
  }

  @Query(() => Number)
  async totalUsers(@Args() request: UserCountArgs) {
    const user = await this.userCases.count(request);

    return user;
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
  async createUser(
    @Args('createUserInput') createUserInput: UserInput,
    @Args('avatar', { nullable: true, type: () => GraphQLUpload })
    avatar: FileUploadDTO,
  ) {
    return await this.userCases.createUser(createUserInput, avatar);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('id') id: string,
    @Args('userUpdate') updateUserInput: UserUpdateInput,
    @Args('avatar', { nullable: true, type: () => GraphQLUpload })
    avatar: FileUploadDTO,
  ) {
    return await this.userCases.updateUser(id, updateUserInput, avatar);
  }

  @Mutation(() => [UserModel])
  async updateManyUsers(
    @Args({ name: 'updateManyUsers', type: () => [UserUpdateManyInput] })
    updateUserInput: UserUpdateManyInput[],
  ) {
    return await this.userCases.updateManyUsers(updateUserInput);
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return await this.userCases.deleteUser(id);
  }

  @Mutation(() => [UserModel])
  async deleteManyUsers(
    @Args({ name: 'deleteManyUsers', type: () => [String] }) ids: string[],
  ) {
    return await this.userCases.deleteManyUsers(ids);
  }
}
