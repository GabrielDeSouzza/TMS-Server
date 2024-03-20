import { type ICompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';

export abstract class UpdateCompletedOrdersDTO
  implements Partial<ICompletedOrders>
{
  total_distance?: number;
  total_spend_liters?: number;
  total_spending_money?: number;
  start_at?: Date;
  end_at?: Date;
  order_processing_number?: string;
  disconnect_legal_order?: string;
  disconnect_physical_customer_order?: string;
  vehicle_id?: string;
  updated_at?: Date;
  updated_by: string;
  physical_customer_order_id?: string;
  legal_customer_order_id?: string;
}
