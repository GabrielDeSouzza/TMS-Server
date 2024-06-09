import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereCompanyVehicleTypeDto extends WhereDTO {
  id?: StringFilterDTO;
  vehicle_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByCompanyVehicleTypeDto {
  id?: 'asc' | 'desc';
  vehicle_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllCompanyVehicleWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByCompanyVehicleTypeDto;
  where?: WhereCompanyVehicleTypeDto;
}

export abstract class CountAllCompanyVehiclesWhereRequestDTO {
  where?: WhereCompanyVehicleTypeDto;
}

export abstract class UpdateManyCompanyVehiclesDTO {
  id: string;
  vehicle_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
}

export abstract class ValidadeVehicle {
  id?: string;
  plate?: string;
  renavam?: string;
}
