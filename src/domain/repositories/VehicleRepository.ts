import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export abstract class VehicleRepository {
  abstract findVehicleById(id?: string, plate?: string): Promise<Vehicle>;
  abstract createVehicle(
    vehicleBrand: Omit<Vehicle, 'id' | 'updated_at' | 'created_at'>,
  ): Promise<Vehicle>;
  abstract updateVehicle(id: string, vehicleBrand: Vehicle): Promise<Vehicle>;
  abstract getAllVehicle(): Promise<Vehicle[]>;
}
