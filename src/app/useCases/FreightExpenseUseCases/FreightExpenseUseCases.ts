import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetFreightExpenseDTO } from 'domain/dto/repositories/getDataDtos/GetFreightExpenseDto';
import {
  type CountAllFreightExpenseWhereRequestDTO,
  type FindAllFreightExpenseWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightExpenseRepository.Dto';
import { FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';
import { FreightExpenseRepository } from 'domain/repositories/FreightExpenseResitory';

import { type CreateFreightExpenseDTO } from 'app/dtos/FreightExpenseDto/CreateFreightExpenseDto';
import { type UpdateFreightExpenseDTO } from 'app/dtos/FreightExpenseDto/UpdateFreightExpenseDto';
import { type UpdateManyFreightExpenseDTO } from 'app/dtos/FreightExpenseDto/UpdateManyFreightExpenseDto';

import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientOrderUseCases';
import { PhysicalCustomerOrderUseCases } from '../PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';

@Injectable()
export class FreightExpenseUseCases {
  constructor(
    private freightExpenseRepository: FreightExpenseRepository,
    private legalClientOrder: LegalClientOrderUseCases,
    private physicalCustomeOrder: PhysicalCustomerOrderUseCases,
  ) {}
  async countFreightExpense(request: CountAllFreightExpenseWhereRequestDTO) {
    return this.freightExpenseRepository.countFreightExpenseRepositoy(request);
  }
  async getFreightExpense(request: GetFreightExpenseDTO) {
    if (!request.id) {
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const expenses = await this.freightExpenseRepository.getFreightExpense(
      request,
    );

    if (expenses) return expenses;

    throw new GraphQLError('Expense Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllFreightExpense(request: FindAllFreightExpenseWhereRequestDTO) {
    return this.freightExpenseRepository.findAllFreightExpense(request);
  }
  async createFreightExpense(data: CreateFreightExpenseDTO) {
    if (data.legalClientOrderId && data.physicalCustomerOrderId)
      throw new GraphQLError('SEND ONLY ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    else if (data.legalClientOrderId)
      await this.legalClientOrder.getLegalClientOrder({
        id: data.legalClientOrderId,
      });
    else
      await this.physicalCustomeOrder.getPhysicalCustomerOrder({
        id: data.physicalCustomerOrderId,
      });
    const newExpense = new FreightExpense({
      expenseName: data.expenseName,
      physicalCustomerOrderId: data.physicalCustomerOrderId,
      legalClientOrderId: data.legalClientOrderId,
      value: data.value,
    });

    return this.freightExpenseRepository.createFreightExpense(newExpense);
  }

  async createManyFreightExpense(data: CreateFreightExpenseDTO[]) {
    const expenses = data.map(
      expense =>
        new FreightExpense({
          expenseName: expense.expenseName,
          value: expense.value,
          legalClientOrderId: expense.legalClientOrderId,
          physicalCustomerOrderId: expense.physicalCustomerOrderId,
        }),
    );

    return this.freightExpenseRepository.createManyFreightExpense(expenses);
  }

  async updateFreightExpense(id: string, data: UpdateFreightExpenseDTO) {
    await this.getFreightExpense({ id });
    const updateExpense = new FreightExpense({
      expenseName: data.expenseName,
      value: data.value,
    });

    return this.freightExpenseRepository.updateFreightExpense(
      id,
      updateExpense,
    );
  }

  async updateManyFreightExpenses(data: UpdateManyFreightExpenseDTO[]) {
    const expenses = data.map(
      expense =>
        new FreightExpense({
          expenseName: expense.expenseName,
          value: expense.value,
          id: expense.id,
        }),
    );

    return this.freightExpenseRepository.updateManyFreightExpense(expenses);
  }

  async deleteExpense(data: GetFreightExpenseDTO) {
    await this.getFreightExpense(data);

    return this.freightExpenseRepository.delFreightExpense(data);
  }

  async deleteManyFreightExpenses(ids: string[]) {
    return this.freightExpenseRepository.deleteManyFreightExpenses(ids);
  }
}
