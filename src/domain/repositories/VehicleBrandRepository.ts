import {
  type IVehicleBrand,
  type VehicleBrand,
} from 'domain/entities/vehicle/vehicleBrand/VehicleBrand';

export abstract class VeHicleBrandRepository {
  abstract findUserById(id: string): Promise<VehicleBrand>;
  abstract createUSer(vehicleBrand: IVehicleBrand): Promise<VehicleBrand>;
  abstract updateVehicleBrand(
    vehicleBrand: IVehicleBrand,
  ): Promise<VehicleBrand>;
  abstract getAllUsers(): Promise<VehicleBrand[]>;
}
