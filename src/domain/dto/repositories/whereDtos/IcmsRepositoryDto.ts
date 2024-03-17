import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereIcmsTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  state_orgin?: StringFilterDTO;
  recipient_state?: StringFilterDTO;
  aliquot?: NumberFilterDTO;
  effective_date?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByIcmsTypeDTO {
  id?: 'asc' | 'desc';
  state_orgin?: 'asc' | 'desc';
  recipient_state?: 'asc' | 'desc';
  aliquot?: 'asc' | 'desc';
  effective_date?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllIcmsWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByIcmsTypeDTO;
  where?: WhereIcmsTypeDTO;
}
