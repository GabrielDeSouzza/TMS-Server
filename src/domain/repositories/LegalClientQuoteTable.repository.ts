import { type GetLegalClientQuoteTableDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientQuoteTableDto';
import { type FindAllLegalClientQuoteTableWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientQuoteTableRepositoryDto';
import { type LegalClientQuoteTable } from 'domain/entities/QuoteTables/LegalClientQuoteTable/LegalClientQuoteTable';

export abstract class LegalClientQuoteTableRepository {
  abstract findLegalClientQuoteTable(
    request: GetLegalClientQuoteTableDTO,
  ): Promise<LegalClientQuoteTable>;
  abstract createLegalClientQuoteTable(
    legalClientQuoteTable: LegalClientQuoteTable,
  ): Promise<LegalClientQuoteTable>;
  abstract updateLegalClientQuoteTable(
    id: string,
    legalClientQuoteTable: LegalClientQuoteTable,
  ): Promise<LegalClientQuoteTable>;
  abstract findAllLegalClientQuoteTable(
    paraments: FindAllLegalClientQuoteTableWhereRequestDTO,
  ): Promise<LegalClientQuoteTable[]>;
}
