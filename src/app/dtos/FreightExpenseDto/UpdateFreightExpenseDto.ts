import { type IFreightExpense } from 'domain/entities/OrdersEntities/FreightExpense/FreightExpense';

export abstract class UpdateFreightExpenseDTO
  implements Partial<IFreightExpense>
{
  expenseName?: string;
  value?: number;
  delFreigtExpenseFromOrder?: boolean;
}
