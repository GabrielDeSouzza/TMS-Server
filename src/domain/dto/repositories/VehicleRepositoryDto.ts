import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereVehicleTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  plate?: StringFilterDTO;
  year?: StringFilterDTO;
  color?: StringFilterDTO;
  renavam?: StringFilterDTO;
  rntrc_expiration?: StringFilterDTO;
  model_id?: StringFilterDTO;
}

abstract class SortByVehicleTypeDTO {
  id?: 'asc' | 'desc';
  plate?: 'asc' | 'desc';
  year?: 'asc' | 'desc';
  color?: 'asc' | 'desc';
  renavam?: 'asc' | 'desc';
  rntrc_expiration?: 'asc' | 'desc';
  model_id?: 'asc' | 'desc';
}

export class FindAllVehicleWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByVehicleTypeDTO;
  where?: WhereVehicleTypeDTO;
}
