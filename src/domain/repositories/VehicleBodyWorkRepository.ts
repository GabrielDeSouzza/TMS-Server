import { type GetVehicleBodyWorkDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBodWorkDto';
import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import { type FindAllVehicleBodyworkWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

export abstract class VehicleBodyworkRepository {
  abstract findVehicleBodywork(
    request: GetVehicleBodyWorkDTO,
  ): Promise<VehicleBodywork>;
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
  abstract getAllVehicleBodyworkByType(
    vehicleType: GetVehicleTypeDTO,
  ): Promise<VehicleBodywork[]>;
}
