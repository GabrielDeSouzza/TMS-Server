import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereSenderTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  natural_person_id?: StringFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

export abstract class SortBySenderTypeDTO {
  id?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  natural_person_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllSenderWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortBySenderTypeDTO;
  where?: WhereSenderTypeDTO;
}

export abstract class CountAllSendersWhereRequestDTO {
  where?: WhereSenderTypeDTO;
}

export abstract class UpdateManySendersDTO {
  id: string;
  legal_person_id?: string;
  natural_person_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
}
