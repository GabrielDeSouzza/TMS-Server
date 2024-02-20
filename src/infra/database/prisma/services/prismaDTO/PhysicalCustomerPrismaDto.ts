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
    const physicalCustomerPrisma: Prisma.PhysicalCustomerCreateInput = {
      branch: physicalCustomer.branch,
      NaturalPerson: {
        create: NaturalPersonPrismaDTO.EntityToPrisma(naturalPerson),
      },
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

  /*private static createOrUpdateContract(contract: ContractOutsourcedDriver) {
    if (contract.id) {
      console.log(contract);
      const updateContract: Prisma.Enumerable<Prisma.ContractOutsourcedDriverUpdateWithWhereUniqueWithoutOutsourcedDriverInput> =
        {
          data: {
            cpf: contract.cpf,
            situation: contract.situation,
            start_at: contract.start_at,
            type: contract.type,
            created_at: contract.created_at,
            created_by: contract.created_by,
            end_at: contract.end_at,
            updated_by: contract.updated_by,
            updated_at: contract.updated_at,
          },
          where: { id: contract.id },
        };
      const queryPrisma: Prisma.ContractOutsourcedDriverUpdateManyWithoutOutsourcedDriverNestedInput =
        {
          update: updateContract,
        };

      return queryPrisma;
    } else {
      const createContract: Prisma.XOR<
        Prisma.Enumerable<Prisma.ContractOutsourcedDriverCreateWithoutOutsourcedDriverInput>,
        Prisma.Enumerable<Prisma.ContractOutsourcedDriverUncheckedCreateWithoutOutsourcedDriverInput>
      > = {
        contract_number: contract.contract_number,
        cpf: contract.cpf,
        situation: contract.situation,
        start_at: contract.start_at,
        type: contract.type,
        created_at: contract.created_at,
        created_by: contract.created_by,
        end_at: contract.end_at,
        updated_by: contract.updated_by,
        updated_at: contract.updated_at,
      };
      const queryPrisma: Prisma.ContractOutsourcedDriverUpdateManyWithoutOutsourcedDriverNestedInput =
        {
          create: createContract,
        };

      return queryPrisma;
    }
  }*/
}
