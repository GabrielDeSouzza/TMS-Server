import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetVehicleDto } from 'domain/dto/repositories/getDataDtos/GetVehicleDto';
import { type ValidadeVehicle } from 'domain/dto/repositories/whereDtos/CompanyVehicleRepositoryDto';
import { type FindAllVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleRepositoryDto';
import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { type CreateVehicleDto } from 'app/dtos/VehicleDto/CreateVehicleDto';
import { type UpdateVehicleDto } from 'app/dtos/VehicleDto/UpdateVehicleDto';
import { VehicleEntityDTO } from 'app/dtos/VehicleDto/VehicleEntityDto';

@Injectable()
export class VehicleUseCases {
  constructor(private vehicleRepositoty: VehicleRepository) {}

  async getVehicle(request: GetVehicleDto) {
    if (!request.plate && !request.vehicleId)
      throw new GraphQLError('IS NECESSARY A VEHICLEID OR PLATE', {
        extensions: { code: HttpStatus.BAD_GATEWAY },
      });

    return this.vehicleRepositoty.findVehicle(request);
  }
  async getAllVehicle(request: FindAllVehicleWhereRequestDTO) {
    return this.vehicleRepositoty.getAllVehicle(request);
  }

  async createVehicle(data: CreateVehicleDto) {
    await this.validateVehicle(data);

    return this.vehicleRepositoty.createVehicle(
      VehicleEntityDTO.createEntity(data),
    );
  }
  async updateVehicle(id: string, data: UpdateVehicleDto) {
    await this.validateVehicle(data);
    const vehicle = VehicleEntityDTO.updateEntity(data);

    return this.vehicleRepositoty.updateVehicle(id, vehicle);
  }
  async validateVehicle(request: ValidadeVehicle) {
    const vehicleExist = await this.vehicleRepositoty.validadeVehicle(request);
    if (vehicleExist) return;
    let errors = '';
    if (vehicleExist.plate == request.plate) errors += 'PLATE ALREADY IN USE';
    if (vehicleExist.renavam == request.renavam)
      errors += 'RENAVAM ALREADY IN USE';
    new GraphQLError(errors, { extensions: { code: HttpStatus.CONFLICT } });
  }
}
