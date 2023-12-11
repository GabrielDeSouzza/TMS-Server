import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

export abstract class LegalContractRepository {
  abstract findLegalContractById(
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
  abstract getAllLegalContract(): Promise<LegalContract[]>;
}
