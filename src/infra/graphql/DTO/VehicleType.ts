import { VehicleType } from 'domain/entities/VehicleEntities/vehicleTypes/VehicleTypes';

import {
  type VehicleTypeInput,
  type VehicleTypeUpdateInput,
} from '../entities/VehicleTypeGraphql/vehicle-type.input';

export class VehicleTypeGraphDTO {
  public static createInputToEntity(createInput: VehicleTypeInput) {
    return new VehicleType({
      name: createInput.name,
      bodyWork: createInput.bodyWork,
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
      body_work_id: createInput.body_work_id,
    });
  }

  public static updateInputToEntity(
    updateInput: VehicleTypeUpdateInput | undefined,
  ) {
    return updateInput
      ? new VehicleType({
          name: updateInput.name,
          bodyWork: updateInput.bodyWork,
          created_by: updateInput.created_by,
          updated_by: updateInput.updated_by,
          body_work_id: updateInput.body_work_id,
        })
      : undefined;
  }
}
