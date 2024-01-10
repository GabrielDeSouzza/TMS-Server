import { type DateTimeFilterDTO } from 'domain/shared/dtos/DateTimeFilterDto';
import { type NumberFilterDTO } from 'domain/shared/dtos/NumberFilterDto';
import { type StringFilterDTO } from 'domain/shared/dtos/StringFilterDto';
import { WhereDTO } from 'domain/shared/dtos/WhereDto';

import { InvoiceForLegalClientWhereInput } from 'infra/graphql/prisma-generated/invoice-for-legal-client/invoice-for-legal-client-where.input';

abstract class WhereInvoiceForLegalClientTypeDTO extends WhereDTO {
  id?: StringFilterDTO;
  emission_date?: DateTimeFilterDTO;
  nature_invoice?: StringFilterDTO;
  invoice_total?: NumberFilterDTO;
  form_payment?: StringFilterDTO;
  additional_data?: StringFilterDTO;
  digital_signature?: StringFilterDTO;
  invoice_taxes?: NumberFilterDTO;
  legal_client_order_id?: StringFilterDTO;
  updated_at?: DateTimeFilterDTO;
  created_at?: DateTimeFilterDTO;
  created_by?: StringFilterDTO;
  updated_by?: StringFilterDTO;
}

abstract class SortByInvoiceForLegalClientTypeDTO {
  id?: 'asc' | 'desc';
  emission_date?: 'asc' | 'desc';
  nature_invoice?: 'asc' | 'desc';
  invoice_total?: 'asc' | 'desc';
  form_payment?: 'asc' | 'desc';
  additional_data?: 'asc' | 'desc';
  digital_signature?: 'asc' | 'desc';
  invoice_taxes?: 'asc' | 'desc';
  legal_client_order_id?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  created_by?: 'asc' | 'desc';
  updated_by?: 'asc' | 'desc';
}

export class FindAllInvoiceForLegalClientWhereRequestDTO {
  limit: number;
  offset: number;
  sort?: SortByInvoiceForLegalClientTypeDTO;
  where?: WhereInvoiceForLegalClientTypeDTO;
}

InvoiceForLegalClientWhereInput;
