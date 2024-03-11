export abstract class UpdateOrderProcessingLegalClientDTO {
  total_distance?: number;
  total_spend_liters?: number;
  total_spending_money?: number;
  start_at?: Date;
  end_at?: Date;
  order_id?: string;
  vehicle_id?: string;
  updated_at?: Date;
  updated_by: string;
}
