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
import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { LegalContractRepository } from 'domain/repositories/LegalContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { LegalClientOrderGraphqlDTO } from 'infra/graphql/DTO/LegalClientOrderGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { InvoiceForLegalClientModel } from '../InvoiceForLegalClientGraphql/InvoiceForLegalClient.model';
import { LegalClientMerchandiseModel } from '../LegalClientMerchandiseGraphql/LegalClientMerchandise.model';
import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { LegalClientOrderInput } from './LegalClientOrder.input';
import { LegalClientOrderModel } from './LegalClientOrder.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientOrderModel)
export class LegalClientOrderResolver {
  constructor(
    private legalClientOrderRepository: LegalClientOrderRepository,
    private userRepository: UserRepository,
    private legalContract: LegalContractRepository,
    private legalClientMerchandiseRepository: LegalClientMerchandiseRepository,
    private invoicesLegalClientRepository: InvoiceForLegalClientRepository,
  ) {}
  @Query(() => LegalClientOrderModel, { nullable: true })
  async getLegalClientOrderModel(@Args('id') id: string) {
    return this.legalClientOrderRepository.findLegalClientOrderById(id);
  }
  @Query(() => [LegalClientOrderModel], { nullable: true })
  async getAllLegalClientOrder() {
    const legalClientOrder =
      await this.legalClientOrderRepository.getAllLegalClientOrder();

    return legalClientOrder.length > 0 ? legalClientOrder : null;
  }
  @Mutation(() => LegalClientOrderModel)
  async createLegalClientOrder(
    @Args('legalClientOrderInput') legalClientOrderInput: LegalClientOrderInput,
    @CurrentUser() user: User,
  ) {
    legalClientOrderInput.created_by = user.id;
    legalClientOrderInput.updated_by = user.id;
    const legalClientOrderEntity =
      LegalClientOrderGraphqlDTO.createInputToEntity(legalClientOrderInput);

    return await this.legalClientOrderRepository.createLegalClientOrder(
      legalClientOrderEntity,
    );
  }
  @Mutation(() => LegalClientOrderModel)
  async updatelegalClientOrder(
    @Args('id') id: string,
    @Args('legalClientOrderInput') legalClientOrderInput: LegalClientOrderInput,
    @CurrentUser() user: User,
  ) {
    legalClientOrderInput.updated_by = user.id;
    const legalClientOrderEntity =
      LegalClientOrderGraphqlDTO.updateInputToEntity(legalClientOrderInput);

    return await this.legalClientOrderRepository.updateLegalClientOrder(
      id,
      legalClientOrderEntity,
    );
  }
  @ResolveField(() => LegalContractModel)
  async LegalContract(@Parent() order: LegalClientOrderInput) {
    console.log(order);

    return await this.legalContract.findLegalContractById(
      order.legal_contract_id,
    );
  }
  @ResolveField(() => [LegalClientMerchandiseModel])
  async LegalClientMerchandise(@Parent() order: LegalClientOrderModel) {
    const { id } = order;

    return this.legalClientMerchandiseRepository.findLegalClientMerchandisesByOrder(
      id,
    );
  }
  @ResolveField(() => [InvoiceForLegalClientModel])
  async Invoices(@Parent() order: LegalClientOrderModel) {
    const { id } = order;

    return await this.invoicesLegalClientRepository.findInvoicesByOrder(id);
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: LegalClientOrderInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(@Parent() user: LegalClientOrderInput) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
