import { type AdressesType } from 'domain/entities/QuoteTables/AdressesType';
import { type IPhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class UpdatePhysicalCustomerQuoteTableDTO
  implements Partial<IPhysicalCustomerQuoteTable>
{
  recipientId?: string;
  kindService?: string;
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
  updated_by: string;
  icms_id?: string;
}
