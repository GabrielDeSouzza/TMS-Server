import { Injectable } from '@nestjs/common';

import { type GetRouteDTO } from 'domain/dto/repositories/getDataDtos/GetRouteDto';
import { type FindAllRouteLegalClientWhereRequestDTO } from 'domain/dto/repositories/whereDtos/RouteLegalClientDto';
import { type RouteLegalClient } from 'domain/entities/OrdersAndRoutesEntities/routeLegalClient/RouteLegalClient';
import { type RouteLegalClientRepository } from 'domain/repositories/RouteLegalClientRepository';

import { PrismaService } from '../prisma.service';
import { RouteLegalClientPrismaDTO } from './prismaDTO/RouteLegalClientPrismaDto';

@Injectable()
export class RouteLegalClientPrismaService
  implements RouteLegalClientRepository
{
  constructor(private prisma: PrismaService) {}
  async findRoute(request: GetRouteDTO): Promise<RouteLegalClient> {
    return RouteLegalClientPrismaDTO.PrismaToEntity(
      await this.prisma.routesLegalClient.findFirst({
        where: { id: request.id },
      }),
    );
  }
  async createRoute(routes: RouteLegalClient): Promise<RouteLegalClient> {
    return RouteLegalClientPrismaDTO.PrismaToEntity(
      await this.prisma.routesLegalClient.create({
        data: RouteLegalClientPrismaDTO.EntityToPrisma(routes),
      }),
    );
  }
  async updateRoute(
    id: string,
    route: RouteLegalClient,
  ): Promise<RouteLegalClient> {
    return RouteLegalClientPrismaDTO.PrismaToEntity(
      await this.prisma.routesLegalClient.update({
        data: RouteLegalClientPrismaDTO.EntityToPrismaUpdate(route),
        where: { id },
      }),
    );
  }
  async findAllRoutes(
    parameters: FindAllRouteLegalClientWhereRequestDTO,
  ): Promise<RouteLegalClient[]> {
    const routes = await this.prisma.routesLegalClient.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return routes.map(route => RouteLegalClientPrismaDTO.PrismaToEntity(route));
  }
}
