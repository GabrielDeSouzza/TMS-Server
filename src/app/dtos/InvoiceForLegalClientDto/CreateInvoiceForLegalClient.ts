export abstract class CreateInvoiceForLegalClientDTO {
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
