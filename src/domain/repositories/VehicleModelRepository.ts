import { type VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleModelRepository {
  abstract findVehicleModelById(id: string): Promise<VehicleModel>;
  abstract createVehicleModel(
    vehicleModel: VehicleModel,
  ): Promise<VehicleModel>;
  abstract updateVehicleModel(
    id: string,
    vehicleModel: VehicleModel,
  ): Promise<VehicleModel>;
  abstract getAllVehicleModel(): Promise<VehicleModel[]>;
  abstract findOnlyVehicleType(
    modelId: string,
    containsBodies?: boolean,
  ): Promise<VehicleType>;
}
