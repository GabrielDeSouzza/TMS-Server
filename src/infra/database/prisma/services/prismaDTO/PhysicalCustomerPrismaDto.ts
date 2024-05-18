import {
  type Prisma,
  type PhysicalCustomer as PhysicalCustomerPrisma,
} from '@prisma/client';

import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';

import { NaturalPersonPrismaDTO } from './NaturalPersonPrismaDto';

export class PhysicalCustomerPrismaDTO {
  public static PrismaToEntity(physicalCustomerPrisma: PhysicalCustomerPrisma) {
    if (!physicalCustomerPrisma) return null;

    return new PhysicalCustomer({
      created_by: physicalCustomerPrisma.created_by,
      natural_person_id: physicalCustomerPrisma.natural_person_id,
      updated_by: physicalCustomerPrisma.updated_by,
      branch: physicalCustomerPrisma.branch,
      created_at: physicalCustomerPrisma.created_at,
      updated_at: physicalCustomerPrisma.updated_at,
      id: physicalCustomerPrisma.id,
    });
  }
  public static EntityToCreatePrisma(
    physicalCustomer: PhysicalCustomer,
    naturalPerson: NaturalPerson,
  ) {
    console.log(physicalCustomer);
    console.log();
    const physicalCustomerPrisma: Prisma.PhysicalCustomerCreateInput = {
      branch: physicalCustomer.branch,
      NaturalPerson: this.naturalPersonQuery(
        naturalPerson,
        physicalCustomer.natural_person_id,
      ),
      CreatedBy: { connect: { id: physicalCustomer.created_by } },
      created_at: physicalCustomer.created_at,
      UpdatedBy: { connect: { id: physicalCustomer.updated_by } },
      updated_at: physicalCustomer.updated_at,
      id: physicalCustomer.id,
    };

    return physicalCustomerPrisma;
  }

  public static EntityToPrismaUpdate(
    physicalCustomer?: PhysicalCustomer,
    naturalPerson?: NaturalPerson,
  ) {
    const outsourcedDriverUptade: Prisma.PhysicalCustomerUpdateInput = {
      branch: physicalCustomer.branch,
      NaturalPerson: {
        update: naturalPerson
          ? NaturalPersonPrismaDTO.EntityToPrismaUpdate(naturalPerson)
          : undefined,
      },
      UpdatedBy: { connect: { id: physicalCustomer.updated_by } },
      updated_at: physicalCustomer.updated_at,
    };

    return outsourcedDriverUptade;
  }

  private static naturalPersonQuery(
    naturalPerson?: NaturalPerson,
    natualPersonId?: string,
  ) {
    if (!naturalPerson && !natualPersonId) return;
    const query: Prisma.NaturalPersonCreateNestedOneWithoutRecipientInput =
      naturalPerson
        ? { create: NaturalPersonPrismaDTO.EntityToPrisma(naturalPerson) }
        : { connect: { id: natualPersonId } };

    return query;
  }
}
