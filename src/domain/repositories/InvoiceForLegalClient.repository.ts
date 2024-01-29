import { type FindAllInvoiceForLegalClientWhereRequestDTO } from 'domain/dto/repositories/InvoiceForLegalPeronRepositoryDto';
import { type InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

export abstract class InvoiceForLegalClientRepository {
  abstract findInvoiceForLegalClientById(
    id: string,
    invoice_number: string,
  ): Promise<InvoiceForLegalClient>;
  abstract createInvoiceForLegalClient(
    invoiceForLegalClient: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient>;
  abstract updateInvoiceForLegalClient(
    id: string,
    invoiceForLegalClient: InvoiceForLegalClient,
  ): Promise<InvoiceForLegalClient>;
  abstract getAllInvoiceForLegalClient(
    parameters: FindAllInvoiceForLegalClientWhereRequestDTO,
  ): Promise<InvoiceForLegalClient[]>;
}
