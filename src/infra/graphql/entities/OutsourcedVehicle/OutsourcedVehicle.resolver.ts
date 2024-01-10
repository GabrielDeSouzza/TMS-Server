import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { OutsourcedTransportVehicleWhereArgs } from 'infra/graphql/args/OutsourcedTransportVehicleArgs';
import { OutsourcedVehicleGraphDTO } from 'infra/graphql/DTO/OutsoucerdVehicle';
import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
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
  async getAllOutsourcedVehicle(
    @Args() args: OutsourcedTransportVehicleWhereArgs,
  ) {
    return await this.outsourcedReposity.findAllOutsourcedVehicle({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
  }
  @Mutation(() => OutsourcedVehicleIModel)
  async createOutsourcedVehicle(
    @Args('OutsourcedVehicleInput') outsoucedVehicle: OutsourcedVehicleInput,
    @CurrentUser() user: User,
  ) {
    outsoucedVehicle.created_by = user.id;
    outsoucedVehicle.updated_by = user.id;
    const outsourcedVehicleEntity =
      OutsourcedVehicleGraphDTO.createInputToEntity(outsoucedVehicle);
    const vehicleEntity = VehicleGraphDTO.createInputToEntity(
      outsoucedVehicle.Vehicle,
    );

    return await this.outsourcedReposity.createOutsourcedVehicle(
      outsourcedVehicleEntity,
      vehicleEntity,
    );
  }
  @Mutation(() => OutsourcedVehicleIModel)
  async updatedOutsourcedVehicle(
    @Args('id') id: string,
    @Args('outsourced') outsourced: OutsourcedVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourced.updated_by = user.id;
    const outsourcedVehicleEntity =
      OutsourcedVehicleGraphDTO.updateInputToEntity(outsourced);
    const vehicleEntity = outsourced.Vehicle
      ? VehicleGraphDTO.updateInputToEntity(outsourced.Vehicle)
      : undefined;

    return await this.outsourcedReposity.updateOutsourcedVehicle(
      id,
      outsourcedVehicleEntity,
      vehicleEntity,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: OutsourcedVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleRepositoy.findVehicleById(vehicleId);
  }
}
