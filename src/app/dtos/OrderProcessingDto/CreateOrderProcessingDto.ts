import { type IOrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';

export abstract class CreateOrderProcessingDTO implements IOrderProcessing {
  id?: string;
  physical_customer_order_ids?: string[];
  legal_customer_order_ids?: string[];
  order_processing_number: string;
  total_distance: number;
  total_spend_liters: number;
  total_spending_money: number;
  status: string;
  start_at: Date;
  end_at?: Date;
  vehicle_id: string;
  driver_id: string;
  created_by: string;
  updated_by: string;
}
