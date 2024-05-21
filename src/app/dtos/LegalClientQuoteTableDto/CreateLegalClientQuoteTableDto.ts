import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';
import { type ILegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export abstract class CreateLegalClientQuoteTableDTO
  implements ILegalClientQuoteTable
{
  id?: string;
  codQuote: string;
  kindService: string;
  formPayment: string;
  recipientId: string;
  senderId: string;
  who_pays: string;
  adressDestiny: AdressesType;
  adressOrigin: AdressesType;
  typeMerchandise: string;
  amount: number;
  description: string;
  mass: number;
  volume: number;
  nf_value: number;
  created_by: string;
  updated_by: string;
  icms_id?: string;
}
