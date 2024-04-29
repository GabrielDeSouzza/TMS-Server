import { type GetLegalContractDTO } from 'domain/dto/repositories/getDataDtos/GetLegalContractDto';
import {
  type CountLegalContractRequestDTO,
  type FindAllLegalContractWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalContractRepositoryDto';
import { type LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

export abstract class LegalContractRepository {
  abstract countLegalContract(
    request: CountLegalContractRequestDTO,
  ): Promise<number>;
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
  abstract updateManyLegalContract(
    data: LegalContract[],
  ): Promise<LegalContract[]>;
  abstract deleteLegalContract(id: string): Promise<LegalContract>;
  abstract deleteManyLegalContract(ids: string[]): Promise<LegalContract[]>;
}
