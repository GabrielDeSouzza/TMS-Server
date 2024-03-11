import { Injectable } from '@nestjs/common';

import { type GetOrderProcessingPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingPhysicalCustomer';
import { type FindAllOrderProcessingPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingPhysicalCustomerRepositoryDto';
import { type OrderProcessingPhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingPhysicalCustomer/OrderProcessingPhysicalCustomer';
import { type OrderProcessingPhysicalCustomerRepository } from 'domain/repositories/OrderProcessingPhysicalCustomerRepository';

import { PrismaService } from '../prisma.service';
import { OrderProcessingPhysicalCustomerPrismaDTO } from './prismaDTO/OrderProcessingPhysicalCustomerPrismaDto';

@Injectable()
export class OrderProcessingPhysicalCustomerPrismaService
  implements OrderProcessingPhysicalCustomerRepository
{
  constructor(private prisma: PrismaService) {}

  async findOrderProcessingPhysicalCustomer(
    request: GetOrderProcessingPhysicalCustomerDTO,
  ): Promise<OrderProcessingPhysicalCustomer> {
    const orderProcessingPhysicalCustomer =
      await this.prisma.orderProcessingPhysicalCustomer.findFirst({
        where: {
          id: request.id,
        },
      });

    return OrderProcessingPhysicalCustomerPrismaDTO.PrismaToEntity(
      orderProcessingPhysicalCustomer,
    );
  }
  async createOrderProcessingPhysicalCustomer(
    orderProcessingPhysicalCustomer: OrderProcessingPhysicalCustomer,
  ): Promise<OrderProcessingPhysicalCustomer> {
    const orderprocessingphysicalcustomerPrisma =
      await this.prisma.orderProcessingPhysicalCustomer.create({
        data: OrderProcessingPhysicalCustomerPrismaDTO.EntityToPrisma(
          orderProcessingPhysicalCustomer,
        ),
      });

    return OrderProcessingPhysicalCustomerPrismaDTO.PrismaToEntity(
      orderprocessingphysicalcustomerPrisma,
    );
  }
  async updateOrderProcessingPhysicalCustomer(
    id: string,
    orderProcessingPhysicalCustomer?: OrderProcessingPhysicalCustomer,
  ): Promise<OrderProcessingPhysicalCustomer> {
    const orderprocessingphysicalcustomerPrisma =
      await this.prisma.orderProcessingPhysicalCustomer.update({
        data: OrderProcessingPhysicalCustomerPrismaDTO.EntityToPrismaUpdate(
          orderProcessingPhysicalCustomer,
        ),
        where: { id },
      });

    return OrderProcessingPhysicalCustomerPrismaDTO.PrismaToEntity(
      orderprocessingphysicalcustomerPrisma,
    );
  }

  async findAllOrderProcessingPhysicalCustomer(
    parameters: FindAllOrderProcessingPhysicalCustomerWhereRequestDTO,
  ): Promise<OrderProcessingPhysicalCustomer[]> {
    const orderprocessingphysicalcustomers =
      await this.prisma.orderProcessingPhysicalCustomer.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return orderprocessingphysicalcustomers.map(
      orderProcessingPhysicalCustomer =>
        OrderProcessingPhysicalCustomerPrismaDTO.PrismaToEntity(
          orderProcessingPhysicalCustomer,
        ),
    );
  }
}
