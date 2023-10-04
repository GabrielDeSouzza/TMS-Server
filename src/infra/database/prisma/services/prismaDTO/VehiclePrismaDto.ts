import { type Vehicle as VehiclePrisma, type Prisma } from '@prisma/client';

import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
import { Vehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
export class VehicleDto {
  public static PrismaToEntity(vehicle: VehiclePrisma): Vehicle {
    return new Vehicle({
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      rntrc_expiration: vehicle.rntrc_expiration,
      created_at: vehicle.created_at,
      updated_at: vehicle.updated_at,
      created_by: vehicle.created_by,
      updated_by: vehicle.created_by,
      id: vehicle.id,
      model_id: vehicle.model_id,
    });
  }

  public static EntityToPrisma(vehicle: IVehicle): VehiclePrisma {
    return {
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      rntrc_expiration: vehicle.rntrc_expiration,
      created_at: vehicle.created_at,
      updated_at: vehicle.updated_at,
      created_by: vehicle.created_by,
      id: vehicle.id,
      model_id: vehicle.model_id,
      update_by: vehicle.updated_by,
    };
  }

  public static EntityToPrismaUpdate(
    vehicle: Partial<Vehicle>,
  ): Prisma.VehicleUncheckedUpdateInput {
    return {
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      rntrc_expiration: vehicle.rntrc_expiration,
      created_at: vehicle.created_at,
      updated_at: vehicle.updated_at,
      created_by: vehicle.created_by,
      id: vehicle.id,
      model_id: vehicle.model_id,
      update_by: vehicle.updated_by,
    };
  }
}
