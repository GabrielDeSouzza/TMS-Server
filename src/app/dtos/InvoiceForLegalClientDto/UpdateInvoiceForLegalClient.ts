export abstract class UpdateInvoiceForLegalClientDTO {
  emission_date?: Date;

  invoice_number?: string;

  nature_invoice?: string;

  invoice_total?: number;

  form_payment?: string;

  additional_data?: string;

  digital_signature?: string;

  invoice_taxes?: number;

  legal_client_order_id?: string;

  updated_by: string;
}
