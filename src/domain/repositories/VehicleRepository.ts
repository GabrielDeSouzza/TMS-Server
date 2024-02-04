import { type ValidadeVehicle } from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';
import { type FindAllVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleRepositoryDto';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

export abstract class VehicleRepository {
  abstract findVehicleById(id?: string, plate?: string): Promise<Vehicle>;
  abstract createVehicle(
    vehicleBrand: Omit<Vehicle, 'id' | 'updated_at' | 'created_at'>,
  ): Promise<Vehicle>;
  abstract updateVehicle(id: string, vehicleBrand: Vehicle): Promise<Vehicle>;
  abstract getAllVehicle(
    parameters: FindAllVehicleWhereRequestDTO,
  ): Promise<Vehicle[]>;
  abstract validadeVehicle(data: ValidadeVehicle): Promise<Vehicle>;
}
