import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOutsoucedVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedVehicleDto';
import { type FindAllOutsourcedDriverWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedDriverRepositoryDto';
import { OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { type CreateOutsourcedVehicleDTO } from 'app/dtos/OutsoucedVehicleDto/CreateOutsourcedVehicleDto';
import { type UpdateOutsourcedVehicleDTO } from 'app/dtos/OutsoucedVehicleDto/UpdateOutsourcedVehicleDto';
import { VehicleEntityDTO } from 'app/dtos/VehicleDto/VehicleEntityDto';

import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OutsourcedVehicleUseCases {
  constructor(
    private outsousrcedVehicleRepository: OutsourcedVehicleRepository,
    private vehicleUseCases: VehicleUseCases,
  ) {}
  async getOutsourcedVehicle(request: GetOutsoucedVehicleDTO) {
    if (!request.id && !request.plate && !request.vehicleId)
      throw new GraphQLError('IS NECESSARY AN ID, PLATE OR VEHICLEID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return this.outsousrcedVehicleRepository.findOutsourcedVehicle(request);
  }
  async getAllOutsourcedVehicle(
    request: FindAllOutsourcedDriverWhereRequestDTO,
  ) {
    return this.outsousrcedVehicleRepository.findAllOutsourcedVehicle(request);
  }
  async createOutsourcedVehicle(data: CreateOutsourcedVehicleDTO) {
    await this.vehicleUseCases.validateVehicle(data.Vehicle);

    const vehicle = VehicleEntityDTO.createEntity(data.Vehicle);

    const outsourcedVehicle = new OutsourcedVehicle({
      created_by: data.created_by,
      updated_by: data.updated_by,
    });

    return await this.outsousrcedVehicleRepository.createOutsourcedVehicle(
      outsourcedVehicle,
      vehicle,
    );
  }

  async updateOutsourcedVehicle(id: string, data: UpdateOutsourcedVehicleDTO) {
    await this.vehicleUseCases.validateVehicle(data.Vehicle);
    const outsourcedVehicle = new OutsourcedVehicle({
      updated_by: data.updated_by,
    });
    const vehicle = VehicleEntityDTO.updateEntity(data.Vehicle);

    return this.outsousrcedVehicleRepository.updateOutsourcedVehicle(
      id,
      outsourcedVehicle,
      vehicle,
    );
  }
}
