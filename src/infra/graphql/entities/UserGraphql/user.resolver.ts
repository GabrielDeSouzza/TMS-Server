import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GraphQLUpload } from 'graphql-upload-minimal';

import { ROLE } from 'domain/entities/User/User';
import { FileUploadDTO } from 'domain/shared/dtos/FileUploadDto';

import { UserUseCases } from 'app/useCases/user/UserCases';

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
}
