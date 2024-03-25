import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetCompletedOrdersDTO } from 'domain/dto/repositories/getDataDtos/GetCompletedOrdersDto';
import { type FindAllCompletedOrdersWhereRequestDTO } from 'domain/dto/repositories/whereDtos/CompletedOrdersRepositoryDto';
import { CompletedOrders } from 'domain/entities/OrdersEntities/CompletedOrders/CompletedOrders';
import { CompletedOrdersRepository } from 'domain/repositories/CompletedOrdersRepository';

import { type CreateCompletedOrdersDTO } from 'app/dtos/CompletedOrdersDto/CreateCompletedOrdersDto';
import { type UpdateCompletedOrdersDTO } from 'app/dtos/CompletedOrdersDto/UpdateCompletedOrdersDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientUseCases';
import { PhysicalCustomerOrderUseCases } from '../PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class CompletedOrdersUseCases {
  constructor(
    private completedOrdersResitory: CompletedOrdersRepository,
    private vehicleUseCase: VehicleUseCases,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
    private physicalCusotmerOrderUseCase: PhysicalCustomerOrderUseCases,
  ) {}

  async getCompletedOrders(request: GetCompletedOrdersDTO) {
    if (!request.id)
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const completedOrders =
      await this.completedOrdersResitory.findCompletedOrders(request);

    if (!completedOrders)
      throw new GraphQLError('ORDER PROCESSING FOR LEGAL CLIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return completedOrders;
  }

  async getAllCompletedOrders(request: FindAllCompletedOrdersWhereRequestDTO) {
    const orderProcesings =
      await this.completedOrdersResitory.findAllCompletedOrders(request);

    if (orderProcesings.length === 0) {
      throw new GraphQLError('ANY ORDER PROCESSING FOR LEGAL CLIENT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return orderProcesings;
  }

  async createCompletedOrders(data: CreateCompletedOrdersDTO) {
    if (!data.legal_customer_order_id && !data.physical_customer_order_id)
      throw new GraphQLError('ANY ORDER PROCESSING SEND ', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    else if (data.legal_customer_order_id)
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.legal_customer_order_id,
      });
    else if (data.physical_customer_order_id)
      await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
        id: data.physical_customer_order_id,
      });
    await this.vehicleUseCase.getVehicle({
      vehicleId: data.vehicle_id,
    });
    data.order_processing_number = 'OP' + generateRandomNumber(8);
    const orderProcesingEntity = new CompletedOrders({ ...data });

    return this.completedOrdersResitory.createCompletedOrders(
      orderProcesingEntity,
    );
  }

  async updateCompletedOrders(id: string, data: UpdateCompletedOrdersDTO) {
    await this.getCompletedOrders({ id });
    if (data.vehicle_id)
      await this.vehicleUseCase.getVehicle({
        vehicleId: data.vehicle_id,
      });
    if (data.legal_customer_order_id)
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.legal_customer_order_id,
      });
    else if (data.physical_customer_order_id)
      await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
        id: data.physical_customer_order_id,
      });
    else if (data.disconnect_legal_order)
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.disconnect_legal_order,
      });
    else if (data.disconnect_physical_customer_order)
      await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
        id: data.disconnect_physical_customer_order,
      });
    const orderProcesingEntity = new CompletedOrders({
      physical_customer_order_id: data.physical_customer_order_id,
      legal_customer_order_id: data.legal_customer_order_id,
      start_at: data.start_at,
      total_distance: data.total_distance,
      total_spend_liters: data.total_spend_liters,
      total_spending_money: data.total_spending_money,
      disconnect_legal_order: data.disconnect_legal_order,
      disconnect_physical_customer_order:
        data.disconnect_physical_customer_order,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
      end_at: data.end_at,
      created_by: null,
      order_processing_number: null,
    });

    return this.completedOrdersResitory.updateCompletedOrders(
      id,
      orderProcesingEntity,
    );
  }

  async getAllLegalClientOrders(request: GetCompletedOrdersDTO) {
    return this.completedOrdersResitory.findAllLegalClintOrder(request);
  }
  async getAllPhysicalCustomerOrders(request: GetCompletedOrdersDTO) {
    return this.completedOrdersResitory.findAllPhysicalCustomerOrder(request);
  }
}
