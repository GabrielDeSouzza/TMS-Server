import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import {
  type FindAllFreightIncidentWhereRequestDTO,
  type CountFreightIncidentWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';
import { OrderProcessing } from 'domain/entities/OrdersEntities/OrderProcessing/OrderProcessing';
import { IncidentRepository } from 'domain/repositories/IncidentResitory';

import { type CreateIncidentDTO } from 'app/dtos/IncidentDto/CreateIncidentDto';
import { type UpdateIncidentDTO } from 'app/dtos/IncidentDto/UpdateIncidentDto';
import { type UpdateManyIncidentDTO } from 'app/dtos/IncidentDto/UpdateManyIncidentDto';

import { OrderProcessingUseCases } from '../OrderProcessingUseCases/OrderProcessingUseCases';

@Injectable()
export class IncidentUseCases {
  constructor(
    private incidentRepository: IncidentRepository,
    private orderProcessing: OrderProcessingUseCases,
  ) {}
  async countIncident(request: CountFreightIncidentWhereRequestDTO) {
    return this.incidentRepository.countIncident(request);
  }
  async getIncident(request: GetIncidentDTO) {
    if (!request.id) {
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const expenses = await this.incidentRepository.getIncident(request);

    if (expenses) return expenses;

    throw new GraphQLError('Incident Not Found', {
      extensions: { code: HttpStatus.NOT_FOUND },
    });
  }

  async getAllIncident(request: FindAllFreightIncidentWhereRequestDTO) {
    return this.incidentRepository.findAllIncident(request);
  }
  async createIncident(data: CreateIncidentDTO) {
    const order = await this.orderProcessing.getOrderProcessing({
      id: data.order_process_id,
    });
    const orderProcesingEntity = new OrderProcessing({
      created_by: undefined,
      driver_id: undefined,
      order_processing_number: undefined,
      start_at: undefined,
      status: 'IN_INCIDENT',
      total_distance: undefined,
      total_spend_liters: undefined,
      total_spending_money: undefined,
      updated_by: data.updated_by,
      vehicle_id: undefined,
      created_at: undefined,
      disconnect_legal_order: undefined,
      disconnect_physical_customer_order: undefined,
      end_at: undefined,
      id: undefined,
      legal_customer_order_ids: undefined,
      physical_customer_order_ids: undefined,
      updated_at: new Date(),
    });

    await this.orderProcessing.updateOrderProcessing(
      order.id,
      orderProcesingEntity,
    );
    const newExpense = new Incident({ ...data });

    return this.incidentRepository.createIncident(newExpense);
  }

  async updateIncident(id: string, data: UpdateIncidentDTO) {
    await this.getIncident({ id });
    const updateExpense = new Incident({
      created_by: null,
      date_incident: data.date_incident,
      date_resolved: data.date_resolved,
      description: data.description,
      order_process_id: data.order_process_id,
      updated_by: data.updated_by,
    });

    return this.incidentRepository.updateIncident(id, updateExpense);
  }
  async updateManyIncident(data: UpdateManyIncidentDTO[], updateBy: string) {
    for (const incident of data) await this.verifyIncidentExist(incident.id);
    const incidents = data.map(incident => {
      const updateIncident = new Incident({
        created_by: null,
        date_incident: incident.date_incident,
        date_resolved: incident.date_resolved,
        description: incident.description,
        order_process_id: incident.order_process_id,
        updated_by: updateBy,
        id: incident.id,
      });

      return updateIncident;
    });

    return this.incidentRepository.updateManyIncident(incidents);
  }
  async deleteIncident(id: string) {
    await this.getIncident({ id });

    return this.incidentRepository.deleteIncident(id);
  }
  async deleteManyIncident(ids: string[]) {
    for (const incidentId of ids) await this.verifyIncidentExist(incidentId);

    return this.incidentRepository.deleteManyIncident(ids);
  }
  private async verifyIncidentExist(id: string) {
    const exist = await this.incidentRepository.getIncident({ id });
    if (!exist)
      throw new GraphQLError(`THIS INCIDENT ID ${id} NOT FOUND`, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
  }
}
