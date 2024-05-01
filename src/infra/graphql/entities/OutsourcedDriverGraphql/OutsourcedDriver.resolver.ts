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
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';

import { CompanyVehicleUseCases } from 'app/useCases/CompanyVehicleUseCases/CompanyVehicleUseCases';
import { OutsourcedVehicleUseCases } from 'app/useCases/OutsoucedVehicleUseCases/OutsourcedVehicleUseCases';
import { OutsourcedDriverUseCases } from 'app/useCases/OutsourcedDriverUseCases/OutsourcedDriverUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import {
  OutsourcedDriverCountArgs,
  OutsourcedDriverWhereArgs,
} from 'infra/graphql/entities/OutsourcedDriverGraphql/Args/WhereOutsourcedDriverArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { CompanyVehicleIModel } from '../CompanyVehicle/CompanyVehicle.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { OutsourcedVehicleRecefencesModel } from '../OutsourcedVehicle/OutsourcedVehicle.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetOutsoucedDriverArgs } from './Args/GetOutsourcedDriverArgs';
import {
  OutsourcedDriverUpdateInput,
  OutsourcedDriverInput,
  OutsourcedDriverUpdateManyInput,
} from './OutsourcedDriver.input';
import { OutsourcedDriverModel } from './OutsourcedDriver.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedDriverModel)
export class OutsourcedDriverResolver {
  constructor(
    private outsourcedDriverUseCase: OutsourcedDriverUseCases,
    private userCase: UserUseCases,
    private naturalPersonRepository: NaturalPersonRepository,
    private outsourcedVehicleUseCase: OutsourcedVehicleUseCases,
    private companyVehicleUseCase: CompanyVehicleUseCases,
  ) {}
  @Query(() => Int)
  async countOutsourcedDriver(@Args() request: OutsourcedDriverCountArgs) {
    return this.outsourcedDriverUseCase.countOutsourcedDriver(request);
  }
  @Query(() => OutsourcedDriverModel)
  async getOutsourcedDriver(@Args() request: GetOutsoucedDriverArgs) {
    return await this.outsourcedDriverUseCase.getOutsourcedDriver(request);
  }
  @Query(() => [OutsourcedDriverModel])
  async getAllOutsourcedDriver(@Args() args: OutsourcedDriverWhereArgs) {
    return await this.outsourcedDriverUseCase.getAllOutsourcedDriver(args);
  }
  @Mutation(() => OutsourcedDriverModel)
  async createOutsourcedDriver(
    @Args('outsourcedDriver') outsourcedDriver: OutsourcedDriverInput,
    @CurrentUser() user: User,
  ) {
    outsourcedDriver.updated_by = user.id;
    outsourcedDriver.created_by = user.id;

    return await this.outsourcedDriverUseCase.createOutsourcedDriver(
      outsourcedDriver,
    );
  }
  @Mutation(() => OutsourcedDriverModel)
  async updateOutsourcedDriver(
    @Args('id') id: string,
    @Args('outsourcedDriver')
    outsourcedDriver: OutsourcedDriverUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedDriver.updated_by = user.id;

    return this.outsourcedDriverUseCase.updateOutsourcedDriver(
      id,
      outsourcedDriver,
    );
  }
  @Mutation(() => [OutsourcedDriverModel])
  async updateManyOutsourcedDriver(
    @Args({ name: 'data', type: () => [OutsourcedDriverUpdateManyInput] })
    data: OutsourcedDriverUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.outsourcedDriverUseCase.updateManyOutsourcedDriver(
      data,
      user.id,
    );
  }
  @Mutation(() => OutsourcedDriverModel)
  async deleteOutsourcedDriver(@Args('id') id: string) {
    return this.outsourcedDriverUseCase.deleteOutsourcedDriver(id);
  }

  @Mutation(() => [OutsourcedDriverModel])
  async deleteManyOutsourcedDriver(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.outsourcedDriverUseCase.deleteManyOutsourcedDriver(ids);
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OutsourcedDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }

  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(@Parent() outsourcedDriverInput: OutsourcedDriverModel) {
    return await this.naturalPersonRepository.findNaturalPerson({
      naturalPersonId: outsourcedDriverInput.natural_person_id,
    });
  }
  @ResolveField(() => OutsourcedVehicleRecefencesModel, { nullable: true })
  async OutsourcedVehicle(
    @Parent() outsourcedDriverInput: OutsourcedDriverInput,
  ) {
    const { outsourced_vehicle_id: outsourcedVehicleId } =
      outsourcedDriverInput;

    return await this.outsourcedVehicleUseCase.getOutsourcedVehicle({
      id: outsourcedVehicleId,
    });
  }
  @ResolveField(() => CompanyVehicleIModel, { nullable: true })
  async CompanyVehicle(@Parent() outsourcedDriver: OutsourcedDriverInput) {
    const { company_vehicle_id: companyVehicleId } = outsourcedDriver;

    return await this.companyVehicleUseCase.getCompanyVehicle({
      id: companyVehicleId,
    });
  }
}
