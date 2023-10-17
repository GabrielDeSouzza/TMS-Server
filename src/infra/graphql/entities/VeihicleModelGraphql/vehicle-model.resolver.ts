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
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeReferences } from '../VehicleTypeGraphql/vehicle-type.model';
import { VehicleModelInput } from './vehicle-model.input';
import { VehicleModelGraphql } from './vehicle-model.model';

@Resolver(() => VehicleModelGraphql)
export class VehicleModelResolver {
  constructor(
    private userRepository: UserRepository,
    private vehicleModelRepository: VehicleModelRepository,
    private vehicleTypeRepository: VehicleTypeRepository,
    private vehicleBrandRepository: VehicleBrandRepository,
  ) {}
  @Query(() => VehicleModelGraphql)
  async getVehicleModel(@Args('id') id: string) {
    return await this.vehicleModelRepository.findVehicleModelById(id);
  }
  @Query(() => [VehicleModelGraphql], { nullable: true })
  async getAllVehicleModel() {
    const models = await this.vehicleModelRepository.getAllVehicleModel();

    return models.length > 0 ? models : null;
  }
  @Mutation(() => VehicleModelGraphql)
  async createVehicleModel(
    @Args('vehicleModelInput') vehicleModelInput: VehicleModelInput,
  ) {
    return await this.vehicleModelRepository.createVehicleModel(
      vehicleModelInput,
    );
  }
  @Mutation(() => VehicleModelGraphql)
  async updatedVehicleModel(
    @Args('id') id: string,
    @Args('vehicleModelUpdate') vehicleModelUpdate: VehicleModelInput,
  ) {
    return await this.vehicleModelRepository.updateVehicleModel(
      id,
      vehicleModelUpdate,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: VehicleModelGraphql) {
    const { created_by: createdBy } = user;

    return this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: VehicleModelInput) {
    const { updated_by: updatedBy } = user;

    return this.userRepository.findUserById(updatedBy);
  }
  @ResolveField(() => VehicleTypeReferences)
  async VehicleType(@Parent() vehicleModel: VehicleModelInput) {
    const { type_id: typeID } = vehicleModel;

    return await this.vehicleTypeRepository.findVehicleTypeById(typeID);
  }
  @ResolveField(() => VehicleBrandReferences)
  async VehicleBrand(@Parent() vehicleModel: VehicleModelInput) {
    const { brand_id: brandId } = vehicleModel;

    return await this.vehicleBrandRepository.findVehicleBrandById(brandId);
  }
}
