import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Role, User } from '@prisma/client';

import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { OwnDriverInput, OwnDriverUpdate } from './OwnDriver.input';
import { OwnDriverModel } from './OwnDriver.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(Role.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(OwnDriverModel)
export class OwnDriverResolver {
  constructor(
    private ownDriverRepository: OwnDriverRepository,
    private naturalPersonRepository: NaturalPersonRepository,
    private userRepository: UserRepository,
  ) {}
  @Query(() => OwnDriverModel)
  async getOwnDriver(@Args('id') id: string) {
    return await this.ownDriverRepository.findOwnDriverById(id);
  }
  @Query(() => [OwnDriverModel])
  async getAllOwnDriver() {
    return await this.ownDriverRepository.findAllOwnDrivers();
  }
  @Mutation(() => OwnDriverModel)
  async createOwnDriver(
    @Args('ownDriverInput') ownDriverInput: OwnDriverInput,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    ownDriverInput.created_by = user.id;
    ownDriverInput.updated_by = user.id;

    const { NaturalPerson: naturalPerson } = ownDriverInput;

    return await this.ownDriverRepository.createOwnDriver(
      ownDriverInput,
      naturalPerson,
    );
  }
  @Mutation(() => OwnDriverModel)
  async updateOwnDriver(
    @Args('id') id: string,
    @Args('ownDriverUpdate') ownDriverUpdate: OwnDriverUpdate,
    @CurrentUser() user: User,
  ) {
    ownDriverUpdate.updated_by = user.id;

    return this.ownDriverRepository.updateOwnDriver(
      id,
      ownDriverUpdate,
      ownDriverUpdate.NaturalPersonUpdate,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OwnDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: OwnDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }

  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(@Parent() ownDriverInput: OwnDriverInput) {
    console.log(ownDriverInput.natural_person_id);

    return await this.naturalPersonRepository.findNaturalPersonByIdOrCpf(
      ownDriverInput.natural_person_id,
    );
  }
}
