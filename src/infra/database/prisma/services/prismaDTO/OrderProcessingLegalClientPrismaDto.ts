import {
  type Prisma,
  type OrderProcessingLegalClient as OrderProcessingLegalClientPrisma,
} from '@prisma/client';

import { OrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';

export class OrderProcessingLegalClientPrismaDTO {
  public static PrismaToEntity(
    orderprocessinglegalclientPrisma: OrderProcessingLegalClientPrisma,
  ) {
    if (!orderprocessinglegalclientPrisma) return null;

    return new OrderProcessingLegalClient({
      ...orderprocessinglegalclientPrisma,
    });
  }
  public static EntityToPrisma(
    orderprocessinglegalclientEntity: OrderProcessingLegalClient,
  ) {
    const orderprocessinglegalclientPrisma: OrderProcessingLegalClientPrisma = {
      created_at: orderprocessinglegalclientEntity.created_at,
      created_by: orderprocessinglegalclientEntity.created_by,
      end_at: orderprocessinglegalclientEntity.end_at,
      id: orderprocessinglegalclientEntity.id,
      order_id: orderprocessinglegalclientEntity.order_id,
      start_at: orderprocessinglegalclientEntity.start_at,
      total_distance: orderprocessinglegalclientEntity.total_distance,
      total_spend_liters: orderprocessinglegalclientEntity.total_spend_liters,
      total_spending_money:
        orderprocessinglegalclientEntity.total_spending_money,
      updated_at: orderprocessinglegalclientEntity.updated_at,
      updated_by: orderprocessinglegalclientEntity.updated_by,
      vehicle_id: orderprocessinglegalclientEntity.vehicle_id,
    };

    return orderprocessinglegalclientPrisma;
  }

  public static EntityToPrismaUpdate(
    orderProcessinglegalclient: OrderProcessingLegalClient,
  ) {
    const orderprocessinglegalclientUptate: Prisma.OrderProcessingLegalClientUpdateInput =
      {
        end_at: orderProcessinglegalclient.end_at,
        Order: orderProcessinglegalclient.order_id
          ? { connect: { id: orderProcessinglegalclient.order_id } }
          : undefined,
        start_at: orderProcessinglegalclient.start_at,
        total_distance: orderProcessinglegalclient.total_distance,
        total_spend_liters: orderProcessinglegalclient.total_spend_liters,
        total_spending_money: orderProcessinglegalclient.total_spending_money,
        updated_at: orderProcessinglegalclient.updated_at,
        UpdatedBy: { connect: { id: orderProcessinglegalclient.updated_by } },
        Vehicle: orderProcessinglegalclient.vehicle_id
          ? { connect: { id: orderProcessinglegalclient.vehicle_id } }
          : undefined,
      };

    return orderprocessinglegalclientUptate;
  }
}
