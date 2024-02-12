import {
  type VehicleType as VehicleTypePrisma,
  type Prisma,
} from '@prisma/client';

import { VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export class VehicleTypePrismaDTO {
  public static PrismaToEntity(
    vehicleTypePrisma: VehicleTypePrisma,
  ): VehicleType {
    if (!vehicleTypePrisma) return null;

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

  public static EntityToPrisma(vehicleTypeEntity: VehicleType) {
    const vehicleTypePrisma: Prisma.VehicleTypeCreateInput = {
      name: vehicleTypeEntity.name,
      bodywork: vehicleTypeEntity.bodyWork,
      created_at: vehicleTypeEntity.created_at,
      updated_at: vehicleTypeEntity.updated_at,
      CreatedBy: { connect: { id: vehicleTypeEntity.created_by } },
      UpdatedBy: { connect: { id: vehicleTypeEntity.updated_by } },
      VehicleBodyWork: {
        connect: vehicleTypeEntity.body_work_id?.map(id => ({ id })),
      },
      id: vehicleTypeEntity.id,
    };

    return vehicleTypePrisma;
  }

  public static EntityToPrismaUpdate(
    vehicleType: VehicleType,
    delBodyworkIds?: string[],
  ): Prisma.VehicleTypeUpdateInput {
    const vehicleBrandUpdate: Prisma.VehicleTypeUpdateInput = {
      name: vehicleType.name,
      bodywork: vehicleType.bodyWork,
      updated_at: vehicleType.updated_at,
      UpdatedBy: { connect: { id: vehicleType.updated_by } },
      VehicleBodyWork: {
        connect: vehicleType.body_work_id?.map(id => ({ id })),
        disconnect: delBodyworkIds?.map(id => ({ id })),
      },
    };

    return vehicleBrandUpdate;
  }
}
