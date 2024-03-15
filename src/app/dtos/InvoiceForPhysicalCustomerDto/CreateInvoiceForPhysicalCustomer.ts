import { type IInvoicePhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

export abstract class CreateInvoiceForPhysicalCustomerDTO
  implements IInvoicePhysicalCustomer
{
  physicalCustomerId: string;

  emission_date: Date;

  invoice_number: string;

  nature_invoice: string;

  invoice_total: number;

  form_payment: string;

  additional_data: string;

  digital_signature: string;

  invoice_taxes: number;

  created_by: string;

  updated_by: string;
}
