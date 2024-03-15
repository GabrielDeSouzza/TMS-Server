import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { InvoiceForPhysicalCustomerUseCases } from 'app/useCases/InvoiceForPhysicalCustomer/InvoiceForPhysicalCustomerUseCases';
import { PhysicalCustomerMerchandiseUseCases } from 'app/useCases/PhysicalCustomerMerchandiseDto/PhysicalCustomerMerchandiseUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { InvoiceForPhysicalCustomerModel } from '../InvoiceForPhysicalCustomerGraphql/InvoiceForPhysicalCustomer.model';
import { GetPhysicalCustomerMerchandiseArgs } from './Args/GetPhysicalCustomerMerchandiseArgs';
import { PhysicalCustomerMerchandiseWhereArgs } from './Args/WherePhysicalCustomerMerchandiseArgs';
import {
  PhysicalCustomerMerchandiseInput,
  PhysicalCustomerMerchandiseUpdateInput,
} from './PhysicalCustomerMerchandise.input';
import { PhysicalCustomerMerchandiseModel } from './PhysicalCustomerMerchandise.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => PhysicalCustomerMerchandiseModel)
export class PhysicalCustomerMerchandiseResolver {
  constructor(
    private physicalCustomerMerchandiseUseCases: PhysicalCustomerMerchandiseUseCases,
    private invoiceForPhysicalCustomer: InvoiceForPhysicalCustomerUseCases,
  ) {}
  @Query(() => PhysicalCustomerMerchandiseModel)
  async getPhysicalCustomerMerchandiseModel(
    @Args() request: GetPhysicalCustomerMerchandiseArgs,
  ) {
    return this.physicalCustomerMerchandiseUseCases.getPhysicalCustomerMerchandise(
      request,
    );
  }
  @Query(() => [PhysicalCustomerMerchandiseModel], { nullable: true })
  async getAllPhysicalCustomerMerchandise(
    @Args() args: PhysicalCustomerMerchandiseWhereArgs,
  ) {
    return this.physicalCustomerMerchandiseUseCases.getAllPhysicalCustomerMerchandise(
      args,
    );
  }
  @Mutation(() => PhysicalCustomerMerchandiseModel)
  async createPhysicalCustomerMerchandise(
    @Args('data')
    physicalCustomerMerchandiseInput: PhysicalCustomerMerchandiseInput,
  ) {
    return this.physicalCustomerMerchandiseUseCases.createPhysicalCustomerMerchandise(
      physicalCustomerMerchandiseInput,
    );
  }
  @Mutation(() => PhysicalCustomerMerchandiseModel)
  async updatePhysicalCustomerMerchandise(
    @Args('id') id: string,
    @Args('data')
    physicalCustomerMerchandise: PhysicalCustomerMerchandiseUpdateInput,
  ) {
    return this.physicalCustomerMerchandiseUseCases.updatePhysicalCustomerMerchandise(
      id,
      physicalCustomerMerchandise,
    );
  }
  @ResolveField(() => InvoiceForPhysicalCustomerModel)
  async Invoice(@Parent() merchandise: PhysicalCustomerMerchandiseInput) {
    return this.invoiceForPhysicalCustomer.getInvoiceForPhysicalCustomer({
      id: merchandise.invoicePhysicalClient,
    });
  }
}
