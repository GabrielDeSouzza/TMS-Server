import { OutsourcedTransportCompany } from 'domain/entities/legalPerson/outsourcedTransportCompany/OutsourcedTransportCompany';

import {
  type OutsourcedTransportCompanyUpdateInput,
  type OutsourcedTransportCompanyInput,
} from '../entities/OutsourcedTransportCompanyGraphql/OutsourcedTransportCompany.input';

export class OutsourcedTransportCompanyGraphqlDTO {
  public static createInputToEntity(
    createInput: OutsourcedTransportCompanyInput,
  ) {
    return new OutsourcedTransportCompany({
      created_by: createInput.created_by,
      legalPersonId: createInput.legalPersonId,
      updated_by: createInput.updated_by,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedTransportCompanyUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedTransportCompany({
          created_by: updateInput.created_by,
          legalPersonId: updateInput.legalPersonId,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
