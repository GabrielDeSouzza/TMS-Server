import { type BoolFilterDTO } from 'domain/shared/dtos/BoolFilterDto';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereTypeOfMaintenanceTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  description?: StringFilterDTO;
  preventive?: BoolFilterDTO;
  corrective?: BoolFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
}

abstract class SortByTypeOfMaintenanceTypeDTO {
  id?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  preventive?: 'asc' | 'desc';
  corrective?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
}

export class FindAllTypeOfMaintenanceWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByTypeOfMaintenanceTypeDTO;
  where?: WhereTypeOfMaintenanceTypeDTO;
}
