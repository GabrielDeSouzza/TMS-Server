import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetLegalClientOrderDTO } from 'domain/dto/repositories/getDataDtos/GetLegalClientOrderDto';
import {
  type CountLegalClientOrderRequestDTO,
  type FindAllLegalClientOrderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/LegalClientOrderRepositoryDto';
import { LegalClientOrder } from 'domain/entities/LegalClientEntities/LegalClientOrder/LegaClientOrder';
import { LegalClientOrderRepository } from 'domain/repositories/LegalClientOrder.repository';

import { type CreateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/CreateLegalClientOrderDto';
import { type UpdateLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/UpdateLegalClientOrderDto';
import { type UpdateManyLegalClientOrderDTO } from 'app/dtos/LegalClientOrderDto/UpdateManyLegalClientOrderDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { CarrierCompanyUseCases } from '../CarrierCompanyCases/CarrierCompanyUseCases';
import { LegalClientQuoteTableUseCases } from '../LegalClientQuoteTableUseCase/LegalClientQuoteTable';
import { LegalContractUseCases } from '../LegalContractUseCases/LegalContractUseCases';

@Injectable()
export class LegalClientOrderUseCases {
  constructor(
    private legalClientOrderRepository: LegalClientOrderRepository,
    private legalContract: LegalContractUseCases,
    private carrierCompany: CarrierCompanyUseCases,
    private quoteTable: LegalClientQuoteTableUseCases,
  ) {}
  async countLegalClientOrder(request: CountLegalClientOrderRequestDTO) {
    return this.legalClientOrderRepository.countLegalClientOrder(request);
  }
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

    throw new GraphQLError('ORDER Not Found jurídico', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllLegalClientOrder(
    request: FindAllLegalClientOrderWhereRequestDTO,
  ) {
    return this.legalClientOrderRepository.getAllLegalClientOrder(request);
  }
  async createOrder(data: CreateLegalClientOrderDTO) {
    await this.legalContract.getContract({ id: data.legal_contract_id });
    await this.quoteTable.getLegalClientQuoteTable({ id: data.quote_table_id });
    await this.carrierCompany.getCarrierCompany({ id: data.carrier_id });
    data.order = 'OLC' + generateRandomNumber(8);
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
      carrier_id: data.carrier_id,
      quote_table_id: data.quote_table_id,
      total_receivable: data.total_receivable,
      total_shipping_cost: data.total_shipping_cost,
      total_tax_payable: data.total_tax_payable,
      expenses: data.expenses,
    });

    return this.legalClientOrderRepository.createLegalClientOrder(order);
  }
  async updateOrder(id: string, data: UpdateLegalClientOrderDTO) {
    if (data.legal_contract_id)
      await this.legalContract.getContract({ id: data.legal_contract_id });
    if (data.quote_table_id)
      await this.quoteTable.getLegalClientQuoteTable({
        id: data.quote_table_id,
      });
    if (data.carrier_id)
      await this.carrierCompany.getCarrierCompany({ id: data.carrier_id });
    const order = new LegalClientOrder({
      legal_contract_id: data.legal_contract_id,
      carrier_id: data.carrier_id,
      updated_by: data.updated_by,
      created_by: data.updated_by,
      quote_table_id: data.legal_contract_id,
      total_receivable: data.total_receivable,
      total_shipping_cost: data.total_shipping_cost,
      total_tax_payable: data.total_tax_payable,
      order: null,
      expenses: data.expenses,
    });

    return this.legalClientOrderRepository.updateLegalClientOrder(id, order);
  }

  async updateManyLegalClientOrder(
    data: UpdateManyLegalClientOrderDTO[],
    updateBy: string,
  ) {
    for (const legalclientorder of data)
      await this.verifyLegalClientOrderExist(legalclientorder.id);
    const legalclientorders = data.map(legalclientorder => {
      const updateLegalClientOrder = new LegalClientOrder({
        legal_contract_id: legalclientorder.legal_contract_id,
        carrier_id: legalclientorder.carrier_id,
        updated_by: updateBy,
        quote_table_id: legalclientorder.legal_contract_id,
        total_receivable: legalclientorder.total_receivable,
        total_shipping_cost: legalclientorder.total_shipping_cost,
        total_tax_payable: legalclientorder.total_tax_payable,
        order: null,
        id: legalclientorder.id,
        expenses: legalclientorder.expenses,
      });

      return updateLegalClientOrder;
    });

    return this.legalClientOrderRepository.updateManyLegalClientOrder(
      legalclientorders,
    );
  }

  async getExpenses(request: GetLegalClientOrderDTO) {
    if (!request.id && !request.order) {
      throw new GraphQLError('IS NECESSARY AN ID OR ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const order = await this.legalClientOrderRepository.getAllExpenses(request);
    if (order) return order;

    throw new GraphQLError('ANY EXPENSE FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async deleteLegalClientOrder(id: string) {
    await this.getLegalClientOrder({ id });

    return this.legalClientOrderRepository.deleteLegalClientOrder(id);
  }
  async deleteManyLegalClientOrder(ids: string[]) {
    for (const legalclientorderId of ids)
      await this.verifyLegalClientOrderExist(legalclientorderId);

    return this.legalClientOrderRepository.deleteManyLegalClientOrder(ids);
  }
  private async verifyLegalClientOrderExist(id: string) {
    const exist = await this.legalClientOrderRepository.findLegalClientOrder({
      id,
    });
    if (!exist)
      throw new GraphQLError(`THIS LEGAL CLIENT ORDER ID ${id} NOT FOUND`, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
