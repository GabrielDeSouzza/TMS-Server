import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereFreightExpenseTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  description?: string;
  date_incident?: Date;
  order_process_id?: string;
  date_resolved?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
}

export abstract class SortByFreightExpenseTypeDTO {
  id?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  date_incident?: 'asc' | 'desc';
  order_process_id?: 'asc' | 'desc';
  date_resolved?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
}

export class FindAllFreightExpenseWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByFreightExpenseTypeDTO;
  where?: WhereFreightExpenseTypeDTO;
}
export abstract class CountAllFreightExpenseWhereRequestDTO {
  where?: WhereFreightExpenseTypeDTO;
}
