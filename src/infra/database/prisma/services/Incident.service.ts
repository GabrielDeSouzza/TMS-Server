import { Injectable } from '@nestjs/common';

import { type GetIncidentDTO } from 'domain/dto/repositories/getDataDtos/GetIncidentDto';
import {
  type FindAllFreightIncidentWhereRequestDTO,
  type CountFreightIncidentWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/FreightIncidentRepository.Dto';
import { type Incident } from 'domain/entities/OrdersEntities/IncidentEntity/Incident';
import { type IncidentRepository } from 'domain/repositories/IncidentResitory';

import { PrismaService } from '../prisma.service';
import { IncidentPrismaDTO } from './prismaDTO/IncidentPrismaDto';

@Injectable()
export class IncidentPrismaService implements IncidentRepository {
  constructor(private prisma: PrismaService) {}
  countIncident(request: CountFreightIncidentWhereRequestDTO): Promise<number> {
    return this.prisma.incident.count({
      where: request.where ?? undefined,
    });
  }
  async getIncident(request: GetIncidentDTO): Promise<Incident> {
    return IncidentPrismaDTO.PrismaToEntity(
      await this.prisma.incident.findFirst({
        where: {
          OR: [{ id: request.id }],
        },
      }),
    );
  }
  async findAllIncident(
    parameters: FindAllFreightIncidentWhereRequestDTO,
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

  updateManyIncident(data: Incident[]): Promise<Incident[]> {
    console.log(data);
    const incidentUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async incident => {
        const incidentPrisma = await tx.incident.update({
          data: IncidentPrismaDTO.EntityToPrismaUpdate(incident),
          where: { id: incident.id },
        });

        return IncidentPrismaDTO.PrismaToEntity(incidentPrisma);
      });

      return Promise.all(promises);
    });

    return incidentUpdate;
  }

  async deleteIncident(id: string): Promise<Incident> {
    return IncidentPrismaDTO.PrismaToEntity(
      await this.prisma.incident.delete({ where: { id } }),
    );
  }
  deleteManyIncident(ids: string[]): Promise<Incident[]> {
    const incidentDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const incidentPrisma = await tx.incident.delete({
          where: { id: icmdsId },
        });

        return IncidentPrismaDTO.PrismaToEntity(incidentPrisma);
      });

      return Promise.all(promises);
    });

    return incidentDeleted;
  }
}
