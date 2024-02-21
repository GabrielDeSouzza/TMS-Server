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

import { LegalPersonUseCases } from 'app/useCases/LegalPersonUseCases/LegalPersonUseCases';
import { OutsourcedTransportCompanyUseCases } from 'app/useCases/OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedTransportCompanyWhereArgs } from 'infra/graphql/entities/OutsourcedTransportCompanyGraphql/Args/WhereOutsourcedTransportCompanyArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { OutsourcedTransportCompanyContractModel } from '../OutsourcedTransportCompanyContractGraphql/OutsourcedTransportCompanyContract.model';
import { OutsourcedTransportCompanyDriverModel } from '../OutsourcedTransportCompanyDriverGraphql/OutsourcedTransportCompanyDriver.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetOutsourcedTransportCompanyArgs } from './Args/GetOutsourcedTransportCompanyArgs';
import {
  OutsourcedTransportCompanyInput,
  OutsourcedTransportCompanyUpdateInput,
} from './OutsourcedTransportCompany.input';
import { OutsourcedTransportCompanyModel } from './OutsourcedTransportCompany.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedTransportCompanyModel)
export class OutsourcedTransportCompanyResolver {
  constructor(
    private outsourcedTransportCompanyUseCases: OutsourcedTransportCompanyUseCases,
    private userCase: UserUseCases,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  @Query(() => OutsourcedTransportCompanyModel, { nullable: true })
  async getOutsourcedTransportCompanyModel(
    @Args() request: GetOutsourcedTransportCompanyArgs,
  ) {
    return this.outsourcedTransportCompanyUseCases.getOutsourcedTransportCompany(
      request,
    );
  }
  @Query(() => [OutsourcedTransportCompanyModel], { nullable: true })
  async getAllOutsourcedTransportCompany(
    @Args() args: OutsourcedTransportCompanyWhereArgs,
  ) {
    const outsourcedTransportCompany =
      await this.outsourcedTransportCompanyUseCases.getAllOutsourcedTransportCompany(
        {
          limit: args.limit,
          offset: args.offset,
          sort: args.sort,
          where: args.where,
        },
      );

    return outsourcedTransportCompany.length > 0
      ? outsourcedTransportCompany
      : null;
  }
  @Mutation(() => OutsourcedTransportCompanyModel)
  async createOutsourcedTransportCompany(
    @Args('outsourcedTransportCompanyInput')
    outsourcedTransportCompanyInput: OutsourcedTransportCompanyInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyInput.created_by = user.id;
    outsourcedTransportCompanyInput.updated_by = user.id;

    return this.outsourcedTransportCompanyUseCases.createOutsourcedTransportCompany(
      outsourcedTransportCompanyInput,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyModel)
  async updateoutsourcedTransportCompany(
    @Args('id') id: string,
    @Args('data')
    outsourcedTransCompanyInput: OutsourcedTransportCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransCompanyInput.updated_by = user.id;

    return this.outsourcedTransportCompanyUseCases.updateOutsourcedTransportCompany(
      id,
      outsourcedTransCompanyInput,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyDriverModel])
  async Drivers(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    return await this.outsourcedTransportCompanyUseCases.getDrivers(
      outsourd.id,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyContractModel])
  async Contracts(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    return await this.outsourcedTransportCompanyUseCases.getAllContracts(
      outsourd.id,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyContractModel])
  async Vehicles(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    return await this.outsourcedTransportCompanyUseCases.getVehicles(
      outsourd.id,
    );
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(@Parent() transport: OutsourcedTransportCompanyModel) {
    return await this.legalPersonUseCase.getLegalPerson({
      legalPersonId: transport.legalPersonId,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedTransportCompanyInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OutsourcedTransportCompanyInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
