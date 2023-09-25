import {
  type VehicleModel as VehicleModelPrisma,
  type Prisma,
} from '@prisma/client';

import { type IVehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';

export class VehicleModelPrismaDTO {
  public static PrismaVehicleModelToVehicleModelEntity(
    vehicleModelPrisma: VehicleModelPrisma,
  ): Omit<IVehicleModel, 'VehicleBrand' | 'VehicleType'> {
    return {
      name: vehicleModelPrisma.name,
      weight: vehicleModelPrisma.weight,
      capacity_max: vehicleModelPrisma.capacity_max,
      axles: vehicleModelPrisma.axles,
      capacity_per_axle: vehicleModelPrisma.capacity_per_axle,
      brand_id: vehicleModelPrisma.brand_id,
      type_id: vehicleModelPrisma.type_id,
      created_at: vehicleModelPrisma.created_at,
      created_by: vehicleModelPrisma.created_by,
      updated_at: vehicleModelPrisma.updated_at,
      updated_by: vehicleModelPrisma.update_by,
    };
  }

  public static VehicleModelEntityToPrismaVehicleModel(
    vehicleModelEntity: IVehicleModel,
  ): VehicleModelPrisma {
    const vehicleModelPrisma: VehicleModelPrisma = {
      name: vehicleModelEntity.name,
      weight: vehicleModelEntity.weight,
      capacity_max: vehicleModelEntity.capacity_max,
      axles: vehicleModelEntity.axles,
      capacity_per_axle: vehicleModelEntity.capacity_per_axle,
      brand_id: vehicleModelEntity.brand_id,
      type_id: vehicleModelEntity.type_id,
      created_at: vehicleModelEntity.created_at,
      created_by: vehicleModelEntity.created_by,
      updated_at: vehicleModelEntity.updated_at,
      update_by: vehicleModelEntity.updated_by,
      id: vehicleModelEntity.id,
    };

    return vehicleModelPrisma;
  }

  public static VehicleModelEntityToUpdatedVehicleModelPrisma(
    vehicleModel: IVehicleModel,
  ): Prisma.VehicleModelUpdateInput {
    const vehicleModelUpdate: Prisma.VehicleModelUncheckedUpdateInput = {
      name: vehicleModel.name,
      weight: vehicleModel.weight,
      capacity_max: vehicleModel.capacity_max,
      axles: vehicleModel.axles,
      capacity_per_axle: vehicleModel.capacity_per_axle,
      brand_id: vehicleModel.brand_id,
      type_id: vehicleModel.type_id,
      created_at: vehicleModel.created_at,
      created_by: vehicleModel.created_by,
      updated_at: vehicleModel.updated_at,
      update_by: vehicleModel.updated_by,
    };

    return vehicleModelUpdate;
  }
}
