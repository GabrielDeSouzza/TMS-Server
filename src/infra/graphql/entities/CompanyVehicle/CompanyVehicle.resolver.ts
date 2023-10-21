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
import { CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import {
  CompanyVehicleInput,
  CompanyVehicleUpdateInput,
} from './CompanyVehicle.input';
import { CompanyVehicleIModel } from './CompanyVehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => CompanyVehicleIModel)
export class CompanyVehicleResolver {
  constructor(
    private outsourcedReposity: CompanyVehicleRepository,
    private vehicleRepositoy: VehicleRepository,
  ) {}
  @Query(() => CompanyVehicleIModel)
  async getCompanyVehicle(@Args('id') id: string) {
    return this.outsourcedReposity.findCompanyVehicle(id);
  }
  @Query(() => [CompanyVehicleIModel])
  async getAllCompanyVehicle() {
    return await this.outsourcedReposity.findAllCompanyVehicle();
  }
  @Mutation(() => CompanyVehicleIModel)
  async createCompanyVehicle(
    @Args('CompanyVehicleInput') outsoucedVehicle: CompanyVehicleInput,
    @CurrentUser() user: User,
  ) {
    outsoucedVehicle.created_by = user.id;
    outsoucedVehicle.updated_by = user.id;

    return await this.outsourcedReposity.createCompanyVehicle(
      outsoucedVehicle,
      outsoucedVehicle.Vehicle,
    );
  }
  @Mutation(() => CompanyVehicleIModel)
  async updatedCompanyVehicle(
    @Args('id') id: string,
    @Args('outsourced') outsourced: CompanyVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourced.updated_by = user.id;

    return await this.outsourcedReposity.updateCompanyVehicle(
      id,
      outsourced,
      outsourced.Vehicle,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: CompanyVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleRepositoy.findVehicleById(vehicleId);
  }
}
