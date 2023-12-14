import {
  type VehicleBrand as VehicleBrandPrisma,
  type Prisma,
} from '@prisma/client';

import { VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

export class VehicleBrandPrismaDTO {
  public static PrismaToEntity(
    vehicleBrandPrisma: VehicleBrandPrisma,
  ): VehicleBrand {
    return new VehicleBrand({
      id: vehicleBrandPrisma.id,
      name: vehicleBrandPrisma.name,
      created_at: vehicleBrandPrisma.created_at,
      updated_at: vehicleBrandPrisma.updated_at,
      updated_by: vehicleBrandPrisma.updated_by,
      created_by: vehicleBrandPrisma.created_by,
    });
  }

  public static EntityToPrisma(
    vehicleBrandEntity: VehicleBrand,
  ): Prisma.VehicleBrandCreateInput {
    const vehicleBrandPrisma: Prisma.VehicleBrandUncheckedCreateInput = {
      name: vehicleBrandEntity.name,
      created_at: vehicleBrandEntity.created_at,
      updated_at: vehicleBrandEntity.updated_at,
      updated_by: vehicleBrandEntity.updated_by,
      created_by: vehicleBrandEntity.created_by,
    };

    return vehicleBrandPrisma;
  }

  public static EntityToPrismaUpdate(
    vehicleBrand: VehicleBrand,
  ): Prisma.VehicleBrandUpdateInput {
    const vehicleBrandUpdate: Prisma.VehicleBrandUncheckedUpdateInput = {
      name: vehicleBrand.name,
      updated_at: vehicleBrand.updated_at,
      updated_by: vehicleBrand.updated_by,
    };

    return vehicleBrandUpdate;
  }
}
