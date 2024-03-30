import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientCteDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientCteDto';
import { type FindAllLegalClientCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/LegalClientCteRepository';
import { LegalClientCte } from 'domain/entities/Cte Entities/LegalClientCte/LegalClientCte';
import { LegalClientCteRepository } from 'domain/repositories/LegalClientCteRepository';

import { type CreateLegalClientCteDTO } from 'app/dtos/LegalClientCteDto/CreateLegalClientCteDto';
import { type UpdateLegalClientCteDTO } from 'app/dtos/LegalClientCteDto/UpdateLegalClientCteDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientOrderUseCases';

@Injectable()
export class LegalClientCteUseCase {
  constructor(
    private legalClientCteRepository: LegalClientCteRepository,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
  ) {}
  async getLegalClientCte(request: GetLegalClientCteDTO) {
    if (
      !request.acessKey &&
      !request.cteNumber &&
      !request.id &&
      !request.orderId
    )
      throw new GraphQLError(
        'IS NECESSARY AN ID, CTE NUMBER, ORDER ID OR ACESS KEY',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    const cte = await this.legalClientCteRepository.findLegalClientCte(request);

    if (!cte) {
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return cte;
  }
  async getAllLegalClientCte(request: FindAllLegalClientCteWhereRequestDTO) {
    const ctes = await this.legalClientCteRepository.findAllLegalClientCtes(
      request,
    );
    if (ctes.length === 0)
      throw new GraphQLError('ANY CTE FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return ctes;
  }

  async createLegalClientCte(data: CreateLegalClientCteDTO) {
    if (!data.orderId)
      throw new GraphQLError('IS NECESSARY AN ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    await this.legalClientOrderUseCase.getLegalClientOrder({
      id: data.orderId,
    });

    data.acessKey = generateRandomNumber(50);
    data.cteNumber = 'CTE' + generateRandomNumber(8);
    const cte = new LegalClientCte({
      acessKey: data.acessKey,
      cteNumber: data.cteNumber,
      orderId: data.orderId,
      observations: data.observations,
      cteType: data.cteType,
    });

    return this.legalClientCteRepository.createLegalClientCte(cte);
  }

  async updateLegalClientCte(id: string, data: UpdateLegalClientCteDTO) {
    const cteExist = await this.getLegalClientCte({ id });

    if (!cteExist)
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    else if (data.orderId) {
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.orderId,
      });
    }

    const cte = new LegalClientCte({
      acessKey: null,
      cteNumber: null,
      orderId: data.orderId,
      observations: data.observations,
      cteType: data.cteType,
    });

    return this.legalClientCteRepository.updateLegalClientCte(id, cte);
  }
}
