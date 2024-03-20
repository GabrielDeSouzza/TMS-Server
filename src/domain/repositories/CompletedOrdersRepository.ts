import { type GetCompletedOrdersDTO } from 'domain/dto/repositories/getDataDtos/GetCompletedOrdersDto';
import { type FindAllCompletedOrdersWhereRequestDTO } from 'domain/dto/repositories/whereDtos/CompletedOrdersRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type CompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export abstract class CompletedOrdersRepository {
  abstract findCompletedOrders(
    request: GetCompletedOrdersDTO,
  ): Promise<CompletedOrders>;
  abstract createCompletedOrders(
    data: CompletedOrders,
  ): Promise<CompletedOrders>;
  abstract updateCompletedOrders(
    id: string,
    data: CompletedOrders,
  ): Promise<CompletedOrders>;
  abstract findAllCompletedOrders(
    parameters: FindAllCompletedOrdersWhereRequestDTO,
  ): Promise<CompletedOrders[]>;
  abstract findAllPhysicalCustomerOrder(
    request: GetCompletedOrdersDTO,
  ): Promise<PhysicalCustomerOrder[]>;
  abstract findAllLegalClintOrder(
    request: GetCompletedOrdersDTO,
  ): Promise<LegalClientOrder[]>;
}
