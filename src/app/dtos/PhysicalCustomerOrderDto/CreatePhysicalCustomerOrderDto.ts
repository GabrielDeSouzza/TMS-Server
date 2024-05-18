import { type IExpense } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { type IPhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';

export abstract class CreatePhysicalCustomerOrderDTO
  implements IPhysicalCustomerOrder
{
  order: string;
  quote_table_id: string;
  physicalCustomerId: string;
  carrier_id: string;
  total_shipping_cost?: number;
  total_receivable?: number;
  total_tax_payable?: number;
  created_by: string;
  expenses?: IExpense[];
  updated_by: string;
}
