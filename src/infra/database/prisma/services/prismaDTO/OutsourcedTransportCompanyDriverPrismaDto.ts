import {
  type Prisma,
  type OutsourcedTransportCompanyDriver as OutsourcedTransportCompanyDriverPrisma,
} from '@prisma/client';

import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

export class OutsourcedTransportCompanyDriverPrismaDTO {
  public static PrismaToEntity(
    outsourcedTransportCompanyDriverPrisma: OutsourcedTransportCompanyDriverPrisma,
  ) {
    return new OutsourcedTransportCompanyDriver({
      cnh: outsourcedTransportCompanyDriverPrisma.cnh,
      cnh_category: outsourcedTransportCompanyDriverPrisma.cnh_category,
      cnh_expiration: outsourcedTransportCompanyDriverPrisma.cnh_expiration,
      course_mopp: outsourcedTransportCompanyDriverPrisma.course_mopp,
      created_by: outsourcedTransportCompanyDriverPrisma.created_by,
      natural_person_id:
        outsourcedTransportCompanyDriverPrisma.natural_person_id,
      outsourced_transport_company_id:
        outsourcedTransportCompanyDriverPrisma.outsourced_transport_company_id,
      updated_by: outsourcedTransportCompanyDriverPrisma.updated_by,
      created_at: outsourcedTransportCompanyDriverPrisma.created_at,
      id: outsourcedTransportCompanyDriverPrisma.id,
      updated_at: outsourcedTransportCompanyDriverPrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedTransportCompanyDriver: OutsourcedTransportCompanyDriver,
    naturalPerson: NaturalPerson,
  ) {
    const outsourcedTransportCompanyDriverPrisma: Prisma.OutsourcedTransportCompanyDriverCreateInput =
      {
        cnh: outsourcedTransportCompanyDriver.cnh,
        cnh_category: outsourcedTransportCompanyDriver.cnh_category,
        cnh_expiration: outsourcedTransportCompanyDriver.cnh_expiration,
        course_mopp: outsourcedTransportCompanyDriver.course_mopp,
        created_at: outsourcedTransportCompanyDriver.created_at,
        id: outsourcedTransportCompanyDriver.id,
        updated_at: outsourcedTransportCompanyDriver.updated_at,
        CreatedBy: {
          connect: { id: outsourcedTransportCompanyDriver.created_by },
        },
        UpdatedBy: {
          connect: { id: outsourcedTransportCompanyDriver.updated_by },
        },
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
        OutsourcedTransportCompany: {
          connect: {
            id: outsourcedTransportCompanyDriver.outsourced_transport_company_id,
          },
        },
      };

    return outsourcedTransportCompanyDriverPrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedTransportCompanyDriver?: OutsourcedTransportCompanyDriver,
    naturalPerson?: NaturalPerson,
  ) {
    const outsourcedTransportCompanyDriverUptade: Prisma.OutsourcedTransportCompanyDriverUpdateInput =
      {
        cnh: outsourcedTransportCompanyDriver.cnh,
        cnh_category: outsourcedTransportCompanyDriver.cnh_category,
        cnh_expiration: outsourcedTransportCompanyDriver.cnh_expiration,
        course_mopp: outsourcedTransportCompanyDriver.course_mopp,
        id: outsourcedTransportCompanyDriver.id,
        updated_at: outsourcedTransportCompanyDriver.updated_at,
        UpdatedBy: {
          connect: { id: outsourcedTransportCompanyDriver.updated_by },
        },
        NaturalPerson: {
          update: {
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
        OutsourcedTransportCompany: {
          connect: {
            id: outsourcedTransportCompanyDriver.outsourced_transport_company_id,
          },
        },
      };

    return outsourcedTransportCompanyDriverUptade;
  }
}
