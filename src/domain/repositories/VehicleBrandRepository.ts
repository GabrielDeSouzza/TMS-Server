import {
  type IVehicleBrand,
  type VehicleBrand,
} from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

export abstract class VehicleBrandRepository {
  abstract findVehicleBrandById(id: string): Promise<VehicleBrand>;
  abstract createVehicleBrand(
    vehicleBrand: Omit<IVehicleBrand, 'updated_at' | 'created_at' | 'id'>,
  ): Promise<VehicleBrand>;
  abstract updateVehicleBrand(
    id: string,
    vehicleBrand: Partial<IVehicleBrand>,
  ): Promise<VehicleBrand>;
  abstract getAllVehicleBrand(): Promise<VehicleBrand[]>;
}
