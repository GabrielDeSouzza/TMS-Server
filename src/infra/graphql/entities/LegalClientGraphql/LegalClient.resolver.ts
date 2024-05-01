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
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';

import { LegalClientUseCases } from 'app/useCases/LegalClientUseCases/LegalClientUseCase';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { GetLegalClientArgs } from 'infra/graphql/entities/LegalClientGraphql/Args/GetLegalClientArgs';
import {
  LegalClientCountArgs,
  LegalClientWhereArgs,
} from 'infra/graphql/entities/LegalClientGraphql/Args/WhereLegalClientArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  LegalClientInput,
  LegalClientUpdateInput,
  LegalClientUpdateManyInput,
} from './LegalClient.input';
import { LegalClientModel } from './LegalClient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientModel)
export class LegalClientResolver {
  constructor(
    private legalClientUseCase: LegalClientUseCases,
    private userCase: UserUseCases,
    private legalPersonRepository: LegalPersonRepository,
    private legalClientOrderRepository: LegalClientOrderRepository,
  ) {}
  @Query(() => Number)
  async totalLegalClients(@Args() request: LegalClientCountArgs) {
    const legalClient = await this.legalClientUseCase.count(request);

    return legalClient;
  }

  @Query(() => LegalClientModel)
  async getLegalClientModel(@Args() legalClientSearch: GetLegalClientArgs) {
    return await this.legalClientUseCase.getClient(legalClientSearch);
  }

  @Query(() => [LegalClientModel], { nullable: true })
  async getAllLegalClient(@Args() args: LegalClientWhereArgs) {
    const legalclient = await this.legalClientUseCase.getAllClients({
      limit: args.limit,
      offset: args.offset,
      sort: args.sort,
      where: args.where,
    });

    return legalclient.length > 0 ? legalclient : null;
  }

  @Mutation(() => LegalClientModel)
  async createLegalClient(
    @Args('legalclientInput') legalclientInput: LegalClientInput,
    @CurrentUser() user: User,
  ) {
    legalclientInput.created_by = user.id;
    legalclientInput.updated_by = user.id;

    return await this.legalClientUseCase.createLegalClient(legalclientInput);
  }

  @Mutation(() => LegalClientModel)
  async updateLegalClient(
    @Args('id') id: string,
    @Args('legalclientInput') legalclientInput: LegalClientUpdateInput,
    @CurrentUser() user: User,
  ) {
    legalclientInput.updated_by = user.id;

    return await this.legalClientUseCase.updateLegalClient(
      id,
      legalclientInput,
    );
  }

  @Mutation(() => [LegalClientModel])
  async updateManyLegalClients(
    @Args({
      name: 'updateManyLegalClients',
      type: () => [LegalClientUpdateManyInput],
    })
    updateLegalClientInput: LegalClientUpdateManyInput[],
  ) {
    return await this.legalClientUseCase.updateManyLegalClients(
      updateLegalClientInput,
    );
  }

  @Mutation(() => LegalClientModel)
  async deleteLegalClient(@Args('id', { type: () => String }) id: string) {
    return await this.legalClientUseCase.deleteLegalClient(id);
  }

  @Mutation(() => [LegalClientModel])
  async deleteManyLegalClients(
    @Args({ name: 'deleteManyLegalClients', type: () => [String] })
    ids: string[],
  ) {
    return await this.legalClientUseCase.deleteManyLegalClients(ids);
  }

  @ResolveField(() => LegalPersonModel)
  async LegalPerson(
    @Parent() legalClient: LegalClientInput | LegalClientUpdateInput,
  ) {
    const { legal_person_id: legalPersonID } = legalClient;
    const legalPerson = await this.legalPersonRepository.findlegalperson({
      legalPersonId: legalPersonID,
    });

    return legalPerson;
  }

  @ResolveField(() => [LegalClientOrderModel])
  async Orders(@Parent() legalClient: LegalClientModel) {
    const { id } = legalClient;

    return this.legalClientOrderRepository.findOrdersByLegalClient(id);
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: LegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }

  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: LegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
