import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientDto';
import { LegalClient } from 'domain/entities/LegalClientEntities/LegalClient/LegalClient';
import { LegalClientRepository } from 'domain/repositories/LegalClientRepositoy';

import { type CreateLegalClientDTO } from 'app/dtos/LegalClientDto/CreateLegalClientDto';
import { type GetAllLegalClientDTO } from 'app/dtos/LegalClientDto/GetAllLegalClientDto';
import { type UpdateLegalClientDTO } from 'app/dtos/LegalClientDto/UpdateLegalClientDto';
import { LegalPersonEntityDto } from 'app/dtos/LegalPerson/LegalPersonEntityDto';

import { LegalPersonUseCases } from '../LegalPersonUseCases/LegalPersonUseCases';

@Injectable()
export class LegalClientUseCases {
  constructor(
    private legalClientRepository: LegalClientRepository,
    private legalPersonUseCase: LegalPersonUseCases,
  ) {}
  async getClient(request: GetLegalClientDTO) {
    if (
      !request.cnpj &&
      !request.corporateName &&
      !request.fantasyName &&
      !request.id &&
      !request.legalPersonId
    )
      throw new GraphQLError(
        'IS NECESSARY IN CNPJ, CORPORATENAME, FANTASYNAME, ID OR LEGALPERSONID',
        { extensions: { code: HttpStatus.BAD_REQUEST } },
      );
    const client = await this.legalClientRepository.findLegalClient(request);
    if (client) return client;

    throw new GraphQLError('Client Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllClients(request: GetAllLegalClientDTO) {
    return this.legalClientRepository.getAllLegalClient(request);
  }

  async createLegalClient(data: CreateLegalClientDTO) {
    if (data.LegalPerson)
      await this.legalPersonUseCase.validatePerson(data.LegalPerson);
    const legalClient = new LegalClient({
      branch: data.branch,
      updated_by: data.updated_by,
      created_by: data.created_by,
      legal_person_id: data.legal_person_id,
    });
    const legalPerson = LegalPersonEntityDto.createEntity(data.LegalPerson);

    return this.legalClientRepository.createLegalClient(
      legalClient,
      legalPerson,
      data.legal_person_id,
    );
  }

  async updateLegalClient(id: string, data: UpdateLegalClientDTO) {
    const legalPerson = LegalPersonEntityDto.updateEntity(data.LegalPerson);
    const legalClient = new LegalClient({
      branch: data.branch,
      updated_by: data.updated_by,
      created_by: null,
      legal_person_id: null,
    });

    return this.legalClientRepository.updateLegalClient(
      id,
      legalClient,
      legalPerson,
    );
  }
}
