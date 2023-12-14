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
import { CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportCompanyContractRepository } from 'domain/repositories/OutsourcedTransportCompanyContract.repository';
import { UserRepository } from 'domain/repositories/UserRepository';

import { OutsourcedTransportCompanyContractGraphqlDTO } from 'infra/graphql/DTO/OutsourcedTransportCompanyContractGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { CarrierCompanyModel } from '../CarrierCompanyGraphql/CarrierCompany.model';
import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
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
    private outsourcedTransportCompanyContractRepository: OutsourcedTransportCompanyContractRepository,
    private userRepository: UserRepository,
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
    private carrierCompanyRepository: CarrierCompanyRepository,
    private legalClientOrderRepository: LegalClientOrderRepository,
  ) {}
  @Query(() => OutsourcedTransportCompanyContractModel)
  async getOutsourcedTransportCompanyContractModel(@Args('id') id: string) {
    return this.outsourcedTransportCompanyContractRepository.findOutsourcedTransportCompanyContractById(
      id,
    );
  }
  @Query(() => [OutsourcedTransportCompanyContractModel], { nullable: true })
  async getAllOutsourcedTransportCompanyContract() {
    const outsourcedTransportCompanyContract =
      await this.outsourcedTransportCompanyContractRepository.getAllOutsourcedTransportCompanyContract();

    return outsourcedTransportCompanyContract.length > 0
      ? outsourcedTransportCompanyContract
      : null;
  }
  @Mutation(() => OutsourcedTransportCompanyContractModel)
  async createOutsourcedTransportCompanyContract(
    @Args('outsourcedTransportCompanyContractInput')
    outsourcedTransportCompanyContractInput: OutsourcedTransportCompanyContractInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyContractInput.created_by = user.id;
    outsourcedTransportCompanyContractInput.updated_by = user.id;
    const outsourcedTransportCompanyContractEntity =
      OutsourcedTransportCompanyContractGraphqlDTO.createInputToEntity(
        outsourcedTransportCompanyContractInput,
      );

    return this.outsourcedTransportCompanyContractRepository.createOutsourcedTransportCompanyContract(
      outsourcedTransportCompanyContractEntity,
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
    const outsourcedTransportCompanyContractEntity =
      OutsourcedTransportCompanyContractGraphqlDTO.updateInputToEntity(
        outsourcedTransportCompanyContractInput,
      );

    return this.outsourcedTransportCompanyContractRepository.updateOutsourcedTransportCompanyContract(
      id,
      outsourcedTransportCompanyContractEntity,
    );
  }
  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return await this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompanyById(
      contract.outSourcedTransportCompanyId,
    );
  }
  @ResolveField(() => CarrierCompanyModel)
  async CarrierCompany(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return this.carrierCompanyRepository.findCarrierCompanyById(
      contract.outSourcedTransportCompanyId,
    );
  }
  @ResolveField(() => LegalClientOrderModel)
  async LegalClientOrder(
    @Parent() contract: OutsourcedTransportCompanyContractInput,
  ) {
    return await this.legalClientOrderRepository.findLegalClientOrderById(
      contract.legalClientOrderId,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async createdUser(@Parent() user: OutsourcedTransportCompanyContractInput) {
    const { created_by: createdBy } = user;

    return await this.userRepository.findUserById(createdBy);
  }
  @ResolveField(() => UserModelRefereces)
  async updatedUser(
    @Parent() user: OutsourcedTransportCompanyContractUpdateInput,
  ) {
    const { updated_by: updatedBy } = user;

    return await this.userRepository.findUserById(updatedBy);
  }
}
