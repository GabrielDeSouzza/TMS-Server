import { type Prisma } from '@prisma/client';

import { type IContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';
import { ContractOutsourcedDriver } from 'domain/entities/driverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

export class ContractOutsourcedDriverPrismaDto {
  public static PrismaToEntity(
    contractOutsourcedDriver: IContractOutsourcedDriver,
  ) {
    return new ContractOutsourcedDriver({
      cpf: contractOutsourcedDriver.cpf,
      created_by: contractOutsourcedDriver.created_by,
      outsourced_driver_id: contractOutsourcedDriver.outsourced_driver_id,
      situation: contractOutsourcedDriver.situation,
      start_at: contractOutsourcedDriver.start_at,
      type: contractOutsourcedDriver.type,
      updated_by: contractOutsourcedDriver.updated_by,
      created_at: contractOutsourcedDriver.created_at,
      end_at: contractOutsourcedDriver.end_at,
      id: contractOutsourcedDriver.id,
      updated_at: contractOutsourcedDriver.updated_at,
    });
  }
  public static EntityToPrisma(
    contractOutsourcedDriver: IContractOutsourcedDriver,
  ) {
    const contractCreate: Prisma.ContractOutsourcedDriverUncheckedCreateWithoutOutsourcedDriverInput =
      {
        cpf: contractOutsourcedDriver.cpf,
        created_by: contractOutsourcedDriver.created_by,
        situation: contractOutsourcedDriver.situation,
        start_at: contractOutsourcedDriver.start_at,
        type: contractOutsourcedDriver.type,
        updated_by: contractOutsourcedDriver.updated_by,
        created_at: contractOutsourcedDriver.created_at,
        end_at: contractOutsourcedDriver.end_at,
        updated_at: contractOutsourcedDriver.updated_at,
      };

    return contractCreate;
  }
  public static EntityToPrismaUpdate(
    contractOutsourcedDriver: IContractOutsourcedDriver,
  ) {
    const contractCreate: Prisma.ContractOutsourcedDriverUncheckedUpdateWithoutOutsourcedDriverInput =
      {
        cpf: contractOutsourcedDriver.cpf,
        situation: contractOutsourcedDriver.situation,
        start_at: contractOutsourcedDriver.start_at,
        type: contractOutsourcedDriver.type,
        updated_by: contractOutsourcedDriver.updated_by,
        created_at: contractOutsourcedDriver.created_at,
        end_at: contractOutsourcedDriver.end_at,
        updated_at: contractOutsourcedDriver.updated_at,
      };

    return contractCreate;
  }
}
