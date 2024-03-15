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
      invoicePhysicalClient: physicalCustomerMerchandisePrisma.invoice_id,
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
        InvoiceForPhysicalCustomer: {
          connect: { id: physicalCustomerMerchandise.invoicePhysicalClient },
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
        InvoiceForPhysicalCustomer:
          physicalCustomerMerchandise.invoicePhysicalClient
            ? {
                connect: {
                  id: physicalCustomerMerchandise.invoicePhysicalClient,
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
