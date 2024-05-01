import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereRecipientTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  natural_person_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortByRecipientTypeDTO {
  id?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  natural_person_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export abstract class CountAllRecipientsWhereRequestDTO {
  where?: WhereRecipientTypeDTO;
}

export class FindAllRecipientWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByRecipientTypeDTO;
  where?: WhereRecipientTypeDTO;
}
