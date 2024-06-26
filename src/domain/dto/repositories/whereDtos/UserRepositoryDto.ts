import { type IUser } from 'domain/entities/User/User';
import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class UserWhereDTO extends WhereDTO {
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

export abstract class SortByAddressTypeDTO {
  id?: 'asc' | 'desc';
  active?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  role?: 'asc' | 'desc';
  username?: 'asc' | 'desc';
}

export abstract class FindAllUserWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByAddressTypeDTO;
  where?: UserWhereDTO;
}

export abstract class CountAllUserWhereRequestDTO {
  where?: UserWhereDTO;
}

export abstract class UpdateManyUsersDTO implements Partial<IUser> {
  id: string;
  name?: string;
  role?: string;
  email?: string;
  password?: string;
  username?: string;
  avatar_url?: string;
}
