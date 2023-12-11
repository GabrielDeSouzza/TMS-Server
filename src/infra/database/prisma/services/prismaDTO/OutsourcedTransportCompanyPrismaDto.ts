import {
  type Prisma,
  type OutsourcedTransportCompany as OutsourcedTransportCompanyPrisma,
} from '@prisma/client';

import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { OutsourcedTransportCompany } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompany/OutsourcedTransportCompany';

import { LegalPersonPrismaDTO } from './LegalPersonPrismaDto';

export class OutsourcedTransportCompanyPrismaDTO {
  public static PrismaToEntity(
    outsourcedTransportCompanyPrisma: OutsourcedTransportCompanyPrisma,
  ) {
    return new OutsourcedTransportCompany({
      created_by: outsourcedTransportCompanyPrisma.created_by,
      legalPersonId: outsourcedTransportCompanyPrisma.legal_person_id,
      updated_by: outsourcedTransportCompanyPrisma.updated_by,
      created_at: outsourcedTransportCompanyPrisma.created_at,
      id: outsourcedTransportCompanyPrisma.id,
      updated_at: outsourcedTransportCompanyPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson: LegalPerson,
    legalPersonId: string | '',
  ) {
    if (legalPersonId) {
      return this.connectLegalPersonExist(
        outsourcedTransportCompany,
        legalPersonId,
      );
    }

    const outsourcedTransportCompanyPrisma: Prisma.OutsourcedTransportCompanyCreateInput =
      {
        LegalPerson: {
          create: LegalPersonPrismaDTO.EntityToCreatePrisma(legalPerson),
        },
        UpdatedBy: { connect: { id: outsourcedTransportCompany.updated_by } },
        updated_at: outsourcedTransportCompany.updated_at,
        CreatedBy: { connect: { id: outsourcedTransportCompany.created_by } },
        created_at: outsourcedTransportCompany.created_at,
      };

    return outsourcedTransportCompanyPrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPerson: LegalPerson,
  ) {
    const outsourcedTransportCompanyUptade: Prisma.OutsourcedTransportCompanyUpdateInput =
      {
        LegalPerson: {
          update: LegalPersonPrismaDTO.EntityToPrismaUpdate(legalPerson),
        },
        UpdatedBy: { connect: { id: outsourcedTransportCompany.updated_by } },
        updated_at: outsourcedTransportCompany.updated_at,
      };

    return outsourcedTransportCompanyUptade;
  }
  private static connectLegalPersonExist(
    outsourcedTransportCompany: OutsourcedTransportCompany,
    legalPersonId: string,
  ) {
    const outsourcedTransportCompanyPrisma: Prisma.OutsourcedTransportCompanyCreateInput =
      {
        LegalPerson: { connect: { id: legalPersonId } },
        UpdatedBy: { connect: { id: outsourcedTransportCompany.updated_by } },
        updated_at: outsourcedTransportCompany.updated_at,
        CreatedBy: { connect: { id: outsourcedTransportCompany.created_by } },
        created_at: outsourcedTransportCompany.created_at,
      };

    return outsourcedTransportCompanyPrisma;
  }
}
