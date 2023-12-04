import {
  type Prisma,
  type InvoiceForLegalClient as InvoiceForLegalClientPrisma,
} from '@prisma/client';

import { InvoiceForLegalClient } from 'domain/entities/legalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

export class InvoiceForLegalClientPrismaDTO {
  public static PrismaToEntity(
    invoiceForLegalClientPrisma: InvoiceForLegalClientPrisma,
  ) {
    return new InvoiceForLegalClient({
      additional_data: invoiceForLegalClientPrisma.additional_data,
      created_by: invoiceForLegalClientPrisma.created_by,
      digital_signature: invoiceForLegalClientPrisma.digital_signature,
      emission_date: invoiceForLegalClientPrisma.emission_date,
      form_payment: invoiceForLegalClientPrisma.form_payment,
      invoice_taxes: invoiceForLegalClientPrisma.invoice_taxes,
      invoice_total: invoiceForLegalClientPrisma.invoice_total,
      legal_client_order_id: invoiceForLegalClientPrisma.legalClientrOrderId,
      nature_invoice: invoiceForLegalClientPrisma.nature_invoice,
      updated_by: invoiceForLegalClientPrisma.updated_by,
      created_at: invoiceForLegalClientPrisma.created_at,
      id: invoiceForLegalClientPrisma.id,
      updated_at: invoiceForLegalClientPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    invoiceForLegalClient: InvoiceForLegalClient,
  ) {
    const invoiceForLegalClientPrisma: Prisma.InvoiceForLegalClientCreateInput =
      {
        additional_data: invoiceForLegalClient.additional_data,
        CreatedBy: { connect: { id: invoiceForLegalClient.created_by } },
        digital_signature: invoiceForLegalClient.digital_signature,
        form_payment: invoiceForLegalClient.form_payment,
        invoice_taxes: invoiceForLegalClient.invoice_taxes,
        invoice_total: invoiceForLegalClient.invoice_total,
        LegalClientOrder: {
          connect: { id: invoiceForLegalClient.legalClientOrderId },
        },
        nature_invoice: invoiceForLegalClient.nature_invoice,
        UpdatedBy: { connect: { id: invoiceForLegalClient.updated_by } },
        created_at: invoiceForLegalClient.created_at,
        emission_date: invoiceForLegalClient.emission_date,
        updated_at: invoiceForLegalClient.updated_at,
        id: invoiceForLegalClient.id,
      };

    return invoiceForLegalClientPrisma;
  }

  public static EntityToPrismaUpdate(
    invoiceForLegalClient: InvoiceForLegalClient,
  ) {
    const invoiceForLegalClientUptade: Prisma.InvoiceForLegalClientUpdateInput =
      {
        additional_data: invoiceForLegalClient.additional_data,
        digital_signature: invoiceForLegalClient.digital_signature,
        form_payment: invoiceForLegalClient.form_payment,
        invoice_taxes: invoiceForLegalClient.invoice_taxes,
        invoice_total: invoiceForLegalClient.invoice_total,
        LegalClientOrder: {
          connect: { id: invoiceForLegalClient.legalClientOrderId },
        },
        nature_invoice: invoiceForLegalClient.nature_invoice,
        UpdatedBy: { connect: { id: invoiceForLegalClient.updated_by } },
        emission_date: invoiceForLegalClient.emission_date,
        updated_at: invoiceForLegalClient.updated_at,
        id: invoiceForLegalClient.id,
      };

    return invoiceForLegalClientUptade;
  }
}
