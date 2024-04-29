import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import {
  type CountLegalClientOrderRequestDTO,
  type FindAllLegalClientOrderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientOrderRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export abstract class LegalClientOrderRepository {
  abstract findLegalClientOrder(
    request: GetLegalClientOrderDTO,
  ): Promise<LegalClientOrder>;
  abstract findOrdersByLegalClient(
    legalClientId: string,
  ): Promise<LegalClientOrder[]>;
  abstract createLegalClientOrder(
    legalClientOrder: LegalClientOrder,
  ): Promise<LegalClientOrder>;
  abstract updateLegalClientOrder(
    id: string,
    legalClientOrder: LegalClientOrder,
  ): Promise<LegalClientOrder>;
  abstract getAllLegalClientOrder(
    parameters: FindAllLegalClientOrderWhereRequestDTO,
  ): Promise<LegalClientOrder[]>;
  abstract getAllExpenses(
    request: GetLegalClientOrderDTO,
  ): Promise<FreightExpense[]>;

  abstract updateManyLegalClientOrder(
    data: LegalClientOrder[],
  ): Promise<LegalClientOrder[]>;
  abstract deleteLegalClientOrder(id: string): Promise<LegalClientOrder>;
  abstract deleteManyLegalClientOrder(
    ids: string[],
  ): Promise<LegalClientOrder[]>;
  abstract countLegalClientOrder(
    request: CountLegalClientOrderRequestDTO,
  ): Promise<number>;
}
