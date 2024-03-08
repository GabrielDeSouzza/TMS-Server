import {
  type Prisma,
  type PhysicalCustomerMerchandise as PhysicalCustomerMerchandisePrisma,
} from '@prisma/client';

import { PhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';

export class PhysicalCustomerMerchandisePrismaDTO {
  public static PrismaToEntity(
    physicalCustomerMerchandisePrisma: PhysicalCustomerMerchandisePrisma,
  ) {
    if (!physicalCustomerMerchandisePrisma) return null;

    return new PhysicalCustomerMerchandise({
      amount: physicalCustomerMerchandisePrisma.amount,
      codMerchandise: physicalCustomerMerchandisePrisma.codMerchandise,
      description: physicalCustomerMerchandisePrisma.description,
      physicalCustomerOrderId:
        physicalCustomerMerchandisePrisma.physicalCustomerOrderId,
      mass: physicalCustomerMerchandisePrisma.mass,
      value: physicalCustomerMerchandisePrisma.value,
      volume: physicalCustomerMerchandisePrisma.volume,
    });
  }
  public static EntityToCreatePrisma(
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ) {
    const physicalCustomerMerchandisePrisma: Prisma.PhysicalCustomerMerchandiseCreateInput =
      {
        amount: physicalCustomerMerchandise.amount,
        codMerchandise: physicalCustomerMerchandise.codMerchandise,
        description: physicalCustomerMerchandise.description,
        PhysicalCustomerOrder: {
          connect: { id: physicalCustomerMerchandise.physicalCustomerOrderId },
        },
        mass: physicalCustomerMerchandise.mass,
        value: physicalCustomerMerchandise.value,
        volume: physicalCustomerMerchandise.volume,
      };

    return physicalCustomerMerchandisePrisma;
  }

  public static EntityToPrismaUpdate(
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ) {
    const physicalCustomerMerchandisePrisma: Prisma.PhysicalCustomerMerchandiseUpdateInput =
      {
        amount: physicalCustomerMerchandise.amount,
        codMerchandise: physicalCustomerMerchandise.codMerchandise,
        description: physicalCustomerMerchandise.description,
        PhysicalCustomerOrder:
          physicalCustomerMerchandise.physicalCustomerOrderId
            ? {
                connect: {
                  id: physicalCustomerMerchandise.physicalCustomerOrderId,
                },
              }
            : undefined,
        mass: physicalCustomerMerchandise.mass,
        value: physicalCustomerMerchandise.value,
        volume: physicalCustomerMerchandise.volume,
      };

    return physicalCustomerMerchandisePrisma;
  }
}
