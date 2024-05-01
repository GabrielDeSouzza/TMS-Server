import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { MaintenanceCompanyUseCases } from 'app/useCases/MaintenanceCompanyUseCases/MaintenanceCompanyUseCase';
import { MaintenanceUseCases } from 'app/useCases/MaintenanceUseCase /MaintenanceUseCases';
import { TypeOfMaintenanceUseCases } from 'app/useCases/TypeOfMaintenanceUseCase/TypeOfMaintenanceUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { MaintenanceCompanyModel } from '../MaintenanceCompanyGraphql/MaintenanceCompany.model';
import { GetMaintenanceArgs } from '../MaintenanceGraphql/Args/GetMaintenanceArgs';
import { TypeOfMaintenanceModel } from '../TypeOfMaintenanceGraphql/TypeOfMaintenance.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import {
  MaintenanceCountArgs,
  MaintenanceWhereArgs,
} from './Args/WhereMaintenanceArgs';
import {
  MaintenanceInput,
  MaintenanceUpdateInput,
  MaintenanceUpdateManyInput,
} from './Maintenance.input';
import { MaintenanceModel } from './Maintenance.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => MaintenanceModel)
export class MaintenanceResolver {
  constructor(
    private maintenanceUseCase: MaintenanceUseCases,
    private userCase: UserUseCases,
    private vehicleUseCase: VehicleUseCases,
    private maintenanceCompanyUseCase: MaintenanceCompanyUseCases,
    private typeOfMaintenanceUseCase: TypeOfMaintenanceUseCases,
  ) {}
  @Query(() => Int)
  async countMaintenance(@Args() request: MaintenanceCountArgs) {
    return this.maintenanceUseCase.countMaintenance(request);
  }
  @Query(() => MaintenanceModel)
  async getMaintenance(@Args() request: GetMaintenanceArgs) {
    return this.maintenanceUseCase.getMaintenance(request);
  }
  @Query(() => [MaintenanceModel], { nullable: true })
  async getAllMaintenance(@Args() args: MaintenanceWhereArgs) {
    return await this.maintenanceUseCase.getAllMaintenance(args);
  }
  @Mutation(() => MaintenanceModel)
  async createMaintenance(
    @Args('data')
    maintenanceInput: MaintenanceInput,
    @CurrentUser() user: User,
  ) {
    maintenanceInput.created_by = user.id;
    maintenanceInput.updated_by = user.id;

    return this.maintenanceUseCase.createMaintenance(maintenanceInput);
  }
  @Mutation(() => MaintenanceModel)
  async updateMaintenance(
    @Args('id') id: string,
    @Args('data')
    recipent: MaintenanceUpdateInput,
    @CurrentUser() user: User,
  ) {
    recipent.updated_by = user.id;

    return this.maintenanceUseCase.updateMaintenance(id, recipent);
  }
  @Mutation(() => [MaintenanceModel])
  async updateManyMaintenance(
    @Args({ name: 'data', type: () => [MaintenanceUpdateManyInput] })
    data: MaintenanceUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.maintenanceUseCase.updateManyMaintenance(data, user.id);
  }
  @Mutation(() => MaintenanceModel)
  async deleteMaintenance(@Args('id') id: string) {
    return this.maintenanceUseCase.deleteMaintenance(id);
  }

  @Mutation(() => [MaintenanceModel])
  async deleteManyMaintenance(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.maintenanceUseCase.deleteManyMaintenance(ids);
  }

  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() maintenance: MaintenanceInput) {
    return this.vehicleUseCase.getVehicle({
      vehicleId: maintenance.vehicle_id,
    });
  }

  @ResolveField(() => TypeOfMaintenanceModel)
  async TypeOfMaintenance(@Parent() maintenance: MaintenanceInput) {
    return this.typeOfMaintenanceUseCase.getTypeOfMaintenance({
      id: maintenance.type_of_maintenance_id,
    });
  }

  @ResolveField(() => MaintenanceCompanyModel)
  async MaintenanceCompany(@Parent() maintenance: MaintenanceInput) {
    return this.maintenanceCompanyUseCase.getMaintenanceCompany({
      id: maintenance.maintenance_company_id,
    });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: MaintenanceInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: MaintenanceInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
