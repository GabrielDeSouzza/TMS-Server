import { LegalPerson } from 'domain/entities/legalPerson/legalPerson/LegalPerson';

import {
  type LegalPersonInput,
  type LegalPersonUpdateInput,
} from '../entities/LegalPersonGraphql/LegalPerson.input';

export class LegalPersonGraphqlDTO {
  public static createInputToEntity(createInput: LegalPersonInput) {
    return new LegalPerson({
      fantasy_name: createInput.fantasy_name,
      cnpj: createInput.cnpj,
      state_registration: createInput.state_registration,
      corporate_name: createInput.corporate_name,
      public_place: createInput.public_place,
      address_number: createInput.address_number,
      neighborhood: createInput.neighborhood,
      complement: createInput.complement,
      city: createInput.city,
      uf: createInput.uf,
      first_phone: createInput.first_phone,
      second_phone: createInput.second_phone,
      third_phone: createInput.third_phone,
      email: createInput.email,
    });
  }

  public static updateInputToEntity(
    updateInput: LegalPersonUpdateInput | undefined,
  ) {
    return updateInput
      ? new LegalPerson({
          fantasy_name: updateInput.fantasy_name,
          cnpj: updateInput.cnpj,
          state_registration: updateInput.state_registration,
          corporate_name: updateInput.corporate_name,
          public_place: updateInput.public_place,
          address_number: updateInput.address_number,
          neighborhood: updateInput.neighborhood,
          complement: updateInput.complement,
          city: updateInput.city,
          uf: updateInput.uf,
          first_phone: updateInput.first_phone,
          second_phone: updateInput.second_phone,
          third_phone: updateInput.third_phone,
          email: updateInput.email,
        })
      : undefined;
  }
}
