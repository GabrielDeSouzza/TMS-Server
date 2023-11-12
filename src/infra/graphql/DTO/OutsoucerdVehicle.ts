import { OutsourcedVehicle } from 'domain/entities/vehicle/outsourcedVehicle/OutsourcedVehicle';

import {
  type OutsourcedVehicleUpdateInput,
  type OutsourcedVehicleInput,
} from '../entities/OutsourcedVehicle/OutsourcedVehicle.input';

export class OutsourcedVehicleGraphDTO {
  public static createcreateInputToEntity(createInput: OutsourcedVehicleInput) {
    return new OutsourcedVehicle({
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
      vehicle_id: createInput.vehicle_id,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedVehicleUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedVehicle({
          updated_by: updateInput.updated_by,
          vehicle_id: updateInput.vehicle_id,
        })
      : undefined;
  }
}
