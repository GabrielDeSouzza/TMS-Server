import {
  type Prisma,
  type OutsourcedDriver as OutsourcedDriverPrisma,
} from '@prisma/client';

import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';

export class OutsourcedDriverPrismaDTO {
  public static PrismaToEntity(outsourcedDriverPrisma: OutsourcedDriverPrisma) {
    if (!outsourcedDriverPrisma) return null;

    return new OutsourcedDriver({
      id: outsourcedDriverPrisma.id,
      cnh: outsourcedDriverPrisma.cnh,
      cnh_category: outsourcedDriverPrisma.cnh_category,
      cnh_expiration: outsourcedDriverPrisma.cnh_expiration,
      company_vehicle_id: outsourcedDriverPrisma.company_vehicle_id,
      course_mopp: outsourcedDriverPrisma.course_mopp,
      created_by: outsourcedDriverPrisma.created_by,
      natural_person_id: outsourcedDriverPrisma.natural_person_id,
      updated_by: outsourcedDriverPrisma.updated_by,
      created_at: outsourcedDriverPrisma.created_at,
      updated_at: outsourcedDriverPrisma.updated_at,
      outsourced_vehicle_id: outsourcedDriverPrisma.outsourced_vehicle_id,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson: NaturalPerson,
  ) {
    const outsourcedDriverPrisma: Prisma.OutsourcedDriverCreateInput = {
      cnh: outsourcedDriver.cnh,
      cnh_category: outsourcedDriver.cnh_category,
      cnh_expiration: outsourcedDriver.cnh_expiration,
      NaturalPerson: {
        create: {
          address_number: naturalPerson.address_number,
          cep: naturalPerson.cep,
          city: naturalPerson.city,
          complement: naturalPerson.complement ?? '',
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
      CreatedBy: { connect: { id: outsourcedDriver.created_by } },
      created_at: outsourcedDriver.created_at,
      course_mopp: outsourcedDriver.course_mopp,
      UpdatedBy: { connect: { id: outsourcedDriver.updated_by } },
      updated_at: outsourcedDriver.updated_at,
      CompanyVehicle: outsourcedDriver.company_vehicle_id
        ? { connect: { id: outsourcedDriver.company_vehicle_id } }
        : undefined,
      OutsourcedVehicle: outsourcedDriver.outsourced_vehicle_id
        ? {
            connect: { id: outsourcedDriver.outsourced_vehicle_id },
          }
        : undefined,
    };

    return outsourcedDriverPrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedDriver: OutsourcedDriver,
    naturalPerson?: NaturalPerson,
  ) {
    const outsourcedDriverUptade: Prisma.OutsourcedDriverUpdateInput = {
      cnh: outsourcedDriver.cnh,
      cnh_category: outsourcedDriver.cnh_category,
      cnh_expiration: outsourcedDriver.cnh_expiration,
      NaturalPerson: naturalPerson
        ? {
            update: NaturalPersonPrismaDTO.EntityToPrismaUpdate(naturalPerson),
          }
        : undefined,
      course_mopp: outsourcedDriver.course_mopp,
      UpdatedBy: { connect: { id: outsourcedDriver.updated_by } },
      updated_at: outsourcedDriver.updated_at,
      CompanyVehicle: outsourcedDriver.company_vehicle_id
        ? { connect: { id: outsourcedDriver.company_vehicle_id } }
        : undefined,
      OutsourcedVehicle: outsourcedDriver.outsourced_vehicle_id
        ? {
            connect: { id: outsourcedDriver.outsourced_vehicle_id },
          }
        : undefined,
    };

    return outsourcedDriverUptade;
  }
}
