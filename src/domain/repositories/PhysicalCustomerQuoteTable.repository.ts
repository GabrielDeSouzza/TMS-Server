import { type GetPhysicalCustomerQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerQuoteTableDto';
import { type FindAllPhysicalCustomerQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerQuoteTableRepositoryDto';
import { type CountAllPhysicalCustomersWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
import { type PhysicalCustomerQuoteTable } from 'domain/entities/QuoteTables/PhysicalCustomerQuoteTable/PhysicalCustomerQuoteTable';

export abstract class PhysicalCustomerQuoteTableRepository {
  abstract count(
    parameters: CountAllPhysicalCustomersWhereRequestDTO,
  ): Promise<number>;
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

  abstract updateManyPhysicalCustomerQuoteTable(
    data: PhysicalCustomerQuoteTable[],
  ): Promise<PhysicalCustomerQuoteTable[]>;
  abstract deletePhysicalCustomerQuoteTable(
    id: string,
  ): Promise<PhysicalCustomerQuoteTable>;
  abstract deleteManyPhysicalCustomerQuoteTable(
    ids: string[],
  ): Promise<PhysicalCustomerQuoteTable[]>;
}
