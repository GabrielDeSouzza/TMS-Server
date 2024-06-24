import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerOrderDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerOrderDto';
import {
  type CountPhysicalCustomerOrderRequestDTO,
  type FindAllPhysicalCustomerOrderWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerOrderRepositoryDto';
import { PhysicalCustomerOrder } from 'domain/entities/PhysicalClientEntities/physicalCustomerOrder/PhysicalCustomerOrder';
import { PhysicalCustomerOrderRepository } from 'domain/repositories/PhysicalCustomerOrder.repository';

import { type CreatePhysicalCustomerOrderDTO } from 'app/dtos/PhysicalCustomerOrderDto/CreatePhysicalCustomerOrderDto';
import { type UpdateManyPhysicalCustomerOrderDTO } from 'app/dtos/PhysicalCustomerOrderDto/UpdateManyPhysicalCustomerOrderDto';
import { type UpdatePhysicalCustomerOrderDTO } from 'app/dtos/PhysicalCustomerOrderDto/UpdatePhysicalCustomerOrderDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { CarrierCompanyUseCases } from '../CarrierCompanyCases/CarrierCompanyUseCases';
import { PhysicalCustomerQuoteTableUseCases } from '../PhysicalCustomerQuoteTableUseCase/PhysicalCustomerQuoteTable';
import { PhysicalCustomerUseCases } from '../PhysicalCustomerUseCases/PhysicalCustomerUseCases';

@Injectable()
export class PhysicalCustomerOrderUseCases {
  constructor(
    private physicalCustomerOrderRepository: PhysicalCustomerOrderRepository,
    private physicalCustomerUseCase: PhysicalCustomerUseCases,
    private physicalQuoteTableUseCase: PhysicalCustomerQuoteTableUseCases,
    private carrierCompanyUseCase: CarrierCompanyUseCases,
  ) {}
  async countPhysicalCustomerOrder(
    request: CountPhysicalCustomerOrderRequestDTO,
  ) {
    return this.physicalCustomerOrderRepository.countPhysicalCustomerOrder(
      request,
    );
  }
  async getPhysicalCustomerOrder(request: GetPhysicalCustomerOrderDTO) {
    if (!request.id && !request.order) {
      throw new GraphQLError('IS NECESSARY AN ID OR ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const order =
      await this.physicalCustomerOrderRepository.findPhysicalCustomerOrder(
        request,
      );

    if (order) return order;

    throw new GraphQLError('ORDER Not Found fisico', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async getAllPhysicalCustomerOrder(
    request: FindAllPhysicalCustomerOrderWhereRequestDTO,
  ) {
    return this.physicalCustomerOrderRepository.getAllPhysicalCustomerOrder(
      request,
    );
  }
  async createOrder(data: CreatePhysicalCustomerOrderDTO) {
    await this.physicalCustomerUseCase.getPhysicalCustomer({
      id: data.physicalCustomerId,
    });
    await this.physicalQuoteTableUseCase.getPhysicalCustomerQuoteTable({
      id: data.quote_table_id,
    });
    await this.carrierCompanyUseCase.getCarrierCompany({ id: data.carrier_id });
    const orderExist =
      await this.physicalCustomerOrderRepository.findPhysicalCustomerOrder({
        order: data.order,
      });

    if (orderExist) {
      throw new GraphQLError('ORDER ALREADY EXISTS', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    }

    const order = new PhysicalCustomerOrder({
      order: 'OR' + generateRandomNumber(8),
      physicalCustomerId: data.physicalCustomerId,
      carrier_id: data.carrier_id,
      updated_by: data.updated_by,
      created_by: data.created_by,
      total_receivable: data.total_receivable,
      total_shipping_cost: data.total_shipping_cost,
      total_tax_payable: data.total_tax_payable,
      quote_table_id: data.quote_table_id,
      expenses: data.expenses,
    });

    return this.physicalCustomerOrderRepository.createPhysicalCustomerOrder(
      order,
    );
  }

  async updateOrder(id: string, data: UpdatePhysicalCustomerOrderDTO) {
    if (data.physicalCustomerId)
      await this.physicalCustomerUseCase.getPhysicalCustomer({
        id: data.physicalCustomerId,
      });
    if (data.quote_table_id)
      await this.physicalQuoteTableUseCase.getPhysicalCustomerQuoteTable({
        id: data.quote_table_id,
      });
    if (data.carrier_id)
      await this.carrierCompanyUseCase.getCarrierCompany({
        id: data.carrier_id,
      });
    const order = new PhysicalCustomerOrder({
      created_by: null,
      physicalCustomerId: data.physicalCustomerId,
      updated_by: data.updated_by,
      carrier_id: data.carrier_id,
      total_receivable: data.total_receivable,
      total_shipping_cost: data.total_shipping_cost,
      total_tax_payable: data.total_tax_payable,
      order: null,
      quote_table_id: data.quote_table_id,
      expenses: data.expenses,
    });

    return this.physicalCustomerOrderRepository.updatePhysicalCustomerOrder(
      id,
      order,
    );
  }

  async getExpenses(request: GetPhysicalCustomerOrderDTO) {
    if (!request.id && !request.order) {
      throw new GraphQLError('IS NECESSARY AN ID OR ORDER', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const order = await this.physicalCustomerOrderRepository.getAllExpenses(
      request,
    );
    if (order) return order;

    throw new GraphQLError('ANY EXPENSE FOUND', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }
  async updateManyPhysicalCustomerOrder(
    data: UpdateManyPhysicalCustomerOrderDTO[],
    updateBy: string,
  ) {
    for (const physicalcustomerorder of data)
      await this.verifyPhysicalCustomerOrderExist(physicalcustomerorder.id);
    const physicalcustomerorders = data.map(physicalcustomerorder => {
      const physicalcustomerorderUpdated = new PhysicalCustomerOrder({
        created_by: null,
        physicalCustomerId: physicalcustomerorder.physicalCustomerId,
        updated_by: updateBy,
        carrier_id: physicalcustomerorder.carrier_id,
        total_receivable: physicalcustomerorder.total_receivable,
        total_shipping_cost: physicalcustomerorder.total_shipping_cost,
        total_tax_payable: physicalcustomerorder.total_tax_payable,
        order: null,
        quote_table_id: physicalcustomerorder.quote_table_id,
        id: physicalcustomerorder.id,
        expenses: physicalcustomerorder.expenses,
      });

      return physicalcustomerorderUpdated;
    });

    return this.physicalCustomerOrderRepository.updateManyPhysicalCustomerOrder(
      physicalcustomerorders,
    );
  }
  async deletePhysicalCustomerOrder(id: string) {
    await this.getPhysicalCustomerOrder({ id });

    return this.physicalCustomerOrderRepository.deletePhysicalCustomerOrder(id);
  }
  async deleteManyPhysicalCustomerOrder(ids: string[]) {
    for (const physicalcustomerorderId of ids)
      await this.verifyPhysicalCustomerOrderExist(physicalcustomerorderId);

    return this.physicalCustomerOrderRepository.deleteManyPhysicalCustomerOrder(
      ids,
    );
  }
  private async verifyPhysicalCustomerOrderExist(id: string) {
    const exist =
      await this.physicalCustomerOrderRepository.findPhysicalCustomerOrder({
        id,
      });
    if (!exist)
      throw new GraphQLError(`THIS PHYSICALCUSTOMERORDER ID ${id} NOT FOUND`, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
