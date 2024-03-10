import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllRoutePhysicalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RoutePhysicalClientRepositoryDto';
import { type RoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';

export abstract class RoutePhysicalCustomerRepository {
  abstract findRoute(request: GetRouteDTO): Promise<RoutePhysicalCustomer>;
  abstract createRoute(
    Routes: RoutePhysicalCustomer,
  ): Promise<RoutePhysicalCustomer>;
  abstract updateRoute(
    id: string,
    Routes: RoutePhysicalCustomer,
  ): Promise<RoutePhysicalCustomer>;
  abstract findAllRoutes(
    parameters: FindAllRoutePhysicalClientWhereRequestDTO,
  ): Promise<RoutePhysicalCustomer[]>;
}
