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
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedDriverWhereArgs } from 'infra/graphql/args/OutsourcedDriverArgs';
import { ContractOutsourcedDriverGraphDTO } from 'infra/graphql/DTO/ContractOutsourcedDriver';
import { NaturalPersonGraphDTO } from 'infra/graphql/DTO/NaturalPerson';
import { OutsourcedVehicleGraphDTO } from 'infra/graphql/DTO/OutsoucerdVehicle';
import { OutsourcedDriverGraphDTO } from 'infra/graphql/DTO/OutsourcedDriver';
import { VehicleGraphDTO } from 'infra/graphql/DTO/Vehicle';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

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
    private userCase: UserUseCases,
    private naturalPersonRepository: NaturalPersonRepository,
    private outsourcedVehicleRepository: OutsourcedVehicleRepository,
  ) {}
  @Query(() => OutsourcedDriverModel)
  async getOutsourcedDriver(@Args('id') id: string) {
    return await this.outsourcedDriverRepository.findOutsourcedDriver(id);
  }
  @Query(() => [OutsourcedDriverModel])
  async getAllOutsourcedDriver(@Args() args: OutsourcedDriverWhereArgs) {
    return await this.outsourcedDriverRepository.findAllOutsourcedDriver({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });
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
    const outsourcedDriverEntity =
      OutsourcedDriverGraphDTO.createInputToEntity(outsourcedDriver);
    const naturalPersonEntity =
      NaturalPersonGraphDTO.createInputToEntity(naturalPerson);
    const contractOutsourcedDriverEntity =
      ContractOutsourcedDriverGraphDTO.inputReferencesToEntity(
        contractOutsourcedDriver,
      );
    const outsourcedVehicleEntity =
      OutsourcedVehicleGraphDTO.createInputToEntity(outsourcedVehicle);
    const vehicleEntity = VehicleGraphDTO.createInputToEntity(
      outsourcedVehicle.Vehicle,
    );

    return await this.outsourcedDriverRepository.createOutsourcedDriver(
      outsourcedDriverEntity,
      naturalPersonEntity,
      contractOutsourcedDriverEntity,
      outsourcedVehicleEntity,
      vehicleEntity,
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

    const outsourcedDriverEntity =
      OutsourcedDriverGraphDTO.updateInputToEntity(outsourcedDriver);
    const naturalPersonEntity =
      NaturalPersonGraphDTO.updateInputToEntity(naturalPerson);
    const contractOutsourcedDriverEntity =
      ContractOutsourcedDriverGraphDTO.updateInputToEntity(
        contractOutsourcedDriver,
      );
    const outsourcedVehicleEntity =
      OutsourcedVehicleGraphDTO.updateInputToEntity(outsourcedVehicle);
    const vehicleEntity = VehicleGraphDTO.updateInputToEntity(
      outsourcedVehicle ? outsourcedVehicle.Vehicle : undefined,
    );

    if (outsourcedVehicle) outsourcedVehicle.updated_by = user.id;

    return this.outsourcedDriverRepository.updateOutsourcedDriver(
      id,
      outsourcedDriverEntity,
      naturalPersonEntity,
      contractOutsourcedDriverEntity,
      outsourcedVehicleEntity,
      vehicleEntity,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OutsourcedDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: OutsourcedDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
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
}
