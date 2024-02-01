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
import { LegalPersonRepository } from 'domain/repositories/LegalPerson.repository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedTransportCompanyWhereArgs } from 'infra/graphql/args/OutsourcedTransportCompanyArgs';
import { LegalPersonGraphqlDTO } from 'infra/graphql/DTO/LegalPersonGraphqlDto';
import { OutsourcedTransportCompanyGraphqlDTO } from 'infra/graphql/DTO/OutsourcedTransportCompanyGraphqlDto';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { LegalPersonModel } from '../LegalPersonGraphql/LegalPerson.model';
import { OutsourcedTransportCompanyContractModel } from '../OutsourcedTransportCompanyContractGraphql/OutsourcedTransportCompanyContract.model';
import { OutsourcedTransportCompanyDriverModel } from '../OutsourcedTransportCompanyDriverGraphql/OutsourcedTransportCompanyDriver.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  OutsourcedTransportCompanyInput,
  OutsourcedTransportCompanyUpdateInput,
} from './OutsourcedTransportCompany.input';
import { OutsourcedTransportCompanyModel } from './OutsourcedTransportCompany.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedTransportCompanyModel)
export class OutsourcedTransportCompanyResolver {
  constructor(
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
    private userCase: UserUseCases,
    private legalPersonRepository: LegalPersonRepository,
  ) {}
  @Query(() => OutsourcedTransportCompanyModel)
  async getOutsourcedTransportCompanyModel(@Args('id') id: string) {
    return this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompanyById(
      id,
    );
  }
  @Query(() => [OutsourcedTransportCompanyModel], { nullable: true })
  async getAllOutsourcedTransportCompany(
    @Args() args: OutsourcedTransportCompanyWhereArgs,
  ) {
    const outsourcedTransportCompany =
      await this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompany(
        {
          limit: args.limit,
          offset: args.offset,
          sort: args.sort,
          where: args.where,
        },
      );

    return outsourcedTransportCompany.length > 0
      ? outsourcedTransportCompany
      : null;
  }
  @Mutation(() => OutsourcedTransportCompanyModel)
  async createOutsourcedTransportCompany(
    @Args('outsourcedTransportCompanyInput')
    outsourcedTransportCompanyInput: OutsourcedTransportCompanyInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyInput.created_by = user.id;
    outsourcedTransportCompanyInput.updated_by = user.id;
    const outsourcedTransportCompanyEntity =
      OutsourcedTransportCompanyGraphqlDTO.createInputToEntity(
        outsourcedTransportCompanyInput,
      );
    const legalPersonEntity = LegalPersonGraphqlDTO.updateInputToEntity(
      outsourcedTransportCompanyInput.LegalPerson,
    );

    return this.outsourcedTransportCompanyRepository.createOutsourcedTransportCompany(
      outsourcedTransportCompanyEntity,
      legalPersonEntity,
      outsourcedTransportCompanyInput.legalPersonId,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyModel)
  async updateoutsourcedTransportCompany(
    @Args('id') id: string,
    @Args('outsourcedTransportCompanyInput')
    outsourcedTransportCompanyInput: OutsourcedTransportCompanyUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyInput.updated_by = user.id;
    const outsourcedTransportCompanyEntity =
      OutsourcedTransportCompanyGraphqlDTO.updateInputToEntity(
        outsourcedTransportCompanyInput,
      );
    const legalPersonEntity = LegalPersonGraphqlDTO.updateInputToEntity(
      outsourcedTransportCompanyInput.LegalPeson,
    );

    return this.outsourcedTransportCompanyRepository.updateOutsourcedTransportCompany(
      id,
      outsourcedTransportCompanyEntity,
      legalPersonEntity,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyDriverModel])
  async Drivers(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    console.log(outsourd.id);

    return await this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyDrivers(
      outsourd.id,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyContractModel])
  async Contracts(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    console.log(outsourd.id);

    return await this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyContracts(
      outsourd.id,
    );
  }
  @ResolveField(() => [OutsourcedTransportCompanyContractModel])
  async Vehicles(@Parent() outsourd: OutsourcedTransportCompanyModel) {
    console.log(outsourd.id);

    return await this.outsourcedTransportCompanyRepository.getAllOutsourcedTransportCompanyVehicles(
      outsourd.id,
    );
  }
  @ResolveField(() => LegalPersonModel)
  async LegalPerson(@Parent() transport: OutsourcedTransportCompanyModel) {
    return await this.legalPersonRepository.findlegalpersonById(
      transport.legalPersonId,
    );
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedTransportCompanyInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OutsourcedTransportCompanyInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
