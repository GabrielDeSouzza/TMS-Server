import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { VehicleRepository } from 'domain/repositories/VehicleRepository';

import { type CreateVehicleDto } from 'app/dtos/VehicleDto/CreateVehicleDto';
import { VehicleEntityDTO } from 'app/dtos/VehicleDto/VehicleEntityDto';

@Injectable()
export class VehicleUseCases {
  constructor(private vehicleRepositoty: VehicleRepository) {}
  async createVehicle(data: CreateVehicleDto) {
    const vehicleExist = await this.vehicleRepositoty.validadeVehicle({
      plate: data.plate,
      renavam: data.renavam,
    });

    if (vehicleExist) {
      let error = '';
      if (data.plate == vehicleExist.plate) error += 'Plate Already in Use';
      if (data.renavam == vehicleExist.renavam) error += 'Plate Already in Use';

      throw new GraphQLError(error, {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    return this.vehicleRepositoty.createVehicle(
      VehicleEntityDTO.createEntity(data),
    );
  }
}
