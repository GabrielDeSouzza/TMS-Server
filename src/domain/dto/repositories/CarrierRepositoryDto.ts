import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereCarrierCompanyTypeDto extends WhereDTO {
  id?: StringFilterDTO;
  legal_person_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByCarrierCompanyTypeDTO {
  id?: 'asc' | 'desc';
  legal_person_id?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
}

export abstract class FindAllWhereCarrierCompanyRequestType {
  limit: number;
  offset: number;
  sort?: SortByCarrierCompanyTypeDTO;
  where?: WhereCarrierCompanyTypeDto;
}

export abstract class getCarrierCompanyData {
  id?: string;
  cnpj?: string;
  fantasyName?: string;
  corporateName?: string;
}
