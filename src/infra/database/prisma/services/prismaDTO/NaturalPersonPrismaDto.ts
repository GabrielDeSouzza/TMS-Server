import {
  type Prisma,
  type NaturalPerson as NaturalPersonPrisma,
} from '@prisma/client';

import { NaturalPerson } from 'domain/entities/personEntities/naturalPerson/NaturalPerson';

export class NaturalPersonPrismaDTO {
  public static PrismaToEntity(naturalPersonPrisma: NaturalPersonPrisma) {
    return new NaturalPerson({
      address_number: naturalPersonPrisma.address_number,
      cep: naturalPersonPrisma.cep,
      city: naturalPersonPrisma.city,
      cpf: naturalPersonPrisma.cpf,
      date_birth: naturalPersonPrisma.date_birth,
      email: naturalPersonPrisma.email,
      first_phone: naturalPersonPrisma.first_phone,
      gender: naturalPersonPrisma.gender,
      name: naturalPersonPrisma.name,
      nationality: naturalPersonPrisma.nationality,
      neighborhood: naturalPersonPrisma.neighborhood,
      public_place: naturalPersonPrisma.public_place,
      rg: naturalPersonPrisma.rg,
      uf: naturalPersonPrisma.uf,
      complement: naturalPersonPrisma.complement,
      id: naturalPersonPrisma.id,
      second_phone: naturalPersonPrisma.second_phone,
      third_phone: naturalPersonPrisma.third_phone,
    });
  }
  public static EntityToPrisma(naturalPersonEntity: NaturalPerson) {
    const naturalPersonPrisma: NaturalPersonPrisma = {
      address_number: naturalPersonEntity.address_number,
      cep: naturalPersonEntity.cep,
      city: naturalPersonEntity.city,
      cpf: naturalPersonEntity.cpf,
      date_birth: naturalPersonEntity.date_birth,
      email: naturalPersonEntity.email,
      first_phone: naturalPersonEntity.first_phone,
      gender: naturalPersonEntity.gender,
      name: naturalPersonEntity.name,
      nationality: naturalPersonEntity.nationality,
      neighborhood: naturalPersonEntity.neighborhood,
      public_place: naturalPersonEntity.public_place,
      rg: naturalPersonEntity.rg,
      uf: naturalPersonEntity.uf,
      complement: naturalPersonEntity.complement,
      id: naturalPersonEntity.id,
      second_phone: naturalPersonEntity.second_phone,
      third_phone: naturalPersonEntity.third_phone,
    };

    return naturalPersonPrisma;
  }

  public static EntityToPrismaUpdate(naturalPersonEntity: NaturalPerson) {
    const naturalPersonUptade: Prisma.NaturalPersonUncheckedUpdateInput = {
      address_number: naturalPersonEntity.address_number,
      cep: naturalPersonEntity.cep,
      city: naturalPersonEntity.city,
      cpf: naturalPersonEntity.cpf,
      date_birth: naturalPersonEntity.date_birth,
      email: naturalPersonEntity.email,
      first_phone: naturalPersonEntity.first_phone,
      gender: naturalPersonEntity.gender,
      name: naturalPersonEntity.name,
      nationality: naturalPersonEntity.nationality,
      neighborhood: naturalPersonEntity.neighborhood,
      public_place: naturalPersonEntity.public_place,
      rg: naturalPersonEntity.rg,
      uf: naturalPersonEntity.uf,
      complement: naturalPersonEntity.complement,
      id: naturalPersonEntity.id,
      second_phone: naturalPersonEntity.second_phone,
      third_phone: naturalPersonEntity.third_phone,
    };

    return naturalPersonUptade;
  }
}
