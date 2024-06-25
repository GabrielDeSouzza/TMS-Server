import { type IExpense } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export abstract class UpdatePhysicalCustomerOrderDTO {
  physicalCustomerId?: string;
  quote_table_id?: string;
  total_shipping_cost?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  updated_by?: string;
  carrier_id?: string;
  expenses?: IExpense[];
  deleted_expenses?: string[];
}
