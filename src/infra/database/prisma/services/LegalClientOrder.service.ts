import { Injectable } from '@nestjs/common';

import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import { type FindAllLegalClientOrderWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientOrderRepositoryDto';
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
    });

    return orders.map(order => LegalClientOrderPrismaDTO.PrismaToEntity(order));
  }
  async findLegalClientOrder(
    request: GetLegalClientOrderDTO,
  ): Promise<LegalClientOrder> {
    const legalClientOrder = await this.prisma.legalClientOrder.findFirst({
      where: { OR: [{ id: request.id }, { order: request.order }] },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(legalClientOrder);
  }
  async createLegalClientOrder(
    legalClientOrder: LegalClientOrder,
  ): Promise<LegalClientOrder> {
    const legalClientOrderPrisma = await this.prisma.legalClientOrder.create({
      data: LegalClientOrderPrismaDTO.EntityToCreatePrisma(legalClientOrder),
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(legalClientOrderPrisma);
  }
  async updateLegalClientOrder(
    id: string,
    legalClientOrder?: LegalClientOrder,
  ): Promise<LegalClientOrder> {
    const legalClientOrderPrisma = await this.prisma.legalClientOrder.update({
      data: LegalClientOrderPrismaDTO.EntityToPrismaUpdate(legalClientOrder),
      where: { id },
    });

    return LegalClientOrderPrismaDTO.PrismaToEntity(legalClientOrderPrisma);
  }

  async getAllLegalClientOrder(
    parameters: FindAllLegalClientOrderWhereRequestDTO,
  ): Promise<LegalClientOrder[]> {
    const legalClientOrders = await this.prisma.legalClientOrder.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return legalClientOrders.map(legalClientOrder =>
      LegalClientOrderPrismaDTO.PrismaToEntity(legalClientOrder),
    );
  }
}
