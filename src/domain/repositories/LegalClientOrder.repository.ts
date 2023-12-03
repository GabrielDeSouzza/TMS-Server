import { type LegalClientOrder } from 'domain/entities/legalClientEntities/LegalClientOrder/LegaClientOrder';

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
  abstract getAllLegalClientOrder(): Promise<LegalClientOrder[]>;
}
