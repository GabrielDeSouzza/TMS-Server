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

import { OutsourcedVehicleUseCases } from 'app/useCases/OutsoucedVehicleUseCases/OutsourcedVehicleUseCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { OutsourcedTransportVehicleWhereArgs } from 'infra/graphql/entities/OutsourcedTransportVehicleGraphql/Args/WhereOutsourcedTransportVehicleArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetOutsoucedVehicleArgs } from './Args/GetOutsourcedVehicleArgs';
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
    private outsourcedUseCase: OutsourcedVehicleUseCases,
    private vehicleUseCase: VehicleUseCases,
  ) {}
  @Query(() => OutsourcedVehicleIModel)
  async getOutsourcedVehicle(@Args() request: GetOutsoucedVehicleArgs) {
    return await this.outsourcedUseCase.getOutsourcedVehicle(request);
  }
  @Query(() => [OutsourcedVehicleIModel])
  async getAllOutsourcedVehicle(
    @Args() args: OutsourcedTransportVehicleWhereArgs,
  ) {
    return await this.outsourcedUseCase.getAllOutsourcedVehicle({
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

    return await this.outsourcedUseCase.createOutsourcedVehicle(
      outsoucedVehicle,
    );
  }
  @Mutation(() => OutsourcedVehicleIModel)
  async updatedOutsourcedVehicle(
    @Args('id') id: string,
    @Args('outsourced') outsourced: OutsourcedVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourced.updated_by = user.id;

    return await this.outsourcedUseCase.updateOutsourcedVehicle(id, outsourced);
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: OutsourcedVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleUseCase.getVehicle({ vehicleId });
  }
}
