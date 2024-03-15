import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { InvoiceForLegalClientUseCases } from 'app/useCases/InvoiceForLegalClient/InvoiceForLegalClientUseCases';
import { LegalClientMerchandiseUseCases } from 'app/useCases/LegalClientMerchandiseDto/LegalClientMerchandisesUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';

import { LegalClientMerchandiseWhereArgs } from 'infra/graphql/entities/LegalClientMerchandiseGraphql/Args/WhereLegalClientMerchandiseArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { InvoiceForLegalClientModel } from '../InvoiceForLegalClientGraphql/InvoiceForLegalClient.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { GetLegalClientMerchandisesArgs } from './Args/GetLegalClientMerchandiseArgs';
import {
  LegalClientMerchandiseInput,
  LegalClientMerchandiseUpdateInput,
} from './LegalClientMerchandise.input';
import { LegalClientMerchandiseModel } from './LegalClientMerchandise.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientMerchandiseModel)
export class LegalClientMerchandiseResolver {
  constructor(
    private legalClientMerchandiseUseCases: LegalClientMerchandiseUseCases,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
    private invoiceForLegalClint: InvoiceForLegalClientUseCases,
  ) {}
  @Query(() => LegalClientMerchandiseModel)
  async getLegalClientMerchandiseModel(
    @Args() request: GetLegalClientMerchandisesArgs,
  ) {
    return this.legalClientMerchandiseUseCases.getLegalClientMerchandises(
      request,
    );
  }
  @Query(() => [LegalClientMerchandiseModel], { nullable: true })
  async getAllLegalClientMerchandise(
    @Args() args: LegalClientMerchandiseWhereArgs,
  ) {
    const legalClientMerchandise =
      await this.legalClientMerchandiseUseCases.getAllLegalClientMerchandise({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return legalClientMerchandise.length > 0 ? legalClientMerchandise : null;
  }
  @Mutation(() => LegalClientMerchandiseModel)
  async createLegalClientMerchandise(
    @Args('legalClientMerchandiseInput')
    legalClientMerchandiseInput: LegalClientMerchandiseInput,
  ) {
    return this.legalClientMerchandiseUseCases.createLegalClientMerchandise(
      legalClientMerchandiseInput,
    );
  }
  @Mutation(() => LegalClientMerchandiseModel)
  async updatelegalClientMerchandise(
    @Args('id') id: string,
    @Args('legalClientMerchandiseInput')
    legalClientMerchandiseInput: LegalClientMerchandiseUpdateInput,
  ) {
    return this.legalClientMerchandiseUseCases.updateLegalClientMerchandiseRepository(
      id,
      legalClientMerchandiseInput,
    );
  }
  @ResolveField(() => LegalClientOrderModel)
  async Order(@Parent() merchandise: LegalClientMerchandiseInput) {
    return this.legalClientOrderUseCase.getLegalClientOrder({
      id: merchandise.legal_client_order_id,
    });
  }

  @ResolveField(() => InvoiceForLegalClientModel)
  async Invoice(@Parent() merchandise: LegalClientMerchandiseInput) {
    return this.invoiceForLegalClint.getInvoiceForLegalClient({
      id: merchandise.invoice_legal_client,
    });
  }
}
