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

import { NaturalPersonUseCases } from 'app/useCases/NaturalPersoUseCases/NaturalPersonUseCases';
import { OutsourcedTransportCompanyDriverUseCases } from 'app/useCases/OutsourcedTransportCompanyDriverUseCases/OutsourcedTransportCompanyDriverUseCases';
import { OutsourcedTransportCompanyUseCases } from 'app/useCases/OutsourcedTransportCompanyUseCases/OutsourcedTransportCompanyUseCases';
import { UserUseCases } from 'app/useCases/user/UserCases';

import { OutsourcedTransportCompanyDriverWhereArgs } from 'infra/graphql/entities/OutsourcedTransportCompanyDriverGraphql/Args/WhereOutsourcedTransportCompanyDriverArgs';
import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { NaturalPersonModel } from '../NaturalPersonGraphql/NaturalPerson.model';
import { OutsourcedTransportCompanyModel } from '../OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.model';
import { UserModelRefereces } from '../UserGraphql/user.model';
import { GetOutsourcedTransportCompanyDriverArgs } from './Args/GetOutsourcedTransportCompanyDriverArgs';
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
    private outsourcedTransportCompanyDriverUseCase: OutsourcedTransportCompanyDriverUseCases,
    private userCase: UserUseCases,
    private outsourcedTransportCompanyUseCase: OutsourcedTransportCompanyUseCases,
    private naturalPersonUseCase: NaturalPersonUseCases,
  ) {}
  @Query(() => OutsourcedTransportCompanyDriverModel)
  async getOutsourcedTransportCompanyDriverModel(
    @Args() request: GetOutsourcedTransportCompanyDriverArgs,
  ) {
    return this.outsourcedTransportCompanyDriverUseCase.getOutsourcedTransportCompanyDriver(
      request,
    );
  }
  @Query(() => [OutsourcedTransportCompanyDriverModel], { nullable: true })
  async getAllOutsourcedTransportCompanyDriver(
    @Args() args: OutsourcedTransportCompanyDriverWhereArgs,
  ) {
    return this.outsourcedTransportCompanyDriverUseCase.getAllOutsourcedTransportCompanyDriver(
      args,
    );
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

    return this.outsourcedTransportCompanyDriverUseCase.createOutsourcedTransportCompanyDriver(
      outsourcedTransportCompanyDriverInput,
    );
  }
  @Mutation(() => OutsourcedTransportCompanyDriverModel)
  async updateoutsourcedTransportCompanyDriver(
    @Args('id') id: string,
    @Args('data')
    outsourcedTransportCompanyDriverInput: OutsourcedTransportCompanyDriverUpdateInput,
    @CurrentUser() user: User,
  ) {
    outsourcedTransportCompanyDriverInput.updated_by = user.id;

    return this.outsourcedTransportCompanyDriverUseCase.updateOutsourcedTransportCompanyDriver(
      id,
      outsourcedTransportCompanyDriverInput,
    );
  }

  @ResolveField(() => OutsourcedTransportCompanyModel)
  async OutsourcedTransportCompany(
    @Parent() outsourced: OutsourcedTransportCompanyDriverInput,
  ) {
    return await this.outsourcedTransportCompanyUseCase.getOutsourcedTransportCompany(
      { id: outsourced.outsourced_transport_company_id },
    );
  }
  @ResolveField(() => NaturalPersonModel)
  async NaturalPerson(
    @Parent() outsourced: OutsourcedTransportCompanyDriverInput,
  ) {
    return await this.naturalPersonUseCase.getNaturalPerson({
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
