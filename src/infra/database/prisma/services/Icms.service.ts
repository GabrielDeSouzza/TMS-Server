import { Injectable } from '@nestjs/common';

import { type GetIcmsDTO } from 'domain/dto/repositories/getDataDtos/GetIcmsDto';
import {
  type CountIcmsRequestDTO,
  type FindAllIcmsWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/IcmsRepositoryDto';
import { type Icms } from 'domain/entities/ICMSEntity/Icms';
import { type IcmsRepository } from 'domain/repositories/IcmsRepository';

import { PrismaService } from '../prisma.service';
import { IcmsPrismaDTO } from './prismaDTO/IcmsPrismaDto';

@Injectable()
export class IcmsPrismaService implements IcmsRepository {
  constructor(private prisma: PrismaService) {}
  countIcms(request: CountIcmsRequestDTO): Promise<number> {
    return this.prisma.icms.count({
      where: request.where ?? undefined,
    });
  }

  async findIcms(data: GetIcmsDTO): Promise<Icms> {
    const icms = await this.prisma.icms.findFirst({
      where: {
        OR: [
          { id: data.id },
          {
            AND: [
              { recipient_state: data.stateRelationIcms?.recipient_state },
              { state_orgin: data.stateRelationIcms?.state_origin },
            ],
          },
        ],
      },
    });

    return IcmsPrismaDTO.PrismaToEntity(icms);
  }
  async findAllIcms(parameters: FindAllIcmsWhereRequestDTO): Promise<Icms[]> {
    const icmss = await this.prisma.icms.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return icmss.map(icms => IcmsPrismaDTO.PrismaToEntity(icms));
  }
  async createIcms(icms: Icms): Promise<Icms> {
    const icmsPrisma = await this.prisma.icms.create({
      data: IcmsPrismaDTO.EntityToCreatePrisma(icms),
    });

    return IcmsPrismaDTO.PrismaToEntity(icmsPrisma);
  }
  async updateIcms(id: string, icms?: Icms): Promise<Icms> {
    const icmsPrisma = await this.prisma.icms.update({
      data: IcmsPrismaDTO.EntityToPrismaUpdate(icms),
      where: { id },
    });

    return IcmsPrismaDTO.PrismaToEntity(icmsPrisma);
  }

  updateManyIcms(data: Icms[]): Promise<Icms[]> {
    const icmsUpdate = this.prisma.$transaction(async tx => {
      const promises = data.map(async icms => {
        const icmsPrisma = await tx.icms.update({
          data: IcmsPrismaDTO.EntityToPrismaUpdate(icms),
          where: { id: icms.id },
        });

        return IcmsPrismaDTO.PrismaToEntity(icmsPrisma);
      });

      return Promise.all(promises);
    });

    return icmsUpdate;
  }

  async deleteIcms(id: string): Promise<Icms> {
    return IcmsPrismaDTO.PrismaToEntity(
      await this.prisma.icms.delete({ where: { id } }),
    );
  }
  deleteManyIcms(ids: string[]): Promise<Icms[]> {
    const icmsDeleted = this.prisma.$transaction(async tx => {
      const promises = ids.map(async icmdsId => {
        const icmsPrisma = await tx.icms.delete({
          where: { id: icmdsId },
        });

        return IcmsPrismaDTO.PrismaToEntity(icmsPrisma);
      });

      return Promise.all(promises);
    });

    return icmsDeleted;
  }
}
