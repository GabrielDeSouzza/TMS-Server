import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';

export abstract class CreatePhysicalCustomerQuoteTableDTO {
  kindService: string;
  formPayment: string;
  codQuote: string;
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
  nf_serie: string;
  nf_number: string;
}
