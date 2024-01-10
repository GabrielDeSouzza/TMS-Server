import { type FindAllVehicleBodyworkWhereRequestDTO } from 'domain/dto/repositories/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

export abstract class VehicleBodyworkRepository {
  abstract findVehicleBodyworkById(id: string): Promise<VehicleBodywork>;
  abstract createVehicleBodywork(
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork>;
  abstract updateVehicleBodywork(
    id: string,
    vehicleBodywork: VehicleBodywork,
  ): Promise<VehicleBodywork>;
  abstract getAllVehicleBodywork(
    parameters: FindAllVehicleBodyworkWhereRequestDTO,
  ): Promise<VehicleBodywork[]>;
}
