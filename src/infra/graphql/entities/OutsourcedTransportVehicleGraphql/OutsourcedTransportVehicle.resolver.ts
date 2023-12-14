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
import { UserRepository } from 'domain/repositories/UserRepository';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { OutsourcedTransportVehicleGraphqlDTO } from 'infra/graphql/DTO/OutsourcedTransportVehicleGraphqlDto';
import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
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
    private userRepository: UserRepository,
    private vehicleRepository: VehicleRepository,
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
  ) {}
  @Query(() => OutsourcedTransportVehicleModel)
  async getOutsourcedTransportVehicleModel(@Args('id') id: string) {
    return this.outsourcedTransportVehicleRepository.findOutsourcedTransportVehicleById(
      id,
    );
  }
  @Query(() => [OutsourcedTransportVehicleModel], { nullable: true })
  async getAllOutsourcedTransportVehicle() {
    const outsourcedTransportVehicle =
      await this.outsourcedTransportVehicleRepository.getAllOutsourcedTransportVehicle();

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
    console.log(vehicleEntity.year);

    return await this.outsourcedTransportVehicleRepository.updateOutsourcedTransportVehicle(
      id,
      outsourcedTransportVehicleEntity,
      vehicleEntity,
    );
  }
  @ResolveField(() => VehicleCarModel)
  async Vehicle(@Parent() outsourced: OutsourcedTransportVehicleModel) {
    return this.vehicleRepository.findVehicleById(outsourced.vehicle_id);
  }
  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() outsourced: OutsourcedTransportVehicleModel,
  ) {
    return await this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompanyById(
      outsourced.outsourced_company_id,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OutsourcedTransportVehicleInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: OutsourcedTransportVehicleInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
