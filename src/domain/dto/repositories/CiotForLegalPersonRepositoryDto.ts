import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereCiotForLegalClientTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  ciot?: StringFilterDTO;
  emission_date?: DateTimeFilterDTO;
  legal_contract_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByCiotForLegalClientTypeDTO {
  id?: 'asc' | 'desc';
  ciot?: 'asc' | 'desc';
  emission_date?: 'asc' | 'desc';
  legal_contract_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllCiotForLegalClientWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByCiotForLegalClientTypeDTO;
  where?: WhereCiotForLegalClientTypeDTO;
}
