import { OutsourcedTransportCompanyDriver } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyDriver/OutsourcedTransportCompany';

import {
  type OutsourcedTransportCompanyDriverInput,
  type OutsourcedTransportCompanyDriverUpdateInput,
} from '../entities/OutsourcedTransportCompanyDriverGraphql/OutsourcedTransportCompanyDriver.input';

export class OutsourcedTransportCompanyDriverGraphqlDTO {
  public static createInputToEntity(
    createInput: OutsourcedTransportCompanyDriverInput,
  ) {
    return new OutsourcedTransportCompanyDriver({
      cnh: createInput.cnh,
      cnh_category: createInput.cnh_category,
      cnh_expiration: createInput.cnh_expiration,
      course_mopp: createInput.course_mopp,
      created_by: createInput.created_by,
      natural_person_id: createInput.natural_person_id,
      outsourced_transport_company_id:
        createInput.outsourced_transport_company_id,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedTransportCompanyDriverUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedTransportCompanyDriver({
          cnh: updateInput.cnh,
          cnh_category: updateInput.cnh_category,
          cnh_expiration: updateInput.cnh_expiration,
          course_mopp: updateInput.course_mopp,
          created_by: updateInput.created_by,
          natural_person_id: updateInput.natural_person_id,
          outsourced_transport_company_id:
            updateInput.outsourced_transport_company_id,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
