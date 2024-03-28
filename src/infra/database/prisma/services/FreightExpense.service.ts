import { Injectable } from '@nestjs/common';

import { type GetFreightExpenseDTO } from 'domain/dto/repositories/getDataDtos/GetFreightExpenseDto';
import { type FindAllFreightExpenseWhereRequestDTO } from 'domain/dto/repositories/whereDtos/FreightExpenseRepository.Dto';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { type FreightExpenseRepository } from 'domain/repositories/FreightExpenseResitory';

import { PrismaService } from '../prisma.service';
import { FreightExpensePrismaDTO } from './prismaDTO/FreightExpensePrismaDto';

@Injectable()
export class FreightExpensePrismaService implements FreightExpenseRepository {
  constructor(private prisma: PrismaService) {}

  async delFreightExpense(data: GetFreightExpenseDTO): Promise<FreightExpense> {
    return FreightExpensePrismaDTO.PrismaToEntity(
      await this.prisma.freightExpenses.delete({ where: { id: data.id } }),
    );
  }

  async getFreightExpense(
    request: GetFreightExpenseDTO,
  ): Promise<FreightExpense> {
    return FreightExpensePrismaDTO.PrismaToEntity(
      await this.prisma.freightExpenses.findFirst({
        where: {
          OR: [{ id: request.id }],
        },
      }),
    );
  }
  async createFreightExpense(
    contract: FreightExpense,
  ): Promise<FreightExpense> {
    return FreightExpensePrismaDTO.PrismaToEntity(
      await this.prisma.freightExpenses.create({
        data: FreightExpensePrismaDTO.EntityToCreatePrisma(contract),
      }),
    );
  }

  async createManyFreightExpense(
    expense: FreightExpense[],
  ): Promise<FreightExpense[]> {
    await this.prisma.freightExpenses.createMany({
      data: FreightExpensePrismaDTO.EntityToCreateManyPrisma(expense),
      skipDuplicates: true,
    });
    const expenses = await this.prisma.freightExpenses.findMany({
      where: {
        OR: { physical_customer_id: expense[0].physicalCustomerOrderId },
        legal_client_order_id: expense[0].legalClientOrderId,
      },
    });

    return expenses.map(x => FreightExpensePrismaDTO.PrismaToEntity(x));
  }
  async updateFreightExpense(
    id: string,
    contract: FreightExpense,
  ): Promise<FreightExpense> {
    return FreightExpensePrismaDTO.PrismaToEntity(
      await this.prisma.freightExpenses.update({
        data: FreightExpensePrismaDTO.EntityToPrismaUpdate(contract),
        where: { id },
      }),
    );
  }
  async findAllFreightExpense(
    parameters: FindAllFreightExpenseWhereRequestDTO,
  ): Promise<FreightExpense[]> {
    const contracts = await this.prisma.freightExpenses.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return contracts.map(contract =>
      FreightExpensePrismaDTO.PrismaToEntity(contract),
    );
  }
}
