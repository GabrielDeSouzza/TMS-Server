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

import { LegalClientQuoteTableUseCases } from 'app/useCases/LegalClientQuoteTableUseCase/LegalClientQuoteTable';
import { RecipientUseCases } from 'app/useCases/RecipientUseCase /RecipientUseCases';
import { SenderUseCases } from 'app/useCases/SenderUseCase /SenderUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { LegalClientQuoteTableWhereArgs } from 'infra/graphql/entities/LegalClientQuoteTableGraphql/Args/WhereLegalClientQuoteTableArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { RecipientModel } from '../RecipientGraphql/Recipient.model';
import { SenderModel } from '../SenderGraphql/Sender.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetLegalClientQuoteTableArgs } from './Args/GetLegalClientQuoteTableArgs';
import {
  LegalClientQuoteTableInput,
  LegalClientQuoteTableUpdate,
} from './LegalClientQuoteTable.input';
import { LegalClientQuoteTableModel } from './LegalClientQuoteTable.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(LegalClientQuoteTableModel)
export class LegalClientQuoteTableResolver {
  constructor(
    private legalClientQuoteTableUseCase: LegalClientQuoteTableUseCases,
    private userCase: UserUseCases,
    private recipientUseCase: RecipientUseCases,
    private senderUseCase: SenderUseCases,
  ) {}
  @Query(() => LegalClientQuoteTableModel, { nullable: true })
  async getLegalClientQuoteTable(
    @Args() request: GetLegalClientQuoteTableArgs,
  ) {
    return await this.legalClientQuoteTableUseCase.getLegalClientQuoteTable(
      request,
    );
  }
  @Query(() => [LegalClientQuoteTableModel])
  async getAllLegalClientQuoteTable(
    @Args() args: LegalClientQuoteTableWhereArgs,
  ) {
    return await this.legalClientQuoteTableUseCase.getAllLegalClientQuoteTable(
      args,
    );
  }
  @Mutation(() => LegalClientQuoteTableModel)
  async createLegalClientQuoteTable(
    @Args('legalClientQuoteTableInput')
    legalClientQuoteTableInput: LegalClientQuoteTableInput,
    @CurrentUser() user: User,
  ) {
    legalClientQuoteTableInput.created_by = user.id;
    legalClientQuoteTableInput.updated_by = user.id;

    return await this.legalClientQuoteTableUseCase.createQuoteTable(
      legalClientQuoteTableInput,
    );
  }
  @Mutation(() => LegalClientQuoteTableModel)
  async updateLegalClientQuoteTable(
    @Args('id') id: string,
    @Args('legalClientQuoteTableUpdate')
    legalClientQuoteTableUpdate: LegalClientQuoteTableUpdate,
    @CurrentUser() user: User,
  ) {
    legalClientQuoteTableUpdate.updated_by = user.id;

    return this.legalClientQuoteTableUseCase.updateQuoteTable(
      id,
      legalClientQuoteTableUpdate,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: LegalClientQuoteTableInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: LegalClientQuoteTableInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => RecipientModel)
  Recipient(@Parent() quote: LegalClientQuoteTableInput) {
    return this.recipientUseCase.getRecipient({
      id: quote.recipientId,
    });
  }
  @ResolveField(() => SenderModel)
  Sender(@Parent() quote: LegalClientQuoteTableInput) {
    return this.senderUseCase.getSender({
      id: quote.senderId,
    });
  }
}
