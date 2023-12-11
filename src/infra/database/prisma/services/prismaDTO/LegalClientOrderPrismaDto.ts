import {
  type Prisma,
  type LegalClientOrder as LegalClientOrderPrisma,
} from '@prisma/client';

import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export class LegalClientOrderPrismaDTO {
  public static PrismaToEntity(legalClientOrderPrisma: LegalClientOrderPrisma) {
    return new LegalClientOrder({
      legal_contract_id: legalClientOrderPrisma.legal_contract_id,
      order: legalClientOrderPrisma.order,
      updated_by: legalClientOrderPrisma.updated_by,
      created_at: legalClientOrderPrisma.created_at,
      created_by: legalClientOrderPrisma.created_by,
      id: legalClientOrderPrisma.id,
      updated_at: legalClientOrderPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(legalClientOrder: LegalClientOrder) {
    const legalClientOrderPrisma: Prisma.LegalClientOrderCreateInput = {
      CreatedBy: { connect: { id: legalClientOrder.created_by } },
      LegalContract: { connect: { id: legalClientOrder.legal_contract_id } },
      order: legalClientOrder.order,
      UpdatedBy: { connect: { id: legalClientOrder.updated_by } },
      created_at: legalClientOrder.created_at,
      updated_at: legalClientOrder.updated_at,
    };

    return legalClientOrderPrisma;
  }

  public static EntityToPrismaUpdate(legalClientOrder: LegalClientOrder) {
    const legalClientOrderUptade: Prisma.LegalClientOrderUpdateInput = {
      LegalContract: { connect: { id: legalClientOrder.legal_contract_id } },
      order: legalClientOrder.order,
      UpdatedBy: { connect: { id: legalClientOrder.updated_by } },
      updated_at: legalClientOrder.updated_at,
    };

    return legalClientOrderUptade;
  }
}
