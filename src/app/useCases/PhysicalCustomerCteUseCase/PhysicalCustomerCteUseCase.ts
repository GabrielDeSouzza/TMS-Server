import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerCteDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerCteDto';
import { type FindAllPhysicalCustomerCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerCteRepository';
import { PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte/PhysicalCustomerCte';
import { PhysicalCustomerCteRepository } from 'domain/repositories/PhysicalCustomerCteRepository';

import { type CreatePhysicalCustomerCteDTO } from 'app/dtos/PhysicalCustomerCteDto/CreatePhysicalCustomerCteDto';
import { type UpdatePhysicalCustomerCteDTO } from 'app/dtos/PhysicalCustomerCteDto/UpdatePhysicalCustomerCteDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { PhysicalCustomerOrderUseCases } from '../PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';

@Injectable()
export class PhysicalCustomerCteUseCase {
  constructor(
    private physicalCustomerCteRepository: PhysicalCustomerCteRepository,
    private physicalCustomerOrderUseCase: PhysicalCustomerOrderUseCases,
  ) {}
  async getPhysicalCustomerCte(request: GetPhysicalCustomerCteDTO) {
    if (!request.acessKey && !request.cteNumber && !request.id)
      throw new GraphQLError('IS NECESSARY AN ID, CTE NUMBER OR ACESS KEY', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const cte =
      await this.physicalCustomerCteRepository.findPhysicalCustomerCte(request);

    if (!cte) {
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return cte;
  }
  async getAllPhysicalCustomerCte(
    request: FindAllPhysicalCustomerCteWhereRequestDTO,
  ) {
    const ctes =
      await this.physicalCustomerCteRepository.findAllPhysicalCustomerCtes(
        request,
      );
    if (ctes.length === 0)
      throw new GraphQLError('ANY CTE FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return ctes;
  }

  async createPhysicalCustomerCte(data: CreatePhysicalCustomerCteDTO) {
    if (!data.orderId)
      throw new GraphQLError('IS NECESSARY AN ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    await this.physicalCustomerOrderUseCase.getPhysicalCustomerOrder({
      id: data.orderId,
    });

    data.acessKey = generateRandomNumber(50);
    data.cteNumber = 'CTE' + generateRandomNumber(8);
    const cte = new PhysicalCustomerCte({
      acessKey: data.acessKey,
      cteNumber: data.cteNumber,
      orderId: data.orderId,
      observations: data.observations,
      cteType: data.cteType,
    });

    return this.physicalCustomerCteRepository.createPhysicalCustomerCte(cte);
  }

  async updatePhysicalCustomerCte(
    id: string,
    data: UpdatePhysicalCustomerCteDTO,
  ) {
    const cteExist = await this.getPhysicalCustomerCte({ id });

    if (!cteExist)
      throw new GraphQLError('CTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    else if (data.orderId) {
      await this.physicalCustomerOrderUseCase.getPhysicalCustomerOrder({
        id: data.orderId,
      });
    }

    const cte = new PhysicalCustomerCte({
      acessKey: null,
      cteNumber: null,
      orderId: data.orderId,
      observations: data.observations,
      cteType: data.cteType,
    });

    return this.physicalCustomerCteRepository.updatePhysicalCustomerCte(
      id,
      cte,
    );
  }
}
