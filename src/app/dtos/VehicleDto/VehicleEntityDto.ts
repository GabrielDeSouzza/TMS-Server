import { Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

import { type CreateVehicleDto } from './CreateVehicleDto';
import { type UpdateVehicleDto } from './UpdateVehicleDto';

export class VehicleEntityDTO {
  public static createEntity(data: CreateVehicleDto) {
    return new Vehicle({
      color: data.color,
      model_id: data.model_id,
      plate: data.plate,
      renavam: data.renavam,
      antt: data.antt,
      year: data.year,
      isIpvaPaid: data.isIpvaPaid,
      registration: data.registration,
    });
  }
  public static updateEntity(data?: UpdateVehicleDto) {
    return data
      ? new Vehicle({
          color: data.color,
          model_id: data.model_id,
          plate: data.plate,
          renavam: data.renavam,
          antt: data.antt,
          year: data.year,
          isIpvaPaid: data.isIpvaPaid,
          registration: data.registration,
        })
      : null;
  }
}
