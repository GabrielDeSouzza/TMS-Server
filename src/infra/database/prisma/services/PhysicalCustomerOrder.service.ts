import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerOrderDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerOrderDto';
import { type FindAllPhysicalCustomerOrderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerOrderRepositoryDto';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { type PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';
import { type PhysicalCustomerOrderRepository } from 'domain/repositories/PhysicalCustomerOrder.repository';

import { PrismaService } from '../prisma.service';
import { FreightExpensePrismaDTO } from './prismaDTO/FreightExpensePrismaDto';
import { PhysicalCustomerOrderPrismaDTO } from './prismaDTO/PhysicalCustomerOrderPrismaDto';

@Injectable()
export class PhysicalCustomerOrderPrismaService
  implements PhysicalCustomerOrderRepository
{
  constructor(private prisma: PrismaService) {}
  async findOrdersByPhyiscalCustomer(
    physicalCustomerId: string,
  ): Promise<PhysicalCustomerOrder[]> {
    const orders = await this.prisma.physicalCustomerOrder.findMany({
      where: { physical_customer_id: physicalCustomerId },
    });

    return orders.map(order =>
      PhysicalCustomerOrderPrismaDTO.PrismaToEntity(order),
    );
  }
  async findPhysicalCustomerOrder(
    request: GetPhysicalCustomerOrderDTO,
  ): Promise<PhysicalCustomerOrder> {
    const physicalCustomerOrder =
      await this.prisma.physicalCustomerOrder.findFirst({
        where: { OR: [{ id: request.id }, { order: request.order }] },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(physicalCustomerOrder);
  }
  async createPhysicalCustomerOrder(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ): Promise<PhysicalCustomerOrder> {
    const physicalCustomerOrderPrisma =
      await this.prisma.physicalCustomerOrder.create({
        data: PhysicalCustomerOrderPrismaDTO.EntityToCreatePrisma(
          physicalCustomerOrder,
        ),
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalCustomerOrderPrisma,
    );
  }
  async updatePhysicalCustomerOrder(
    id: string,
    physicalCustomerOrder?: PhysicalCustomerOrder,
  ): Promise<PhysicalCustomerOrder> {
    const physicalCustomerOrderPrisma =
      await this.prisma.physicalCustomerOrder.update({
        data: PhysicalCustomerOrderPrismaDTO.EntityToPrismaUpdate(
          physicalCustomerOrder,
        ),
        where: { id },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalCustomerOrderPrisma,
    );
  }

  async getAllPhysicalCustomerOrder(
    parameters: FindAllPhysicalCustomerOrderWhereRequestDTO,
  ): Promise<PhysicalCustomerOrder[]> {
    const physicalCustomerOrders =
      await this.prisma.physicalCustomerOrder.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return physicalCustomerOrders.map(physicalCustomerOrder =>
      PhysicalCustomerOrderPrismaDTO.PrismaToEntity(physicalCustomerOrder),
    );
  }
  async getAllExpenses(
    request: GetPhysicalCustomerOrderDTO,
  ): Promise<FreightExpense[]> {
    const expenses = await this.prisma.physicalCustomerOrder.findFirst({
      where: { OR: [{ id: request.id }, { order: request.order }] },
      select: { FreightExpenses: true },
    });

    return expenses.FreightExpenses.map(expense =>
      FreightExpensePrismaDTO.PrismaToEntity(expense),
    );
  }
}
