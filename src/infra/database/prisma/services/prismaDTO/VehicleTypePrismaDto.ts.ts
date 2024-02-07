import {
  type VehicleBodywork as VehicleBodyWorkPrisma,
  type VehicleType as VehicleTypePrisma,
  type Prisma,
} from '@prisma/client';

import { VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export class VehicleTypePrismaDTO {
  public static PrismaToEntity(
    vehicleTypePrisma: VehicleTypePrisma,
    bodyWorks?: VehicleBodyWorkPrisma[],
  ): VehicleType {
    return new VehicleType({
      id: vehicleTypePrisma.id,
      name: vehicleTypePrisma.name,
      bodyWork: vehicleTypePrisma.bodywork,
      created_at: vehicleTypePrisma.created_at,
      updated_at: vehicleTypePrisma.updated_at,
      created_by: vehicleTypePrisma.created_by,
      updated_by: vehicleTypePrisma.updated_by,
      body_work_id: bodyWorks.map(body => body.id),
    });
  }

  public static EntityToPrisma(vehicleTypeEntity: VehicleType) {
    const vehicleTypePrisma: VehicleTypePrisma = {
      name: vehicleTypeEntity.name,
      bodywork: vehicleTypeEntity.bodyWork,
      created_at: vehicleTypeEntity.created_at,
      updated_at: vehicleTypeEntity.updated_at,
      created_by: vehicleTypeEntity.created_by,
      updated_by: vehicleTypeEntity.updated_by,
      id: vehicleTypeEntity.id,
    };

    return { vehicleTypePrisma, bodyWorkIds: vehicleTypeEntity.body_work_id };
  }

  public static EntityToPrismaUpdate(
    vehicleType: VehicleType,
  ): Prisma.VehicleTypeUpdateInput {
    const vehicleBrandUpdate: Prisma.VehicleTypeUpdateInput = {
      name: vehicleType.name,
      bodywork: vehicleType.bodyWork,
      updated_at: vehicleType.updated_at,
      UpdatedBy: { connect: { id: vehicleType.updated_by } },
      VehicleBodyWork: {
        connect: vehicleType.body_work_id.map(id => ({ id })),
      },
    };

    return vehicleBrandUpdate;
  }
}
