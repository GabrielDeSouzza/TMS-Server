import { ContractOutsourcedDriver } from 'domain/entities/OutsourcedDriverEntities/contractOutsourcedDriver/ContractOutsourcedDriver';

import {
  type ContractOutsourcedDriverReferecesInput,
  type ContractOutsourcedDriverInput,
  type ContractOutsoucedDriverUpdateInput,
} from '../entities/ContractOutsourcedDriverGraphql/ContractOutsoucedDriver.input';

export class ContractOutsourcedDriverGraphDTO {
  public static createcreateInputToEntity(
    createInput: ContractOutsourcedDriverInput,
  ) {
    return new ContractOutsourcedDriver({
      cpf: createInput.cpf,
      created_by: createInput.created_by,
      outsourced_driver_id: createInput.outsourced_driver_id,
      situation: createInput.situation,
      start_at: createInput.start_at,
      type: createInput.type,
      updated_by: createInput.updated_by,
      end_at: createInput.end_at,
    });
  }
  public static inputReferencesToEntity(
    refefencesInput: ContractOutsourcedDriverReferecesInput | undefined,
  ) {
    return new ContractOutsourcedDriver({
      cpf: refefencesInput.cpf,
      created_by: refefencesInput.created_by,
      situation: refefencesInput.situation,
      start_at: refefencesInput.start_at,
      type: refefencesInput.type,
      updated_by: refefencesInput.updated_by,
      end_at: refefencesInput.end_at,
    });
  }
  public static updateInputToEntity(
    updateInput: ContractOutsoucedDriverUpdateInput | undefined,
  ) {
    return updateInput
      ? new ContractOutsourcedDriver({
          cpf: updateInput.cpf,
          created_by: updateInput.created_by,
          outsourced_driver_id: updateInput.outsourced_driver_id,
          situation: updateInput.situation,
          start_at: updateInput.start_at,
          type: updateInput.type,
          updated_by: updateInput.updated_by,
          end_at: updateInput.end_at,
          id: updateInput.id,
        })
      : undefined;
  }
}
