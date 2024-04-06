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

import { TypeOfMaintenanceUseCases } from 'app/useCases/TypeOfMaintenanceUseCase/TypeOfMaintenanceUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { GetTypeOfMaintenanceArgs } from '../TypeOfMaintenanceGraphql/Args/GetTypeOfMaintenanceArgs';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { TypeOfMaintenanceWhereArgs } from './Args/WhereTypeOfMaintenanceArgs';
import {
  TypeOfMaintenanceInput,
  TypeOfMaintenanceUpdateInput,
} from './TypeOfMaintenance.input';
import { TypeOfMaintenanceModel } from './TypeOfMaintenance.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => TypeOfMaintenanceModel)
export class TypeOfMaintenanceResolver {
  constructor(
    private TypeOfMaintenanceUseCase: TypeOfMaintenanceUseCases,
    private userCase: UserUseCases,
  ) {}
  @Query(() => TypeOfMaintenanceModel)
  async getTypeOfMaintenance(@Args() request: GetTypeOfMaintenanceArgs) {
    return this.TypeOfMaintenanceUseCase.getTypeOfMaintenance(request);
  }
  @Query(() => [TypeOfMaintenanceModel], { nullable: true })
  async getAllTypeOfMaintenance(@Args() args: TypeOfMaintenanceWhereArgs) {
    return await this.TypeOfMaintenanceUseCase.getAllTypeOfMaintenance(args);
  }
  @Mutation(() => TypeOfMaintenanceModel)
  async createTypeOfMaintenance(
    @Args('data')
    typeofmaintenanceInput: TypeOfMaintenanceInput,
    @CurrentUser() user: User,
  ) {
    typeofmaintenanceInput.created_by = user.id;
    typeofmaintenanceInput.updated_by = user.id;

    return this.TypeOfMaintenanceUseCase.createTypeOfMaintenance(
      typeofmaintenanceInput,
    );
  }
  @Mutation(() => TypeOfMaintenanceModel)
  async updateTypeOfMaintenance(
    @Args('id') id: string,
    @Args('data')
    typeOfMaintenance: TypeOfMaintenanceUpdateInput,
    @CurrentUser() user: User,
  ) {
    typeOfMaintenance.updated_by = user.id;

    return this.TypeOfMaintenanceUseCase.updateTypeOfMaintenance(
      id,
      typeOfMaintenance,
    );
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: TypeOfMaintenanceInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: TypeOfMaintenanceInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
