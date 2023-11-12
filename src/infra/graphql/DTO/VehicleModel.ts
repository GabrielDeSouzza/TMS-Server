import { VehicleModel } from 'domain/entities/vehicle/vehicleModel/VehicleModel';

import {
  type VehicleModelInput,
  type VehicleModelUpdateInput,
} from '../entities/VeihicleModelGraphql/vehicle-model.input';

export class VehicleModelGraphDTO {
  public static createInputToEntity(createInput: VehicleModelInput) {
    return new VehicleModel({
      name: createInput.name,
      weight: createInput.weight,
      capacity_max: createInput.capacity_max,
      axles: createInput.axles,
      capacity_per_axle: createInput.capacity_per_axle,
      brand_id: createInput.brand_id,
      type_id: createInput.type_id,
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: VehicleModelUpdateInput | undefined,
  ) {
    return updateInput
      ? new VehicleModel({
          name: updateInput.name,
          weight: updateInput.weight,
          capacity_max: updateInput.capacity_max,
          axles: updateInput.axles,
          capacity_per_axle: updateInput.capacity_per_axle,
          brand_id: updateInput.brand_id,
          type_id: updateInput.type_id,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
