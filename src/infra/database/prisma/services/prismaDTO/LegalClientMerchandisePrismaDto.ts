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
      legalClientOrderId: legalClientMerchandisePrisma.legalClientOrderId,
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
          connect: { id: legalClientMerchandise.legalClientOrderId },
        },
        mass: legalClientMerchandise.mass,
        value: legalClientMerchandise.value,
        volume: legalClientMerchandise.volume,
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
        LegalClientOrder: legalClientMerchandise.legalClientOrderId
          ? {
              connect: { id: legalClientMerchandise.legalClientOrderId },
            }
          : undefined,
        mass: legalClientMerchandise.mass,
        value: legalClientMerchandise.value,
        volume: legalClientMerchandise.volume,
      };

    return legalClientMerchandiseUptade;
  }
}
