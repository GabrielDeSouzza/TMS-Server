import { CompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';

import {
  type CompanyVehicleInput,
  type CompanyVehicleUpdateInput,
} from '../entities/CompanyVehicle/CompanyVehicle.input';

export class CompanyVehicleGraphDTO {
  public static createInputToEntity(createInput: CompanyVehicleInput) {
    return new CompanyVehicle({
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
      vehicle_id: createInput.vehicle_id,
    });
  }

  public static updateInputToEntity(
    updateInput: CompanyVehicleUpdateInput | undefined,
  ) {
    return updateInput
      ? new CompanyVehicle({
          created_by: updateInput.created_by,
          updated_by: updateInput.updated_by,
          vehicle_id: updateInput.vehicle_id,
        })
      : undefined;
  }
}
