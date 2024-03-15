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
import { OrderProcessingPhysicalCustomerUseCases } from 'app/useCases/ProcessingPhysicalCustomerCases/ProcessingPhysicalCustomerUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { PhysicalCustomerOrderModel } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetOrderProcessingPhysicalCustomerArgs } from './Args/GetOrderProcessingPhysicalCustomerArgs';
import { OrderProcessingPhysicalCustomerWhereArgs } from './Args/WhereOrderProcessingPhysicalCustomerArgs';
import {
  OrderProcessingPhysicalCustomerUpdateInput,
  OrderProcessingPhysicalCustomerInput,
} from './OrderProcessingPhysicalCustomer.input';
import { OrderProcessingPhysicalCustomerModel } from './OrderProcessingPhysicalCustomer.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OrderProcessingPhysicalCustomerModel)
export class OrderProcessingPhysicalCustomerResolver {
  constructor(
    private orderProcessingPhysicalCustomerUseCase: OrderProcessingPhysicalCustomerUseCases,
    private userCase: UserUseCases,
    private legalOrderUseCase: PhysicalCustomerOrderUseCases,
    private vehicleUseCase: VehicleUseCases,
  ) {}
  @Query(() => OrderProcessingPhysicalCustomerModel)
  async GetOrderProcessingPhysicalCustomer(
    @Args() request: GetOrderProcessingPhysicalCustomerArgs,
  ) {
    return await this.orderProcessingPhysicalCustomerUseCase.getOrderProcessingPhysicalCustomer(
      request,
    );
  }
  @Query(() => [OrderProcessingPhysicalCustomerModel])
  async getAllOrderProcessingPhysicalCustomer(
    @Args() request: OrderProcessingPhysicalCustomerWhereArgs,
  ) {
    return this.orderProcessingPhysicalCustomerUseCase.getAllOrderProcessingPhysicalCustomer(
      request,
    );
  }
  @Mutation(() => OrderProcessingPhysicalCustomerModel)
  async createOrderProcessingPhysicalCustomer(
    @Args('data') data: OrderProcessingPhysicalCustomerInput,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    data.created_by = user.id;
    data.updated_by = user.id;

    return this.orderProcessingPhysicalCustomerUseCase.createOrderProcessingPhysicalCustomer(
      data,
    );
  }
  @Mutation(() => OrderProcessingPhysicalCustomerModel)
  async updateOrderProcessingPhysicalCustomer(
    @Args('id') id: string,
    @Args('data') data: OrderProcessingPhysicalCustomerUpdateInput,
    @CurrentUser() user: User,
  ) {
    data.updated_by = user.id;

    return this.orderProcessingPhysicalCustomerUseCase.updateOrderProcessingPhysicalCustomer(
      id,
      data,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(
    @Parent() orderProcessing: OrderProcessingPhysicalCustomerInput,
  ) {
    return this.vehicleUseCase.getVehicle({
      vehicleId: orderProcessing.vehicle_id,
    });
  }
  @ResolveField(() => PhysicalCustomerOrderModel)
  async Order(@Parent() orderProcessing: OrderProcessingPhysicalCustomerInput) {
    return this.legalOrderUseCase.getPhysicalCustomerOrder({
      id: orderProcessing.order_id,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OrderProcessingPhysicalCustomerInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OrderProcessingPhysicalCustomerInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
