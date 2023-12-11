import { type InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

export abstract class InvoiceForLegalClientRepository {
  abstract findInvoiceForLegalClientById(
    id: string,
  ): Promise<InvoiceForLegalClient>;
  abstract createInvoiceForLegalClient(
    invoiceForLegalClient: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient>;
  abstract updateInvoiceForLegalClient(
    id: string,
    invoiceForLegalClient: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient>;
  abstract getAllInvoiceForLegalClient(): Promise<InvoiceForLegalClient[]>;
  abstract findInvoicesByOrder(
    legalClient: string,
  ): Promise<InvoiceForLegalClient[]>;
}
