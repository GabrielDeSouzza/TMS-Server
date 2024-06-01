import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereOrderProcessingTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  total_distance?: NumberFilterDTO;
  total_spend_liters?: NumberFilterDTO;
  total_spending_money?: NumberFilterDTO;
  physical_customer_order_id?: StringFilterDTO[];
  legal_customer_order_id?: StringFilterDTO[];
  start_at?: DateTimeFilterDTO;
  end_at?: DateTimeFilterDTO;
  status?: StringFilterDTO;
  order_processing?: StringFilterDTO;
  vehicle_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
  driver_id?: StringFilterDTO;
}

export abstract class SortByOrderProcessingTypeDTO {
  id?: 'asc' | 'desc';
  total_distance?: 'asc' | 'desc';
  total_spend_liters?: 'asc' | 'desc';
  total_spending_money?: 'asc' | 'desc';
  start_at?: 'asc' | 'desc';
  end_at?: 'asc' | 'desc';
  status?: 'asc' | 'desc';
  order_processing?: 'asc' | 'desc';
  vehicle_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  driver_id?: 'asc' | 'desc';
}

export class FindAllOrderProcessingWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOrderProcessingTypeDTO;
  where?: WhereOrderProcessingTypeDTO;
}
export abstract class CountOrderProcessingRequestDTO {
  where?: WhereOrderProcessingTypeDTO;
}
