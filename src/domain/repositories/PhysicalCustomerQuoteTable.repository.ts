import { type GetPhysicalCustomerQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerQuoteTableDto';
import { type FindAllPhysicalCustomerQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerQuoteTableRepositoryDto';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class PhysicalCustomerQuoteTableRepository {
  abstract findPhysicalCustomerQuoteTable(
    request: GetPhysicalCustomerQuoteTableDTO,
  ): Promise<PhysicalCustomerQuoteTable>;
  abstract createPhysicalCustomerQuoteTable(
    physicalCustomerQuoteTable: PhysicalCustomerQuoteTable,
  ): Promise<PhysicalCustomerQuoteTable>;
  abstract updatePhysicalCustomerQuoteTable(
    id: string,
    physicalCustomerQuoteTable: PhysicalCustomerQuoteTable,
  ): Promise<PhysicalCustomerQuoteTable>;
  abstract findAllPhysicalCustomerQuoteTable(
    paraments: FindAllPhysicalCustomerQuoteTableWhereRequestDTO,
  ): Promise<PhysicalCustomerQuoteTable[]>;
}
