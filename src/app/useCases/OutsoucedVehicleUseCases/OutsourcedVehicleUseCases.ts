import { Injectable } from '@nestjs/common';

import { type GetOutsoucedVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedVehicleDto';
import { OutsourcedVehicle } from 'domain/entities/OutsourcedDriverEntities/outsourcedVehicle/OutsourcedVehicle';
import { OutsourcedVehicleRepository } from 'domain/repositories/OutsourcedVehicleRepository';

import { type CreateOutsourcedVehicleDTO } from 'app/dtos/OutsoucedVehicleDto/CreateOutsourcedVehicleDto';

import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OutsourcedVehicleUseCases {
  constructor(
    private outsousrcedVehicleRepository: OutsourcedVehicleRepository,
    private vehicleUseCases: VehicleUseCases,
  ) {}
  async getOutsourcedVehicle(request: GetOutsoucedVehicleDTO) {
    return this.outsousrcedVehicleRepository.findOutsourcedVehicle(request);
  }
  async createOutsourcedVehicle(data: CreateOutsourcedVehicleDTO) {
    const vehicle = await this.vehicleUseCases.createVehicle(data.Vehicle);

    const outsourcedVehicle = new OutsourcedVehicle({
      created_by: data.created_by,
      updated_by: data.updated_by,
    });

    return await this.outsousrcedVehicleRepository.createOutsourcedVehicle(
      outsourcedVehicle,
      vehicle,
    );
  }
}
