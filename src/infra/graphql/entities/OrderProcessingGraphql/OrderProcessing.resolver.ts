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

import { OrderProcessingUseCases } from 'app/useCases/OrderProcessingUseCases/OrderProcessingUseCases';
import { OwnDriverUseCases } from 'app/useCases/OwnDriverUseCases/OwnDriverUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { OwnDriverModel } from '../OwnDriverGraphql/OwnDriver.model';
import { PhysicalCustomerOrderModel } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetOrderProcessingArgs } from './Args/GetOrderProcessingArgs';
import {
  OrderProcessingCountArgs,
  OrderProcessingWhereArgs,
} from './Args/WhereOrderProcessingArgs';
import {
  OrderProcessingUpdateInput,
  OrderProcessingInput,
  OrderProcessingUpdateManyInput,
} from './OrderProcessing.input';
import { OrderProcessingModel } from './OrderProcessing.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OrderProcessingModel)
export class OrderProcessingResolver {
  constructor(
    private orderProcessingUseCase: OrderProcessingUseCases,
    private userCase: UserUseCases,
    private vehicleUseCase: VehicleUseCases,
    private ownDriverUseCase: OwnDriverUseCases,
  ) {}
  @Query(() => Int)
  async countOrderProcessing(@Args() request: OrderProcessingCountArgs) {
    return this.orderProcessingUseCase.countOrderProcessing(request);
  }
  @Query(() => OrderProcessingModel)
  async getOrderProcessing(@Args() request: GetOrderProcessingArgs) {
    return await this.orderProcessingUseCase.getOrderProcessing(request);
  }
  @Query(() => [OrderProcessingModel])
  async getAllOrderProcessing(@Args() request: OrderProcessingWhereArgs) {
    return this.orderProcessingUseCase.getAllOrderProcessing(request);
  }

  @Mutation(() => OrderProcessingModel)
  async createOrderProcessing(
    @Args('data') data: OrderProcessingInput,
    @CurrentUser() user: User,
  ) {
    data.created_by = user.id;
    data.updated_by = user.id;

    return this.orderProcessingUseCase.createOrderProcessing(data);
  }
  @Mutation(() => OrderProcessingModel)
  async updateOrderProcessing(
    @Args('id') id: string,
    @Args('data') data: OrderProcessingUpdateInput,
    @CurrentUser() user: User,
  ) {
    data.updated_by = user.id;

    return this.orderProcessingUseCase.updateOrderProcessing(id, data);
  }

  @Mutation(() => [OrderProcessingModel])
  async updateManyOrderProcessing(
    @Args({ name: 'data', type: () => [OrderProcessingUpdateManyInput] })
    data: OrderProcessingUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.orderProcessingUseCase.updateManyOrderProcessing(data, user.id);
  }
  @Mutation(() => OrderProcessingModel)
  async deleteOrderProcessing(@Args('id') id: string) {
    return this.orderProcessingUseCase.deleteOrderProcessing(id);
  }

  @Mutation(() => [OrderProcessingModel])
  async deleteManyOrderProcessing(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.orderProcessingUseCase.deleteManyOrderProcessing(ids);
  }

  @Mutation(() => OrderProcessingModel)
  async completedOrder(
    @Args()
    data: GetOrderProcessingArgs,
    @CurrentUser()
    user: User,
  ) {
    return this.orderProcessingUseCase.completedOrder(data, user.id);
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() orderProcessing: OrderProcessingInput) {
    return this.vehicleUseCase.getVehicle({
      vehicleId: orderProcessing.vehicle_id,
    });
  }

  @ResolveField(() => [LegalClientOrderModel], { nullable: true })
  async LegalClientOrders(@Parent() orderProcessing: OrderProcessingModel) {
    return this.orderProcessingUseCase.getAllLegalClientOrders({
      id: orderProcessing.id,
      order_processing_number: orderProcessing.order_processing_number,
      vehicleData: { vehicleId: orderProcessing.vehicle_id },
    });
  }
  @ResolveField(() => [PhysicalCustomerOrderModel], { nullable: true })
  async PhysicalCustomerOrders(
    @Parent() orderProcessing: OrderProcessingModel,
  ) {
    return this.orderProcessingUseCase.getAllPhysicalCustomerOrders({
      id: orderProcessing.id,
      order_processing_number: orderProcessing.order_processing_number,
      vehicleData: { vehicleId: orderProcessing.vehicle_id },
    });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OrderProcessingInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OrderProcessingInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => OwnDriverModel)
  async OwnDriver(@Parent() order: OrderProcessingInput) {
    return await this.ownDriverUseCase.getOwnDriver({ id: order.driver_id });
  }
}
