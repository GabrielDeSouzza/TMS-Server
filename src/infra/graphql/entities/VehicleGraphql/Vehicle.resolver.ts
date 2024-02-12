import {
  Args,
  Resolver,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
import { VehicleModelWhereArgs } from 'infra/graphql/entities/VeihicleModelGraphql/Args/WhereVeihicleModelArgs';

import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
import { VehicleModelReferences } from '../VeihicleModelGraphql/vehicle-model.model';
import { GetVehicleArgs } from './Args/GetVehicleArgs';
import { VehicleInput, VehicleUpdateInput } from './Vehicle.input';
import { VehicleCarModel } from './vehicle.model';

@Resolver(() => VehicleCarModel)
export class VehicleGraphqlResolver {
  constructor(
    private vehicleRepository: VehicleRepository,
    private vehicleModelRepository: VehicleModelRepository,
  ) {}

  @Query(() => VehicleCarModel)
  async getVehicle(@Args() request: GetVehicleArgs) {
    return this.vehicleRepository.findVehicle(request);
  }
  @Query(() => [VehicleCarModel])
  async getAllVehicle(@Args() args: VehicleModelWhereArgs) {
    return await this.vehicleRepository.getAllVehicle({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
  }
  @Mutation(() => VehicleCarModel)
  async createVehicle(@Args('vehicleInput') vehicleInput: VehicleInput) {
    const vehicleEntity = VehicleGraphDTO.createInputToEntity(vehicleInput);

    return this.vehicleRepository.createVehicle(vehicleEntity);
  }
  @Mutation(() => VehicleCarModel)
  async updateVehicle(
    @Args('id') id: string,
    @Args('vehicleInput') vehicleInput: VehicleUpdateInput,
  ) {
    const vehicleEntity = VehicleGraphDTO.updateInputToEntity(vehicleInput);

    return await this.vehicleRepository.updateVehicle(id, vehicleEntity);
  }

  @ResolveField(() => VehicleModelReferences)
  async VehicleModel(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;

    return this.vehicleModelRepository.findVehicleModel({ id: modeld });
  }
  @ResolveField(() => VehicleTypeModel)
  async VehicleType(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;
    const type = await this.vehicleModelRepository.findOnlyVehicleType(modeld);

    return type;
  }
  @ResolveField(() => VehicleBrandReferences)
  async VehicleBrand(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;

    return await this.vehicleModelRepository.findVehicleModel({ id: modeld });
  }
}
