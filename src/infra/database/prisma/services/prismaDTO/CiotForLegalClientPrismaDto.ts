import {
  type Prisma,
  type CiotForLegalClient as CiotForLegalClientPrisma,
} from '@prisma/client';

import { CiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';

export class CiotForLegalClientPrismaDTO {
  public static PrismaToEntity(
    ciotForLegalClientPrisma: CiotForLegalClientPrisma,
  ) {
    return new CiotForLegalClient({
      ciot: ciotForLegalClientPrisma.ciot,
      emission_date: ciotForLegalClientPrisma.emission_date,
      legal_contract_id: ciotForLegalClientPrisma.legal_contract_id,
      updated_by: ciotForLegalClientPrisma.updated_by,
      created_at: ciotForLegalClientPrisma.created_at,
      created_by: ciotForLegalClientPrisma.created_by,
      id: ciotForLegalClientPrisma.id,
      updated_at: ciotForLegalClientPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(ciotForLegalClient: CiotForLegalClient) {
    const ciotForLegalClientPrisma: Prisma.CiotForLegalClientCreateInput = {
      ciot: ciotForLegalClient.ciot,
      emission_date: ciotForLegalClient.emission_date,
      created_at: ciotForLegalClient.created_at,
      id: ciotForLegalClient.id,
      updated_at: ciotForLegalClient.updated_at,
      PhysycalContract: {
        connect: { id: ciotForLegalClient.legal_contract_id },
      },
      CreatedBy: { connect: { id: ciotForLegalClient.created_by } },
      UpdatedBy: { connect: { id: ciotForLegalClient.updated_by } },
    };

    return ciotForLegalClientPrisma;
  }

  public static EntityToPrismaUpdate(ciotForLegalClient: CiotForLegalClient) {
    const ciotForLegalClientUptade: Prisma.CiotForLegalClientUpdateInput = {
      ciot: ciotForLegalClient.ciot,
      emission_date: ciotForLegalClient.emission_date,

      id: ciotForLegalClient.id,
      updated_at: ciotForLegalClient.updated_at,
      PhysycalContract: {
        connect: { id: ciotForLegalClient.legal_contract_id },
      },
      UpdatedBy: { connect: { id: ciotForLegalClient.updated_by } },
    };

    return ciotForLegalClientUptade;
  }
}
