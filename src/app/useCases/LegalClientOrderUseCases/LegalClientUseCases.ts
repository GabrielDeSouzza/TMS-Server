import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { type CreateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/CreateLegalClientOrderDto';
import { type GetAllLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/GetAllLegalClientOrderDto';
import { type UpdateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/UpdateLegalClientOrderDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

@Injectable()
export class LegalClientOrderUseCases {
  constructor(private legalClientOrderRepository: LegalClientOrderRepository) {}
  async getLegalClientOrder(request: GetLegalClientOrderDTO) {
    if (!request.id && !request.order) {
      throw new GraphQLError('IS NECESSARY AN ID OR ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const order = await this.legalClientOrderRepository.findLegalClientOrder(
      request,
    );
    if (order) return order;

    throw new GraphQLError('ORDER Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllLegalClientOrder(request: GetAllLegalClientOrderDTO) {
    return this.legalClientOrderRepository.getAllLegalClientOrder(request);
  }
  async createOrder(data: CreateLegalClientOrderDTO) {
    data.order = 'OLC' + generateRandomNumber();
    const orderExist =
      await this.legalClientOrderRepository.findLegalClientOrder({
        order: data.order,
      });

    if (orderExist) {
      throw new GraphQLError('ORDER ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const order = new LegalClientOrder({
      legal_contract_id: data.legal_contract_id,
      order: data.order,
      updated_by: data.updated_by,
      created_by: data.created_by,
    });

    return this.legalClientOrderRepository.createLegalClientOrder(order);
  }
  async updateOrder(id: string, data: UpdateLegalClientOrderDTO) {
    const order = new LegalClientOrder({
      legal_contract_id: data.legal_contract_id,
      updated_by: data.updated_by,
      created_by: data.updated_by,
      order: null,
    });

    return this.legalClientOrderRepository.updateLegalClientOrder(id, order);
  }
}
