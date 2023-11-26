import {
  type Prisma,
  type LegalClient as LegalClientPrisma,
} from '@prisma/client';

import { LegalClient } from 'domain/entities/legalClientEntities/LegalClient/LegalClient';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

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
    const legalClientPrisma: Prisma.LegalClientCreateInput = {
      branch: legalClient.branch,
      CreatedBy: { connect: { id: legalClient.created_by } },
      UpdatedBy: { connect: { id: legalClient.created_by } },
      LegalPerson: {
        connectOrCreate: {
          where: { id: idLegalPerson },
          create: {
            address_number: legalPerson.address_number,
            city: legalPerson.city,
            cnpj: legalPerson.cnpj,
            corporate_name: legalPerson.corporate_name,
            email: legalPerson.email,
            fantasy_name: legalPerson.fantasy_name,
            first_phone: legalPerson.first_phone,
            neighborhood: legalPerson.neighborhood,
            public_place: legalPerson.public_place,
            state_registration: legalPerson.state_registration,
            uf: legalPerson.uf,
            complement: legalPerson.complement,
            second_phone: legalPerson.second_phone,
            third_phone: legalPerson.third_phone,
            created_at: legalPerson.created_at,
            updated_at: legalClient.updated_at,
          },
        },
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
          ? {
              address_number: legalPerson.address_number,
              city: legalPerson.city,
              cnpj: legalPerson.cnpj,
              corporate_name: legalPerson.corporate_name,
              email: legalPerson.email,
              fantasy_name: legalPerson.fantasy_name,
              first_phone: legalPerson.first_phone,
              neighborhood: legalPerson.neighborhood,
              public_place: legalPerson.public_place,
              state_registration: legalPerson.state_registration,
              uf: legalPerson.uf,
              complement: legalPerson.complement,
              second_phone: legalPerson.second_phone,
              third_phone: legalPerson.third_phone,
              updated_at: legalPerson.updated_at,
            }
          : undefined,
      },
    };

    return legalclientUptade;
  }
}
