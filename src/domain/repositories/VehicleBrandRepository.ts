import { type VehicleBrand } from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

export abstract class VehicleBrandRepository {
  abstract findVehicleBrandById(id: string): Promise<VehicleBrand>;
  abstract createVehicleBrand(
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand>;
  abstract updateVehicleBrand(
    id: string,
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand>;
  abstract getAllVehicleBrand(): Promise<VehicleBrand[]>;
}
