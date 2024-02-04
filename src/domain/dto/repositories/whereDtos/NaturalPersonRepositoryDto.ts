import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereNaturalPersonTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  name?: StringFilterDTO;
  date_birth?: DateTimeFilterDTO;
  gender?: StringFilterDTO;
  cpf?: StringFilterDTO;
  rg?: StringFilterDTO;
  cep?: StringFilterDTO;
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
  nationality?: StringFilterDTO;
}

export abstract class SortByNaturalPersonTypeDTO {
  id?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  date_birth?: 'asc' | 'desc';
  gender?: 'asc' | 'desc';
  cpf?: 'asc' | 'desc';
  rg?: 'asc' | 'desc';
  cep?: 'asc' | 'desc';
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
  nationality?: 'asc' | 'desc';
}

export class FindAllNaturalPersonWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByNaturalPersonTypeDTO;
  where?: WhereNaturalPersonTypeDTO;
}

export class ValidateNaturalPersonDto {
  cpf?: string;
  rg?: string;
  email?: string;
  id?: string;
}
