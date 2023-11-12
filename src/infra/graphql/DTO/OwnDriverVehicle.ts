import { OwnDriver } from 'domain/entities/driverEntities/ownDriver/OwnDriver';

import {
  type OwnDriverUpdate,
  type OwnDriverInput,
} from '../entities/OwnDriverGraphql/OwnDriver.input';

export class OwnDriverGraphDTO {
  public static createcreateInputToEntity(createInput: OwnDriverInput) {
    return new OwnDriver({
      cnh: createInput.cnh,
      cnh_category: createInput.cnh_category,
      cnh_expiration: createInput.cnh_expiration,
      company_vehicle: createInput.company_vehicle,
      course_mopp: createInput.course_mopp,
      created_by: createInput.created_by,
      updated_by: createInput.updated_by,
      natural_person_id: createInput.natural_person_id,
    });
  }

  public static updateInputToEntity(updateInput: OwnDriverUpdate | undefined) {
    return updateInput
      ? new OwnDriver({
          cnh: updateInput.cnh,
          cnh_category: updateInput.cnh_category,
          cnh_expiration: updateInput.cnh_expiration,
          company_vehicle: updateInput.company_vehicle,
          course_mopp: updateInput.course_mopp,
          natural_person_id: updateInput.natural_person_id,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
