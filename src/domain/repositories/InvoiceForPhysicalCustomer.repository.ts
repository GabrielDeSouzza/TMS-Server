import { type GetInvoiceForPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetInvoiceForPhysicalCustomerDto';
import { type FindAllInvoiceForPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/InvoiceForPhysicalCustomer';
import { type InvoiceForPhysicalCustomer } from 'domain/entities/PhysicalClientEntities/invoiceForPhysicalCustomer/InvoiceForPhysicalCustomer';

export abstract class InvoiceForPhysicalCustomerRepository {
  abstract findInvoiceForPhysicalCustomer(
    request: GetInvoiceForPhysicalCustomerDTO,
  ): Promise<InvoiceForPhysicalCustomer>;
  abstract createInvoiceForPhysicalCustomer(
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ): Promise<InvoiceForPhysicalCustomer>;
  abstract updateInvoiceForPhysicalCustomer(
    id: string,
    invoiceForPhysicalCustomer: InvoiceForPhysicalCustomer,
  ): Promise<InvoiceForPhysicalCustomer>;
  abstract getAllInvoiceForPhysicalCustomer(
    parameters: FindAllInvoiceForPhysicalCustomerWhereRequestDTO,
  ): Promise<InvoiceForPhysicalCustomer[]>;
}
