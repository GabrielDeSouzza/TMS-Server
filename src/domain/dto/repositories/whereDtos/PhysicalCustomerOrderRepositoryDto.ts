import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WherePhysicalCustomerOrderTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  order?: StringFilterDTO;
  physical_contract_id?: StringFilterDTO;
  quote_table_id?: StringFilterDTO;
  carrier_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByPhysicalCustomerOrderTypeDTO {
  id?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
  physical_contract_id?: 'asc' | 'desc';
  quote_table_id?: 'asc' | 'desc';
  carrier_id?: 'asc' | 'desc';
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

export abstract class CountPhysicalCustomerOrderRequestDTO {
  where?: WherePhysicalCustomerOrderTypeDTO;
}
