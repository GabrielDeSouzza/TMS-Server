import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Query,
  Int,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';
import { MaintenanceCompanyUseCases } from 'app/useCases/MaintenanceCompanyUseCases/MaintenanceCompanyUseCase';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { GetMaintenanceCompanyArgs } from 'infra/graphql/entities/MaintenanceCompanyGraphql/Args/GetMaintenanceCompanyArgs';
import {
  MaintenanceCompanyCountArgs,
  MaintenanceCompanyWhereArgs,
} from 'infra/graphql/entities/MaintenanceCompanyGraphql/Args/WhereMaintenanceCompanyArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  MaintenanceCompanyInput,
  MaintenanceCompanyUpdateInput,
  MaintenanceCompanyUpdateManyInput,
} from './MaintenanceCompany.input';
import { MaintenanceCompanyModel } from './MaintenanceCompany.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => MaintenanceCompanyModel)
export class MaintenanceCompanyResolver {
  constructor(
    private maintenanceCompanyUseCase: MaintenanceCompanyUseCases,
    private userCase: UserUseCases,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  @Query(() => Int)
  async countMaintenanceCompany(@Args() request: MaintenanceCompanyCountArgs) {
    return this.maintenanceCompanyUseCase.countMaintenanceCompany(request);
  }
  @Query(() => MaintenanceCompanyModel)
  async getMaintenanceCompanyModel(
    @Args() maintenanceCompanySearch: GetMaintenanceCompanyArgs,
  ) {
    return await this.maintenanceCompanyUseCase.getMaintenanceCompany(
      maintenanceCompanySearch,
    );
  }
  @Query(() => [MaintenanceCompanyModel], { nullable: true })
  async getAllMaintenanceCompany(@Args() args: MaintenanceCompanyWhereArgs) {
    const maintenancecompany =
      await this.maintenanceCompanyUseCase.getAllMaintenanceCompanys({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return maintenancecompany.length > 0 ? maintenancecompany : null;
  }
  @Mutation(() => MaintenanceCompanyModel)
  async createMaintenanceCompany(
    @Args('maintenancecompanyInput')
    maintenancecompanyInput: MaintenanceCompanyInput,
    @CurrentUser() user: User,
  ) {
    maintenancecompanyInput.created_by = user.id;
    maintenancecompanyInput.updated_by = user.id;

    return await this.maintenanceCompanyUseCase.createMaintenanceCompany(
      maintenancecompanyInput,
    );
  }
  @Mutation(() => MaintenanceCompanyModel)
  async updateMaintenanceCompany(
    @Args('id') id: string,
    @Args('maintenancecompanyInput')
    maintenancecompanyInput: MaintenanceCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    maintenancecompanyInput.updated_by = user.id;

    return await this.maintenanceCompanyUseCase.updateMaintenanceCompany(
      id,
      maintenancecompanyInput,
    );
  }
  @Mutation(() => [MaintenanceCompanyModel])
  async updateManyMaintenanceCompany(
    @Args({ name: 'data', type: () => [MaintenanceCompanyUpdateManyInput] })
    data: MaintenanceCompanyUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.maintenanceCompanyUseCase.updateManyMaintenanceCompany(
      data,
      user.id,
    );
  }
  @Mutation(() => MaintenanceCompanyModel)
  async deleteMaintenanceCompany(@Args('id') id: string) {
    return this.maintenanceCompanyUseCase.deleteMaintenanceCompany(id);
  }

  @Mutation(() => [MaintenanceCompanyModel])
  async deleteManyMaintenanceCompany(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.maintenanceCompanyUseCase.deleteManyMaintenanceCompany(ids);
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(
    @Parent()
    maintenanceCompany: MaintenanceCompanyInput,
  ) {
    const { legal_person_id: legalPersonID } = maintenanceCompany;
    console.log(legalPersonID);
    const legalPerson = await this.legalPersonUseCase.getLegalPerson({
      legalPersonId: legalPersonID,
    });

    return legalPerson;
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: MaintenanceCompanyInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: MaintenanceCompanyInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
