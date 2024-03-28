import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOrderProcessingDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingDto';
import { type FindAllOrderProcessingWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OrderProcessingRepositoryDto';
import { OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { OrderProcessingRepository } from 'domain/repositories/OrderProcessingRepository';

import { type CreateOrderProcessingDTO } from 'app/dtos/OrderProcessingDto/CreateOrderProcessingDto';
import { type UpdateOrderProcessingDTO } from 'app/dtos/OrderProcessingDto/UpdateOrderProcessingDto';
import { generateRandomNumber } from 'app/utils/RandomNumber';

import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientOrderUseCases';
import { PhysicalCustomerOrderUseCases } from '../PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OrderProcessingUseCases {
  constructor(
    private orderProcessingResitory: OrderProcessingRepository,
    private vehicleUseCase: VehicleUseCases,
    private legalClientOrderUseCase: LegalClientOrderUseCases,
    private physicalCusotmerOrderUseCase: PhysicalCustomerOrderUseCases,
  ) {}

  async getOrderProcessing(request: GetOrderProcessingDTO) {
    if (!request.id && !request.order_processing_number && !request.vehicleData)
      throw new GraphQLError(
        'IS NECESSARY AN ID, ORDER PROCESSING NUMBER OR VEHICLE DATA',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    const orderProcessing =
      await this.orderProcessingResitory.findOrderProcessing(request);

    if (!orderProcessing)
      throw new GraphQLError('ORDER PROCESSING FOR LEGAL CLIENT NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return orderProcessing;
  }

  async getAllOrderProcessing(request: FindAllOrderProcessingWhereRequestDTO) {
    const orderProcesings =
      await this.orderProcessingResitory.findAllOrderProcessing(request);

    if (orderProcesings.length === 0) {
      throw new GraphQLError('ANY ORDER PROCESSING FOR LEGAL CLIENT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return orderProcesings;
  }

  async createOrderProcessing(data: CreateOrderProcessingDTO) {
    const orderProcesingExist = await this.getOrderProcessing({
      vehicleData: { vehicleId: data.vehicle_id },
    });
    if (orderProcesingExist)
      throw new GraphQLError('VEHICLE ALREADY IN USE IN AN ORDER PROCESSING ', {
        extensions: { code: HttpStatus.CONFLICT },
      });
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
    const orderProcesingEntity = new OrderProcessing({ ...data });

    return this.orderProcessingResitory.createOrderProcessing(
      orderProcesingEntity,
    );
  }

  async updateOrderProcessing(id: string, data: UpdateOrderProcessingDTO) {
    await this.getOrderProcessing({ id });
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
    const orderProcesingEntity = new OrderProcessing({
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

    return this.orderProcessingResitory.updateOrderProcessing(
      id,
      orderProcesingEntity,
    );
  }

  async getAllLegalClientOrders(request: GetOrderProcessingDTO) {
    return this.orderProcessingResitory.findAllLegalClintOrder(request);
  }
  async getAllPhysicalCustomerOrders(request: GetOrderProcessingDTO) {
    return this.orderProcessingResitory.findAllPhysicalCustomerOrder(request);
  }
}
