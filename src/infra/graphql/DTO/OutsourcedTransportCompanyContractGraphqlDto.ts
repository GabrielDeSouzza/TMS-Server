import { OutsourcedTransportCompanyContract } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportCompanyContract/OutsourcedTransportCompanyContract';

import {
  type OutsourcedTransportCompanyContractInput,
  type OutsourcedTransportCompanyContractUpdateInput,
} from '../entities/OutsourcedTransportCompanyContractGraphql/OutsourcedTransportCompanyContract.input';

export class OutsourcedTransportCompanyContractGraphqlDTO {
  public static createInputToEntity(
    createInput: OutsourcedTransportCompanyContractInput,
  ) {
    return new OutsourcedTransportCompanyContract({
      carrierCompanyId: createInput.carrierCompanyId,
      created_by: createInput.created_by,
      legalClientOrderId: createInput.legalClientOrderId,
      outSourcedTransportCompanyId: createInput.outSourcedTransportCompanyId,
      updated_by: createInput.updated_by,
      contractNumber: createInput.contractNumber,
    });
  }

  public static updateInputToEntity(
    updateInput: OutsourcedTransportCompanyContractUpdateInput | undefined,
  ) {
    return updateInput
      ? new OutsourcedTransportCompanyContract({
          carrierCompanyId: updateInput.carrierCompanyId,
          created_by: updateInput.created_by,
          legalClientOrderId: updateInput.legalClientOrderId,
          outSourcedTransportCompanyId:
            updateInput.outSourcedTransportCompanyId,
          updated_by: updateInput.updated_by,
          contractNumber: updateInput.contractNumber,
        })
      : undefined;
  }
}
