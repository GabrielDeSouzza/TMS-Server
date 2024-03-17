import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetIcmsDTO } from 'domain/dto/repositories/getDataDtos/GetIcmsDto';
import { type FindAllIcmsWhereRequestDTO } from 'domain/dto/repositories/whereDtos/IcmsRepositoryDto';
import { Icms } from 'domain/entities/ICMSEntity/Icms';
import { IcmsRepository } from 'domain/repositories/IcmsRepository';

import { type CreateIcmsDTO } from 'app/dtos/IcsmDto/CreateIcmsDto';
import { type UpdateIcmsDTO } from 'app/dtos/IcsmDto/UpdateIcmsDto';

@Injectable()
export class IcmsUseCases {
  constructor(private icmsRepository: IcmsRepository) {}
  async getIcms(request: GetIcmsDTO) {
    console.log(request.stateRelationIcms);

    if (!request.stateRelationIcms && !request.id) {
      throw new GraphQLError('IS NECESSARY AN ID OR STATE RELATION ', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const icms = await this.icmsRepository.findIcms(request);

    if (icms) return icms;

    throw new GraphQLError('Icms Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllIcms(request: FindAllIcmsWhereRequestDTO) {
    return this.icmsRepository.findAllIcms(request);
  }
  async createIcms(data: CreateIcmsDTO) {
    const icmsExist = await this.icmsRepository.findIcms({
      stateRelationIcms: {
        state_origin: data.state_origin,
        recipient_state: data.recipient_state,
      },
    });

    if (icmsExist) {
      throw new GraphQLError('ICMS ALREADY CREATE', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const newIcms = new Icms({
      aliquot: data.aliquot,
      created_by: data.created_by,
      updated_by: data.updated_by,
      effective_date: data.effective_date,
      recipient_state: data.recipient_state,
      state_origin: data.state_origin,
    });

    return this.icmsRepository.createIcms(newIcms);
  }

  async updateIcms(id: string, data: UpdateIcmsDTO) {
    const updateIcms = new Icms({
      aliquot: data.aliquot,
      created_by: null,
      effective_date: data.effective_date,
      recipient_state: data.recipient_state,
      state_origin: data.state_origin,
      updated_by: data.updated_by,
    });

    return this.icmsRepository.updateIcms(id, updateIcms);
  }
}
