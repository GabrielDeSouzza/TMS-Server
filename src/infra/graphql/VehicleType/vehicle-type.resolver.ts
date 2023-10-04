import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeInput } from './vehicle-type.input';
import { VehicleTypeModel } from './vehicle-type.model';

@Resolver(() => VehicleTypeModel)
export class VehicleTypeResolver {
  constructor(
    private vehicleTypeRepository: VehicleTypeRepository,
    private userRepository: UserRepository,
  ) {}

  @Query(() => VehicleTypeModel)
  async getVehicleType(@Args('id') id: string) {
    return this.vehicleTypeRepository.findVehicleTypeById(id);
  }
  @Query(() => [VehicleTypeModel], { nullable: true })
  async getAllVehicleTypes() {
    const vehicleTypes = await this.vehicleTypeRepository.getAllVehicleType();
    console.log(vehicleTypes[0].created_by);

    return vehicleTypes.length > 0 ? vehicleTypes : null;
  }
  @Mutation(() => VehicleTypeModel)
  async createVehicleType(
    @Args('vehicleTypeCreate') vehicleTypeInput: VehicleTypeInput,
  ) {
    return await this.vehicleTypeRepository.createVehicleType(vehicleTypeInput);
  }
  @Mutation(() => VehicleTypeModel)
  async updatedVehicleType(
    @Args('id') id: string,
    @Args('vehicleTypeInput') vehicleTypeInput: VehicleTypeInput,
  ) {
    return this.vehicleTypeRepository.updateVehicleType(id, vehicleTypeInput);
  }

  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: VehicleTypeInput) {
    const { created_by: createdBy } = user;

    return this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: VehicleTypeInput) {
    const { updated_by: updatedBy } = user;

    return this.userRepository.findUserById(updatedBy);
  }
}
