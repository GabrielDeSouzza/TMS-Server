import { Injectable } from '@nestjs/common';

import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import { type FindAllIncidentWhereRequestDTO } from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { type Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';
import { type IncidentRepository } from 'domain/repositories/IncidentResitory';

import { PrismaService } from '../prisma.service';
import { IncidentPrismaDTO } from './prismaDTO/IncidentPrismaDto';

@Injectable()
export class IncidentPrismaService implements IncidentRepository {
  constructor(private prisma: PrismaService) {}

  async getIncident(request: GetIncidentDTO): Promise<Incident> {
    return IncidentPrismaDTO.PrismaToEntity(
      await this.prisma.incident.findFirst({
        where: {
          OR: [{ id: request.id }],
        },
      }),
    );
  }
  async createIncident(contract: Incident): Promise<Incident> {
    return IncidentPrismaDTO.PrismaToEntity(
      await this.prisma.incident.create({
        data: IncidentPrismaDTO.EntityToCreatePrisma(contract),
      }),
    );
  }

  async updateIncident(id: string, contract: Incident): Promise<Incident> {
    return IncidentPrismaDTO.PrismaToEntity(
      await this.prisma.incident.update({
        data: IncidentPrismaDTO.EntityToPrismaUpdate(contract),
        where: { id },
      }),
    );
  }
  async findAllIncident(
    parameters: FindAllIncidentWhereRequestDTO,
  ): Promise<Incident[]> {
    const incidents = await this.prisma.incident.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return incidents.map(contract =>
      IncidentPrismaDTO.PrismaToEntity(contract),
    );
  }
}
