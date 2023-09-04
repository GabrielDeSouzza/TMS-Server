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

import { VehicleBrandInput } from './vehicle-brand.input';
import { VehicleBrandModel } from './vehicle-brand.model';

@Resolver(() => VehicleBrandModel)
export class VehicleBrandResolver {
  constructor(
    private vehicleBrandRepository: VehicleBrandRepository,
    private userRepository: UserRepository,
  ) {}

  @Query(() => VehicleBrandModel)
  async getVehicleBrand(@Args('id') id: string) {
    const x = await this.vehicleBrandRepository.findVehicleBrandById(id);
    console.log(x.updated_by);

    return x;
  }

  @Mutation(() => VehicleBrandModel, { name: 'vehicleBrand' })
  async createVehicleBrand(
    @Args('vehicleBrandInput') vehicleBrandInput: VehicleBrandInput,
  ) {
    return await this.vehicleBrandRepository.createVehicleBrand(
      vehicleBrandInput,
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
}
