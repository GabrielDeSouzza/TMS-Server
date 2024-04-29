import {
  type Prisma,
  type LegalClientOrder as LegalClientOrderPrisma,
} from '@prisma/client';

import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export class LegalClientOrderPrismaDTO {
  public static PrismaToEntity(legalClientOrderPrisma: LegalClientOrderPrisma) {
    if (!legalClientOrderPrisma) return null;

    return new LegalClientOrder({
      legal_contract_id: legalClientOrderPrisma.legal_contract_id,
      order: legalClientOrderPrisma.order,
      updated_by: legalClientOrderPrisma.updated_by,
      quote_table_id: legalClientOrderPrisma.quote_table_id,
      created_at: legalClientOrderPrisma.created_at,
      created_by: legalClientOrderPrisma.created_by,
      id: legalClientOrderPrisma.id,
      updated_at: legalClientOrderPrisma.updated_at,
      carrier_id: legalClientOrderPrisma.carrier_id,
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
      QuoteTable: { connect: { id: legalClientOrder.quote_table_id } },
      CarrierCompany: { connect: { id: legalClientOrder.carrier_id } },
    };

    return legalClientOrderPrisma;
  }

  public static EntityToPrismaUpdate(legalClientOrder: LegalClientOrder) {
    const legalClientOrderUptade: Prisma.LegalClientOrderUpdateInput = {
      LegalContract: legalClientOrder.legal_contract_id
        ? { connect: { id: legalClientOrder.legal_contract_id } }
        : undefined,
      QuoteTable: legalClientOrder.quote_table_id
        ? { connect: { id: legalClientOrder.quote_table_id } }
        : undefined,
      UpdatedBy: { connect: { id: legalClientOrder.updated_by } },
      updated_at: legalClientOrder.updated_at,
      CarrierCompany: legalClientOrder.carrier_id
        ? { connect: { id: legalClientOrder.carrier_id } }
        : undefined,
    };

    return legalClientOrderUptade;
  }
}
