import {
  type VehicleType as VehicleTypePrisma,
  type Prisma,
} from '@prisma/client';

import {
  VehicleType,
  type IVehicleType,
} from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

export class VehicleTypePrismaDTO {
  public static PrismaToEntity(
    vehicleTypePrisma: VehicleTypePrisma,
  ): VehicleType {
    return new VehicleType({
      name: vehicleTypePrisma.name,
      bodyWork: vehicleTypePrisma.bodywork,
      created_at: vehicleTypePrisma.created_at,
      updated_at: vehicleTypePrisma.updated_at,
      created_by: vehicleTypePrisma.created_by,
      updated_by: vehicleTypePrisma.update_by,
    });
  }

  public static EntityToPrisma(
    vehicleTypeEntity: IVehicleType,
  ): VehicleTypePrisma {
    const vehicleTypePrisma: VehicleTypePrisma = {
      name: vehicleTypeEntity.name,
      bodywork: vehicleTypeEntity.bodyWork,
      created_at: vehicleTypeEntity.created_at,
      updated_at: vehicleTypeEntity.updated_at,
      created_by: vehicleTypeEntity.created_by,
      update_by: vehicleTypeEntity.updated_by,
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
      created_at: vehicleType.createdAt,
      updated_at: vehicleType.updatedAt,
      created_by: vehicleType.createdBy,
      update_by: vehicleType.updatedBy,
    };

    return vehicleBrandUpdate;
  }
}
