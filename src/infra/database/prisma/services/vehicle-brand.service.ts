import { Injectable } from '@nestjs/common';

import { type GetVehicleBrandDTO } from 'domain/dto/repositories/getDataDtos/GetVehicleBrandDto';
import { type FindAllVehicleBrandWhereRequestDTO } from 'domain/dto/repositories/whereDtos/VehicleBrandRepositoryDto';
import { type VehicleBrand } from 'domain/entities/VehicleEntities/vehicleBrand/VehicleBrand';
import { type VehicleBrandRepository } from 'domain/repositories/VehicleBrandRepository';

import { PrismaService } from '../prisma.service';
import { VehicleBrandPrismaDTO } from './prismaDTO/VehicleBrandPrismaDto';

@Injectable()
export class VehicleBrandService implements VehicleBrandRepository {
  constructor(private prisma: PrismaService) {}
  async findVehicleBrand(request: GetVehicleBrandDTO): Promise<VehicleBrand> {
    const brand = await this.prisma.vehicleBrand.findFirstOrThrow({
      where: { OR: [{ id: request.id }, { name: request.name }] },
    });
    console.log(brand);

    return VehicleBrandPrismaDTO.PrismaToEntity(brand);
  }
  async createVehicleBrand(vehicleBrand: VehicleBrand): Promise<VehicleBrand> {
    const newVehicleBrand = await this.prisma.vehicleBrand.create({
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });

    return VehicleBrandPrismaDTO.PrismaToEntity(newVehicleBrand);
  }
  async updateVehicleBrand(
    id: string,
    vehicleBrand: VehicleBrand,
  ): Promise<VehicleBrand> {
    const updatedVehicleBrand = await this.prisma.vehicleBrand.update({
      where: { id },
      data: VehicleBrandPrismaDTO.EntityToPrisma(vehicleBrand),
    });
    const vehicleBrandReturn =
      VehicleBrandPrismaDTO.PrismaToEntity(updatedVehicleBrand);

    return vehicleBrandReturn;
  }
  async getAllVehicleBrand(
    parameters: FindAllVehicleBrandWhereRequestDTO,
  ): Promise<VehicleBrand[]> {
    const brands = await this.prisma.vehicleBrand.findMany({
      take: parameters.limit,
      skip: parameters.offset,
      where: parameters.where,
      orderBy: parameters.sort,
    });
    const vehicleBrands = brands.map(brand =>
      VehicleBrandPrismaDTO.PrismaToEntity(brand),
    );

    return vehicleBrands;
  }
}
