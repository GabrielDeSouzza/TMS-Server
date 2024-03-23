import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export abstract class UpdateLegalClientQuoteTableDTO
  implements Partial<ILegalClientQuoteTable>
{
  id?: string;
  recipientId?: string;
  senderId?: string;
  who_pays?: string;
  postalCodOrigin?: string;
  postalCodDestiny?: string;
  typeMerchandise?: string;
  amount?: number;
  description?: string;
  mass?: number;
  volume?: number;
  nf_value?: number;
  updated_by: string;
}
