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
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedTransportVehicleGraphqlDTO } from 'infra/graphql/DTO/OutsourcedTransportVehicleGraphqlDto';
import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
import { OutsourcedTransportVehicleWhereArgs } from 'infra/graphql/entities/OutsourcedTransportVehicleGraphql/Args/OutsourcedTransportVehicleArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { VehicleCarModel } from '../VehicleGraphql/vehicle.model';
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
    private outsourcedTransportVehicleRepository: OutsourcedTransportVehicleRepository,
    private userCase: UserUseCases,
    private vehicleRepository: VehicleRepository,
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
  ) {}
  @Query(() => OutsourcedTransportVehicleModel)
  async getOutsourcedTransportVehicleModel(@Args('id') id: string) {
    return this.outsourcedTransportVehicleRepository.findOutsourcedTransportVehicle(
      { id },
    );
  }
  @Query(() => [OutsourcedTransportVehicleModel], { nullable: true })
  async getAllOutsourcedTransportVehicle(
    @Args() args: OutsourcedTransportVehicleWhereArgs,
  ) {
    const outsourcedTransportVehicle =
      await this.outsourcedTransportVehicleRepository.getAllOutsourcedTransportVehicle(
        {
          limit: args.limit,
          offset: args.offset,
          sort: args.sort,
          where: args.where,
        },
      );

    return outsourcedTransportVehicle.length > 0
      ? outsourcedTransportVehicle
      : null;
  }
  @Mutation(() => OutsourcedTransportVehicleModel)
  async createOutsourcedTransportVehicle(
    @Args('outsourcedTransportVehicleInput')
    outsourcedTransportVehicleInput: OutsourcedTransportVehicleInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportVehicleInput.created_by = user.id;
    outsourcedTransportVehicleInput.updated_by = user.id;
    const outsourcedTransportVehicleEntity =
      OutsourcedTransportVehicleGraphqlDTO.createInputToEntity(
        outsourcedTransportVehicleInput,
      );
    const vehicleEntity = VehicleGraphDTO.createInputToEntity(
      outsourcedTransportVehicleInput.Vehicle,
    );

    return this.outsourcedTransportVehicleRepository.createOutsourcedTransportVehicle(
      outsourcedTransportVehicleEntity,
      vehicleEntity,
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
    const outsourcedTransportVehicleEntity =
      OutsourcedTransportVehicleGraphqlDTO.updateInputToEntity(
        outsourcedTransportVehicleInput,
      );
    const vehicleEntity = VehicleGraphDTO.updateInputToEntity(
      outsourcedTransportVehicleInput.Vehicle,
    );

    return await this.outsourcedTransportVehicleRepository.updateOutsourcedTransportVehicle(
      id,
      outsourcedTransportVehicleEntity,
      vehicleEntity,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsourced: OutsourcedTransportVehicleModel) {
    return await this.vehicleRepository.findVehicle({
      vehicleId: outsourced.vehicle_id,
    });
  }
  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() outsourced: OutsourcedTransportVehicleModel,
  ) {
    return await this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompany(
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
