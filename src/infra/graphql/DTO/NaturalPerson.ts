import { NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

import {
  type NaturalPersonUpdate,
  type NaturalPersonInput,
} from '../entities/NaturalPersonGraphql/NaturalPerson.Input';

export class NaturalPersonGraphDTO {
  public static createInputToEntity(createInput: NaturalPersonInput) {
    return new NaturalPerson({
      name: createInput.name,
      date_birth: createInput.date_birth,
      gender: createInput.gender,
      cpf: createInput.cpf,
      rg: createInput.rg,
      cep: createInput.cep,
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
      nationality: createInput.nationality,
    });
  }

  public static updateInputToEntity(
    updateInput: NaturalPersonUpdate | undefined,
  ) {
    return updateInput
      ? new NaturalPerson({
          name: updateInput.name,
          date_birth: updateInput.date_birth,
          gender: updateInput.gender,
          cpf: updateInput.cpf,
          rg: updateInput.rg,
          cep: updateInput.cep,
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
          nationality: updateInput.nationality,
        })
      : undefined;
  }
}
