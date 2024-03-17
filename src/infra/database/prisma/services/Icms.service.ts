import { Injectable } from '@nestjs/common';

import { type GetIcmsDTO } from 'domain/dto/repositories/getDataDtos/GetIcmsDto';
import { type FindAllIcmsWhereRequestDTO } from 'domain/dto/repositories/whereDtos/IcmsRepositoryDto';
import { type Icms } from 'domain/entities/ICMSEntity/Icms';
import { type IcmsRepository } from 'domain/repositories/IcmsRepository';

import { PrismaService } from '../prisma.service';
import { IcmsPrismaDTO } from './prismaDTO/IcmsPrismaDto';

@Injectable()
export class IcmsPrismaService implements IcmsRepository {
  constructor(private prisma: PrismaService) {}

  async findIcms(data: GetIcmsDTO): Promise<Icms> {
    const icms = await this.prisma.icms.findFirst({
      where: {
        OR: [
          { id: data.id },
          {
            AND: [
              { recipient_state: data.stateRelationIcms.recipient_state },
              { state_orgin: data.stateRelationIcms.state_origin },
            ],
          },
        ],
      },
    });

    return IcmsPrismaDTO.PrismaToEntity(icms);
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

  async findAllIcms(parameters: FindAllIcmsWhereRequestDTO): Promise<Icms[]> {
    const icmss = await this.prisma.icms.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return icmss.map(icms => IcmsPrismaDTO.PrismaToEntity(icms));
  }
}
