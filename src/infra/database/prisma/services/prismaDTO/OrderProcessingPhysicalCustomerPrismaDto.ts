import {
  type Prisma,
  type OrderProcessingPhysicalCustomer as OrderProcessingPhysicalCustomerPrisma,
} from '@prisma/client';

import { OrderProcessingPhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingPhysicalCustomer/OrderProcessingPhysicalCustomer';

export class OrderProcessingPhysicalCustomerPrismaDTO {
  public static PrismaToEntity(
    orderprocessingphysicalcustomerPrisma: OrderProcessingPhysicalCustomerPrisma,
  ) {
    if (!orderprocessingphysicalcustomerPrisma) return null;

    return new OrderProcessingPhysicalCustomer({
      ...orderprocessingphysicalcustomerPrisma,
    });
  }
  public static EntityToPrisma(
    orderprocessingphysicalcustomerEntity: OrderProcessingPhysicalCustomer,
  ) {
    const orderprocessingphysicalcustomerPrisma: OrderProcessingPhysicalCustomerPrisma =
      {
        created_at: orderprocessingphysicalcustomerEntity.created_at,
        created_by: orderprocessingphysicalcustomerEntity.created_by,
        end_at: orderprocessingphysicalcustomerEntity.end_at,
        id: orderprocessingphysicalcustomerEntity.id,
        order_id: orderprocessingphysicalcustomerEntity.order_id,
        start_at: orderprocessingphysicalcustomerEntity.start_at,
        total_distance: orderprocessingphysicalcustomerEntity.total_distance,
        total_spend_liters:
          orderprocessingphysicalcustomerEntity.total_spend_liters,
        total_spending_money:
          orderprocessingphysicalcustomerEntity.total_spending_money,
        updated_at: orderprocessingphysicalcustomerEntity.updated_at,
        updated_by: orderprocessingphysicalcustomerEntity.updated_by,
        vehicle_id: orderprocessingphysicalcustomerEntity.vehicle_id,
      };

    return orderprocessingphysicalcustomerPrisma;
  }

  public static EntityToPrismaUpdate(
    orderProcessingphysicalcustomer: OrderProcessingPhysicalCustomer,
  ) {
    const orderprocessingphysicalcustomerUptate: Prisma.OrderProcessingPhysicalCustomerUpdateInput =
      {
        end_at: orderProcessingphysicalcustomer.end_at,
        Order: { connect: { id: orderProcessingphysicalcustomer.order_id } },
        start_at: orderProcessingphysicalcustomer.start_at,
        total_distance: orderProcessingphysicalcustomer.total_distance,
        total_spend_liters: orderProcessingphysicalcustomer.total_spend_liters,
        total_spending_money:
          orderProcessingphysicalcustomer.total_spending_money,
        updated_at: orderProcessingphysicalcustomer.updated_at,
        UpdatedBy: {
          connect: { id: orderProcessingphysicalcustomer.updated_by },
        },
        Vehicle: {
          connect: { id: orderProcessingphysicalcustomer.vehicle_id },
        },
      };

    return orderprocessingphysicalcustomerUptate;
  }
}
