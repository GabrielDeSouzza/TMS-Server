import { type Vehicle as VehiclePrisma, type Prisma } from '@prisma/client';

import { type IVehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
export class VehiclePrismaDto {
  public static PrismaToEntity(vehicle: VehiclePrisma): Vehicle {
    if (!vehicle) return null;

    return new Vehicle({
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      antt: vehicle.antt,
      id: vehicle.id,
      model_id: vehicle.model_id,
      isIpvaPaid: vehicle.is_ipva_paid,
      registration: vehicle.registration,
    });
  }

  public static EntityToPrisma(vehicle: IVehicle): VehiclePrisma {
    return {
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      antt: vehicle.antt,
      id: vehicle.id,
      model_id: vehicle.model_id,
      is_ipva_paid: vehicle.isIpvaPaid,
      registration: vehicle.registration,
    };
  }

  public static EntityToPrismaUpdate(
    vehicle: Vehicle,
  ): Prisma.VehicleUncheckedUpdateInput {
    return {
      plate: vehicle.plate,
      year: vehicle.year,
      color: vehicle.color,
      renavam: vehicle.renavam,
      antt: vehicle.antt,
      model_id: vehicle.model_id,
      is_ipva_paid: vehicle.isIpvaPaid,
      registration: vehicle.registration,
    };
  }
}
