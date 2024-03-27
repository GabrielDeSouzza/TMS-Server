import {
  type Prisma,
  type PhysicalCustomerCte as PhysicalCustomerCtePrisma,
} from '@prisma/client';

import { PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';

export class PhysicalCustomerCtePrismaDTO {
  public static PrismaToEntity(
    physicalCustomerCtePrisma: PhysicalCustomerCtePrisma,
  ) {
    if (!physicalCustomerCtePrisma) return null;

    return new PhysicalCustomerCte({
      acessKey: physicalCustomerCtePrisma.access_key,
      cteNumber: physicalCustomerCtePrisma.cte_number,
      orderId: physicalCustomerCtePrisma.order_id,
      id: physicalCustomerCtePrisma.id,
      observations: physicalCustomerCtePrisma.observations,
      cteType: physicalCustomerCtePrisma.type_cte,
    });
  }
  public static EntityToCreatePrisma(physicalCustomerCte: PhysicalCustomerCte) {
    const physicalCustomerCtePrisma: Prisma.PhysicalCustomerCteCreateInput = {
      access_key: physicalCustomerCte.acessKey,
      cte_number: physicalCustomerCte.cteNumber,
      observations: physicalCustomerCte.observations,
      PhysicalCustomerOrder: { connect: { id: physicalCustomerCte.orderId } },
      type_cte: physicalCustomerCte.cteType,
      id: physicalCustomerCte.id,
    };

    return physicalCustomerCtePrisma;
  }
  public static EntityToPrismaUpdate(physicalCustomerCte: PhysicalCustomerCte) {
    const physicalCustomerCtePrisma: Prisma.PhysicalCustomerCteUpdateInput = {
      observations: physicalCustomerCte.observations,
      PhysicalCustomerOrder: physicalCustomerCte.orderId
        ? { connect: { id: physicalCustomerCte.orderId } }
        : undefined,
      type_cte: physicalCustomerCte.cteType,
    };

    return physicalCustomerCtePrisma;
  }
}
