import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereOutsourcedTransportVehicleTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  vehicle_id?: StringFilterDTO;
  outsourced_company_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

abstract class SortByOutsourcedTransportVehicleTypeDTO {
  id?: 'asc' | 'desc';
  vehicle_id?: 'asc' | 'desc';
  outsourced_company_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllOutsourcedTransportVehicleWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedTransportVehicleTypeDTO;
  where?: WhereOutsourcedTransportVehicleTypeDTO;
}
