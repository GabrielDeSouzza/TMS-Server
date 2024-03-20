import { type ICompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';

export abstract class CreateCompletedOrdersDTO implements ICompletedOrders {
  id?: string;
  physical_customer_order_id?: string;
  legal_customer_order_id?: string;
  order_processing_number: string;
  total_distance: number;
  total_spend_liters: number;
  total_spending_money: number;
  start_at: Date;
  end_at: Date;
  vehicle_id: string;
  created_by: string;
  updated_by: string;
}
