export abstract class UpdateInvoiceForPhysicalCustomerDTO {
  emission_date?: Date;

  invoice_number?: string;

  nature_invoice?: string;

  invoice_total?: number;

  form_payment?: string;

  additional_data?: string;

  digital_signature?: string;

  carrierCompanyId?: string;

  invoice_taxes?: number;

  physicalCustomerOrderId?: string;

  updated_by: string;
}
