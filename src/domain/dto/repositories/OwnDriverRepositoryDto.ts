import { type BoolFilterDTO } from 'domain/shared/dtos/BoolFilterDto';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereOwnDriverTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  natural_person_id?: StringFilterDTO;
  cnh?: StringFilterDTO;
  cnh_category?: StringFilterDTO;
  company_vehicle?: BoolFilterDTO;
  course_mopp?: BoolFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByOwnDriverTypeDTO {
  id?: 'asc' | 'desc';
  natural_person_id?: 'asc' | 'desc';
  cnh?: 'asc' | 'desc';
  cnh_category?: 'asc' | 'desc';
  company_vehicle?: 'asc' | 'desc';
  course_mopp?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}
export class FindAllOwnDriverWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOwnDriverTypeDTO;
  where?: WhereOwnDriverTypeDTO;
}
