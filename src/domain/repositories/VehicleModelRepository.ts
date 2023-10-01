import {
  type IVehicleModel,
  type VehicleModel,
} from 'domain/entities/vehicle/vehicleModel/VehicleModel';

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
}
