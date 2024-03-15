import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { OrderProcessingLegalClientUseCases } from 'app/useCases/ProcessingLegalClientUseCases/ProcessingLegalClientUseCases';
import { RouteLegalClientUseCases } from 'app/useCases/RouteLegalClientUseCases/RouteLegalClientUseCases';

import { OrderProcessingLegalClientModel } from '../OrderProcessingLegalClientGraphql/OrderProcessingLegalClient.model';
import { getRouteLegalClientArgs } from './Args/GetRouteLegalClientArgs';
import { RoutesLegalClientWhereArgs } from './Args/WhereRouteLegalClientArgs';
import {
  RouteLegalClientUpdateInput,
  RouteLegalClientInput,
} from './RouteLegalClient.input';
import { RouteLegalClientModel } from './RouteLegalClient.model';

@Resolver(() => RouteLegalClientModel)
export class RouteLegalClientResolver {
  constructor(
    private routeLegalClientUseCase: RouteLegalClientUseCases,
    private orderProcessing: OrderProcessingLegalClientUseCases,
  ) {}
  @Query(() => RouteLegalClientModel)
  async getRouteLegalClient(@Args() request: getRouteLegalClientArgs) {
    return this.routeLegalClientUseCase.getRoute(request);
  }
  @Query(() => [RouteLegalClientModel])
  async getAllRouteLegalClient(@Args() request: RoutesLegalClientWhereArgs) {
    return this.routeLegalClientUseCase.getAllRoutes(request);
  }
  @Mutation(() => RouteLegalClientModel)
  async createRouteLegalClient(@Args('data') data: RouteLegalClientInput) {
    return this.routeLegalClientUseCase.createRoute(data);
  }
  @Mutation(() => RouteLegalClientModel)
  async updateRouteLegalClient(
    @Args('id') id: string,
    @Args('data') data: RouteLegalClientUpdateInput,
  ) {
    return this.routeLegalClientUseCase.updateRoute(id, data);
  }
  @ResolveField(() => OrderProcessingLegalClientModel)
  async OrderProcessing(@Parent() route: RouteLegalClientInput) {
    return this.orderProcessing.getOrderProcessingLegalClient({
      id: route.order_processing_id,
    });
  }
}
