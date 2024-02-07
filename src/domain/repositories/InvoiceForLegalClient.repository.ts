import { type GetInvoiceForLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetInvoiceForLegalClientDto';
import { type FindAllInvoiceForLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/InvoiceForLegalPeronRepositoryDto';
import { type InvoiceForLegalClient } from 'domain/entities/LegalClientEntities/InvoiceForLegalPerson/InvoiceForLegalPerson';

export abstract class InvoiceForLegalClientRepository {
  abstract findInvoiceForLegalClient(
    request: GetInvoiceForLegalClientDTO,
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
