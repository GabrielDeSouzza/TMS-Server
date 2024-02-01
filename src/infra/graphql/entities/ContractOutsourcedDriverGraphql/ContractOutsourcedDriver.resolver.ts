import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Query,
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { ROLE, User } from 'domain/entities/User/User';
import { OutsourcedDriverRepository } from 'domain/repositories/OutsourcedDriverRepository';

import { ContractOutsourcedDriverUseCases } from 'app/useCases/ContractOutsourcedDriverUseCases/ContractOutsourcedDriverUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { ContractOutsourcedDriverWhereArgs } from 'infra/graphql/args/ContractOutsourcedDriverArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { OutsourcedDriverModel } from '../OutsourcedDriverGraphql/OutsourcedDriver.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  ContractOutsoucedDriverUpdateInput,
  ContractOutsourcedDriverInput,
} from './ContractOutsoucedDriver.input';
import { ContractOutsourcedDriverModel } from './ContractOutsourcedDriver.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => ContractOutsourcedDriverModel)
export class ContractOutsoucedDriverResolver {
  constructor(
    private contractOutsourcedDriverUseCases: ContractOutsourcedDriverUseCases,
    private userCase: UserUseCases,
    private outsourcedDriverRepository: OutsourcedDriverRepository,
  ) {}
  @Query(() => ContractOutsourcedDriverModel)
  async getContractOutsourcedDriver(
    @Args('id', { nullable: true }) id: string,
    @Args('contractNumber', { nullable: true }) contractNumber?: string,
  ) {
    return this.contractOutsourcedDriverUseCases.getContractOutsourcedDriver({
      id,
      contractNumber,
    });
  }
  @Query(() => [ContractOutsourcedDriverModel])
  async getAllCompanyVehicle(@Args() args: ContractOutsourcedDriverWhereArgs) {
    return await this.contractOutsourcedDriverUseCases.getAllContractOutsourcedDriver(
      {
        limit: args.limit,
        offset: args.offset,
        sort: args.sort,
        where: args.where,
      },
    );
  }
  @Mutation(() => ContractOutsourcedDriverModel)
  async createCompanyVehicle(
    @Args('CompanyVehicleInput')
    contractOutsourced: ContractOutsourcedDriverInput,
    @CurrentUser() user: User,
  ) {
    contractOutsourced.created_by = user.id;
    contractOutsourced.updated_by = user.id;

    return await this.contractOutsourcedDriverUseCases.createAllContractOutsourcedDriver(
      contractOutsourced,
    );
  }
  @Mutation(() => ContractOutsourcedDriverModel)
  async updatedCompanyVehicle(
    @Args('id') id: string,
    @Args('outsourced') contract: ContractOutsoucedDriverUpdateInput,
    @CurrentUser() user: User,
  ) {
    contract.updated_by = user.id;

    return await this.contractOutsourcedDriverUseCases.updateContractOutsourcedDriver(
      id,
      contract,
    );
  }

  @ResolveField(() => OutsourcedDriverModel)
  async OutsourcedDriver(@Parent() contract: ContractOutsourcedDriverModel) {
    const { outsourced_driver_id: outsourcedDriverId } = contract;

    return await this.outsourcedDriverRepository.findOutsourcedDriver(
      outsourcedDriverId,
    );
  }

  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: ContractOutsourcedDriverModel) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: ContractOutsourcedDriverModel) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
