import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import { type FindAllIncidentWhereRequestDTO } from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';
import { IncidentRepository } from 'domain/repositories/IncidentResitory';

import { type CreateIncidentDTO } from 'app/dtos/IncidentDto/CreateIncidentDto';
import { type UpdateIncidentDTO } from 'app/dtos/IncidentDto/UpdateIncidentDto';

import { OrderProcessingUseCases } from '../OrderProcessingUseCases/OrderProcessingUseCases';

@Injectable()
export class IncidentUseCases {
  constructor(
    private incidentRepository: IncidentRepository,
    private orderProcessing: OrderProcessingUseCases,
  ) {}
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

  async getAllIncident(request: FindAllIncidentWhereRequestDTO) {
    return this.incidentRepository.findAllIncident(request);
  }
  async createIncident(data: CreateIncidentDTO) {
    await this.orderProcessing.getOrderProcessing({
      id: data.order_process_id,
    });

    const newExpense = new Incident({
      ...data,
    });

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
}
