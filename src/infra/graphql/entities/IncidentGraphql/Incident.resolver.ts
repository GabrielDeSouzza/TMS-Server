import { UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ROLE } from 'domain/entities/User/User';

import { IncidentUseCases } from 'app/useCases/IncidentUseCases/IncidentUseCases';
import { OrderProcessingUseCases } from 'app/useCases/OrderProcessingUseCases/OrderProcessingUseCases';

import { AcessAllowed } from 'infra/graphql/utilities/decorators/AcessAllowed';
import { RoleInterceptor } from 'infra/graphql/utilities/interceptors/RoleInterceptor';
import { GraphQLAuthGuard } from 'infra/guard/GraphQlAuthGuard';

import { OrderProcessingModel } from '../OrderProcessingGraphql/OrderProcessing.model';
import { GetIncidentArgs } from './Args/GetIncidentArgs';
import { IncidentWhereArgs } from './Args/WhereIncidentArgs';
import { IncidentInput, IncidentUpdateInput } from './Incident.input';
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
    IncidentInput: IncidentInput,
  ) {
    return this.incidentUseCase.createIncident(IncidentInput);
  }
  @Mutation(() => IncidentModel)
  async updateIncident(
    @Args('id') id: string,
    @Args('upData')
    incidentUpInput: IncidentUpdateInput,
  ) {
    return this.incidentUseCase.updateIncident(id, incidentUpInput);
  }
  @ResolveField(() => OrderProcessingModel)
  OrderProcessing(@Parent() incident: IncidentInput) {
    return this.orderProcessingUseCase.getOrderProcessing({
      id: incident.order_process_id,
    });
  }
}
