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

import { IncidentUseCases } from 'app/useCases/IncidentUseCases/IncidentUseCases';
import { OrderProcessingUseCases } from 'app/useCases/OrderProcessingUseCases/OrderProcessingUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { CurrentUser } from 'infra/graphql/utilities/decorators/CurrentUser';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { OrderProcessingModel } from '../OrderProcessingGraphql/OrderProcessing.model';
import { GetIncidentArgs } from './Args/GetIncidentArgs';
import { IncidentCountArgs, IncidentWhereArgs } from './Args/WhereIncidentArgs';
import {
  IncidentInput,
  IncidentUpdateInput,
  IncidentUpdateManyInput,
} from './Incident.input';
import { IncidentModel } from './Incident.model';

@UseGuards(GraphQLAuthGuard)
@UseInterceptors(RoleInterceptor)
@AcessAllowed(ROLE.USER)
@Resolver(() => IncidentModel)
export class IncidentResolver {
  constructor(
    private incidentUseCase: IncidentUseCases,
    private orderProcessingUseCase: OrderProcessingUseCases,
  ) {}
  @Query(() => Number)
  async countIncident(@Args() request: IncidentCountArgs) {
    return this.incidentUseCase.countIncident(request);
  }
  @Query(() => IncidentModel)
  async getIncident(@Args() request: GetIncidentArgs) {
    console.log(request);

    return this.incidentUseCase.getIncident({
      id: request.id,
    });
  }
  @Query(() => [IncidentModel], { nullable: true })
  async getAllIncidents(@Args() args: IncidentWhereArgs) {
    const incident = await this.incidentUseCase.getAllIncident(args);

    return incident.length > 0 ? incident : null;
  }
  @Mutation(() => IncidentModel)
  async createIncident(
    @Args('data')
    incidentInput: IncidentInput,
    @CurrentUser() user: User,
  ) {
    incidentInput.created_by = user.id;
    incidentInput.updated_by = user.id;

    return this.incidentUseCase.createIncident(incidentInput);
  }
  @Mutation(() => IncidentModel)
  async updateIncident(
    @Args('id') id: string,
    @Args('upData')
    incidentUpInput: IncidentUpdateInput,
    @CurrentUser() user: User,
  ) {
    incidentUpInput.updated_by = user.id;

    return this.incidentUseCase.updateIncident(id, incidentUpInput);
  }
  @Mutation(() => [IncidentModel])
  async updateManyIncident(
    @Args({ name: 'data', type: () => [IncidentUpdateManyInput] })
    data: IncidentUpdateManyInput[],
    @CurrentUser() user: User,
  ) {
    return this.incidentUseCase.updateManyIncident(data, user.id);
  }
  @Mutation(() => IncidentModel)
  async deleteIncident(@Args('id') id: string) {
    return this.incidentUseCase.deleteIncident(id);
  }

  @Mutation(() => [IncidentModel])
  async deleteManyIncident(
    @Args({ name: 'ids', type: () => [String] })
    ids: string[],
  ) {
    return this.incidentUseCase.deleteManyIncident(ids);
  }
  @ResolveField(() => OrderProcessingModel)
  OrderProcessing(@Parent() incident: IncidentInput) {
    return this.orderProcessingUseCase.getOrderProcessing({
      id: incident.order_process_id,
    });
  }
}
