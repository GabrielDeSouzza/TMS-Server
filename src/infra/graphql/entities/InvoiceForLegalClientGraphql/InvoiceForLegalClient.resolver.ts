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
import { InvoiceForLegalClientRepository } from 'domain/repositories/InvoiceForLegalClient.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { InvoiceForLegalClientGraphqlDTO } from 'infra/graphql/DTO/InvoiceForLegalClientGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { InvoiceForLegalClientInput } from './InvoiceForLegalClient.input';
import { InvoiceForLegalClientModel } from './InvoiceForLegalClient.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => InvoiceForLegalClientModel)
export class InvoiceForLegalClientResolver {
  constructor(
    private invoiceForLegalClientRepository: InvoiceForLegalClientRepository,
    private userRepository: UserRepository,
    private legalClientOrderRepository: LegalClientOrderRepository,
  ) {}
  @Query(() => InvoiceForLegalClientModel)
  async getInvoiceForLegalClientModel(@Args('id') id: string) {
    return this.invoiceForLegalClientRepository.findInvoiceForLegalClientById(
      id,
    );
  }
  @Query(() => [InvoiceForLegalClientModel], { nullable: true })
  async getAllInvoiceForLegalClient() {
    const invoiceForLegalClient =
      await this.invoiceForLegalClientRepository.getAllInvoiceForLegalClient();

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
    const invoiceForLegalClientEntity =
      InvoiceForLegalClientGraphqlDTO.createInputToEntity(
        invoiceForLegalClientInput,
      );

    return this.invoiceForLegalClientRepository.createInvoiceForLegalClient(
      invoiceForLegalClientEntity,
    );
  }
  @Mutation(() => InvoiceForLegalClientModel)
  async updateinvoiceForLegalClient(
    @Args('id') id: string,
    @Args('invoiceForLegalClientInput')
    invoiceForLegalClientInput: InvoiceForLegalClientInput,
    @CurrentUser() user: User,
  ) {
    invoiceForLegalClientInput.updated_by = user.id;
    const invoiceForLegalClientEntity =
      InvoiceForLegalClientGraphqlDTO.updateInputToEntity(
        invoiceForLegalClientInput,
      );

    return this.invoiceForLegalClientRepository.updateInvoiceForLegalClient(
      id,
      invoiceForLegalClientEntity,
    );
  }
  @ResolveField(() => LegalClientOrderModel)
  async LegalClientOrder(@Parent() invoice: InvoiceForLegalClientInput) {
    return this.legalClientOrderRepository.findLegalClientOrderById(
      invoice.legal_client_order_id,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: InvoiceForLegalClientInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: InvoiceForLegalClientInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
