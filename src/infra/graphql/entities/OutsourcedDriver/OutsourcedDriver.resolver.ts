import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/user/User';
import { ContractOutsourcedDriverRepository } from 'domain/repositories/ContractOutsourcedDriverResitory';
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { ContractOutsourcedDriverModel } from '../ContractOutsourcedDriverGraphql/ContractOutsourcedDriver.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { OutsourcedVehicleRecefencesModel } from '../OutsourcedVehicle/OutsourcedVehicle.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  OutsourcedDriverUpdateInput,
  OutsourcedDriverInput,
} from './OutsourcedDriver.input';
import { OutsourcedDriverModel } from './OutsourcedDriver.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedDriverModel)
export class OutsourcedDriverResolver {
  constructor(
    private outsourcedDriverRepository: OutsourcedDriverRepository,
    private userRepository: UserRepository,
    private naturalPersonRepository: NaturalPersonRepository,
    private outsourcedVehicleRepository: OutsourcedVehicleRepository,
    private contractOutsourcedDriverRepository: ContractOutsourcedDriverRepository,
  ) {}
  @Query(() => OutsourcedDriverModel)
  async getOutsourcedDriver(@Args('id') id: string) {
    return await this.outsourcedDriverRepository.findOutsourcedDriver(id);
  }
  @Query(() => [OutsourcedDriverModel])
  async getAllOutsourcedDriver() {
    return await this.outsourcedDriverRepository.findAllOutsourcedDriver();
  }
  @Mutation(() => OutsourcedDriverModel)
  async createOutsourcedDriver(
    @Args('outsourcedDriver') outsourcedDriver: OutsourcedDriverInput,
    @CurrentUser() user: User,
  ) {
    const {
      ContractOutsourcedDriver: contractOutsourcedDriver,
      NaturalPerson: naturalPerson,
      OutsourcedVehicle: outsourcedVehicle,
    } = outsourcedDriver;
    outsourcedDriver.updated_by = user.id;
    outsourcedDriver.created_by = user.id;
    outsourcedVehicle.created_by = user.id;
    outsourcedVehicle.updated_by = user.id;

    return await this.outsourcedDriverRepository.createOutsourcedDriver(
      outsourcedDriver,
      naturalPerson,
      contractOutsourcedDriver,
      outsourcedVehicle,
      outsourcedVehicle.Vehicle,
    );
  }
  @Mutation(() => OutsourcedDriverModel)
  async updateOutsourcedDriver(
    @Args('id') id: string,
    @Args('outsourcedDriver')
    outsourcedDriver: OutsourcedDriverUpdateInput,
    @CurrentUser() user: User,
  ) {
    const {
      ContractOutsourcedDriver: contractOutsourcedDriver,
      NaturalPerson: naturalPerson,
      OutsourcedVehicle: outsourcedVehicle,
    } = outsourcedDriver;
    outsourcedDriver.updated_by = user.id;

    if (contractOutsourcedDriver) {
      contractOutsourcedDriver.outsourced_driver_id = id;
      contractOutsourcedDriver.updated_by = user.id;
      contractOutsourcedDriver.created_by = user.id;
    }

    if (outsourcedVehicle) outsourcedVehicle.updated_by = user.id;

    return this.outsourcedDriverRepository.updateOutsourcedDriver(
      id,
      outsourcedDriver,
      naturalPerson,
      contractOutsourcedDriver,
      outsourcedVehicle,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OutsourcedDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: OutsourcedDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }

  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(@Parent() outsourcedDriverInput: OutsourcedDriverModel) {
    return await this.naturalPersonRepository.findNaturalPersonByIdOrCpf(
      outsourcedDriverInput.natural_person_id,
    );
  }
  @ResolveField(() => OutsourcedVehicleRecefencesModel)
  async OutsourcedVehicle(
    @Parent() outsourcedDriverInput: OutsourcedDriverInput,
  ) {
    const { outsourced_vehicle_id: outsourcedVehicleId } =
      outsourcedDriverInput;
    console.log(outsourcedVehicleId);

    return await this.outsourcedVehicleRepository.findOutsourcedVehicle(
      outsourcedVehicleId,
    );
  }
  @ResolveField(() => [ContractOutsourcedDriverModel])
  async ContractOutsourcedDriver(
    @Parent() outsourcedDriverInput: OutsourcedDriverModel,
  ) {
    const { id } = outsourcedDriverInput;

    return await this.contractOutsourcedDriverRepository.findAllContracOutsourcedDriverByOutsourcedDriverId(
      id,
    );
  }
}
