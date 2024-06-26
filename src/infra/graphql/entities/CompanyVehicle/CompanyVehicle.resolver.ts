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

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { CompanyVehicleUseCases } from 'app/useCases/CompanyVehicleUseCases/CompanyVehicleUseCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import {
  CompanyVehicleCountArgs,
  CompanyVehicleWhereArgs,
} from 'infra/graphql/entities/CompanyVehicle/Args/WhereCompanyVehicleArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetCompanVehicleArgs } from './Args/GetCompanyVehicleArgs';
import {
  CompanyVehicleInput,
  CompanyVehicleUpdateInput,
  CompanyVehicleUpdateManyInput,
} from './CompanyVehicle.input';
import { CompanyVehicleIModel } from './CompanyVehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => CompanyVehicleIModel)
export class CompanyVehicleResolver {
  constructor(
    private companyVehcileUseCases: CompanyVehicleUseCases,
    private vehicleUseCase: VehicleUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  @Query(() => Number)
  async totalCompanyVehicles(@Args() request: CompanyVehicleCountArgs) {
    const companyVehicle = await this.companyVehcileUseCases.count(request);

    return companyVehicle;
  }

  @Query(() => CompanyVehicleIModel)
  async getCompanyVehicle(@Args() request: GetCompanVehicleArgs) {
    return this.companyVehcileUseCases.getCompanyVehicle(request);
  }
  @Query(() => [CompanyVehicleIModel])
  async getAllCompanyVehicle(@Args() args: CompanyVehicleWhereArgs) {
    return await this.companyVehcileUseCases.getAllCompanyVehicle({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
  }
  @Mutation(() => CompanyVehicleIModel)
  async createCompanyVehicle(
    @Args('CompanyVehicleInput') companyVehicle: CompanyVehicleInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.created_by = user.id;
    companyVehicle.updated_by = user.id;

    return await this.companyVehcileUseCases.createCompanyVehicle(
      companyVehicle,
    );
  }
  @Mutation(() => CompanyVehicleIModel)
  async updatedCompanyVehicle(
    @Args('id') id: string,
    @Args('outsourced') companyVehicle: CompanyVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    companyVehicle.updated_by = user.id;

    return await this.companyVehcileUseCases.updateCompanyVehicle(
      id,
      companyVehicle,
    );
  }

  @Mutation(() => [CompanyVehicleIModel])
  async updateManyCompanyVehicles(
    @Args({
      name: 'updateManyCompanyVehicles',
      type: () => [CompanyVehicleUpdateManyInput],
    })
    updateCompanyVehicleInput: CompanyVehicleUpdateManyInput[],
  ) {
    return await this.companyVehcileUseCases.updateManyCompanyVehicles(
      updateCompanyVehicleInput,
    );
  }

  @Mutation(() => CompanyVehicleIModel)
  async deleteCompanyVehicle(@Args('id', { type: () => String }) id: string) {
    return await this.companyVehcileUseCases.deleteCompanyVehicle(id);
  }

  @Mutation(() => [CompanyVehicleIModel])
  async deleteManyCompanyVehicles(
    @Args({ name: 'deleteManyCompanyVehicles', type: () => [String] })
    ids: string[],
  ) {
    return await this.companyVehcileUseCases.deleteManyCompanyVehicles(ids);
  }

  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsoucedVehicle: CompanyVehicleInput) {
    const { vehicle_id: vehicleId } = outsoucedVehicle;

    return await this.vehicleUseCase.getVehicle({ vehicleId: vehicleId });
  }
  @ResolveField(() => VehicleCarModel)
  async CarrierCompany(@Parent() outsoucedVehicle: CompanyVehicleInput) {
    return await this.carrierCompanyUseCase.getCarrierCompany({
      id: outsoucedVehicle.carrier_company_id,
    });
  }
}
