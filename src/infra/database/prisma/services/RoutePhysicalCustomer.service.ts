import { Injectable } from '@nestjs/common';

import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
import { type RoutePhysicalCustomer } from 'domain/entities/OrdersAndRoutesEntities/routePhysicalCustomer/RoutePhysicalCustomer';
import { type RoutePhysicalCustomerRepository } from 'domain/repositories/RoutePhysicalCustomerRepository';

import { PrismaService } from '../prisma.service';
import { RoutePhysicalCustomerPrismaDTO } from './prismaDTO/RoutePhysicalCustomerDto';

@Injectable()
export class RoutePhysicalCustomerPrismaService
  implements RoutePhysicalCustomerRepository
{
  constructor(private prisma: PrismaService) {}
  async findRoute(request: GetRouteDTO): Promise<RoutePhysicalCustomer> {
    return RoutePhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.routesPhysicalCustomer.findFirst({
        where: { id: request.id },
      }),
    );
  }
  async createRoute(
    routes: RoutePhysicalCustomer,
  ): Promise<RoutePhysicalCustomer> {
    return RoutePhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.routesPhysicalCustomer.create({
        data: RoutePhysicalCustomerPrismaDTO.EntityToPrisma(routes),
      }),
    );
  }
  async updateRoute(
    id: string,
    route: RoutePhysicalCustomer,
  ): Promise<RoutePhysicalCustomer> {
    return RoutePhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.routesPhysicalCustomer.update({
        data: RoutePhysicalCustomerPrismaDTO.EntityToPrismaUpdate(route),
        where: { id },
      }),
    );
  }
  async findAllRoutes(
    parameters: FindAllPhysicalCustomerWhereRequestDTO,
  ): Promise<RoutePhysicalCustomer[]> {
    const routes = await this.prisma.routesPhysicalCustomer.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return routes.map(route =>
      RoutePhysicalCustomerPrismaDTO.PrismaToEntity(route),
    );
  }
}
