import { type BoolFilterDTO } from 'domain/shared/dtos/BoolFilterDto';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereOutsourcedDriverTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  natural_person_id?: StringFilterDTO;
  cnh?: StringFilterDTO;
  cnh_category?: StringFilterDTO;
  cnh_expiration?: DateTimeFilterDTO;
  company_vehicle?: BoolFilterDTO;
  course_mopp?: BoolFilterDTO;
  outsourced_vehicle_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByOutsourcedDriverTypeDTO {
  id?: 'asc' | 'desc';
  natural_person_id?: 'asc' | 'desc';
  cnh?: 'asc' | 'desc';
  cnh_category?: 'asc' | 'desc';
  cnh_expiration?: 'asc' | 'desc';
  company_vehicle?: 'asc' | 'desc';
  course_mopp?: 'asc' | 'desc';
  outsourced_vehicle_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllOutsourcedDriverWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedDriverTypeDTO;
  where?: WhereOutsourcedDriverTypeDTO;
}
