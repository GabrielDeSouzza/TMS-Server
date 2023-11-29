import { LegalClientOrder } from 'domain/entities/legalClientEntities/LegalClientOrder/LegaClientOrder';

import {
  type LegalClientOrderInput,
  type LegalClientOrderUpdateInput,
} from '../entities/LegalClientOrderGraphql/LegalClientOrder.input';

export class LegalClientOrderGraphqlDTO {
  public static createInputToEntity(createInput: LegalClientOrderInput) {
    return new LegalClientOrder({
      legal_contract_id: createInput.legal_contract_id,
      order: createInput.order,
      updated_by: createInput.updated_by,
      created_by: createInput.created_by,
    });
  }

  public static updateInputToEntity(
    updateInput: LegalClientOrderUpdateInput | undefined,
  ) {
    return updateInput
      ? new LegalClientOrder({
          legal_contract_id: updateInput.legal_contract_id,
          order: updateInput.order,
          updated_by: updateInput.updated_by,
        })
      : undefined;
  }
}
