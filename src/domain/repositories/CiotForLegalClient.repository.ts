import {
  type validadeCiotForLegalPersonDTO,
  type FindAllCiotForLegalClientWhereRequestDTO,
} from 'domain/dto/repositories/CiotForLegalPersonRepositoryDto';
import { type CiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';

export abstract class CiotForLegalClientRepository {
  abstract findCiotForLegalClient(
    id?: string,
    ciot?: string,
  ): Promise<CiotForLegalClient>;
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

  abstract validadeCiot(
    data: validadeCiotForLegalPersonDTO,
  ): Promise<CiotForLegalClient | null>;
}
