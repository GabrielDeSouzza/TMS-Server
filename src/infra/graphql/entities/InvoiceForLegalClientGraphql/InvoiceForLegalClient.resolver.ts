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

import { InvoiceForLegalClientUseCases } from 'app/useCases/InvoiceForLegalClient/InvoiceForLegalClientUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { LegalClientWhereArgs } from 'infra/graphql/entities/LegalClientGraphql/Args/WhereLegalClientArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientMerchandiseModel } from '../LegalClientMerchandiseGraphql/LegalClientMerchandise.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetInvoiceForLegalClientArgs } from './Args/GetInvoiceForLegalClientArgs';
import {
  InvoiceForLegalClientInput,
  InvoiceForLegalClientUpdateInput,
} from './InvoiceForLegalClient.input';
import { InvoiceForLegalClientModel } from './InvoiceForLegalClient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => InvoiceForLegalClientModel)
export class InvoiceForLegalClientResolver {
  constructor(
    private invoiceForLegalClientUseCase: InvoiceForLegalClientUseCases,
    private userCase: UserUseCases,
  ) {}
  @Query(() => InvoiceForLegalClientModel)
  async getInvoiceForLegalClientModel(
    @Args() request: GetInvoiceForLegalClientArgs,
  ) {
    return this.invoiceForLegalClientUseCase.getInvoiceForLegalClient(request);
  }
  @Query(() => [InvoiceForLegalClientModel], { nullable: true })
  async getAllInvoiceForLegalClient(@Args() args: LegalClientWhereArgs) {
    const invoiceForLegalClient =
      await this.invoiceForLegalClientUseCase.getAllInvoiceForLegalClient({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return invoiceForLegalClient.length > 0 ? invoiceForLegalClient : null;
  }
  @Mutation(() => InvoiceForLegalClientModel)
  async createInvoiceForLegalClient(
    @Args('invoiceForLegalClientInput')
    invoiceForLegalClientInput: InvoiceForLegalClientInput,
    @CurrentUser() user: User,
  ) {
    invoiceForLegalClientInput.created_by = user.id;
    invoiceForLegalClientInput.updated_by = user.id;

    return this.invoiceForLegalClientUseCase.createInvoiceForLegalClient(
      invoiceForLegalClientInput,
    );
  }
  @Mutation(() => InvoiceForLegalClientModel)
  async updateinvoiceForLegalClient(
    @Args('id') id: string,
    @Args('invoiceForLegalClientInput')
    invoiceForLegalClientInput: InvoiceForLegalClientUpdateInput,
    @CurrentUser() user: User,
  ) {
    invoiceForLegalClientInput.updated_by = user.id;

    return this.invoiceForLegalClientUseCase.updateInvoiceForLegalClient(
      id,
      invoiceForLegalClientInput,
    );
  }
  @ResolveField(() => LegalClientMerchandiseModel)
  async Merchandise(@Parent() invoice: InvoiceForLegalClientInput) {
    return await this.invoiceForLegalClientUseCase.getMerchandiseInInvoice({
      invoice_number: invoice.invoice_number,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: InvoiceForLegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: InvoiceForLegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
