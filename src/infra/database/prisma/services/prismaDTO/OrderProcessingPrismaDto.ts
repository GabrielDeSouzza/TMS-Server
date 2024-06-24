import {
  type Prisma,
  type OrderProcessing as OrderProcessingPrisma,
} from '@prisma/client';

import { OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';

export class OrderProcessingPrismaDTO {
  public static PrismaToEntity(orderprocessingPrisma: OrderProcessingPrisma) {
    if (!orderprocessingPrisma) return null;

    return new OrderProcessing({
      ...orderprocessingPrisma,
    });
  }
  public static EntityToPrisma(orderprocessingEntity: OrderProcessing) {
    console.log(orderprocessingEntity.physical_customer_order_ids);
    console.log(orderprocessingEntity);
    const orderprocessingPrisma: Prisma.OrderProcessingCreateInput = {
      created_at: orderprocessingEntity.created_at,
      created_by: orderprocessingEntity.created_by,
      end_at: orderprocessingEntity.end_at,
      id: orderprocessingEntity.id,
      order_processing_number: orderprocessingEntity.order_processing_number,
      start_at: orderprocessingEntity.start_at,
      total_distance: orderprocessingEntity.total_distance,
      total_spend_liters: orderprocessingEntity.total_spend_liters,
      total_spending_money: orderprocessingEntity.total_spending_money,
      updated_at: orderprocessingEntity.updated_at,
      updated_by: orderprocessingEntity.updated_by,
      status: orderprocessingEntity.status,
      OwnDriver: {
        connect: { id: orderprocessingEntity.driver_id },
      },
      LegalClientOrder:
        orderprocessingEntity.legal_customer_order_ids?.length > 0
          ? {
              connect: orderprocessingEntity.legal_customer_order_ids.map(
                legalOrderId => ({ id: legalOrderId }),
              ),
            }
          : undefined,
      PhysicalCustomerOrder:
        orderprocessingEntity.physical_customer_order_ids?.length > 0
          ? {
              connect: orderprocessingEntity.physical_customer_order_ids.map(
                physicalCustomerId => ({ id: physicalCustomerId }),
              ),
            }
          : undefined,
      Vehicle: { connect: { id: orderprocessingEntity.vehicle_id } },
    };

    return orderprocessingPrisma;
  }

  public static EntityToPrismaUpdate(orderProcessing: OrderProcessing) {
    const orderprocessingUptate: Prisma.OrderProcessingUpdateInput = {
      end_at: orderProcessing?.end_at,
      start_at: orderProcessing?.start_at,
      total_distance: orderProcessing?.total_distance,
      total_spend_liters: orderProcessing?.total_spend_liters,
      total_spending_money: orderProcessing?.total_spending_money,
      updated_at: orderProcessing?.updated_at,
      status: orderProcessing?.status,
      LegalClientOrder: {
        connect:
          orderProcessing.legal_customer_order_ids?.length > 0
            ? orderProcessing.legal_customer_order_ids?.map(legalOrderId => ({
                id: legalOrderId,
              }))
            : undefined,
        disconnect: orderProcessing?.disconnect_legal_order
          ? orderProcessing.disconnect_legal_order.map(legalOrderId => ({
              id: legalOrderId,
            }))
          : undefined,
      },

      PhysicalCustomerOrder: {
        connect:
          orderProcessing.physical_customer_order_ids?.length > 0
            ? orderProcessing.physical_customer_order_ids?.map(
                physicalCustomerId => ({ id: physicalCustomerId }),
              )
            : undefined,
        disconnect: orderProcessing?.disconnect_physical_customer_order
          ? orderProcessing.disconnect_physical_customer_order.map(
              physicalOrderId => ({
                id: physicalOrderId,
              }),
            )
          : undefined,
      },

      Vehicle: {
        connect: orderProcessing?.vehicle_id
          ? { id: orderProcessing?.vehicle_id }
          : undefined,
      },
      OwnDriver: orderProcessing?.driver_id
        ? {
            connect: { id: orderProcessing.driver_id },
          }
        : undefined,
    };

    return orderprocessingUptate;
  }
}
