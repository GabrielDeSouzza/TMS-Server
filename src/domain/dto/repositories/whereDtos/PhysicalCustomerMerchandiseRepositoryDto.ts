import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WherePhysicalCustomerMerchandiseTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  codMerchandise?: StringFilterDTO;
  amount?: NumberFilterDTO;
  description?: StringFilterDTO;
  mass?: NumberFilterDTO;
  volume?: NumberFilterDTO;
  value?: NumberFilterDTO;
  physicalCustomerOrdemId?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByPhysicalCustomerMerchandiseTypeDTO {
  id?: 'asc' | 'desc';
  codMerchandise?: 'asc' | 'desc';
  amount?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  mass?: 'asc' | 'desc';
  volume?: 'asc' | 'desc';
  value?: 'asc' | 'desc';
  physicalCustomerOrdemId?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllPhysicalCustomerMerchandiseWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerMerchandiseTypeDTO;
  where?: WherePhysicalCustomerMerchandiseTypeDTO;
}
