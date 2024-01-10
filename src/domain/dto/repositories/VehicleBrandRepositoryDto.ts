import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereVehicleBrandTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByVehicleBrandTypeDTO {
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllVehicleBrandWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleBrandTypeDTO;
  where?: WhereVehicleBrandTypeDTO;
}
