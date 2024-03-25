import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WherePhysicalCustomerCteTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  order_id?: StringFilterDTO;
  access_key?: StringFilterDTO;
  type_cte?: StringFilterDTO;
  observations?: StringFilterDTO;
  cte_number?: StringFilterDTO;
}

export abstract class SortByPhysicalCustomerCteTypeDTO {
  id?: 'asc' | 'desc';
  order_id?: 'asc' | 'desc';
  access_key?: 'asc' | 'desc';
  type_cte?: 'asc' | 'desc';
  observations?: 'asc' | 'desc';
  cte_number?: 'asc' | 'desc';
}

export class FindAllPhysicalCustomerCteWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerCteTypeDTO;
  where?: WherePhysicalCustomerCteTypeDTO;
}
