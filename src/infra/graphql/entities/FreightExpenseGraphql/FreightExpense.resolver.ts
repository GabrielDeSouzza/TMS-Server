import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { FreightExpenseUseCases } from 'app/useCases/FreightExpenseUseCases/FreightExpenseUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { DeletFreightExpenseInput } from './Args/DeleteFreightExpenseInput';
import { GetFreightExpenseArgs } from './Args/GetFreightExpenseArgs';
import { FreightExpenseWhereArgs } from './Args/WhereFreightExpenseArgs';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FreightExpenseInput,
  FreightExpenseUpdateInput,
} from './FreightExpense.input';
import { FreightExpenseModel } from './FreightExpense.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => FreightExpenseModel)
export class FreightExpenseResolver {
  constructor(private freightExpenseUseCase: FreightExpenseUseCases) {}
  @Query(() => FreightExpenseModel)
  async getFreightExpense(@Args() request: GetFreightExpenseArgs) {
    console.log(request);

    return this.freightExpenseUseCase.getFreightExpense({
      id: request.id,
    });
  }
  @Query(() => [FreightExpenseModel], { nullable: true })
  async getAllFreightExpenses(@Args() args: FreightExpenseWhereArgs) {
    const freightexpense =
      await this.freightExpenseUseCase.getAllFreightExpense(args);

    return freightexpense.length > 0 ? freightexpense : null;
  }
  @Mutation(() => FreightExpenseModel)
  async createFreightExpense(
    @Args('data')
    FreightExpenseInput: FreightExpenseInput,
  ) {
    return this.freightExpenseUseCase.createFreightExpense(FreightExpenseInput);
  }
  @Mutation(() => FreightExpenseModel)
  async updateFreightExpense(
    @Args('id') id: string,
    @Args('upData')
    freightExpenseUpInput: FreightExpenseUpdateInput,
  ) {
    return this.freightExpenseUseCase.updateFreightExpense(
      id,
      freightExpenseUpInput,
    );
  }

  @Mutation(() => FreightExpenseModel)
  async deleteFreightExpense(
    @Args('delData') request: DeletFreightExpenseInput,
  ) {
    return this.freightExpenseUseCase.deleteExpense(request);
  }
}
