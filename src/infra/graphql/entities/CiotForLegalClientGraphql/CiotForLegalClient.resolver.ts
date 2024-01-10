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
import { CiotForLegalClientRepository } from 'domain/repositories/CiotForLegalClient.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CiotForLegalClientWhereArgs } from 'infra/graphql/args/CiotForLegalClientArgs';
import { CiotForLegalClientGraphqlDTO } from 'infra/graphql/DTO/CiotForLegalClientGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
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
    private ciotForLegalClientRepository: CiotForLegalClientRepository,
    private userRepository: UserRepository,
    private legalContractRepository: LegalContractRepository,
  ) {}
  @Query(() => CiotForLegalClientModel)
  async getCiotForLegalClientModel(@Args('id') id: string) {
    return this.ciotForLegalClientRepository.findCiotForLegalClientById(id);
  }
  @Query(() => [CiotForLegalClientModel], { nullable: true })
  async getAllCiotForLegalClient(@Args() args: CiotForLegalClientWhereArgs) {
    const ciotForLegalClient =
      await this.ciotForLegalClientRepository.getAllCiotForLegalClient({
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
    const ciotForLegalClientEntity =
      CiotForLegalClientGraphqlDTO.createInputToEntity(ciotForLegalClientInput);

    return this.ciotForLegalClientRepository.createCiotForLegalClient(
      ciotForLegalClientEntity,
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
    const ciotForLegalClientEntity =
      CiotForLegalClientGraphqlDTO.updateInputToEntity(ciotForLegalClientInput);

    return this.ciotForLegalClientRepository.updateCiotForLegalClient(
      id,
      ciotForLegalClientEntity,
    );
  }
  @ResolveField(() => LegalContractModel)
  async LegalClientContract(@Parent() ciot: CiotForLegalClientInput) {
    return await this.legalContractRepository.findLegalContractById(
      ciot.legal_contract_id,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: CiotForLegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: CiotForLegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
