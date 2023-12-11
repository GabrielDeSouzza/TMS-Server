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
import { CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { CompanyVehicleGraphDTO } from 'infra/graphql/DTO/CompanyVehicle';
import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
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
    private companyRespository: CompanyVehicleRepository,
    private vehicleRepositoy: VehicleRepository,
  ) {}
  @Query(() => CompanyVehicleIModel)
  async getCompanyVehicle(@Args('id') id: string) {
    return this.companyRespository.findCompanyVehicle(id);
  }
  @Query(() => [CompanyVehicleIModel])
  async getAllCompanyVehicle() {
    return await this.companyRespository.findAllCompanyVehicle();
  }
  @Mutation(() => CompanyVehicleIModel)
  async createCompanyVehicle(
    @Args('CompanyVehicleInput') companyVehicle: CompanyVehicleInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.created_by = user.id;
    companyVehicle.updated_by = user.id;
    const companydVehicleEntity =
      CompanyVehicleGraphDTO.createInputToEntity(companyVehicle);
    const vehicleEntity = VehicleGraphDTO.createInputToEntity(
      companyVehicle.Vehicle,
    );

    return await this.companyRespository.createCompanyVehicle(
      companydVehicleEntity,
      vehicleEntity,
    );
  }
  @Mutation(() => CompanyVehicleIModel)
  async updatedCompanyVehicle(
    @Args('id') id: string,
    @Args('outsourced') companyVehicle: CompanyVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.updated_by = user.id;
    const companydVehicleEntity =
      CompanyVehicleGraphDTO.updateInputToEntity(companyVehicle);
    const vehicleEntity = VehicleGraphDTO.updateInputToEntity(
      companyVehicle.Vehicle,
    );

    return await this.companyRespository.updateCompanyVehicle(
      id,
      companydVehicleEntity,
      vehicleEntity,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: CompanyVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleRepositoy.findVehicleById(vehicleId);
  }
}
