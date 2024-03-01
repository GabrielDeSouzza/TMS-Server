import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleBrandUseCases } from 'app/useCases/VehicleBrandCases/VehicleBrandUseCases';
import { VehicleModelUseCases } from 'app/useCases/VehicleModelUseCases/VehihicleModelUseCases';
import { VehicleTypeUseCases } from 'app/useCases/VehicleTypeUseCases/VehicleTypeUseCases';

import { VehicleModelWhereArgs } from 'infra/graphql/entities/VeihicleModelGraphql/Args/WhereVeihicleModelArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBrandReferences } from '../VehicleBrandGraphql/vehicle-brand.model';
import { VehicleTypeModel } from '../VehicleTypeGraphql/vehicle-type.model';
import { GetVehicleModelArgs } from './Args/GetVehicleModelArgs';
import {
  VehicleModelInput,
  VehicleModelUpdateInput,
} from './vehicle-model.input';
import { VehicleModelGraphql } from './vehicle-model.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleModelGraphql)
export class VehicleModelResolver {
  constructor(
    private userCase: UserUseCases,
    private vehicleModelUseCase: VehicleModelUseCases,
    private vehicleTypeUseCase: VehicleTypeUseCases,
    private vehicleBrandUseCase: VehicleBrandUseCases,
  ) {}
  @Query(() => VehicleModelGraphql)
  async getVehicleModel(@Args() request: GetVehicleModelArgs) {
    return await this.vehicleModelUseCase.getModel(request);
  }
  @Query(() => [VehicleModelGraphql], { nullable: true })
  async getAllVehicleModel(@Args() args: VehicleModelWhereArgs) {
    const models = await this.vehicleModelUseCase.getAllModels(args);

    return models;
  }
  @Mutation(() => VehicleModelGraphql)
  async createVehicleModel(
    @Args('vehicleModelInput') vehicleModelInput: VehicleModelInput,
    @CurrentUser() user: User,
  ) {
    vehicleModelInput.created_by = user.id;
    vehicleModelInput.updated_by = user.id;

    return await this.vehicleModelUseCase.createModel(vehicleModelInput);
  }
  @Mutation(() => VehicleModelGraphql)
  async updatedVehicleModel(
    @Args('id') id: string,
    @Args('vehicleModelUpdate') vehicleModelUpdate: VehicleModelUpdateInput,
    @CurrentUser() user: User,
  ) {
    vehicleModelUpdate.updated_by = user.id;

    return await this.vehicleModelUseCase.updateModel(id, vehicleModelUpdate);
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: VehicleModelGraphql) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: VehicleModelInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => VehicleTypeModel)
  async VehicleType(@Parent() vehicleModel: VehicleModelInput) {
    const { type_id: typeID } = vehicleModel;

    return await this.vehicleTypeUseCase.getVehicleType({ id: typeID });
  }
  @ResolveField(() => VehicleBrandReferences)
  async VehicleBrand(@Parent() vehicleModel: VehicleModelInput) {
    const { brand_id: brandId } = vehicleModel;

    return await this.vehicleBrandUseCase.getVehicleBrand({ id: brandId });
  }
}
