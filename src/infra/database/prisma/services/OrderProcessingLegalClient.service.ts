import { Injectable } from '@nestjs/common';

import { type GetOrderProcessingDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingDto';
import { type FindAllOrderProcessingWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OrderProcessingRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';
import { type OrderProcessingRepository } from 'domain/repositories/OrderProcessingRepository';

import { PrismaService } from '../prisma.service';
import { LegalClientOrderPrismaDTO } from './prismaDTO/LegalClientOrderPrismaDto';
import { OrderProcessingPrismaDTO } from './prismaDTO/OrderProcessingPrismaDto';
import { PhysicalCustomerOrderPrismaDTO } from './prismaDTO/PhysicalCustomerOrderPrismaDto';

@Injectable()
export class OrderProcessingPrismaService implements OrderProcessingRepository {
  constructor(private prisma: PrismaService) {}

  async findOrderProcessing(
    request: GetOrderProcessingDTO,
  ): Promise<OrderProcessing> {
    const orderProcessing = await this.prisma.orderProcessing.findFirst({
      where: {
        OR: [
          { id: request.id },
          { Vehicle: { id: request.vehicleData?.vehicleId } },
          { Vehicle: { plate: request.vehicleData?.plate } },
          { order_processing_number: request.order_processing_number },
        ],
      },
    });

    return OrderProcessingPrismaDTO.PrismaToEntity(orderProcessing);
  }
  async createOrderProcessing(
    orderProcessing: OrderProcessing,
  ): Promise<OrderProcessing> {
    const orderprocessingPrisma = await this.prisma.orderProcessing.create({
      data: OrderProcessingPrismaDTO.EntityToPrisma(orderProcessing),
    });

    return OrderProcessingPrismaDTO.PrismaToEntity(orderprocessingPrisma);
  }
  async updateOrderProcessing(
    id: string,
    orderProcessing?: OrderProcessing,
  ): Promise<OrderProcessing> {
    const orderprocessingPrisma = await this.prisma.orderProcessing.update({
      data: OrderProcessingPrismaDTO.EntityToPrismaUpdate(orderProcessing),
      where: { id },
    });

    return OrderProcessingPrismaDTO.PrismaToEntity(orderprocessingPrisma);
  }

  async findAllOrderProcessing(
    parameters: FindAllOrderProcessingWhereRequestDTO,
  ): Promise<OrderProcessing[]> {
    const orderprocessings = await this.prisma.orderProcessing.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return orderprocessings.map(orderProcessing =>
      OrderProcessingPrismaDTO.PrismaToEntity(orderProcessing),
    );
  }

  async findAllPhysicalCustomerOrder(
    request: GetOrderProcessingDTO,
  ): Promise<PhysicalCustomerOrder[]> {
    const orders = await this.prisma.orderProcessing.findFirst({
      where: {
        OR: [
          { id: request.id },
          { Vehicle: { id: request.vehicleData.vehicleId } },
          { Vehicle: { plate: request.vehicleData.plate } },
          { order_processing_number: request.order_processing_number },
        ],
      },
      select: { PhysicalCustomerOrder: true },
    });

    return orders.PhysicalCustomerOrder.map(order =>
      PhysicalCustomerOrderPrismaDTO.PrismaToEntity(order),
    );
  }
  async findAllLegalClintOrder(
    request: GetOrderProcessingDTO,
  ): Promise<LegalClientOrder[]> {
    const orders = await this.prisma.orderProcessing.findFirst({
      where: {
        OR: [
          { id: request.id },
          { Vehicle: { id: request.vehicleData.vehicleId } },
          { Vehicle: { plate: request.vehicleData.plate } },
          { order_processing_number: request.order_processing_number },
        ],
      },
      select: { LegalClientOrder: true },
    });

    return orders.LegalClientOrder.map(order =>
      LegalClientOrderPrismaDTO.PrismaToEntity(order),
    );
  }
}
