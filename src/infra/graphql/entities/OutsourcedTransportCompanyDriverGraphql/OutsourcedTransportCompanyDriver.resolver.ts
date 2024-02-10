import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GraphQLError } from 'graphql';

import { ROLE, User } from 'domain/entities/User/User';
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';
import { OutsourcedTransportCompanyRepository } from 'domain/repositories/OutsourcedTransportCompany.repository';
import { OutsourcedTransportCompanyDriverRepository } from 'domain/repositories/OutsourcedTransportCompanyDriver.repository';

import { UserUseCases } from 'app/useCases/user/UserCases';

import { NaturalPersonGraphDTO } from 'infra/graphql/DTO/NaturalPerson';
import { OutsourcedTransportCompanyDriverGraphqlDTO } from 'infra/graphql/DTO/OutsourcedTransportCompanyDriverGraphqlDto';
import { OutsourcedTransportCompanyDriverWhereArgs } from 'infra/graphql/entities/OutsourcedTransportCompanyDriverGraphql/Args/WhereOutsourcedTransportCompanyDriverArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import {
  OutsourcedTransportCompanyDriverInput,
  OutsourcedTransportCompanyDriverUpdateInput,
} from './OutsourcedTransportCompanyDriver.input';
import { OutsourcedTransportCompanyDriverModel } from './OutsourcedTransportCompanyDriver.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => OutsourcedTransportCompanyDriverModel)
export class OutsourcedTransportCompanyDriverResolver {
  constructor(
    private outsourcedTransportCompanyDriverRepository: OutsourcedTransportCompanyDriverRepository,
    private userCase: UserUseCases,
    private outsourcedTransportCompanyRepository: OutsourcedTransportCompanyRepository,
    private naturalPersonRepository: NaturalPersonRepository,
  ) {}
  @Query(() => OutsourcedTransportCompanyDriverModel)
  async getOutsourcedTransportCompanyDriverModel(@Args('id') id: string) {
    return this.outsourcedTransportCompanyDriverRepository.findOutsourcedTransportCompanyDriver(
      { id },
    );
  }
  @Query(() => [OutsourcedTransportCompanyDriverModel], { nullable: true })
  async getAllOutsourcedTransportCompanyDriver(
    @Args() args: OutsourcedTransportCompanyDriverWhereArgs,
  ) {
    const outsourcedTransportCompanyDriver =
      await this.outsourcedTransportCompanyDriverRepository.getAllOutsourcedTransportCompanyDriver(
        {
          limit: args.limit,
          offset: args.offset,
          sort: args.sort,
          where: args.where,
        },
      );

    return outsourcedTransportCompanyDriver.length > 0
      ? outsourcedTransportCompanyDriver
      : null;
  }
  @Mutation(() => OutsourcedTransportCompanyDriverModel)
  async createOutsourcedTransportCompanyDriver(
    @Args('outsourcedTransportCompanyDriverInput')
    outsourcedTransportCompanyDriverInput: OutsourcedTransportCompanyDriverInput,
    @CurrentUser() user: User,
  ) {
    if (
      !outsourcedTransportCompanyDriverInput.NaturalPerson &&
      !outsourcedTransportCompanyDriverInput.natural_person_id
    ) {
      return new GraphQLError('IS NESSESARY ADD PERSON ID OR PERSON ENTITY');
    }

    outsourcedTransportCompanyDriverInput.created_by = user.id;
    outsourcedTransportCompanyDriverInput.updated_by = user.id;
    const outsourcedTransportCompanyDriverEntity =
      OutsourcedTransportCompanyDriverGraphqlDTO.createInputToEntity(
        outsourcedTransportCompanyDriverInput,
      );
    const naturalPersonEntity = NaturalPersonGraphDTO.createInputToEntity(
      outsourcedTransportCompanyDriverInput.NaturalPerson,
    );

    return this.outsourcedTransportCompanyDriverRepository.createOutsourcedTransportCompanyDriver(
      outsourcedTransportCompanyDriverEntity,
      naturalPersonEntity,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyDriverModel)
  async updateoutsourcedTransportCompanyDriver(
    @Args('id') id: string,
    @Args('outsourcedTransportCompanyDriverInput')
    outsourcedTransportCompanyDriverInput: OutsourcedTransportCompanyDriverUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyDriverInput.updated_by = user.id;
    const outsourcedTransportCompanyDriverEntity =
      OutsourcedTransportCompanyDriverGraphqlDTO.updateInputToEntity(
        outsourcedTransportCompanyDriverInput,
      );
    const naturalPersonEntity = NaturalPersonGraphDTO.updateInputToEntity(
      outsourcedTransportCompanyDriverInput.NaturalPerson,
    );

    return this.outsourcedTransportCompanyDriverRepository.updateOutsourcedTransportCompanyDriver(
      id,
      outsourcedTransportCompanyDriverEntity,
      naturalPersonEntity,
    );
  }

  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() outsourced: OutsourcedTransportCompanyDriverInput,
  ) {
    return await this.outsourcedTransportCompanyRepository.findOutsourcedTransportCompany(
      { id: outsourced.outsourced_transport_company_id },
    );
  }
  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(
    @Parent() outsourced: OutsourcedTransportCompanyDriverInput,
  ) {
    return await this.naturalPersonRepository.findNaturalPerson({
      naturalPersonId: outsourced.natural_person_id,
    });
  }
  @ResolveField(() => UserModelRefereces)
  async CreatedUser(@Parent() user: OutsourcedTransportCompanyDriverInput) {
    const { created_by: createdBy } = user;

    return await this.userCase.getUser({ id: createdBy });
  }
  @ResolveField(() => UserModelRefereces)
  async UpdatedUser(@Parent() user: OutsourcedTransportCompanyDriverInput) {
    const { updated_by: updatedBy } = user;

    return await this.userCase.getUser({ id: updatedBy });
  }
}
