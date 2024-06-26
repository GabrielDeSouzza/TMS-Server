import { HttpStatus, Injectable } from '@nestjs/common';

import { GraphQLError } from 'graphql';

import {
  type CountAllCarrierCompaniesWhereRequestDTO,
  type UpdateManyCarrierCompaniesDTO,
  type getCarrierCompanyData,
  type FindAllWhereCarrierCompanyRequestType,
} from 'domain/dto/repositories/whereDtos/CarrierRepositoryDto';
import { type CarrierCompany } from 'domain/entities/CompanyEntities/carrierCompany/CarrierCompany';
import { type LegalPerson } from 'domain/entities/LegalPerson/LegalPerson';
import { type CarrierCompanyRepository } from 'domain/repositories/CarrierCompany.repository';

import { PrismaService } from '../prisma.service';
import { CarrierCompanyPrismaDTO } from './prismaDTO/CarrierCompanyPrismaDto';

@Injectable()
export class CarrierCompanyPrismaService implements CarrierCompanyRepository {
  constructor(private prisma: PrismaService) {}

  async count(
    parameters: CountAllCarrierCompaniesWhereRequestDTO,
  ): Promise<number> {
    const count = this.prisma.carrierCompany.count({ where: parameters.where });

    return count;
  }

  async delete(id: string): Promise<CarrierCompany> {
    const carrierCompany = await this.prisma.carrierCompany.findUnique({
      where: { id },
    });

    if (!carrierCompany) {
      throw new GraphQLError('Carrier Company not found!', {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }

    const carrierCompanyPrisma = await this.prisma.carrierCompany.delete({
      where: { id },
    });

    if (!carrierCompanyPrisma) {
      throw new GraphQLError('Carrier Company not deleted!', {
        extensions: { code: HttpStatus.BAD_REQUEST },
      });
    }

    const carrierCompanyDomain =
      CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompanyPrisma);

    return carrierCompanyDomain;
  }

  async updateManyCarriersCompanies(
    carrierCompany: UpdateManyCarrierCompaniesDTO[],
  ): Promise<CarrierCompany[]> {
    const carrierCompanies: CarrierCompany[] = [];

    await Promise.all(
      carrierCompany.map(async item => {
        const carrierCompany = await this.prisma.carrierCompany.findUnique({
          where: { id: item.id },
        });

        if (!carrierCompany) {
          throw new GraphQLError(
            `Carrier Company with id "${item.id}" not found!`,
            {
              extensions: { code: HttpStatus.NOT_FOUND },
            },
          );
        }

        await this.prisma.$transaction(async tx => {
          const carrierCompanyPrisma = await tx.carrierCompany.update({
            where: { id: item.id },
            data: {
              ...item,
              updated_at: new Date(),
            },
          });

          if (!carrierCompanyPrisma) {
            throw new GraphQLError(
              `carrierCompany with id "${item.id}" not updated!`,
              {
                extensions: { code: HttpStatus.BAD_REQUEST },
              },
            );
          }

          const carrierCompanyDomain =
            CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompanyPrisma);

          carrierCompanies.push(carrierCompanyDomain);
        });
      }),
    );

    return carrierCompanies;
  }

  async deleteManyCarriersCompanies(ids: string[]): Promise<CarrierCompany[]> {
    const carrierCompanies: CarrierCompany[] = [];

    await Promise.all(
      ids.map(async id => {
        const carrierCompany = await this.prisma.carrierCompany.findUnique({
          where: { id },
        });

        if (!carrierCompany) {
          throw new GraphQLError('Carrier Company not found!', {
            extensions: { code: HttpStatus.NOT_FOUND },
          });
        }

        await this.prisma.$transaction(async tx => {
          const carrierCompanyPrisma = await tx.carrierCompany.delete({
            where: { id },
          });

          if (!carrierCompanyPrisma) {
            throw new GraphQLError('Carrier ompany not deleted!', {
              extensions: { code: HttpStatus.BAD_REQUEST },
            });
          }

          const carrierCompanyDomain =
            CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompanyPrisma);

          carrierCompanies.push(carrierCompanyDomain);
        });
      }),
    );

    return carrierCompanies;
  }

  async findCarrierCompany(
    data: getCarrierCompanyData,
  ): Promise<CarrierCompany> {
    const carrierCompany = await this.prisma.carrierCompany.findFirst({
      where: {
        OR: [
          { id: data.id },
          { LegalPerson: { cnpj: data.cnpj } },
          { LegalPerson: { fantasy_name: data.fantasyName } },
          { LegalPerson: { corporate_name: data.corporateName } },
          { rntrc: data.rntrc },
        ],
      },
    });

    return CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompany);
  }
  async createCarrierCompany(
    carrierCompany: CarrierCompany,
    legalPerson?: LegalPerson,
    legalPersonId?: string,
  ): Promise<CarrierCompany> {
    const carriercompanyPrisma = await this.prisma.carrierCompany.create({
      data: CarrierCompanyPrismaDTO.EntityToCreatePrisma(
        carrierCompany,
        legalPerson,
        legalPersonId,
      ),
    });

    return CarrierCompanyPrismaDTO.PrismaToEntity(carriercompanyPrisma);
  }
  async updateCarrierCompany(
    id: string,
    carrierCompany?: CarrierCompany,
    legalPerson?: LegalPerson,
  ): Promise<CarrierCompany> {
    const carriercompanyPrisma = await this.prisma.carrierCompany.update({
      data: CarrierCompanyPrismaDTO.EntityToPrismaUpdate(
        carrierCompany,
        legalPerson,
      ),
      where: { id },
    });
    console.log('SSSSS', carriercompanyPrisma);

    return CarrierCompanyPrismaDTO.PrismaToEntity(carriercompanyPrisma);
  }

  async getAllCarrierCompany(
    parameters: FindAllWhereCarrierCompanyRequestType,
  ): Promise<CarrierCompany[]> {
    const carriercompanys = await this.prisma.carrierCompany.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });

    return carriercompanys.map(carrierCompany =>
      CarrierCompanyPrismaDTO.PrismaToEntity(carrierCompany),
    );
  }
}
