/* eslint-disable @typescript-eslint/naming-convention */
import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';
import { VehicleBodyworkRepository } from 'domain/repositories/VehicleBodyWorkRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleTypeUseCases } from 'app/useCases/VehicleTypeUseCases/VehicleTypeUseCases';

import {
  VehicleTypeCountArgs,
  VehicleTypeWhereArgs,
} from 'infra/graphql/entities/VehicleTypeGraphql/Args/WhereVehicleTypeArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleBodyworkModel } from '../VehicleBodyworkGraphql/vehicle-bodywork.model';
import { GetVehicleTypeArgs } from './Args/GetVehicleTypeArgs';
import {
  VehicleTypeInput,
  VehicleTypeUpdateInput,
  VehicleTypeUpdateManyInput,
} from './vehicle-type.input';
import { VehicleTypeModel } from './vehicle-type.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => VehicleTypeModel)
export class VehicleTypeResolver {
  constructor(
    private vehicleTypeUseCase: VehicleTypeUseCases,
    private vehicleBodyworkRepository: VehicleBodyworkRepository,
    private userCase: UserUseCases,
  ) {}
  @Query(() => Number)
  async totalVehicleTypes(@Args() request: VehicleTypeCountArgs) {
    const vehicleType = await this.vehicleTypeUseCase.count(request);

    return vehicleType;
  }

  @Query(() => VehicleTypeModel)
  async getVehicleType(@Args() request: GetVehicleTypeArgs) {
    console.log(request);

    return this.vehicleTypeUseCase.getVehicleType(request);
  }

  @Query(() => [VehicleTypeModel], { nullable: true })
  async getAllVehicleTypes(@Args() args: VehicleTypeWhereArgs) {
    const vehicleTypes = await this.vehicleTypeUseCase.getAllVehicleType(args);

    return vehicleTypes;
  }

  @Mutation(() => VehicleTypeModel)
  async createVehicleType(
    @Args('vehicleTypeCreate') vehicleTypeInput: VehicleTypeInput,
    @CurrentUser() user: User,
  ) {
    vehicleTypeInput.created_by = user.id;
    vehicleTypeInput.updated_by = user.id;

    const type = await this.vehicleTypeUseCase.createVehicleType(
      vehicleTypeInput,
    );

    return type;
  }

  @Mutation(() => VehicleTypeModel)
  async updatedVehicleType(
    @Args('id') id: string,
    @Args('vehicleTypeInput') vehicleTypeInput: VehicleTypeUpdateInput,
    @CurrentUser() user: User,
  ) {
    vehicleTypeInput.updated_by = user.id;
    const type = await this.vehicleTypeUseCase.updateVehicleType(
      id,
      vehicleTypeInput,
    );

    return type;
  }

  @Mutation(() => [VehicleTypeModel])
  async updateManyVehicleTypes(
    @Args({
      name: 'updateManyVehicleTypes',
      type: () => [VehicleTypeUpdateManyInput],
    })
    updateVehicleTypeInput: VehicleTypeUpdateManyInput[],
  ) {
    return await this.vehicleTypeUseCase.updateManyVehicleTypes(
      updateVehicleTypeInput,
    );
  }

  @Mutation(() => VehicleTypeModel)
  async deleteVehicleType(@Args('id', { type: () => String }) id: string) {
    return await this.vehicleTypeUseCase.deleteVehicleType(id);
  }

  @Mutation(() => [VehicleTypeModel])
  async deleteManyVehicleTypes(
    @Args({ name: 'deleteManyVehicleTypes', type: () => [String] })
    ids: string[],
  ) {
    return await this.vehicleTypeUseCase.deleteManyVehicleTypes(ids);
  }

  @ResolveField(() => [VehicleBodyworkModel], { nullable: true })
  async BodyWorks(@Parent() vehicleTypeInput: VehicleTypeInput) {
    return await this.vehicleBodyworkRepository.getAllVehicleBodyworkByType({
      name: vehicleTypeInput.name,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: VehicleTypeInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: VehicleTypeInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
