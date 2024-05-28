import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerOrderDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerOrderDto';
import {
  type CountPhysicalCustomerOrderRequestDTO,
  type FindAllPhysicalCustomerOrderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerOrderRepositoryDto';
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
  countPhysicalCustomerOrder(
    request: CountPhysicalCustomerOrderRequestDTO,
  ): Promise<number> {
    return this.prisma.physicalCustomerOrder.count({
      where: request.where ?? undefined,
    });
  }
  async findOrdersByPhyiscalCustomer(
    physicalCustomerId: string,
  ): Promise<PhysicalCustomerOrder[]> {
    const physicalCustomerOrders =
      await this.prisma.physicalCustomerOrder.findMany({
        where: { physical_customer_id: physicalCustomerId },
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return physicalCustomerOrders.map(order =>
      PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
        order,
        order.FreightExpenses,
        order.PhysicalCustomerQuoteTable.Icms.aliquot,
      ),
    );
  }
  async findPhysicalCustomerOrder(
    request: GetPhysicalCustomerOrderDTO,
  ): Promise<PhysicalCustomerOrder> {
    const physicalCustomerOrderPrisma =
      await this.prisma.physicalCustomerOrder.findFirst({
        where: { OR: [{ id: request.id }, { order: request.order }] },
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalCustomerOrderPrisma,
      physicalCustomerOrderPrisma?.FreightExpenses,
      physicalCustomerOrderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
    );
  }
  async createPhysicalCustomerOrder(
    physicalCustomerOrder: PhysicalCustomerOrder,
  ): Promise<PhysicalCustomerOrder> {
    const icms = await this.prisma.physicalCustomerQuoteTable.findFirst({
      select: { Icms: { select: { aliquot: true } } },
      where: { id: physicalCustomerOrder.quote_table_id },
    });
    physicalCustomerOrder.icms_tax = icms.Icms.aliquot;
    const physicalCustomerOrderPrisma =
      await this.prisma.physicalCustomerOrder.create({
        data: PhysicalCustomerOrderPrismaDTO.EntityToCreatePrisma(
          physicalCustomerOrder,
        ),
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalCustomerOrderPrisma,
      physicalCustomerOrderPrisma?.FreightExpenses,
      physicalCustomerOrderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
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
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalCustomerOrderPrisma,
      physicalCustomerOrderPrisma?.FreightExpenses,
      physicalCustomerOrderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
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
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return physicalCustomerOrders.map(order =>
      PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
        order,
        order?.FreightExpenses,
        order?.PhysicalCustomerQuoteTable.Icms.aliquot,
      ),
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

  updateManyPhysicalCustomerOrder(
    data: PhysicalCustomerOrder[],
  ): Promise<PhysicalCustomerOrder[]> {
    const physicalcustomerorderUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async physicalcustomerorder => {
        const physicalcustomerorderPrisma =
          await tx.physicalCustomerOrder.update({
            data: PhysicalCustomerOrderPrismaDTO.EntityToPrismaUpdate(
              physicalcustomerorder,
            ),
            where: { id: physicalcustomerorder.id },
            include: {
              FreightExpenses: true,
              PhysicalCustomerQuoteTable: {
                select: { Icms: { select: { aliquot: true } } },
              },
            },
          });

        return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
          physicalcustomerorderPrisma,
          physicalcustomerorderPrisma?.FreightExpenses,
          physicalcustomerorderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
        );
      });

      return Promise.all(promises);
    });

    return physicalcustomerorderUpdate;
  }

  async deletePhysicalCustomerOrder(
    id: string,
  ): Promise<PhysicalCustomerOrder> {
    const physicalcustomerorderPrisma =
      await this.prisma.physicalCustomerOrder.delete({
        where: { id },
        include: {
          FreightExpenses: true,
          PhysicalCustomerQuoteTable: {
            select: { Icms: { select: { aliquot: true } } },
          },
        },
      });

    return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
      physicalcustomerorderPrisma,
      physicalcustomerorderPrisma?.FreightExpenses,
      physicalcustomerorderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
    );
  }
  deleteManyPhysicalCustomerOrder(
    ids: string[],
  ): Promise<PhysicalCustomerOrder[]> {
    const physicalcustomerorderDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const physicalcustomerorderPrisma =
          await tx.physicalCustomerOrder.delete({
            where: { id: icmdsId },
            include: {
              FreightExpenses: true,
              PhysicalCustomerQuoteTable: {
                select: { Icms: { select: { aliquot: true } } },
              },
            },
          });

        return PhysicalCustomerOrderPrismaDTO.PrismaToEntity(
          physicalcustomerorderPrisma,
          physicalcustomerorderPrisma?.FreightExpenses,
          physicalcustomerorderPrisma?.PhysicalCustomerQuoteTable.Icms.aliquot,
        );
      });

      return Promise.all(promises);
    });

    return physicalcustomerorderDeleted;
  }
}
