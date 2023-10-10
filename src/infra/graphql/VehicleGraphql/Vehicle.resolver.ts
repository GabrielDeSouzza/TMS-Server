import {
  Args,
  Resolver,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { GraphQLError } from 'graphql';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';
import { VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeReferences } from '../VehicleType/vehicle-type.model';
import { VehicleModelReferences } from '../VeihicleModel/vehicle-model.model';
import { VehicleInput, VehicleUpdateInput } from './Vehicle.input';
import { VehicleCarModel } from './vehicle.model';

@Resolver(() => VehicleCarModel)
export class VehicleGraphqlResolver {
  constructor(
    private vehicleRepository: VehicleRepository,
    private userRepository: UserRepository,
    private vehicleModelRepository: VehicleModelRepository,
    private vehicleTypeContainsBodyRepositoy: VehicleTypeContainsBodyRepository,
  ) {}

  @Query(() => VehicleCarModel)
  async getVehicle(
    @Args('id', { nullable: true }) id?: string,
    @Args('plate', { nullable: true }) plate?: string,
  ) {
    if (id == undefined && plate == undefined)
      throw new GraphQLError('insert a id or plate');

    return this.vehicleRepository.findVehicleById(id, plate);
  }
  @Query(() => [VehicleCarModel])
  async getAllVehicle() {
    return await this.vehicleRepository.getAllVehicle();
  }
  @Mutation(() => VehicleCarModel)
  async createVehicle(@Args('vehicleInput') vehicleInput: VehicleInput) {
    return this.vehicleRepository.createVehicle(vehicleInput);
  }
  @Mutation(() => VehicleCarModel)
  async updateVehicle(
    @Args('id') id: string,
    @Args('vehicleInput') vehicleInput: VehicleUpdateInput,
  ) {
    return await this.vehicleRepository.updateVehicle(id, vehicleInput);
  }

  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: VehicleInput) {
    const { created_by: createdBy } = user;

    return this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: VehicleInput) {
    const { updated_by: updatedBy } = user;

    return this.userRepository.findUserById(updatedBy);
  }

  @ResolveField(() => VehicleModelReferences)
  async VehicleModel(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;

    return this.vehicleModelRepository.findVehicleModelById(modeld);
  }
  @ResolveField(() => VehicleTypeReferences)
  async VehicleType(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;
    const type = await this.vehicleModelRepository.findOnlyVehicleType(modeld);
    console.log(type);

    return type;
  }
  @ResolveField(() => VehicleBrandReferences)
  async VehicleBrand(@Parent() vehicle: VehicleInput) {
    const { model_id: modeld } = vehicle;

    return this.vehicleModelRepository.findOnlyVehicleBrand(modeld);
  }
}
