import { NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';

import { type CreateNaturalPersonDTO } from './CreateNaturalPersonDto';
import { type UpdateNaturalPersonDTO } from './UpdateNaturalPersonDto';

export class NaturalPersonEntityDto {
  public static createEntity(create: CreateNaturalPersonDTO) {
    return new NaturalPerson({
      cep: create.cep,
      cpf: create.cpf,
      date_birth: create.date_birth,
      gender: create.gender,
      name: create.name,
      nationality: create.nationality,
      rg: create.rg,
      public_place: create.public_place,
      address_number: create.address_number,
      neighborhood: create.neighborhood,
      complement: create.complement,
      city: create.city,
      uf: create.uf,
      first_phone: create.first_phone,
      second_phone: create.second_phone,
      third_phone: create.third_phone,
      email: create.email,
    });
  }
  public static updateEntity(update: UpdateNaturalPersonDTO) {
    console.log(update);

    return new NaturalPerson({
      cep: update?.cep,
      cpf: update?.cpf,
      date_birth: update?.date_birth,
      gender: update?.gender,
      name: update?.name,
      nationality: update?.nationality,
      rg: update?.rg,
      public_place: update?.public_place,
      address_number: update?.address_number,
      neighborhood: update?.neighborhood,
      complement: update?.complement,
      city: update?.city,
      uf: update?.uf,
      first_phone: update?.first_phone,
      second_phone: update?.second_phone,
      third_phone: update?.third_phone,
      email: update?.email,
    });
  }
}
