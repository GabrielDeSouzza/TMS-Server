import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import {
  type CountAllVehicleTypesWhereRequestDTO,
  type UpdateManyVehicleTypesDTO,
  type FindAllVehicleTypeWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
  abstract count(
    parameters: CountAllVehicleTypesWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<VehicleType>;
  abstract updateMany(
    vehicleType: UpdateManyVehicleTypesDTO[],
  ): Promise<VehicleType[]>;
  abstract deleteMany(ids: string[]): Promise<VehicleType[]>;
  abstract findVehicleType(request: GetVehicleTypeDTO): Promise<VehicleType>;
  abstract createVehicleType(vehicleBrand: VehicleType): Promise<VehicleType>;
  abstract updateVehicleType(
    id: string,
    vehicleBrand: VehicleType,
    delBodyWorkIds?: string[],
  ): Promise<VehicleType>;
  abstract getAllVehicleType(
    parameters: FindAllVehicleTypeWhereRequestDTO,
  ): Promise<VehicleType[]>;
  abstract getAllVehicleTypeByBodyWork(
    bodyworkId: string,
  ): Promise<VehicleType[]>;
}
