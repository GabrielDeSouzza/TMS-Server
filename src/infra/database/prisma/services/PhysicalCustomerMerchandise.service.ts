import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerMerchandiseDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerMerchandiseDto';
import { type FindAllPhysicalCustomerMerchandiseWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerMerchandiseRepositoryDto';
import { type PhysicalCustomerMerchandise } from 'domain/entities/PhysicalClientEntities/physicalCustomerMerchandise/physical-merchandise';
import { type PhysicalCustomerMerchandiseRepository } from 'domain/repositories/PhysicalCustomerMerchandise.repository';

import { PrismaService } from '../prisma.service';
import { PhysicalCustomerMerchandisePrismaDTO } from './prismaDTO/PhysicalClientMerchandisePrismaDto';

@Injectable()
export class PhysicalCustomerMerchandisePrismaService
  implements PhysicalCustomerMerchandiseRepository
{
  constructor(private prisma: PrismaService) {}
  async findPhysicalCustomerMerchandise(
    request: GetPhysicalCustomerMerchandiseDTO,
  ): Promise<PhysicalCustomerMerchandise> {
    return PhysicalCustomerMerchandisePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerMerchandise.findFirst({
        where: {
          OR: [{ id: request.id }, { codMerchandise: request.codMerchandise }],
        },
      }),
    );
  }
  async createPhysicalCustomerMerchandise(
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ): Promise<PhysicalCustomerMerchandise> {
    return PhysicalCustomerMerchandisePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerMerchandise.create({
        data: PhysicalCustomerMerchandisePrismaDTO.EntityToCreatePrisma(
          physicalCustomerMerchandise,
        ),
      }),
    );
  }
  async updatePhysicalCustomerMerchandise(
    id: string,
    physicalCustomerMerchandise: PhysicalCustomerMerchandise,
  ): Promise<PhysicalCustomerMerchandise> {
    return PhysicalCustomerMerchandisePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerMerchandise.update({
        where: { id },
        data: PhysicalCustomerMerchandisePrismaDTO.EntityToPrismaUpdate(
          physicalCustomerMerchandise,
        ),
      }),
    );
  }
  async getAllLegalClientMerchandise(
    parameters: FindAllPhysicalCustomerMerchandiseWhereRequestDTO,
  ): Promise<PhysicalCustomerMerchandise[]> {
    const merchandises = await this.prisma.physicalCustomerMerchandise.findMany(
      {
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      },
    );

    return merchandises.map(merchandise =>
      PhysicalCustomerMerchandisePrismaDTO.PrismaToEntity(merchandise),
    );
  }
  async findLegalClientMerchandisesByOrder(
    physicalCustomerOrderId: string,
  ): Promise<PhysicalCustomerMerchandise[]> {
    const merchandises = await this.prisma.physicalCustomerMerchandise.findMany(
      {
        where: { physicalCustomerOrderId: physicalCustomerOrderId },
      },
    );

    return merchandises.map(merchandise =>
      PhysicalCustomerMerchandisePrismaDTO.PrismaToEntity(merchandise),
    );
  }
}
