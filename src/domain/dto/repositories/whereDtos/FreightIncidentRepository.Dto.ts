import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereFreightIncidentTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  description?: StringFilterDTO;
  date_incident?: DateTimeFilterDTO;
  order_process_id?: StringFilterDTO;
  date_resolved?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
}

export abstract class SortByFreightIncidentTypeDTO {
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

export class FindAllFreightIncidentWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByFreightIncidentTypeDTO;
  where?: WhereFreightIncidentTypeDTO;
}
export abstract class CountFreightIncidentWhereRequestDTO {
  where?: WhereFreightIncidentTypeDTO;
}
