import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOrderProcessingLegalClientDTO } from 'domain/dto/repositories/getDataDtos/GetProcessingLegalClientDto';
import { type FindAllOrderProcessingLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/ProcessingLegalClientRepositoryDto';
import { OrderProcessingLegalClient } from 'domain/entities/OrdersAndRoutesEntities/OrderProcessingLegalClient/OrderProcessingLegalClient';
import { OrderProcessingLegalClientRepository } from 'domain/repositories/OrderProcessingLegalClientRepository';

import { type CreateOrderProcessingLegalClientDTO } from 'app/dtos/OrderProcessingLegalClientDto/CreateOrderProcessingLegalClientDto';
import { type UpdateOrderProcessingLegalClientDTO } from 'app/dtos/OrderProcessingLegalClientDto/UpdateOrderProcessingLegalClientDto';

import { LegalClientOrderUseCases } from '../LegalClientOrderUseCases/LegalClientUseCases';
import { VehicleUseCases } from '../VehicleUseCases/VehicleUseCases';

@Injectable()
export class OrderProcessingLegalClientUseCases {
  constructor(
    private orderProcessingLegalClientResitory: OrderProcessingLegalClientRepository,
    private vehicleUseCase: VehicleUseCases,
    private orderUseCase: LegalClientOrderUseCases,
  ) {}

  async getOrderProcessingLegalClient(
    request: GetOrderProcessingLegalClientDTO,
  ) {
    if (!request.id)
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });

    return await this.orderProcessingLegalClientResitory.findOrderProcessingLegalClient(
      request,
    );
  }

  async getAllOrderProcessingLegalClient(
    request: FindAllOrderProcessingLegalClientWhereRequestDTO,
  ) {
    const orderProcesings =
      await this.orderProcessingLegalClientResitory.findAllOrderProcessingLegalClient(
        request,
      );

    if (orderProcesings.length === 0) {
      throw new GraphQLError('ANY ORDER PROCESSING FOR LEGAL CLIENT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    return orderProcesings;
  }

  async createOrderProcessingLegalClient(
    data: CreateOrderProcessingLegalClientDTO,
  ) {
    await this.vehicleUseCase.getVehicle({
      vehicleId: data.vehicle_id,
    });

    const orderProcesingEntity = new OrderProcessingLegalClient({ ...data });

    return this.orderProcessingLegalClientResitory.createOrderProcessingLegalClient(
      orderProcesingEntity,
    );
  }

  async updateOrderProcessingLegalClient(
    id: string,
    data: UpdateOrderProcessingLegalClientDTO,
  ) {
    await this.getOrderProcessingLegalClient({ id });
    if (data.vehicle_id)
      await this.vehicleUseCase.getVehicle({
        vehicleId: data.vehicle_id,
      });
    if (data.order_id)
      await this.orderUseCase.getLegalClientOrder({
        id: data.order_id,
      });
    const orderProcesingEntity = new OrderProcessingLegalClient({
      order_id: data.order_id,
      start_at: data.start_at,
      total_distance: data.total_distance,
      total_spend_liters: data.total_spend_liters,
      total_spending_money: data.total_spending_money,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
      end_at: data.end_at,
    });

    return this.orderProcessingLegalClientResitory.updateOrderProcessingLegalClient(
      id,
      orderProcesingEntity,
    );
  }
}
