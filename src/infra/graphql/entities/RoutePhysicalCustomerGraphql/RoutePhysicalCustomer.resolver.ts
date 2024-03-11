import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RoutePhysicalCustomerUseCases } from 'app/useCases/RoutePhysicalCustomerUseCase/RoutePhysicalCustomerUseCases';

import { getRoutePhysicalCustomerArgs } from './Args/GetRoutePhysicalCustomerArgs';
import { RoutesPhysicalCustomerWhereArgs } from './Args/WhereRoutePhysicalCustomerArgs';
import {
  RoutePhysicalCustomerUpdateInput,
  RoutePhysicalCustomerInput,
} from './RoutePhysicalCustomer.input';
import { RoutePhysicalCustomerModel } from './RoutePhysicalCustomer.model';

@Resolver(() => RoutePhysicalCustomerModel)
export class RoutePhysicalCustomerResolver {
  constructor(
    private routePhysicalCustomerUseCase: RoutePhysicalCustomerUseCases,
  ) {}
  @Query(() => RoutePhysicalCustomerModel)
  async getRoutePhysicalCustomer(
    @Args() request: getRoutePhysicalCustomerArgs,
  ) {
    return this.routePhysicalCustomerUseCase.getRoute(request);
  }
  @Query(() => [RoutePhysicalCustomerModel])
  async getAllRoutePhysicalCustomer(
    @Args() request: RoutesPhysicalCustomerWhereArgs,
  ) {
    return this.routePhysicalCustomerUseCase.getAllRoutes(request);
  }
  @Mutation(() => RoutePhysicalCustomerModel)
  async createRoutePhysicalCustomer(
    @Args('data') data: RoutePhysicalCustomerInput,
  ) {
    return this.routePhysicalCustomerUseCase.createRoute(data);
  }
  @Mutation(() => RoutePhysicalCustomerModel)
  async updateRoutePhysicalCustomer(
    @Args('id') id: string,
    @Args('data') data: RoutePhysicalCustomerUpdateInput,
  ) {
    return this.routePhysicalCustomerUseCase.updateRoute(id, data);
  }
}
