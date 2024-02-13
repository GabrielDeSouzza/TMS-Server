import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetNaturalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetNaturalPersonDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';

import { type CreateNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/CreateNaturalPersonDto';
import { type GetAllNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/GetAllNaturalPersonDto';
import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type UpdateNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/UpdateNaturalPersonDto';
import { type ValidateNaturalPersonDto } from 'app/dtos/NaturalPersonDto/ValidateNaturalPersonDto';

@Injectable()
export class NaturalPersonUseCases {
  constructor(private naturalPersonRepository: NaturalPersonRepository) {}
  async getNaturalPerson(request: GetNaturalPersonDTO) {
    if (!request.cpf && !request.naturalPersonId && !request.rg)
      throw new GraphQLError('IS NECESSATY AN ID, RG OR CPF', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const natural = await this.naturalPersonRepository.findNaturalPerson(
      request,
    );
    if (natural) return natural;

    throw new GraphQLError('Person Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  getAllNaturalPersons(request: GetAllNaturalPersonDTO) {
    return this.naturalPersonRepository.getAllNaturalPerson(request);
  }
  async createPerson(data: CreateNaturalPersonDTO) {
    await this.valitePerson({
      cpf: data.cpf,
      rg: data.rg,
    });

    return this.naturalPersonRepository.createNaturalPerson(
      NaturalPersonEntityDto.createEntity(data),
    );
  }
  async updatePerson(id: string, data: UpdateNaturalPersonDTO) {
    await this.valitePerson({
      cpf: data.cpf,
      id,
      rg: data.rg,
    });

    return this.naturalPersonRepository.updateNaturalPerson(
      id,
      NaturalPersonEntityDto.updateEntity(data),
    );
  }

  async valitePerson(data: ValidateNaturalPersonDto) {
    if (!data) return;
    const personExist = await this.naturalPersonRepository.validate(data);
    console.log(personExist);
    this.validatePersonExist(data, personExist);
  }
  private validatePersonExist(
    person: CreateNaturalPersonDTO | UpdateNaturalPersonDTO,
    personExist: NaturalPerson,
    id?: string,
  ) {
    console.log(personExist);
    let errors = '';
    if (id && id == personExist?.id) errors += 'OUTHER PERSON USES ';
    if (personExist && person?.cpf == personExist?.cpf)
      errors += 'CPF ALREADY IN USE;';
    if (personExist && person?.rg == personExist?.rg)
      errors += 'RG ALREADY IN USE;';

    if (errors.length > 1) {
      throw new GraphQLError(errors, {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }
  }
}
