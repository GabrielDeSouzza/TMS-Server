import {
  type IVehicleBrand,
  type VehicleBrand,
} from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

export abstract class VehicleBrandRepository {
  abstract findVehicleBrandById(id: string): Promise<VehicleBrand>;
  abstract createVehicleBrand(
    vehicleBrand: IVehicleBrand,
  ): Promise<VehicleBrand>;
  abstract updateVehicleBrand(
    vehicleBrand: IVehicleBrand,
  ): Promise<VehicleBrand>;
  abstract getAllVehicleBrand(): Promise<VehicleBrand[]>;
}
