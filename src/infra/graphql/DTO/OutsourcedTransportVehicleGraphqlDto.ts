import { OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';

import {
  type OutsourcedTransportVehicleUpdateInput,
  type OutsourcedTransportVehicleInput,
} from '../entities/OutsourcedTransportVehicleGraphql/OutsourcedTransportVehicle.input';

export class OutsourcedTransportVehicleGraphqlDTO {
  public static createInputToEntity(
    createInput: OutsourcedTransportVehicleInput,
  ) {
    return new OutsourcedTransportVehicle({
      created_by: createInput.created_by,
      outsourced_company_id: createInput.outsourced_company_id,
      updated_by: createInput.updated_by,
      vehicle_id: null,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedTransportVehicleUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedTransportVehicle({
          created_by: updateInput.created_by,
          outsourced_company_id: updateInput.outsourced_company_id,
          updated_by: updateInput.updated_by,
          vehicle_id: null,
        })
      : undefined;
  }
}
