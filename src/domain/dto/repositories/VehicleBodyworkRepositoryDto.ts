import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereVehicleBodyworkTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  axles?: NumberFilterDTO;
  mass?: NumberFilterDTO;
  volume?: NumberFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

abstract class SortByVehicleBodyworkTypeDTO {
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  axles?: 'asc' | 'desc';
  mass?: 'asc' | 'desc';
  volume?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllVehicleBodyworkWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleBodyworkTypeDTO;
  where?: WhereVehicleBodyworkTypeDTO;
}
