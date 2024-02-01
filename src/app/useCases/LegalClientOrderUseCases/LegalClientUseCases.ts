import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { type CreateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/CreateLegalClientOrderDto';
import { type GetAllLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/GetAllLegalClientOrderDto';
import { type GetLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/GetLegalClientOrderDto';
import { type UpdateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/UpdateLegalClientOrderDto';

@Injectable()
export class LegalClientOrderUseCases {
  constructor(private legalClientOrderRepository: LegalClientOrderRepository) {}
  async getLegalClientOrder(request: GetLegalClientOrderDTO) {
    if (!request.id && !request.order) {
      throw new GraphQLError('IS NECESSARY AN ID OR ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    return this.legalClientOrderRepository.findLegalClientOrder(
      request.id,
      request.order,
    );
  }
  async getAllLegalClientOrder(request: GetAllLegalClientOrderDTO) {
    return this.legalClientOrderRepository.getAllLegalClientOrder(request);
  }
  async createOrder(data: CreateLegalClientOrderDTO) {
    const orderExist =
      await this.legalClientOrderRepository.findLegalClientOrder(data.order);

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
