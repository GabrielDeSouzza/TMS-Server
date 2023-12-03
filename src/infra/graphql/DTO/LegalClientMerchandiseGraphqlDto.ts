import { LegalClientMerchandise } from 'domain/entities/legalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';

import {
  type LegalClientMerchandiseInput,
  type LegalClientMerchandiseUpdateInput,
} from '../entities/LegalClientMerchandiseGraphql/LegalClientMerchandise.input';

export class LegalClientMerchandiseGraphqlDTO {
  public static createInputToEntity(createInput: LegalClientMerchandiseInput) {
    return new LegalClientMerchandise({
      amount: createInput.amount,
      codMerchandise: createInput.codMerchandise,
      description: createInput.description,
      legalClientOrderId: createInput.legalClientOrderId,
      mass: createInput.mass,
      value: createInput.value,
      volume: createInput.volume,
    });
  }

  public static updateInputToEntity(
    updateInput: LegalClientMerchandiseUpdateInput | undefined,
  ) {
    return updateInput
      ? new LegalClientMerchandise({
          amount: updateInput.amount,
          codMerchandise: updateInput.codMerchandise,
          description: updateInput.description,
          legalClientOrderId: updateInput.legalClientOrderId,
          mass: updateInput.mass,
          value: updateInput.value,
          volume: updateInput.volume,
        })
      : undefined;
  }
}
