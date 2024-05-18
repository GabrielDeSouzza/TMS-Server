import { type IExpense } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export abstract class UpdateManyPhysicalCustomerOrderDTO {
  id: string;
  physicalCustomerId?: string;
  total_shipping_cost?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  quote_table_id?: string;
  carrier_id?: string;
  expenses?: IExpense[];
}
