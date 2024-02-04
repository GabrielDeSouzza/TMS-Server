import { type FindAllVehicleTypeWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleTypeRepository {
  abstract findVehicleTypeById(id: string): Promise<VehicleType>;
  abstract createVehicleType(vehicleBrand: VehicleType): Promise<VehicleType>;
  abstract updateVehicleType(
    id: string,
    vehicleBrand: VehicleType,
  ): Promise<VehicleType>;
  abstract getAllVehicleType(
    parameters: FindAllVehicleTypeWhereRequestDTO,
  ): Promise<VehicleType[]>;
}
