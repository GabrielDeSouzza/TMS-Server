import { CiotForLegalClient } from 'domain/entities/legalClientEntities/CiotForLegalPerson/CiotForLegalClient';

import {
  type CiotForLegalClientInput,
  type CiotForLegalClientUpdateInput,
} from '../entities/CiotForLegalClientGraphql/CiotForLegalClient.input';

export class CiotForLegalClientGraphqlDTO {
  public static createInputToEntity(createInput: CiotForLegalClientInput) {
    return new CiotForLegalClient({
      ciot: createInput.ciot,
      emission_date: createInput.emission_date,
      legal_contract_id: createInput.legal_contract_id,
      updated_by: createInput.updated_by,
      created_by: createInput.created_by,
    });
  }

  public static updateInputToEntity(
    updateInput: CiotForLegalClientUpdateInput | undefined,
  ) {
    return updateInput
      ? new CiotForLegalClient({
          ciot: updateInput.ciot,
          emission_date: updateInput.emission_date,
          legal_contract_id: updateInput.legal_contract_id,
          updated_by: updateInput.updated_by,
          created_by: updateInput.created_by,
        })
      : undefined;
  }
}
