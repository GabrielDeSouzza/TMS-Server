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

import { PhysicalCustomerQuoteTableUseCases } from 'app/useCases/PhysicalCustomerQuoteTableUseCase/PhysicalCustomerQuoteTable';
import { RecipientUseCases } from 'app/useCases/RecipientUseCase /RecipientUseCases';
import { SenderUseCases } from 'app/useCases/SenderUseCase /SenderUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { PhysicalCustomerQuoteTableWhereArgs } from 'infra/graphql/entities/PhysicalCustomerQuoteTableGraphql/Args/WherePhysicalCustomerQuoteTableArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { RecipientModel } from '../RecipientGraphql/Recipient.model';
import { SenderModel } from '../SenderGraphql/Sender.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetPhysicalCustomerQuoteTableArgs } from './Args/GetPhysicalCustomerQuoteTableArgs';
import {
  PhysicalCustomerQuoteTableInput,
  PhysicalCustomerQuoteTableUpdate,
} from './PhysicalCustomerQuoteTable.input';
import { PhysicalCustomerQuoteTableModel } from './PhysicalCustomerQuoteTable.model';

@UseGuards(GraphQLAuthGuard)
@AcessAllowed(ROLE.USER)
@UseInterceptors(RoleInterceptor)
@Resolver(PhysicalCustomerQuoteTableModel)
export class PhysicalCustomerQuoteTableResolver {
  constructor(
    private physicalCustomerQuoteTableUseCase: PhysicalCustomerQuoteTableUseCases,
    private userCase: UserUseCases,
    private recipientUseCase: RecipientUseCases,
    private senderUseCase: SenderUseCases,
  ) {}
  @Query(() => PhysicalCustomerQuoteTableModel, { nullable: true })
  async getPhysicalCustomerQuoteTable(
    @Args() request: GetPhysicalCustomerQuoteTableArgs,
  ) {
    return await this.physicalCustomerQuoteTableUseCase.getPhysicalCustomerQuoteTable(
      request,
    );
  }
  @Query(() => [PhysicalCustomerQuoteTableModel])
  async getAllPhysicalCustomerQuoteTable(
    @Args() args: PhysicalCustomerQuoteTableWhereArgs,
  ) {
    return await this.physicalCustomerQuoteTableUseCase.getAllPhysicalCustomerQuoteTable(
      args,
    );
  }
  @Mutation(() => PhysicalCustomerQuoteTableModel)
  async createPhysicalCustomerQuoteTable(
    @Args('physicalCustomerQuoteTableInput')
    physicalCustomerQuoteTableInput: PhysicalCustomerQuoteTableInput,
    @CurrentUser() user: User,
  ) {
    physicalCustomerQuoteTableInput.created_by = user.id;
    physicalCustomerQuoteTableInput.updated_by = user.id;

    return await this.physicalCustomerQuoteTableUseCase.createQuoteTable(
      physicalCustomerQuoteTableInput,
    );
  }
  @Mutation(() => PhysicalCustomerQuoteTableModel)
  async updatePhysicalCustomerQuoteTable(
    @Args('id') id: string,
    @Args('physicalCustomerQuoteTableUpdate')
    physicalCustomerQuoteTableUpdate: PhysicalCustomerQuoteTableUpdate,
    @CurrentUser() user: User,
  ) {
    physicalCustomerQuoteTableUpdate.updated_by = user.id;

    return this.physicalCustomerQuoteTableUseCase.updateQuoteTable(
      id,
      physicalCustomerQuoteTableUpdate,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: PhysicalCustomerQuoteTableInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: PhysicalCustomerQuoteTableInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
  @ResolveField(() => RecipientModel)
  Recipient(@Parent() quote: PhysicalCustomerQuoteTableInput) {
    return this.recipientUseCase.getRecipient({
      id: quote.recipientId,
    });
  }
  @ResolveField(() => SenderModel)
  Sender(@Parent() quote: PhysicalCustomerQuoteTableInput) {
    return this.senderUseCase.getSender({
      id: quote.senderId,
    });
  }
}
