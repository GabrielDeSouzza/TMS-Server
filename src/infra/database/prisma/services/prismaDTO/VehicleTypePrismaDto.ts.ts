import {
  type VehicleType as VehicleTypePrisma,
  type Prisma,
} from '@prisma/client';

import { VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export class VehicleTypePrismaDTO {
  public static PrismaToEntity(
    vehicleTypePrisma: VehicleTypePrisma,
  ): VehicleType {
    return new VehicleType({
      id: vehicleTypePrisma.id,
      name: vehicleTypePrisma.name,
      bodyWork: vehicleTypePrisma.bodywork,
      created_at: vehicleTypePrisma.created_at,
      updated_at: vehicleTypePrisma.updated_at,
      created_by: vehicleTypePrisma.created_by,
      updated_by: vehicleTypePrisma.updated_by,
    });
  }

  public static EntityToPrisma(
    vehicleTypeEntity: VehicleType,
  ): VehicleTypePrisma {
    const vehicleTypePrisma: VehicleTypePrisma = {
      name: vehicleTypeEntity.name,
      bodywork: vehicleTypeEntity.bodyWork,
      created_at: vehicleTypeEntity.created_at,
      updated_at: vehicleTypeEntity.updated_at,
      created_by: vehicleTypeEntity.created_by,
      updated_by: vehicleTypeEntity.updated_by,
      id: vehicleTypeEntity.id,
    };

    return vehicleTypePrisma;
  }

  public static EntityToPrismaUpdate(
    vehicleType: VehicleType,
  ): Prisma.VehicleTypeUpdateInput {
    const vehicleBrandUpdate: Prisma.VehicleTypeUncheckedUpdateInput = {
      name: vehicleType.name,
      bodywork: vehicleType.bodyWork,
      updated_at: vehicleType.updated_at,
      updated_by: vehicleType.updated_by,
    };

    return vehicleBrandUpdate;
  }
}
