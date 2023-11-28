import {
  type Prisma,
  type CarrierCompany as CarrierCompanyPrisma,
} from '@prisma/client';

import { CarrierCompany } from 'domain/entities/legalPerson/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

export class CarrierCompanyPrismaDTO {
  public static PrismaToEntity(carriercompanyPrisma: CarrierCompanyPrisma) {
    return new CarrierCompany({
      legalPersonId: carriercompanyPrisma.legal_person_id,
      created_at: carriercompanyPrisma.created_at,
      id: carriercompanyPrisma.id,
      updated_at: carriercompanyPrisma.updated_at,
      created_by: carriercompanyPrisma.created_by,
      updated_by: carriercompanyPrisma.updated_by,
    });
  }
  public static EntityToCreatePrisma(
    carriercompany: CarrierCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ) {
    if (legalPersonId) {
      return CarrierCompanyPrismaDTO.createWithLegalPersonExistent(
        carriercompany,
        legalPersonId,
      );
    } else {
      const carriercompanyPrisma: Prisma.CarrierCompanyCreateInput = {
        created_at: carriercompany.created_at,
        updated_at: carriercompany.updated_at,
        CreatedBy: { connect: { id: carriercompany.created_by } },
        UpdatedBy: { connect: { id: carriercompany.updated_by } },
        LegalPerson: {
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
            created_at: legalPerson.created_at,
            second_phone: legalPerson.second_phone,
            third_phone: legalPerson.third_phone,
            updated_at: legalPerson.updated_at,
          },
        },
      };

      return carriercompanyPrisma;
    }
  }

  public static EntityToPrismaUpdate(
    carriercompany?: CarrierCompany,
    legalPerson?: LegalPerson,
  ) {
    const carriercompanyUptade: Prisma.CarrierCompanyUpdateInput = {
      updated_at: carriercompany.updated_at,
      UpdatedBy: { connect: { id: carriercompany.updated_by } },
      LegalPerson: {
        update: {
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
          created_at: legalPerson.created_at,
          second_phone: legalPerson.second_phone,
          third_phone: legalPerson.third_phone,
          updated_at: legalPerson.updated_at,
        },
      },
    };

    return carriercompanyUptade;
  }

  private static createWithLegalPersonExistent(
    carrierCompany: CarrierCompany,
    legalPersonId: string,
  ) {
    const carriercompanyUptade: Prisma.CarrierCompanyCreateInput = {
      updated_at: carrierCompany.updated_at,
      created_at: carrierCompany.created_at,
      CreatedBy: { connect: { id: carrierCompany.created_by } },
      UpdatedBy: { connect: { id: carrierCompany.updated_by } },
      LegalPerson: {
        connect: { id: legalPersonId },
      },
    };

    return carriercompanyUptade;
  }
}
