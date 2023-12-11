import { LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';

import {
  type LegalClientUpdateInput,
  type LegalClientInput,
} from '../entities/LegalClientGraphql/LegalClient.input';

export class LegalClientGraphDTO {
  public static createInputToEntity(createInput: LegalClientInput) {
    return new LegalClient({
      branch: createInput.branch,
      legal_person_id: createInput.legal_person_id,
      updated_by: createInput.updated_by,
      created_by: createInput.created_by,
    });
  }

  public static updateInputToEntity(
    updateInput: LegalClientUpdateInput | undefined,
  ) {
    return updateInput
      ? new LegalClient({
          branch: updateInput.branch,
          legal_person_id: updateInput.legal_person_id,
          updated_by: updateInput.updated_by,
          created_by: updateInput.created_by,
        })
      : undefined;
  }
}
