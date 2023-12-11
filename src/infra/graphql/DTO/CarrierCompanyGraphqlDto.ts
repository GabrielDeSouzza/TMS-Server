import { CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';

import {
  type CarrierCompanyInput,
  type CarrierCompanyUpdateInput,
} from '../entities/CarrierCompanyGraphql/CarrierCompany.input';

export class CarrierCompanyGraphqlDTO {
  public static createInputToEntity(createInput: CarrierCompanyInput) {
    return new CarrierCompany({
      created_by: createInput.created_by,
      legalPersonId: createInput.legalPersonId,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: CarrierCompanyUpdateInput | undefined,
  ) {
    return updateInput
      ? new CarrierCompany({
          created_by: updateInput.created_by,
          legalPersonId: updateInput.legalPersonId,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
