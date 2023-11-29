import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/user/User';
import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { VehicleModelGraphDTO } from 'infra/graphql/DTO/VehicleModel';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
import { VehicleModelInput } from './vehicle-model.input';
import { VehicleModelGraphql } from './vehicle-model.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
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
    @CurrentUser() user: User,
  ) {
    vehicleModelInput.created_by = user.id;
    vehicleModelInput.updated_by = user.id;
    const vehicleModelEntity =
      VehicleModelGraphDTO.createInputToEntity(vehicleModelInput);

    return await this.vehicleModelRepository.createVehicleModel(
      vehicleModelEntity,
    );
  }
  @Mutation(() => VehicleModelGraphql)
  async updatedVehicleModel(
    @Args('id') id: string,
    @Args('vehicleModelUpdate') vehicleModelUpdate: VehicleModelInput,
    @CurrentUser() user: User,
  ) {
    vehicleModelUpdate.updated_by = user.id;
    const vehicleModelEntity =
      VehicleModelGraphDTO.updateInputToEntity(vehicleModelUpdate);

    return await this.vehicleModelRepository.updateVehicleModel(
      id,
      vehicleModelEntity,
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
  @ResolveField(() => VehicleTypeModel)
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
