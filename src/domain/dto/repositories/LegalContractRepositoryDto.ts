import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereLegalContractTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  contract_number?: StringFilterDTO;
  legal_client_id?: StringFilterDTO;
  carrier_company_id?: StringFilterDTO;
  observations?: StringFilterDTO;
  effective_date?: DateTimeFilterDTO;
  delivery_conditions?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByLegalContractTypeDTO {
  id?: 'asc' | 'desc';
  contract_number?: 'asc' | 'desc';
  legal_client_id?: 'asc' | 'desc';
  carrier_company_id?: 'asc' | 'desc';
  observations?: 'asc' | 'desc';
  effective_date?: 'asc' | 'desc';
  delivery_conditions?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllLegalContractWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalContractTypeDTO;
  where?: WhereLegalContractTypeDTO;
}
