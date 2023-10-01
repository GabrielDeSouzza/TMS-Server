import {
  type Prisma,
  type VehicleBodywork as VehicleBodyworkPrisma,
} from '@prisma/client';

import { type IVehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';
import { VehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

export class VehicleBodyworkPrismaDto {
  public static PrismaToEntity(
    vehicleBodyworkPrisma: VehicleBodyworkPrisma,
  ): VehicleBodywork {
    return new VehicleBodywork({
      axles: vehicleBodyworkPrisma.axles,
      mass: vehicleBodyworkPrisma.mass,
      name: vehicleBodyworkPrisma.name,
      volume: vehicleBodyworkPrisma.volume,
      created_at: vehicleBodyworkPrisma.created_at,
      updated_at: vehicleBodyworkPrisma.updated_at,
      created_by: vehicleBodyworkPrisma.created_by,
      updated_by: vehicleBodyworkPrisma.update_by,
      id: vehicleBodyworkPrisma.id,
    });
  }
  public static EntityToPrisma(
    vehicleBodywork: IVehicleBodywork,
  ): VehicleBodyworkPrisma {
    return {
      axles: vehicleBodywork.axles,
      created_at: vehicleBodywork.created_at,
      created_by: vehicleBodywork.created_by,
      id: vehicleBodywork.id,
      mass: vehicleBodywork.mass,
      name: vehicleBodywork.name,
      update_by: vehicleBodywork.updated_by,
      updated_at: vehicleBodywork.updated_at,
      volume: vehicleBodywork.volume,
    };
  }
  public static EntityToPrismaUpdate(
    vehicleBodywork: IVehicleBodywork,
  ): Prisma.VehicleBodyworkUncheckedUpdateInput {
    return {
      axles: vehicleBodywork.axles,
      created_at: vehicleBodywork.created_at,
      created_by: vehicleBodywork.created_by,
      id: vehicleBodywork.id,
      mass: vehicleBodywork.mass,
      name: vehicleBodywork.name,
      update_by: vehicleBodywork.updated_by,
      updated_at: vehicleBodywork.updated_at,
      volume: vehicleBodywork.volume,
    };
  }
}
