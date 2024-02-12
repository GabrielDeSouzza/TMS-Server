import { type Prisma, type OwnDriver as OwnDriverPrisma } from '@prisma/client';

import { OwnDriver } from 'domain/entities/CompanyEntities/ownDriver/OwnDriver';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

export class OwnDriverPrismaDTO {
  public static PrismaToEntity(ownDriverPrisma: OwnDriverPrisma) {
    if (!ownDriverPrisma) return null;

    return new OwnDriver({
      id: ownDriverPrisma.id,
      cnh: ownDriverPrisma.cnh,
      cnh_category: ownDriverPrisma.cnh_category,
      cnh_expiration: ownDriverPrisma.cnh_expiration,
      company_vehicle: ownDriverPrisma.company_vehicle,
      course_mopp: ownDriverPrisma.course_mopp,
      created_by: ownDriverPrisma.created_by,
      natural_person_id: ownDriverPrisma.natural_person_id,
      updated_by: ownDriverPrisma.updated_by,
      created_at: ownDriverPrisma.created_at,
      updated_at: ownDriverPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    ownDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ) {
    const ownDriverPrisma: Prisma.OwnDriverCreateInput = {
      cnh: ownDriver.cnh,
      cnh_category: ownDriver.cnh_category,
      cnh_expiration: ownDriver.cnh_expiration,
      company_vehicle: ownDriver.company_vehicle,
      course_mopp: ownDriver.course_mopp,
      created_at: ownDriver.created_at,
      updated_at: ownDriver.updated_at,
      CreatedBy: { connect: { id: ownDriver.created_by } },
      UpdatedBy: { connect: { id: ownDriver.updated_by } },
      NaturalPerson: {
        create: {
          address_number: naturalPerson.address_number,
          cep: naturalPerson.cep,
          city: naturalPerson.city,
          complement: naturalPerson.complement,
          cpf: naturalPerson.cpf,
          date_birth: naturalPerson.date_birth,
          email: naturalPerson.email,
          first_phone: naturalPerson.first_phone,
          gender: naturalPerson.gender,
          name: naturalPerson.name,
          nationality: naturalPerson.nationality,
          neighborhood: naturalPerson.neighborhood,
          public_place: naturalPerson.public_place,
          rg: naturalPerson.rg,
          uf: naturalPerson.uf,
          second_phone: naturalPerson.second_phone,
          third_phone: naturalPerson.third_phone,
        },
      },
    };

    return ownDriverPrisma;
  }

  public static EntityToPrismaUpdate(
    ownDriver: OwnDriver,
    naturalPerson: NaturalPerson,
  ) {
    const ownDriverUptade: Prisma.OwnDriverUpdateInput = {
      cnh: ownDriver.cnh,
      cnh_category: ownDriver.cnh_category,
      cnh_expiration: ownDriver.cnh_expiration,
      company_vehicle: ownDriver.company_vehicle,
      course_mopp: ownDriver.course_mopp,
      created_at: ownDriver.created_at,
      updated_at: ownDriver.updated_at,
      UpdatedBy: { connect: { id: ownDriver.updated_by } },
      NaturalPerson: naturalPerson
        ? {
            update: {
              address_number: naturalPerson.address_number,
              cep: naturalPerson.cep,
              city: naturalPerson.city,
              complement: naturalPerson.complement,
              cpf: naturalPerson.cpf,
              date_birth: naturalPerson.date_birth,
              email: naturalPerson.email,
              first_phone: naturalPerson.first_phone,
              gender: naturalPerson.gender,
              name: naturalPerson.name,
              nationality: naturalPerson.nationality,
              neighborhood: naturalPerson.neighborhood,
              public_place: naturalPerson.public_place,
              rg: naturalPerson.rg,
              uf: naturalPerson.uf,
              second_phone: naturalPerson.second_phone,
              third_phone: naturalPerson.third_phone,
            },
          }
        : undefined,
    };

    return ownDriverUptade;
  }
}
