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

import { OutsourcedTransportCompanyUseCases } from 'app/useCases/OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';
import { OutsourcedTransportCompanyVehicleUseCases } from 'app/useCases/OutsourcedTransportCompanyVehicleUseCases/OutsourcedTransportCompanyVehicleUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';
import { VehicleUseCases } from 'app/useCases/VehicleUseCases/VehicleUseCases';

import { OutsourcedTransportVehicleWhereArgs } from 'infra/graphql/entities/OutsourcedTransportVehicleGraphql/Args/WhereOutsourcedTransportVehicleArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
import { GetOutsourcedTransportVehicleArgs } from './Args/GetOutsourcedTransportVehicleArgs';
import {
  OutsourcedTransportVehicleInput,
  OutsourcedTransportVehicleUpdateInput,
} from './OutsourcedTransportVehicle.input';
import { OutsourcedTransportVehicleModel } from './OutsourcedTransportVehicle.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedTransportVehicleModel)
export class OutsourcedTransportVehicleResolver {
  constructor(
    private outsourcedTransportVehicleUseCase: OutsourcedTransportCompanyVehicleUseCases,
    private userCase: UserUseCases,
    private vehicleUseCase: VehicleUseCases,
    private outsourcedTransportCompanyUseCase: OutsourcedTransportCompanyUseCases,
  ) {}
  @Query(() => OutsourcedTransportVehicleModel, { nullable: true })
  async getOutsourcedTransportVehicleModel(
    @Args() request: GetOutsourcedTransportVehicleArgs,
  ) {
    return this.outsourcedTransportVehicleUseCase.getOutsourcedTransportCompanyVehicle(
      request,
    );
  }
  @Query(() => [OutsourcedTransportVehicleModel], { nullable: true })
  async getAllOutsourcedTransportVehicle(
    @Args() args: OutsourcedTransportVehicleWhereArgs,
  ) {
    return await this.outsourcedTransportVehicleUseCase.getAllOutsourcedTransportCompanyVehicle(
      args,
    );
  }
  @Mutation(() => OutsourcedTransportVehicleModel)
  async createOutsourcedTransportVehicle(
    @Args('outsourcedTransportVehicleInput')
    outsourcedTransportVehicleInput: OutsourcedTransportVehicleInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportVehicleInput.created_by = user.id;
    outsourcedTransportVehicleInput.updated_by = user.id;

    return this.outsourcedTransportVehicleUseCase.createOutsourcedTransportCompanyVehicle(
      outsourcedTransportVehicleInput,
    );
  }
  @Mutation(() => OutsourcedTransportVehicleModel)
  async updateoutsourcedTransportVehicle(
    @Args('id') id: string,
    @Args('outsourcedTransportVehicleInput')
    outsourcedTransportVehicleInput: OutsourcedTransportVehicleUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportVehicleInput.updated_by = user.id;

    return await this.outsourcedTransportVehicleUseCase.updateOutsourcedTransportCompanyVehicle(
      id,
      outsourcedTransportVehicleInput,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsourced: OutsourcedTransportVehicleModel) {
    return await this.vehicleUseCase.getVehicle({
      vehicleId: outsourced.vehicle_id,
    });
  }
  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() outsourced: OutsourcedTransportVehicleModel,
  ) {
    return await this.outsourcedTransportCompanyUseCase.getOutsourcedTransportCompany(
      { id: outsourced.outsourced_company_id },
    );
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedTransportVehicleInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OutsourcedTransportVehicleInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
