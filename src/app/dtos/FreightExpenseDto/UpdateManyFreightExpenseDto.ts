import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export abstract class UpdateManyFreightExpenseDTO
  implements Partial<IFreightExpense>
{
  id: string;
  expenseName?: string;
  value?: number;
}
