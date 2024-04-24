import { Injectable } from '@nestjs/common';

import { type GetFreightExpenseDTO } from 'domain/dto/repositories/getDataDtos/GetFreightExpenseDto';
import {
  type CountAllFreightExpenseWhereRequestDTO,
  type FindAllFreightExpenseWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightExpenseRepository.Dto';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { type FreightExpenseRepository } from 'domain/repositories/FreightExpenseResitory';

import { PrismaService } from '../prisma.service';
import { FreightExpensePrismaDTO } from './prismaDTO/FreightExpensePrismaDto';

@Injectable()
export class FreightExpensePrismaService implements FreightExpenseRepository {
  constructor(private prisma: PrismaService) {}
  countFreightExpenseRepositoy(
    parameters: CountAllFreightExpenseWhereRequestDTO,
  ): Promise<number> {
    return this.prisma.freightExpenses.count({
      where: parameters.where ?? undefined,
    });
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
  updateManyFreightExpense(data: FreightExpense[]): Promise<FreightExpense[]> {
    const expensesUpdated = this.prisma.$transaction(async tx => {
      const promises = data.map(async expense => {
        const expensePrisma = await tx.freightExpenses.update({
          data: FreightExpensePrismaDTO.EntityToPrismaUpdate(expense),
          where: { id: expense.id },
        });

        return FreightExpensePrismaDTO.PrismaToEntity(expensePrisma);
      });

      return Promise.all(promises);
    });

    return expensesUpdated;
  }
  async delFreightExpense(data: GetFreightExpenseDTO): Promise<FreightExpense> {
    return FreightExpensePrismaDTO.PrismaToEntity(
      await this.prisma.freightExpenses.delete({ where: { id: data.id } }),
    );
  }
  deleteManyFreightExpenses(ids: string[]): Promise<FreightExpense[]> {
    const expensesDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async expenseId => {
        const expensePrisma = await tx.freightExpenses.delete({
          where: { id: expenseId },
        });

        return FreightExpensePrismaDTO.PrismaToEntity(expensePrisma);
      });

      return Promise.all(promises);
    });

    return expensesDeleted;
  }
}
