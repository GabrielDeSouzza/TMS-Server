import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerCteDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerCteDto';
import { type FindAllPhysicalCustomerCteWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerCteRepository';
import { type PhysicalCustomerCte } from 'domain/entities/Cte Entities/PhysicalCustomerCte';
import { type PhysicalCustomerCteRepository } from 'domain/repositories/PhysicalCustomerCteRepository';

import { PrismaService } from '../prisma.service';
import { PhysicalCustomerCtePrismaDTO } from './prismaDTO/PhysicalCustomerCtePrismaDto';

@Injectable()
export class PhysicalCustomerCtePrismaService
  implements PhysicalCustomerCteRepository
{
  constructor(private prisma: PrismaService) {}

  async findPhysicalCustomerCte(
    request: GetPhysicalCustomerCteDTO,
  ): Promise<PhysicalCustomerCte> {
    console.log(request);

    return PhysicalCustomerCtePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerCte.findFirst({
        where: {
          OR: [
            { id: request.id },
            { access_key: request.acessKey },
            { cte_number: request.acessKey },
          ],
        },
      }),
    );
  }
  async createPhysicalCustomerCte(
    physicalCustomerCte: PhysicalCustomerCte,
  ): Promise<PhysicalCustomerCte> {
    PhysicalCustomerCtePrismaDTO;

    return PhysicalCustomerCtePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerCte.create({
        data: PhysicalCustomerCtePrismaDTO.EntityToCreatePrisma(
          physicalCustomerCte,
        ),
      }),
    );
  }
  async updatePhysicalCustomerCte(
    id: string,
    physicalCustomerCte: PhysicalCustomerCte,
  ): Promise<PhysicalCustomerCte> {
    console.log(physicalCustomerCte.cteType);

    return PhysicalCustomerCtePrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomerCte.update({
        data: PhysicalCustomerCtePrismaDTO.EntityToPrismaUpdate(
          physicalCustomerCte,
        ),
        where: { id },
      }),
    );
  }
  async findAllPhysicalCustomerCtes(
    parameters: FindAllPhysicalCustomerCteWhereRequestDTO,
  ): Promise<PhysicalCustomerCte[]> {
    const customers = await this.prisma.physicalCustomerCte.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return customers.map(customer =>
      PhysicalCustomerCtePrismaDTO.PrismaToEntity(customer),
    );
  }
}
