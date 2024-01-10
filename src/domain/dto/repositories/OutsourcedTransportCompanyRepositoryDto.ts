import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WhereOutsourcedTransportCompanyTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  legalPersonId?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

abstract class SortByOutsourcedTransportCompanyTypeDTO {
  id?: 'asc' | 'desc';
  legalPersonId?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllOutsourcedTransportCompanyWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedTransportCompanyTypeDTO;
  where?: WhereOutsourcedTransportCompanyTypeDTO;
}
