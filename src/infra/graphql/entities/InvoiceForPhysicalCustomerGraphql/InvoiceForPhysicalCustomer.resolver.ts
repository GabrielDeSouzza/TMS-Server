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

import { InvoiceForPhysicalCustomerUseCases } from 'app/useCases/InvoiceForPhysicalCustomer/InvoiceForPhysicalCustomerUseCases';
import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetInvoiceForPhysicalCustomerArgs } from './Args/GetIInvoiceForPhysicalCustomerArgs';
import { InvoiceForPhysicalCustomerWhereArgs } from './Args/WhereInvoiceForPhysicalCustomerArgs';
import {
  InvoiceForPhysicalCustomerInput,
  InvoiceForPhysicalCustomerUpdateInput,
} from './InvoiceForPhysicalCustomer.input';
import { InvoiceForPhysicalCustomerModel } from './InvoiceForPhysicalCustomer.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => InvoiceForPhysicalCustomerModel)
export class InvoiceForPhysicalCustomerResolver {
  constructor(
    private invoiceForPhysicalCustomerUseCase: InvoiceForPhysicalCustomerUseCases,
    private userCase: UserUseCases,
    private physicalCustomerOUseCases: PhysicalCustomerUseCases,
  ) {}
  @Query(() => InvoiceForPhysicalCustomerModel)
  async getInvoiceForPhysicalCustomerModel(
    @Args() request: GetInvoiceForPhysicalCustomerArgs,
  ) {
    return this.invoiceForPhysicalCustomerUseCase.getInvoiceForPhysicalCustomer(
      request,
    );
  }
  @Query(() => [InvoiceForPhysicalCustomerModel], { nullable: true })
  async getAllInvoiceForPhysicalCustomer(
    @Args() args: InvoiceForPhysicalCustomerWhereArgs,
  ) {
    const invoiceForPhysicalCustomer =
      await this.invoiceForPhysicalCustomerUseCase.getAllInvoiceForPhysicalCustomer(
        args,
      );

    return invoiceForPhysicalCustomer.length > 0
      ? invoiceForPhysicalCustomer
      : null;
  }
  @Mutation(() => InvoiceForPhysicalCustomerModel)
  async createInvoiceForPhysicalCustomer(
    @Args('invoiceForPhysicalCustomerInput')
    invoiceForPhysicalCustomerInput: InvoiceForPhysicalCustomerInput,
    @CurrentUser() user: User,
  ) {
    invoiceForPhysicalCustomerInput.created_by = user.id;
    invoiceForPhysicalCustomerInput.updated_by = user.id;

    return this.invoiceForPhysicalCustomerUseCase.createInvoiceForPhysicalCustomer(
      invoiceForPhysicalCustomerInput,
    );
  }
  @Mutation(() => InvoiceForPhysicalCustomerModel)
  async updateinvoiceForPhysicalCustomer(
    @Args('id') id: string,
    @Args('invoiceForPhysicalCustomerInput')
    invoiceForPhysicalCustomerInput: InvoiceForPhysicalCustomerUpdateInput,
    @CurrentUser() user: User,
  ) {
    invoiceForPhysicalCustomerInput.updated_by = user.id;

    return this.invoiceForPhysicalCustomerUseCase.updateInvoiceForPhysicalCustomer(
      id,
      invoiceForPhysicalCustomerInput,
    );
  }
  @ResolveField(() => PhysicalCustomerModel)
  async PhysicalCustomer(@Parent() invoice: InvoiceForPhysicalCustomerInput) {
    return this.physicalCustomerOUseCases.getPhysicalCustomer({
      id: invoice.physicalCustomerId,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: InvoiceForPhysicalCustomerInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: InvoiceForPhysicalCustomerInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
