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

export abstract class ValidadeVehicle {
  plate?: string;
  renavam?: string;
}
