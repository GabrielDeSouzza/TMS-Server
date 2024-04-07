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

import { CompletedOrdersUseCases } from 'app/useCases/CompletedOrdersUseCases/CompletedOrdersUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { PhysicalCustomerOrderModel } from '../PhysicalCustomerOrderGraphql/PhysicalCustomerOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetCompletedOrdersArgs } from './Args/GetCompletedOrdersArgs';
import { CompletedOrdersWhereArgs } from './Args/WhereCompletedOrdersArgs';
import {
  CompletedOrdersUpdateInput,
  CompletedOrdersInput,
} from './CompletedOrders.input';
import { CompletedOrdersModel } from './CompletedOrders.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => CompletedOrdersModel)
export class CompletedOrdersResolver {
  constructor(
    private completedOrdersUseCase: CompletedOrdersUseCases,
    private userCase: UserUseCases,
    private vehicleUseCase: VehicleUseCases,
  ) {}
  @Query(() => CompletedOrdersModel)
  async getCompletedOrders(@Args() request: GetCompletedOrdersArgs) {
    return await this.completedOrdersUseCase.getCompletedOrders(request);
  }
  @Query(() => [CompletedOrdersModel])
  async getAllCompletedOrders(@Args() request: CompletedOrdersWhereArgs) {
    return this.completedOrdersUseCase.getAllCompletedOrders(request);
  }

  @Mutation(() => CompletedOrdersModel)
  async createCompletedOrders(
    @Args('data') data: CompletedOrdersInput,
    @CurrentUser() user: User,
  ) {
    data.created_by = user.id;
    data.updated_by = user.id;

    return this.completedOrdersUseCase.createCompletedOrders(data);
  }
  @Mutation(() => CompletedOrdersModel)
  async updateCompletedOrders(
    @Args('id') id: string,
    @Args('data') data: CompletedOrdersUpdateInput,
    @CurrentUser() user: User,
  ) {
    data.updated_by = user.id;

    return this.completedOrdersUseCase.updateCompletedOrders(id, data);
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() completedOrders: CompletedOrdersInput) {
    return this.vehicleUseCase.getVehicle({
      vehicleId: completedOrders.vehicle_id,
    });
  }

  @ResolveField(() => [LegalClientOrderModel], { nullable: true })
  async LegalClientOrders(@Parent() completedOrders: CompletedOrdersModel) {
    return this.completedOrdersUseCase.getAllLegalClientOrders({
      id: completedOrders.id,
      order_processing_number: completedOrders.order_processing_number,
      vehicleData: { vehicleId: completedOrders.vehicle_id },
    });
  }
  @ResolveField(() => [PhysicalCustomerOrderModel], { nullable: true })
  async PhysicalCustomerOrders(
    @Parent() completedOrders: CompletedOrdersModel,
  ) {
    return this.completedOrdersUseCase.getAllPhysicalCustomerOrders({
      id: completedOrders.id,
      order_processing_number: completedOrders.order_processing_number,
      vehicleData: { vehicleId: completedOrders.vehicle_id },
    });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: CompletedOrdersInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: CompletedOrdersInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
