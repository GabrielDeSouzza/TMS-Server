import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { VehicleModelUseCases } from 'app/useCases/VehicleModelUseCases/VehihicleModelUseCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleModelGraphql } from '../VeihicleModelGraphql/vehicle-model.model';
import { GetVehicleArgs } from './Args/GetVehicleArgs';
import { VehicleWhereArgs } from './Args/WhereVehicleArgs';
import { VehicleInput } from './Vehicle.input';
import { VehicleCarModel } from './vehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleCarModel)
export class VehicleResolver {
  constructor(
    private vehicleUseCase: VehicleUseCases,
    private vehicleModelUseCase: VehicleModelUseCases,
  ) {}

  @Query(() => VehicleCarModel)
  async getVehicle(@Args() request: GetVehicleArgs) {
    return this.vehicleUseCase.getVehicle(request);
  }

  @Query(() => [VehicleCarModel], { nullable: true })
  async getAllVehicles(@Args() args: VehicleWhereArgs) {
    const vehicles = await this.vehicleUseCase.getAllVehicle(args);

    return vehicles;
  }

  @ResolveField(() => VehicleModelGraphql)
  async VehicleModel(@Parent() vehicle: VehicleInput) {
    return this.vehicleModelUseCase.getModel({ id: vehicle.model_id });
  }
}
