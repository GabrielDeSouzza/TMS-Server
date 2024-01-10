import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WherePhysicalCustomerOrderTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  order?: StringFilterDTO;
  physical_contract_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByPhysicalCustomerOrderTypeDTO {
  id?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
  physical_contract_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllPhysicalCustomerOrderWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerOrderTypeDTO;
  where?: WherePhysicalCustomerOrderTypeDTO;
}
