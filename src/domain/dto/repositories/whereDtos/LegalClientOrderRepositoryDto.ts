import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereLegalClientOrderTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  order?: StringFilterDTO;
  legal_contract_id?: StringFilterDTO;
  quote_table_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByLegalClientOrderTypeDTO {
  id?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
  legal_contract_id?: 'asc' | 'desc';
  quote_table_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllLegalClientOrderWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientOrderTypeDTO;
  where?: WhereLegalClientOrderTypeDTO;
}
