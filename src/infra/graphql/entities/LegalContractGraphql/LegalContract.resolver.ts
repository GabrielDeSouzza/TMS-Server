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

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalClientUseCases } from 'app/useCases/LegalClientUseCases/LegalClientUseCase';
import { LegalContractUseCases } from 'app/useCases/LegalContractUseCases/LegalContractUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import {
  LegalContractWhereArgs,
  LegalContractCountArgs,
} from 'infra/graphql/entities/LegalContractGraphql/Args/WhereLegalContractArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientModelRefereces } from '../LegalClientGraphql/LegalClient.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetLegalContractArgs } from './Args/GetLegalContractGraphqlArgs';
import {
  LegalContractInput,
  LegalContractUpdateInput,
  LegalContractUpdateManyInput,
} from './LegalContract.input';
import { LegalContractModel } from './LegalContract.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalContractModel)
export class LegalContractResolver {
  constructor(
    private legalContractUseCase: LegalContractUseCases,
    private legalClientUseCase: LegalClientUseCases,
    private userCase: UserUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  @Query(() => Int)
  async countLegalContract(@Args() request: LegalContractCountArgs) {
    return this.legalContractUseCase.countLegalContract(request);
  }
  @Query(() => LegalContractModel)
  async getLegalContractModel(@Args() request: GetLegalContractArgs) {
    return this.legalContractUseCase.getContract(request);
  }
  @Query(() => [LegalContractModel], { nullable: true })
  async getAllLegalContract(@Args() args: LegalContractWhereArgs) {
    const legalContract = await this.legalContractUseCase.getAllContracts({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });

    return legalContract.length > 0 ? legalContract : null;
  }
  @Mutation(() => LegalContractModel)
  async createLegalContract(
    @Args('legalContractInput') legalContractInput: LegalContractInput,
    @CurrentUser() user: User,
  ) {
    legalContractInput.created_by = user.id;
    legalContractInput.updated_by = user.id;

    return this.legalContractUseCase.createContract(legalContractInput);
  }
  @Mutation(() => LegalContractModel)
  async updatelegalContract(
    @Args('id') id: string,
    @Args('legalContractInput') legalContractInput: LegalContractUpdateInput,
    @CurrentUser() user: User,
  ) {
    legalContractInput.updated_by = user.id;

    return this.legalContractUseCase.updateContract(id, legalContractInput);
  }

  @Mutation(() => [LegalContractModel])
  async updateManyLegalContract(
    @Args({ name: 'data', type: () => [LegalContractUpdateManyInput] })
    data: LegalContractUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.legalContractUseCase.updateManyLegalContract(data, user.id);
  }
  @Mutation(() => LegalContractModel)
  async deleteLegalContract(@Args('id') id: string) {
    return this.legalContractUseCase.deleteLegalContract(id);
  }

  @Mutation(() => [LegalContractModel])
  async deleteManyLegalContract(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.legalContractUseCase.deleteManyLegalContract(ids);
  }

  @ResolveField(() => LegalClientModelRefereces)
  async LegalClient(@Parent() contract: LegalContractInput) {
    const { legal_client_id: legalClientID } = contract;

    return await this.legalClientUseCase.getClient({ id: legalClientID });
  }
  @ResolveField(() => LegalClientModelRefereces)
  async CarrierCompany(@Parent() contract: LegalContractInput) {
    const { carrier_company_id: carrierCompanyID } = contract;

    return await this.carrierCompanyUseCase.getCarrierCompany({
      id: carrierCompanyID,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: LegalContractInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: LegalContractInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
