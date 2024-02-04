import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetCiotForLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetCiotForLegalClientDto';
import { CiotForLegalClient } from 'domain/entities/LegalClientEntities/CiotForLegalPerson/CiotForLegalClient';
import { CiotForLegalClientRepository } from 'domain/repositories/CiotForLegalClient.repository';

import { type createCiotForLegalClientDTO } from 'app/dtos/CiotForLegalClientDto/CreateCiotForLegalClientDto';
import { type getAllCiotForLegalClientDTO } from 'app/dtos/CiotForLegalClientDto/GetAllCiotForLegalClientDto';
import { type updateCiotForLegalClientDTO } from 'app/dtos/CiotForLegalClientDto/UpdateCiotForLegalClientDto';

@Injectable()
export class CiotForLegalClientUseCases {
  constructor(
    private ciotForLegalClientRepository: CiotForLegalClientRepository,
  ) {}
  async getCiotForLegalClient(
    request: GetCiotForLegalClientDTO,
  ): Promise<CiotForLegalClient> {
    if (!request.ciot || !request.id) {
      new GraphQLError('Is necessaty an ID or CIOT number', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const ciot = await this.ciotForLegalClientRepository.findCiotForLegalClient(
      request.id,
      request.ciot,
    );
    if (ciot)
      throw new GraphQLError('CIOT not found', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return ciot;
  }

  async getAllCiotForLegalClient(
    request: getAllCiotForLegalClientDTO,
  ): Promise<CiotForLegalClient[]> {
    return this.ciotForLegalClientRepository.getAllCiotForLegalClient({
      limit: request.limit,
      offset: request.offset,
      sort: request.sort,
      where: request.where,
    });
  }

  async createCiotForLegalClient(
    request: createCiotForLegalClientDTO,
  ): Promise<CiotForLegalClient> {
    const ciotExist = await this.ciotForLegalClientRepository.validadeCiot({
      ciot: request.ciot,
    });
    if (ciotExist)
      throw new GraphQLError('Ciot NUMBER IN USE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    const ciot = new CiotForLegalClient({
      ciot: request.ciot,
      emission_date: request.emission_date,
      legal_contract_id: request.legal_contract_id,
      updated_by: request.updated_by,
      created_by: request.created_by,
    });

    return await this.ciotForLegalClientRepository.createCiotForLegalClient(
      ciot,
    );
  }
  async updateCiotForLegalClient(
    id: string,
    request: updateCiotForLegalClientDTO,
  ): Promise<CiotForLegalClient> {
    const ciot = new CiotForLegalClient({
      ciot: request.ciot,
      emission_date: request.emission_date,
      legal_contract_id: request.legal_contract_id,
      updated_by: request.updated_by,
    });

    return await this.ciotForLegalClientRepository.updateCiotForLegalClient(
      id,
      ciot,
    );
  }
}
