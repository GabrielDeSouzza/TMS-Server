import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import { type FindAllVehicleTypeWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
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
