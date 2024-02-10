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

import { LegalClientMerchandiseUseCases } from 'app/useCases/LegalClientMerchandiseDto/LegalClientMerchandisesUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';
import { LegalContractUseCases } from 'app/useCases/LegalContractUseCases/LegalContractUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { LegalClientOrderWhereArgs } from 'infra/graphql/entities/LegalClientOrderGraphql/Args/LegalClientOrderArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalClientMerchandiseModel } from '../LegalClientMerchandiseGraphql/LegalClientMerchandise.model';
import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  LegalClientOrderInput,
  LegalClientOrderUpdateInput,
} from './LegalClientOrder.input';
import { LegalClientOrderModel } from './LegalClientOrder.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => LegalClientOrderModel)
export class LegalClientOrderResolver {
  constructor(
    private legalClientOrdeUseCase: LegalClientOrderUseCases,
    private userCase: UserUseCases,
    private legalContractUseCase: LegalContractUseCases,
    private legalClientMerchandiseUseCase: LegalClientMerchandiseUseCases,
  ) {}
  @Query(() => LegalClientOrderModel, { nullable: true })
  async getLegalClientOrderModel(
    @Args('id', { nullable: true }) id?: string,
    @Args('order', { nullable: true }) order?: string,
  ) {
    return this.legalClientOrdeUseCase.getLegalClientOrder({ id, order });
  }
  @Query(() => [LegalClientOrderModel], { nullable: true })
  async getAllLegalClientOrder(@Args() args: LegalClientOrderWhereArgs) {
    const legalClientOrder =
      await this.legalClientOrdeUseCase.getAllLegalClientOrder({
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      });

    return legalClientOrder.length > 0 ? legalClientOrder : null;
  }
  @Mutation(() => LegalClientOrderModel)
  async createLegalClientOrder(
    @Args('legalClientOrderInput') legalClientOrderInput: LegalClientOrderInput,
    @CurrentUser() user: User,
  ) {
    legalClientOrderInput.created_by = user.id;
    legalClientOrderInput.updated_by = user.id;

    return await this.legalClientOrdeUseCase.createOrder(legalClientOrderInput);
  }
  @Mutation(() => LegalClientOrderModel)
  async updatelegalClientOrder(
    @Args('id') id: string,
    @Args('legalClientOrderInput')
    legalClientOrderInput: LegalClientOrderUpdateInput,
    @CurrentUser() user: User,
  ) {
    legalClientOrderInput.updated_by = user.id;

    return await this.legalClientOrdeUseCase.updateOrder(
      id,
      legalClientOrderInput,
    );
  }
  @ResolveField(() => LegalContractModel)
  async LegalContract(@Parent() order: LegalClientOrderInput) {
    console.log(order);

    return await this.legalContractUseCase.getContract({
      id: order.legal_contract_id,
    });
  }
  @ResolveField(() => [LegalClientMerchandiseModel])
  async LegalClientMerchandise(@Parent() order: LegalClientOrderModel) {
    const { id } = order;

    return this.legalClientMerchandiseUseCase.getLegalClientMerchandises({
      id,
    });
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: LegalClientOrderInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: LegalClientOrderInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
