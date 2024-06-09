import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetVehicleArgs } from './Args/GetVehicleArgs';
import { VehicleWhereArgs } from './Args/WhereVehicleArgs';
import { VehicleCarModel } from './vehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleCarModel)
export class VehicleResolver {
  constructor(private vehicleUseCase: VehicleUseCases) {}

  @Query(() => VehicleCarModel)
  async getVehicle(@Args() request: GetVehicleArgs) {
    return this.vehicleUseCase.getVehicle(request);
  }

  @Query(() => [VehicleCarModel], { nullable: true })
  async getAllVehicles(@Args() args: VehicleWhereArgs) {
    const vehicles = await this.vehicleUseCase.getAllVehicle(args);

    return vehicles;
  }
}
