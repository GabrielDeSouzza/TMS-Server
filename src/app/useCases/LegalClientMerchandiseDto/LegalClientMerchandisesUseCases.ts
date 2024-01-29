import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { LegalClientMerchandise } from 'domain/entities/LegalClientEntities/LegalClientMerchandises/LegalClientClientMerchandise';
import { LegalClientMerchandiseRepository } from 'domain/repositories/LegalClientMerchandise.repository';

import { type CreateLegalClientMerchandisesDTO } from 'app/dtos/LegalClientMerchandisesDto/CreateLegalClientMerchandisesDto';
import { type GetAllLegalClientMerchandisesDTO } from 'app/dtos/LegalClientMerchandisesDto/GetAllLegalClientMerchandisesDto';
import { type GetLegalClientMerchandisesDTO } from 'app/dtos/LegalClientMerchandisesDto/GetLegalClientMerchandisesDto';
import { type UpdateLegalClientMerchandisesDTO } from 'app/dtos/LegalClientMerchandisesDto/UpdateLegalClientMerchandisesDto';

@Injectable()
export class LegalClientMerchandiseUseCases {
  constructor(
    private legalClientMerchandiseRepository: LegalClientMerchandiseRepository,
  ) {}
  async getLegalClientMerchandises(request: GetLegalClientMerchandisesDTO) {
    if (!request.codMerchandise || !request.id) {
      throw new GraphQLError('IS NECESSARY AN ID OR COD MERCHANDISE', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const merchandise =
      await this.legalClientMerchandiseRepository.findLegalClientMerchandise(
        request.id,
        request.codMerchandise,
      );

    if (merchandise) {
      return merchandise;
    }

    throw new GraphQLError('MERCHANDISE NOT FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllLegalClientMerchandise(
    request: GetAllLegalClientMerchandisesDTO,
  ) {
    return this.legalClientMerchandiseRepository.getAllLegalClientMerchandise(
      request,
    );
  }
  async createLegalClientMerchandise(data: CreateLegalClientMerchandisesDTO) {
    const merchandiseExist =
      await this.legalClientMerchandiseRepository.findLegalClientMerchandise(
        null,
        data.codMerchandise,
      );

    if (merchandiseExist) {
      throw new GraphQLError('COD MERCHANDISE ALREADY IN USE');
    }

    const merchandise = new LegalClientMerchandise({
      amount: data.amount,
      codMerchandise: data.codMerchandise,
      description: data.description,
      legalClientOrderId: data.legalClientOrderId,
      mass: data.mass,
      value: data.value,
      volume: data.volume,
    });

    return this.legalClientMerchandiseRepository.createLegalClientMerchandise(
      merchandise,
    );
  }

  async updateLegalClientMerchandiseRepository(
    id: string,
    data: UpdateLegalClientMerchandisesDTO,
  ) {
    const merchandise = new LegalClientMerchandise({
      amount: data.amount,
      codMerchandise: null,
      description: data.description,
      legalClientOrderId: data.legalClientOrderId,
      mass: data.mass,
      value: data.value,
      volume: data.volume,
    });

    return this.legalClientMerchandiseRepository.updateLegalClientMerchandise(
      id,
      merchandise,
    );
  }
}
