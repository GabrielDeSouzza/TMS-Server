import { LegalContract } from 'domain/entities/LegalClientEntities/LegalContract/LegalContract';

import {
  type LegalContractInput,
  type LegalContractUpdateInput,
} from '../entities/LegalContractGraphql/LegalContract.input';

export class LegalContractGraphqlDTO {
  public static createInputToEntity(createInput: LegalContractInput) {
    return new LegalContract({
      carrier_company_id: createInput.carrier_company_id,
      contract_number: '154848',
      delivery_conditions: createInput.delivery_conditions,
      effective_date: createInput.effective_date,
      legal_client_id: createInput.legal_client_id,
      updated_by: createInput.updated_by,
      observations: createInput.observations,
      created_by: createInput.created_by,
    });
  }

  public static updateInputToEntity(
    updateInput: LegalContractUpdateInput | undefined,
  ) {
    return updateInput
      ? new LegalContract({
          carrier_company_id: updateInput.carrier_company_id,
          contract_number: updateInput.contract_number,
          delivery_conditions: updateInput.delivery_conditions,
          effective_date: updateInput.effective_date,
          legal_client_id: updateInput.legal_client_id,
          updated_by: updateInput.updated_by,
          observations: updateInput.observations,
          created_by: updateInput.created_by,
        })
      : undefined;
  }
}
