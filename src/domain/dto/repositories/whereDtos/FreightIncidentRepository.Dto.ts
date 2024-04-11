import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereIncidentTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  expense_name?: StringFilterDTO;
  value?: NumberFilterDTO;
  order_id?: StringFilterDTO;
}

export abstract class SortByIncidentTypeDTO {
  id?: 'asc' | 'desc';
  expense_name?: 'asc' | 'desc';
  value?: 'asc' | 'desc';
  order_id?: 'asc' | 'desc';
}

export class FindAllIncidentWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByIncidentTypeDTO;
  where?: WhereIncidentTypeDTO;
}
