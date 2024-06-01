import { type IOrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';

export abstract class UpdateOrderProcessingDTO
  implements Partial<IOrderProcessing>
{
  total_distance?: number;
  total_spend_liters?: number;
  total_spending_money?: number;
  start_at?: Date;
  end_at?: Date;
  status?: string;
  order_processing_number?: string;
  disconnect_legal_order?: string;
  disconnect_physical_customer_order?: string;
  vehicle_id?: string;
  updated_at?: Date;
  updated_by: string;
  driver_id?: string;
  physical_customer_order_ids?: string[];
  legal_customer_order_ids?: string[];
}
