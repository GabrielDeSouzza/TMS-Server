import {
  type Prisma,
  type CompanyVehicle as CompanyVehiclePrisma,
} from '@prisma/client';

import { type ICompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { CompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';

export class CompanyVehiclePrismaDTO {
  public static PrismaToEntity(CompanyVehiclePrisma: CompanyVehiclePrisma) {
    return new CompanyVehicle({
      id: CompanyVehiclePrisma.id,
      created_by: CompanyVehiclePrisma.created_by,
      updated_by: CompanyVehiclePrisma.updated_by,
      vehicle_id: CompanyVehiclePrisma.vehicle_id,
      created_at: CompanyVehiclePrisma.created_at,
      updated_at: CompanyVehiclePrisma.updated_at,
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
