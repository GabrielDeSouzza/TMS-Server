import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';
import { OwnDriverUseCases } from 'app/useCases/OwnDriverUseCases/OwnDriverUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { OwnDriverWhereArgs } from 'infra/graphql/entities/OwnDriverGraphql/Args/WhereOwnDriverArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetOwnDriverArgs } from './Args/GetOwnDriverArgs';
import { OwnDriverInput, OwnDriverUpdate } from './OwnDriver.input';
import { OwnDriverModel } from './OwnDriver.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(OwnDriverModel)
export class OwnDriverResolver {
  constructor(
    private ownDriverUseCase: OwnDriverUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
    private userCase: UserUseCases,
  ) {}
  @Query(() => OwnDriverModel, { nullable: true })
  async getOwnDriver(@Args() request: GetOwnDriverArgs) {
    return await this.ownDriverUseCase.getOwnDriver(request);
  }
  @Query(() => [OwnDriverModel])
  async getAllOwnDriver(@Args() args: OwnDriverWhereArgs) {
    return await this.ownDriverUseCase.getAllOwnDriver(args);
  }
  @Mutation(() => OwnDriverModel)
  async createOwnDriver(
    @Args('ownDriverInput') ownDriverInput: OwnDriverInput,
    @CurrentUser() user: User,
  ) {
    ownDriverInput.created_by = user.id;
    ownDriverInput.updated_by = user.id;

    return await this.ownDriverUseCase.createOwnDriver(ownDriverInput);
  }
  @Mutation(() => OwnDriverModel)
  async updateOwnDriver(
    @Args('id') id: string,
    @Args('ownDriverUpdate') ownDriverUpdate: OwnDriverUpdate,
    @CurrentUser() user: User,
  ) {
    ownDriverUpdate.updated_by = user.id;

    return this.ownDriverUseCase.updateOwnDriver(id, ownDriverUpdate);
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OwnDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: OwnDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }

  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(@Parent() ownDriverInput: OwnDriverInput) {
    return await this.naturalPersonUseCase.getNaturalPerson({
      naturalPersonId: ownDriverInput.natural_person_id,
    });
  }
}
