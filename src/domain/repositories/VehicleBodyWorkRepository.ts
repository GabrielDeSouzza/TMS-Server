import { type GetVehicleBodyWorkDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBodWorkDto';
import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import {
  type CountAllVehicleBodyworksWhereRequestDTO,
  type UpdateManyVehicleBodyworksDTO,
  type FindAllVehicleBodyworkWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleBodyworkRepositoryDto';
import { type VehicleBodywork } from 'domain/entities/VehicleEntities/vehicleBodywork/VehicleBodywork';

export abstract class VehicleBodyworkRepository {
  abstract count(
    parameters: CountAllVehicleBodyworksWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<VehicleBodywork>;
  abstract updateMany(
    vehicleBodywork: UpdateManyVehicleBodyworksDTO[],
  ): Promise<VehicleBodywork[]>;
  abstract deleteMany(ids: string[]): Promise<VehicleBodywork[]>;
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
