import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereCiotForPhysicalCustomerTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  ciot?: StringFilterDTO;
  emission_date?: DateTimeFilterDTO;
  physical_contract_id?: StringFilterDTO;
  carrier_company_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

abstract class SortByCiotForPhysicalCustomerTypeDTO {
  id?: 'asc' | 'desc';
  ciot?: 'asc' | 'desc';
  emission_date?: 'asc' | 'desc';
  physical_contract_id?: 'asc' | 'desc';
  carrier_company_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllCiotForPhysicalCustomerWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByCiotForPhysicalCustomerTypeDTO;
  where?: WhereCiotForPhysicalCustomerTypeDTO;
}
