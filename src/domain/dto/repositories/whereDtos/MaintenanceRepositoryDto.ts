import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereMaintenanceTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  maintecance_company_id?: StringFilterDTO;
  type_of_maintenance_id?: StringFilterDTO;
  finished_at?: DateTimeFilterDTO;
  vehicle_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByMaintenanceTypeDTO {
  id?: 'asc' | 'desc';
  maintecance_company_id?: 'asc' | 'desc';
  type_of_maintenance_id?: 'asc' | 'desc';
  finished_at?: 'asc' | 'desc';
  vehicle_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllMaintenanceWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByMaintenanceTypeDTO;
  where?: WhereMaintenanceTypeDTO;
}
