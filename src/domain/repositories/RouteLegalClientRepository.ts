import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllRouteLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RouteLegalClientDto';
import { type RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

export abstract class RouteLegalClientRepository {
  abstract findRoute(request: GetRouteDTO): Promise<RouteLegalClient>;
  abstract createRoute(route: RouteLegalClient): Promise<RouteLegalClient>;
  abstract updateRoute(
    id: string,
    routes: RouteLegalClient,
  ): Promise<RouteLegalClient>;
  abstract findAllRoutes(
    parameters: FindAllRouteLegalClientWhereRequestDTO,
  ): Promise<RouteLegalClient[]>;
}
