import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from 'domain/entities/user/User';

import { CreateUserUseCase } from 'app/useCases/user/createUser/CreateUserUseCase';
import { FindAllUsersUseCase } from 'app/useCases/user/findAllUsers/FindAllUsersUseCase';
import { FindUserByIdUseCase } from 'app/useCases/user/findUserById/FindUserByIdUseCase';

import { CurrentUser } from 'infra/http/decorators/current.decorator';
import { type UserResponseDTO } from 'infra/http/dtos/user/UserResponseDTO';
import { UserModel } from 'infra/http/graphql/models/user.model';
import { GraphQLAuthGuard } from 'infra/http/guard/graphql.guard';
import { UserViewModel } from 'infra/http/view-models/UserViewModel';

import { CreateUserInput } from '../inputs/user.input';

@Resolver()
export class UserResolver {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @Query(() => [UserModel])
  @UseGuards(GraphQLAuthGuard)
  async users(@CurrentUser() { id }: User): Promise<UserResponseDTO[]> {
    const users = await this.findAllUsersUseCase.execute({ id });

    return users.map(user => UserViewModel.toHTTP(user));
  }

  @Query(() => UserModel)
  async user(@Args('id') id: string): Promise<UserResponseDTO> {
    const user = await this.findUserByIdUseCase.execute({ id });

    return UserViewModel.toHTTP(user);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserResponseDTO> {
    const user = await this.createUserUseCase.execute(createUserInput);

    return UserViewModel.toHTTP(user);
  }
}
