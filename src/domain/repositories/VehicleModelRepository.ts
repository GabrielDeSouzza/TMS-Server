import { type VehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';
import {
  type IVehicleModel,
  type VehicleModel,
} from 'domain/entities/vehicle/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/vehicle/vehicleTypes/VehicleTypes';

export abstract class VehicleModelRepository {
  abstract findVehicleModelById(id: string): Promise<VehicleModel>;
  abstract createVehicleModel(
    vehicleBrand: Omit<IVehicleModel, 'updated_at' | 'created_at' | 'id'>,
  ): Promise<VehicleModel>;
  abstract updateVehicleModel(
    id: string,
    vehicleBrand: Partial<IVehicleModel>,
  ): Promise<VehicleModel>;
  abstract getAllVehicleModel(): Promise<VehicleModel[]>;
  abstract findOnlyVehicleType(
    modelId: string,
    containsBodies?: boolean,
  ): Promise<VehicleType>;
  abstract findOnlyVehicleBrand(modelId: string): Promise<VehicleBrand>;
}
