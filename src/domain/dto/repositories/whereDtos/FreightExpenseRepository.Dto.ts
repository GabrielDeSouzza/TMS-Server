import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereFreightExpenseTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  expense_name?: StringFilterDTO;
  value?: NumberFilterDTO;
  order_id?: StringFilterDTO;
  physical_customer_id?: StringFilterDTO;
  legal_client_order_id?: StringFilterDTO;
}

export abstract class SortByFreightExpenseTypeDTO {
  id?: 'asc' | 'desc';
  expense_name?: 'asc' | 'desc';
  value?: 'asc' | 'desc';
  order_id?: 'asc' | 'desc';
}

export class FindAllFreightExpenseWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByFreightExpenseTypeDTO;
  where?: WhereFreightExpenseTypeDTO;
}

export abstract class CountFreightExpenseRequestDTO {
  where?: WhereFreightExpenseTypeDTO;
}
