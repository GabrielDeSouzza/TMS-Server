import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereMaintenanceCompanyTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  specialty_maintenance?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByMaintenanceCompanyTypeDTO {
  id?: 'asc' | 'desc';
  specialty_maintenance?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllMaintenanceCompanyWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByMaintenanceCompanyTypeDTO;
  where?: WhereMaintenanceCompanyTypeDTO;
}
