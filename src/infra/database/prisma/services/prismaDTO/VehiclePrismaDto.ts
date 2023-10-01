import { type Vehicle as VehiclePrisma, type Prisma } from '@prisma/client';

import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
export class VehicleDto {
  public static PrismaToEntity(
    vehicle: VehiclePrisma,
  ): Omit<IVehicle, 'VehicleModel'> {
    return {
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      rntrc_expiration: vehicle.rntrc_expiration,
      created_at: vehicle.created_at,
      updated_at: vehicle.updated_at,
      created_by: vehicle.created_by,
      updated_by: vehicle.created_by,
    };
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
      model_id: vehicle.VehicleModel.id,
      update_by: vehicle.updated_by,
    };
  }

  public static EntityToPrismaUpdate(
    vehicle: IVehicle,
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
      model_id: vehicle.VehicleModel.id,
      update_by: vehicle.updated_by,
    };
  }
}
