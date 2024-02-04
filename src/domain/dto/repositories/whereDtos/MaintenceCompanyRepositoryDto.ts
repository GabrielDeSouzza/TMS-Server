import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereMaintenanceCompanyTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  specialty_maintenance?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
}

export abstract class SortByMaintenanceCompanyTypeDTO {
  id?: 'asc' | 'desc';
  specialty_maintenance?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
}

export class FindAllMaintenanceCompanyWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByMaintenanceCompanyTypeDTO;
  where?: WhereMaintenanceCompanyTypeDTO;
}
