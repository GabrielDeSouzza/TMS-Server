import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { PhysicalCustomerOrderUseCases } from 'app/useCases/PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { PhysicalCustomerQuoteTableUseCases } from 'app/useCases/PhysicalCustomerQuoteTableUseCase/PhysicalCustomerQuoteTable';
import { PhysicalCustomerUseCases } from 'app/useCases/PhysicalCustomerUseCases/PhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { PhysicalCustomerModel } from '../PhysicalCustomerGraphql/PhysicalCustomer.model';
import { PhysicalCustomerQuoteTableModel } from '../PhysicalCustomerQuoteTableGraphql/PhysicalCustomerQuoteTable.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetPhysicalCustomerOrderArgs } from './Args/GetPhysicalCustomerOrderrArgs';
import {
  PhysicalCustomerOrderCountArgs,
  PhysicalCustomerOrderWhereArgs,
} from './Args/WherePhysicalCustomerOrderArgs';
import {
  PhysicalCustomerOrderInput,
  PhysicalCustomerOrderUpdateInput,
  PhysicalCustomerOrderUpdateManyInput,
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
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  @Query(() => Int)
  async countPhysicalCustomerOrder(
    @Args() request: PhysicalCustomerOrderCountArgs,
  ) {
    return this.physicalCustomerOrderUseCase.countPhysicalCustomerOrder(
      request,
    );
  }
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
  async updatePhysicalCustomerOrder(
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
  @Mutation(() => [PhysicalCustomerOrderModel])
  async updateManyPhysicalCustomerOrder(
    @Args({ name: 'data', type: () => [PhysicalCustomerOrderUpdateManyInput] })
    data: PhysicalCustomerOrderUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.physicalCustomerOrderUseCase.updateManyPhysicalCustomerOrder(
      data,
      user.id,
    );
  }
  @Mutation(() => PhysicalCustomerOrderModel)
  async deletePhysicalCustomerOrder(@Args('id') id: string) {
    return this.physicalCustomerOrderUseCase.deletePhysicalCustomerOrder(id);
  }

  @Mutation(() => [PhysicalCustomerOrderModel])
  async deleteManyPhysicalCustomerOrder(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.physicalCustomerOrderUseCase.deleteManyPhysicalCustomerOrder(
      ids,
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
  @ResolveField(() => PhysicalCustomerQuoteTableModel)
  async Quote(@Parent() order: PhysicalCustomerOrderInput) {
    return await this.physicalCustomerQuoteUseCase.getPhysicalCustomerQuoteTable(
      {
        id: order.quote_table_id,
      },
    );
  }
  @ResolveField(() => CarrierCompanyModel)
  async CarrierCompany(@Parent() order: PhysicalCustomerOrderInput) {
    return await this.carrierCompanyUseCase.getCarrierCompany({
      id: order.carrier_id,
    });
  }
}
