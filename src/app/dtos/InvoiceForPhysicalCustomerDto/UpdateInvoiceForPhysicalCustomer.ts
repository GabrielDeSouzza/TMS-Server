import { type IInvoicePhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

export abstract class UpdateInvoiceForPhysicalCustomerDTO
  implements Partial<IInvoicePhysicalCustomer>
{
  emission_date?: Date;

  invoice_number?: string;

  nature_invoice?: string;

  invoice_total?: number;

  form_payment?: string;

  additional_data?: string;

  digital_signature?: string;

  invoice_taxes?: number;

  physicalCustomerId?: string;

  updated_by: string;
}
