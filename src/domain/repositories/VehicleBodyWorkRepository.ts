import {
  type IVehicleBodywork,
  type VehicleBodywork,
} from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

export abstract class VehicleBodyworkRepository {
  abstract findVehicleBodyworkById(id: string): Promise<VehicleBodywork>;
  abstract createVehicleBodywork(
    vehicleBodywork: Omit<IVehicleBodywork, 'updated_at' | 'created_at' | 'id'>,
  ): Promise<VehicleBodywork>;
  abstract updateVehicleBodywork(
    id: string,
    vehicleBodywork: Partial<IVehicleBodywork>,
  ): Promise<VehicleBodywork>;
  abstract getAllVehicleBodywork(): Promise<VehicleBodywork[]>;
}
