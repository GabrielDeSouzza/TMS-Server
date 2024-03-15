import { type GetOrderProcessingLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingLegalClientDto';
import { type FindAllOrderProcessingLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingLegalClientRepositoryDto';
import { type OrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';
import { type RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';

export abstract class OrderProcessingLegalClientRepository {
  abstract findOrderProcessingLegalClient(
    request: GetOrderProcessingLegalClientDTO,
  ): Promise<OrderProcessingLegalClient>;
  abstract createOrderProcessingLegalClient(
    data: OrderProcessingLegalClient,
  ): Promise<OrderProcessingLegalClient>;
  abstract updateOrderProcessingLegalClient(
    id: string,
    data: OrderProcessingLegalClient,
  ): Promise<OrderProcessingLegalClient>;
  abstract findAllOrderProcessingLegalClient(
    parameters: FindAllOrderProcessingLegalClientWhereRequestDTO,
  ): Promise<OrderProcessingLegalClient[]>;
  abstract findAllRoutesByOrderProcessingLegalClient(
    request: GetOrderProcessingLegalClientDTO,
  ): Promise<RouteLegalClient[]>;
}
