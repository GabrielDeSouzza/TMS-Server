import { Injectable } from '@nestjs/common';

import { type GetPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerDto';
import { type FindAllPhysicalCustomerWhereRequestDTO } from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
import { type NaturalPerson } from 'domain/entities/NaturalPerson/NaturalPerson';
import { type PhysicalCustomer } from 'domain/entities/PhysicalClientEntities/physicalCustomer/PhysicalCustomer';
import { type PhysicalCustomerRepository } from 'domain/repositories/PhysicalCustomerRepository';

import { PrismaService } from '../prisma.service';
import { PhysicalCustomerPrismaDTO } from './prismaDTO/PhysicalCustomerPrismaDto';

@Injectable()
export class PhysicalCustomerPrismaService
  implements PhysicalCustomerRepository
{
  constructor(private prisma: PrismaService) {}
  async findPhysicalCustomer(
    request: GetPhysicalCustomerDTO,
  ): Promise<PhysicalCustomer> {
    console.log(request);

    return PhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomer.findFirst({
        where: {
          OR: [
            { id: request.id },
            { NaturalPerson: { cpf: request.cpf } },
            { NaturalPerson: { rg: request.rg } },
            { NaturalPerson: { id: request.naturalPersonId } },
          ],
        },
      }),
    );
  }
  async createPhysicalCustomer(
    physicalCustomer: PhysicalCustomer,
    naturalPerson: NaturalPerson,
  ): Promise<PhysicalCustomer> {
    PhysicalCustomerPrismaDTO;

    return PhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomer.create({
        data: PhysicalCustomerPrismaDTO.EntityToCreatePrisma(
          physicalCustomer,
          naturalPerson,
        ),
      }),
    );
  }
  async updatePhysicalCustomer(
    id: string,
    physicalCustomer: PhysicalCustomer,
    naturalPerson?: NaturalPerson,
  ): Promise<PhysicalCustomer> {
    return PhysicalCustomerPrismaDTO.PrismaToEntity(
      await this.prisma.physicalCustomer.update({
        data: PhysicalCustomerPrismaDTO.EntityToPrismaUpdate(
          physicalCustomer,
          naturalPerson,
        ),
        where: { id },
      }),
    );
  }
  async findAllPhysicalCustomer(
    parameters: FindAllPhysicalCustomerWhereRequestDTO,
  ): Promise<PhysicalCustomer[]> {
    const customers = await this.prisma.physicalCustomer.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return customers.map(customer =>
      PhysicalCustomerPrismaDTO.PrismaToEntity(customer),
    );
  }
}
