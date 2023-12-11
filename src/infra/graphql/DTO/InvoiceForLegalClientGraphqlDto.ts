import { InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

import {
  type InvoiceForLegalClientInput,
  type InvoiceForLegalClientUpdateInput,
} from '../entities/InvoiceForLegalClientGraphql/InvoiceForLegalClient.input';

export class InvoiceForLegalClientGraphqlDTO {
  public static createInputToEntity(createInput: InvoiceForLegalClientInput) {
    return new InvoiceForLegalClient({
      additional_data: createInput.additional_data,
      created_by: createInput.created_by,
      digital_signature: createInput.digital_signature,
      emission_date: createInput.emission_date,
      form_payment: createInput.form_payment,
      invoice_taxes: createInput.invoice_taxes,
      invoice_total: createInput.invoice_total,
      legal_client_order_id: createInput.legal_client_order_id,
      nature_invoice: createInput.nature_invoice,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: InvoiceForLegalClientUpdateInput | undefined,
  ) {
    return updateInput
      ? new InvoiceForLegalClient({
          additional_data: updateInput.additional_data,
          created_by: updateInput.created_by,
          digital_signature: updateInput.digital_signature,
          emission_date: updateInput.emission_date,
          form_payment: updateInput.form_payment,
          invoice_taxes: updateInput.invoice_taxes,
          invoice_total: updateInput.invoice_total,
          legal_client_order_id: updateInput.legal_client_order_id,
          nature_invoice: updateInput.nature_invoice,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
