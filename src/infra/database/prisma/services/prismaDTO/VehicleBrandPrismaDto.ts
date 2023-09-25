import {
  type VehicleBrand as VehicleBrandPrisma,
  type Prisma,
} from '@prisma/client';

import { type IVehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

export class VehicleBrandPrismaDTO {
  public static PrismaVehicleBrandToVehicleBrandEntity(
    vehicleBrandPrisma: VehicleBrandPrisma,
  ): IVehicleBrand {
    return {
      id: vehicleBrandPrisma.id,
      name: vehicleBrandPrisma.name,
      created_at: vehicleBrandPrisma.created_at,
      updated_at: vehicleBrandPrisma.updated_at,
      updated_by: vehicleBrandPrisma.update_by,
      created_by: vehicleBrandPrisma.created_by,
    };
  }

  public static VehicleBrandEntityToPrismaVehicleBrand(
    vehicleBrandEntity: IVehicleBrand,
  ): Prisma.VehicleBrandCreateInput {
    const vehicleBrandPrisma: Prisma.VehicleBrandUncheckedCreateInput = {
      name: vehicleBrandEntity.name,
      created_at: vehicleBrandEntity.created_at,
      updated_at: vehicleBrandEntity.updated_at,
      update_by: vehicleBrandEntity.updated_by,
      created_by: vehicleBrandEntity.created_by,
    };

    return vehicleBrandPrisma;
  }

  public static VehicleBrandEntityToUpdatedVehicleBrandPrisma(
    vehicleBrand: IVehicleBrand,
  ): Prisma.VehicleBrandUpdateInput {
    const vehicleBrandUpdate: Prisma.VehicleBrandUncheckedUpdateInput = {
      name: vehicleBrand.name,
      created_at: vehicleBrand.created_at,
      updated_at: vehicleBrand.updated_at,
      update_by: vehicleBrand.updated_by,
      created_by: vehicleBrand.created_by,
    };

    return vehicleBrandUpdate;
  }
}
