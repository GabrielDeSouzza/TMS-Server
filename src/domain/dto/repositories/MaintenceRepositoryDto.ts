import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereMaintenanceTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  maintenance_company_cnpj?: StringFilterDTO;
  plate?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
}

export abstract class SortByMaintenanceTypeDTO {
  id?: 'asc' | 'desc';
  maintenance_company_cnpj?: 'asc' | 'desc';
  plate?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
}

export class FindAllMaintenanceWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByMaintenanceTypeDTO;
  where?: WhereMaintenanceTypeDTO;
}
