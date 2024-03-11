export abstract class CreateOrderProcessingLegalClientDTO {
  total_distance: number;
  total_spend_liters: number;
  total_spending_money: number;
  start_at: Date;
  end_at?: Date;
  order_id: string;
  vehicle_id: string;
  created_by?: string;
  updated_by: string;
}
