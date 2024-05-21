import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';
import { type IPhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class CreatePhysicalCustomerQuoteTableDTO
  implements IPhysicalCustomerQuoteTable
{
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
}
