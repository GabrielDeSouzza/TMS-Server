import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleTypeDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleTypeDto';
import { type FindAllVehicleTypeWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleTypeRepositoryDto';
import { VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';
import { VehicleTypeRepository } from 'domain/repositories/VehicleTypeRepository';

import { type CreateVehicleTypeDTO } from 'app/dtos/VehicleTypeDto/CreateVehicleTypeDto';
import { type UpdateVehicleTypeDTO } from 'app/dtos/VehicleTypeDto/UpdateVehicleTypeDto';

import { VehicleBodyworkUseCases } from '../VehicleBodyWorkUseCases/VehicleBodyWorkUseCases';

@Injectable()
export class VehicleTypeUseCases {
  constructor(
    private vehicleTypeRepository: VehicleTypeRepository,
    private vehicleBodyWorkUseCase: VehicleBodyworkUseCases,
  ) {}
  async getVehicleType(request: GetVehicleTypeDTO) {
    if (!request.id && !request.name)
      throw new GraphQLError('IS NECESSARY AN ID OR NAME', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    const type = await this.vehicleTypeRepository.findVehicleType(request);
    if (type) return type;

    throw new GraphQLError('TYPE NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  getAllVehicleType(request: FindAllVehicleTypeWhereRequestDTO) {
    return this.vehicleTypeRepository.getAllVehicleType(request);
  }
  async createVehicleType(data: CreateVehicleTypeDTO) {
    console.log(data);
    if (data.body_work_id)
      await this.vehicleBodyWorkUseCase.verifyBodyWorksExists(
        data.body_work_id,
      );
    const typeExist = await this.vehicleTypeRepository.findVehicleType({
      name: data.name,
    });
    if (typeExist)
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const vehicleType = new VehicleType({
      bodyWork: data.bodyWork,
      created_by: data.created_by,
      name: data.name,
      updated_by: data.updated_by,
      body_work_id: data.body_work_id,
    });

    return this.vehicleTypeRepository.createVehicleType(vehicleType);
  }
  async updateVehicleType(id: string, data: UpdateVehicleTypeDTO) {
    const typeExist = await this.getVehicleType({ id, name: data.name });
    if (typeExist && typeExist.id !== id)
      throw new GraphQLError('VEHICLE TYPE NOT FOUND', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    if (typeExist && typeExist.name == data.name)
      throw new GraphQLError('NAME ALREADY IN USE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    if (data.body_work_id)
      await this.vehicleBodyWorkUseCase.verifyBodyWorksExists(
        data.body_work_id,
      );
    console.log('ss');
    const vehicleType = new VehicleType({
      bodyWork: data.bodyWork,
      name: data.name,
      updated_by: data.updated_by,
      body_work_id: data.body_work_id,
      created_by: null,
    });

    return this.vehicleTypeRepository.updateVehicleType(
      id,
      vehicleType,
      data.del_body_id,
    );
  }
}
