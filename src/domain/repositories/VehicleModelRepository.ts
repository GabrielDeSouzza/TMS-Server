import { type GetVehicleModelDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleModelDto';
import {
  type CountAllVehicleModelsWhereRequestDTO,
  type UpdateManyVehicleModelsDTO,
  type FindAllVehicleModelWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
import { type VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleModelRepository {
  abstract count(
    parameters: CountAllVehicleModelsWhereRequestDTO,
  ): Promise<number>;
  abstract delete(id: string): Promise<VehicleModel>;
  abstract updateMany(
    vehicleModel: UpdateManyVehicleModelsDTO[],
  ): Promise<VehicleModel[]>;
  abstract deleteMany(ids: string[]): Promise<VehicleModel[]>;
  abstract findVehicleModel(request: GetVehicleModelDTO): Promise<VehicleModel>;
  abstract createVehicleModel(
    vehicleModel: VehicleModel,
  ): Promise<VehicleModel>;
  abstract updateVehicleModel(
    id: string,
    vehicleModel: VehicleModel,
  ): Promise<VehicleModel>;
  abstract getAllVehicleModel(
    parameters: FindAllVehicleModelWhereRequestDTO,
  ): Promise<VehicleModel[]>;
  abstract findOnlyVehicleType(
    modelId: string,
    containsBodies?: boolean,
  ): Promise<VehicleType>;
}
