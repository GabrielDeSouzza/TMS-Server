import { Injectable } from '@nestjs/common';

import { type GetOutsourcedTransportVehicleDTO } from 'domain/dto/repositories/getDataDtos/GetOutsourcedTransportVehicleDto';
import { type FindAllOutsourcedTransportVehicleWhereRequestDTO } from 'domain/dto/repositories/whereDtos/OutsourcedTransportVehicleRepositoryDto';
import { type OutsourcedTransportVehicle } from 'domain/entities/OutsourcedTransportCompanyEntities/outsourcedTransportVehicle/OutsourcedTransportVehicle';
import { type Vehicle } from 'domain/entities/VehicleEntities/vehicle/Vehicle';
import { type OutsourcedTransportVehicleRepository } from 'domain/repositories/OutsourcedTransportVehicle.repository';

import { PrismaService } from '../prisma.service';
import { OutsourcedTransportVehiclePrismaDTO } from './prismaDTO/OutsourcedTransportVehiclePrismaDto';

@Injectable()
export class OutsourcedTransportVehiclePrismaService
  implements OutsourcedTransportVehicleRepository
{
  constructor(private prisma: PrismaService) {}
  async findOutsourcedTransportVehicle(
    request: GetOutsourcedTransportVehicleDTO,
  ): Promise<OutsourcedTransportVehicle> {
    const outsourcedTransportVehicle =
      await this.prisma.outsourcedTransportVehicle.findFirst({
        where: {
          OR: [
            { id: request.id },
            { vehicle_id: request.vehicleId },
            { Vehicle: { plate: request.plate } },
          ],
        },
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehicle,
    );
  }
  async createOutsourcedTransportVehicle(
    outsourcedTransportVehicle: OutsourcedTransportVehicle,
    vehicle: Vehicle,
  ): Promise<OutsourcedTransportVehicle> {
    const outsourcedTransportVehiclePrisma =
      await this.prisma.outsourcedTransportVehicle.create({
        data: OutsourcedTransportVehiclePrismaDTO.EntityToCreatePrisma(
          outsourcedTransportVehicle,
          vehicle,
        ),
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehiclePrisma,
    );
  }
  async updateOutsourcedTransportVehicle(
    id: string,
    outsourcedTransportVehicle?: OutsourcedTransportVehicle,
    vehicle?: Vehicle,
  ): Promise<OutsourcedTransportVehicle> {
    const outsourcedTransportVehiclePrisma =
      await this.prisma.outsourcedTransportVehicle.update({
        data: OutsourcedTransportVehiclePrismaDTO.EntityToPrismaUpdate(
          outsourcedTransportVehicle,
          vehicle,
        ),
        where: { id },
      });

    return OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
      outsourcedTransportVehiclePrisma,
    );
  }

  async getAllOutsourcedTransportVehicle(
    parameters: FindAllOutsourcedTransportVehicleWhereRequestDTO,
  ): Promise<OutsourcedTransportVehicle[]> {
    const outsourcedTransportVehicles =
      await this.prisma.outsourcedTransportVehicle.findMany({
        take: parameters.limit,
        skip: parameters.offset,
        where: parameters.where,
        orderBy: parameters.sort,
      });

    return outsourcedTransportVehicles.map(outsourcedTransportVehicle =>
      OutsourcedTransportVehiclePrismaDTO.PrismaToEntity(
        outsourcedTransportVehicle,
      ),
    );
  }
}
