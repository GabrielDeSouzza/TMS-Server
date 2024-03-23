import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

abstract class WherePhysicalCustomerQuoteTableTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  cod_quote?: StringFilterDTO;
  recipient_id?: StringFilterDTO;
  sender_id?: StringFilterDTO;
  who_pays?: StringFilterDTO;
  postal_cod_origin?: StringFilterDTO;
  postal_cod_destiny?: StringFilterDTO;
  type_merchandise?: StringFilterDTO;
  amount?: NumberFilterDTO;
  description?: StringFilterDTO;
  mass?: NumberFilterDTO;
  volume?: NumberFilterDTO;
  nf_value?: NumberFilterDTO;
  created_at?: DateTimeFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

abstract class SortByPhysicalCustomerQuoteTableTypeDTO {
  id?: 'asc' | 'desc';
  cod_quote?: 'asc' | 'desc';
  recipient_id?: 'asc' | 'desc';
  senderId?: 'asc' | 'desc';
  who_pays?: 'asc' | 'desc';
  postal_cod_origin?: 'asc' | 'desc';
  postal_cod_destiny?: 'asc' | 'desc';
  type_merchandise?: 'asc' | 'desc';
  amount?: 'asc' | 'desc';
  description?: 'asc' | 'desc';
  mass?: 'asc' | 'desc';
  volume?: 'asc' | 'desc';
  nf_value?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllPhysicalCustomerQuoteTableWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByPhysicalCustomerQuoteTableTypeDTO;
  where?: WherePhysicalCustomerQuoteTableTypeDTO;
}
