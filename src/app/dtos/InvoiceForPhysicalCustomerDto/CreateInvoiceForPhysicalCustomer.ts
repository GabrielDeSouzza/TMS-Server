export abstract class CreateInvoiceForPhysicalCustomerDTO {
  emission_date: Date;

  invoice_number: string;

  carrierCompanyId: string;

  nature_invoice: string;

  invoice_total: number;

  form_payment: string;

  additional_data: string;

  digital_signature: string;

  invoice_taxes: number;

  physicalCustomerOrderId: string;

  created_by: string;

  updated_by: string;
}
