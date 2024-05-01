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
import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';
import { SenderUseCases } from 'app/useCases/SenderUseCase /SenderUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { GetSenderArgs } from '../SenderGraphql/Args/GetSenderArgs';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { SenderCountArgs, SenderWhereArgs } from './Args/WhereSenderArgs';
import {
  SenderInput,
  SenderUpdateInput,
  SenderUpdateManyInput,
} from './Sender.input';
import { SenderModel } from './Sender.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => SenderModel)
export class SenderResolver {
  constructor(
    private SenderUseCase: SenderUseCases,
    private userCase: UserUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}

  @Query(() => Number)
  async totalSenders(@Args() request: SenderCountArgs) {
    const sender = await this.SenderUseCase.count(request);

    return sender;
  }

  @Query(() => SenderModel)
  async getSender(@Args() request: GetSenderArgs) {
    return this.SenderUseCase.getSender(request);
  }

  @Query(() => [SenderModel], { nullable: true })
  async getAllSender(@Args() args: SenderWhereArgs) {
    const sender = await this.SenderUseCase.getAllSender(args);

    return sender.length > 0 ? sender : null;
  }

  @Mutation(() => SenderModel)
  async createSender(
    @Args('data')
    senderInput: SenderInput,
    @CurrentUser() user: User,
  ) {
    senderInput.created_by = user.id;
    senderInput.updated_by = user.id;

    return this.SenderUseCase.createSender(senderInput);
  }

  @Mutation(() => SenderModel)
  async updateSender(
    @Args('id') id: string,
    @Args('data')
    recipent: SenderUpdateInput,
    @CurrentUser() user: User,
  ) {
    recipent.updated_by = user.id;

    return this.SenderUseCase.updateSender(id, recipent);
  }

  @Mutation(() => [SenderModel])
  async updateManySenders(
    @Args({
      name: 'updateManySenders',
      type: () => [SenderUpdateManyInput],
    })
    updateSenderInput: SenderUpdateManyInput[],
  ) {
    return await this.SenderUseCase.updateManySenders(updateSenderInput);
  }

  @Mutation(() => SenderModel)
  async deleteSender(@Args('id', { type: () => String }) id: string) {
    return await this.SenderUseCase.deleteSender(id);
  }

  @Mutation(() => [SenderModel])
  async deleteManySenders(
    @Args({ name: 'deleteManySenders', type: () => [String] }) ids: string[],
  ) {
    return await this.SenderUseCase.deleteManySenders(ids);
  }

  @ResolveField(() => NaturalPersonModel, { nullable: true })
  async NaturalPerson(@Parent() sender: SenderModel) {
    if (sender.natural_person_id)
      return await this.naturalPersonUseCase.getNaturalPerson({
        naturalPersonId: sender.natural_person_id,
      });
  }

  @ResolveField(() => LegalPersonModel, { nullable: true })
  async LegalPerson(@Parent() sender: SenderModel) {
    if (sender.legal_person_id)
      return await this.legalPersonUseCase.getLegalPerson({
        legalPersonId: sender.legal_person_id,
      });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: SenderInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }

  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: SenderInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
