import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBodyworkInput } from './vehicle-bodywork.input';
import { VehicleBodyworkModel } from './vehicle-bodywork.model';

@Resolver(() => VehicleBodyworkModel)
export class VehicleBodyworkResolver {
  constructor(
    private vehicleBodyworkRepository: VehicleBodyworkRepository,
    private userRepository: UserRepository,
  ) {}
  @Query(() => VehicleBodyworkModel)
  async getVehicleBodyworkModel(@Args('id') id: string) {
    return this.vehicleBodyworkRepository.findVehicleBodyworkById(id);
  }
  @Query(() => [VehicleBodyworkModel], { nullable: true })
  async getAllVehicleBodywork() {
    const bodyworks =
      await this.vehicleBodyworkRepository.getAllVehicleBodywork();

    return bodyworks.length > 0 ? bodyworks : null;
  }
  @Mutation(() => VehicleBodyworkModel)
  async createVehicleBodywork(
    @Args('vehicleBodyworkInput') vehicleBodyworkInput: VehicleBodyworkInput,
  ) {
    return this.vehicleBodyworkRepository.createVehicleBodywork(
      vehicleBodyworkInput,
    );
  }
  @Mutation(() => VehicleBodyworkModel)
  async updateVehicleBodywork(
    @Args('id') id: string,
    @Args('vehicleBodyworkInput') vehicleBodyworkInput: VehicleBodyworkInput,
  ) {
    return this.vehicleBodyworkRepository.updateVehicleBodywork(
      id,
      vehicleBodyworkInput,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: VehicleBodyworkInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: VehicleBodyworkInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
