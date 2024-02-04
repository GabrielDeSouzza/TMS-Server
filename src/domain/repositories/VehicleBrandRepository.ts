import { type FindAllVehicleBrandWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBrandRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

export abstract class VehicleBrandRepository {
  abstract findVehicleBrandById(id: string): Promise<VehicleBrand>;
  abstract createVehicleBrand(
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand>;
  abstract updateVehicleBrand(
    id: string,
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand>;
  abstract getAllVehicleBrand(
    parameters: FindAllVehicleBrandWhereRequestDTO,
  ): Promise<VehicleBrand[]>;
}
