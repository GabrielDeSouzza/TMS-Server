import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllRoutePhysicalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RoutePhysicalClientRepositoryDto';
import { RoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';
import { RoutePhysicalCustomerRepository } from 'domain/repositories/RoutePhysicalCustomerRepository';

import { type CreateRoutePhysicalCustomerDTO } from 'app/dtos/RoutePhysicalCustomerDto/CreateRoutePhysicalCustoermDto';
import { type UpdateRoutePhysicalCustomerDTO } from 'app/dtos/RoutePhysicalCustomerDto/UpdatePhysicalCustomerDto';

@Injectable()
export class RoutePhysicalCustomerUseCases {
  constructor(private routeRepository: RoutePhysicalCustomerRepository) {}

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

  async getAllRoutes(request: FindAllRoutePhysicalClientWhereRequestDTO) {
    const routes = await this.routeRepository.findAllRoutes(request);

    if (routes.length === 0)
      throw new GraphQLError('ROUTES NOT FOUND', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });

    return routes;
  }

  async createRoute(data: CreateRoutePhysicalCustomerDTO) {
    if (!data) {
      throw new GraphQLError('IS NECESSARY SEND FIELDS', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    } else if (!data.physicalCustomerOrderId) {
      throw new GraphQLError(
        'IS NECESSARY A LEGAL CLIENT OR PHYSICAL CUSTOMER ORDER',
        {
          extensions: { code: HttpStatus.BAD_REQUEST },
        },
      );
    }

    const routeEntity = new RoutePhysicalCustomer({
      address_number: data.address_number,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      public_place: data.public_place,
      uf: data.uf,
      complement: data.complement,
      physicalCustomerOrderId: data.physicalCustomerOrderId,
    });

    return this.routeRepository.createRoute(routeEntity);
  }

  async updateRoute(id: string, data: UpdateRoutePhysicalCustomerDTO) {
    const routeEntity = new RoutePhysicalCustomer({
      address_number: data.address_number,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      public_place: data.public_place,
      uf: data.uf,
      complement: data.complement,
      physicalCustomerOrderId: data.physicalCustomerOrderId,
    });

    return this.routeRepository.updateRoute(id, routeEntity);
  }
}
