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
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OwnDriverRepository } from 'domain/repositories/OwnDriverRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { NaturalPersonGraphDTO } from 'infra/graphql/DTO/NaturalPerson';
import { OwnDriverGraphDTO } from 'infra/graphql/DTO/OwnDriverVehicle';
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
    private ownDriverRepository: OwnDriverRepository,
    private naturalPersonRepository: NaturalPersonRepository,
    private userCase: UserUseCases,
  ) {}
  @Query(() => OwnDriverModel)
  async getOwnDriver(@Args() request: GetOwnDriverArgs) {
    return await this.ownDriverRepository.findOwnDriver(request);
  }
  @Query(() => [OwnDriverModel])
  async getAllOwnDriver(@Args() args: OwnDriverWhereArgs) {
    return await this.ownDriverRepository.findAllOwnDrivers({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
  }
  @Mutation(() => OwnDriverModel)
  async createOwnDriver(
    @Args('ownDriverInput') ownDriverInput: OwnDriverInput,
    @CurrentUser() user: User,
  ) {
    ownDriverInput.created_by = user.id;
    ownDriverInput.updated_by = user.id;

    const { NaturalPerson: naturalPerson } = ownDriverInput;
    const ownDriverEntity =
      OwnDriverGraphDTO.createInputToEntity(ownDriverInput);
    const naturalPersonEntity =
      NaturalPersonGraphDTO.createInputToEntity(naturalPerson);

    return await this.ownDriverRepository.createOwnDriver(
      ownDriverEntity,
      naturalPersonEntity,
    );
  }
  @Mutation(() => OwnDriverModel)
  async updateOwnDriver(
    @Args('id') id: string,
    @Args('ownDriverUpdate') ownDriverUpdate: OwnDriverUpdate,
    @CurrentUser() user: User,
  ) {
    ownDriverUpdate.updated_by = user.id;
    const ownDriverEntity =
      OwnDriverGraphDTO.updateInputToEntity(ownDriverUpdate);
    const naturalPersonEntity = ownDriverUpdate.NaturalPersonUpdate
      ? NaturalPersonGraphDTO.updateInputToEntity(
          ownDriverUpdate.NaturalPersonUpdate,
        )
      : undefined;

    return this.ownDriverRepository.updateOwnDriver(
      id,
      ownDriverEntity,
      naturalPersonEntity,
    );
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
    return await this.naturalPersonRepository.findNaturalPerson({
      naturalPersonId: ownDriverInput.natural_person_id,
    });
  }
}
