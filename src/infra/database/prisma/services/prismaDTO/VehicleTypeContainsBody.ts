import {
  type Prisma,
  type VehicleTypeContainsBody as VehicleTypeContainsBodyPrisma,
} from '@prisma/client';

import { type IVehicleTypeContainsBody } from 'domain/entities/VehicleEntities/vehicleTypeContainsBody/VehicleContainsBody';
import { VehicleTypeContainsBody } from 'domain/entities/VehicleEntities/vehicleTypeContainsBody/VehicleContainsBody';

export class VehicleTypeContainsBodyPrismaDTO {
  public static PrismaToEntity(
    vehicleTypeContainsBodyPrisma: VehicleTypeContainsBodyPrisma,
  ) {
    return new VehicleTypeContainsBody({
      id: vehicleTypeContainsBodyPrisma.id,
      vehicle_bodywork_id: vehicleTypeContainsBodyPrisma.bodywork_id,
      vehicle_type_id: vehicleTypeContainsBodyPrisma.type_id,
      created_at: vehicleTypeContainsBodyPrisma.created_at,
      updated_at: vehicleTypeContainsBodyPrisma.updated_at,
      created_by: vehicleTypeContainsBodyPrisma.created_by,
      updated_by: vehicleTypeContainsBodyPrisma.updated_by,
    });
  }
  public static EntityToPrisma(
    vehicleTypeContainsBodEntity: IVehicleTypeContainsBody,
  ) {
    const vehicleTypeContainsBodyPrisma: VehicleTypeContainsBodyPrisma = {
      created_at: vehicleTypeContainsBodEntity.created_at,
      bodywork_id: vehicleTypeContainsBodEntity.vehicle_bodywork_id,
      created_by: vehicleTypeContainsBodEntity.created_by,
      id: vehicleTypeContainsBodEntity.id,
      type_id: vehicleTypeContainsBodEntity.vehicle_type_id,
      updated_at: vehicleTypeContainsBodEntity.updated_at,
      updated_by: vehicleTypeContainsBodEntity.updated_by,
    };

    return vehicleTypeContainsBodyPrisma;
  }

  public static EntityToPrismaUpdate(
    vehicleTypeContainsBody: Partial<VehicleTypeContainsBody>,
  ) {
    const vehicleTypeContainsBodyUpdate: Prisma.VehicleTypeContainsBodyUncheckedUpdateInput =
      {
        bodywork_id: vehicleTypeContainsBody.vehicle_bodywork_id,
        type_id: vehicleTypeContainsBody.vehicle_type_id,
        updated_at: vehicleTypeContainsBody.updated_at,
        updated_by: vehicleTypeContainsBody.updated_by,
      };

    return vehicleTypeContainsBodyUpdate;
  }
}
