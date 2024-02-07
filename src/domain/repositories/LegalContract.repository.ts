import { type GetLegalContractDTO } from 'domain/dto/repositories/getDataDtos/GetLegalContractDto';
import { type FindAllLegalContractWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalContractRepositoryDto';
import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

export abstract class LegalContractRepository {
  abstract findLegalContract(
    request: GetLegalContractDTO,
  ): Promise<LegalContract>;
  abstract createLegalContract(
    legalContract: LegalContract,
  ): Promise<LegalContract>;
  abstract updateLegalContract(
    id: string,
    legalContract: LegalContract,
  ): Promise<LegalContract>;
  abstract getAllLegalContract(
    parameters: FindAllLegalContractWhereRequestDTO,
  ): Promise<LegalContract[]>;
}
