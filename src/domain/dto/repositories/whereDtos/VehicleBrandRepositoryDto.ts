import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereVehicleBrandTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByVehicleBrandTypeDTO {
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

export abstract class CountAllVehicleBrandsWhereRequestDTO {
  where?: WhereVehicleBrandTypeDTO;
}

export abstract class UpdateManyVehicleBrandsDTO {
  id: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string;
  created_by?: string;
}
