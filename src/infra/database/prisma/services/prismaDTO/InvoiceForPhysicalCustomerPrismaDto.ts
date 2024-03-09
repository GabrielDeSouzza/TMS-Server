import {
  type Prisma,
  type InvoiceForPhysicalCustomer as InvoiceForPhysicalCustomerPrisma,
} from '@prisma/client';

import { InvoiceForPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

export class InvoiceForPhysicalCustomerPrismaDTO {
  public static PrismaToEntity(
    invoiceForPhysicalCustomerPrisma: InvoiceForPhysicalCustomerPrisma,
  ) {
    if (!invoiceForPhysicalCustomerPrisma) return null;

    return new InvoiceForPhysicalCustomer({
      invoice_number: invoiceForPhysicalCustomerPrisma.invoice_number,
      additional_data: invoiceForPhysicalCustomerPrisma.additional_data,
      created_by: invoiceForPhysicalCustomerPrisma.created_by,
      digital_signature: invoiceForPhysicalCustomerPrisma.digital_signature,
      emission_date: invoiceForPhysicalCustomerPrisma.emission_date,
      form_payment: invoiceForPhysicalCustomerPrisma.form_payment,
      invoice_taxes: invoiceForPhysicalCustomerPrisma.invoice_taxes,
      invoice_total: invoiceForPhysicalCustomerPrisma.invoice_total,
      physicalCustomerOrderId:
        invoiceForPhysicalCustomerPrisma.physicalCustomerOrderId,
      nature_invoice: invoiceForPhysicalCustomerPrisma.nature_invoice,
      updated_by: invoiceForPhysicalCustomerPrisma.updated_by,
      created_at: invoiceForPhysicalCustomerPrisma.created_at,
      id: invoiceForPhysicalCustomerPrisma.id,
      updated_at: invoiceForPhysicalCustomerPrisma.updated_at,
      carrierCompanyId: invoiceForPhysicalCustomerPrisma.carrierCompanyId,
    });
  }
  public static EntityToCreatePrisma(
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ) {
    const invoiceForPhysicalCustomerPrisma: Prisma.InvoiceForPhysicalCustomerCreateInput =
      {
        invoice_number: invoiceForPhysicalCustomer.invoice_number,
        additional_data: invoiceForPhysicalCustomer.additional_data,
        CreatedBy: { connect: { id: invoiceForPhysicalCustomer.created_by } },
        digital_signature: invoiceForPhysicalCustomer.digital_signature,
        form_payment: invoiceForPhysicalCustomer.form_payment,
        invoice_taxes: invoiceForPhysicalCustomer.invoice_taxes,
        invoice_total: invoiceForPhysicalCustomer.invoice_total,
        PhysicalCustomerOrder: {
          connect: { id: invoiceForPhysicalCustomer.physicalCustomerOrderId },
        },
        CarrierCompany: {
          connect: { id: invoiceForPhysicalCustomer.carrierCompanyId },
        },
        nature_invoice: invoiceForPhysicalCustomer.nature_invoice,
        UpdatedBy: { connect: { id: invoiceForPhysicalCustomer.updated_by } },
        created_at: invoiceForPhysicalCustomer.created_at,
        emission_date: invoiceForPhysicalCustomer.emission_date,
        updated_at: invoiceForPhysicalCustomer.updated_at,
      };

    return invoiceForPhysicalCustomerPrisma;
  }

  public static EntityToPrismaUpdate(
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ) {
    const invoiceForPhysicalCustomerUptade: Prisma.InvoiceForPhysicalCustomerUpdateInput =
      {
        additional_data: invoiceForPhysicalCustomer.additional_data,
        digital_signature: invoiceForPhysicalCustomer.digital_signature,
        form_payment: invoiceForPhysicalCustomer.form_payment,
        invoice_taxes: invoiceForPhysicalCustomer.invoice_taxes,
        invoice_total: invoiceForPhysicalCustomer.invoice_total,
        PhysicalCustomerOrder:
          invoiceForPhysicalCustomer.physicalCustomerOrderId
            ? {
                connect: {
                  id: invoiceForPhysicalCustomer.physicalCustomerOrderId,
                },
              }
            : undefined,
        nature_invoice: invoiceForPhysicalCustomer.nature_invoice,
        UpdatedBy: { connect: { id: invoiceForPhysicalCustomer.updated_by } },
        emission_date: invoiceForPhysicalCustomer.emission_date,
        updated_at: invoiceForPhysicalCustomer.updated_at,
        CarrierCompany: invoiceForPhysicalCustomer.carrierCompanyId
          ? { connect: { id: invoiceForPhysicalCustomer.carrierCompanyId } }
          : undefined,
      };

    return invoiceForPhysicalCustomerUptade;
  }
}
