import { type GetOrderProcessingDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingDto';
import { type FindAllOrderProcessingWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OrderProcessingRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export abstract class OrderProcessingRepository {
  abstract findOrderProcessing(
    request: GetOrderProcessingDTO,
  ): Promise<OrderProcessing>;
  abstract createOrderProcessing(
    data: OrderProcessing,
  ): Promise<OrderProcessing>;
  abstract updateOrderProcessing(
    id: string,
    data: OrderProcessing,
  ): Promise<OrderProcessing>;
  abstract findAllOrderProcessing(
    parameters: FindAllOrderProcessingWhereRequestDTO,
  ): Promise<OrderProcessing[]>;
  abstract findAllPhysicalCustomerOrder(
    request: GetOrderProcessingDTO,
  ): Promise<PhysicalCustomerOrder[]>;
  abstract findAllLegalClintOrder(
    request: GetOrderProcessingDTO,
  ): Promise<LegalClientOrder[]>;
}
