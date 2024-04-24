import { type GetFreightExpenseDTO } from 'domain/dto/repositories/getDataDtos/GetFreightExpenseDto';
import {
  type CountAllFreightExpenseWhereRequestDTO,
  type FindAllFreightExpenseWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightExpenseRepository.Dto';
import { type FreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export abstract class FreightExpenseRepository {
  abstract countFreightExpenseRepositoy(
    parameters: CountAllFreightExpenseWhereRequestDTO,
  ): Promise<number>;
  abstract getFreightExpense(
    request: GetFreightExpenseDTO,
  ): Promise<FreightExpense>;
  abstract findAllFreightExpense(
    parameters: FindAllFreightExpenseWhereRequestDTO,
  ): Promise<FreightExpense[]>;
  abstract createFreightExpense(
    expense: FreightExpense,
  ): Promise<FreightExpense>;
  abstract createManyFreightExpense(
    expense: FreightExpense[],
  ): Promise<FreightExpense[]>;
  abstract updateFreightExpense(
    id: string,
    expense: FreightExpense,
  ): Promise<FreightExpense>;
  abstract updateManyFreightExpense(
    expenses: FreightExpense[],
  ): Promise<FreightExpense[]>;
  abstract delFreightExpense(
    data: GetFreightExpenseDTO,
  ): Promise<FreightExpense>;
  abstract deleteManyFreightExpenses(ids: string[]): Promise<FreightExpense[]>;
}
