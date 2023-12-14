import { Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';

import {
  type VehicleUpdateInput,
  type VehicleInput,
} from '../entities/VehicleGraphql/Vehicle.input';

export class VehicleGraphDTO {
  public static createInputToEntity(createInput: VehicleInput) {
    return new Vehicle({
      year: createInput.year,
      color: createInput.color,
      model_id: createInput.model_id,
      plate: createInput.plate,
      renavam: createInput.renavam,
      rntrc_expiration: createInput.rntrc_expiration,
    });
  }

  public static updateInputToEntity(
    updateInput: VehicleUpdateInput | undefined,
  ) {
    return updateInput
      ? new Vehicle({
          year: updateInput.year,
          color: updateInput.color,
          model_id: updateInput.model_id,
          plate: updateInput.plate,
          renavam: updateInput.renavam,
          rntrc_expiration: updateInput.rntrc_expiration,
        })
      : undefined;
  }
}
