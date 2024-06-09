import { type BoolFilterDTO } from 'domain/shared/dtos/BoolFilterDto';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereVehicleDTO extends WhereDTO {
  id?: StringFilterDTO;
  plate?: StringFilterDTO;
  year?: StringFilterDTO;
  color?: StringFilterDTO;
  renavam?: StringFilterDTO;
  antt?: StringFilterDTO;
  registration?: DateTimeFilterDTO;
  is_ipva_paid?: BoolFilterDTO;
  model_id?: StringFilterDTO;
}

export abstract class SortByVehicleDTO {
  id?: 'asc' | 'desc';
  plate?: 'asc' | 'desc';
  year?: 'asc' | 'desc';
  color?: 'asc' | 'desc';
  renavam?: 'asc' | 'desc';
  antt?: 'asc' | 'desc';
  registration?: 'asc' | 'desc';
  is_ipva_paid?: 'asc' | 'desc';
  model_id?: 'asc' | 'desc';
}

export class FindAllVehicleWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleDTO;
  where?: WhereVehicleDTO;
}
