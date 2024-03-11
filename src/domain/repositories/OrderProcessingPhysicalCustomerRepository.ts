import { type GetOrderProcessingPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingPhysicalCustomer';
import { type FindAllOrderProcessingPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingPhysicalCustomerRepositoryDto';
import { type OrderProcessingPhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingPhysicalCustomer/OrderProcessingPhysicalCustomer';

export abstract class OrderProcessingPhysicalCustomerRepository {
  abstract findOrderProcessingPhysicalCustomer(
    request: GetOrderProcessingPhysicalCustomerDTO,
  ): Promise<OrderProcessingPhysicalCustomer>;
  abstract createOrderProcessingPhysicalCustomer(
    data: OrderProcessingPhysicalCustomer,
  ): Promise<OrderProcessingPhysicalCustomer>;
  abstract updateOrderProcessingPhysicalCustomer(
    id: string,
    data: OrderProcessingPhysicalCustomer,
  ): Promise<OrderProcessingPhysicalCustomer>;
  abstract findAllOrderProcessingPhysicalCustomer(
    parameters: FindAllOrderProcessingPhysicalCustomerWhereRequestDTO,
  ): Promise<OrderProcessingPhysicalCustomer[]>;
}
