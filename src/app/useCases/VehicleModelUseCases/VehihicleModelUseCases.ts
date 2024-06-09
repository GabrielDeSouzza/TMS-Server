import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleModelDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleModelDto';
import {
  type CountAllVehicleModelsWhereRequestDTO,
  type UpdateManyVehicleModelsDTO,
  type FindAllVehicleModelWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/VehicleModelRepositoryDto';
import { VehicleModel } from 'domain/entities/VehicleEntities/vehicleModel/VehicleModel';
import { VehicleModelRepository } from 'domain/repositories/VehicleModelRepository';

import { type CreateVehicleModelDTO } from 'app/dtos/VehicleModelDto/CreateVehicleModelDto';
import { type UpdateVehicleModelDTO } from 'app/dtos/VehicleModelDto/UpdateVehicleModelDto';

import { VehicleBrandUseCases } from '../VehicleBrandCases/VehicleBrandUseCases';
import { VehicleTypeUseCases } from '../VehicleTypeUseCases/VehicleTypeUseCases';

@Injectable()
export class VehicleModelUseCases {
  constructor(
    private vehicleModelRepository: VehicleModelRepository,
    private vehicleBrandUseCase: VehicleBrandUseCases,
    private vehicleTypeUseCase: VehicleTypeUseCases,
  ) {}
  async count(
    parameters: CountAllVehicleModelsWhereRequestDTO,
  ): Promise<number> {
    return await this.vehicleModelRepository.count(parameters);
  }

  async updateManyVehicleModels(
    VehicleModels: UpdateManyVehicleModelsDTO[],
  ): Promise<VehicleModel[]> {
    const updateVehicleModels = await this.vehicleModelRepository.updateMany(
      VehicleModels,
    );

    return updateVehicleModels;
  }

  async deleteVehicleModel(id: string): Promise<VehicleModel> {
    return await this.vehicleModelRepository.delete(id);
  }

  async deleteManyVehicleModels(ids: string[]): Promise<VehicleModel[]> {
    const deleteVehicleModels = await this.vehicleModelRepository.deleteMany(
      ids,
    );

    return deleteVehicleModels;
  }

  async getModel(request: GetVehicleModelDTO) {
    if (!request.id && !request.name)
      throw new GraphQLError('IS NECESSARY AN ID OR MODEL NAME', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    const model = await this.vehicleModelRepository.findVehicleModel(request);

    if (model) return model;

    throw new GraphQLError('MODEL NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllModels(request: FindAllVehicleModelWhereRequestDTO) {
    const models = await this.vehicleModelRepository.getAllVehicleModel(
      request,
    );

    return models ?? [];
  }

  async createModel(data: CreateVehicleModelDTO) {
    const modelExist = await this.vehicleModelRepository.findVehicleModel({
      name: data.name,
    });

    if (modelExist) {
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    await this.vehicleTypeUseCase.getVehicleType({
      id: data.type_id,
    });

    await this.vehicleBrandUseCase.getVehicleBrand({ id: data.brand_id });

    const modelEntity = new VehicleModel({
      axles: data.axles,
      brand_id: data.brand_id,
      capacity_max: data.capacity_max,
      capacity_per_axle: data.capacity_per_axle,
      created_by: data.created_by,
      name: data.name,
      type_id: data.type_id,
      updated_by: data.updated_by,
      weight: data.weight,
    });

    return this.vehicleModelRepository.createVehicleModel(modelEntity);
  }
  async updateModel(id: string, data: UpdateVehicleModelDTO) {
    const modelExist = await this.vehicleModelRepository.findVehicleModel({
      name: data.name,
    });

    if (modelExist) {
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    await this.vehicleTypeUseCase.getVehicleType({
      id: data.type_id,
    });

    await this.vehicleBrandUseCase.getVehicleBrand({ id: data.brand_id });

    const modelEntity = new VehicleModel({
      axles: data.axles,
      brand_id: data.brand_id,
      capacity_max: data.capacity_max,
      capacity_per_axle: data.capacity_per_axle,
      created_by: null,
      name: data.name,
      type_id: data.type_id,
      updated_by: data.updated_by,
      weight: data.weight,
    });

    return this.vehicleModelRepository.updateVehicleModel(id, modelEntity);
  }

  findModelsByType(modelID: string, hasBody: boolean) {
    return this.vehicleModelRepository.findOnlyVehicleType(modelID, hasBody);
  }
}
