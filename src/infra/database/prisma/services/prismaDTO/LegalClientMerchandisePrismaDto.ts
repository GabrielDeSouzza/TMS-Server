import {
  type Prisma,
  type LegalClientMerchandise as LegalClientMerchandisePrisma,
} from '@prisma/client';

import { LegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

export class LegalClientMerchandisePrismaDTO {
  public static PrismaToEntity(
    legalClientMerchandisePrisma: LegalClientMerchandisePrisma,
  ) {
    if (!legalClientMerchandisePrisma) return null;

    return new LegalClientMerchandise({
      amount: legalClientMerchandisePrisma.amount,
      codMerchandise: legalClientMerchandisePrisma.codMerchandise,
      description: legalClientMerchandisePrisma.description,
      invoice_legal_client: legalClientMerchandisePrisma.invoice_id,
      legal_client_order_id: legalClientMerchandisePrisma.legalClientOrderId,
      mass: legalClientMerchandisePrisma.mass,
      value: legalClientMerchandisePrisma.value,
      volume: legalClientMerchandisePrisma.volume,
    });
  }
  public static EntityToCreatePrisma(
    legalClientMerchandise: LegalClientMerchandise,
  ) {
    const legalClientMerchandisePrisma: Prisma.LegalClientMerchandiseCreateInput =
      {
        amount: legalClientMerchandise.amount,
        codMerchandise: legalClientMerchandise.codMerchandise,
        description: legalClientMerchandise.description,
        LegalClientOrder: {
          connect: { id: legalClientMerchandise.legal_client_order_id },
        },
        mass: legalClientMerchandise.mass,
        value: legalClientMerchandise.value,
        volume: legalClientMerchandise.volume,
        InvoiceLegalClient: {
          connect: { id: legalClientMerchandise.invoice_legal_client },
        },
      };

    return legalClientMerchandisePrisma;
  }

  public static EntityToPrismaUpdate(
    legalClientMerchandise: LegalClientMerchandise,
  ) {
    const legalClientMerchandiseUptade: Prisma.LegalClientMerchandiseUpdateInput =
      {
        amount: legalClientMerchandise.amount,
        codMerchandise: legalClientMerchandise.codMerchandise,
        description: legalClientMerchandise.description,
        LegalClientOrder: legalClientMerchandise.legal_client_order_id
          ? {
              connect: { id: legalClientMerchandise.legal_client_order_id },
            }
          : undefined,
        mass: legalClientMerchandise.mass,
        InvoiceLegalClient: legalClientMerchandise.invoice_legal_client
          ? { connect: { id: legalClientMerchandise.invoice_legal_client } }
          : undefined,
        value: legalClientMerchandise.value,
        volume: legalClientMerchandise.volume,
      };

    return legalClientMerchandiseUptade;
  }
}
