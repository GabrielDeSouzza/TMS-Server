import { type Prisma } from '@prisma/client';

import { ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export class ContractOutsourcedDriverPrismaDto {
  public static PrismaToEntity(
    contractOutsourcedDriver: Prisma.ContractOutsourcedDriverUncheckedCreateInput,
  ) {
    if (!contractOutsourcedDriver) return null;

    return new ContractOutsourcedDriver({
      cpf: contractOutsourcedDriver.cpf,
      created_by: contractOutsourcedDriver.created_by,
      contract_number: contractOutsourcedDriver.contract_number,
      outsourced_driver_id: contractOutsourcedDriver.outsourced_driver_id,
      situation: contractOutsourcedDriver.situation,
      start_at: contractOutsourcedDriver.start_at as Date,
      type: contractOutsourcedDriver.type,
      updated_by: contractOutsourcedDriver.updated_by,
      created_at: contractOutsourcedDriver.created_at as Date,
      end_at: contractOutsourcedDriver.end_at as Date,
      id: contractOutsourcedDriver.id,
      updated_at: contractOutsourcedDriver.updated_at as Date,
    });
  }
  public static EntityCreateToPrisma(
    contractOutsourcedDriver: ContractOutsourcedDriver,
  ) {
    const contractCreate: Prisma.ContractOutsourcedDriverCreateInput = {
      cpf: contractOutsourcedDriver.cpf,
      contract_number: contractOutsourcedDriver.contract_number,
      CreatedBy: { connect: { id: contractOutsourcedDriver.created_by } },
      situation: contractOutsourcedDriver.situation,
      start_at: contractOutsourcedDriver.start_at,
      type: contractOutsourcedDriver.type,
      UpdatedBy: { connect: { id: contractOutsourcedDriver.updated_by } },
      created_at: contractOutsourcedDriver.created_at,
      end_at: contractOutsourcedDriver.end_at,
      updated_at: contractOutsourcedDriver.updated_at,
      id: contractOutsourcedDriver.id,
      OutsourcedDriver: {
        connect: { id: contractOutsourcedDriver.outsourced_driver_id },
      },
    };

    return contractCreate;
  }
  public static EntityToPrismaUpdate(
    contractOutsourcedDriver: ContractOutsourcedDriver,
  ) {
    const contractUpdate: Prisma.ContractOutsourcedDriverUpdateInput = {
      cpf: contractOutsourcedDriver.cpf,
      situation: contractOutsourcedDriver.situation,
      start_at: contractOutsourcedDriver.start_at,
      type: contractOutsourcedDriver.type,
      UpdatedBy: { connect: { id: contractOutsourcedDriver.updated_by } },
      created_at: contractOutsourcedDriver.created_at,
      end_at: contractOutsourcedDriver.end_at,
      updated_at: contractOutsourcedDriver.updated_at,
      OutsourcedDriver: {
        connect: { id: contractOutsourcedDriver.outsourced_driver_id },
      },
    };

    return contractUpdate;
  }
}
