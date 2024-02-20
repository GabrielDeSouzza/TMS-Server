import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Mutation,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';
import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetPhysicalCustomerArgs } from './Args/GetPhysicalCustomerArgs';
import { PhysicalCustomerWhereArgs } from './Args/GetPhysicalCustomerWhereArgs';
import {
  PhysicalCustomerInput,
  PhysicalCustomerUpdateInput,
} from './PhysicalCustomer.input';
import { PhysicalCustomerModel } from './PhysicalCustomer.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(PhysicalCustomerModel)
export class PhysicalCustomerResolver {
  constructor(
    private physicalCustomerUseCase: PhysicalCustomerUseCases,
    private userCase: UserUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  @Query(() => PhysicalCustomerModel, { nullable: true })
  async getPhysicalCustomer(@Args() request: GetPhysicalCustomerArgs) {
    return await this.physicalCustomerUseCase.getPhysicalCustomer(request);
  }
  @Query(() => [PhysicalCustomerModel])
  async getAllPhysicalCustomer(@Args() args: PhysicalCustomerWhereArgs) {
    return await this.physicalCustomerUseCase.getAllPhysicalCustomer(args);
  }
  @Mutation(() => PhysicalCustomerModel)
  async createPhysicalCustomer(
    @Args('data') physicalCustomerInput: PhysicalCustomerInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerInput.created_by = user.id;
    physicalCustomerInput.updated_by = user.id;

    return await this.physicalCustomerUseCase.createPhysicalCustomer(
      physicalCustomerInput,
    );
  }
  @Mutation(() => PhysicalCustomerModel)
  async updatePhysicalCustomer(
    @Args('id') id: string,
    @Args('ownDriverUpdate') physicalCustomerInput: PhysicalCustomerUpdateInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerInput.updated_by = user.id;

    return this.physicalCustomerUseCase.updatePhysicalCustomer(
      id,
      physicalCustomerInput,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: PhysicalCustomerModel) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: PhysicalCustomerModel) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(@Parent() physicalCustomerInput: PhysicalCustomerModel) {
    return await this.naturalPersonUseCase.getNaturalPerson({
      naturalPersonId: physicalCustomerInput.natural_person_id,
    });
  }
}
