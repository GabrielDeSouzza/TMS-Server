import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WherePhysicalContractTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  physical_customer_id?: StringFilterDTO;
  clause?: StringFilterDTO;
  observations?: StringFilterDTO;
}

abstract class SortByPhysicalContractTypeDTO {
  id?: 'asc' | 'desc';
  physical_customer_id?: 'asc' | 'desc';
  clause?: 'asc' | 'desc';
  observations?: 'asc' | 'desc';
}

export class FindAllPhysicalContractWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalContractTypeDTO;
  where?: WherePhysicalContractTypeDTO;
}
