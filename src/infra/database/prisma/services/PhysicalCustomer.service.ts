import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import { type GetPhysicalCustomerDTO } from 'domain/dto/repositories/getDataDtos/GetPhysicalCustomerDto';
import {
  type CountAllPhysicalCustomersWhereRequestDTO,
  type UpdateManyPhysicalCustomersDTO,
  type FindAllPhysicalCustomerWhereRequestDTO,
} from 'domain/dto/repositories/whereDtos/PhysicalCustomerRepositoryDto';
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

  async count(
    parameters: CountAllPhysicalCustomersWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.physicalCustomer.count({
      where: parameters.where,
    });

    return count;
  }

  async delete(id: string): Promise<PhysicalCustomer> {
    const physicalCustomer = await this.prisma.physicalCustomer.findUnique({
      where: { id },
    });

    if (!physicalCustomer) {
      throw new GraphQLError('Physical Customer not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const physicalCustomerPrisma = await this.prisma.physicalCustomer.delete({
      where: { id },
    });

    if (!physicalCustomerPrisma) {
      throw new GraphQLError('Physical Customer not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const physicalCustomerDomain = PhysicalCustomerPrismaDTO.PrismaToEntity(
      physicalCustomerPrisma,
    );

    return physicalCustomerDomain;
  }

  async updateMany(
    physicalCustomer: UpdateManyPhysicalCustomersDTO[],
  ): Promise<PhysicalCustomer[]> {
    const physicalCustomers: PhysicalCustomer[] = [];

    await Promise.all(
      physicalCustomer.map(async item => {
        const physicalCustomer = await this.prisma.physicalCustomer.findUnique({
          where: { id: item.id },
        });

        if (!physicalCustomer) {
          throw new GraphQLError(
            `Physical Customer with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const physicalCustomerPrisma = await tx.physicalCustomer.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!physicalCustomerPrisma) {
            throw new GraphQLError(
              `Physical Customer with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const physicalCustomerDomain =
            PhysicalCustomerPrismaDTO.PrismaToEntity(physicalCustomerPrisma);

          physicalCustomers.push(physicalCustomerDomain);
        });
      }),
    );

    return physicalCustomers;
  }

  async deleteMany(ids: string[]): Promise<PhysicalCustomer[]> {
    const physicalCustomers: PhysicalCustomer[] = [];

    await Promise.all(
      ids.map(async id => {
        const physicalCustomer = await this.prisma.physicalCustomer.findUnique({
          where: { id },
        });

        if (!physicalCustomer) {
          throw new GraphQLError('Physical Customer not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const physicalCustomerPrisma = await tx.physicalCustomer.delete({
            where: { id },
          });

          if (!physicalCustomerPrisma) {
            throw new GraphQLError('Physical Customer not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const physicalCustomerDomain =
            PhysicalCustomerPrismaDTO.PrismaToEntity(physicalCustomerPrisma);

          physicalCustomers.push(physicalCustomerDomain);
        });
      }),
    );

    return physicalCustomers;
  }

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
