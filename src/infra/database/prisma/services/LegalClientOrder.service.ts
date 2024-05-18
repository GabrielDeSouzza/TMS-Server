import { Injectable } from '@nestjs/common';

import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import {
  type CountLegalClientOrderRequestDTO,
  type FindAllLegalClientOrderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientOrderRepositoryDto';
import { type LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { type LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { PrismaService } from '../prisma.service';
import { FreightExpensePrismaDTO } from './prismaDTO/FreightExpensePrismaDto';
import { LegalClientOrderPrismaDTO } from './prismaDTO/LegalClientOrderPrismaDto';

@Injectable()
export class LegalClientOrderPrismaService
  implements LegalClientOrderRepository
{
  constructor(private prisma: PrismaService) {}
  countLegalClientOrder(
    request: CountLegalClientOrderRequestDTO,
  ): Promise<number> {
    return this.prisma.legalClientOrder.count({
      where: request.where ?? undefined,
    });
  }
  async getAllExpenses(
    request: GetLegalClientOrderDTO,
  ): Promise<FreightExpense[]> {
    const expenses = await this.prisma.legalClientOrder.findFirst({
      where: { OR: [{ id: request.id }, { order: request.order }] },
      select: { FreightExpenses: true },
    });

    return expenses.FreightExpenses.map(expense =>
      FreightExpensePrismaDTO.PrismaToEntity(expense),
    );
  }
  async findOrdersByLegalClient(
    legalClientId: string,
  ): Promise<LegalClientOrder[]> {
    const orders = await this.prisma.legalClientOrder.findMany({
      where: { LegalContract: { legal_client_id: legalClientId } },
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return orders.map(legalClientOrder =>
      LegalClientOrderPrismaDTO.PrismaToEntity(
        legalClientOrder,
        legalClientOrder.FreightExpenses,
        legalClientOrder.QuoteTable.Icms.aliquot,
      ),
    );
  }
  async findLegalClientOrder(
    request: GetLegalClientOrderDTO,
  ): Promise<LegalClientOrder> {
    const legalClientOrder = await this.prisma.legalClientOrder.findFirst({
      where: { OR: [{ id: request.id }, { order: request.order }] },
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(
      legalClientOrder,
      legalClientOrder.FreightExpenses,
      legalClientOrder.QuoteTable.Icms.aliquot,
    );
  }
  async createLegalClientOrder(
    legalClientOrder: LegalClientOrder,
  ): Promise<LegalClientOrder> {
    const legalClientOrderPrisma = await this.prisma.legalClientOrder.create({
      data: LegalClientOrderPrismaDTO.EntityToCreatePrisma(legalClientOrder),
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(
      legalClientOrderPrisma,
      legalClientOrderPrisma.FreightExpenses,
      legalClientOrderPrisma.QuoteTable.Icms.aliquot,
    );
  }
  async updateLegalClientOrder(
    id: string,
    legalClientOrder?: LegalClientOrder,
  ): Promise<LegalClientOrder> {
    const legalClientOrderPrisma = await this.prisma.legalClientOrder.update({
      data: LegalClientOrderPrismaDTO.EntityToPrismaUpdate(legalClientOrder),
      where: { id },
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(
      legalClientOrderPrisma,
      legalClientOrderPrisma.FreightExpenses,
      legalClientOrderPrisma.QuoteTable.Icms.aliquot,
    );
  }

  async getAllLegalClientOrder(
    parameters: FindAllLegalClientOrderWhereRequestDTO,
  ): Promise<LegalClientOrder[]> {
    const legalClientOrders = await this.prisma.legalClientOrder.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return legalClientOrders.map(legalClientOrder =>
      LegalClientOrderPrismaDTO.PrismaToEntity(
        legalClientOrder,
        legalClientOrder.FreightExpenses,
        legalClientOrder.QuoteTable.Icms.aliquot,
      ),
    );
  }
  updateManyLegalClientOrder(
    data: LegalClientOrder[],
  ): Promise<LegalClientOrder[]> {
    console.log(data);
    const legalclientorderUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async legalclientorder => {
        const legalClientOrderPrisma = await tx.legalClientOrder.update({
          data: LegalClientOrderPrismaDTO.EntityToPrismaUpdate(
            legalclientorder,
          ),
          where: { id: legalclientorder.id },
          include: {
            FreightExpenses: true,
            QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
          },
        });

        return LegalClientOrderPrismaDTO.PrismaToEntity(
          legalClientOrderPrisma,
          legalClientOrderPrisma.FreightExpenses,
          legalClientOrderPrisma.QuoteTable.Icms.aliquot,
        );
      });

      return Promise.all(promises);
    });

    return legalclientorderUpdate;
  }

  async deleteLegalClientOrder(id: string): Promise<LegalClientOrder> {
    const legalClientOrderPrisma = await this.prisma.legalClientOrder.delete({
      where: { id },
      include: {
        FreightExpenses: true,
        QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
      },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(
      legalClientOrderPrisma,
      legalClientOrderPrisma.FreightExpenses,
      legalClientOrderPrisma.QuoteTable.Icms.aliquot,
    );
  }
  deleteManyLegalClientOrder(ids: string[]): Promise<LegalClientOrder[]> {
    const legalclientorderDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const legalClientOrderPrisma = await tx.legalClientOrder.delete({
          where: { id: icmdsId },
          include: {
            FreightExpenses: true,
            QuoteTable: { select: { Icms: { select: { aliquot: true } } } },
          },
        });

        return LegalClientOrderPrismaDTO.PrismaToEntity(
          legalClientOrderPrisma,
          legalClientOrderPrisma.FreightExpenses,
          legalClientOrderPrisma.QuoteTable.Icms.aliquot,
        );
      });

      return Promise.all(promises);
    });

    return legalclientorderDeleted;
  }
}
