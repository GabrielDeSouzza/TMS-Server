import {
  type Prisma,
  type MaintenanceCompany as MaintenanceCompanyPrisma,
} from '@prisma/client';

import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { MaintenanceCompany } from 'domain/entities/MaintenceEntities/MaintenanceCompany/MaintenanceCompany';

import { LegalPersonPrismaDTO } from './LegalPersonPrismaDto';

export class MaintenanceCompanyPrismaDTO {
  public static PrismaToEntity(
    maintenancecompanyPrisma: MaintenanceCompanyPrisma,
  ) {
    if (!maintenancecompanyPrisma) return null;

    return new MaintenanceCompany({
      id: maintenancecompanyPrisma.id,
      specialty_maintenance: maintenancecompanyPrisma.specialty_maintenance,
      legal_person_id: maintenancecompanyPrisma.legal_person_id,
      updated_by: maintenancecompanyPrisma.updated_by,
      created_by: maintenancecompanyPrisma.created_by,
    });
  }
  public static EntityToCreatePrisma(
    maintenanceCompany: MaintenanceCompany,
    legalPerson?: LegalPerson,
    idLegalPerson?: string,
  ) {
    if (idLegalPerson) {
      return this.createMaintenanceCompanyWithLegalPersonExist(
        maintenanceCompany,
        idLegalPerson,
      );
    }

    const maintenanceCompanyPrisma: Prisma.MaintenanceCompanyCreateInput = {
      specialty_maintenance: maintenanceCompany.specialty_maintenance,
      CreatedBy: { connect: { id: maintenanceCompany.created_by } },
      UpdatedBy: { connect: { id: maintenanceCompany.created_by } },
      LegalPerson: legalPerson
        ? {
            create: LegalPersonPrismaDTO.EntityToCreatePrisma(legalPerson),
          }
        : undefined,
    };

    return maintenanceCompanyPrisma;
  }

  public static EntityToPrismaUpdate(
    maintenancecompany?: MaintenanceCompany,
    legalPerson?: LegalPerson,
  ) {
    const maintenancecompanyUptade: Prisma.MaintenanceCompanyUpdateInput = {
      specialty_maintenance: maintenancecompany.specialty_maintenance,
      UpdatedBy: { connect: { id: maintenancecompany.updated_by } },
      LegalPerson: {
        update: legalPerson
          ? LegalPersonPrismaDTO.EntityToPrismaUpdate(legalPerson)
          : undefined,
      },
    };

    return maintenancecompanyUptade;
  }

  private static createMaintenanceCompanyWithLegalPersonExist(
    maintenanceCompany: MaintenanceCompany,
    legalPersonId: string,
  ) {
    const createMaintenanceCompany: Prisma.MaintenanceCompanyCreateInput = {
      specialty_maintenance: maintenanceCompany.specialty_maintenance,
      CreatedBy: { connect: { id: maintenanceCompany.created_by } },
      UpdatedBy: { connect: { id: maintenanceCompany.updated_by } },
      LegalPerson: { connect: { id: legalPersonId } },
    };

    return createMaintenanceCompany;
  }
}
