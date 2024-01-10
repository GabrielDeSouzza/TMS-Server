import { type FindAllLegalClientOrderWhereRequestDTO } from 'domain/dto/repositories/LegalClientOrderRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export abstract class LegalClientOrderRepository {
  abstract findLegalClientOrderById(id: string): Promise<LegalClientOrder>;
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
