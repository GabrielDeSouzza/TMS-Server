import { type FindAllCiotForLegalClientWhereRequestDTO } from 'domain/dto/repositories/CiotForLegalPersonRepositoryDto';
import { type CiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';

export abstract class CiotForLegalClientRepository {
  abstract findCiotForLegalClientById(id: string): Promise<CiotForLegalClient>;
  abstract createCiotForLegalClient(
    ciotForLegalClient: CiotForLegalClient,
  ): Promise<CiotForLegalClient>;
  abstract updateCiotForLegalClient(
    id: string,
    ciotForLegalClient: CiotForLegalClient,
  ): Promise<CiotForLegalClient>;
  abstract getAllCiotForLegalClient(
    paraments: FindAllCiotForLegalClientWhereRequestDTO,
  ): Promise<CiotForLegalClient[]>;
  abstract fingCiotsByContract(
    idContract: string,
  ): Promise<CiotForLegalClient[]>;
}
