import {
  type Prisma,
  type LegalClientCte as LegalClientCtePrisma,
} from '@prisma/client';

import { LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

export class LegalClientCtePrismaDTO {
  public static PrismaToEntity(legalClientCtePrisma: LegalClientCtePrisma) {
    if (!legalClientCtePrisma) return null;

    return new LegalClientCte({
      acessKey: legalClientCtePrisma.access_key,
      cteNumber: legalClientCtePrisma.cte_number,
      orderId: legalClientCtePrisma.order_id,
      id: legalClientCtePrisma.id,
      observations: legalClientCtePrisma.observations,
      cteType: legalClientCtePrisma.type_cte,
    });
  }
  public static EntityToCreatePrisma(legalClientCte: LegalClientCte) {
    const legalClientCtePrisma: Prisma.LegalClientCteCreateInput = {
      access_key: legalClientCte.acessKey,
      cte_number: legalClientCte.cteNumber,
      observations: legalClientCte.observations,
      LegalClientOrder: { connect: { id: legalClientCte.orderId } },
      type_cte: legalClientCte.cteType,
      id: legalClientCte.id,
    };

    return legalClientCtePrisma;
  }
  public static EntityToPrismaUpdate(legalClientCte: LegalClientCte) {
    const legalClientCtePrisma: Prisma.LegalClientCteUpdateInput = {
      observations: legalClientCte.observations,
      LegalClientOrder: legalClientCte.orderId
        ? { connect: { id: legalClientCte.orderId } }
        : undefined,
      type_cte: legalClientCte.cteType,
    };

    return legalClientCtePrisma;
  }
}
