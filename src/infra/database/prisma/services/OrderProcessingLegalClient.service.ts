import { Injectable } from '@nestjs/common';

import { type GetOrderProcessingLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingLegalClientDto';
import { type FindAllOrderProcessingLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingLegalClientRepositoryDto';
import { type OrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';
import { type RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';
import { type OrderProcessingLegalClientRepository } from 'domain/repositories/OrderProcessingLegalClientRepository';

import { PrismaService } from '../prisma.service';
import { OrderProcessingLegalClientPrismaDTO } from './prismaDTO/OrderProcessingLegalClientPrismaDto';
import { RouteLegalClientPrismaDTO } from './prismaDTO/RouteLegalClientPrismaDto';

@Injectable()
export class OrderProcessingLegalClientPrismaService
  implements OrderProcessingLegalClientRepository
{
  constructor(private prisma: PrismaService) {}

  async findOrderProcessingLegalClient(
    request: GetOrderProcessingLegalClientDTO,
  ): Promise<OrderProcessingLegalClient> {
    const orderProcessingLegalClient =
      await this.prisma.orderProcessingLegalClient.findFirst({
        where: {
          id: request.id,
        },
      });

    return OrderProcessingLegalClientPrismaDTO.PrismaToEntity(
      orderProcessingLegalClient,
    );
  }
  async createOrderProcessingLegalClient(
    orderProcessingLegalClient: OrderProcessingLegalClient,
  ): Promise<OrderProcessingLegalClient> {
    const orderprocessinglegalclientPrisma =
      await this.prisma.orderProcessingLegalClient.create({
        data: OrderProcessingLegalClientPrismaDTO.EntityToPrisma(
          orderProcessingLegalClient,
        ),
      });

    return OrderProcessingLegalClientPrismaDTO.PrismaToEntity(
      orderprocessinglegalclientPrisma,
    );
  }
  async updateOrderProcessingLegalClient(
    id: string,
    orderProcessingLegalClient?: OrderProcessingLegalClient,
  ): Promise<OrderProcessingLegalClient> {
    const orderprocessinglegalclientPrisma =
      await this.prisma.orderProcessingLegalClient.update({
        data: OrderProcessingLegalClientPrismaDTO.EntityToPrismaUpdate(
          orderProcessingLegalClient,
        ),
        where: { id },
      });

    return OrderProcessingLegalClientPrismaDTO.PrismaToEntity(
      orderprocessinglegalclientPrisma,
    );
  }

  async findAllOrderProcessingLegalClient(
    parameters: FindAllOrderProcessingLegalClientWhereRequestDTO,
  ): Promise<OrderProcessingLegalClient[]> {
    const orderprocessinglegalclients =
      await this.prisma.orderProcessingLegalClient.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return orderprocessinglegalclients.map(orderProcessingLegalClient =>
      OrderProcessingLegalClientPrismaDTO.PrismaToEntity(
        orderProcessingLegalClient,
      ),
    );
  }
  async findAllRoutesByOrderProcessingLegalClient(
    request: GetOrderProcessingLegalClientDTO,
  ): Promise<RouteLegalClient[]> {
    const orderProcessing =
      await this.prisma.orderProcessingLegalClient.findFirst({
        where: { id: request.id },
        select: { RoutesLegalClient: true },
      });

    return orderProcessing.RoutesLegalClient.map(route =>
      RouteLegalClientPrismaDTO.PrismaToEntity(route),
    );
  }
}
