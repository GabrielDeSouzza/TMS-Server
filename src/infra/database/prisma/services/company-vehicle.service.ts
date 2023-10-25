import { Injectable } from '@nestjs/common';

import { type CompanyVehicle } from 'domain/entities/vehicle/companyVehicle/CompanyVehicle';
import { type IVehicle } from 'domain/entities/vehicle/vehicle/Vehicle';
import { type CompanyVehicleRepository } from 'domain/repositories/CompanyVehicleRepository';

import { PrismaService } from '../prisma.service';
import { CompanyVehiclePrismaDTO } from './prismaDTO/CompanyVehiclePrismaDto';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class CompanyVehicleServicePrisma implements CompanyVehicleRepository {
  constructor(private prisma: PrismaService) {}

  async findCompanyVehicle(id: string): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.findFirstOrThrow({ where: { id } }),
    );
  }
  async createCompanyVehicle(
    companyVehicle: Omit<CompanyVehicle, 'id'>,
    vehicle: IVehicle,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.create({
        data: CompanyVehiclePrismaDTO.EntityToCreatePrisma(
          companyVehicle,
          vehicle,
        ),
      }),
    );
  }
  async updateCompanyVehicle(
    id: string,
    CompanyVehicle: Partial<CompanyVehicle>,
    vehicle: Partial<IVehicle>,
  ): Promise<CompanyVehicle> {
    return CompanyVehiclePrismaDTO.PrismaToEntity(
      await this.prisma.companyVehicle.update({
        data: CompanyVehiclePrismaDTO.EntityToPrismaUpdate(
          CompanyVehicle,
          vehicle,
        ),
        where: { id },
      }),
    );
  }
  async findAllCompanyVehicle(): Promise<CompanyVehicle[]> {
    const companyVehiclePrisma = await this.prisma.companyVehicle.findMany();

    return companyVehiclePrisma.map(companyVehicle =>
      CompanyVehiclePrismaDTO.PrismaToEntity(companyVehicle),
    );
  }
}
