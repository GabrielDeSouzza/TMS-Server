import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetNaturalPersonDTO } from 'domain/dto/repositories/getDataDtos/GetNaturalPersonDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { NaturalPersonRepository } from 'domain/repositories/NaturalPersonRepository';

import { type CreateNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/CreateNaturalPersonDto';
import { type GetAllNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/GetAllNaturalPersonDto';
import { NaturalPersonEntityDto } from 'app/dtos/NaturalPersonDto/NaturalPersonEntityDto';
import { type UpdateNaturalPersonDTO } from 'app/dtos/NaturalPersonDto/UpdateNaturalPersonDto';

@Injectable()
export class NaturalPersonUseCases {
  constructor(private naturalPersonRepository: NaturalPersonRepository) {}
  async getNaturalPerson(request: GetNaturalPersonDTO) {
    if (!request.cpf && !request.id && !request.rg)
      throw new GraphQLError('IS NECESSATY AN ID, RG OR CPF', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return this.naturalPersonRepository.findNaturalPerson(request);
  }
  getAllNaturalPersons(request: GetAllNaturalPersonDTO) {
    return this.naturalPersonRepository.getAllNaturalPerson(request);
  }
  async createPerson(data: CreateNaturalPersonDTO) {
    const personExist = await this.naturalPersonRepository.validate({
      cpf: data.cpf,
      rg: data.rg,
    });
    this.validatePerson(data, personExist);

    return this.naturalPersonRepository.createNaturalPerson(
      NaturalPersonEntityDto.createEntity(data),
    );
  }
  async updatePerson(id: string, data: UpdateNaturalPersonDTO) {
    const personExist = await this.naturalPersonRepository.validate({
      cpf: data.cpf,
      rg: data.rg,
      id,
    });
    this.validatePerson(data, personExist);

    return this.naturalPersonRepository.updateNaturalPerson(
      id,
      NaturalPersonEntityDto.updateEntity(data),
    );
  }
  private validatePerson(
    person: CreateNaturalPersonDTO | UpdateNaturalPersonDTO,
    personExist: NaturalPerson,
    id?: string,
  ) {
    let errors: string;
    if (id == personExist.id) errors += 'OUTHER PERSON USES ';
    if (person.cpf == personExist.cpf) errors += 'CPF ALREADY IN USE;';
    if (person.rg == personExist.rg) errors += 'RG ALREADY IN USE;';

    if (errors) {
      throw new GraphQLError(errors, {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }
  }
}
