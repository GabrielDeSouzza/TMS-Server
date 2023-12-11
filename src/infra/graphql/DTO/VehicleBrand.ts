import { VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';

import {
  type VehicleBrandInput,
  type VehicleBrandUpdateInput,
} from '../entities/VehicleBrandGraphql/vehicle-brand.input';

export class VehicleBrandGraphDTO {
  public static createcreateInputToEntity(createInput: VehicleBrandInput) {
    return new VehicleBrand({
      name: createInput.name,
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: VehicleBrandUpdateInput | undefined,
  ) {
    return updateInput
      ? new VehicleBrand({
          name: updateInput.name,
          created_by: updateInput.created_by,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
