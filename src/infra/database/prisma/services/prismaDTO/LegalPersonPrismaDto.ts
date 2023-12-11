import {
  type Prisma,
  type LegalPerson as LegalPersonPrisma,
} from '@prisma/client';

import { LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

export class LegalPersonPrismaDTO {
  public static PrismaToEntity(legalpersonPrisma: LegalPersonPrisma) {
    return new LegalPerson({
      fantasy_name: legalpersonPrisma.fantasy_name,
      cnpj: legalpersonPrisma.cnpj,
      state_registration: legalpersonPrisma.state_registration,
      corporate_name: legalpersonPrisma.corporate_name,
      public_place: legalpersonPrisma.public_place,
      address_number: legalpersonPrisma.address_number,
      neighborhood: legalpersonPrisma.neighborhood,
      complement: legalpersonPrisma.complement,
      city: legalpersonPrisma.city,
      uf: legalpersonPrisma.uf,
      first_phone: legalpersonPrisma.first_phone,
      second_phone: legalpersonPrisma.second_phone,
      third_phone: legalpersonPrisma.third_phone,
      email: legalpersonPrisma.email,
      created_at: legalpersonPrisma.created_at,
      updated_at: legalpersonPrisma.updated_at,
      id: legalpersonPrisma.id,
    });
  }
  public static EntityToCreatePrisma(legalperson: LegalPerson) {
    const legalpersonPrisma: Prisma.LegalPersonCreateInput = {
      fantasy_name: legalperson.fantasy_name,
      cnpj: legalperson.cnpj,
      state_registration: legalperson.state_registration,
      corporate_name: legalperson.corporate_name,
      public_place: legalperson.public_place,
      address_number: legalperson.address_number,
      neighborhood: legalperson.neighborhood,
      complement: legalperson.complement,
      city: legalperson.city,
      uf: legalperson.uf,
      first_phone: legalperson.first_phone,
      second_phone: legalperson.second_phone,
      third_phone: legalperson.third_phone,
      email: legalperson.email,
      created_at: legalperson.created_at,
      updated_at: legalperson.updated_at,
    };

    return legalpersonPrisma;
  }

  public static EntityToPrismaUpdate(legalperson: LegalPerson) {
    const legalpersonUptade: Prisma.LegalPersonUpdateInput = {
      fantasy_name: legalperson.fantasy_name,
      cnpj: legalperson.cnpj,
      state_registration: legalperson.state_registration,
      corporate_name: legalperson.corporate_name,
      public_place: legalperson.public_place,
      address_number: legalperson.address_number,
      neighborhood: legalperson.neighborhood,
      complement: legalperson.complement,
      city: legalperson.city,
      uf: legalperson.uf,
      first_phone: legalperson.first_phone,
      second_phone: legalperson.second_phone,
      third_phone: legalperson.third_phone,
      email: legalperson.email,
      updated_at: legalperson.updated_at,
    };

    return legalpersonUptade;
  }
}
