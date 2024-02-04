import {
  type getLegalClientData,
  type FindAllLegalClientWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientRepositoryDto';
import { type LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export abstract class LegalClientRepository {
  abstract findLegalClient(request: getLegalClientData): Promise<LegalClient>;
  abstract createLegalClient(
    legalClient: LegalClient,
    legalPerson: LegalPerson,
    idLegalPerson?: string,
  ): Promise<LegalClient>;
  abstract updateLegalClient(
    id: string,
    legalClient?: LegalClient,
    legalPerson?: LegalPerson,
  ): Promise<LegalClient>;
  abstract getAllLegalClient(
    parameters: FindAllLegalClientWhereRequestDTO,
  ): Promise<LegalClient[]>;
}
