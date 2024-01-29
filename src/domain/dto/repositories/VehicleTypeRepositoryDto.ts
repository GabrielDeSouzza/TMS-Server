import { type BoolFilterDTO } from 'domain/shared/dtos/BoolFilterDto';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type RelationSortDto } from 'domain/shared/dtos/RelationSortDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereVehicleTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  bodyWork?: BoolFilterDTO;
  body_work_id?: StringFilterDTO[];
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByVehicleTypeDTO {
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  bodywork?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  VehicleModel?: RelationSortDto;
  VehicleTypeContainsBody?: RelationSortDto;
}

export class FindAllVehicleTypeWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleTypeDTO;
  where?: WhereVehicleTypeDTO;
}
