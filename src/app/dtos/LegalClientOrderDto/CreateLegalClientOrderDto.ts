import {
  type IExpense,
  type ILegalClientOrder,
} from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';

export abstract class CreateLegalClientOrderDTO implements ILegalClientOrder {
  carrier_id: string;
  quote_table_id: string;
  order: string;
  total_shipping_cost?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  legal_contract_id: string;
  created_by: string;
  updated_by: string;
  expenses?: IExpense[];
}
