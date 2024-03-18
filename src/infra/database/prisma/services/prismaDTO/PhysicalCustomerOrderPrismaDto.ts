import {
  type Prisma,
  type PhysicalCustomerOrder as PhysicalCustomerOrderPrisma,
} from '@prisma/client';

import { PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export class PhysicalCustomerOrderPrismaDTO {
  public static PrismaToEntity(
    physicalCustomerOrderPrisma: PhysicalCustomerOrderPrisma,
  ) {
    if (!physicalCustomerOrderPrisma) return null;

    return new PhysicalCustomerOrder({
      physicalCustomerId: physicalCustomerOrderPrisma.physical_customer_id,
      order: physicalCustomerOrderPrisma.order,
      updated_by: physicalCustomerOrderPrisma.updated_by,
      created_at: physicalCustomerOrderPrisma.created_at,
      created_by: physicalCustomerOrderPrisma.created_by,
      id: physicalCustomerOrderPrisma.id,
      updated_at: physicalCustomerOrderPrisma.updated_at,
      recipient_id: physicalCustomerOrderPrisma.recipient_id,
    });
  }
  public static EntityToCreatePrisma(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ) {
    console.log(physicalCustomerOrder.recipient_id);
    const physicalCustomerOrderPrisma: Prisma.PhysicalCustomerOrderCreateInput =
      {
        CreatedBy: { connect: { id: physicalCustomerOrder.created_by } },
        PhysicalCustomer: {
          connect: { id: physicalCustomerOrder.physicalCustomerId },
        },
        order: physicalCustomerOrder.order,
        UpdatedBy: { connect: { id: physicalCustomerOrder.updated_by } },
        created_at: physicalCustomerOrder.created_at,
        updated_at: physicalCustomerOrder.updated_at,
        Recipient: { connect: { id: physicalCustomerOrder.recipient_id } },
      };

    return physicalCustomerOrderPrisma;
  }
  public static EntityToPrismaUpdate(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ) {
    const physicalCustomerOrderPrisma: Prisma.PhysicalCustomerOrderUpdateInput =
      {
        PhysicalCustomer: {
          connect: { id: physicalCustomerOrder.physicalCustomerId },
        },
        Recipient: physicalCustomerOrder.recipient_id
          ? { connect: { id: physicalCustomerOrder.recipient_id } }
          : undefined,
        UpdatedBy: { connect: { id: physicalCustomerOrder.updated_by } },
        updated_at: physicalCustomerOrder.updated_at,
      };

    return physicalCustomerOrderPrisma;
  }
}
