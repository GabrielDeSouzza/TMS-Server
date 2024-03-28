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

import { PhysicalCustomerOrderUseCases } from 'app/useCases/PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { PhysicalCustomerQuoteTableUseCases } from 'app/useCases/PhysicalCustomerQuoteTableUseCase/PhysicalCustomerQuoteTable';
import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { FreightExpenseModel } from '../FreightExpenseGraphql/FreightExpense.model';
import { LegalClientQuoteTableModel } from '../LegalClientQuoteTableGraphql/LegalClientQuoteTable.model';
import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetPhysicalCustomerOrderArgs } from './Args/GetPhysicalCustomerOrderrArgs';
import { PhysicalCustomerOrderWhereArgs } from './Args/WherePhysicalCustomerOrderArgs';
import {
  PhysicalCustomerOrderInput,
  PhysicalCustomerOrderUpdateInput,
} from './PhysicalCustomerOrder.input';
import { PhysicalCustomerOrderModel } from './PhysicalCustomerOrder.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => PhysicalCustomerOrderModel)
export class PhysicalCustomerOrderResolver {
  constructor(
    private physicalCustomerOrderUseCase: PhysicalCustomerOrderUseCases,
    private userCase: UserUseCases,
    private physicalCustomerUseCase: PhysicalCustomerUseCases,
    private physicalCustomerQuoteUseCase: PhysicalCustomerQuoteTableUseCases,
  ) {}
  @Query(() => PhysicalCustomerOrderModel, { nullable: true })
  async getPhysicalCustomerOrderModel(
    @Args() request: GetPhysicalCustomerOrderArgs,
  ) {
    return this.physicalCustomerOrderUseCase.getPhysicalCustomerOrder(request);
  }
  @Query(() => [PhysicalCustomerOrderModel], { nullable: true })
  async getAllPhysicalCustomerOrder(
    @Args() args: PhysicalCustomerOrderWhereArgs,
  ) {
    return this.physicalCustomerOrderUseCase.getAllPhysicalCustomerOrder(args);
  }
  @Mutation(() => PhysicalCustomerOrderModel)
  async createPhysicalCustomerOrder(
    @Args('physicalCustomerOrderInput')
    physicalCustomerOrderInput: PhysicalCustomerOrderInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerOrderInput.created_by = user.id;
    physicalCustomerOrderInput.updated_by = user.id;

    return await this.physicalCustomerOrderUseCase.createOrder(
      physicalCustomerOrderInput,
    );
  }
  @Mutation(() => PhysicalCustomerOrderModel)
  async updatephysicalCustomerOrder(
    @Args('id') id: string,
    @Args('physicalCustomerOrderInput')
    physicalCustomerOrderInput: PhysicalCustomerOrderUpdateInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerOrderInput.updated_by = user.id;

    return await this.physicalCustomerOrderUseCase.updateOrder(
      id,
      physicalCustomerOrderInput,
    );
  }
  @ResolveField(() => PhysicalCustomerModel)
  async PhysicalCustomer(@Parent() order: PhysicalCustomerOrderInput) {
    console.log(order);

    return await this.physicalCustomerUseCase.getPhysicalCustomer({
      id: order.physicalCustomerId,
    });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: PhysicalCustomerOrderInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: PhysicalCustomerOrderInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => LegalClientQuoteTableModel)
  async Quote(@Parent() order: PhysicalCustomerOrderInput) {
    return await this.physicalCustomerQuoteUseCase.getPhysicalCustomerQuoteTable(
      {
        id: order.quote_table_id,
      },
    );
  }
  @ResolveField(() => [FreightExpenseModel])
  async FreightExpenses(@Parent() order: PhysicalCustomerOrderInput) {
    return await this.physicalCustomerOrderUseCase.getExpenses({
      order: order.order,
    });
  }
}
