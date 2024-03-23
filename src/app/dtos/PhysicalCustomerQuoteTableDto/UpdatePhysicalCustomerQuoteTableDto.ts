import { type IPhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class UpdatePhysicalCustomerQuoteTableDTO
  implements Partial<IPhysicalCustomerQuoteTable>
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
