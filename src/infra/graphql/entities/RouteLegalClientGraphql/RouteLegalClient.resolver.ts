import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LegalClientOrderUseCases } from 'app/useCases/LegalClientOrderUseCases/LegalClientUseCases';
import { RouteLegalClientUseCases } from 'app/useCases/RouteLegalClientUseCases/RouteLegalClientUseCases';

import { LegalClientOrderModel } from '../LegalClientOrderGraphql/LegalClientOrder.model';
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
    private legalClientOrder: LegalClientOrderUseCases,
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
  @ResolveField(() => LegalClientOrderModel)
  async LegalClientOrder(@Parent() request: RouteLegalClientInput) {
    return this.legalClientOrder.getLegalClientOrder({
      id: request.legalClientOrderId,
    });
  }
}
