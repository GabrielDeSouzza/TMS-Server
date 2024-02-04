import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

export abstract class WhereOutsourcedTransportCompanyContractTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  outSourcedTransportCompanyId?: StringFilterDTO;
  carrierCompanyId?: StringFilterDTO;
  legalClientOrderId?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_by?: StringFilterDTO;
  created_by?: StringFilterDTO;
}

export abstract class SortByOutsourcedTransportCompanyContractTypeDTO {
  id?: 'asc' | 'desc';
  outSourcedTransportCompanyId?: 'asc' | 'desc';
  carrierCompanyId?: 'asc' | 'desc';
  legalClientOrderId?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
}

export class FindAllOutsourcedTransportCompanyContractWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByOutsourcedTransportCompanyContractTypeDTO;
  where?: WhereOutsourcedTransportCompanyContractTypeDTO;
}
