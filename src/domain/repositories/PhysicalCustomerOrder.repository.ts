import { type GetPhysicalCustomerOrderDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerOrderDto';
import { type FindAllPhysicalCustomerOrderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerOrderRepositoryDto';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export abstract class PhysicalCustomerOrderRepository {
  abstract findPhysicalCustomerOrder(
    request: GetPhysicalCustomerOrderDTO,
  ): Promise<PhysicalCustomerOrder>;
  abstract findOrdersByPhyiscalCustomer(
    physicalCustomerId: string,
  ): Promise<PhysicalCustomerOrder[]>;
  abstract createPhysicalCustomerOrder(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ): Promise<PhysicalCustomerOrder>;
  abstract updatePhysicalCustomerOrder(
    id: string,
    physicalCustomerOrder: PhysicalCustomerOrder,
  ): Promise<PhysicalCustomerOrder>;
  abstract getAllPhysicalCustomerOrder(
    parameters: FindAllPhysicalCustomerOrderWhereRequestDTO,
  ): Promise<PhysicalCustomerOrder[]>;
  abstract getAllExpenses(
    request: GetPhysicalCustomerOrderDTO,
  ): Promise<FreightExpense[]>;
}
