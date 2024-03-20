import { Injectable } from '@nestjs/common';

import { type GetCompletedOrdersDTO } from 'domain/dto/repositories/getDataDtos/GetCompletedOrdersDto';
import { type FindAllCompletedOrdersWhereRequestDTO } from 'domain/dto/repositories/whereDtos/CompletedOrdersRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type CompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';
import { type CompletedOrdersRepository } from 'domain/repositories/CompletedOrdersRepository';

import { PrismaService } from '../prisma.service';
import { CompletedOrdersPrismaDTO } from './prismaDTO/CompletedOrdersPrismaDto';
import { LegalClientOrderPrismaDTO } from './prismaDTO/LegalClientOrderPrismaDto';
import { PhysicalCustomerOrderPrismaDTO } from './prismaDTO/PhysicalCustomerOrderPrismaDto';

@Injectable()
export class CompletedOrdersPrismaService implements CompletedOrdersRepository {
  constructor(private prisma: PrismaService) {}

  async findCompletedOrders(
    request: GetCompletedOrdersDTO,
  ): Promise<CompletedOrders> {
    const completedOrders = await this.prisma.completedOrders.findFirst({
      where: {
        OR: [
          { id: request.id },
          { Vehicle: { id: request.vehicleData.vehicleId } },
          { Vehicle: { plate: request.vehicleData.plate } },
          { order_processing_number: request.order_processing_number },
        ],
      },
    });

    return CompletedOrdersPrismaDTO.PrismaToEntity(completedOrders);
  }
  async createCompletedOrders(
    completedOrders: CompletedOrders,
  ): Promise<CompletedOrders> {
    const completedordersPrisma = await this.prisma.completedOrders.create({
      data: CompletedOrdersPrismaDTO.EntityToPrisma(completedOrders),
    });

    return CompletedOrdersPrismaDTO.PrismaToEntity(completedordersPrisma);
  }
  async updateCompletedOrders(
    id: string,
    completedOrders?: CompletedOrders,
  ): Promise<CompletedOrders> {
    const completedordersPrisma = await this.prisma.completedOrders.update({
      data: CompletedOrdersPrismaDTO.EntityToPrismaUpdate(completedOrders),
      where: { id },
    });

    return CompletedOrdersPrismaDTO.PrismaToEntity(completedordersPrisma);
  }

  async findAllCompletedOrders(
    parameters: FindAllCompletedOrdersWhereRequestDTO,
  ): Promise<CompletedOrders[]> {
    const completedorderss = await this.prisma.completedOrders.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return completedorderss.map(completedOrders =>
      CompletedOrdersPrismaDTO.PrismaToEntity(completedOrders),
    );
  }

  async findAllPhysicalCustomerOrder(
    request: GetCompletedOrdersDTO,
  ): Promise<PhysicalCustomerOrder[]> {
    const orders = await this.prisma.completedOrders.findFirst({
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
    request: GetCompletedOrdersDTO,
  ): Promise<LegalClientOrder[]> {
    const orders = await this.prisma.completedOrders.findFirst({
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
