import { type FindAllLegalContractWhereRequestDTO } from 'domain/dto/repositories/LegalContractRepositoryDto';
import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

export abstract class LegalContractRepository {
  abstract findLegalContract(
    id?: string,
    contract_number?: string,
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
