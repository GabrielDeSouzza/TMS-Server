import {
  type Prisma,
  type CompanyVehicle as CompanyVehiclePrisma,
} from '@prisma/client';

import { CompanyVehicle } from 'domain/entities/CompanyEntities/companyVehicle/CompanyVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export class CompanyVehiclePrismaDTO {
  public static PrismaToEntity(companyVehiclePrisma: CompanyVehiclePrisma) {
    if (!companyVehiclePrisma) return null;

    return new CompanyVehicle({
      id: companyVehiclePrisma.id,
      created_by: companyVehiclePrisma.created_by,
      carrier_company_id: companyVehiclePrisma.company_id,
      updated_by: companyVehiclePrisma.updated_by,
      vehicle_id: companyVehiclePrisma.vehicle_id,
      created_at: companyVehiclePrisma.created_at,
      updated_at: companyVehiclePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    companyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ) {
    const companyVehiclePrisma: Prisma.CompanyVehicleCreateInput = {
      created_at: companyVehicle.created_at,
      id: companyVehicle.id,
      CarrierCompany: { connect: { id: companyVehicle.carrier_company_id } },
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
    companyVehicle: CompanyVehicle,
    vehicle: Vehicle,
  ) {
    const companyVehicleUptade: Prisma.CompanyVehicleUpdateInput = {
      created_at: companyVehicle.created_at,
      updated_at: companyVehicle.updated_at,
      UpdatedBy: { connect: { id: companyVehicle.updated_by } },
      Vehicle: vehicle
        ? {
            update: {
              color: vehicle.color,
              plate: vehicle.plate,
              renavam: vehicle.renavam,
              rntrc_expiration: vehicle.rntrc_expiration,
              year: vehicle.year,
              model_id: vehicle.model_id,
            },
          }
        : undefined,
    };

    return companyVehicleUptade;
  }
}
