import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WherePhysicalCustomerTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  branch?: StringFilterDTO;
  natural_person_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByPhysicalCustomerTypeDTO {
  id?: 'asc' | 'desc';
  branch?: 'asc' | 'desc';
  natural_person_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllPhysicalCustomerWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerTypeDTO;
  where?: WherePhysicalCustomerTypeDTO;
}

export abstract class CountAllPhysicalCustomersWhereRequestDTO {
  where?: WherePhysicalCustomerTypeDTO;
}

export abstract class UpdateManyPhysicalCustomersDTO {
  id: string;
  branch?: string;
  natural_person_id?: string;
  updated_at?: Date;
  created_at?: Date;
  created_by?: string;
  updated_by?: string;
}
