import {
  type Prisma,
  type LegalClient as LegalClientPrisma,
} from '@prisma/client';

import { LegalClient } from 'domain/entities/legalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

import { LegalPersonPrismaDTO } from './LegalPersonPrismaDto';

export class LegalClientPrismaDTO {
  public static PrismaToEntity(legalclientPrisma: LegalClientPrisma) {
    return new LegalClient({
      id: legalclientPrisma.id,
      branch: legalclientPrisma.branch,
      legal_person_id: legalclientPrisma.legal_person_id,
      updated_by: legalclientPrisma.updated_by,
      created_by: legalclientPrisma.created_by,
    });
  }
  public static EntityToCreatePrisma(
    legalClient: LegalClient,
    legalPerson?: LegalPerson,
    idLegalPerson?: string | '',
  ) {
    if (idLegalPerson) {
      return this.createLegalClientWithLegalPersonExist(
        legalClient,
        idLegalPerson,
      );
    }

    const legalClientPrisma: Prisma.LegalClientCreateInput = {
      branch: legalClient.branch,
      CreatedBy: { connect: { id: legalClient.created_by } },
      UpdatedBy: { connect: { id: legalClient.created_by } },
      LegalPerson: {
        create: LegalPersonPrismaDTO.EntityToCreatePrisma(legalPerson),
      },
    };

    return legalClientPrisma;
  }

  public static EntityToPrismaUpdate(
    legalclient?: LegalClient,
    legalPerson?: LegalPerson,
  ) {
    const legalclientUptade: Prisma.LegalClientUpdateInput = {
      branch: legalclient.branch,
      UpdatedBy: { connect: { id: legalclient.updated_by } },
      LegalPerson: {
        update: legalPerson
          ? LegalPersonPrismaDTO.EntityToPrismaUpdate(legalPerson)
          : undefined,
      },
    };

    return legalclientUptade;
  }

  private static createLegalClientWithLegalPersonExist(
    legalClient: LegalClient,
    legalPersonId: string,
  ) {
    const createLegalClient: Prisma.LegalClientCreateInput = {
      branch: legalClient.branch,
      CreatedBy: { connect: { id: legalClient.created_by } },
      UpdatedBy: { connect: { id: legalClient.updated_by } },
      LegalPerson: { connect: { id: legalPersonId } },
    };

    return createLegalClient;
  }
}
