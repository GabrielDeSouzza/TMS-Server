import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { VehicleBrandGraphDTO } from 'infra/graphql/DTO/VehicleBrand';

import {
  VehicleBrandInput,
  VehicleBrandUpdateInput,
} from './vehicle-brand.input';
import { VehicleBrandModel } from './vehicle-brand.model';

@Resolver(() => VehicleBrandModel)
export class VehicleBrandResolver {
  constructor(
    private vehicleBrandRepository: VehicleBrandRepository,
    private userRepository: UserRepository,
    private vehicleModelRepository: VehicleModelRepository,
  ) {}

  @Query(() => VehicleBrandModel)
  async getVehicleBrand(@Args('id') id: string) {
    return await this.vehicleBrandRepository.findVehicleBrandById(id);
  }
  @Query(() => [VehicleBrandModel])
  async getAllVehicleBrand() {
    const brands = await this.vehicleBrandRepository.getAllVehicleBrand();
    console.log(brands);

    return brands.length > 0 ? brands : null;
  }
  @Mutation(() => VehicleBrandModel)
  async createVehicleBrand(
    @Args('vehicleBrandInput') vehicleBrandInput: VehicleBrandInput,
  ) {
    const vehicleBrandEntity =
      VehicleBrandGraphDTO.createcreateInputToEntity(vehicleBrandInput);

    return await this.vehicleBrandRepository.createVehicleBrand(
      vehicleBrandEntity,
    );
  }

  @Mutation(() => VehicleBrandModel)
  async updatedVehicleBrand(
    @Args('id') id: string,
    @Args('vehicleBrandUpdate') vehicleBrandUpdate: VehicleBrandUpdateInput,
  ) {
    const vehicleBrandEntity =
      VehicleBrandGraphDTO.updateInputToEntity(vehicleBrandUpdate);

    return this.vehicleBrandRepository.updateVehicleBrand(
      id,
      vehicleBrandEntity,
    );
  }
  @ResolveField()
  async createdUser(@Parent() user: VehicleBrandInput) {
    const { created_by: createdBy } = user;

    return this.userRepository.findUserById(createdBy);
  }
  @ResolveField()
  async updatedUser(@Parent() user: VehicleBrandInput) {
    const { updated_by: updatedBy } = user;

    return this.userRepository.findUserById(updatedBy);
  }

  @ResolveField()
  async VehicleModels() {
    const models = await this.vehicleModelRepository.getAllVehicleModel();

    return models.length > 0 ? models : null;
  }
}
