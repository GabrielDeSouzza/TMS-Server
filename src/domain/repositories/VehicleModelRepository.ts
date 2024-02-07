import { type GetVehicleModel } from 'domain/dto/repositories/getDataDtos/GetVehicleModelDto';
import { type FindAllVehicleModelWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
import { type VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { type VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

export abstract class VehicleModelRepository {
  abstract findVehicleModel(request: GetVehicleModel): Promise<VehicleModel>;
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
