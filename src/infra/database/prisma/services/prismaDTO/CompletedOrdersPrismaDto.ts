import {
  type Prisma,
  type CompletedOrders as CompletedOrdersPrisma,
} from '@prisma/client';

import { CompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';

export class CompletedOrdersPrismaDTO {
  public static PrismaToEntity(completedordersPrisma: CompletedOrdersPrisma) {
    if (!completedordersPrisma) return null;

    return new CompletedOrders({
      ...completedordersPrisma,
    });
  }
  public static EntityToPrisma(completedordersEntity: CompletedOrders) {
    const completedordersPrisma: Prisma.CompletedOrdersCreateInput = {
      created_at: completedordersEntity.created_at,
      created_by: completedordersEntity.created_by,
      end_at: completedordersEntity.end_at,
      id: completedordersEntity.id,
      order_processing_number: completedordersEntity.order_processing_number,
      start_at: completedordersEntity.start_at,
      total_distance: completedordersEntity.total_distance,
      total_spend_liters: completedordersEntity.total_spend_liters,
      total_spending_money: completedordersEntity.total_spending_money,
      updated_at: completedordersEntity.updated_at,
      updated_by: completedordersEntity.updated_by,
      LegalClientOrder: completedordersEntity.legal_customer_order_id
        ? { connect: { id: completedordersEntity.legal_customer_order_id } }
        : undefined,
      PhysicalCustomerOrder: completedordersEntity.physical_customer_order_id
        ? { connect: { id: completedordersEntity.physical_customer_order_id } }
        : undefined,
      Vehicle: { connect: { id: completedordersEntity.vehicle_id } },
    };

    return completedordersPrisma;
  }

  public static EntityToPrismaUpdate(completedOrders: CompletedOrders) {
    const completedordersUptate: Prisma.CompletedOrdersUpdateInput = {
      end_at: completedOrders.end_at,

      start_at: completedOrders.start_at,
      total_distance: completedOrders.total_distance,
      total_spend_liters: completedOrders.total_spend_liters,
      total_spending_money: completedOrders.total_spending_money,
      updated_at: completedOrders.updated_at,
      LegalClientOrder: {
        connect: { id: completedOrders.legal_customer_order_id },
        disconnect: { id: completedOrders.disconnect_legal_order },
      },

      PhysicalCustomerOrder: {
        connect: { id: completedOrders.physical_customer_order_id },
        disconnect: { id: completedOrders.disconnect_physical_customer_order },
      },

      Vehicle: { connect: { id: completedOrders.vehicle_id } },
    };

    return completedordersUptate;
  }
}
