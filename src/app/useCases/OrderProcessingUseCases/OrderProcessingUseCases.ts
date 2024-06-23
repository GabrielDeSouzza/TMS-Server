import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetOrderProcessingDTO } from 'domain/dto/repositories/getDataDtos/GetOrderProcessingDto';
import {
  type CountOrderProcessingRequestDTO,
  type FindAllOrderProcessingWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/OrderProcessingRepositoryDto';
import { OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { OrderProcessingRepository } from 'domain/repositories/OrderProcessingRepository';

import { type CreateOrderProcessingDTO } from 'app/dtos/OrderProcessingDto/CreateOrderProcessingDto';
import { type UpdateOrderProcessingDTO } from 'app/dtos/OrderProcessingDto/UpdateOrderProcessingDto';
import { type UpdateManyOrderProcessingDTO } from 'app/dtos/OrderProcessingDto/UpdateUpdateManyOrderProcessingDto';
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
  async countOrderProcessing(request: CountOrderProcessingRequestDTO) {
    return this.orderProcessingResitory.countOrderProcessing(request);
  }
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

    return orderProcesings;
  }

  async createOrderProcessing(data: CreateOrderProcessingDTO) {
    const orderProcesingExist =
      await this.orderProcessingResitory.findOrderProcessing({
        vehicleData: { vehicleId: data.vehicle_id },
      });
    if (orderProcesingExist)
      throw new GraphQLError('VEHICLE ALREADY IN USE IN AN ORDER PROCESSING ', {
        extensions: { code: HttpStatus.CONFLICT },
      });
    if (
      data.legal_customer_order_ids?.length === 0 &&
      data.physical_customer_order_ids?.length === 0
    )
      throw new GraphQLError('ANY ORDER PROCESSING SEND ', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    if (data.legal_customer_order_ids?.length > 0)
      for (const legalOrderId of data.legal_customer_order_ids)
        await this.legalClientOrderUseCase.getLegalClientOrder({
          id: legalOrderId,
        });
    if (data.physical_customer_order_ids?.length > 0)
      for (const physicalCustomerId of data.physical_customer_order_ids)
        await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
          id: physicalCustomerId,
        });
    await this.vehicleUseCase.getVehicle({
      vehicleId: data.vehicle_id,
    });
    data.order_processing_number = 'OP' + generateRandomNumber(8);
    const orderProcesingEntity = new OrderProcessing({
      created_by: data.created_by,
      order_processing_number: data.order_processing_number,
      start_at: data.start_at,
      status: data.status,
      total_distance: data.total_distance,
      total_spend_liters: data.total_spend_liters,
      total_spending_money: data.total_spending_money,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
      end_at: data.end_at,
      legal_customer_order_ids: data.legal_customer_order_ids,
      physical_customer_order_ids: data.physical_customer_order_ids,
      driver_id: data.driver_id,
    });

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
    if (data.legal_customer_order_ids.length > 0)
      for (const legalOrderId of data.legal_customer_order_ids)
        await this.legalClientOrderUseCase.getLegalClientOrder({
          id: legalOrderId,
        });
    if (data.physical_customer_order_ids.length > 0)
      for (const physicalCustomerId of data.legal_customer_order_ids)
        await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
          id: physicalCustomerId,
        });
    if (data.disconnect_legal_order)
      await this.legalClientOrderUseCase.getLegalClientOrder({
        id: data.disconnect_legal_order,
      });
    else if (data.disconnect_physical_customer_order)
      await this.physicalCusotmerOrderUseCase.getPhysicalCustomerOrder({
        id: data.disconnect_physical_customer_order,
      });
    const orderProcesingEntity = new OrderProcessing({
      physical_customer_order_ids: data.physical_customer_order_ids,
      legal_customer_order_ids: data.legal_customer_order_ids,
      start_at: data.start_at,
      total_distance: data.total_distance,
      total_spend_liters: data.total_spend_liters,
      total_spending_money: data.total_spending_money,
      disconnect_legal_order: data.disconnect_legal_order,
      disconnect_physical_customer_order:
        data.disconnect_physical_customer_order,
      updated_by: data.updated_by,
      vehicle_id: data.vehicle_id,
      status: data.status,
      end_at: data.end_at,
      created_by: null,
      order_processing_number: null,
      driver_id: data.driver_id,
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
  async updateManyOrderProcessing(
    data: UpdateManyOrderProcessingDTO[],
    updateBy: string,
  ) {
    for (const orderprocessing of data)
      await this.verifyOrderProcessingExist(orderprocessing.id);
    const orderprocessings = data.map(orderprocessing => {
      const orderprocessingUpdated = new OrderProcessing({
        id: orderprocessing.id,
        physical_customer_order_ids:
          orderprocessing.physical_customer_order_ids,
        legal_customer_order_ids: orderprocessing.legal_customer_order_ids,
        start_at: orderprocessing.start_at,
        total_distance: orderprocessing.total_distance,
        total_spend_liters: orderprocessing.total_spend_liters,
        total_spending_money: orderprocessing.total_spending_money,
        disconnect_legal_order: orderprocessing.disconnect_legal_order,
        disconnect_physical_customer_order:
          orderprocessing.disconnect_physical_customer_order,
        updated_by: updateBy,
        vehicle_id: orderprocessing.vehicle_id,
        status: orderprocessing.status,
        end_at: orderprocessing.end_at,
        created_by: null,
        order_processing_number: null,
        driver_id: orderprocessing.driver_id,
      });

      return orderprocessingUpdated;
    });

    return this.orderProcessingResitory.updateManyOrderProcessing(
      orderprocessings,
    );
  }
  async deleteOrderProcessing(id: string) {
    await this.getOrderProcessing({ id });

    return this.orderProcessingResitory.deleteOrderProcessing(id);
  }
  async deleteManyOrderProcessing(ids: string[]) {
    for (const orderprocessingId of ids)
      await this.verifyOrderProcessingExist(orderprocessingId);

    return this.orderProcessingResitory.deleteManyOrderProcessing(ids);
  }
  private async verifyOrderProcessingExist(id: string) {
    const exist = await this.orderProcessingResitory.findOrderProcessing({
      id,
    });
    if (!exist)
      throw new GraphQLError(`THIS ORDERPROCESSING ID ${id} NOT FOUND`, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
