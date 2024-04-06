import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereTypeOfMaintenanceTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  description?: StringFilterDTO;
  typeMaintenance?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByTypeOfMaintenanceTypeDTO {
  id?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  typeMaintenance?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllTypeOfMaintenanceWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByTypeOfMaintenanceTypeDTO;
  where?: WhereTypeOfMaintenanceTypeDTO;
}
