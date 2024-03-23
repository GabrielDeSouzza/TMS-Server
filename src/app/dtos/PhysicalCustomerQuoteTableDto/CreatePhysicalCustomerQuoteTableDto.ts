import { type IPhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class CreatePhysicalCustomerQuoteTableDTO
  implements IPhysicalCustomerQuoteTable
{
  id?: string;
  codQuote: string;
  recipientId: string;
  senderId: string;
  who_pays: string;
  postalCodOrigin: string;
  postalCodDestiny: string;
  typeMerchandise: string;
  amount: number;
  description: string;
  mass: number;
  volume: number;
  nf_value: number;
  created_by: string;
  updated_by: string;
}
