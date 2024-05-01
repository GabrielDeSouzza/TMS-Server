import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereVehicleModelTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  weight?: NumberFilterDTO;
  capacity_max?: NumberFilterDTO;
  axles?: NumberFilterDTO;
  capacity_per_axle?: NumberFilterDTO;
  brand_id?: StringFilterDTO;
  type_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByVehicleModelTypeDTO {
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  weight?: 'asc' | 'desc';
  capacity_max?: 'asc' | 'desc';
  axles?: 'asc' | 'desc';
  capacity_per_axle?: 'asc' | 'desc';
  brand_id?: 'asc' | 'desc';
  type_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllVehicleModelWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleModelTypeDTO;
  where?: WhereVehicleModelTypeDTO;
}

export abstract class CountAllVehicleModelsWhereRequestDTO {
  where?: WhereVehicleModelTypeDTO;
}

export abstract class UpdateManyVehicleModelsDTO {
  id: string;
  name?: string;
  weight?: number;
  capacity_max?: number;
  axles?: number;
  capacity_per_axle?: number;
  brand_id?: string;
  type_id?: string;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
}
