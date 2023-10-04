import {
  type IVehicle,
  type Vehicle,
} from 'domain/entities/vehicle/vehicle/Vehicle';

export abstract class VehicleRepository {
  abstract findVehicleById(id?: string, plate?: string): Promise<Vehicle>;
  abstract createVehicle(
    vehicleBrand: Omit<IVehicle, 'id' | 'updated_at' | 'created_at'>,
  ): Promise<Vehicle>;
  abstract updateVehicle(
    id: string,
    vehicleBrand: Partial<IVehicle>,
  ): Promise<Vehicle>;
  abstract getAllVehicle(): Promise<Vehicle[]>;
}
