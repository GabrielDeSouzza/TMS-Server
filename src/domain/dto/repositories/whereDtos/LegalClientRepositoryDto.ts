import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereLegalClientTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  branch?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByLegalClientTypeDTO {
  id?: 'asc' | 'desc';
  branch?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllLegalClientWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByLegalClientTypeDTO;
  where?: WhereLegalClientTypeDTO;
}

export abstract class getLegalClientData {
  id?: string;
  cnpj?: string;
  fantasyName?: string;
  corporateName?: string;
}

export abstract class CountAllLegalClientsWhereRequestDTO {
  where?: WhereLegalClientTypeDTO;
}

export abstract class UpdateManyLegalClientsDTO {
  id: string;
  branch?: string;
  legal_person_id?: string;
  updated_at?: Date;
  created_at?: Date;
  updated_by?: string;
  created_by?: string;
}
