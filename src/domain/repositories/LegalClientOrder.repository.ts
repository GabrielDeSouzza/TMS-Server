import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import { type FindAllLegalClientOrderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientOrderRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

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
}
