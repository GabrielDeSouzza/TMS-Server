import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/user/User';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import {
  OutsourcedVehicleUpdateInput,
  OutsourcedVehicleInput,
} from './OutsourcedVehicle.input';
import { OutsourcedVehicleIModel } from './OutsourcedVehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedVehicleIModel)
export class OutsourcedVehicleResolver {
  constructor(
    private outsourcedReposity: OutsourcedVehicleRepository,
    private vehicleRepositoy: VehicleRepository,
  ) {}
  @Query(() => OutsourcedVehicleIModel)
  async getOutsourcedVehicle(@Args('id') id: string) {
    return await this.outsourcedReposity.findOutsourcedVehicle(id);
  }
  @Query(() => [OutsourcedVehicleIModel])
  async getAllOutsourcedVehicle() {
    return await this.outsourcedReposity.findAllOutsourcedVehicle();
  }
  @Mutation(() => OutsourcedVehicleIModel)
  async createOutsourcedVehicle(
    @Args('OutsourcedVehicleInput') outsoucedVehicle: OutsourcedVehicleInput,
    @CurrentUser() user: User,
  ) {
    outsoucedVehicle.created_by = user.id;
    outsoucedVehicle.updated_by = user.id;

    return await this.outsourcedReposity.createOutsourcedVehicle(
      outsoucedVehicle,
      outsoucedVehicle.Vehicle,
    );
  }
  @Mutation(() => OutsourcedVehicleIModel)
  async updatedOutsourcedVehicle(
    @Args('id') id: string,
    @Args('outsourced') outsourced: OutsourcedVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourced.updated_by = user.id;

    return await this.outsourcedReposity.updateOutsourcedVehicle(
      id,
      outsourced,
      outsourced.Vehicle,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: OutsourcedVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleRepositoy.findVehicleById(vehicleId);
  }
}
