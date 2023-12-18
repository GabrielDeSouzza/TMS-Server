import { OutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/outsourcedDriver/OutsourcedDriver';

import {
  type OutsourcedDriverInput,
  type OutsourcedDriverUpdateInput,
} from '../entities/OutsourcedDriver/OutsourcedDriver.input';

export class OutsourcedDriverGraphDTO {
  public static createInputToEntity(createInput: OutsourcedDriverInput) {
    return new OutsourcedDriver({
      outsourced_vehicle_id: createInput.outsourced_vehicle_id,
      natural_person_id: createInput.natural_person_id,
      cnh: createInput.cnh,
      cnh_category: createInput.cnh_category,
      cnh_expiration: createInput.cnh_expiration,
      company_vehicle: createInput.company_vehicle,
      course_mopp: createInput.course_mopp,
      updated_by: createInput.updated_by,
      created_by: createInput.created_by,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedDriverUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedDriver({
          outsourced_vehicle_id: updateInput.outsourced_vehicle_id,
          natural_person_id: updateInput.natural_person_id,
          cnh: updateInput.cnh,
          cnh_category: updateInput.cnh_category,
          cnh_expiration: updateInput.cnh_expiration,
          company_vehicle: updateInput.company_vehicle,
          course_mopp: updateInput.course_mopp,
          updated_by: updateInput.updated_by,
          created_by: updateInput.created_by,
        })
      : undefined;
  }
}
