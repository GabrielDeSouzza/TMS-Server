import { Injectable } from '@nestjs/common';

import { type LegalClientOrder } from 'domain/entities/legalClientEntities/LegalClientOrder/LegaClientOrder';
import { type LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { PrismaService } from '../prisma.service';
import { LegalClientOrderPrismaDTO } from './prismaDTO/LegalClientOrderPrismaDto';

@Injectable()
export class LegalClientOrderPrismaService
  implements LegalClientOrderRepository
{
  constructor(private prisma: PrismaService) {}
  async findOrdersByLegalClient(
    legalClientId: string,
  ): Promise<LegalClientOrder[]> {
    const orders = await this.prisma.legalClientOrder.findMany({
      where: { LegalContract: { legal_client_id: legalClientId } },
    });

    return orders.map(order => LegalClientOrderPrismaDTO.PrismaToEntity(order));
  }
  async findLegalClientOrderById(id: string): Promise<LegalClientOrder> {
    const legalClientOrder =
      await this.prisma.legalClientOrder.findFirstOrThrow({
        where: { id },
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

  async getAllLegalClientOrder(): Promise<LegalClientOrder[]> {
    const legalClientOrders = await this.prisma.legalClientOrder.findMany();

    return legalClientOrders.map(legalClientOrder =>
      LegalClientOrderPrismaDTO.PrismaToEntity(legalClientOrder),
    );
  }
}
