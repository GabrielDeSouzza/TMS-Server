import { VehicleBodywork } from 'domain/entities/vehicle/vehicleBodywork/VehicleBodywork';

import {
  type VehicleBodyworkInput,
  type VehicleBodyworkUpdateInput,
} from '../entities/VehicleBodyworkGraphql/vehicle-bodywork.input';

export class VehicleBodyworkGraphDTO {
  public static createcreateInputToEntity(createInput: VehicleBodyworkInput) {
    return new VehicleBodywork({
      name: createInput.name,
      axles: createInput.axles,
      mass: createInput.mass,
      volume: createInput.volume,
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: VehicleBodyworkUpdateInput | undefined,
  ) {
    return updateInput
      ? new VehicleBodywork({
          name: updateInput.name,
          axles: updateInput.axles,
          mass: updateInput.mass,
          volume: updateInput.volume,
          created_by: updateInput.created_by,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
