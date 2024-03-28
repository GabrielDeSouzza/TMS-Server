import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export abstract class CreateFreightExpenseDTO implements IFreightExpense {
  expenseName: string;
  value: number;
  physicalCustomerOrderId?: string;
  legalClientOrderId?: string;
}
