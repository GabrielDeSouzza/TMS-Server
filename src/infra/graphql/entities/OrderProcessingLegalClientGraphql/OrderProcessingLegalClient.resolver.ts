import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';
import { OrderProcessingLegalClientUseCases } from 'app/useCases/ProcessingLegalClientUseCases/ProcessingLegalClientUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetOrderProcessingLegalClientArgs } from './Args/GetOrderProcessingLegalClientArgs';
import { OrderProcessingLegalClientWhereArgs } from './Args/WhereOrderProcessingLegalClientArgs';
import {
  OrderProcessingLegalClientUpdateInput,
  OrderProcessingLegalClientInput,
} from './OrderProcessingLegalClient.input';
import { OrderProcessingLegalClientModel } from './OrderProcessingLegalClient.model';

@Resolver(() => OrderProcessingLegalClientModel)
export class OrderProcessingLegalClientResolver {
  constructor(
    private orderProcessingLegalClientUseCase: OrderProcessingLegalClientUseCases,
    private userCase: UserUseCases,
    private legalOrderUseCase: LegalClientOrderUseCases,
    private vehicleUseCase: VehicleUseCases,
  ) {}
  @Query(() => OrderProcessingLegalClientModel)
  async GetOrderProcessingLegalClient(
    @Args() request: GetOrderProcessingLegalClientArgs,
  ) {
    return await this.orderProcessingLegalClientUseCase.getOrderProcessingLegalClient(
      request,
    );
  }
  @Query(() => [OrderProcessingLegalClientModel])
  async getAllOrderProcessingLegalClient(
    @Args() request: OrderProcessingLegalClientWhereArgs,
  ) {
    return this.orderProcessingLegalClientUseCase.getAllOrderProcessingLegalClient(
      request,
    );
  }
  @Mutation(() => OrderProcessingLegalClientModel)
  async createOrderProcessingLegalClient(
    @Args('data') data: OrderProcessingLegalClientInput,
  ) {
    return this.orderProcessingLegalClientUseCase.createOrderProcessingLegalClient(
      data,
    );
  }
  @Mutation(() => OrderProcessingLegalClientModel)
  async updateOrderProcessingLegalClient(
    @Args('id') id: string,
    @Args('data') data: OrderProcessingLegalClientUpdateInput,
  ) {
    return this.orderProcessingLegalClientUseCase.updateOrderProcessingLegalClient(
      id,
      data,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() orderProcessing: OrderProcessingLegalClientInput) {
    return this.vehicleUseCase.getVehicle({
      vehicleId: orderProcessing.vehicle_id,
    });
  }
  @ResolveField(() => LegalClientOrderModel)
  async Route(@Parent() orderProcessing: OrderProcessingLegalClientInput) {
    return this.legalOrderUseCase.getLegalClientOrder({
      id: orderProcessing.order_id,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OrderProcessingLegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OrderProcessingLegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
