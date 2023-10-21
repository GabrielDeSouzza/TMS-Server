import {
  type Prisma,
  type CompanyVehicle as CompanyVehiclePrisma,
} from '@prisma/client';

import { type ICompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { CompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export class CompanyVehiclePrismaDTO {
  public static PrismaToEntity(companyVehiclePrisma: CompanyVehiclePrisma) {
    return new CompanyVehicle({
      id: companyVehiclePrisma.id,
      created_by: companyVehiclePrisma.created_by,
      updated_by: companyVehiclePrisma.updated_by,
      vehicle_id: companyVehiclePrisma.vehicle_id,
      created_at: companyVehiclePrisma.created_at,
      updated_at: companyVehiclePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    companyVehicle: ICompanyVehicle,
    vehicle: IVehicle,
  ) {
    const companyVehiclePrisma: Prisma.CompanyVehicleCreateInput = {
      created_at: companyVehicle.created_at,
      id: companyVehicle.id,
      UpdatedBy: { connect: { id: companyVehicle.updated_by } },
      CreatedBy: { connect: { id: companyVehicle.created_by } },
      updated_at: companyVehicle.updated_at,
      Vehicle: {
        create: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          rntrc_expiration: vehicle.rntrc_expiration,
          year: vehicle.year,
          Model: { connect: { id: vehicle.model_id } },
        },
      },
    };

    return companyVehiclePrisma;
  }

  public static EntityToPrismaUpdate(
    companyVehicle: Partial<ICompanyVehicle>,
    vehicle: Partial<IVehicle>,
  ) {
    const companyVehicleUptade: Prisma.CompanyVehicleUpdateInput = {
      created_at: companyVehicle.created_at,
      id: companyVehicle.id,
      updated_at: companyVehicle.updated_at,
      UpdatedBy: { connect: { id: companyVehicle.updated_by } },
      Vehicle: {
        update: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          rntrc_expiration: vehicle.rntrc_expiration,
          year: vehicle.year,
          model_id: vehicle.model_id,
        },
      },
    };

    return companyVehicleUptade;
  }
}
