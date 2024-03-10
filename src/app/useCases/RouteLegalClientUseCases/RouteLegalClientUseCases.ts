import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllRouteLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RouteLegalClientDto';
import { RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';
import { RouteLegalClientRepository } from 'domain/repositories/RouteLegalClientRepository';

import { type CreateRouteLegalClientDTO } from 'app/dtos/RouteLegalClientDto/CreateRouteLegalClientDto';
import { type UpdateRouteLegalClientDTO } from 'app/dtos/RouteLegalClientDto/UpdateRouteLegalClientDto';

@Injectable()
export class RouteLegalClientUseCases {
  constructor(private routeRepository: RouteLegalClientRepository) {}

  async getRoute(request: GetRouteDTO) {
    if (!request.id) {
      throw new GraphQLError('IS NECESSARY AN ID', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const route = await this.routeRepository.findRoute(request);
    if (!route)
      throw new GraphQLError('ROUTE NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return route;
  }

  async getAllRoutes(request: FindAllRouteLegalClientWhereRequestDTO) {
    const routes = await this.routeRepository.findAllRoutes(request);

    if (routes.length === 0)
      throw new GraphQLError('ROUTES NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return routes;
  }

  async createRoute(data: CreateRouteLegalClientDTO) {
    if (!data) {
      throw new GraphQLError('IS NECESSARY SEND FIELDS', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    } else if (!data.legalClientOrderId) {
      throw new GraphQLError(
        'IS NECESSARY A LEGAL CLIENT OR PHYSICAL CUSTOMER ORDER',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    }

    const routeEntity = new RouteLegalClient({
      address_number: data.address_number,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      public_place: data.public_place,
      uf: data.uf,
      complement: data.complement,
      legalClientOrderId: data.legalClientOrderId,
    });

    return this.routeRepository.createRoute(routeEntity);
  }

  async updateRoute(id: string, data: UpdateRouteLegalClientDTO) {
    const routeEntity = new RouteLegalClient({
      address_number: data.address_number,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      public_place: data.public_place,
      uf: data.uf,
      complement: data.complement,
      legalClientOrderId: data.legalClientOrderId,
    });

    return this.routeRepository.updateRoute(id, routeEntity);
  }
}
