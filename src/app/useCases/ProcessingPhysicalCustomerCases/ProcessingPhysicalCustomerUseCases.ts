import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOrderProcessingPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingPhysicalCustomer';
import { type FindAllOrderProcessingPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingPhysicalCustomerRepositoryDto';
import { OrderProcessingPhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingPhysicalCustomer/OrderProcessingPhysicalCustomer';
import { OrderProcessingPhysicalCustomerRepository } from 'domain/repositories/OrderProcessingPhysicalCustomerRepository';

import { type CreateOrderProcessingPhysicalCustomerDTO } from 'app/dtos/OrderProcessingPhysicalCustomerDto/CreateOrderProcessingPhysicalCustomerDto';
import { type UpdateOrderProcessingPhysicalCustomerDTO } from 'app/dtos/OrderProcessingPhysicalCustomerDto/UpdateOrderProcessingPhysicalCustomerDto';

import { PhysicalCustomerOrderUseCases } from '../PhysicalCustomerOrderCases/PhysicalCustomerOrderUseCases';
import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OrderProcessingPhysicalCustomerUseCases {
  constructor(
    private orderProcessingPhysicalCustomerResitory: OrderProcessingPhysicalCustomerRepository,
    private vehicleUseCase: VehicleUseCases,
    private orderUseCase: PhysicalCustomerOrderUseCases,
  ) {}

  async getOrderProcessingPhysicalCustomer(
    request: GetOrderProcessingPhysicalCustomerDTO,
  ) {
    if (!request.id)
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    const orderProcessing =
      await this.orderProcessingPhysicalCustomerResitory.findOrderProcessingPhysicalCustomer(
        request,
      );
    if (!orderProcessing)
      throw new GraphQLError(
        'ORDER PROCESSING FOR PHYSICAL CUSTOMER NOT FOUND',
        {
          extensions: { code: HttpStatus.NOT_FOUND },
        },
      );

    return orderProcessing;
  }

  async getAllOrderProcessingPhysicalCustomer(
    request: FindAllOrderProcessingPhysicalCustomerWhereRequestDTO,
  ) {
    const orderProcesings =
      await this.orderProcessingPhysicalCustomerResitory.findAllOrderProcessingPhysicalCustomer(
        request,
      );

    if (orderProcesings.length === 0) {
      throw new GraphQLError('ANY ORDER PROCESSING FOR LEGAL CLIENT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return orderProcesings;
  }

  async createOrderProcessingPhysicalCustomer(
    data: CreateOrderProcessingPhysicalCustomerDTO,
  ) {
    await this.vehicleUseCase.getVehicle({
      vehicleId: data.vehicle_id,
    });

    await this.orderUseCase.getPhysicalCustomerOrder({
      id: data.order_id,
    });
    await this.vehicleUseCase.getVehicle({
      vehicleId: data.vehicle_id,
    });

    const orderProcesingEntity = new OrderProcessingPhysicalCustomer({
      ...data,
    });

    return this.orderProcessingPhysicalCustomerResitory.createOrderProcessingPhysicalCustomer(
      orderProcesingEntity,
    );
  }

  async updateOrderProcessingPhysicalCustomer(
    id: string,
    data: UpdateOrderProcessingPhysicalCustomerDTO,
  ) {
    await this.getOrderProcessingPhysicalCustomer({ id });
    if (data.vehicle_id)
      await this.vehicleUseCase.getVehicle({
        vehicleId: data.vehicle_id,
      });
    if (data.order_id)
      await this.orderUseCase.getPhysicalCustomerOrder({
        id: data.order_id,
      });
    const orderProcesingEntity = new OrderProcessingPhysicalCustomer({
      order_id: data.order_id,
      start_at: data.start_at,
      total_distance: data.total_distance,
      total_spend_liters: data.total_spend_liters,
      total_spending_money: data.total_spending_money,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
      end_at: data.end_at,
    });

    return this.orderProcessingPhysicalCustomerResitory.updateOrderProcessingPhysicalCustomer(
      id,
      orderProcesingEntity,
    );
  }
}
