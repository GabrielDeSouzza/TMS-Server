import { LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';

import { type CreateLegalPersonDTO } from './CreateLegalPersonDto';
import { type UpdateLegalPersonDTO } from './UpdateLegalPersonDto';

export class LegalPersonEntityDto {
  public static createEntity(create: CreateLegalPersonDTO) {
    return new LegalPerson({
      fantasy_name: create.fantasy_name,
      cnpj: create.cnpj,
      state_registration: create.state_registration,
      corporate_name: create.corporate_name,
      public_place: create.public_place,
      address_number: create.address_number,
      neighborhood: create.neighborhood,
      complement: create.complement,
      city: create.city,
      uf: create.uf,
      first_phone: create.first_phone,
      cep: create.cep,
      second_phone: create.second_phone,
      third_phone: create.third_phone,
      email: create.email,
    });
  }
  public static updateEntity(update: UpdateLegalPersonDTO) {
    console.log(update);

    return new LegalPerson({
      fantasy_name: update?.fantasy_name,
      cnpj: update?.cnpj,
      state_registration: update?.state_registration,
      corporate_name: update?.corporate_name,
      public_place: update?.public_place,
      address_number: update?.address_number,
      neighborhood: update?.neighborhood,
      complement: update?.complement,
      city: update?.city,
      uf: update?.uf,
      cep: update.cep,
      first_phone: update?.first_phone,
      second_phone: update?.second_phone,
      third_phone: update?.third_phone,
      email: update?.email,
    });
  }
}
