/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/consistent-destructuring */
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { VehicleTypeContainsBody } from 'domain/entities/vehicle/vehicleTypeContainsBody/VehicleContainsBody';
import { VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';
import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleTypeContainsBodyRepository } from 'domain/repositories/VehicleTypeContainsBodyworkRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleTypeContainsBodyModel } from '../VehicleTypeContainsBodyGraphql/VehicleTypeContainsBody.model';
import { VehicleTypeInput, VehicleTypeUpdateInput } from './vehicle-type.input';
import { VehicleTypeModel } from './vehicle-type.model';

@Resolver(() => VehicleTypeModel)
export class VehicleTypeResolver {
  constructor(
    private vehicleTypeRepository: VehicleTypeRepository,
    private userRepository: UserRepository,
    private vehicleTypeContainsBoyRepositoy: VehicleTypeContainsBodyRepository,
  ) {}

  @Query(() => VehicleTypeModel)
  async getVehicleType(@Args('id') id: string) {
    return this.vehicleTypeRepository.findVehicleTypeById(id);
  }
  @Query(() => [VehicleTypeModel], { nullable: true })
  async getAllVehicleTypes() {
    const vehicleTypes = await this.vehicleTypeRepository.getAllVehicleType();

    return vehicleTypes.length > 0 ? vehicleTypes : null;
  }
  @Mutation(() => VehicleTypeModel)
  async createVehicleType(
    @Args('vehicleTypeCreate') vehicleTypeInput: VehicleTypeInput,
  ) {
    const { bodyWork: containsBody } = vehicleTypeInput;
    const vehicleTypeEntity = new VehicleType(vehicleTypeInput);
    const type = await this.vehicleTypeRepository.createVehicleType(
      vehicleTypeEntity,
    );

    if (containsBody && vehicleTypeInput.body_work_id) {
      vehicleTypeInput.body_work_id.map(async vehicleContains => {
        const body = new VehicleTypeContainsBody({
          created_by: vehicleTypeInput.created_by,
          updated_by: vehicleTypeInput.updated_by,
          vehicle_bodywork_id: vehicleContains,
          vehicle_type_id: type.id,
        });
        await this.vehicleTypeContainsBoyRepositoy.createVehicleTypeContainsBody(
          body,
        );
      });
    }

    return type;
  }
  @Mutation(() => VehicleTypeModel)
  async updatedVehicleType(
    @Args('id') id: string,
    @Args('vehicleTypeInput') vehicleTypeInput: VehicleTypeUpdateInput,
  ) {
    const vehicleTypeEntity = new VehicleType(vehicleTypeInput);
    const type = await this.vehicleTypeRepository.updateVehicleType(
      id,
      vehicleTypeEntity,
    );

    if (vehicleTypeInput.del_body_id) {
      for (const [, delBody] of vehicleTypeInput.del_body_id.entries()) {
        await this.vehicleTypeContainsBoyRepositoy.deleteVehicleTypeContainsBody(
          type.id,
          delBody,
        );
      }
    }

    if (vehicleTypeInput.body_work_id) {
      vehicleTypeInput.body_work_id.map(async vehicleContains => {
        const body = new VehicleTypeContainsBody({
          created_at: new Date(),
          updated_at: new Date(),
          created_by: vehicleTypeInput.created_by,
          updated_by: vehicleTypeInput.updated_by,
          vehicle_bodywork_id: vehicleContains,
          vehicle_type_id: type.id,
        });
        await this.vehicleTypeContainsBoyRepositoy.createVehicleTypeContainsBody(
          body,
        );
      });
    }

    return type;
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
  @ResolveField(() => [VehicleTypeContainsBodyModel], { nullable: true })
  async VehicleTypeContainsBody(@Parent() vehicleType: VehicleTypeModel) {
    const { id } = vehicleType;

    const typeBodies =
      await this.vehicleTypeContainsBoyRepositoy.getAllVehicleTypeBodies(id);

    return typeBodies;
  }
}
