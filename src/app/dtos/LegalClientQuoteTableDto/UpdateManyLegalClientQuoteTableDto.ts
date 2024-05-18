import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';
import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export abstract class UpdateManyLegalClientQuoteTableDTO
  implements Partial<ILegalClientQuoteTable>
{
  id: string;
  recipientId?: string;
  kindService?: string;
  typeCte?: string;
  natureService?: string;
  formPayment?: string;
  senderId?: string;
  who_pays?: string;
  adressDestiny?: AdressesType;
  adressOrigin?: AdressesType;
  typeMerchandise?: string;
  amount?: number;
  description?: string;
  mass?: number;
  volume?: number;
  nf_value?: number;
  icms_id?: string;
}
