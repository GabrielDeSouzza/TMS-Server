import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { PhysicalCustomerCteUseCase } from 'app/useCases/PhysicalCustomerCteUseCase/PhysicalCustomerCteUseCase';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetPhysicalCustomerCteArgs } from './Args/GetPhysicalCustomerCteArgs';
import { PhysicalCustomerCteWhereArgs } from './Args/GetPhysicalCustomerCteWhereArgs';
import {
  PhysicalCustomerCteInput,
  PhysicalCustomerCteUpdateInput,
} from './PhysicalCustomerCte.input';
import { PhysicalCustomerCteModel } from './PhysicalCustomerCte.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(PhysicalCustomerCteModel)
export class PhysicalCustomerCteResolver {
  constructor(private physicalCustomerCteUseCase: PhysicalCustomerCteUseCase) {}
  @Query(() => PhysicalCustomerCteModel, { nullable: true })
  async getPhysicalCustomerCte(@Args() request: GetPhysicalCustomerCteArgs) {
    return await this.physicalCustomerCteUseCase.getPhysicalCustomerCte(
      request,
    );
  }
  @Query(() => [PhysicalCustomerCteModel])
  async getAllPhysicalCustomerCte(@Args() args: PhysicalCustomerCteWhereArgs) {
    return await this.physicalCustomerCteUseCase.getAllPhysicalCustomerCte(
      args,
    );
  }
  @Mutation(() => PhysicalCustomerCteModel)
  async createPhysicalCustomerCte(
    @Args('data') physicalCustomerCteInput: PhysicalCustomerCteInput,
  ) {
    return await this.physicalCustomerCteUseCase.createPhysicalCustomerCte(
      physicalCustomerCteInput,
    );
  }
  @Mutation(() => PhysicalCustomerCteModel)
  async updatePhysicalCustomerCte(
    @Args('id') id: string,
    @Args('ownDriverUpdate')
    physicalCustomerCteInput: PhysicalCustomerCteUpdateInput,
  ) {
    return this.physicalCustomerCteUseCase.updatePhysicalCustomerCte(
      id,
      physicalCustomerCteInput,
    );
  }
}
