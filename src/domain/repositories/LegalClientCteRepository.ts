import { type GetLegalClientCteDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientCteDto';
import { type FindAllLegalClientCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientCteRepository';
import { type LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';

export abstract class LegalClientCteRepository {
  abstract findLegalClientCte(
    request: GetLegalClientCteDTO,
  ): Promise<LegalClientCte>;
  abstract createLegalClientCte(
    legalClientCte: LegalClientCte,
  ): Promise<LegalClientCte>;
  abstract updateLegalClientCte(
    id: string,
    legalClientCte: LegalClientCte,
  ): Promise<LegalClientCte>;
  abstract findAllLegalClientCtes(
    parameters: FindAllLegalClientCteWhereRequestDTO,
  ): Promise<LegalClientCte[]>;
}
