import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type SortOrderInputDTO } from 'domain/shared/dtos/SortOrderInputDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class UserWhereDTO extends WhereDTO {
  id?: StringFilterDTO;
  email?: StringFilterDTO;
  name?: StringFilterDTO;
  role?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  username?: StringFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByAddressTypeDTO {
  id?: 'asc' | 'desc';
  active?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  role?: 'asc' | 'desc';
  username?: 'asc' | 'desc';
  deleted_at?: SortOrderInputDTO;
}

export abstract class FindUserWhere {
  limit: number;
  offset: number;
  sort?: SortByAddressTypeDTO;
  where?: UserWhereDTO;
}
