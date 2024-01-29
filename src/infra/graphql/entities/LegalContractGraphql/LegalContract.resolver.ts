import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Resolver,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';

import { LegalContractWhereArgs } from 'infra/graphql/args/LegalContractArgs';
import { LegalContractGraphqlDTO } from 'infra/graphql/DTO/LegalContractGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientModelRefereces } from '../LegalClientGraphql/LegalClient.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  LegalContractInput,
  LegalContractUpdateInput,
} from './LegalContract.input';
import { LegalContractModel } from './LegalContract.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalContractModel)
export class LegalContractResolver {
  constructor(
    private legalContractRepository: LegalContractRepository,
    private legalclientRepository: LegalClientRepository,
    private userRepository: UserRepository,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  @Query(() => LegalContractModel)
  async getLegalContractModel(
    @Args('id', { nullable: true }) id: string,
    @Args('contractNumber', { nullable: true }) contracNumber: string,
  ) {
    return this.legalContractRepository.findLegalContractById(
      id,
      contracNumber,
    );
  }
  @Query(() => [LegalContractModel], { nullable: true })
  async getAllLegalContract(@Args() args: LegalContractWhereArgs) {
    const legalContract =
      await this.legalContractRepository.getAllLegalContract({
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
    const legalContractEntity =
      LegalContractGraphqlDTO.createInputToEntity(legalContractInput);

    return this.legalContractRepository.createLegalContract(
      legalContractEntity,
    );
  }
  @Mutation(() => LegalContractModel)
  async updatelegalContract(
    @Args('id') id: string,
    @Args('legalContractInput') legalContractInput: LegalContractUpdateInput,
    @CurrentUser() user: User,
  ) {
    legalContractInput.updated_by = user.id;
    const legalContractEntity =
      LegalContractGraphqlDTO.updateInputToEntity(legalContractInput);

    return this.legalContractRepository.updateLegalContract(
      id,
      legalContractEntity,
    );
  }

  @ResolveField(() => LegalClientModelRefereces)
  async LegalClient(@Parent() contract: LegalContractInput) {
    const { legal_client_id: legalClientID } = contract;

    return await this.legalclientRepository.findLegalClientById(legalClientID);
  }
  @ResolveField(() => LegalClientModelRefereces)
  async CarrierCompany(@Parent() contract: LegalContractInput) {
    const { carrier_company_id: carrierCompanyID } = contract;

    return await this.carrierCompanyUseCase.getCarrierCompany({
      id: carrierCompanyID,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: LegalContractInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: LegalContractInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
