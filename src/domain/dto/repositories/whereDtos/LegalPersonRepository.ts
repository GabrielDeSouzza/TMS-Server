import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereLegalPersonTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  fantasy_name?: StringFilterDTO;
  cnpj?: StringFilterDTO;
  state_registration?: StringFilterDTO;
  corporate_name?: StringFilterDTO;
  public_place?: StringFilterDTO;
  address_number?: StringFilterDTO;
  neighborhood?: StringFilterDTO;
  complement?: StringFilterDTO;
  city?: StringFilterDTO;
  uf?: StringFilterDTO;
  first_phone?: StringFilterDTO;
  second_phone?: StringFilterDTO;
  third_phone?: StringFilterDTO;
  email?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
}

abstract class SortByLegalPersonTypeDTO {
  id?: 'asc' | 'desc';
  fantasy_name?: 'asc' | 'desc';
  cnpj?: 'asc' | 'desc';
  state_registration?: 'asc' | 'desc';
  corporate_name?: 'asc' | 'desc';
  public_place?: 'asc' | 'desc';
  address_number?: 'asc' | 'desc';
  neighborhood?: 'asc' | 'desc';
  complement?: 'asc' | 'desc';
  city?: 'asc' | 'desc';
  uf?: 'asc' | 'desc';
  first_phone?: 'asc' | 'desc';
  second_phone?: 'asc' | 'desc';
  third_phone?: 'asc' | 'desc';
  email?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
}

export class FindAllLegalPersonWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalPersonTypeDTO;
  where?: WhereLegalPersonTypeDTO;
}

export abstract class ValidateLegalPersonDTO {
  cnpj?: string;
  state_registration?: string;
  corporate_name?: string;
  fantasy_name?: string;
  id?: string;
}
