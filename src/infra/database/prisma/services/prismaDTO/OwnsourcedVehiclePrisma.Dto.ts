import {
  type Prisma,
  type OutsourcedVehicle as OutsourcedVehiclePrisma,
} from '@prisma/client';

import { OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export class OutsourcedVehiclePrismaDTO {
  public static PrismaToEntity(
    outsourcedVehiclePrisma: OutsourcedVehiclePrisma,
  ) {
    if (!outsourcedVehiclePrisma) return null;

    return new OutsourcedVehicle({
      id: outsourcedVehiclePrisma.id,
      created_by: outsourcedVehiclePrisma.created_by,
      updated_by: outsourcedVehiclePrisma.updated_by,
      vehicle_id: outsourcedVehiclePrisma.vehicle_id,
      created_at: outsourcedVehiclePrisma.created_at,
      updated_at: outsourcedVehiclePrisma.updated_at,
    });
  }
  public static EntityToCreatePrisma(
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ) {
    const outsourcedVehiclePrisma: Prisma.OutsourcedVehicleCreateInput = {
      created_at: outsourcedVehicle.created_at,
      id: outsourcedVehicle.id,
      UpdatedBy: { connect: { id: outsourcedVehicle.updated_by } },
      CreatedBy: { connect: { id: outsourcedVehicle.created_by } },
      updated_at: outsourcedVehicle.updated_at,
      Vehicle: {
        create: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          antt: vehicle.antt,
          year: vehicle.year,
          Model: { connect: { id: vehicle.model_id } },
        },
      },
    };
    console.log(outsourcedVehiclePrisma);

    return outsourcedVehiclePrisma;
  }

  public static EntityToPrismaUpdate(
    outsourcedVehicle: OutsourcedVehicle,
    vehicle: Vehicle,
  ) {
    if (!outsourcedVehicle) {
      return null;
    }

    const outsourcedVehicleUptade: Prisma.OutsourcedVehicleUpdateInput = {
      created_at: outsourcedVehicle.created_at,
      updated_at: outsourcedVehicle.updated_at,
      UpdatedBy: { connect: { id: outsourcedVehicle.updated_by } },
      Vehicle: {
        update: {
          color: vehicle.color,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          antt: vehicle.antt,
          year: vehicle.year,
          model_id: vehicle.model_id,
        },
      },
    };

    return outsourcedVehicleUptade;
  }
}
