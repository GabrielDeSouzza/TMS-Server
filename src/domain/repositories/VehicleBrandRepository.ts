import { type GetVehicleBrandDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBrandDto';
import {
  type CountAllVehicleBrandsWhereRequestDTO,
  type UpdateManyVehicleBrandsDTO,
  type FindAllVehicleBrandWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleBrandRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

export abstract class VehicleBrandRepository {
  abstract count(
    parameters: CountAllVehicleBrandsWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<VehicleBrand>;
  abstract updateMany(
    vehicleBrand: UpdateManyVehicleBrandsDTO[],
  ): Promise<VehicleBrand[]>;
  abstract deleteMany(ids: string[]): Promise<VehicleBrand[]>;
  abstract findVehicleBrand(request: GetVehicleBrandDTO): Promise<VehicleBrand>;
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
