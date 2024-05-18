import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientOrderUseCases';
import { LegalClientQuoteTableUseCases } from 'app/useCases/LegalClientQuoteTableUseCase/LegalClientQuoteTable';
import { LegalContractUseCases } from 'app/useCases/LegalContractUseCases/LegalContractUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import {
  LegalClientOrderCountArgs,
  LegalClientOrderWhereArgs,
} from 'infra/graphql/entities/LegalClientOrderGraphql/Args/WhereLegalClientOrderArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { LegalClientQuoteTableModel } from '../LegalClientQuoteTableGraphql/LegalClientQuoteTable.model';
import { LegalContractModel } from '../LegalContractGraphql/LegalContract.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetLegalClientOrderArgs } from './Args/GetLegalClientOrderArgs';
import {
  LegalClientOrderInput,
  LegalClientOrderUpdateInput,
  LegalClientOrderUpdateManyInput,
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
    private legalClientQuoteUseCase: LegalClientQuoteTableUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  @Query(() => Int)
  async countLegalClientOrder(@Args() request: LegalClientOrderCountArgs) {
    return this.legalClientOrdeUseCase.countLegalClientOrder(request);
  }
  @Query(() => LegalClientOrderModel, { nullable: true })
  async getLegalClientOrderModel(@Args() request: GetLegalClientOrderArgs) {
    return this.legalClientOrdeUseCase.getLegalClientOrder(request);
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
  @Mutation(() => [LegalClientOrderModel])
  async updateManyLegalClientOrder(
    @Args({ name: 'data', type: () => [LegalClientOrderUpdateManyInput] })
    data: LegalClientOrderUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.legalClientOrdeUseCase.updateManyLegalClientOrder(
      data,
      user.id,
    );
  }
  @Mutation(() => LegalClientOrderModel)
  async deleteLegalClientOrder(@Args('id') id: string) {
    return this.legalClientOrdeUseCase.deleteLegalClientOrder(id);
  }

  @Mutation(() => [LegalClientOrderModel])
  async deleteManyLegalClientOrder(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.legalClientOrdeUseCase.deleteManyLegalClientOrder(ids);
  }
  @ResolveField(() => LegalContractModel)
  async LegalContract(@Parent() order: LegalClientOrderInput) {
    console.log(order);

    return await this.legalContractUseCase.getContract({
      id: order.legal_contract_id,
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
  @ResolveField(() => LegalClientQuoteTableModel)
  async Quote(@Parent() order: LegalClientOrderInput) {
    return await this.legalClientQuoteUseCase.getLegalClientQuoteTable({
      id: order.quote_table_id,
    });
  }
  @ResolveField(() => CarrierCompanyModel)
  async CarrierCompany(@Parent() order: LegalClientOrderInput) {
    return await this.carrierCompanyUseCase.getCarrierCompany({
      id: order.carrier_id,
    });
  }
}
