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

import { CarrierCompanyUseCases } from 'app/useCases/CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';
import { OutsourcedTransportCompanyContractUseCases } from 'app/useCases/OutsourcedTransportCompanyContractUseCases/OutsourcedTransportCompanyContractUseCases';
import { OutsourcedTransportCompanyUseCases } from 'app/useCases/OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedTransportCompanyWhereArgs } from 'infra/graphql/entities/OutsourcedTransportCompanyGraphql/Args/WhereOutsourcedTransportCompanyArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetOutsourcedTransportCompanyContractArgs } from './Args/GetOutsourcedTransportCompanyContractArgs';
import {
  OutsourcedTransportCompanyContractInput,
  OutsourcedTransportCompanyContractUpdateInput,
} from './OutsourcedTransportCompanyContract.input';
import { OutsourcedTransportCompanyContractModel } from './OutsourcedTransportCompanyContract.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedTransportCompanyContractModel)
export class OutsourcedTransportCompanyContractResolver {
  constructor(
    private outsourcedTransportCompanyContractUseCase: OutsourcedTransportCompanyContractUseCases,
    private userCase: UserUseCases,
    private outsourcedTransportCompanyUseCase: OutsourcedTransportCompanyUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
  ) {}
  @Query(() => OutsourcedTransportCompanyContractModel, { nullable: true })
  async getOutsourcedTransportCompanyContractModel(
    @Args() request: GetOutsourcedTransportCompanyContractArgs,
  ) {
    return this.outsourcedTransportCompanyContractUseCase.getOutsourcedTransportCompanyContract(
      request,
    );
  }
  @Query(() => [OutsourcedTransportCompanyContractModel], { nullable: true })
  async getAllOutsourcedTransportCompanyContract(
    @Args() args: OutsourcedTransportCompanyWhereArgs,
  ) {
    return await this.outsourcedTransportCompanyContractUseCase.getAllOutsourcedTransportCompanyContract(
      args,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyContractModel)
  async createOutsourcedTransportCompanyContract(
    @Args('outsourcedTransportCompanyContractInput')
    outsourcedTransportCompanyContractInput: OutsourcedTransportCompanyContractInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyContractInput.created_by = user.id;
    outsourcedTransportCompanyContractInput.updated_by = user.id;

    return this.outsourcedTransportCompanyContractUseCase.createOutsourcedTransportCompanyContract(
      outsourcedTransportCompanyContractInput,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyContractModel)
  async updateoutsourcedTransportCompanyContract(
    @Args('id') id: string,
    @Args('outsourcedTransportCompanyContractInput')
    outsourcedTransportCompanyContractInput: OutsourcedTransportCompanyContractUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyContractInput.updated_by = user.id;

    return this.outsourcedTransportCompanyContractUseCase.updateOutsourcedTransportCompanyContract(
      id,
      outsourcedTransportCompanyContractInput,
    );
  }
  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return await this.outsourcedTransportCompanyUseCase.getOutsourcedTransportCompany(
      { id: contract.outSourcedTransportCompanyId },
    );
  }
  @ResolveField(() => CarrierCompanyModel)
  async CarrierCompany(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return this.carrierCompanyUseCase.getCarrierCompany({
      id: contract.carrierCompanyId,
    });
  }
  @ResolveField(() => LegalClientOrderModel)
  async LegalClientOrder(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return await this.legalClientOrderUseCase.getLegalClientOrder({
      id: contract.legalClientOrderId,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedTransportCompanyContractInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(
    @Parent() user: OutsourcedTransportCompanyContractUpdateInput,
  ) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
