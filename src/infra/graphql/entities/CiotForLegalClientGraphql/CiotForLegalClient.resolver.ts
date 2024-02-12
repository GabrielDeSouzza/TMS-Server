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

import { CiotForLegalClientUseCases } from 'app/useCases/CiotForLegalClient/CiotForLegalClientUseCases';
import { LegalContractUseCases } from 'app/useCases/LegalContractUseCases/LegalContractUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { CiotForLegalClientWhereArgs } from 'infra/graphql/entities/CiotForLegalClientGraphql/Args/WhereCiotForLegalClientArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModel, UserModelRefereces } from '../UserGraphql/user.model';
import { GetCiotForLegalClientArgs } from './Args/GetCiotForLegalClientArgs';
import {
  CiotForLegalClientInput,
  CiotForLegalClientUpdateInput,
} from './CiotForLegalClient.input';
import { CiotForLegalClientModel } from './CiotForLegalClient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => CiotForLegalClientModel)
export class CiotForLegalClientResolver {
  constructor(
    private ciotForLegalClientUseCases: CiotForLegalClientUseCases,
    private userCase: UserUseCases,
    private legalContractUseCase: LegalContractUseCases,
  ) {}
  @Query(() => CiotForLegalClientModel)
  async getCiotForLegalClientModel(@Args() request: GetCiotForLegalClientArgs) {
    return this.ciotForLegalClientUseCases.getCiotForLegalClient(request);
  }
  @Query(() => [CiotForLegalClientModel], { nullable: true })
  async getAllCiotForLegalClient(@Args() args: CiotForLegalClientWhereArgs) {
    const ciotForLegalClient =
      await this.ciotForLegalClientUseCases.getAllCiotForLegalClient({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return ciotForLegalClient.length > 0 ? ciotForLegalClient : null;
  }
  @Mutation(() => CiotForLegalClientModel)
  async createCiotForLegalClient(
    @Args('ciotForLegalClientInput')
    ciotForLegalClientInput: CiotForLegalClientInput,
    @CurrentUser() user: User,
  ) {
    ciotForLegalClientInput.created_by = user.id;
    ciotForLegalClientInput.updated_by = user.id;

    return this.ciotForLegalClientUseCases.createCiotForLegalClient(
      ciotForLegalClientInput,
    );
  }
  @Mutation(() => CiotForLegalClientModel)
  async updateciotForLegalClient(
    @Args('id') id: string,
    @Args('ciotForLegalClientInput')
    ciotForLegalClientInput: CiotForLegalClientUpdateInput,
    @CurrentUser() user: User,
  ) {
    ciotForLegalClientInput.updated_by = user.id;

    return this.ciotForLegalClientUseCases.updateCiotForLegalClient(
      id,
      ciotForLegalClientInput,
    );
  }
  @ResolveField(() => LegalContractModel)
  async LegalClientContract(@Parent() ciot: CiotForLegalClientInput) {
    return await this.legalContractUseCase.getContract({
      id: ciot.legal_contract_id,
    });
  }
  @ResolveField(() => UserModel)
  async CreatedUser(@Parent() user: CiotForLegalClientModel) {
    const { created_by: createdBy } = user;
    console.log('test');

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: CiotForLegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
